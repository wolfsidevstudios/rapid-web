
import React from 'react';

// Fix: Create constants.ts to provide INITIAL_FILES and SYSTEM_INSTRUCTION.
export const BACKGROUNDS = [
  'https://i.ibb.co/RpYxkrmH/Google-AI-Studio-2025-10-21-T00-54-01-087-Z.png',
  'https://i.ibb.co/QFW3Vvwp/Google-AI-Studio-2025-10-21-T01-20-56-087-Z.png',
  'https://i.ibb.co/35ytn2r7/Google-AI-Studio-2025-10-21-T01-17-23-624-Z.png',
  'custom-sunset',
];

export const INTEGRATIONS_CONFIG = [
  {
    name: 'Stripe',
    description: 'Enable payments and manage subscriptions with the Stripe API.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 48 48", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement('path', { d: "M38 10H10C8.9 10 8 10.9 8 12V36C8 37.1 8.9 38 10 38H38C39.1 38 40 37.1 40 36V12C40 10.9 39.1 10 38 10Z", fill: "#635BFF" }),
      React.createElement('path', { d: "M15 18H20V21H15V18Z", fill: "#FFFFFF" }),
      React.createElement('path', { d: "M22 18H33V21H22V18Z", fill: "#FFFFFF" }),
      React.createElement('path', { d: "M15 24H20V27H15V24Z", fill: "#FFFFFF" }),
      React.createElement('path', { d: "M22 24H33V27H22V24Z", fill: "#FFFFFF" }),
      React.createElement('path', { d: "M15 30H20V33H15V30Z", fill: "#FFFFFF" }),
      React.createElement('path', { d: "M22 30H33V33H22V30Z", fill: "#FFFFFF" })
    ),
    keys: [
      { id: 'publicKey', label: 'Publishable Key', placeholder: 'pk_test_...' },
      { id: 'secretKey', label: 'Secret Key', placeholder: 'sk_test_...' }
    ]
  },
  {
    name: 'Firebase',
    description: 'Use Google Firebase for authentication, databases, and hosting.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 48 48", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement('path', { d: "M10.8 4.2L4 24L10.8 43.8L24 28.5V4.2H10.8Z", fill: "#FFC24A" }),
      React.createElement('path', { d: "M24 4.2V28.5L37.2 43.8L24 4.2Z", fill: "#F4BD41" }),
      React.createElement('path', { d: "M24 33.6L10.8 43.8L15 33.6H24Z", fill: "#F6820C" }),
      React.createElement('path', { d: "M24 33.6H15L18.6 24L24 33.6Z", fill: "#F8A722" }),
      React.createElement('path', { d: "M24 28.5L18.6 24L24 4.2V28.5Z", fill: "#FCCA3F" })
    ),
    keys: [
      { id: 'apiKey', label: 'API Key', placeholder: 'AIza...' },
      { id: 'authDomain', label: 'Auth Domain', placeholder: 'your-project.firebaseapp.com' },
      { id: 'projectId', label: 'Project ID', placeholder: 'your-project-id' },
      { id: 'databaseURL', label: 'Database URL', placeholder: 'https://your-project.firebaseio.com' }
    ]
  }
];


export const INITIAL_FILES: Record<string, string> = {
  'src/App.tsx': `
// The 'initialPage' prop is a special prop used by the preview environment to render a specific page.
// Do not remove it or the logic that uses it.
const App = ({ initialPage = 'home' }) => {
  const [page, setPage] = React.useState(initialPage);

  const navigateTo = (newPage) => {
    setPage(newPage);
  };

  const renderPage = () => {
    switch (page) {
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'about-us':
        return <AboutUsPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <nav className="bg-black/30 backdrop-blur-lg p-4 flex justify-between items-center border-b border-gray-700">
        <div className="text-2xl font-bold">MyApp</div>
        <div className="flex gap-6 text-lg">
          <button onClick={() => navigateTo('home')} className="hover:text-blue-400 transition-colors">Home</button>
          <button onClick={() => navigateTo('how-it-works')} className="hover:text-blue-400 transition-colors">How It Works</button>
          <button onClick={() => navigateTo('about-us')} className="hover:text-blue-400 transition-colors">About Us</button>
        </div>
      </nav>
      <main className="p-8">
        {renderPage()}
      </main>
    </div>
  );
};

const HomePage = () => (
  <div className="text-center">
    <h1 className="text-5xl font-extrabold mb-4">Welcome to Your Web App!</h1>
    <p className="text-xl text-gray-400">This is a multi-page application. You can now tell the AI assistant what you want to build or modify.</p>
  </div>
);

const HowItWorksPage = () => (
  <div>
    <h1 className="text-4xl font-bold mb-6">How It Works</h1>
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="p-6 bg-gray-800 rounded-xl">
        <h2 className="text-2xl font-semibold mb-2 text-blue-400">Step 1: Describe Your Idea</h2>
        <p className="text-gray-300">Start by telling the AI assistant what you want to create or change. Be as descriptive as possible. For example, "Create a photo gallery with a search bar."</p>
      </div>
      <div className="p-6 bg-gray-800 rounded-xl">
        <h2 className="text-2xl font-semibold mb-2 text-blue-400">Step 2: AI Generates the Code</h2>
        <p className="text-gray-300">Our powerful AI will analyze your request and generate the necessary React and Tailwind CSS code, creating or updating multiple files as needed.</p>
      </div>
      <div className="p-6 bg-gray-800 rounded-xl">
        <h2 className="text-2xl font-semibold mb-2 text-blue-400">Step 3: Preview and Iterate</h2>
        <p className="text-gray-300">You'll see a live preview of your application instantly. If it's not perfect, you can ask for more changes until you're happy with the result.</p>
      </div>
    </div>
  </div>
);

const AboutUsPage = () => (
   <div>
    <h1 className="text-4xl font-bold mb-6">About Us</h1>
    <div className="space-y-6 max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
      <p>We are Rapid Web, a team of innovators passionate about making web development accessible to everyone. Our mission is to break down the barriers of coding and empower creators to bring their digital ideas to life.</p>
      <p>Our platform leverages cutting-edge AI to translate natural language into high-quality, production-ready code. Whether you're a seasoned developer looking to accelerate your workflow or a visionary with no coding experience, Rapid Web is your partner in creation.</p>
      <p>Join us on our journey to democratize technology and build the future of the web, together.</p>
    </div>
  </div>
);


// The component to be rendered in the preview must be assigned to a variable named 'Component'.
const Component = App;
`
};

export const SYSTEM_INSTRUCTION = `You are an expert frontend developer specializing in React and Tailwind CSS.
The user will provide a request to modify a web application. You will be given the current project files as a JSON object.
Your response MUST be a single JSON object that contains the complete, updated content for ALL files in the project.
Do not use markdown formatting (like \`\`\`json) around your response.
The JSON keys should be the file paths, and the values should be the full string content of the files.
Ensure the code is clean, functional, and directly implements the user's request.

- The live preview environment injects \`React\` into the scope. Do NOT include \`import React from 'react';\` in your code.
- The root component must be in 'src/App.tsx'.
- The root component in 'src/App.tsx' MUST be assigned to a variable named 'Component'. Example: \`const Component = App;\`. This is crucial for the preview.

**INTEGRATIONS:**
If the user's prompt includes a "Connected Integrations" section with API keys, you MUST use these keys to implement the requested functionality.
For example, if Stripe keys are provided, generate code that uses the Stripe.js library or Stripe API with those keys.
If Firebase config is provided, create a firebase.js or firebase.ts file to initialize the app and then import it where needed.
Do not display the API keys in the generated UI. They should be used in the code logic only.

**ADVANCED EDITING CONTEXT:**
Sometimes, the user's request will include a "Context" section. This means the user is editing a specific part of the app visually.
- **Page-Level Context:** If the context mentions editing a specific page component (e.g., 'HomePage'), you should focus your changes on that component within 'src/App.tsx'.
- **Element-Level Context:** If the context describes a specific element (e.g., "a button with text 'Click Me'"), you must locate that element within the specified page component and apply the user's changes to it.
- When context is provided, you must still return the ENTIRE project file structure in the JSON response, even if you only changed one file.

**IMPORTANT PREVIEW REQUIREMENT:**
The root App component in 'src/App.tsx' is passed a special prop \`initialPage\` by the preview environment.
Your generated code MUST accept this prop and use it to set the initial state for the router.
Example:
\`\`\`
const App = ({ initialPage = 'home' }) => {
  const [page, setPage] = React.useState(initialPage);
  // ... rest of the app
};
\`\`\`
This is essential for the multi-page preview canvas to work correctly. Do not remove this functionality.
`;