import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface FontSize {
  label: string;
  value: number;
}

export const fontSizes: FontSize[] = [
  { label: 'Small', value: 12 },
  { label: 'Medium', value: 14 },
  { label: 'Large', value: 16 },
];

interface FontSizeContextProps {
  fontSize: FontSize;
  setFontSize: (fontSize: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextProps | undefined>(undefined);

export const useFontSize = (): FontSizeContextProps => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};

export const FontSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<FontSize>(fontSizes[1]);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};
