"use client";

import React, { createContext, useContext } from "react";

type SettingsContextType = Record<string, string>;

const SettingsContext = createContext<SettingsContextType>({});

export function SettingsProvider({ 
  children, 
  settings 
}: { 
  children: React.ReactNode; 
  settings: Record<string, string>;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
