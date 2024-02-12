import { connect } from './connect-to-db.js';
import { getEmbeddings } from './get-embedding.js';

const main = async () => {
  const db = await connect();
  console.log('Args', process.argv);
  const question = process.argv[2];
  const [questionEmbedding] = await getEmbeddings(question);
  const tbl = await db.openTable('reviews');
  const query = await tbl.search(questionEmbedding).limit(5).execute();

  const matchingReviews = query.map(({ vector, ...rest }) => ({ ...rest }));

  console.log(matchingReviews);
};

main().then(console.log, console.error);
