
import React from 'react';

interface FirebasePublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  firebaseConfig: Record<string, string>;
  onAddFile: (path: string, content: string) => void;
}

const CodeBlock: React.FC<{ content: string }> = ({ content }) => {
    const [copied, setCopied] = React.useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="bg-black/30 p-4 rounded-lg relative">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap"><code>{content}</code></pre>
            <button onClick={handleCopy} className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-600 hover:bg-gray-500 rounded-md">
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
};

export const FirebasePublishModal: React.FC<FirebasePublishModalProps> = ({ isOpen, onClose, firebaseConfig, onAddFile }) => {
    if (!isOpen) return null;

    const projectId = firebaseConfig.projectId;

    const firebaseJsonContent = `{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}`;

    const handleAddFile = () => {
        onAddFile('firebase.json', firebaseJsonContent);
    };

    return (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
            <div 
                className="w-full max-w-2xl bg-gray-900/80 border border-white/20 rounded-2xl shadow-2xl p-8 text-left relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" aria-label="Close modal">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <h2 className="text-2xl font-bold text-white mb-2">Deploy with Firebase Hosting</h2>
                <p className="text-gray-400 mb-6">
                    Follow these steps to deploy your application using the Firebase CLI.
                </p>

                {!projectId ? (
                    <div className="bg-yellow-500/20 text-yellow-300 text-sm p-3 rounded-lg">
                        Please set your Firebase <code className="font-mono bg-white/10 px-1 rounded">projectId</code> in the Integrations page first.
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-white mb-2">Step 1: Configure Firebase</h3>
                            <p className="text-sm text-gray-400 mb-2">Add a <code className="font-mono bg-white/10 px-1 rounded">firebase.json</code> file to your project with the following content:</p>
                            <CodeBlock content={firebaseJsonContent} />
                            <button onClick={handleAddFile} className="mt-2 px-3 py-1.5 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors">
                                Add firebase.json to Project
                            </button>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-2">Step 2: Install Firebase CLI</h3>
                             <p className="text-sm text-gray-400 mb-2">If you don't have it, install the Firebase command-line tool globally.</p>
                            <CodeBlock content="npm install -g firebase-tools" />
                        </div>
                         <div>
                            <h3 className="font-semibold text-white mb-2">Step 3: Deploy</h3>
                             <p className="text-sm text-gray-400 mb-2">Run these commands in your project's root directory after downloading the code.</p>
                             <CodeBlock content={`firebase login\nfirebase use ${projectId}\nfirebase deploy --only hosting`} />
                        </div>
                         <p className="text-xs text-gray-500">Note: You need to download your project files to your local machine to use the Firebase CLI.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
