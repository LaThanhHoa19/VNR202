import React from 'react';

export default function StoryPanel({ title, content, sceneId }) {
  return (
    <div className="glass-card p-6 md:p-8 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-primary-500 text-xs font-semibold uppercase tracking-widest mt-1">
          Scene {sceneId}
        </span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
        {title}
      </h2>
      <div className="w-12 h-0.5 bg-primary-600 mb-4 rounded-full" />
      <p className="text-gray-300 leading-relaxed text-base md:text-lg">{content}</p>
    </div>
  );
}
