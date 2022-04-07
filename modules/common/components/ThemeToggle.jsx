import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.getElementsByTagName('html')[0].classList.add('dark');
      setIsDark(true);
    } else {
      document.getElementsByTagName('html')[0].classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.getElementsByTagName('html')[0].classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.getElementsByTagName('html')[0].classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [theme]);

  const handleToggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      setIsDark(false);
    } else {
      setTheme('dark');
      setIsDark(true);
    }
  };

  return (
    <div className="absolute top-7 right-6 sm:right-8 md:right-10 flex items-center">
      <button
        type="button"
        className="hover:cursor-pointer"
        id="theme-toggle"
        title="Toggles light & dark"
        aria-label="auto"
        aria-live="polite"
        onClick={handleToggleTheme}
      >
        <SunIcon
          className={classNames(
            'w-8 h-8 text-slate-900 transition-all ease-out delay-1000',
            {
              hidden: isDark,
            },
          )}
        />
        <MoonIcon
          className={classNames(
            'w-8 h-8 text-white transition-all ease-out delay-1000',
            {
              hidden: !isDark,
            },
          )}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
