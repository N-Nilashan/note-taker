// app/api/summarize/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { content } = await request.json();

    if (!content) {
      return Response.json({ message: "Text is required" }, { status: 400 });
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Please summarize the following text concisely:\n${content}`;
    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    return Response.json({ summary });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
