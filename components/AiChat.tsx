
import React, { useState, useRef, useEffect } from 'react';
import { IntegrationSuggestionCard } from './IntegrationSuggestionCard';

export interface Message {
  role: 'user' | 'model';
  content: string;
  plan?: string;
  isIntegrationSuggestion?: boolean;
  suggestions?: string[];
}

interface AiChatProps {
  messages: Message[];
  onSendMessage: (prompt: string) => void;
  isLoading: boolean;
  onApprovePlan: () => void;
  isAwaitingApproval: boolean;
  onConfirmIntegrations: (selected: string[]) => void;
}

const PlanRenderer: React.FC<{ plan: string }> = ({ plan }) => {
    // Split plan into sections based on markdown-style bold headers
    const sections = plan.split('\n').reduce((acc, line) => {
        if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
            acc.push({ title: line.trim().replace(/\*\*/g, ''), content: [] });
        } else if (acc.length > 0) {
            acc[acc.length - 1].content.push(line);
        } else if (line.trim()) { // Content before the first header
             if (!acc.length) acc.push({ title: '', content: [] });
             acc[0].content.push(line);
        }
        return acc;
    }, [] as { title: string; content: string[] }[]);

    return (
        <div className="mt-4 space-y-4 text-sm border-t border-gray-500/50 pt-4">
            {sections.map((section, index) => (
                <div key={index}>
                    {section.title && <h4 className="font-bold text-gray-100 mb-2">{section.title}</h4>}
                    <div className="space-y-1">
                        {section.content.map((line, lineIndex) => {
                             const trimmed = line.trim();
                             if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                                return (
                                    <div key={lineIndex} className="flex items-start">
                                        <span className="text-gray-400 mr-2 mt-1">•</span>
                                        <p className="text-gray-300 flex-1">{trimmed.substring(2)}</p>
                                    </div>
                                );
                             }
                             if(trimmed) return <p key={lineIndex} className="text-gray-300">{trimmed}</p>;
                             return null;
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export const AiChat: React.FC<AiChatProps> = ({ messages, onSendMessage, isLoading, onApprovePlan, isAwaitingApproval, onConfirmIntegrations }) => {
  const [prompt, setPrompt] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isLoading || isAwaitingApproval) return;
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
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-blue-500/20 text-sm text-blue-200 backdrop-blur-sm">
            <p className="font-semibold">Hello!</p>
            <p>Describe the changes you want to make. I'll create a plan and then edit the code for you.</p>
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
                {msg.isIntegrationSuggestion ? (
                    <IntegrationSuggestionCard
                        suggestions={msg.suggestions || []}
                        onConfirm={onConfirmIntegrations}
                    />
                ) : msg.plan ? (
                    <>
                        <PlanRenderer plan={msg.plan} />
                        <div className="mt-4">
                            <button
                                onClick={onApprovePlan}
                                disabled={isLoading}
                                className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                            >
                                Approve & Build
                            </button>
                        </div>
                    </>
                ) : null}
              </div>
            </div>
          ))}
          {isLoading && !isAwaitingApproval && (
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
            placeholder={isAwaitingApproval ? 'Please select integrations above to continue...' : "e.g., 'Change the button color to blue'"}
            className="w-full p-2 pr-12 text-sm bg-black/20 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-200 placeholder:text-gray-400"
            disabled={isLoading || isAwaitingApproval}
          />
          <button
            type="submit"
            disabled={isLoading || isAwaitingApproval || !prompt.trim()}
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
