import classnames from 'classnames';

const Button = ({
  text,
  onClick,
  className = '',
  disabled = false,
  id = '',
  variant = 'primary',
}) => {
  const baseClasses = 'inline-flex items-center rounded-md text-sm font-medium leading-4 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-offset-2 px-3 py-3';
  
  const variantClasses = {
    primary: 'border border-transparent bg-slate-800 dark:bg-slate-600 text-white hover:bg-slate-950 dark:hover:bg-slate-500 focus:ring-slate-800 dark:focus:ring-slate-400',
    secondary: 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 focus:ring-slate-500'
  };

  return (
    <button
      id={id}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={classnames(
        baseClasses,
        variantClasses[variant],
        className,
      )}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
