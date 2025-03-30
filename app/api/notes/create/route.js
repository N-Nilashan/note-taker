import { connectDB } from '@/lib/db';
import Note from '@/models/Note';
import { auth } from "@clerk/nextjs";

export async function POST(req) {
  try {
    const { userId } = auth(); // Get the user ID from Clerk
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { title, content } = await req.json();

    if (!title || !content) {
      return Response.json({ error: "Title and content are required" }, { status: 400 });
    }

    await connectDB();
    const newNote = await Note.create({ title, content, userId });

    return Response.json({ success: true, note: newNote }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
