import React, { useEffect, useRef } from 'react';

// TypeScript declaration for the Google Identity Services library
declare global {
  interface Window {
    google: any;
  }
}

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const handleCredentialResponse = (response: any) => {
    // For now, we'll just log the credential to the console.
    // In a real application, you would send this to your backend for verification.
    console.log("Encoded JWT ID token: " + response.credential);
    onClose(); // Close modal on successful sign-in
  };
  
  useEffect(() => {
    // Check if the Google library has loaded
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        // IMPORTANT: Replace with your actual Google Client ID
        client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
        callback: handleCredentialResponse
      });
      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        { theme: "outline", size: "large", type: "standard", text: "signin_with", width: "300" } 
      );
      // Optional: Prompt a one-tap sign-in experience
      // window.google.accounts.id.prompt(); 
    }
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-gray-900/80 border border-white/20 rounded-2xl shadow-2xl p-8 text-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" aria-label="Close modal">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">
          Sign up to build apps
        </h2>
        <p className="text-gray-400 mb-8">
          Create an account to save and manage your projects.
        </p>
        <div ref={googleButtonRef} className="flex justify-center"></div>
      </div>
    </div>
  );
};