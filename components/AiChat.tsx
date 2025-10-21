import React, { useState, useRef, useEffect } from 'react';

export interface Message {
  role: 'user' | 'model';
  content: string;
}

interface AiChatProps {
  messages: Message[];
  onSendMessage: (prompt: string) => void;
  isLoading: boolean;
}

export const AiChat: React.FC<AiChatProps> = ({ messages, onSendMessage, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isLoading) return;
    onSendMessage(trimmedPrompt);
    setPrompt('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 bg-black/20 p-2 text-sm text-gray-300 font-semibold">
        AI Assistant
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-blue-500/20 text-sm text-blue-200 backdrop-blur-sm">
            <p className="font-semibold">Hello!</p>
            <p>Describe the changes you want to make. I'll edit the code for you.</p>
          </div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg text-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-black/30 text-gray-200 backdrop-blur-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
               <div className="px-4 py-2 rounded-lg bg-black/30 text-gray-200">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse [animation-delay:0.4s]"></div>
                </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="border-t border-white/10 p-2">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., 'Change the button color to blue'"
            className="w-full p-2 pr-12 text-sm bg-black/20 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-200 placeholder:text-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="absolute bottom-2.5 right-2.5 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-500 disabled:bg-gray-500/50 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
          </button>
        </form>
      </div>
    </div>
  );
};