import { readFileSync } from 'node:fs';
import { getEmbeddings } from '../lib/get-embedding.js';
import { cosineSimilarity } from '../lib/cosine-similarity.js';

const main = async () => {
  console.log('Args', process.argv);
  const question = process.argv[2];

  const [questionEmbedding] = await getEmbeddings(question);

  const reviewEmbeddings = JSON.parse(
    readFileSync('./data/review-embeddings.json')
  );

  const matchingReviews = reviewEmbeddings
    .map((e) => ({
      ...e,
      _distance: cosineSimilarity(e.vector, questionEmbedding),
    }))
    .sort((a, b) => b._distance - a._distance)
    .slice(0, 5)
    .map(({ vector, ...rest }) => ({ ...rest }));

  console.log(matchingReviews);
};

main().then(console.log, console.error);
