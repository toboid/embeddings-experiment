import { writeFileSync } from 'node:fs';
import { WriteMode } from 'vectordb';
import { connect } from './connect-to-db.js';
import { getEmbeddings } from './get-embedding.js';
import { reviews } from './data/reviews.js';

const main = async () => {
  const db = await connect();
  const embeddings = await getEmbeddings(reviews.map((r) => r.review));

  const records = reviews.map((review, i) => ({
    vector: embeddings[i],
    ...review,
  }));

  writeFileSync(
    './data/review-embeddings.json',
    JSON.stringify(records, null, 2)
  );

  const tbl = await db.createTable('reviews', records, {
    writeMode: WriteMode.Overwrite,
  });
};

main().then(console.log, console.error);
