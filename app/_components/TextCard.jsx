'use client'
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const TextCard = ({ title, content, onDelete, onEdit, date }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const [summarized, setSummarized] = useState(false)

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to summarize');
      setSummary(data.summary);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
      setSummarized(true)
    }
  };

  return (
    <div className="relative dark:bg-[#0C1716] w-96 bg-white shadow-sm border border-emerald-700/30 rounded-3xl p-3 pb-6">
      <div className="justify-start mb-3 px-2">
        <h5 className="text-primary dark:text-emerald-400 text-2xl font-semibold">{title}</h5>
        <p className="text-sm text-gray-400 dark:text-gray-300">{new Date(date).toLocaleString()}</p>
      </div>
      <div className="p-3 mt-5 border-t border-emerald-700/30 text-center max-h-52 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin text-emerald-900 dark:text-emerald-400" size={24} />
            <p className="text-emerald-900 dark:text-emerald-400 font-light ml-2">Summarizing...</p>
          </div>
        ) : (
          <p className="block text-emerald-900 dark:text-emerald-100 leading-normal font-light mb-4 max-w-lg">
            {summary || content}
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
