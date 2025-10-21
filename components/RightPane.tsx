
import React, { useState } from 'react';
import { CodeEditor } from './CodeEditor';
import { Preview } from './Preview';
import { ViewSwitcher } from './ViewSwitcher';

declare const Babel: any;

type View = 'code' | 'preview';

interface RightPaneProps {
  files: Record<string, string>;
  activeFile: string;
  onCodeChange: (path: string, newCode: string) => void;
  isStreaming: boolean;
}

export const RightPane: React.FC<RightPaneProps> = ({ files, activeFile, onCodeChange, isStreaming }) => {
  const [activeView, setActiveView] = useState<View>('preview');

  const handleOpenInNewTab = () => {
    try {
      const allCode = Object.values(files).join('\n\n// --- File Boundary ---\n\n');
      const transformedCode = Babel.transform(allCode, {
        presets: [
          ['react', { runtime: 'classic' }],
          'typescript',
        ],
        filename: 'Component.tsx'
      }).code;

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Rapid Web - Preview</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <script type="importmap">
            {
              "imports": {
                "react": "https://aistudiocdn.com/react@^19.2.0",
                "react/": "https://aistudiocdn.com/react@^19.2.0/",
                "react-dom/client": "https://aistudiocdn.com/react-dom@^19.2.0/client"
              }
            }
            </script>
          </head>
          <body class="w-full h-screen">
            <div id="root" class="w-full h-full"></div>
            <script type="module">
              import React from 'react';
              import ReactDOM from 'react-dom/client';

              const ErrorDisplay = ({ error }) => {
                const errorStyle = { padding: '1rem', backgroundColor: '#fff5f5', borderLeft: '4px solid #f56565', color: '#c53030', height: '100%', fontFamily: 'monospace' };
                const preStyle = { whiteSpace: 'pre-wrap', marginTop: '0.5rem', backgroundColor: '#fed7d7', padding: '0.5rem', borderRadius: '0.25rem' };
                return React.createElement('div', { style: errorStyle }, 
                  React.createElement('h2', { style: { fontWeight: 'bold' } }, 'Error'),
                  React.createElement('pre', { style: preStyle }, error.message)
                );
              };

              try {
                ${transformedCode}
                if (typeof Component === 'undefined') {
                  throw new Error("The code did not assign a React component to the 'Component' variable.");
                }
                const rootElement = document.getElementById('root');
                const root = ReactDOM.createRoot(rootElement);
                root.render(React.createElement(Component));
              } catch (err) {
                console.error("Error rendering component in new tab:", err);
                const rootElement = document.getElementById('root');
                const root = ReactDOM.createRoot(rootElement);
                root.render(React.createElement(ErrorDisplay, { error: err }));
              }
            </script>
          </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err: any) {
      alert('Failed to open in new tab. There might be a syntax error in your code.');
      console.error("Babel transformation error:", err);
    }
  };

  const codeForActiveFile = files[activeFile] || '';
  const concatenatedCode = Object.values(files).join('\n\n// --- File Boundary ---\n\n');

  return (
    <div className="flex flex-col h-full w-full relative">
      {isStreaming && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-semibold">AI is updating the project files...</p>
          </div>
        </div>
      )}
      <ViewSwitcher 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onOpenInNewTab={handleOpenInNewTab}
      />
      <div className="flex-grow h-full overflow-hidden">
        {activeView === 'code' && (
          <CodeEditor value={codeForActiveFile} onChange={(newCode) => onCodeChange(activeFile, newCode)} />
        )}
        {activeView === 'preview' && <Preview code={concatenatedCode} />}
      </div>
    </div>
  );
};
