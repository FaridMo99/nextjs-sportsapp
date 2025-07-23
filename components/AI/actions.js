"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY,
});

export async function message(prevState, formData) {
  try {
    const userMessage = formData.get("message");
    const history = JSON.parse(formData.get("history") || "[]");

    const messages = [
      {
        role: "system",
        content: `
          You are Bally, a friendly goofy basketball assistant. 
          You only answer questions related to basketball.
          If someone asks about anything unrelated to basketball politely decline and move the conversation to basketball. 
          You also remember previous prompts and context.
        `,
      },
      ...history,
      { role: "user", content: userMessage },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    const reply = response.choices?.[0]?.message?.content ?? "Sorry, no reply.";
    return { reply };
  } catch (error) {
    return { error: "Failed to get response from AI" };
  }
}
