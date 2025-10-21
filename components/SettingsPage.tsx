
import React, { useState, useEffect } from 'react';
import { BACKGROUNDS } from '../constants';

interface BackgroundSettings {
  auto: boolean;
  selected: string;
}

interface SettingsPageProps {
  apiKey: string;
  onSave: (key: string) => void;
  backgroundSettings: BackgroundSettings;
  onBackgroundSettingsChange: (settings: BackgroundSettings) => void;
}

const ToggleSwitch: React.FC<{ checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
    <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
  </label>
);

const ApiKeySettings: React.FC<{ apiKey: string; onSave: (key: string) => void; }> = ({ apiKey, onSave }) => {
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
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-6">API Key</h2>
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
  );
};

const BackgroundSettingsPanel: React.FC<{ settings: BackgroundSettings; onChange: (settings: BackgroundSettings) => void; }> = ({ settings, onChange }) => {
  
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...settings, auto: e.target.checked });
  };

  const handleSelect = (bg: string) => {
    onChange({ ...settings, selected: bg });
  };
  
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white mb-6">Background</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <label className="font-medium text-gray-200">
            Random background on load
          </label>
          <ToggleSwitch checked={settings.auto} onChange={handleToggle} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Select a background</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {BACKGROUNDS.map(bg => (
              <button 
                key={bg} 
                onClick={() => handleSelect(bg)}
                className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200 ${settings.selected === bg ? 'border-blue-500 ring-2 ring-blue-500' : 'border-transparent hover:border-gray-500'}`}
                aria-label={`Select background ${bg}`}
              >
                {bg === 'custom-sunset' ? 
                  (<div className="w-full h-full bg-black flex items-center justify-center text-xs text-white text-center p-1">Custom Sunset Waves</div>) : 
                  (<img src={bg} alt="Background option" className="w-full h-full object-cover" />)
                }
                <div className="absolute inset-0 bg-black/20"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export const SettingsPage: React.FC<SettingsPageProps> = ({ apiKey, onSave, backgroundSettings, onBackgroundSettingsChange }) => {
  const [activeTab, setActiveTab] = useState('api');
  
  const getTabClass = (tabName: string) => `w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === tabName ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24">
        <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-lg">
            <aside className="w-full md:w-1/4">
              <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
              <nav className="space-y-2">
                <button onClick={() => setActiveTab('api')} className={getTabClass('api')}>API Key</button>
                <button onClick={() => setActiveTab('background')} className={getTabClass('background')}>Background</button>
              </nav>
            </aside>
            <main className="flex-1">
              {activeTab === 'api' && <ApiKeySettings apiKey={apiKey} onSave={onSave} />}
              {activeTab === 'background' && <BackgroundSettingsPanel settings={backgroundSettings} onChange={onBackgroundSettingsChange} />}
            </main>
        </div>
    </div>
  );
};
