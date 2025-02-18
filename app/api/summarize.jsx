import {OpenAI} from "openai";

export default async function handler(req,res){
  if (res.method !== "POST") {
    return res.status(405).json({message:'only POST requests allowed'})
  }

  const {text} = req.body ;
  if (!text) {
    return res.status(400).json({message:'Text is required'});
  }
}

try {
  console.log("Received text:", text);  // Log input
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: text }],
    max_tokens: 100,
  });

  console.log("OpenAI response:", response);  // Log output
  const summary = response.choices[0]?.message?.content || "No summary generated.";
  res.status(200).json({ summary });
} catch (error) {
  console.error("Error summarizing:", error);
  res.status(500).json({ message: "Server error", error: error.message });
}
