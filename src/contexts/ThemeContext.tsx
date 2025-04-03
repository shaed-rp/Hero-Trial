'use client';

import { createContext, useContext, useEffect } from 'react';

interface ThemeContextType {
  brandColor: string;
}

const ThemeContext = createContext<ThemeContextType>({ brandColor: '' });

export function ThemeProvider({
  children,
  brandColor,
}: {
  children: React.ReactNode;
  brandColor: string;
}) {
  useEffect(() => {
    document.documentElement.style.setProperty('--brand-color', brandColor);
  }, [brandColor]);

  return (
    <ThemeContext.Provider value={{ brandColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
