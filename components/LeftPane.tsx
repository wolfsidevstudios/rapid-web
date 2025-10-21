import React, { useState } from 'react';
import { FileExplorer } from './FileExplorer';
import { AiChat, Message } from './AiChat';

interface LeftPaneProps {
  files: string[];
  activeFile: string;
  onSelectFile: (path: string) => void;
  messages: Message[];
  onSendMessage: (prompt: string) => void;
  isLoading: boolean;
}

type Tab = 'files' | 'chat';

export const LeftPane: React.FC<LeftPaneProps> = (props) => {
  const [activeTab, setActiveTab] = useState<Tab>('files');
  
  const getTabClass = (tabName: Tab) => `flex-1 py-2 text-sm font-medium text-center transition-colors border-b-2 ${
    activeTab === tabName ? 'border-blue-400 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'
  }`;
  
  return (
    <div className="w-full md:w-1/3 flex-1 flex flex-col bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg overflow-hidden">
      <div className="flex-shrink-0 flex border-b border-white/10">
        <button onClick={() => setActiveTab('files')} className={getTabClass('files')}>Files</button>
        <button onClick={() => setActiveTab('chat')} className={getTabClass('chat')}>AI Chat</button>
      </div>
      <div className="flex-grow overflow-hidden">
        {activeTab === 'files' && (
          <FileExplorer 
            files={props.files}
            activeFile={props.activeFile}
            onSelectFile={props.onSelectFile}
          />
        )}
        {activeTab === 'chat' && (
          <AiChat 
            messages={props.messages}
            onSendMessage={props.onSendMessage}
            isLoading={props.isLoading}
          />
        )}
      </div>
    </div>
  );
};
