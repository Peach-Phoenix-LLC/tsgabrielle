'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

// Define the shape of the context
interface BuilderContextType {
  isBuilderMode: boolean;
  setBuilderMode: (isEditing: boolean) => void;
  // In the future, this will hold page layout, content, etc.
  // pageLayout: any;
  // updateLayout: (newLayout: any) => void;
}

// Create the context with a default undefined value
const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

// Create the provider component
export function BuilderProvider({ children }: { children: ReactNode }) {
  const [isBuilderMode, setBuilderMode] = useState(false);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    isBuilderMode,
    setBuilderMode,
  }), [isBuilderMode]);

  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
}

// Create the custom hook for easy consumption
export function useBuilder() {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
}
