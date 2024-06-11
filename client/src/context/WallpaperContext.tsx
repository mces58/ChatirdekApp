import React, { createContext, ReactNode, useContext, useState } from 'react';

import { Colors } from 'src/constants/color/colors';

export interface Wallpaper {
  color: string;
}

export const walpaperColors: string[] = [
  '#F6F6F6',
  '#6874e7',
  '#b8304f',
  '#758E4F',
  '#fa3741',
  '#F26419',
  '#F6AE2D',
  '#DFAEB4',
  '#7A93AC',
  '#33658A',
  '#3d2b56',
  '#42273B',
  '#171A21',
];

interface WallpaperContextProps {
  wallpaper: Wallpaper;
  setWallpaper: (wallpaper: Wallpaper) => void;
}

const defaultWallpaper: Wallpaper = {
  color: Colors.primaryColors.light,
};

const WallpaperContext = createContext<WallpaperContextProps | undefined>(undefined);

export const useWallpaper = (): WallpaperContextProps => {
  const context = useContext(WallpaperContext);
  if (!context) {
    throw new Error('useWallpaper must be used within a WallpaperProvider');
  }
  return context;
};

export const WallpaperProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallpaper, setWallpaper] = useState<Wallpaper>(defaultWallpaper);

  return (
    <WallpaperContext.Provider value={{ wallpaper, setWallpaper }}>
      {children}
    </WallpaperContext.Provider>
  );
};
