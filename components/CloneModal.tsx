import React, { useState } from 'react';

interface CloneModalProps {
  onClose: () => void;
  onClone: (url: string) => void;
}

export const CloneModal: React.FC<CloneModalProps> = ({ onClose, onClone }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return;
    onClone(trimmedUrl);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-gray-900/80 border border-white/20 rounded-2xl shadow-2xl p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" aria-label="Close modal">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">
          Clone from URL
        </h2>
        <p className="text-gray-400 mb-8">
          Enter the URL of a website you'd like to visually clone. The AI will attempt to replicate its layout and style.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full p-3 bg-black/20 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
            required
            autoFocus
          />
          <button
            type="submit"
            disabled={!url.trim()}
            className="w-full mt-6 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-gray-500/50 disabled:cursor-not-allowed"
          >
            Clone Website
          </button>
        </form>
      </div>
    </div>
  );
};