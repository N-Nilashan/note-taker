'use client'
import { useState } from 'react';
import { Loader2, Pin, Edit2, Trash2, FileText, Calendar, Tag, RefreshCw, Sparkles, BookOpen } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import HighlightText from './HighlightText';
import ConfirmationModal from './ConfirmationModal';
import NoteModal from './NoteModal';

const TextCard = ({ title, content, onDelete, onEdit, date, noteId, summary: savedSummary, enhancedContent: savedEnhancedContent, category, isPinned, onPin, searchQuery }) => {
  const [summary, setSummary] = useState(savedSummary || '');
  const [originalContent] = useState(content);
  const [enhancedContent, setEnhancedContent] = useState(savedEnhancedContent || '');
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [summarized, setSummarized] = useState(!!savedSummary);
  const [enhanced, setEnhanced] = useState(!!savedEnhancedContent);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

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

  const handleEnhance = async () => {
    if (!isLoaded || !isSignedIn) {
      console.error("Not authenticated when trying to enhance");
      return;
    }

    setEnhancing(true);
    try {
      const token = await getToken();
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to enhance');
      }

      const data = await response.json();
      console.log('Enhanced text received:', data.enhancedText);
      setEnhancedContent(data.enhancedText);

      const updatePayload = {
        title,
        content,
        summary,
        category,
        isPinned,
        enhancedContent: data.enhancedText
      };
      console.log('Sending update to database:', updatePayload);

      const updateResponse = await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatePayload),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to save enhanced text to database');
      }

      const updatedNote = await updateResponse.json();
      console.log('Database update response:', updatedNote);

      setEnhancing(false);
      setEnhanced(true);
      setSummarized(false);
    } catch (err) {
      console.error("Enhance error:", err.message);
      setEnhancing(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        className={`relative w-full max-w-lg bg-[#F8F5F2] dark:bg-[#2D2D3A] shadow-lg border border-[#E5E0D9] dark:border-[#3D3D4A] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl ${isPinned ? 'border-2 border-emerald-500 dark:border-[#F8F5F2]' : ''}`}
      >
        {/* Header with pin indicator */}
        <div className={`h-2 ${isPinned ? 'bg-emerald-500' : 'bg-[#E5E0D9] dark:bg-[#3D3D4A]'}`}></div>

        <div className="p-6 space-y-5">
          {/* Title and pin button */}
          <div className="flex justify-between items-start">
            <h5
              onClick={() => setIsNoteModalOpen(true)}
              className="text-[#2D2D3A] dark:text-[#F8F5F2] text-xl font-semibold pr-8 leading-tight cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <HighlightText text={title} searchQuery={searchQuery} />
            </h5>
            <button
              onClick={() => onPin(noteId, !isPinned)}
              className={`p-2 rounded-full hover:bg-[#E5E0D9] dark:hover:bg-[#3D3D4A] transition-colors ${isPinned
                ? 'text-emerald-500 dark:text-emerald-400'
                : 'text-[#2D2D3A]/40 dark:text-[#F8F5F2]/40 hover:text-emerald-500 dark:hover:text-emerald-400'
                }`}
              title={isPinned ? "Unpin note" : "Pin note"}
            >
              <Pin size={20} fill={isPinned ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Metadata row */}
          <div className="flex flex-wrap gap-4 items-center text-sm text-[#2D2D3A]/60 dark:text-[#F8F5F2]/60">
            <div className="flex items-center gap-1.5">
              <Calendar size={16} />
              <span>
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Tag size={16} />
              <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-medium">
                {category || 'General'}
              </span>
            </div>
          </div>

          {/* Content area */}
          <div className="border-t border-[#E5E0D9] dark:border-[#3D3D4A] pt-5">
            <div
              className="max-h-56 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-200 dark:scrollbar-thumb-emerald-800/30 scrollbar-track-transparent cursor-pointer"
              onClick={() => setIsNoteModalOpen(true)}
            >
              {loading || enhancing ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="animate-spin text-emerald-500 dark:text-emerald-400" size={24} />
                  <p className="text-emerald-500 dark:text-emerald-400 font-medium ml-3">{loading ? 'Summarizing...' : 'Enhancing...'}</p>
                </div>
              ) : (
                <p className="text-[#2D2D3A]/80 dark:text-[#F8F5F2]/80 leading-relaxed">
                  <HighlightText
                    text={showOriginal ? originalContent : (enhanced ? enhancedContent : (summary || content))}
                    searchQuery={searchQuery}
                  />
                </p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-4 pt-5 border-t border-[#E5E0D9] dark:border-[#3D3D4A]">
            {/* View toggle button */}
            {(enhanced || summarized) && (
              <button
                onClick={() => setShowOriginal(!showOriginal)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#E5E0D9] dark:bg-[#3D3D4A] text-[#2D2D3A] dark:text-[#F8F5F2] rounded-lg text-sm font-medium hover:bg-[#D5D0C9] dark:hover:bg-[#4D4D5A] transition-colors"
              >
                <RefreshCw size={16} />
                {showOriginal ? 'Show Modified Version' : 'Show Original Version'}
              </button>
            )}

            {/* Action buttons row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex gap-2">
                <button
                  onClick={onEdit}
                  className="p-2.5 text-[#2D2D3A]/70 dark:text-[#F8F5F2]/70 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors rounded-lg hover:bg-[#E5E0D9] dark:hover:bg-[#3D3D4A]"
                  title="Edit note"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2.5 text-[#2D2D3A]/70 dark:text-[#F8F5F2]/70 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-[#E5E0D9] dark:hover:bg-[#3D3D4A]"
                  title="Delete note"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleEnhance}
                  disabled={enhancing || enhanced}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${enhancing || enhanced
                    ? 'bg-[#E5E0D9] dark:bg-[#3D3D4A] text-[#2D2D3A]/40 dark:text-[#F8F5F2]/40 cursor-not-allowed'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/40 cursor-pointer'
                    }`}
                  title={enhanced ? "Note already enhanced" : "Enhance writing quality"}
                >
                  {enhancing ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      <Sparkles size={16} />
                      {enhanced ? 'Enhanced' : 'Enhance'}
                    </>
                  )}
                </button>

                <button
                  onClick={handleSummarize}
                  disabled={loading || summarized}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${loading || summarized
                    ? 'bg-[#E5E0D9] dark:bg-[#3D3D4A] text-[#2D2D3A]/40 dark:text-[#F8F5F2]/40 cursor-not-allowed'
                    : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/40 cursor-pointer'
                    }`}
                  title={summarized ? "Note already summarized" : "Generate AI summary"}
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      <BookOpen size={16} />
                      {summarized ? 'Summarized' : (enhanced ? 'Summarize Again' : 'Summarize')}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
      />

      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        title={title}
        content={content}
        date={date}
        category={category}
        enhancedContent={enhancedContent}
        showOriginal={showOriginal}
        onToggleOriginal={() => setShowOriginal(!showOriginal)}
        onEdit={onEdit}
        onDelete={handleDelete}
        onPin={onPin}
        isPinned={isPinned}
        noteId={noteId}
        onEnhance={handleEnhance}
        onSummarize={handleSummarize}
        isEnhancing={enhancing}
        isSummarizing={loading}
        isEnhanced={enhanced}
        isSummarized={summarized}
      />
    </>
  );
};

export default TextCard;
