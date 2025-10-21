
import React, { useState, useEffect } from 'react';
import { INTEGRATIONS_CONFIG } from '../constants';

type Integrations = Record<string, Record<string, string>>;

interface IntegrationsPageProps {
  savedIntegrations: Integrations;
  onSave: (name: string, keys: Record<string, string>) => void;
}

interface IntegrationCardProps {
  config: typeof INTEGRATIONS_CONFIG[0];
  savedKeys: Record<string, string>;
  onSave: (name: string, keys: Record<string, string>) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ config, savedKeys, onSave }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setKeys(savedKeys || {});
  }, [savedKeys]);
  
  const isConnected = Object.values(keys).some(key => key);

  const handleKeyChange = (id: string, value: string) => {
    setKeys(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    onSave(config.name, keys);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    setIsExpanded(false);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300">
      <div className="p-6 flex items-start gap-6">
        <div className="flex-shrink-0 w-12 h-12 text-white">
          <config.icon className="w-full h-full" />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-white">{config.name}</h3>
          <p className="text-sm text-gray-400 mt-1">{config.description}</p>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${isConnected ? 'bg-green-500/20 text-green-300' : 'bg-white text-black'}`}
        >
          {isConnected ? 'Connected' : 'Connect'}
        </button>
      </div>
      {isExpanded && (
        <div className="bg-black/20 px-6 py-4 border-t border-white/10">
          <div className="space-y-4">
            {config.keys.map(key => (
              <div key={key.id}>
                <label className="block text-xs font-medium text-gray-300 mb-1">{key.label}</label>
                <input
                  type="text"
                  value={keys[key.id] || ''}
                  onChange={(e) => handleKeyChange(key.id, e.target.value)}
                  placeholder={key.placeholder}
                  className="w-full p-2 text-sm bg-black/30 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
                />
              </div>
            ))}
            <div className="flex justify-end">
              <button 
                onClick={handleSave}
                className="px-4 py-1.5 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
              >
                {isSaved ? 'Saved!' : 'Save Connection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export const IntegrationsPage: React.FC<IntegrationsPageProps> = ({ savedIntegrations, onSave }) => {
  return (
    <main className="min-h-screen p-4 pt-28 sunset-waves-bg">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white">Integrations</h1>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            Connect to third-party services to unlock powerful new capabilities for your AI-generated applications.
          </p>
        </header>

        <section className="space-y-6">
          {INTEGRATIONS_CONFIG.map(config => (
            <IntegrationCard 
              key={config.name}
              config={config}
              savedKeys={savedIntegrations[config.name] || {}}
              onSave={onSave}
            />
          ))}
        </section>
      </div>
    </main>
  );
};
