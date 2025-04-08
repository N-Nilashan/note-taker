'use client'
import { useState } from 'react';
import { Loader2, Pin, Edit2, Trash2, FileText } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import HighlightText from './HighlightText';

const TextCard = ({ title, content, onDelete, onEdit, date, noteId, summary: savedSummary, category, isPinned, onPin, searchQuery }) => {
  const [summary, setSummary] = useState(savedSummary || '');
  const [loading, setLoading] = useState(false);
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [summarized, setSummarized] = useState(!!savedSummary);

  const handleSummarize = async () => {
    if (!isLoaded || !isSignedIn) {
      console.error("Not authenticated when trying to summarize");
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to summarize');
      }

      const data = await response.json();
      setSummary(data.summary);

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
      setSummarized(true);
    }
  };

  return (
    <div
      className={`relative w-96 bg-[#F8F5F2] dark:bg-[#2D2D3A] shadow-lg border border-[#E5E0D9] dark:border-[#3D3D4A] rounded-xl p-6 transition-all duration-300 hover:shadow-xl ${
        isPinned ? 'border-2 border-emerald-500 dark:border-[#F8F5F2]' : ''
      }`}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h5 className="text-[#2D2D3A] dark:text-[#F8F5F2] text-xl font-semibold pr-8 leading-tight">
            <HighlightText text={title} searchQuery={searchQuery} />
          </h5>
          <button
            onClick={() => onPin(noteId, !isPinned)}
            className={`p-2 rounded-full hover:bg-[#E5E0D9] dark:hover:bg-[#3D3D4A] transition-colors ${
              isPinned
                ? 'text-emerald-500 dark:text-emerald-400'
                : 'text-[#2D2D3A]/40 dark:text-[#F8F5F2]/40 hover:text-emerald-500 dark:hover:text-emerald-400'
            }`}
            title={isPinned ? "Unpin note" : "Pin note"}
          >
            <Pin size={20} fill={isPinned ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-[#2D2D3A]/60 dark:text-[#F8F5F2]/60">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <span className="text-xs px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full font-medium">
            {category || 'General'}
          </span>
        </div>

        <div className="border-t border-[#E5E0D9] dark:border-[#3D3D4A] pt-4 mt-4">
          <div className="max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-200 dark:scrollbar-thumb-emerald-800/30 scrollbar-track-transparent">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="animate-spin text-emerald-500 dark:text-emerald-400" size={24} />
                <p className="text-emerald-500 dark:text-emerald-400 font-medium ml-3">Summarizing...</p>
              </div>
            ) : (
              <p className="text-[#2D2D3A]/80 dark:text-[#F8F5F2]/80 leading-relaxed">
                <HighlightText text={summary || content} searchQuery={searchQuery} />
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#E5E0D9] dark:border-[#3D3D4A]">
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-[#2D2D3A]/70 dark:text-[#F8F5F2]/70 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors rounded-lg hover:bg-[#E5E0D9] dark:hover:bg-[#3D3D4A]"
              title="Edit note"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-[#2D2D3A]/70 dark:text-[#F8F5F2]/70 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-[#E5E0D9] dark:hover:bg-[#3D3D4A]"
              title="Delete note"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <button
            onClick={handleSummarize}
            disabled={loading || summarized}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              loading || summarized
                ? 'bg-[#E5E0D9] dark:bg-[#3D3D4A] text-[#2D2D3A]/40 dark:text-[#F8F5F2]/40 cursor-not-allowed'
                : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/40 cursor-pointer'
            }`}
            title={summarized ? "Note already summarized" : "Generate AI summary"}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <FileText size={16} />
                {summarized ? 'Summarized' : 'Summarize'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextCard;
