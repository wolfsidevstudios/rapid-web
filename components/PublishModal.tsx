
import React, { useState, useEffect } from 'react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (pat: string) => void;
  isPublishing: boolean;
  publishUrl: string | null;
  publishError: string | null;
  initialPat: string;
}

const Loader: React.FC = () => (
    <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white font-semibold">Publishing to Netlify...</p>
        <p className="text-sm text-gray-400 mt-1">This may take a moment.</p>
    </div>
);

const Success: React.FC<{ url: string }> = ({ url }) => (
    <div className="text-center">
         <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        </div>
        <h3 className="text-xl font-bold text-white">Published Successfully!</h3>
        <p className="text-gray-400 mt-2">Your app is now live at:</p>
        <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-white/10 px-4 py-2 rounded-lg text-blue-400 font-mono text-sm break-all hover:bg-white/20 transition-colors"
        >
            {url}
        </a>
    </div>
);

export const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose, onPublish, isPublishing, publishUrl, publishError, initialPat }) => {
    const [pat, setPat] = useState('');

    useEffect(() => {
        setPat(initialPat);
    }, [initialPat]);
    
    if (!isOpen) return null;

    const handlePublishClick = () => {
        onPublish(pat);
    };
    
    const renderContent = () => {
        if (isPublishing) {
            return <Loader />;
        }
        if (publishUrl) {
            return <Success url={publishUrl} />;
        }
        return (
            <>
                <h2 className="text-2xl font-bold text-white mb-2">Publish to Netlify</h2>
                <p className="text-gray-400 mb-6">
                    Enter your Netlify Personal Access Token to deploy your site.
                </p>
                {publishError && (
                    <div className="bg-red-500/20 text-red-300 text-sm p-3 rounded-lg mb-4 text-left">
                        {publishError}
                    </div>
                )}
                <div>
                    <label htmlFor="netlify-pat" className="block text-sm font-medium text-gray-300 mb-2 text-left">
                        Personal Access Token
                    </label>
                    <input
                        id="netlify-pat"
                        type="password"
                        value={pat}
                        onChange={(e) => setPat(e.target.value)}
                        placeholder="Enter your Netlify PAT"
                        className="w-full p-2 bg-black/20 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                    />
                     <a href="https://app.netlify.com/user/applications" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline mt-2 inline-block">
                        Find or create a token here.
                    </a>
                </div>
                <button
                    onClick={handlePublishClick}
                    disabled={!pat || isPublishing}
                    className="w-full mt-6 px-5 py-2.5 bg-green-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-gray-500/50 disabled:cursor-not-allowed"
                >
                    Publish Site
                </button>
            </>
        );
    };

    return (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div 
            className="w-full max-w-md bg-gray-900/80 border border-white/20 rounded-2xl shadow-2xl p-8 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" aria-label="Close modal">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {renderContent()}
          </div>
        </div>
    );
};
