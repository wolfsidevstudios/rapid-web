// Fix: Create ErrorBoundary.tsx component to be used by the Preview component.
// Fix: Use `React.Component` directly instead of a named import for `Component` to avoid a naming conflict. The preview environment concatenates files, causing the `const Component = App` declaration in `src/App.tsx` to shadow `React.Component`, leading to the error.
import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  // FIX: Explicitly declare state and props. In some build environments, type inference for
  // inherited class members can fail. Declaring them explicitly resolves the issue.
  public readonly props: Props;
  public state: State;

  // FIX: Initialize state in the constructor for broader compatibility.
  // Using a class property for state might not be supported in this environment,
  // leading to type inference issues.
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-900/50 border-l-4 border-red-500 text-red-200 h-full w-full">
          <p className="font-bold">Render Error</p>
          <pre className="mt-2 text-sm whitespace-pre-wrap font-mono">
            {this.state.error?.message}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
