import { createContext, useEffect, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const ThemeContext = createContext({});
const ThemeWrapper = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    // Remove all theme classes first
    html.classList.remove('dark', 'pink');
    
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      html.classList.add('dark');
    } else if (localStorage.theme === 'pink') {
      html.classList.add('pink');
    }
    // For 'light' theme, no class is needed (default)
  }, []);

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    // Remove all theme classes first
    html.classList.remove('dark', 'pink');
    
    if (theme === 'dark') {
      html.classList.add('dark');
      localStorage.theme = 'dark';
    } else if (theme === 'pink') {
      html.classList.add('pink');
      localStorage.theme = 'pink';
    } else {
      localStorage.theme = 'light';
    }
  }, [theme]);

  const themeValue = useMemo(() => [theme, setTheme], [theme, setTheme]);

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

export default ThemeWrapper;
