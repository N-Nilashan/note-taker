// app/api/summarize/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log("POST request to /api/summarize");
    const { userId } = getAuth(request);
    console.log("Auth result - userId:", userId);

    if (!userId) {
      console.log("No userId found in auth result");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log("User authenticated with ID:", userId);
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json({ message: "Text is required" }, { status: 400 });
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Please summarize the following text concisely:\n${content}`;
    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error in /api/summarize:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



