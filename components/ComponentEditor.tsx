import React, { useState, useRef, useEffect } from 'react';

interface ComponentEditorProps {
    elementSelector: string;
    position: { x: number, y: number };
    onClose: () => void;
    onSubmit: (prompt: string) => void;
}

export const ComponentEditor: React.FC<ComponentEditorProps> = ({ elementSelector, position, onClose, onSubmit }) => {
    const [prompt, setPrompt] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [panelPosition, setPanelPosition] = useState({ top: 0, left: 0});

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        if (panelRef.current) {
            const panelRect = panelRef.current.getBoundingClientRect();
            setPanelPosition({
                top: position.y - panelRect.height - 16, // position above the click
                left: position.x - (panelRect.width / 2),
            });
        }
    }, [position]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedPrompt = prompt.trim();
        if (!trimmedPrompt) return;
        onSubmit(trimmedPrompt);
    };

    return (
        <div 
            ref={panelRef}
            className="fixed z-50 bg-gray-900/80 backdrop-blur-lg border border-white/20 rounded-full shadow-2xl p-2 flex items-center gap-2"
            style={{ top: `${panelPosition.top}px`, left: `${panelPosition.left}px` }}
        >
            <form onSubmit={handleSubmit} className="flex items-center">
                 <p className="text-xs text-gray-400 px-2 whitespace-nowrap truncate max-w-xs">
                    Editing: <span className="font-semibold text-gray-200">{elementSelector}</span>
                </p>
                <input
                    ref={inputRef}
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your change..."
                    className="w-64 p-2 text-sm bg-transparent focus:outline-none text-white placeholder:text-gray-500"
                />
                <button type="submit" disabled={!prompt.trim()} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 disabled:bg-gray-500 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                </button>
            </form>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};
