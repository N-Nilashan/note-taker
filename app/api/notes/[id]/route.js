import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Note from '@/models/Note';
import { getAuth } from '@clerk/nextjs/server';

export async function PUT(req, { params }) {
  try {
    console.log("PUT request to /api/notes/[id]");
    const { userId } = getAuth(req);
    console.log("Auth result - userId:", userId);

    if (!userId) {
      console.log("No userId found in auth result");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log("User authenticated with ID:", userId);
    await connectDB();
    const { id } = params;
    const updateData = await req.json();
    console.log("Received update data:", updateData);

    const note = await Note.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true }
    );

    if (!note) {
      console.log("Note not found for ID:", id);
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    console.log("Updated note:", note);
    return NextResponse.json(note);
  } catch (error) {
    console.error("Error in PUT /api/notes/[id]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    console.log("DELETE request to /api/notes/[id]");
    const { userId } = getAuth(req);
    console.log("Auth result - userId:", userId);

    if (!userId) {
      console.log("No userId found in auth result");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log("User authenticated with ID:", userId);
    await connectDB();
    const { id } = params;
    console.log("Attempting to delete note with ID:", id);

    const note = await Note.findOneAndDelete({ _id: id, userId });

    if (!note) {
      console.log("Note not found for ID:", id);
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    console.log("Note deleted successfully");
    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error("Error in DELETE /api/notes/[id]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
