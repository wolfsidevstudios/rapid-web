
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { INITIAL_FILES, SYSTEM_INSTRUCTION, SYSTEM_INSTRUCTION_PLAN, BACKGROUNDS, SYSTEM_INSTRUCTION_INTEGRATIONS } from './constants';
import { Header } from './components/Header';
import { RightPane } from './components/RightPane';
import { GoogleGenAI } from "@google/genai";
import { TopNavBar } from './components/TopNavBar';
import { LeftPane } from './components/LeftPane';
import { Message } from './components/AiChat';
import { AuthModal } from './components/AuthModal';
import { ProfilePage } from './components/ProfilePage';
import { SettingsPage } from './components/SettingsPage';
import { IntegrationsPage } from './components/IntegrationsPage';
import { PublishModal } from './components/PublishModal';
import { FirebasePublishModal } from './components/FirebasePublishModal';
import { CloneModal } from './components/CloneModal';
import { DrawingCanvas } from './components/DrawingCanvas';
import { ScreenshotModal } from './components/ScreenshotModal';
import { PlanningPage } from './components/PlanningPage';

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

// Helper to read file as Base64
const fileToBase64 = (file: File): Promise<{ data: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const [header, data] = result.split(',');
      const mimeType = header.match(/:(.*?);/)?.[1] || 'application/octet-stream';
      resolve({ data, mimeType });
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

interface HomePageProps {
  onStart: (prompt: string, image?: { data: string; mimeType: string }) => void;
  isLoading: boolean;
  background: string;
  onOpenCloneModal: () => void;
  onOpenDrawingCanvas: () => void;
  onOpenScreenshotModal: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStart, isLoading, background, onOpenCloneModal, onOpenDrawingCanvas, onOpenScreenshotModal }) => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPrompt = prompt.trim();
    if ((!trimmedPrompt && !image) || isLoading) return;
    onStart(trimmedPrompt || 'Create an application based on this image.', image);
  };

  // FIX: Corrected a syntax error in the catch block. This was causing a cascade of scope resolution failures for other functions and state setters within the component.
  const handleImageUpload = async (file: File | null) => {
      if (file && file.type.startsWith('image/')) {
          try {
              const imageData = await fileToBase64(file);
              setImage(imageData);
          } catch (error) {
              console.error("Error reading image file:", error);
          }
      }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // FIX: Add type 'any' to item in find() to prevent TypeScript from inferring 'unknown'.
    const item = Array.from(e.clipboardData.items).find((i: any) => i.type.startsWith('image/'));
    if (item) {
        // FIX: Cast `item` to `any` to fix: Property 'getAsFile' does not exist on type 'unknown'.
        handleImageUpload((item as any).getAsFile());
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      // FIX: Add type 'any' to file in find() to prevent TypeScript from inferring 'unknown'.
      const file = Array.from(e.dataTransfer.files).find((f: any) => f.type.startsWith('image/'));
      if (file) {
          // FIX: Cast `file` to `File` to fix: Argument of type 'unknown' is not assignable to parameter of type 'File'.
          handleImageUpload(file as File);
      }
  };

  return (
    <>
      <main
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`min-h-screen flex flex-col items-center justify-center p-4 text-center transition-all duration-1000 pt-24 ${background === 'custom-sunset' ? 'sunset-waves-bg' : ''} ${isDragging ? 'border-4 border-dashed border-blue-500 bg-blue-500/10' : 'border-4 border-transparent'}`}
        style={background !== 'custom-sunset' ? {
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${background}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : {}}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Build anything with Rapid Web
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="relative w-full">
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onPaste={handlePaste}
              placeholder="Describe your app, or paste an image..."
              className="w-full p-4 pr-36 text-lg bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-200 placeholder:text-gray-400 transition-all duration-300"
              disabled={isLoading}
            />
            {image && (
                <div className="absolute bottom-4 right-40 p-1 bg-black/50 rounded-lg backdrop-blur-sm">
                    <img src={`data:${image.mimeType};base64,${image.data}`} alt="Image preview" className="h-16 w-16 object-cover rounded" />
                    <button type="button" onClick={() => setImage(null)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">&times;</button>
                </div>
            )}
            <button
              type="submit"
              disabled={isLoading || (!prompt.trim() && !image)}
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
        <input type="file" ref={fileInputRef} onChange={(e) => handleImageUpload(e.target.files?.[0] || null)} accept="image/*" className="hidden" />
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center px-4 py-2 text-sm text-white transition-colors hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>
                Image to app
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={onOpenDrawingCanvas} className="flex items-center px-4 py-2 text-sm text-white transition-colors hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                Draw to app
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={onOpenCloneModal} className="flex items-center px-4 py-2 text-sm text-white transition-colors hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                Clone from URL
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={onOpenScreenshotModal} className="flex items-center px-4 py-2 text-sm text-white transition-colors hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h6l-2 2v1h8v-1l-2-2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
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

type View = 'home' | 'editor' | 'profile' | 'settings' | 'integrations' | 'planning';
type User = { name: string; email: string; picture: string; };
type Project = { id: string; name: string; files: Record<string, string>; lastModified: number; };
type BackgroundSettings = { auto: boolean; selected: string; };
type PreviewMode = 'canvas' | 'classic';
type ProjectStructureMode = 'multi-file' | 'single-file';
type Integrations = Record<string, Record<string, string>>;
type CurrentPlan = {
    plan: string;
    originalPrompt: string;
    imageContext?: { data: string; mimeType: string };
};


// Helper function to compute SHA1 hash for Netlify deployment
const sha1 = async (text: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
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
  const [previewMode, setPreviewMode] = useState<PreviewMode>('classic');
  const [projectStructureMode, setProjectStructureMode] = useState<ProjectStructureMode>('multi-file');
  const [integrations, setIntegrations] = useState<Integrations>({});
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isFirebasePublishModalOpen, setIsFirebasePublishModalOpen] = useState(false);
  const [netlifyPat, setNetlifyPat] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishUrl, setPublishUrl] = useState<string | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [isDrawingCanvasOpen, setIsDrawingCanvasOpen] = useState(false);
  const [isScreenshotModalOpen, setIsScreenshotModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<CurrentPlan | null>(null);
  const [isAwaitingIntegrationSelection, setIsAwaitingIntegrationSelection] = useState(false);


  const navigate = useCallback((newView: View, path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    setView(newView);
  }, []);

  // Routing effect
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const editorMatch = path.match(/^\/editor\/([\w-]+)$/);
      const planningMatch = path.match(/^\/planning\/([\w-]+)$/);

      const openProject = (projectId: string, targetView: 'editor' | 'planning', fromUrl = false) => {
        const storedProjects = localStorage.getItem('rapid-web-projects');
        if (storedProjects) {
          const parsedProjects: Project[] = JSON.parse(storedProjects);
          const projectToOpen = parsedProjects.find(p => p.id === projectId);
          if (projectToOpen) {
            setProjects(parsedProjects);
            handleOpenProject(projectId, targetView, fromUrl);
          } else {
            navigate('home', '/');
          }
        } else {
          navigate('home', '/');
        }
      };

      if (editorMatch) openProject(editorMatch[1], 'editor', true);
      else if (planningMatch) openProject(planningMatch[1], 'planning', true);
      else if (path === '/profile') setView('profile');
      else if (path === '/settings') setView('settings');
      else if (path === '/integrations') setView('integrations');
      else {
          setView('home');
          setCurrentProjectId(null);
          setCurrentPlan(null);
      }
    };
    
    // Load state from localStorage on initial load
    try {
      const storedUser = localStorage.getItem('rapid-web-user');
      if (storedUser) setUser(JSON.parse(storedUser));
      const storedProjects = localStorage.getItem('rapid-web-projects');
        if (storedProjects) {
            const parsed = JSON.parse(storedProjects);
            setProjects(parsed);
        }
      const storedApiKey = localStorage.getItem('rapid-web-api-key');
      if (storedApiKey) setApiKey(storedApiKey);
      const storedBgSettings = localStorage.getItem('rapid-web-bg-settings');
      if (storedBgSettings) setBackgroundSettings(JSON.parse(storedBgSettings));
      const storedPreviewMode = localStorage.getItem('rapid-web-preview-mode');
      if (storedPreviewMode) setPreviewMode(JSON.parse(storedPreviewMode));
      const storedStructureMode = localStorage.getItem('rapid-web-project-structure-mode');
      if (storedStructureMode) setProjectStructureMode(JSON.parse(storedStructureMode));
      const storedIntegrations = localStorage.getItem('rapid-web-integrations');
      if (storedIntegrations) setIntegrations(JSON.parse(storedIntegrations));
      const storedPat = localStorage.getItem('rapid-web-netlify-pat');
      if (storedPat) setNetlifyPat(storedPat);

    } catch (e) {
      console.error("Failed to parse data from localStorage", e);
    }
    
    handlePopState(); // Set initial view based on path
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);


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
    setFiles(prevFiles => {
        const newFiles = { ...prevFiles, [path]: newContent };
        if (currentProjectId) {
            setProjects(prevProjects => {
                const updatedProjects = prevProjects.map(p =>
                    p.id === currentProjectId ? { ...p, files: newFiles, lastModified: Date.now() } : p
                );
                localStorage.setItem('rapid-web-projects', JSON.stringify(updatedProjects));
                return updatedProjects;
            });
        }
        return newFiles;
    });
  }, [currentProjectId]);
  
  const saveProjectsToStorage = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem('rapid-web-projects', JSON.stringify(updatedProjects));
  };

  const handleCodeGeneration = useCallback(async (planContext: CurrentPlan, selectedIntegrations: string[]) => {
      setIsAwaitingIntegrationSelection(false);
      setIsLoading(true);
      setIsStreaming(true);
      setMessages(prev => [...prev, {role: 'user', content: `Great, let's build this${selectedIntegrations.length > 0 ? ` with ${selectedIntegrations.join(', ')}` : ''}.`}])
  
      try {
        const ai = new GoogleGenAI({ apiKey });
    
        const filesPayload = JSON.stringify(files, null, 2);
        
        const parts: any[] = [{ text: `User Request: "${planContext.originalPrompt}"\n\nApproved Plan:\n${planContext.plan}` }];
  
        let integrationsContext = '';
        if (selectedIntegrations.length > 0) {
            const connectedIntegrations = Object.entries(integrations).filter(([name]) => selectedIntegrations.includes(name));
            if (connectedIntegrations.length > 0) {
                integrationsContext = `
                  The user has connected and selected the following integrations. Use these API keys to implement full functionality.
                  Do not display these keys in the UI.
                  \`\`\`json
                  ${JSON.stringify(Object.fromEntries(connectedIntegrations), null, 2)}
                  \`\`\`
                `;
                parts[0].text += `\n${integrationsContext}`;
            }
        }
        
        if (planContext.imageContext) {
            parts.unshift({
                inlineData: {
                    mimeType: planContext.imageContext.mimeType,
                    data: planContext.imageContext.data,
                },
            });
        }
  
        parts.push({text: `Apply this change to the following project files based on the approved plan. Return the complete, updated project structure as a single JSON object.
        Current Project Files: \`\`\`json\n${filesPayload}\n\`\`\``})
  
        let finalSystemInstruction = SYSTEM_INSTRUCTION;
        if (projectStructureMode === 'single-file') {
            finalSystemInstruction += `\n\n**IMPORTANT FILE STRUCTURE RULE:** You MUST generate the entire application within a single file: 'src/App.tsx'. All components must be defined within this file. Do not create any other files. The JSON response should only contain one key: 'src/App.tsx'. If 'netlify.toml' exists, you may include it as well.`;
        } else {
            finalSystemInstruction += `\n\n**FILE STRUCTURE RULE:** You should logically organize the application into multiple files and components as appropriate for the project's complexity, such as placing reusable components in a 'src/components' directory.`;
        }

        const responseStream = await ai.models.generateContentStream({
          model: 'gemini-2.5-pro',
          contents: { parts },
          config: {
            systemInstruction: finalSystemInstruction,
            thinkingConfig: { thinkingBudget: 32768 },
          },
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
  }, [files, activeFile, projects, currentProjectId, apiKey, integrations, projectStructureMode]);
  
  const handleApprovePlan = useCallback(async () => {
    if (!currentPlan) return;

    navigate('editor', `/editor/${currentProjectId!}`);
    setIsLoading(true);
    setIsAwaitingIntegrationSelection(true);

    try {
        const ai = new GoogleGenAI({ apiKey });
        const integrationNames = `["${Object.keys(integrations).join('", "')}"]`;
        const prompt = SYSTEM_INSTRUCTION_INTEGRATIONS.replace('[PLAN]', currentPlan.plan).replace('["Stripe", "Firebase", ...]', integrationNames);

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: { responseMimeType: 'application/json' },
        });

        const suggestions = JSON.parse(response.text.trim());

        if (suggestions.length === 0) {
            // No suggestions, proceed directly to code generation.
            // handleCodeGeneration will manage the loading state from this point.
            handleCodeGeneration(currentPlan, []);
        } else {
            // We have suggestions, so display them to the user.
            const modelMessage: Message = {
                role: 'model',
                content: 'Plan approved! Before building, would you like to add any of these suggested integrations?',
                isIntegrationSuggestion: true,
                suggestions: suggestions,
            };
            setMessages([modelMessage]);
            setIsLoading(false); // We are now waiting for user input, so not "loading".
        }
    } catch (error) {
        console.error("Error getting integration suggestions:", error);
        // If suggestion API fails, proceed without suggestions.
        // handleCodeGeneration will manage the loading state.
        handleCodeGeneration(currentPlan, []);
    }
  }, [apiKey, currentPlan, currentProjectId, navigate, handleCodeGeneration, integrations]);

  const handlePlanModification = useCallback(async (modification: string) => {
      if (!currentPlan) return;
      setIsLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `The user wants to modify the following plan.
        Original Request: "${currentPlan.originalPrompt}"
        Current Plan:
        ---
        ${currentPlan.plan}
        ---
        Modification Request: "${modification}"
        
        Generate a new, complete plan incorporating the change.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-pro',
          contents: prompt,
          config: { systemInstruction: SYSTEM_INSTRUCTION_PLAN },
        });
        setCurrentPlan(prev => prev ? { ...prev, plan: response.text } : null);
      } catch (error) {
          console.error("Error modifying plan:", error);
      } finally {
          setIsLoading(false);
      }
  }, [apiKey, currentPlan]);

  const handleGetInitialPlan = useCallback(async (prompt: string, imageContext?: { data: string; mimeType: string }) => {
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'model', content: 'Please set your Gemini API Key in the Settings page first.' }]);
      navigate('settings', '/settings');
      return;
    }
    
    setIsLoading(true);
    setCurrentPlan(null);
  
    try {
      const ai = new GoogleGenAI({ apiKey });
      const parts: any[] = [{ text: `User Request: "${prompt}"` }];
      
      if (imageContext) {
          parts.unshift({ inlineData: { mimeType: imageContext.mimeType, data: imageContext.data } });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: { parts },
        config: { systemInstruction: SYSTEM_INSTRUCTION_PLAN, thinkingConfig: { thinkingBudget: 32768 } },
      });
  
      setCurrentPlan({ plan: response.text, originalPrompt: prompt, imageContext });
      navigate('planning', `/planning/${currentProjectId!}`);
  
    } catch (error) {
      console.error("Error calling AI for plan:", error);
      // Temporarily show error on homepage
      navigate('home', '/');
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, currentProjectId, navigate]);

  const handleCreateNewProject = useCallback((initialPrompt: string, image?: { data: string; mimeType: string }) => {
    if (!apiKey) {
      navigate('settings', '/settings');
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
    handleGetInitialPlan(initialPrompt, image);
  }, [projects, handleGetInitialPlan, user, apiKey, navigate]);

  const handleCloneProject = (url: string) => {
    setIsCloneModalOpen(false);
    const prompt = `Clone the website at this URL: ${url}`;
    handleCreateNewProject(prompt);
  };

  const handleDrawingDone = (imageData: { data: string; mimeType: string }) => {
    setIsDrawingCanvasOpen(false);
    const prompt = "Create an application based on this drawing.";
    handleCreateNewProject(prompt, imageData);
  };

  const handleScreenshotDone = (imageData: { data: string; mimeType: string }) => {
    setIsScreenshotModalOpen(false);
    const prompt = "Create an application based on this screenshot.";
    handleCreateNewProject(prompt, imageData);
  };

  const handleOpenProject = (projectId: string, targetView: 'editor' | 'planning' = 'editor', fromUrl = false) => {
    const projectToOpen = projects.find(p => p.id === projectId);
    if (projectToOpen) {
      setCurrentProjectId(projectToOpen.id);
      setFiles(projectToOpen.files);
      setActiveFile('src/App.tsx');
      setMessages([]);
      setCurrentPlan(null); 
      setIsAwaitingIntegrationSelection(false);
      
      const path = `/${targetView}/${projectToOpen.id}`;
      if (!fromUrl) {
          navigate(targetView, path);
      } else {
          setView(targetView);
      }
    } else if (fromUrl) {
        navigate('home', '/');
    }
  };
  
  const handleInitiatePublish = () => {
    setPublishUrl(null);
    setPublishError(null);
    setIsPublishModalOpen(true);
  };

  const handleInitiateFirebasePublish = () => {
    setIsFirebasePublishModalOpen(true);
  };

  const handlePublish = async (pat: string) => {
    if (!pat) {
        setPublishError('Netlify Personal Access Token is required.');
        return;
    }
    setIsPublishing(true);
    setPublishError(null);
    setNetlifyPat(pat);
    localStorage.setItem('rapid-web-netlify-pat', pat);

    try {
        const currentFiles = { ...files };
        if (!currentFiles['netlify.toml']) {
            currentFiles['netlify.toml'] = `[build]\n  publish = "."\n\n[[redirects]]\n  from = "/*"\n  to = "/index.html"\n  status = 200`;
            setFiles(currentFiles);
        }

        // Create site
        const projectName = projects.find(p => p.id === currentProjectId)?.name.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase().slice(0, 40) || 'rapid-web-site';
        const siteName = `${projectName}-${Date.now().toString().slice(-6)}`;
        
        const createSiteRes = await fetch('https://api.netlify.com/api/v1/sites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${pat}` },
            body: JSON.stringify({ name: siteName })
        });
        if (!createSiteRes.ok) throw new Error(`Netlify: ${(await createSiteRes.json()).message || 'Failed to create site'}`);
        const siteData = await createSiteRes.json();
        const siteId = siteData.id;

        // Prepare file digests
        const fileDigests: Record<string, string> = {};
        for (const path in currentFiles) {
            fileDigests[path] = await sha1(currentFiles[path]);
        }
        
        // Create deploy
        const createDeployRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${pat}` },
            body: JSON.stringify({ files: fileDigests })
        });
        if (!createDeployRes.ok) throw new Error(`Netlify: ${(await createDeployRes.json()).message || 'Failed to create deploy'}`);
        const deployData = await createDeployRes.json();
        const deployId = deployData.id;
        const requiredHashes: string[] = deployData.required;

        // Upload required files
        for (const requiredHash of requiredHashes) {
            const filePath = Object.keys(fileDigests).find(path => fileDigests[path] === requiredHash);
            if (filePath) {
                const uploadRes = await fetch(`https://api.netlify.com/api/v1/deploys/${deployId}/files/${filePath}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/octet-stream', 'Authorization': `Bearer ${pat}` },
                    body: currentFiles[filePath]
                });
                if (!uploadRes.ok) throw new Error(`Netlify: ${(await uploadRes.json()).message || `Failed to upload ${filePath}`}`);
            }
        }
        
        setPublishUrl(siteData.ssl_url || siteData.url);

    } catch (error) {
        console.error("Publishing error:", error);
        setPublishError(`Failed to publish. ${error instanceof Error ? error.message : 'An unknown error occurred.'}`);
    } finally {
        setIsPublishing(false);
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
    navigate('home', '/');
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('rapid-web-api-key', key);
  };

  const handleBackgroundSettingsChange = (settings: BackgroundSettings) => {
      setBackgroundSettings(settings);
      localStorage.setItem('rapid-web-bg-settings', JSON.stringify(settings));
  };

  const handlePreviewModeChange = (mode: PreviewMode) => {
    setPreviewMode(mode);
    localStorage.setItem('rapid-web-preview-mode', JSON.stringify(mode));
  };

  const handleProjectStructureModeChange = (mode: ProjectStructureMode) => {
    setProjectStructureMode(mode);
    localStorage.setItem('rapid-web-project-structure-mode', JSON.stringify(mode));
  };

  const handleSaveIntegration = (name: string, keys: Record<string, string>) => {
    const updatedIntegrations = { ...integrations, [name]: keys };
    setIntegrations(updatedIntegrations);
    localStorage.setItem('rapid-web-integrations', JSON.stringify(updatedIntegrations));
  };
  
  const handleGoHome = useCallback(() => { navigate('home', '/'); }, [navigate]);
  const handleGoToProfile = useCallback(() => { if (user) navigate('profile', '/profile'); }, [user, navigate]);
  const handleGoToSettings = useCallback(() => { navigate('settings', '/settings'); }, [navigate]);
  const handleGoToIntegrations = useCallback(() => { navigate('integrations', '/integrations'); }, [navigate]);
  const handleOpenAuthModal = useCallback(() => { setIsAuthModalOpen(true); }, []);

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <HomePage 
                    onStart={handleCreateNewProject} 
                    isLoading={isLoading} 
                    background={currentBackground} 
                    onOpenCloneModal={() => setIsCloneModalOpen(true)} 
                    onOpenDrawingCanvas={() => setIsDrawingCanvasOpen(true)} 
                    onOpenScreenshotModal={() => setIsScreenshotModalOpen(true)}
                />;
      case 'profile':
        return user ? <ProfilePage user={user} projects={projects} onOpenProject={(id) => handleOpenProject(id)} onLogout={handleLogout} /> : <HomePage onStart={handleCreateNewProject} isLoading={isLoading} background={currentBackground} onOpenCloneModal={() => setIsCloneModalOpen(true)} onOpenDrawingCanvas={() => setIsDrawingCanvasOpen(true)} onOpenScreenshotModal={() => setIsScreenshotModalOpen(true)} />;
      case 'settings':
        return <SettingsPage apiKey={apiKey} onSave={handleSaveApiKey} backgroundSettings={backgroundSettings} onBackgroundSettingsChange={handleBackgroundSettingsChange} previewMode={previewMode} onPreviewModeChange={handlePreviewModeChange} projectStructureMode={projectStructureMode} onProjectStructureModeChange={handleProjectStructureModeChange} />;
      case 'integrations':
        return <IntegrationsPage savedIntegrations={integrations} onSave={handleSaveIntegration} />;
      case 'planning':
        return <PlanningPage 
                  plan={currentPlan?.plan || ''}
                  isLoading={isLoading}
                  onApprove={handleApprovePlan}
                  onDecline={handleGoHome}
                  onModify={handlePlanModification}
                />;
      case 'editor':
        return (
          <div className="min-h-screen flex flex-col">
            <Header onHomeClick={handleGoHome} />
            <main className="flex-grow flex flex-col md:flex-row overflow-hidden pt-4 px-4 gap-4">
               <LeftPane
                messages={messages}
                onSendMessage={(prompt) => { /* Disallow sending messages during integration step */ }}
                isLoading={isLoading}
                onApprovePlan={() => { /* Plan is already approved */ }}
                isAwaitingApproval={isAwaitingIntegrationSelection}
                onConfirmIntegrations={(selected) => handleCodeGeneration(currentPlan!, selected)}
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
                onAiRequest={(prompt, context) => { /*TODO: Re-evaluate AI edit requests*/ }}
                previewMode={previewMode}
                onPublishClick={handleInitiatePublish}
                onFirebasePublishClick={handleInitiateFirebasePublish}
                isFirebaseConfigured={!!integrations.Firebase?.projectId}
              />
            </main>
          </div>
        );
      default:
        return <HomePage onStart={handleCreateNewProject} isLoading={isLoading} background={currentBackground} onOpenCloneModal={() => setIsCloneModalOpen(true)} onOpenDrawingCanvas={() => setIsDrawingCanvasOpen(true)} onOpenScreenshotModal={() => setIsScreenshotModalOpen(true)} />;
    }
  };

  return (
    <>
      <TopNavBar 
        onHomeClick={handleGoHome} 
        onProfileClick={handleGoToProfile} 
        onLoginClick={handleOpenAuthModal}
        onSettingsClick={handleGoToSettings}
        onIntegrationsClick={handleGoToIntegrations}
        user={user}
      />
      {renderContent()}
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} onLoginSuccess={handleLoginSuccess}/>}
      {isCloneModalOpen && <CloneModal onClose={() => setIsCloneModalOpen(false)} onClone={handleCloneProject} />}
      {isDrawingCanvasOpen && <DrawingCanvas onClose={() => setIsDrawingCanvasOpen(false)} onDone={handleDrawingDone} />}
      {isScreenshotModalOpen && <ScreenshotModal onClose={() => setIsScreenshotModalOpen(false)} onScreenshot={handleScreenshotDone} />}
      <PublishModal 
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPublish={handlePublish}
        isPublishing={isPublishing}
        publishUrl={publishUrl}
        publishError={publishError}
        initialPat={netlifyPat}
      />
       <FirebasePublishModal
        isOpen={isFirebasePublishModalOpen}
        onClose={() => setIsFirebasePublishModalOpen(false)}
        firebaseConfig={integrations.Firebase || {}}
        onAddFile={(path, content) => {
            handleFileContentChange(path, content);
            setIsFirebasePublishModalOpen(false);
        }}
      />
    </>
  );
};

export default App;
