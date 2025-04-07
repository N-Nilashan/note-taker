import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
  },
  userId: {
    type: String,
    required: [true, 'User ID is required'],
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    default: 'General',
  },
  summary: {
    type: String,
    default: '',
  }
}, {
  timestamps: true,
});

export default mongoose.models.Note || mongoose.model('Note', noteSchema);
