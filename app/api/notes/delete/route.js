import { connectDB } from '../../../../lib/db';
import Note from '../../../../lib/models/Note';
import { auth } from "@clerk/nextjs";

export async function DELETE(req) {
  try {
    const { userId } = auth();
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await req.json();
    if (!id) return Response.json({ error: "Note ID is required" }, { status: 400 });

    await connectDB();
    const deletedNote = await Note.findOneAndDelete({ _id: id, userId });

    if (!deletedNote) return Response.json({ error: "Note not found" }, { status: 404 });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
