'use client'
import { useState } from 'react';
import { Loader2, Pin } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import HighlightText from './HighlightText';

const TextCard = ({ title, content, onDelete, onEdit, date, noteId, summary: savedSummary, category, isPinned, onPin, searchQuery }) => {
  const [summary, setSummary] = useState(savedSummary || '');
  const [loading, setLoading] = useState(false);
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [summarized, setSummarized] = useState(!!savedSummary)

  const handleSummarize = async () => {
    if (!isLoaded || !isSignedIn) {
      console.error("Not authenticated when trying to summarize");
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      console.log("Auth token for summarize:", token ? "Token exists" : "No token");

      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content }),
      });

      console.log("Summarize response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.error || 'Failed to summarize');
      }

      const data = await response.json();
      setSummary(data.summary);

      // Save the summary to the database
      const updateResponse = await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content,
          summary: data.summary
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to save summary to database');
      }
    } catch (err) {
      console.error("Summarize error:", err.message);
    } finally {
      setLoading(false);
      setSummarized(true)
    }
  };

  return (
    <div className={`relative dark:bg-[#0C1716] w-96 bg-white shadow-sm border border-emerald-700/30 rounded-3xl p-3 pb-6 ${isPinned ? 'border-2 border-emerald-500' : ''}`}>
      <div className="justify-start mb-3 px-2">
        <div className="flex justify-between items-center">
          <h5 className="text-primary dark:text-emerald-400 text-2xl font-semibold">
            <HighlightText text={title} searchQuery={searchQuery} />
          </h5>
          <button
            onClick={() => onPin(noteId, !isPinned)}
            className={`p-1 rounded-full ${isPinned ? 'text-emerald-500' : 'text-gray-400 hover:text-emerald-500'}`}
            title={isPinned ? "Unpin note" : "Pin note"}
          >
            <Pin size={18} fill={isPinned ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400 dark:text-gray-300">{new Date(date).toLocaleString()}</p>
          <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full">
            {category || 'General'}
          </span>
        </div>
      </div>
      <div className="p-3 mt-5 border-t border-emerald-700/30 max-h-52 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin text-emerald-900 dark:text-emerald-400" size={24} />
            <p className="text-emerald-900 dark:text-emerald-400 font-light ml-2">Summarizing...</p>
          </div>
        ) : (
          <p className="block text-emerald-900 dark:text-emerald-100 leading-normal font-light mb-4 max-w-lg">
            <HighlightText text={summary || content} searchQuery={searchQuery} />
          </p>
        )}
      </div>
      <div className='flex mt-3 items-center justify-evenly font-semibold'>
        <button
          onClick={onEdit}
          className='rounded-3xl w-[70px] p-2 text-white bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-800/40 dark:hover:bg-emerald-800/60'>
          Edit
        </button>
        <button
          onClick={handleSummarize}
          disabled={loading || summarized}
          className={`rounded-3xl w-[120px] p-2 text-white bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-800/40 dark:hover:bg-emerald-800/60 ${loading || summarized ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        >
          {loading ? <Loader2 className="animate-spin inline-block" size={16} /> : 'Summarize'}
        </button>
        <button
          onClick={onDelete}
          className='rounded-3xl w-[80px] p-2 text-white bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-800/40 dark:hover:bg-emerald-800/60'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TextCard;
