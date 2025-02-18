import OpenAI from "openai";

export async function POST(req) {
  try {
    const { text } = await req.json(); // Parse JSON request body

    if (!text) {
      return Response.json({ message: "Text is required" }, { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Load API key from environment variables
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Summarize the following note in a concise way." },
        { role: "user", content: text }
      ],
      max_tokens: 100,
    });

    const summary = response.choices[0].message.content;
    return Response.json({ summary }, { status: 200 });
  } catch (error) {
    console.error("Error summarizing:", error);
    return Response.json({ message: "Error summarizing note", error: error.message }, { status: 500 });
  }
}
