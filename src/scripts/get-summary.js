import { readFileSync } from 'node:fs';
import { getEmbeddings } from '../lib/get-embedding.js';
import { getSummary } from '../lib/get-summary.js';
import { cosineSimilarity } from '../lib/cosine-similarity.js';

const main = async () => {
  const question = process.argv[2];

  const [questionEmbedding] = await getEmbeddings(question);

  const sentenceEmbeddings = JSON.parse(
    readFileSync('./data/sentence-embeddings.json')
  );

  const matchingSentenceText = sentenceEmbeddings
    .map((e) => ({
      ...e,
      _distance: cosineSimilarity(e.vector, questionEmbedding),
    }))
    .sort((a, b) => b._distance - a._distance)
    .slice(0, 5)
    .map(({ sentence, ...rest }) => sentence);

  const summary = await getSummary(question, matchingSentenceText);

  console.log('\n\n-----Summary-----');
  console.log(summary);
  console.log('\n\n-----Source sentences from reviews-----');
  console.log(matchingSentenceText.join('\n\n'));
};

main().then(console.log, console.error);
