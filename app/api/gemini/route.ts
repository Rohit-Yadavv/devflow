import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (request: Request) => {
  const API_KEY: any = process.env.GEMINI_API_KEY;

  const { question } = await request.json();

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts:
          "Hello, Iam Integrating you to my website name webflow where users post question and give answers.",
      },
      {
        role: "model",
        parts:
          "Nice to hear that? tell me of which question i can tell you answer",
      },
    ], 
  });

  try {
    const result = await chat.sendMessage(question);
    const response = result.response;
    const reply = response.text();
    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
