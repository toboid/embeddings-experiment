import { readFileSync } from 'node:fs';
import { getEmbeddings } from '../lib/get-embedding.js';
import { getSummary } from '../lib/get-summary.js';
import { cosineSimilarity } from '../lib/cosine-similarity.js';

const main = async () => {
  const question = process.argv[2];

  const [questionEmbedding] = await getEmbeddings(question);

  const reviewEmbeddings = JSON.parse(
    readFileSync('./data/review-embeddings.json')
  );

  const matchingReviewText = reviewEmbeddings
    .map((e) => ({
      ...e,
      _distance: cosineSimilarity(e.vector, questionEmbedding),
    }))
    .sort((a, b) => b._distance - a._distance)
    .slice(0, 5)
    .map(({ review, ...rest }) => review);

  const summary = await getSummary(question, matchingReviewText);

  console.log('\n\n-----Summary-----');
  console.log(summary);
  console.log('\n\n-----Source reviews-----');
  console.log(matchingReviewText.join('\n\n'));
};

main().then(console.log, console.error);
