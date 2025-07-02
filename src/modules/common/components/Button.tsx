import classnames from 'classnames';
import { sortTailwindClasses } from '../utils/classOrder';

const Button = ({
  text,
  onClick,
  className = '',
  disabled = false,
  id = '',
  variant = 'primary',
}) => {
  const baseClasses = sortTailwindClasses(
    'inline-flex items-center h-[38px] px-6 py-2 text-sm font-medium leading-5 rounded-md shadow-md focus:outline-hidden focus:ring-2 focus:ring-offset-2'
  );

  const variantClasses = {
    primary: sortTailwindClasses(
      'border border-slate-800 bg-slate-800 text-white shadow-md focus:ring-slate-800 dark:border-slate-600 dark:bg-slate-600 dark:focus:ring-slate-400 pink:border-pink-600 pink:bg-pink-600 pink:focus:ring-pink-500 hover:bg-slate-950 dark:hover:bg-slate-500 pink:hover:bg-pink-700'
    ),
    secondary: sortTailwindClasses(
      'border border-slate-600 bg-white text-slate-700 focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 pink:border-pink-500 pink:bg-pink-50 pink:text-pink-700 pink:focus:ring-pink-400 hover:bg-slate-50 dark:hover:bg-slate-700 pink:hover:bg-pink-100'
    ),
    tertiary: sortTailwindClasses(
      'border border-slate-300 bg-white text-slate-700 shadow-xs focus:ring-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 pink:border-pink-300 pink:bg-pink-50 pink:text-pink-700 pink:focus:ring-pink-400 hover:bg-slate-50 dark:hover:bg-slate-700 pink:hover:bg-pink-100'
    ),
    quaternary: sortTailwindClasses(
      'bg-white text-slate-700 focus:ring-2 dark:bg-slate-800 dark:text-slate-200 pink:bg-pink-50 pink:text-pink-700 pink:focus:ring-pink-400 hover:bg-slate-50 dark:hover:bg-slate-700 pink:hover:bg-pink-100'
    ),
  };

  return (
    <button
      id={id}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={classnames(baseClasses, variantClasses[variant], className)}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
