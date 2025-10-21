import React, { useState } from 'react';
import { PageComponent } from './PageComponent';

interface PageEditorModalProps {
    pageName: string;
    code: string;
    onClose: () => void;
    onSubmit: (prompt: string) => void;
}

export const PageEditorModal: React.FC<PageEditorModalProps> = ({ pageName, code, onClose, onSubmit }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedPrompt = prompt.trim();
        if (!trimmedPrompt) return;
        onSubmit(trimmedPrompt);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-gray-900/80 border border-white/20 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-8 p-8">
                <div className="flex-shrink-0 flex flex-col items-center gap-4">
                    <h3 className="font-bold text-xl text-white">Editing "{pageName}" Page</h3>
                    <div className="transform scale-50 origin-top">
                       <PageComponent code={code} initialPage={pageName} onDoubleClick={() => {}} isSelectMode={false} onElementSelect={() => {}}/>
                    </div>
                </div>
                <div className="flex-grow flex flex-col">
                     <h2 className="text-2xl font-bold text-white mb-4">What would you like to change?</h2>
                     <form onSubmit={handleSubmit} className="flex-grow flex flex-col gap-4">
                        <textarea
                            rows={6}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={`e.g., "Add a contact form to the ${pageName} page"`}
                            className="w-full flex-grow p-3 text-base bg-black/30 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-200 placeholder:text-gray-400"
                            autoFocus
                        />
                        <div className="flex items-center justify-end gap-4">
                            <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                                Cancel
                            </button>
                            <button type="submit" disabled={!prompt.trim()} className="px-6 py-2 bg-blue-600 text-white font-semibold text-sm rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100">
                                Apply Changes
                            </button>
                        </div>
                     </form>
                </div>
            </div>
        </div>
    );
};
