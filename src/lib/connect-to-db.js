import * as lancedb from 'vectordb';

export const connect = async () => {
  const uri = 'data/lancedb';
  const db = await lancedb.connect(uri);
  return db;
};
