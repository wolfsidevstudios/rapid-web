
import React from 'react';

type View = 'preview' | 'code';

interface ViewSwitcherProps {
  currentView: View;
  onSwitch: (view: View) => void;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ currentView, onSwitch }) => {
  const getButtonClass = (view: View) => 
    `px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
      currentView === view ? 'bg-white text-black' : 'text-gray-300 hover:bg-white/10'
    }`;

  return (
    <div className="flex items-center bg-black/30 backdrop-blur-sm p-1 rounded-full border border-white/10">
      <button 
        onClick={() => onSwitch('preview')} 
        className={getButtonClass('preview')}
        aria-pressed={currentView === 'preview'}
      >
        Preview
      </button>
      <button 
        onClick={() => onSwitch('code')} 
        className={getButtonClass('code')}
        aria-pressed={currentView === 'code'}
      >
        Code
      </button>
    </div>
  );
};
