import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './ErrorBoundary';

declare const Babel: any;

interface PreviewProps {
  code: string;
}

const PreviewError: React.FC<{ message: string }> = ({ message }) => (
  <div className="p-4 bg-red-900/50 border-l-4 border-red-500 text-red-200 h-full w-full">
    <p className="font-bold">Execution Error</p>
    <pre className="mt-2 text-sm whitespace-pre-wrap font-mono">{message}</pre>
  </div>
);

export const Preview: React.FC<PreviewProps> = ({ code }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const rootRef = useRef<any>(null); // To hold the ReactDOM root

  useEffect(() => {
    // Cleanup previous root if it exists
    if (rootRef.current) {
      try {
        rootRef.current.unmount();
      } catch (e) {
        console.error("Failed to unmount root:", e)
      }
      rootRef.current = null;
    }

    if (!mountRef.current) {
      return;
    }

    // Clear previous content and errors
    mountRef.current.innerHTML = '';
    setError(null);

    try {
      const transformedCode = Babel.transform(code, {
        presets: [
          ['react', { runtime: 'classic' }],
          'typescript',
        ],
        filename: 'Component.tsx' // For better error messages from Babel
      }).code;

      const dynamicComponentFactory = new Function(
        'React',
        'ReactDOM',
        `
          // The user's code is expected to define a 'Component' variable.
          ${transformedCode}
          // The factory returns the component defined in the user's code.
          return Component;
        `
      );

      const DynamicComponent = dynamicComponentFactory(React, ReactDOM);

      if (typeof DynamicComponent !== 'function') {
        throw new Error("The code did not assign a React component to the 'Component' variable.");
      }
      
      const mountNode = mountRef.current;
      const root = ReactDOM.createRoot(mountNode);
      rootRef.current = root;

      root.render(
        <React.StrictMode>
          <ErrorBoundary key={code}>
            <DynamicComponent />
          </ErrorBoundary>
        </React.StrictMode>
      );

    } catch (err: any) {
      setError(err.message);
      // Ensure we clean up if rendering failed after root creation
      if (rootRef.current) {
        try {
          rootRef.current.unmount();
        } catch(e) {
          console.error("Failed to unmount root after error:", e)
        }
        rootRef.current = null;
      }
    }
    
    // Return a cleanup function
    return () => {
      if (rootRef.current) {
        try {
          rootRef.current.unmount();
        } catch(e) {
            console.error("Failed to unmount root on cleanup:", e)
        }
        rootRef.current = null;
      }
    };
  }, [code]);

  return (
    <div className="flex-grow flex flex-col h-full">
      <div className="flex-shrink-0 bg-black/20 border-b border-white/10 p-2 text-sm text-gray-300 font-semibold">
        Preview
      </div>
      <div className="flex-grow relative bg-white">
        {error ? (
          <PreviewError message={error} />
        ) : (
          <div ref={mountRef} className="w-full h-full" />
        )}
      </div>
    </div>
  );
};