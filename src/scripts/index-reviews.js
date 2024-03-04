import { writeFileSync } from 'node:fs';
import { WriteMode } from 'vectordb';
import { connect } from '../lib/connect-to-db.js';
import { getEmbeddings } from '../lib/get-embedding.js';
import { reviews } from '../../data/reviews.js';

const main = async () => {
  const db = await connect();

  const segmenter = new Intl.Segmenter('en', { granularity: 'sentence' });

  const reviewSentences = reviews
    .map((r) => r.review)
    .map((review) =>
      Array.from(segmenter.segment(review)).map((s) => s.segment)
    )
    .flat();

  const sentenceEmbeddings = await getEmbeddings(reviewSentences);

  const sentenceRecords = reviewSentences.map((sentence, i) => ({
    vector: sentenceEmbeddings[i],
    sentence,
  }));

  writeFileSync(
    './data/sentence-embeddings.json',
    JSON.stringify(sentenceRecords, null, 2)
  );

  await db.createTable('sentences', sentenceRecords, {
    writeMode: WriteMode.Overwrite,
  });

  const reviewEmbeddings = await getEmbeddings(reviews.map((r) => r.review));

  const reviewRecords = reviews.map((review, i) => ({
    vector: reviewEmbeddings[i],
    ...review,
  }));

  writeFileSync(
    './data/review-embeddings.json',
    JSON.stringify(reviewRecords, null, 2)
  );

  await db.createTable('reviews', reviewRecords, {
    writeMode: WriteMode.Overwrite,
  });
};

main().then(console.log, console.error);
