
import React from 'react';

interface TopNavBarProps {
  onHomeClick: () => void;
  onProfileClick: () => void;
  onLoginClick: () => void;
  onSettingsClick: () => void;
  user: { name: string; picture: string } | null;
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
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const TopNavBar: React.FC<TopNavBarProps> = ({ onHomeClick, onProfileClick, onLoginClick, onSettingsClick, user }) => {
  return (
    <header className="fixed top-0 left-0 right-0 px-6 py-3 flex items-center justify-between z-20 bg-black/10 backdrop-blur-md border-b border-white/10">
      <button onClick={user ? onProfileClick : onHomeClick} className="flex items-center" aria-label="Go to home page">
        <LogoIcon />
        <span className="text-xl font-bold text-white">Rapid Web</span>
      </button>
      
      <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
        <button className="hover:text-white transition-colors">How It Works</button>
        <button className="hover:text-white transition-colors">Contact</button>
        <button className="hover:text-white transition-colors">About Us</button>
      </div>
      
      <div className="flex items-center gap-4 text-sm">
        <button onClick={onSettingsClick} className="p-2 text-gray-300 rounded-full hover:bg-white/10 hover:text-white transition-colors" aria-label="Settings">
            <SettingsIcon />
        </button>
        {user ? (
          <button onClick={onProfileClick} className="flex items-center gap-2 bg-black/30 p-1 pr-3 rounded-full border border-white/10 hover:bg-white/20 transition-colors" aria-label="View profile">
            <img src={user.picture} alt="User profile" className="w-7 h-7 rounded-full" />
            <span className="font-semibold text-white">{user.name.split(' ')[0]}</span>
          </button>
        ) : (
          <>
            <button onClick={onLoginClick} className="text-white font-semibold hover:text-gray-200 transition-colors">Login</button>
            <button onClick={onLoginClick} className="px-5 py-2 bg-white text-black font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
              Try Now
            </button>
          </>
        )}
      </div>
    </header>
  );
};
