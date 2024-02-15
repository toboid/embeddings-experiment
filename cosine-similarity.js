export const cosineSimilarity = (a, b) => {
  if (a.length !== b.length) {
    throw new Error('vectors must have the same length');
  }

  let dotProduct = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
  }

  const magnitudeA = Math.sqrt(a.reduce((accum, e) => (accum += e * e), 0));
  const magnitudeB = Math.sqrt(b.reduce((accum, e) => (accum += e * e), 0));

  const similarity = dotProduct / (magnitudeA * magnitudeB);

  return similarity;
};
