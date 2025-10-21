
import React, { useState, useCallback, useEffect } from 'react';
import { INITIAL_FILES, SYSTEM_INSTRUCTION } from './constants';
import { Header } from './components/Header';
import { AiChat, Message } from './components/AiChat';
import { RightPane } from './components/RightPane';
import { FileExplorer } from './components/FileExplorer';
// Fix: Use process.env.API_KEY and remove user-facing API key management.
import { GoogleGenAI } from "@google/genai";
import { TopNavBar } from './components/TopNavBar';
// import { SettingsPage } from './components/SettingsPage'; // No longer needed

interface HomePageProps {
  onStart: (prompt: string) => void;
  isLoading: boolean;
}

const backgrounds = [
  'https://i.ibb.co/RpYxkrmH/Google-AI-Studio-2025-10-21-T00-54-01-087-Z.png',
  'https://i.ibb.co/QFW3Vvwp/Google-AI-Studio-2025-10-21-T01-20-56-087-Z.png',
  'https://i.ibb.co/35ytn2r7/Google-AI-Studio-2025-10-21-T01-17-23-624-Z.png',
  'custom-sunset',
];

const HomePage: React.FC<HomePageProps> = ({ onStart, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [background, setBackground] = useState('');

  useEffect(() => {
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackground(randomBg);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isLoading) return;
    onStart(trimmedPrompt);
  };

  return (
    <>
      <main
        className={`min-h-screen flex flex-col items-center justify-center p-4 text-center transition-all duration-1000 pt-24 ${background === 'custom-sunset' ? 'sunset-waves-bg' : ''}`}
        style={background !== 'custom-sunset' ? {
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${background}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : {}}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
          Build anything with Rapid Web
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="relative w-full">
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Create a photo gallery with a search bar'"
              className="w-full p-4 pr-36 text-lg bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-200 placeholder:text-gray-400 transition-all duration-300"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="absolute bottom-4 right-4 px-5 py-2 bg-white text-black font-semibold text-sm rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:scale-100"
              aria-label="Start building"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Building...
                </span>
              ) : (
                'Build my app'
              )}
            </button>
          </div>
        </form>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button disabled className="flex items-center px-4 py-2 text-sm text-white transition-colors hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Image to app
          </button>
          <span className="text-gray-600">|</span>
          <button disabled className="flex items-center px-4 py-2 text-sm text-white transition-colors hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
              </svg>
              Draw to app
          </button>
          <span className="text-gray-600">|</span>
          <button disabled className="flex items-center px-4 py-2 text-sm text-white transition-colors hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h8a2 2 0 002-2v-4a2 2 0 00-2-2h-8a2 2 0 00-2 2v4a2 2 0 002 2z" />
              </svg>
              Figma to app
          </button>
          <span className="text-gray-600">|</span>
          <button disabled className="flex items-center px-4 py-2 text-sm text-white transition-colors hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2-2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Screenshot to app
          </button>
        </div>
      </main>
    </>
  );
};


const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'editor'>('home');
  const [files, setFiles] = useState<Record<string, string>>(INITIAL_FILES);
  const [activeFile, setActiveFile] = useState('src/App.tsx');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const handleFileContentChange = useCallback((path: string, newContent: string) => {
    setFiles(prev => ({ ...prev, [path]: newContent }));
  }, []);
  

  const handleSendMessage = useCallback(async (prompt: string) => {
    if (!prompt) return;

    const userMessage: Message = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsStreaming(true);

    try {
      // Fix: API key must be from process.env.API_KEY.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const fullPrompt = `
        User Request: "${prompt}"

        Apply this change to the following project files. Return the complete, updated project structure as a single JSON object.
        
        Current Project Files:
        \`\`\`json
        ${JSON.stringify(files, null, 2)}
        \`\`\`
      `;

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-pro',
        contents: fullPrompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      let accumulatedResponse = '';
      for await (const chunk of responseStream) {
        accumulatedResponse += chunk.text;
      }
      
      const cleanedResponse = accumulatedResponse
        .replace(/^```(?:json)?\s*\n/, '')
        .replace(/```$/, '')
        .trim();

      try {
        const newFiles = JSON.parse(cleanedResponse);
        if (typeof newFiles === 'object' && newFiles !== null && Object.keys(newFiles).length > 0) {
          setFiles(newFiles);

          if (!newFiles[activeFile]) {
             setActiveFile(Object.keys(newFiles)[0] || '');
          }

          const modelMessage: Message = { role: 'model', content: 'I have updated the project files.' };
          setMessages(prev => [...prev, modelMessage]);
        } else {
            throw new Error("Parsed JSON is not a valid file object.");
        }
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError, "Raw response:", cleanedResponse);
        const errorMessage: Message = { role: 'model', content: "Sorry, I received an invalid response from the AI. Please try again." };
        setMessages(prev => [...prev, errorMessage]);
      }

    } catch (error) {
      console.error("Error calling AI:", error);
      // Fix: Update error message to be more generic as per guidelines.
      const errorMessage: Message = { role: 'model', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  }, [files, activeFile]);

  const handleStartSession = useCallback((initialPrompt: string) => {
    if (isLoading) return;
    setFiles(INITIAL_FILES); 
    setActiveFile('src/App.tsx');
    setMessages([]);
    setView('editor');
    handleSendMessage(initialPrompt); 
  }, [handleSendMessage, isLoading]);

  const handleGoHome = useCallback(() => {
    setView('home');
  }, []);
  
  const renderContent = () => {
    switch (view) {
      case 'home':
        return <HomePage onStart={handleStartSession} isLoading={isLoading} />;
      case 'editor':
        return (
          <div className="min-h-screen flex flex-col">
            <Header onHomeClick={handleGoHome} />
            <main className="flex-grow flex flex-col md:flex-row overflow-hidden pt-4 px-4 gap-4">
              <div className="w-full md:w-1/3 flex-1 flex flex-col bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg overflow-hidden">
                <FileExplorer 
                  files={Object.keys(files)}
                  activeFile={activeFile}
                  onSelectFile={setActiveFile}
                />
                <div className="border-t border-white/10 flex-grow">
                  <AiChat 
                    messages={messages} 
                    onSendMessage={handleSendMessage} 
                    isLoading={isLoading} 
                  />
                </div>
              </div>
              <div className={`w-full md:w-2/3 flex-1 flex flex-col bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg overflow-hidden ${isLoading && !isStreaming ? 'loading-glow' : ''}`}>
                <RightPane 
                  files={files}
                  activeFile={activeFile}
                  onCodeChange={handleFileContentChange} 
                  isStreaming={isStreaming}
                />
              </div>
            </main>
          </div>
        );
      default:
        return <HomePage onStart={handleStartSession} isLoading={isLoading} />;
    }
  };

  return (
    <>
      <TopNavBar />
      {renderContent()}
    </>
  );
};

export default App;
