import React from "react";

export default function CreateNote({ isOpen, onClose }) {
  if (!isOpen) return null; // Don't render if not open

  return (

     <>
     {/* Dark background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-10"></div>
        <div className="p-4 z-20 rounded-lg border-2 w-96 dark:bg-emerald-900 bg-dbtn border-emerald-400 text-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Title</h2>
            <button className="text-white text-lg" onClick={onClose}>
              ✖
            </button>
          </div>
          <hr className="border-emerald-400 mb-2" />
          <p className="text-md font-medium mb-2">Select category</p>
          <textarea
            className="w-full p-2 rounded border border-emerald-400 bg-transparent text-white outline-none"
            rows="3"
            placeholder="Write Note"
          ></textarea>
          <div className="flex justify-end gap-2 mt-2">
            <button className="px-4 py-2 bg-white text-black rounded">Save</button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>

    </>
  );
}
