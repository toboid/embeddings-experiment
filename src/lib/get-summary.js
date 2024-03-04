import OpenAI from 'openai';

export const getSummary = async (input, reviews) => {
  const openai = new OpenAI();

  const prompt = `Answer the following question using the review provided.
Question:
${input}

Reviews:
${reviews.join('\n')}
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content;
};
