
import React, { useState, useMemo } from 'react';
import { PreviewCanvas } from './PreviewCanvas';
import { EditState } from '../App';
import { CodeEditor } from './CodeEditor';
import { ViewSwitcher } from './ViewSwitcher';
import { FileExplorer } from './FileExplorer';
import { ClassicPreview } from './ClassicPreview';

type PreviewMode = 'canvas' | 'classic';

interface RightPaneProps {
  files: Record<string, string>;
  activeFile: string;
  onSelectFile: (path: string) => void;
  onCodeChange: (path: string, newContent: string) => void;
  isStreaming: boolean;
  isLoading: boolean;
  editState: EditState;
  setEditState: (state: EditState) => void;
  onAiRequest: (prompt: string, context: EditState) => void;
  previewMode: PreviewMode;
}

const OpenInNewTabIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);


export const RightPane: React.FC<RightPaneProps> = (props) => {
  const [view, setView] = useState<'preview' | 'code'>('preview');

  const concatenatedCode = useMemo(() => Object.values(props.files).join('\n\n// --- File Boundary ---\n\n'), [props.files]);

  const handleOpenInNewTab = () => {
    const otherFilesCode = Object.entries(props.files)
        .filter(([path]) => path !== 'src/App.tsx')
        .map(([, content]) => content)
        .join('\n\n// --- File Boundary ---\n\n');

    const appTsxCode = props.files['src/App.tsx'] || '';
    
    let fullCode = `${otherFilesCode}\n\n// --- File Boundary ---\n\n${appTsxCode}`;
    // Escape any closing script tags that might be in the user's code.
    fullCode = fullCode.replace(/<\/script>/g, '<\\/script>');

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>App Preview</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script crossorigin src="https://unpkg.com/react@19.0.0-rc.0/umd/react.development.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@19.0.0-rc.0/umd/react-dom.development.js"></script>
      <script src="https://unpkg.com/@babel/standalone@7.24.0/babel.min.js"></script>
    </head>
    <body>
      <div id="root"></div>
      <script type="text/babel">
        try {
          ${fullCode}
          
          const rootElement = document.getElementById('root');
          if (rootElement) {
            const root = ReactDOM.createRoot(rootElement);
            if (typeof Component !== 'undefined') {
               root.render(<Component />);
            } else {
               throw new Error("'Component' is not defined. Make sure src/App.tsx assigns the root component to a 'Component' variable.");
            }
          } else {
            throw new Error("Root element with id 'root' not found.");
          }
        } catch(e) {
          document.body.innerHTML = '<div style="position: fixed; inset: 0; background-color: #111; color: #f87171; padding: 2rem; font-family: monospace; font-size: 1rem; overflow: auto;"><h1>Preview Error</h1><pre>' + e.stack + '</pre></div>';
          console.error(e);
        }
      </script>
    </body>
    </html>
    `;

    const blob = new Blob([htmlContent.trim()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank')?.focus();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`w-full flex-1 flex flex-col bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg overflow-hidden relative ${props.isLoading && !props.isStreaming ? 'loading-glow' : ''}`}>
        {props.isStreaming && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center">
                <div className="text-white text-center">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="font-semibold">AI is updating the project files...</p>
                </div>
            </div>
        )}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={handleOpenInNewTab}
              className="p-2 text-gray-300 rounded-full hover:bg-white/10 hover:text-white transition-colors bg-black/30 backdrop-blur-sm border border-white/10"
              title="Open in new tab"
              aria-label="Open preview in new tab"
            >
              <OpenInNewTabIcon />
            </button>
            <ViewSwitcher currentView={view} onSwitch={setView} />
        </div>
        
        <div className="flex-grow overflow-hidden">
            {view === 'preview' ? (
                props.previewMode === 'canvas' ? (
                    <PreviewCanvas {...props} />
                ) : (
                    <ClassicPreview code={concatenatedCode} />
                )
            ) : (
                <div className="flex h-full">
                    <div className="w-1/3 max-w-xs border-r border-white/10 bg-black/10">
                        <FileExplorer
                        files={Object.keys(props.files)}
                        activeFile={props.activeFile}
                        onSelectFile={props.onSelectFile}
                        />
                    </div>
                    <div className="flex-1">
                        <CodeEditor
                            filePath={props.activeFile}
                            code={props.files[props.activeFile] || ''}
                            onChange={(newCode) => props.onCodeChange(props.activeFile, newCode)}
                        />
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};
