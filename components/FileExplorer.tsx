
import React from 'react';

interface FileExplorerProps {
  files: string[];
  activeFile: string;
  onSelectFile: (path: string) => void;
}

const FileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

export const FileExplorer: React.FC<FileExplorerProps> = ({ files, activeFile, onSelectFile }) => {
  return (
    <div className="flex flex-col h-1/3 max-h-48">
       <div className="flex-shrink-0 bg-black/20 p-2 text-sm text-gray-300 font-semibold border-b border-white/10">
        Files
      </div>
      <div className="flex-grow p-2 overflow-y-auto">
        {files.map(path => (
          <button
            key={path}
            onClick={() => onSelectFile(path)}
            className={`w-full flex items-center text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
              activeFile === path
                ? 'bg-blue-500/30 text-white'
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            <FileIcon />
            <span className="truncate">{path}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
