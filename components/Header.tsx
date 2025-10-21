import React from 'react';

interface HeaderProps {
  onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  return (
    <header className="bg-black/20 backdrop-blur-md p-4 flex items-center z-10 border-b border-white/10">
      <button onClick={onHomeClick} className="flex items-center group" aria-label="Go to home page">
        <svg
          className="w-8 h-8 text-blue-400 mr-3 group-hover:text-blue-300 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          ></path>
        </svg>
        <h1 className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors">
          Rapid Web
        </h1>
      </button>
    </header>
  );
};
