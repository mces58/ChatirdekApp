import React, { createContext, useContext, useState } from 'react';

import { Colors } from 'src/constants/color/colors';

export type Theme = {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
};

const lightTheme: Theme = {
  backgroundColor: Colors.primary.light,
  textColor: Colors.primary.dark,
  borderColor: Colors.primary.dark,
};

const darkTheme: Theme = {
  backgroundColor: Colors.primary.dark,
  textColor: Colors.primary.light,
  borderColor: Colors.primary.light,
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

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
