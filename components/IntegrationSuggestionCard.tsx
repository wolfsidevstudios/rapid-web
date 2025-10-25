
import React, { useState } from 'react';
import { INTEGRATIONS_CONFIG } from '../constants';

interface IntegrationSuggestionCardProps {
  suggestions: string[];
  onConfirm: (selected: string[]) => void;
}

const IntegrationItem: React.FC<{
    name: string;
    icon: (props: any) => React.ReactElement;
    isSelected: boolean;
    onToggle: () => void;
}> = ({ name, icon: Icon, isSelected, onToggle }) => (
    <button 
        onClick={onToggle}
        className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 w-full text-left ${isSelected ? 'bg-blue-500/20 border-blue-500' : 'bg-white/5 border-transparent hover:border-white/20'}`}
    >
        <div className="w-8 h-8 flex-shrink-0"><Icon className="w-full h-full" /></div>
        <span className="font-semibold text-white">{name}</span>
        <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-blue-500 border-blue-400' : 'border-gray-500'}`}>
            {isSelected && <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
        </div>
    </button>
);


export const IntegrationSuggestionCard: React.FC<IntegrationSuggestionCardProps> = ({ suggestions, onConfirm }) => {
    const [selected, setSelected] = useState<string[]>([]);
    
    const toggleSelection = (name: string) => {
        setSelected(prev => 
            prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
        );
    };

    const suggestedIntegrations = INTEGRATIONS_CONFIG.filter(config => suggestions.includes(config.name));

    return (
        <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-4 pt-4">
            <div className="space-y-3">
                {suggestedIntegrations.map(config => (
                   <IntegrationItem 
                        key={config.name}
                        name={config.name}
                        icon={config.icon}
                        isSelected={selected.includes(config.name)}
                        onToggle={() => toggleSelection(config.name)}
                   />
                ))}
            </div>
            <div className="flex items-center gap-3 mt-4">
                <button 
                    onClick={() => onConfirm([])}
                    className="w-full px-4 py-2 text-sm font-semibold bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                    Skip
                </button>
                 <button 
                    onClick={() => onConfirm(selected)}
                    className="w-full px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                >
                    {selected.length > 0 ? `Build with ${selected.length} Integration(s)` : 'Continue'}
                </button>
            </div>
        </div>
    );
};
