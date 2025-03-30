import { connectDB } from '@/lib/db';
import Note from '@/models/Note';
import { auth } from "@clerk/nextjs";

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const notes = await Note.find({ userId }).sort({ date: -1 });

    return Response.json(notes, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
