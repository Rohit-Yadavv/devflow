import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (request: Request) => {
  const API_KEY: any = process.env.AI_API_KEY;

  const { question, type } = await request.json();

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  let chat;
  if (type === "question") {
     chat = model.startChat({
      history: [
        {
          role: "user",
          parts:
            "Hello, Iam Integrating you to my website name webOverflow where users post question and give answers.",
        },
        {
          role: "model",
          parts:
            "Nice to hear that? tell me of which question i can tell you answer",
        },
      ],
    });
  }
  if (type === "complexity") {
     chat = model.startChat({
      history: [
        {
          role: "user",
          parts:
            "Hello, Iam Integrating you to my website where users can post code to find O(n) space and time complexity",
        },
        {
          role: "model",
          parts:
            "sure, give me code and i will give tell you both space and time complexity of given code with little explanation",
        },
      ],
    });
  }
  try {
    const result = await chat?.sendMessage(question);
    const response = result?.response;
    const reply = response?.text();
    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
