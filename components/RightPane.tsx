import React from 'react';
import { PreviewCanvas } from './PreviewCanvas';
import { EditState } from '../App';

interface RightPaneProps {
  files: Record<string, string>;
  isStreaming: boolean;
  isLoading: boolean;
  editState: EditState;
  setEditState: (state: EditState) => void;
  onAiRequest: (prompt: string, context: EditState) => void;
}

export const RightPane: React.FC<RightPaneProps> = (props) => {

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
        <PreviewCanvas {...props} />
    </div>
  );
};