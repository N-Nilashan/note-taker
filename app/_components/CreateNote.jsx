'use client'
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CreateNote({ isOpen, onClose, addNote, currentNote, updateNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
      setCategory(currentNote.category || 'General');
    } else {
      setTitle('');
      setContent('');
      setCategory('General');
    }
  }, [currentNote]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    const noteData = {
      title: title.trim(),
      content: content.trim(),
      category
    };

    let success;
    if (currentNote) {
      success = await updateNote(currentNote._id, noteData);
    } else {
      success = await addNote(noteData);
    }

    if (success) {
      setTitle('');
      setContent('');
      setCategory('General');
      onClose();
    } else {
      alert('Failed to save note. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Dark background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-10"></div>
      <div className="p-4 z-20 rounded-lg border-2 w-[640px] dark:bg-[#0C1716] bg-emerald-800/40 border-emerald-700/30 text-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="flex justify-end">
          <button className="text-white text-lg" onClick={onClose}>
            <X />
          </button>
        </span>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-white">
            {currentNote ? "Edit Note" : "Create New Note"}
          </h2>
        </div>

        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Title</label>
          <input
            type="text"
            id="title"
            className="bg-emerald-900/20 border border-emerald-700/30 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
          />
        </div>

        <div className="mb-6">
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-white">Category</label>
          <select
            id="category"
            className="bg-emerald-900/20 border border-emerald-700/30 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Ideas">Ideas</option>
            <option value="Tasks">Tasks</option>
          </select>
        </div>

        <label htmlFor="content" className="block mb-2 text-sm font-medium text-white">Your Note</label>
        <textarea
          id="content"
          rows="4"
          className="block p-2.5 w-full h-[450px] text-sm text-white bg-emerald-900/20 rounded-lg border border-emerald-700/30 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Write your thoughts here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-emerald-800/40 hover:bg-emerald-800/60 text-white rounded-lg"
          >
            {currentNote ? "Update" : "Save"}
          </button>
          <button
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
