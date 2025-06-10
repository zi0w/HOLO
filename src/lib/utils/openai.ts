"use server";

import OpenAI from "openai";

const OPENAI_CONFIG = {
  model: "gpt-4o-mini",
  store: true,
} as const;

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export const fetchOpenAIResponse = async (
  prompt: string,
  errorMessage: string,
): Promise<string | null> => {
  try {
    const completion = await openai.chat.completions.create({
      ...OPENAI_CONFIG,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content || null;
  } catch (error) {
    console.error(error);
    throw new Error(errorMessage);
  }
};
