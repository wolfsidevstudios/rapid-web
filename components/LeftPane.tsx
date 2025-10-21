
import React from 'react';
import { AiChat, Message } from './AiChat';

interface LeftPaneProps {
  messages: Message[];
  onSendMessage: (prompt: string) => void;
  isLoading: boolean;
}

export const LeftPane: React.FC<LeftPaneProps> = (props) => {
  return (
    <div className="w-full md:w-96 flex-shrink-0 flex flex-col bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg overflow-hidden">
      <div className="flex-shrink-0 flex items-center border-b border-white/10 p-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003.586 15h12.828a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        <h2 className="text-md font-semibold text-white">AI Assistant</h2>
      </div>
      <div className="flex-grow overflow-hidden">
        <AiChat 
          messages={props.messages}
          onSendMessage={props.onSendMessage}
          isLoading={props.isLoading}
        />
      </div>
    </div>
  );
};
