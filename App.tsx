
import React, { useState, useCallback, useEffect } from 'react';
import { INITIAL_FILES, SYSTEM_INSTRUCTION, BACKGROUNDS } from './constants';
import { Header } from './components/Header';
import { RightPane } from './components/RightPane';
import { GoogleGenAI } from "@google/genai";
import { TopNavBar } from './components/TopNavBar';
import { LeftPane } from './components/LeftPane';
import { Message } from './components/AiChat';
import { AuthModal } from './components/AuthModal';
import { ProfilePage } from './components/ProfilePage';
import { SettingsPage } from './components/SettingsPage';

// Helper to decode JWT payload from Google Sign-In
const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode JWT", e);
    return null;
  }
};

interface HomePageProps {
  onStart: (prompt: string) => void;
  isLoading: boolean;
  background: string;
}

const HomePage: React.FC<HomePageProps> = ({ onStart, isLoading, background }) => {
  const [prompt, setPrompt] = useState('');

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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Image to app
          </button>
          <span className="text-gray-600">|</span>
          <button disabled className="flex items-center px-4 py-2 text-sm text-white transition-colors hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
              </svg>
              Draw to app
          </button>
          <span className="text-gray-600">|</span>
          <button disabled className="flex items-center px-4 py-2 text-sm text-white transition-colors hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h8a2 2 0 002-2v-4a2 2 0 00-2-2h-8a2 2 0 00-2 2v4a2 2 0 002 2z" />
              </svg>
              Figma to app
          </button>
          <span className="text-gray-600">|</span>
          <button disabled className="flex items-center px-4 py-2 text-sm text-white transition-colors hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={2}>
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

export type EditState = {
  isActive: boolean;
  targetPage: string | null;
  mode: 'page' | 'element' | 'element-select' | null;
  elementSelector?: string;
  position?: { x: number, y: number };
};

type User = { name: string; email: string; picture: string; };
type Project = { id: string; name: string; files: Record<string, string>; lastModified: number; };
type BackgroundSettings = { auto: boolean; selected: string; };

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'editor' | 'profile' | 'settings'>('home');
  const [files, setFiles] = useState<Record<string, string>>(INITIAL_FILES);
  const [activeFile, setActiveFile] = useState('src/App.tsx');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentBackground, setCurrentBackground] = useState('');
  const [editState, setEditState] = useState<EditState>({ isActive: false, targetPage: null, mode: null });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [backgroundSettings, setBackgroundSettings] = useState<BackgroundSettings>({ auto: true, selected: BACKGROUNDS[0] });

  useEffect(() => {
    // Load state from localStorage on initial load
    try {
      const storedUser = localStorage.getItem('rapid-web-user');
      if (storedUser) setUser(JSON.parse(storedUser));
      const storedProjects = localStorage.getItem('rapid-web-projects');
      if (storedProjects) setProjects(JSON.parse(storedProjects));
      const storedApiKey = localStorage.getItem('rapid-web-api-key');
      if (storedApiKey) setApiKey(storedApiKey);
      const storedBgSettings = localStorage.getItem('rapid-web-bg-settings');
      if (storedBgSettings) setBackgroundSettings(JSON.parse(storedBgSettings));
    } catch (e) {
      console.error("Failed to parse data from localStorage", e);
    }
  }, []);

   useEffect(() => {
    // Set background based on settings
    if (view === 'home') {
        if (backgroundSettings.auto) {
            const randomBg = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
            setCurrentBackground(randomBg);
        } else {
            setCurrentBackground(backgroundSettings.selected);
        }
    }
  }, [view, backgroundSettings]);

  const handleFileContentChange = useCallback((path: string, newContent: string) => {
    setFiles(prev => ({ ...prev, [path]: newContent }));
  }, []);
  
  const saveProjectsToStorage = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem('rapid-web-projects', JSON.stringify(updatedProjects));
  };
  
  const handleSendMessage = useCallback(async (prompt: string, editContext?: EditState, filesContext?: Record<string, string>) => {
    if (!prompt) return;

    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'model', content: 'Please set your Gemini API Key in the Settings page first.' }]);
      return;
    }
  
    const currentFiles = filesContext || files;
    const userMessage: Message = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsStreaming(true);
    if (editContext?.isActive) {
      setEditState({ isActive: false, targetPage: null, mode: null });
    }
  
    try {
      const ai = new GoogleGenAI({ apiKey });
  
      let fullPrompt: string;
      const filesPayload = JSON.stringify(currentFiles, null, 2);

      if (editContext?.isActive && editContext.targetPage) {
        // ... (Contextual edit prompt logic remains the same)
      } else {
         fullPrompt = `
          User Request: "${prompt}"
          Apply this change to the following project files. Return the complete, updated project structure as a single JSON object.
          Current Project Files: \`\`\`json\n${filesPayload}\n\`\`\`
        `;
      }
  
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-pro',
        contents: fullPrompt,
        config: { systemInstruction: SYSTEM_INSTRUCTION }
      });
  
      let accumulatedResponse = '';
      for await (const chunk of responseStream) {
        accumulatedResponse += chunk.text;
      }
      
      const cleanedResponse = accumulatedResponse.replace(/^```(?:json)?\s*\n/, '').replace(/```$/, '').trim();
  
      try {
        const newFiles = JSON.parse(cleanedResponse);
        if (typeof newFiles === 'object' && newFiles !== null && Object.keys(newFiles).length > 0) {
          setFiles(newFiles);
          if (!newFiles[activeFile]) setActiveFile(Object.keys(newFiles)[0] || '');
          const modelMessage: Message = { role: 'model', content: 'I have updated the project files.' };
          setMessages(prev => [...prev, modelMessage]);

          // Save the updated project
          if (currentProjectId) {
            const updatedProjects = projects.map(p =>
              p.id === currentProjectId ? { ...p, files: newFiles, lastModified: Date.now() } : p
            );
            saveProjectsToStorage(updatedProjects);
          }
        } else {
          throw new Error("Parsed JSON is not a valid file object.");
        }
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError, "Raw response:", cleanedResponse);
        const errorMessage: Message = { role: 'model', content: "Sorry, I received an invalid response. Please try rephrasing your request." };
        setMessages(prev => [...prev, errorMessage]);
      }
  
    } catch (error) {
      console.error("Error calling AI:", error);
      const errorMessage: Message = { role: 'model', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  }, [files, activeFile, projects, currentProjectId, apiKey]);

  const handleCreateNewProject = useCallback((initialPrompt: string) => {
    if (!apiKey) {
      setView('settings');
      return;
    }
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    const newProject: Project = {
      id: Date.now().toString(),
      name: initialPrompt.substring(0, 50) + (initialPrompt.length > 50 ? '...' : ''),
      files: INITIAL_FILES,
      lastModified: Date.now(),
    };
    const updatedProjects = [...projects, newProject];
    saveProjectsToStorage(updatedProjects);
    setCurrentProjectId(newProject.id);
    setFiles(newProject.files);
    setMessages([]);
    setView('editor');
    handleSendMessage(initialPrompt, undefined, newProject.files);
  }, [projects, handleSendMessage, user, apiKey]);

  const handleOpenProject = (projectId: string) => {
    const projectToOpen = projects.find(p => p.id === projectId);
    if (projectToOpen) {
      setCurrentProjectId(projectToOpen.id);
      setFiles(projectToOpen.files);
      setActiveFile('src/App.tsx');
      setMessages([]);
      setView('editor');
    }
  };

  const handleLoginSuccess = (credentialResponse: any) => {
    const userData = decodeJwt(credentialResponse.credential);
    if (userData) {
      const newUser: User = { name: userData.name, email: userData.email, picture: userData.picture };
      setUser(newUser);
      localStorage.setItem('rapid-web-user', JSON.stringify(newUser));
    }
    setIsAuthModalOpen(false);
  };
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('rapid-web-user');
    setView('home');
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('rapid-web-api-key', key);
  };

  const handleBackgroundSettingsChange = (settings: BackgroundSettings) => {
      setBackgroundSettings(settings);
      localStorage.setItem('rapid-web-bg-settings', JSON.stringify(settings));
  };

  const handleGoHome = useCallback(() => { setView('home'); }, []);
  const handleGoToProfile = useCallback(() => { if (user) setView('profile'); else setView('home'); }, [user]);
  const handleGoToSettings = useCallback(() => { setView('settings'); }, []);
  const handleOpenAuthModal = useCallback(() => { setIsAuthModalOpen(true); }, []);

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <HomePage onStart={handleCreateNewProject} isLoading={isLoading} background={currentBackground} />;
      case 'profile':
        return user ? <ProfilePage user={user} projects={projects} onOpenProject={handleOpenProject} onLogout={handleLogout} /> : <HomePage onStart={handleCreateNewProject} isLoading={isLoading} background={currentBackground} />;
      case 'settings':
        return <SettingsPage apiKey={apiKey} onSave={handleSaveApiKey} backgroundSettings={backgroundSettings} onBackgroundSettingsChange={handleBackgroundSettingsChange} />;
      case 'editor':
        return (
          <div className="min-h-screen flex flex-col">
            <Header onHomeClick={handleGoToProfile} />
            <main className="flex-grow flex flex-col md:flex-row overflow-hidden pt-4 px-4 gap-4">
               <LeftPane
                messages={messages}
                onSendMessage={(prompt) => handleSendMessage(prompt, editState)}
                isLoading={isLoading}
              />
              <RightPane
                files={files}
                activeFile={activeFile}
                onSelectFile={setActiveFile}
                onCodeChange={handleFileContentChange}
                isStreaming={isStreaming}
                isLoading={isLoading}
                editState={editState}
                setEditState={setEditState}
                onAiRequest={handleSendMessage}
              />
            </main>
          </div>
        );
      default:
        return <HomePage onStart={handleCreateNewProject} isLoading={isLoading} background={currentBackground} />;
    }
  };

  return (
    <>
      <TopNavBar 
        onHomeClick={handleGoHome} 
        onProfileClick={handleGoToProfile} 
        onLoginClick={handleOpenAuthModal}
        onSettingsClick={handleGoToSettings}
        user={user}
      />
      {renderContent()}
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} onLoginSuccess={handleLoginSuccess}/>}
    </>
  );
};

export default App;
