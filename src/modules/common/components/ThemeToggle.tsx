import { MoonIcon, SunIcon, HeartIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import useTheme from '../hooks/useTheme';

const ThemeToggle = () => {
  const [theme, setTheme] = useTheme();

  const handleToggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('pink');
    } else {
      setTheme('light');
    }
  };

  const getThemeTitle = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark theme';
      case 'dark':
        return 'Switch to pink theme';
      case 'pink':
        return 'Switch to light theme';
      default:
        return 'Switch theme';
    }
  };

  return (
    <div className="inline-flex items-center z-50">
      <button
        type="button"
        className="hover:cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-slate-800 pink:focus:ring-pink-500 rounded-md p-1"
        id="theme-toggle"
        title={getThemeTitle()}
        aria-label={`Current theme: ${theme}`}
        aria-live="polite"
        onClick={handleToggleTheme}
      >
        <SunIcon
          className={classNames(
            'w-6 h-6 text-slate-600 transition-all ease-out duration-200',
            {
              hidden: theme !== 'light',
            },
          )}
        />
        <MoonIcon
          className={classNames(
            'w-6 h-6 text-yellow-200 transition-all ease-out duration-200',
            {
              hidden: theme !== 'dark',
            },
          )}
        />
        <HeartIcon
          className={classNames(
            'w-6 h-6 text-pink-500 transition-all ease-out duration-200',
            {
              hidden: theme !== 'pink',
            },
          )}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
