"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY,
});

export async function message(prevState, formData) {
  try {
    const userMessage = formData.get("message");

    if (!userMessage) {
      return { error: "No message provided" };
    }

    console.log("User message:", userMessage);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Bally, a Basketball AI assistant that only answers questions about basketball, everything else you kindly refuse.",
        },
        { role: "user", content: userMessage },
      ],
    });

    const reply = response.choices?.[0]?.message?.content ?? "Sorry, no reply.";

    return { reply };
  } catch (error) {
    return { error: "Failed to get response from AI" };
  }
}
