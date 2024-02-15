import OpenAI from 'openai';

export const getEmbeddings = async (input) => {
  const openai = new OpenAI();

  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input,
    encodingFormat: 'float',
  });

  return response.data.map(({ embedding }) => embedding);
};
