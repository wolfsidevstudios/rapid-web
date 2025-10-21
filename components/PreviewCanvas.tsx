import React, { useMemo } from 'react';
import { PageComponent } from './PageComponent';
import { EditState } from '../App';
import { EditToolbar } from './EditToolbar';
import { PageEditorModal } from './PageEditorModal';
import { ComponentEditor } from './ComponentEditor';

interface PreviewCanvasProps {
  files: Record<string, string>;
  isStreaming: boolean;
  isLoading: boolean;
  editState: EditState;
  setEditState: (state: EditState) => void;
  onAiRequest: (prompt: string, context: EditState) => void;
}

// Simple heuristic to find page names from the router in App.tsx
const findPages = (appCode: string): string[] => {
    if (!appCode) return ['home'];
    const pageMatches = [...appCode.matchAll(/case '([^']+)':/g)];
    const pages = pageMatches.map(match => match[1]);
    // Ensure 'home' is included as a default if not found
    if (!pages.includes('home')) {
        pages.unshift('home');
    }
    return pages.length > 0 ? pages : ['home'];
};

export const PreviewCanvas: React.FC<PreviewCanvasProps> = (props) => {
  const { files, editState, setEditState, onAiRequest } = props;
  const appCode = files['src/App.tsx'] || '';
  const pages = useMemo(() => findPages(appCode), [appCode]);
  const concatenatedCode = useMemo(() => Object.values(files).join('\n\n// --- File Boundary ---\n\n'), [files]);

  const handlePageDoubleClick = (page: string) => {
    setEditState({ isActive: true, targetPage: page, mode: null });
  };
  
  const handleElementSelect = (page: string, selector: string, position: {x: number, y: number}) => {
    setEditState({ isActive: true, targetPage: page, mode: 'element', elementSelector: selector, position });
  };
  
  return (
    <div className="w-full h-full dot-grid overflow-auto relative p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pages.map((page, index) => (
            <div key={page} className="flex flex-col items-center gap-2">
                 <h2 className="font-semibold text-lg text-white bg-black/50 px-3 py-1 rounded-md">{page.charAt(0).toUpperCase() + page.slice(1)}</h2>
                <PageComponent
                    code={concatenatedCode}
                    initialPage={page}
                    onDoubleClick={() => handlePageDoubleClick(page)}
                    isSelectMode={editState.isActive && editState.targetPage === page && editState.mode === 'element-select'}
                    onElementSelect={(selector, position) => handleElementSelect(page, selector, position)}
                />
            </div>
        ))}
      </div>
      
      {editState.isActive && (
          <EditToolbar
            onSelectElement={() => setEditState({...editState, mode: 'element-select' })}
            onEditPage={() => setEditState({ ...editState, mode: 'page' })}
            onClose={() => setEditState({ isActive: false, targetPage: null, mode: null })}
          />
      )}
      
      {editState.mode === 'page' && editState.targetPage && (
          <PageEditorModal
            pageName={editState.targetPage}
            code={concatenatedCode}
            onClose={() => setEditState({ ...editState, mode: null })}
            onSubmit={(prompt) => onAiRequest(prompt, editState)}
          />
      )}

      {editState.mode === 'element' && editState.elementSelector && editState.position && (
          <ComponentEditor
            elementSelector={editState.elementSelector}
            position={editState.position}
            onClose={() => setEditState({ ...editState, mode: null, elementSelector: undefined, position: undefined })}
            onSubmit={(prompt) => onAiRequest(prompt, editState)}
          />
      )}

    </div>
  );
};