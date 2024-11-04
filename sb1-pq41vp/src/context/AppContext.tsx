import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  workflow: any | null;
  setWorkflow: (workflow: any) => void;
  savedForms: any[];
  setSavedForms: (forms: any[]) => void;
  isConnected: boolean;
  setIsConnected: (status: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [workflow, setWorkflow] = useState<any | null>(null);
  const [savedForms, setSavedForms] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  return (
    <AppContext.Provider 
      value={{
        workflow,
        setWorkflow,
        savedForms,
        setSavedForms,
        isConnected,
        setIsConnected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}