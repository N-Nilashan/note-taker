'use client'
import { X } from 'lucide-react'

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Dark background overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <div className="bg-[#F8F5F2] dark:bg-[#2D2D3A] rounded-xl p-6 shadow-xl border border-[#E5E0D9] dark:border-[#3D3D4A]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-[#2D2D3A] dark:text-[#F8F5F2]">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-[#2D2D3A]/60 dark:text-[#F8F5F2]/60 hover:text-[#2D2D3A] dark:hover:text-[#F8F5F2] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-[#2D2D3A]/70 dark:text-[#F8F5F2]/70 mb-6">
            {message}
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#E5E0D9] dark:bg-[#3D3D4A] text-[#2D2D3A] dark:text-[#F8F5F2] hover:bg-[#E5E0D9]/80 dark:hover:bg-[#3D3D4A]/80 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
