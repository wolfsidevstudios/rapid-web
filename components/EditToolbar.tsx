import React from 'react';

interface EditToolbarProps {
    onSelectElement: () => void;
    onEditPage: () => void;
    onClose: () => void;
}

export const EditToolbar: React.FC<EditToolbarProps> = ({ onSelectElement, onEditPage, onClose }) => {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-gray-900/70 backdrop-blur-lg border border-white/20 rounded-full shadow-2xl p-2">
            <button
                onClick={onSelectElement}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600/50 hover:bg-blue-600 rounded-full transition-colors flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-2.474m0 0l-2.51 2.225.569-2.474m0 0l2.225-2.51.569 2.474m0 0l2.225-2.51.569 2.474M3 12l6.428 6.428a1.5 1.5 0 002.122 0l2.828-2.828a1.5 1.5 0 000-2.122L9.828 6.428A1.5 1.5 0 007.707 6H6" />
                </svg>
                Edit Element
            </button>
             <button
                onClick={onEditPage}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600/50 hover:bg-blue-600 rounded-full transition-colors flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Page
            </button>
            <div className="h-6 w-px bg-white/20"></div>
            <button
                onClick={onClose}
                className="p-2 text-gray-300 hover:text-white bg-black/20 hover:bg-red-500 rounded-full transition-colors"
                aria-label="Close edit mode"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};
