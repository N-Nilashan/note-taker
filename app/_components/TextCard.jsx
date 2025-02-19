'use client'
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const TextCard = ({ title, content, onDelete }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const [summarized,setSummarized] = useState(false)

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
    <div className="relative dark:bg-black w-96 bg-white shadow-sm border border-emerald-400 rounded-3xl p-3 pb-6">
      <div className="justify-start mb-3 px-2">
        <h5 className="text-primary dark:text-secondary text-2xl font-semibold">{title}</h5>
        <p className='text-primary mt-3 dark:text-secondary'>Work</p>
      </div>
      <div className="p-3 mt-5 border-t border-emerald-400 text-center max-h-52 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin text-emerald-900 dark:text-secondary" size={24} />
            <p className="text-emerald-900 dark:text-secondary font-light ml-2">Summarizing...</p>
          </div>
        ) : (
          <p className="block text-emerald-900 dark:text-secondary leading-normal font-light mb-4 max-w-lg">
            {summary || content} {/* Show summary if available */}
          </p>
        )}
      </div>
      <div className='flex mt-3 items-center justify-evenly font-semibold'>
        <button className='rounded-3xl w-[70px] p-2 text-secondary bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary'>
          Edit
        </button>
        <button
          onClick={handleSummarize}
          disabled={loading || summarized}
          className={`rounded-3xl w-[120px] p-2 text-secondary bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-900 dark:bg-primary ${loading || summarized ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {loading ? <Loader2 className="animate-spin inline-block" size={16} /> : 'Summarize'}
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
