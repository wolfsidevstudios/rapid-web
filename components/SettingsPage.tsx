
import React, { useState, useEffect } from 'react';

interface SettingsPageProps {
  apiKey: string;
  onSave: (key: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ apiKey, onSave }) => {
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLocalApiKey(apiKey);
  }, [apiKey]);

  const handleSave = () => {
    onSave(localApiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-lg">
            <h1 className="text-2xl font-bold text-white mb-6 text-center">Settings</h1>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-2">
                        Gemini API Key
                    </label>
                    <input
                        type="password"
                        id="apiKey"
                        value={localApiKey}
                        onChange={(e) => setLocalApiKey(e.target.value)}
                        placeholder="Enter your API key"
                        className="w-full p-2 bg-black/20 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                    />
                    <p className="text-xs text-gray-400 mt-2">
                        Your key is saved securely in your browser's local storage.
                    </p>
                </div>
                
                <button
                    onClick={handleSave}
                    className="w-full px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-gray-500"
                    disabled={!localApiKey}
                >
                    {saved ? 'Saved!' : 'Save API Key'}
                </button>
            </div>
        </div>
    </div>
  );
};
