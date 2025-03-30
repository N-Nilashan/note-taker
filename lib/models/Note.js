import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: String, required: true } // Store user-specific notes
});

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
