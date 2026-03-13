import React, { useState } from 'react';

export default function SceneImage({ imageUrl, title }) {
  const [imgError, setImgError] = useState(false);

  if (!imageUrl || imgError) return null;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-6 group">
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10" />
      <img
        src={imageUrl}
        alt={title}
        onError={() => setImgError(true)}
        className="w-full h-56 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <p className="text-white text-xs font-medium opacity-70 tracking-wider uppercase">
          {title}
        </p>
      </div>
    </div>
  );
}
