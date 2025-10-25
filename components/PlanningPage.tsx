
import React, { useState } from 'react';

const PlanRenderer: React.FC<{ plan: string }> = ({ plan }) => {
    const sections = plan.split('\n').reduce((acc, line) => {
        if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
            acc.push({ title: line.trim().replace(/\*\*/g, ''), content: [] });
        } else if (acc.length > 0) {
            acc[acc.length - 1].content.push(line);
        } else if (line.trim()) {
             if (!acc.length) acc.push({ title: '', content: [] });
             acc[0].content.push(line);
        }
        return acc;
    }, [] as { title: string; content: string[] }[]);

    return (
        <div className="space-y-6">
            {sections.map((section, index) => (
                <div key={index}>
                    {section.title && <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>}
                    <div className="space-y-2 text-gray-300">
                        {section.content.map((line, lineIndex) => {
                             const trimmed = line.trim();
                             if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                                return (
                                    <div key={lineIndex} className="flex items-start pl-4">
                                        <span className="text-blue-400 mr-3 mt-1">•</span>
                                        <p className="flex-1">{trimmed.substring(2)}</p>
                                    </div>
                                );
                             }
                             if(trimmed) return <p key={lineIndex}>{trimmed}</p>;
                             return null;
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};


interface PlanningPageProps {
  plan: string;
  isLoading: boolean;
  onApprove: () => void;
  onDecline: () => void;
  onModify: (modificationPrompt: string) => void;
}

export const PlanningPage: React.FC<PlanningPageProps> = ({ plan, isLoading, onApprove, onDecline, onModify }) => {
    const [modificationPrompt, setModificationPrompt] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = modificationPrompt.trim();
        if (!trimmed || isLoading) return;
        onModify(trimmed);
        setModificationPrompt('');
    };

    return (
        <div className="min-h-screen flex flex-col bg-black text-white pt-20">
            <main className="flex-grow flex flex-col container mx-auto p-4 md:p-8 overflow-hidden">
                <div className="flex-grow bg-gray-900/50 border border-gray-700 rounded-xl p-6 overflow-y-auto mb-4">
                    <h1 className="text-3xl font-bold mb-6 text-white text-center">Review the Plan</h1>
                    {isLoading && !plan ? (
                        <div className="flex justify-center items-center h-full">
                           <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <PlanRenderer plan={plan} />
                    )}
                </div>

                <div className="flex-shrink-0">
                    <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto">
                        <textarea
                            rows={2}
                            value={modificationPrompt}
                            onChange={(e) => setModificationPrompt(e.target.value)}
                            placeholder="Request a change to the plan... (e.g., 'Use a dark theme')"
                            className="w-full p-3 pr-28 text-base bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-200 placeholder:text-gray-400 transition-all duration-300"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !modificationPrompt.trim()}
                            className="absolute top-1/2 -translate-y-1/2 right-3 px-4 py-2 bg-white/10 text-white font-semibold text-sm rounded-full transform hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            Revise
                        </button>
                    </form>
                    <div className="flex justify-center gap-4 mt-4">
                        <button onClick={onDecline} disabled={isLoading} className="px-8 py-3 bg-red-600/20 text-red-300 font-bold rounded-full hover:bg-red-600/40 transition-colors disabled:opacity-50">
                            Decline
                        </button>
                        <button onClick={onApprove} disabled={isLoading} className="px-10 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-500 transition-colors disabled:opacity-50">
                            Approve
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};
