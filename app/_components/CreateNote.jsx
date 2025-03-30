import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function CreateNote({ isOpen, onClose, addNote, currentNote, updateNote }) {
  // All state hooks at the top level
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // useEffect to handle form population when editing
  useEffect(() => {
    if (currentNote && isOpen) {
      // Populate form fields with the note being edited
      setTitle(currentNote.title || "");
      setContent(currentNote.content || "");
    } else if (!isOpen) {
      // Reset form when closing
      setTitle("");
      setContent("");
    }
  }, [currentNote, isOpen]);

  // Conditional return AFTER all hooks are defined
  if (!isOpen) return null;

  // Handle saving (both new notes and edits)
  const handleSave = () => {
    if (!title.trim() || !content.trim()) return; // Prevent empty notes

    const date = new Date().toISOString(); // Store date in ISO format

    if (currentNote) {
      // Updating an existing note
      updateNote({ title, content, date }, currentNote.index);
    } else {
      // Creating a new note
      addNote({ title, content, date });
    }

    onClose();
  };


  return (
    <>
      {/* Dark background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-10"></div>
      <div className="p-4 z-20 rounded-lg border-2 w-[640px] dark:bg-emerald-900 bg-dbtn border-emerald-400 text-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="flex justify-end">
          <button className="text-white text-lg" onClick={onClose}>
            <X/>
          </button>
        </span>
        <div className="flex justify-between items-center mb-2">
          {/* Show different title based on whether we're editing or creating */}
          <h2 className="text-xl font-bold text-white">
            {currentNote ? "Edit Note" : "Create New Note"}
          </h2>
        </div>

        <div className="mb-6">
          <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-secondary dark:text-white">Title</label>
          <input
            type="text"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[600px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <p className="text-md font-medium mb-2">Select category</p>

        <label htmlFor="message" className="block mb-2 text-sm font-medium text-secondary dark:text-white">Your Note</label>
        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-[600px] h-[450px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-emerald-500 dark:placeholder-gray-400 dark:text-white dark:emerald-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="flex justify-end gap-2 mt-2">
          <button onClick={handleSave} className="px-4 py-2 bg-primary text-secondary rounded">
            {currentNote ? "Update" : "Save"}
          </button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
