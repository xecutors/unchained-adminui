import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import useTheme from '../hooks/useTheme';

const ThemeToggle = () => {
  const [theme, setTheme] = useTheme();

  const handleToggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <div className="inline-flex items-center z-50">
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
              hidden: theme === 'dark',
            },
          )}
        />
        <MoonIcon
          className={classNames(
            'w-8 h-8 text-white transition-all ease-out delay-1000',
            {
              hidden: theme === 'light',
            },
          )}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
