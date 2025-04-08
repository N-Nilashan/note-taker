import { X, Pin, Edit2, Trash2, FileText, Loader2, Calendar, Tag, RefreshCw, Sparkles, BookOpen } from 'lucide-react';

const NoteModal = ({
  isOpen,
  onClose,
  title,
  content,
  date,
  category,
  enhancedContent,
  showOriginal,
  onToggleOriginal,
  onEdit,
  onDelete,
  onPin,
  isPinned,
  noteId,
  onEnhance,
  onSummarize,
  isEnhancing,
  isSummarizing,
  isEnhanced,
  isSummarized
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Dark background overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10" onClick={onClose}></div>

      <div className="p-6 z-20 rounded-2xl border w-[90%] max-w-4xl h-[85vh] dark:bg-[#2D2D3A] bg-[#F8F5F2] shadow-xl border-[#E5E0D9] dark:border-[#3D3D4A] text-[#2D2D3A] dark:text-[#F8F5F2] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start gap-4 mb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">{title}</h2>
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-[#2D2D3A]/60 dark:text-[#F8F5F2]/60">
                <Calendar size={16} />
                <span>
                  {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={16} />
                <span className="text-sm px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full font-medium">
                  {category || 'General'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#E5E0D9] dark:hover:bg-[#3D3D4A] rounded-lg transition-colors"
            >
              <X className="text-[#2D2D3A]/60 dark:text-[#F8F5F2]/60" size={20} />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={onEnhance}
            disabled={isEnhancing || isEnhanced}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isEnhancing || isEnhanced
              ? 'bg-[#E5E0D9] dark:bg-[#3D3D4A] text-[#2D2D3A]/40 dark:text-[#F8F5F2]/40 cursor-not-allowed'
              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/40 cursor-pointer'
              }`}
            title={isEnhanced ? "Note already enhanced" : "Enhance writing quality"}
          >
            {isEnhancing ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <Sparkles size={16} />
                {isEnhanced ? 'Enhanced' : 'Enhance'}
              </>
            )}
          </button>

          <button
            onClick={onSummarize}
            disabled={isSummarizing || isSummarized}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isSummarizing || isSummarized
              ? 'bg-[#E5E0D9] dark:bg-[#3D3D4A] text-[#2D2D3A]/40 dark:text-[#F8F5F2]/40 cursor-not-allowed'
              : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/40 cursor-pointer'
              }`}
            title={isSummarized ? "Note already summarized" : "Generate AI summary"}
          >
            {isSummarizing ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <BookOpen size={16} />
                {isSummarized ? 'Summarized' : 'Summarize'}
              </>
            )}
          </button>

          {enhancedContent && (
            <button
              onClick={onToggleOriginal}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${showOriginal
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300'
                : 'bg-[#E5E0D9] dark:bg-[#3D3D4A] text-[#2D2D3A] dark:text-[#F8F5F2]'
                }`}
            >
              <RefreshCw size={16} />
              {showOriginal ? 'Show Enhanced' : 'Show Original'}
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-emerald-200 dark:scrollbar-thumb-emerald-800/30 scrollbar-track-transparent">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-[#2D2D3A]/80 dark:text-[#F8F5F2]/80 leading-relaxed whitespace-pre-wrap text-base">
              {showOriginal ? content : (enhancedContent || content)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteModal;
