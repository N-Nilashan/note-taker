import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Note from '@/models/Note';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(req) {
  try {
    console.log("POST request to /api/notes");
    const { userId } = getAuth(req);
    console.log("Auth result - userId:", userId);

    if (!userId) {
      console.log("No userId found in auth result");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log("User authenticated with ID:", userId);
    await connectDB();
    const { title, content, category } = await req.json();

    const note = await Note.create({
      title,
      content,
      category,
      userId
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/notes:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    console.log("GET request to /api/notes");
    const { userId } = getAuth(req);
    console.log("Auth result - userId:", userId);

    if (!userId) {
      console.log("No userId found in auth result");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log("User authenticated with ID:", userId);
    await connectDB();
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error in GET /api/notes:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
