import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeFaction = 'ORDER' | 'CHAOS';

interface ThemeColors {
  background: string;
  card: string;
  primary: string;
  text: string;
  secondaryText: string;
  border: string;
  accent: string;
  surface: string;
}

interface ThemeContextType {
  faction: ThemeFaction;
  setFaction: (faction: ThemeFaction) => void;
  colors: ThemeColors;
}

const ORDER_COLORS: ThemeColors = {
  background: '#040b14',
  card: 'rgba(10, 25, 47, 0.7)',
  primary: '#00F0FF', // Neon Cyan
  text: '#FFFFFF',
  secondaryText: '#8892b0',
  border: '#00F0FF33',
  accent: '#64ffda',
  surface: 'rgba(16, 20, 24, 0.4)',
};

const CHAOS_COLORS: ThemeColors = {
  background: '#0f0505',
  card: 'rgba(32, 10, 10, 0.7)',
  primary: '#FF4500', // Red Orange
  text: '#FFFFFF',
  secondaryText: '#b08888',
  border: '#FF450033',
  accent: '#ff9d00',
  surface: 'rgba(24, 16, 16, 0.4)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [faction, setFaction] = useState<ThemeFaction>('ORDER');

  const colors = faction === 'ORDER' ? ORDER_COLORS : CHAOS_COLORS;

  return (
    <ThemeContext.Provider value={{ faction, setFaction, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
