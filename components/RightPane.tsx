
import React, { useState, useMemo } from 'react';
import { PreviewCanvas } from './PreviewCanvas';
import { EditState } from '../App';
import { CodeEditor } from './CodeEditor';
import { ViewSwitcher } from './ViewSwitcher';
import { FileExplorer } from './FileExplorer';
import { ClassicPreview } from './ClassicPreview';

type PreviewMode = 'canvas' | 'classic';
type ProjectType = 'web' | 'native';

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
  onPublishClick: () => void;
  onFirebasePublishClick: () => void;
  isFirebaseConfigured: boolean;
  projectType: ProjectType;
}

const OpenInNewTabIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const NetlifyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor" color="#00c7b7">
        <path d="M16.25 0H7.75L0 7.75v8.5L7.75 24h8.5L24 16.25v-8.5L16.25 0zM12 4.125a.875.875 0 110 1.75.875.875 0 010-1.75zM4.125 12a.875.875 0 111.75 0 .875.875 0 01-1.75 0zm1.75 6.125L4.125 16.375l-1.25 1.25L4.625 19.375l1.25-1.25zM12 18.125a.875.875 0 110 1.75.875.875 0 010-1.75zm6.125-1.75L16.375 18.125l1.25-1.25 1.75 1.75-1.25 1.25zm1.75-6.125a.875.875 0 111.75 0 .875.875 0 01-1.75 0zM18.125 4.125l-1.75 1.75L17.625 7l1.25-1.25-1.75-1.75zM12 6.25a5.75 5.75 0 100 11.5 5.75 5.75 0 000-11.5z"/>
    </svg>
);

const FirebaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 48 48" fill="none">
        <path d="M10.8 4.2L4 24L10.8 43.8L24 28.5V4.2H10.8Z" fill="#FFC24A"/>
        <path d="M24 4.2V28.5L37.2 43.8L24 4.2Z" fill="#F4BD41"/>
        <path d="M24 33.6L10.8 43.8L15 33.6H24Z" fill="#F6820C"/>
        <path d="M24 33.6H15L18.6 24L24 33.6Z" fill="#F8A722"/>
        <path d="M24 28.5L18.6 24L24 4.2V28.5Z" fill="#FCCA3F"/>
    </svg>
);


export const RightPane: React.FC<RightPaneProps> = (props) => {
  const [view, setView] = useState<'preview' | 'code'>('preview');

  const concatenatedCode = useMemo(() => {
    // This is a simple heuristic. A more robust solution might be needed if the code gets complex.
    // FIX: Explicitly type `content` as `string` to resolve error where it was inferred as `unknown`.
    const isReactNative = Object.values(props.files).some((content: string) => content.includes('StyleSheet.create') || content.includes('from \'react-native\''));

    // By filtering for script files, we prevent Babel from trying to parse CSS or other non-JS files.
    const allCode = Object.entries(props.files)
        .filter(([path]) => /\.(j|t)sx?$/.test(path))
        .map(([, content]) => content)
        .join('\n\n// --- File Boundary ---\n\n');
    
    // For react native web, React is already in scope. We need to alias React Native components.
    // However, the import map handles `import ... from 'react-native'`.
    // The main issue is code that doesn't use imports but expects components to be global.
    // The current generated code uses React.StyleSheet, etc., which won't work. It needs to use StyleSheet directly.
    // But the preview environment doesn't have `import` support within the executed code string itself.
    // The solution is to ensure the AI generates code with `import { View, ... } from 'react-native'`, which the import map will handle.
    
    return allCode;
  }, [props.files]);

  const handleOpenInNewTab = () => {
    const cssCode = Object.entries(props.files)
        .filter(([path]) => /\.css$/.test(path))
        .map(([, content]) => content)
        .join('\n');

    const appTsxContent = props.files['src/App.tsx'] || '';
    const otherJsxFilesContent = Object.entries(props.files)
        .filter(([path]) => path !== 'src/App.tsx' && /\.(j|t)sx?$/.test(path))
        .map(([, content]) => content)
        .join('\n\n// --- File Boundary ---\n\n');

    const scriptCode = (otherJsxFilesContent ? `${otherJsxFilesContent}\n\n// --- File Boundary ---\n\n${appTsxContent}` : appTsxContent)
      .replace(/<\/script>/g, '<\\/script>');
    
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>App Preview</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
      <script src="https://unpkg.com/@babel/standalone@7.24.0/babel.min.js"></script>
      <style>${cssCode}</style>
    </head>
    <body>
      <div id="root" style="display: flex; flex-direction: column; height: 100vh;"></div>
      <script type="text/babel" data-type="module">
        import React from 'react';
        import ReactDOM from 'react-dom';
        import { AppRegistry } from 'https://cdn.skypack.dev/react-native-web';

        try {
          ${scriptCode}
          
          const rootElement = document.getElementById('root');
          if (rootElement) {
            if (typeof Component !== 'undefined') {
               const isNative = ${props.projectType === 'native'};
               if (isNative) {
                 AppRegistry.registerComponent('App', () => Component);
                 AppRegistry.runApplication('App', { rootTag: rootElement });
               } else {
                 const root = ReactDOM.createRoot(rootElement);
                 root.render(React.createElement(Component));
               }
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
              onClick={props.onPublishClick}
              className="px-3 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-500 transition-colors flex items-center gap-1 shadow-md"
              title="Publish to Netlify"
            >
              <NetlifyIcon />
              Deploy
            </button>
            <button
              onClick={props.onFirebasePublishClick}
              className="px-3 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-400 transition-colors flex items-center gap-1 shadow-md disabled:bg-gray-600 disabled:opacity-50"
              title={props.isFirebaseConfigured ? "Deploy to Firebase Hosting" : "Configure Firebase in Integrations to deploy"}
              disabled={!props.isFirebaseConfigured}
            >
              <FirebaseIcon />
              Deploy
            </button>
            <button
              onClick={handleOpenInNewTab}
              className="p-2 text-gray-300 rounded-full hover:bg-white/10 hover:text-white transition-colors bg-black/30 backdrop-blur-sm border border-white/10"
              title="Open in new tab"
              aria-label="Open preview in new tab"
            >
              <OpenInNewTabIcon />
            </button>
            <div className="text-xs font-semibold text-gray-400 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
                {props.projectType === 'native' ? 'React Native' : 'React Web'}
            </div>
            <ViewSwitcher currentView={view} onSwitch={setView} />
        </div>
        
        <div className="flex-grow overflow-hidden">
            {view === 'preview' ? (
                props.previewMode === 'canvas' ? (
                    <PreviewCanvas {...props} />
                ) : (
                    <ClassicPreview code={concatenatedCode} isNative={props.projectType === 'native'} />
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