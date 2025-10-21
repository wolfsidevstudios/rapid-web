
import React from 'react';

interface CodeEditorProps {
  filePath: string;
  code: string;
  onChange: (newCode: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ filePath, code, onChange }) => {
  return (
    <div className="flex flex-col h-full bg-gray-900/50">
      <div className="flex-shrink-0 bg-black/30 p-2 border-b border-white/10">
        <p className="text-sm text-gray-300 truncate">{filePath}</p>
      </div>
      <textarea
        key={filePath} // Force re-render on file change
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full p-4 bg-transparent text-gray-200 font-mono text-sm resize-none focus:outline-none"
        spellCheck="false"
      />
    </div>
  );
};
