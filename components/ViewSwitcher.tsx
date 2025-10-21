import React from 'react';

type View = 'code' | 'preview';

interface ViewSwitcherProps {
  activeView: View;
  setActiveView: (view: View) => void;
  onOpenInNewTab: () => void;
}

const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const PreviewIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const OpenInNewTabIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);


export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ activeView, setActiveView, onOpenInNewTab }) => {
  const getButtonClass = (view: View) =>
    `flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 focus:outline-none ${
      activeView === view
        ? 'border-blue-400 text-blue-300'
        : 'border-transparent text-gray-400 hover:text-gray-200'
    }`;

  return (
    <div className="flex-shrink-0 border-b border-white/10 flex justify-between items-center">
      <div className="flex">
        <button onClick={() => setActiveView('code')} className={getButtonClass('code')}>
          <CodeIcon/>
          Code
        </button>
        <button onClick={() => setActiveView('preview')} className={getButtonClass('preview')}>
          <PreviewIcon/>
          Preview
        </button>
      </div>
      <button 
        onClick={onOpenInNewTab} 
        className="p-2 mr-2 text-gray-400 hover:text-white transition-colors focus:outline-none rounded-md hover:bg-white/10"
        aria-label="Open in new tab"
        title="Open in new tab"
      >
        <OpenInNewTabIcon />
      </button>
    </div>
  );
};