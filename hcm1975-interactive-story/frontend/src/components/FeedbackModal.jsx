import React from 'react';

export default function FeedbackModal({ isOpen, consequence, philosophy, onContinue }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-dark-950/95 backdrop-blur-md animate-fade-in">
      <div className="glass-card max-w-lg w-full p-6 sm:p-8 border-primary-500/30 shadow-2xl animate-slide-up">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-600 flex items-center justify-center text-lg sm:text-xl">
            ✓
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white font-display">Kết quả hành động</h3>
        </div>

        <div className="space-y-6">
          <div className="bg-dark-600/50 p-4 rounded-xl border border-dark-500">
            <p className="text-gray-200 leading-relaxed italic">
              "{consequence}"
            </p>
          </div>

          <div className="philosophy-box">
            <p className="text-primary-300 text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-2">
              <span>🎓</span> Phân tích Triết học
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              {philosophy}
            </p>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="btn-primary w-full mt-8 py-4 text-lg font-bold tracking-wide"
        >
          Tiếp tục hành trình →
        </button>
      </div>
    </div>
  );
}
