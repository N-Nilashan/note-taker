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
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10"></div>
      <div className="p-8 z-20 rounded-2xl border w-[700px] dark:bg-[#2D2D3A] bg-[#F8F5F2] shadow-xl border-[#E5E0D9] dark:border-[#3D3D4A] text-[#2D2D3A] dark:text-[#F8F5F2] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#2D2D3A] dark:text-[#F8F5F2]">
            {currentNote ? "Edit Note" : "Create New Note"}
          </h2>
          <button
            className="text-[#2D2D3A]/60 dark:text-[#F8F5F2]/60 hover:text-[#2D2D3A] dark:hover:text-[#F8F5F2] text-lg transition-colors"
            onClick={onClose}
          >
            <X />
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-[#2D2D3A]/70 dark:text-[#F8F5F2]/70">Title</label>
          <input
            type="text"
            id="title"
            className="bg-[#F8F5F2] dark:bg-[#3D3D4A] border border-[#E5E0D9] dark:border-[#4D4D5A] text-[#2D2D3A] dark:text-[#F8F5F2] text-sm rounded-lg focus:ring-[#2D2D3A] focus:border-[#2D2D3A] dark:focus:ring-[#F8F5F2] dark:focus:border-[#F8F5F2] block w-full p-3 transition-colors"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
          />
        </div>

        <div className="mb-6">
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-[#2D2D3A]/70 dark:text-[#F8F5F2]/70">Category</label>
          <select
            id="category"
            className="bg-[#F8F5F2] dark:bg-[#3D3D4A] border border-[#E5E0D9] dark:border-[#4D4D5A] text-[#2D2D3A] dark:text-[#F8F5F2] text-sm rounded-lg focus:ring-[#2D2D3A] focus:border-[#2D2D3A] dark:focus:ring-[#F8F5F2] dark:focus:border-[#F8F5F2] block w-full p-3 transition-colors"
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

        <label htmlFor="content" className="block mb-2 text-sm font-medium text-[#2D2D3A]/70 dark:text-[#F8F5F2]/70">Your Note</label>
        <textarea
          id="content"
          rows="4"
          className="block p-3 w-full h-[450px] text-sm text-[#2D2D3A] dark:text-[#F8F5F2] bg-[#F8F5F2] dark:bg-[#3D3D4A] rounded-lg border border-[#E5E0D9] dark:border-[#4D4D5A] focus:ring-[#2D2D3A] focus:border-[#2D2D3A] dark:focus:ring-[#F8F5F2] dark:focus:border-[#F8F5F2] transition-colors"
          placeholder="Write your thoughts here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#2D2D3A] dark:bg-[#F8F5F2] hover:bg-[#2D2D3A]/90 dark:hover:bg-[#F8F5F2]/90 text-[#F8F5F2] dark:text-[#2D2D3A] rounded-lg transition-colors font-medium"
          >
            {currentNote ? "Update" : "Save"}
          </button>
          <button
            className="px-5 py-2.5 bg-[#E5E0D9] dark:bg-[#3D3D4A] hover:bg-[#E5E0D9]/80 dark:hover:bg-[#3D3D4A]/80 text-[#2D2D3A] dark:text-[#F8F5F2] rounded-lg transition-colors font-medium"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
