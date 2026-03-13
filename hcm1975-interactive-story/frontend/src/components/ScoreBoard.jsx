import React from 'react';

export default function ScoreBoard({ score, playerName }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 glass-card px-4 py-2">
        <span className="text-gray-500 text-xs">👤</span>
        <span className="text-gray-300 text-sm font-medium">{playerName}</span>
      </div>
      <div className="flex items-center gap-2 bg-primary-900/40 border border-primary-700/50 rounded-xl px-4 py-2">
        <span className="text-primary-400 text-sm">⭐</span>
        <span className="text-primary-300 font-bold text-sm">{score} điểm</span>
      </div>
    </div>
  );
}
