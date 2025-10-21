
import React from 'react';

interface TopNavBarProps {
  onSettingsClick: () => void;
}

const LogoIcon = () => (
    <div className="w-9 h-9 mr-2 flex-shrink-0 flex items-center justify-center p-1 border border-white/20 backdrop-blur-sm rounded-lg">
        <img 
            src="https://i.ibb.co/Mky3qwdz/Google-AI-Studio-2025-10-21-T01-17-11-406-Z-modified-1.png" 
            alt="Rapid Web Logo" 
            className="w-full h-full"
        />
    </div>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);


export const TopNavBar: React.FC<TopNavBarProps> = ({ onSettingsClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 px-6 py-3 flex items-center justify-between z-20 bg-black/10 backdrop-blur-md border-b border-white/10">
      {/* Left section: Logo and App Name */}
      <div className="flex items-center">
        <LogoIcon />
        <span className="text-xl font-bold text-white">Rapid Web</span>
      </div>
      
      {/* Middle section: Navigation Links (hidden on small screens) */}
      <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
        <button className="hover:text-white transition-colors">How It Works</button>
        <button className="hover:text-white transition-colors">Contact</button>
        <button className="hover:text-white transition-colors">About Us</button>
      </div>
      
      {/* Right section: Action Buttons */}
      <div className="flex items-center gap-4 text-sm">
        <button className="text-white font-semibold hover:text-gray-200 transition-colors">Login</button>
        <button className="px-5 py-2 bg-white text-black font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
          Try Now
        </button>
        <button onClick={onSettingsClick} className="text-white hover:text-gray-200 transition-colors" aria-label="Settings">
          <SettingsIcon />
        </button>
      </div>
    </header>
  );
};
