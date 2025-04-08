// app/api/enhance/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log("POST request to /api/enhance");
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

    const prompt = `Please enhance the following text by:
1. Improving the writing quality and clarity
2. Correcting any grammar, spelling, or punctuation mistakes
3. Applying a professional and polished tone
4. Maintaining the original meaning and key points

Text to enhance:
${content}`;
    const result = await model.generateContent(prompt);
    const enhancedText = result.response.text();

    return NextResponse.json({ enhancedText });
  } catch (error) {
    console.error("Error in /api/enhance:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



