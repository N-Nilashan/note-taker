'use client'
import React, { useState } from 'react';

const TextCard = ({  title, content,onDelete  }) => {
  const [summary,setSummary] = useState("")

  const handleSummarize = async ()=>{
    try {
      const response = await fetch ("/api/summarize",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content }),
      })
      const data = await response.json();
      if (response.ok) {
        setSummary(data.summary);
      } else {
        console.error("Error summarizing:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="relative dark:bg-black w-96 bg-white shadow-sm border border-emerald-400 rounded-3xl p-3 pb-6">
      <div className="justify-start mb-3 px-2">
        <h5 className="text-primary dark:text-secondary text-2xl font-semibold">{title}</h5>
        <p className='text-primary mt-3 dark:text-secondary'>Work</p>
      </div>
      <div className="p-3 mt-5 border-t border-emerald-400 text-center max-h-52 overflow-y-auto">
        <p className="block text-emerald-900 dark:text-secondary leading-normal font-light mb-4 max-w-lg">
          {summary || content} {/* Show summary if available */}
        </p>
      </div>
      <div className='flex mt-3 items-center justify-evenly font-semibold'>
        <button className='rounded-3xl w-[70px] p-2 text-secondary bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary'>
          Edit
        </button>
        <button
        onClick={handleSummarize}
        className='rounded-3xl w-[120px] p-2 text-secondary bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary'>
          Summarize
        </button>
        <button
        onClick={onDelete}
        className='rounded-3xl w-[80px] p-2 text-secondary bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary'
          >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TextCard;
