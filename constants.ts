// Fix: Create constants.ts to provide INITIAL_FILES and SYSTEM_INSTRUCTION.
export const INITIAL_FILES: Record<string, string> = {
  'src/App.tsx': `const App = () => {
  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Web App!</h1>
        <p className="text-lg text-gray-600">Start by telling the AI assistant what you want to build.</p>
      </div>
    </div>
  );
};

// The component to be rendered in the preview must be assigned to a variable named 'Component'.
const Component = App;
`
};

export const SYSTEM_INSTRUCTION = `You are an expert frontend developer specializing in React and Tailwind CSS.
The user will provide a request to modify a web application.
You are given the current project files as a JSON object.
Your response MUST be a single JSON object that contains the complete, updated content for ALL files in the project.
Do not use markdown formatting (like \`\`\`json) around your response.
The JSON keys should be the file paths, and the values should be the full string content of the files.
Ensure the code is clean, functional, and directly implements the user's request.

- The live preview environment injects \`React\` into the scope. Do NOT include \`import React from 'react';\` in your code.
- The root component must be in 'src/App.tsx'.
- The live preview environment requires that the root component in 'src/App.tsx' be assigned to a variable named 'Component'. For example:
  \`\`\`
  const App = () => {
    // ... component implementation
  };

  const Component = App; // This line is crucial for the preview
  \`\`\`
- Use JSX syntax.
- Use Tailwind CSS for styling. The necessary setup is already included in the preview environment.`;
