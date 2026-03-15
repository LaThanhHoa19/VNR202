import React from 'react';

export default function ScoreBoard({ score, playerName }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-3">
      <div className="flex items-center gap-1.5 sm:gap-2 glass-card px-2 sm:px-4 py-1.5 sm:py-2">
        <span className="text-gray-500 text-[10px] sm:text-xs">👤</span>
        <span className="text-gray-300 text-[10px] sm:text-sm font-medium truncate max-w-[60px] sm:max-w-none">{playerName}</span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2 bg-primary-900/40 border border-primary-700/50 rounded-xl px-2 sm:px-4 py-1.5 sm:py-2">
        <span className="text-primary-400 text-[10px] sm:text-sm">⭐</span>
        <span className="text-primary-300 font-bold text-[10px] sm:text-sm whitespace-nowrap">{score} đ</span>
      </div>
    </div>
  );
}
