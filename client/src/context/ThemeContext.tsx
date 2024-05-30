import React, { createContext, useContext, useState } from 'react';

type Theme = {
  background: string;
  color: string;
};

const lightTheme: Theme = {
  background: '#ffffff',
  color: '#000000',
};

const darkTheme: Theme = {
  background: '#121212',
  color: '#ffffff',
};

type ThemeContextType = {
  theme: Theme;
  setLightTheme: () => void;
  setDarkTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const setLightTheme = () => {
    setTheme(lightTheme);
  };

  const setDarkTheme = () => {
    setTheme(darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setLightTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// useTheme özel kancası
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
