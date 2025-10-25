
import React, { useEffect, useState, useMemo } from 'react';

interface ClassicPreviewProps {
  code: string;
}

// This function generates the complete HTML for the iframe content
const generateHtml = (code: string) => {
    // Escape backticks and other template literal characters in the code
    const escapedCode = code.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>App Preview</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/@babel/standalone@7.24.0/babel.min.js"></script>
        <script type="importmap">
        {
          "imports": {
            "react": "https://aistudiocdn.com/react@^19.2.0",
            "react/": "https://aistudiocdn.com/react@^19.2.0/",
            "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/",
            "@google/genai": "https://aistudiocdn.com/@google/genai@^1.25.0",
            "react-draggable": "https://aistudiocdn.com/react-draggable@^4.4.6",
            "react-native": "https://aistudiocdn.com/react-native-web@^0.19.11"
          }
        }
        </script>
        <style>
          body { margin: 0; background-color: white; color: black; }
          .error-container { 
            padding: 1rem; background-color: #450a0a; border-left: 4px solid #f87171; 
            color: #fca5a5; height: 100vh; width: 100vw; box-sizing: border-box;
          }
          .error-container p { font-weight: bold; }
          .error-container pre { margin-top: 0.5rem; font-size: 0.875rem; white-space: pre-wrap; font-family: monospace; }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="module">
          // Polyfill for process
          window.process = { env: { NODE_ENV: 'development' } };
          
          async function renderApp() {
            try {
              const React = await import('react');
              const ReactDOM = await import('react-dom/client');

              const transformedCode = Babel.transform(\`${escapedCode}\`, {
                presets: [['react', { runtime: 'classic' }], 'typescript'],
                filename: 'Component.tsx'
              }).code;
              
              const ComponentFactory = new Function('React', 'ReactDOM', transformedCode + '\\nreturn Component;');
              const Component = ComponentFactory(React, ReactDOM);

              const rootEl = document.getElementById('root');
              if (!rootEl) throw new Error("Root element not found");
              
              const root = ReactDOM.createRoot(rootEl);
              root.render(React.createElement(Component));

            } catch(e) {
              console.error(e);
              document.body.innerHTML = '<div class="error-container"><p>Render Error</p><pre>' + e.stack + '</pre></div>';
            }
          }
          renderApp();
        </script>
      </body>
      </html>
    `;
};


export const ClassicPreview: React.FC<ClassicPreviewProps> = ({ code }) => {
    const [isLoading, setIsLoading] = useState(true);
    const htmlContent = useMemo(() => generateHtml(code), [code]);

    useEffect(() => {
        setIsLoading(true);
        // Give the iframe a moment to render the new content
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, [htmlContent]);

    return (
        <div className="w-full h-full bg-transparent flex items-center justify-center">
            <div className="w-[375px] h-[667px] bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/10">
                <div className="flex-shrink-0 bg-gray-900 p-2 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-grow relative bg-white">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                            <div className="w-6 h-6 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    <iframe
                        key={htmlContent} // Force re-render when content changes
                        srcDoc={htmlContent}
                        title="App Preview"
                        sandbox="allow-scripts allow-same-origin"
                        className={`w-full h-full border-0 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setIsLoading(false)}
                    />
                </div>
            </div>
        </div>
    );
};
