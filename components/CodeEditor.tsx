
import React from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  return (
    <div className="flex-grow flex flex-col h-full">
      <div className="flex-shrink-0 bg-black/20 p-2 text-sm text-gray-300 font-semibold">
        Editor
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck="false"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        className="w-full h-full p-4 bg-[#282c34] text-gray-200 font-mono text-sm resize-none focus:outline-none flex-grow"
        placeholder="Write your React Native code here..."
      />
    </div>
  );
};