
import React, { useState, useEffect, useCallback } from 'react';

const fileToBase64 = (file: File): Promise<{ data: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const [header, data] = result.split(',');
      const mimeType = header.match(/:(.*?);/)?.[1] || 'image/png';
      resolve({ data, mimeType });
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};


interface ScreenshotModalProps {
  onClose: () => void;
  onScreenshot: (imageData: { data: string; mimeType: string }) => void;
}

export const ScreenshotModal: React.FC<ScreenshotModalProps> = ({ onClose, onScreenshot }) => {
  const [image, setImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaste = useCallback(async (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          setIsLoading(true);
          try {
            const imageData = await fileToBase64(file);
            setImage(imageData);
          } catch (error) {
            console.error("Error processing pasted image:", error);
          } finally {
            setIsLoading(false);
          }
        }
        break; // Stop after finding the first image
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);
  
  const handleContinue = () => {
      if (image) {
          onScreenshot(image);
      }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-gray-900/80 border border-white/20 rounded-2xl shadow-2xl p-8 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" aria-label="Close modal">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">
          Screenshot to App
        </h2>
        <p className="text-gray-400 mb-6 text-center">
          Take a screenshot of any website or application and paste it here ({navigator.platform.includes('Mac') ? 'Cmd+V' : 'Ctrl+V'}).
        </p>

        <div className="w-full h-64 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center bg-black/20 overflow-hidden">
            {isLoading ? (
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : image ? (
                <img src={`data:${image.mimeType};base64,${image.data}`} alt="Pasted screenshot" className="max-w-full max-h-full object-contain" />
            ) : (
                <div className="text-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Waiting for screenshot...
                </div>
            )}
        </div>
        
        <button
            onClick={handleContinue}
            disabled={!image || isLoading}
            className="w-full max-w-xs mt-8 px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-gray-500/50 disabled:cursor-not-allowed"
        >
            Build from Screenshot
        </button>
      </div>
    </div>
  );
};
