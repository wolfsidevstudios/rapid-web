
import React, { useState } from 'react';
import { PreviewCanvas } from './PreviewCanvas';
import { EditState } from '../App';
import { CodeEditor } from './CodeEditor';
import { ViewSwitcher } from './ViewSwitcher';
import { FileExplorer } from './FileExplorer';

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
}

export const RightPane: React.FC<RightPaneProps> = (props) => {
  const [view, setView] = useState<'preview' | 'code'>('preview');

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
        <div className="absolute top-4 right-4 z-20">
            <ViewSwitcher currentView={view} onSwitch={setView} />
        </div>
        
        <div className="flex-grow overflow-hidden">
            {view === 'preview' ? (
                <PreviewCanvas {...props} />
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
