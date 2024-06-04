import React, { createContext, useContext, useState } from 'react';

import { Colors } from 'src/constants/color/colors';

export type Theme = {
  backgroundColor: string;
  textColor: string;
  textMutedColor?: string;
  borderColor: string;
  iconColor: string;
  headerBackgroundColor: string;
  shadowColor?: string;
  bottomSheetBackgroundColor?: string;
};

const lightTheme: Theme = {
  backgroundColor: Colors.primaryColors.light,
  textColor: Colors.primaryColors.dark,
  textMutedColor: Colors.primaryColors.textMuted,
  borderColor: Colors.primaryColors.gray,
  iconColor: Colors.primaryColors.dark,
  headerBackgroundColor: Colors.primaryColors.headerColor,
  shadowColor: Colors.primaryColors.dark,
  bottomSheetBackgroundColor: Colors.primaryColors.bottomSheetColor,
};

const darkTheme: Theme = {
  backgroundColor: Colors.primaryColors.dark,
  textColor: Colors.primaryColors.light,
  textMutedColor: Colors.primaryColors.textMuted,
  borderColor: Colors.primaryColors.light,
  iconColor: Colors.primaryColors.light,
  headerBackgroundColor: Colors.primaryColors.dark,
  shadowColor: Colors.primaryColors.light,
  bottomSheetBackgroundColor: Colors.primaryColors.dark,
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
