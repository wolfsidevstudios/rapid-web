
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './ErrorBoundary';

declare const Babel: any;
declare const AppRegistry: any; // Assuming react-native-web is loaded globally or via import map

interface ClassicPreviewProps {
  code: string;
  isNative: boolean;
}

const PreviewError: React.FC<{ message: string }> = ({ message }) => (
  <div className="p-4 bg-red-900/50 border-l-4 border-red-500 text-red-200 h-full w-full">
    <p className="font-bold">Execution Error</p>
    <pre className="mt-2 text-sm whitespace-pre-wrap font-mono">{message}</pre>
  </div>
);

export const ClassicPreview: React.FC<ClassicPreviewProps> = ({ code, isNative }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const rootRef = useRef<any>(null);

  useEffect(() => {
    if (rootRef.current) {
      try { 
        if (isNative) {
            // No standard unmount for AppRegistry's runApplication
        } else {
            rootRef.current.unmount(); 
        }
      } catch (e) { console.error("Failed to unmount root:", e); }
      rootRef.current = null;
    }
    if (!mountRef.current) return;
    mountRef.current.innerHTML = '';
    setError(null);

    try {
      const transformedCode = Babel.transform(code, {
        presets: [['react', { runtime: 'classic' }], 'typescript'],
        filename: 'Component.tsx'
      }).code;

      const dynamicComponentFactory = new Function('React', 'ReactDOM', 'react-native', `${transformedCode}\nreturn Component;`);
      const DynamicComponent = dynamicComponentFactory(React, ReactDOM, React); // Pass React for react-native-web

      if (typeof DynamicComponent !== 'function') {
        throw new Error("The code did not assign a React component to the 'Component' variable.");
      }
      
      const mountNode = mountRef.current;

      if (isNative) {
        AppRegistry.registerComponent('App', () => DynamicComponent);
        AppRegistry.runApplication('App', { rootTag: mountNode });
        // Can't easily store a reference to unmount AppRegistry apps
      } else {
        const root = ReactDOM.createRoot(mountNode);
        rootRef.current = root;
        root.render(
            <React.StrictMode>
            <ErrorBoundary>
                <DynamicComponent />
            </ErrorBoundary>
            </React.StrictMode>
        );
      }
      
    } catch (err: any) {
      setError(err.message);
      if (rootRef.current && !isNative) {
        try { rootRef.current.unmount(); } catch(e) { console.error("Failed to unmount root after error:", e); }
        rootRef.current = null;
      }
    }
    return () => {
      if (rootRef.current && !isNative) {
        try { rootRef.current.unmount(); } catch(e) { console.error("Failed to unmount on cleanup:", e); }
        rootRef.current = null;
      }
    };
  }, [code, isNative]);

  return (
    <div className="w-full h-full bg-white">
      {error ? (
        <PreviewError message={error} />
      ) : (
        <div ref={mountRef} className="w-full h-full" />
      )}
    </div>
  );
};