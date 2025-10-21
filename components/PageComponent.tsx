import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Draggable from 'react-draggable';
import { ErrorBoundary } from './ErrorBoundary';

declare const Babel: any;

interface PageComponentProps {
  code: string;
  initialPage: string;
  onDoubleClick: () => void;
  isSelectMode: boolean;
  onElementSelect: (selector: string, position: {x: number, y: number}) => void;
}

const PreviewError: React.FC<{ message: string }> = ({ message }) => (
  <div className="p-4 bg-red-900/50 border-l-4 border-red-500 text-red-200 h-full w-full">
    <p className="font-bold">Execution Error</p>
    <pre className="mt-2 text-sm whitespace-pre-wrap font-mono">{message}</pre>
  </div>
);

// Function to generate a simplified, human-readable selector for an element
const generateElementSelector = (element: HTMLElement): string => {
    let selector = element.tagName.toLowerCase();
    const classList = Array.from(element.classList).filter(c => !c.includes(':') && !c.includes('[') && !c.includes('/') );
    if (classList.length > 0) {
        selector += `.${classList.slice(0, 2).join('.')}`;
    }
    const text = element.textContent?.trim().substring(0, 30);
    if (text) {
        selector += ` with text "${text.length < 30 ? text : text + '...'}"`;
    }
    return selector;
}

export const PageComponent: React.FC<PageComponentProps> = ({ code, initialPage, onDoubleClick, isSelectMode, onElementSelect }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const rootRef = useRef<any>(null);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (rootRef.current) {
      try { rootRef.current.unmount(); } catch (e) { console.error("Failed to unmount root:", e); }
      rootRef.current = null;
    }
    if (!mountRef.current) return;
    mountRef.current.innerHTML = '';
    setError(null);

    try {
      // Modify the code to pass the initialPage prop
      const codeWithProp = code.replace(/<App\s*\/>/, `<App initialPage="${initialPage}" />`);

      const transformedCode = Babel.transform(codeWithProp, {
        presets: [['react', { runtime: 'classic' }], 'typescript'],
        filename: 'Component.tsx'
      }).code;

      const dynamicComponentFactory = new Function('React', 'ReactDOM', `${transformedCode}\nreturn Component;`);
      const DynamicComponent = dynamicComponentFactory(React, ReactDOM);

      if (typeof DynamicComponent !== 'function') {
        throw new Error("The code did not assign a React component to the 'Component' variable.");
      }
      
      const mountNode = mountRef.current;
      const root = ReactDOM.createRoot(mountNode);
      rootRef.current = root;
      // FIX: Remove redundant `key` prop. The surrounding useEffect hook already
      // unmounts and remounts the entire component tree when `code` changes,
      // making the key unnecessary for resetting state. This also resolves the type error.
      root.render(<React.StrictMode><ErrorBoundary><DynamicComponent /></ErrorBoundary></React.StrictMode>);
    } catch (err: any) {
      setError(err.message);
      if (rootRef.current) {
        try { rootRef.current.unmount(); } catch(e) { console.error("Failed to unmount root after error:", e); }
        rootRef.current = null;
      }
    }
    return () => {
      if (rootRef.current) {
        try { rootRef.current.unmount(); } catch(e) { console.error("Failed to unmount root on cleanup:", e); }
        rootRef.current = null;
      }
    };
  }, [code, initialPage]);

  // Effect for handling element selection mode
  useEffect(() => {
      if (!isSelectMode || !mountRef.current) return;

      const container = mountRef.current;
      const highlightOverlay = document.createElement('div');
      highlightOverlay.style.position = 'absolute';
      highlightOverlay.style.backgroundColor = 'rgba(29, 78, 216, 0.4)';
      highlightOverlay.style.border = '2px solid #3b82f6';
      highlightOverlay.style.borderRadius = '4px';
      highlightOverlay.style.pointerEvents = 'none';
      highlightOverlay.style.transition = 'all 150ms ease-out';
      highlightOverlay.style.zIndex = '10000';
      highlightOverlay.style.opacity = '0';
      container.appendChild(highlightOverlay);

      const handleMouseOver = (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          if (target && target !== container) {
              const rect = target.getBoundingClientRect();
              const containerRect = container.getBoundingClientRect();
              highlightOverlay.style.opacity = '1';
              highlightOverlay.style.width = `${rect.width}px`;
              highlightOverlay.style.height = `${rect.height}px`;
              highlightOverlay.style.top = `${rect.top - containerRect.top}px`;
              highlightOverlay.style.left = `${rect.left - containerRect.left}px`;
          }
      };

      const handleMouseOut = () => {
          highlightOverlay.style.opacity = '0';
      };

      const handleClick = (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          const target = e.target as HTMLElement;
          if (target && target !== container) {
            const selector = generateElementSelector(target);
            onElementSelect(selector, { x: e.clientX, y: e.clientY });
          }
      };

      container.addEventListener('mouseover', handleMouseOver);
      container.addEventListener('mouseout', handleMouseOut);
      container.addEventListener('click', handleClick);
      
      return () => {
          container.removeEventListener('mouseover', handleMouseOver);
          container.removeEventListener('mouseout', handleMouseOut);
          container.removeEventListener('click', handleClick);
          if (container.contains(highlightOverlay)) {
              container.removeChild(highlightOverlay);
          }
      };

  }, [isSelectMode, onElementSelect]);

  return (
    <Draggable handle=".handle" nodeRef={nodeRef}>
      <div ref={nodeRef} className="w-[360px] h-[640px] bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/10" onDoubleClick={onDoubleClick}>
        <div className="handle flex-shrink-0 bg-gray-900 p-2 flex items-center gap-2 cursor-move">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-grow relative bg-white">
          {error ? (
            <PreviewError message={error} />
          ) : (
            <div ref={mountRef} className={`w-full h-full ${isSelectMode ? 'cursor-crosshair' : ''}`} />
          )}
        </div>
      </div>
    </Draggable>
  );
};