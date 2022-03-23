import classNames from 'classnames';

const Button = ({ text, onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        'bg-white-300 relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-indigo-500 bg-indigo-500 px-2 py-1 text-sm font-medium text-white hover:bg-indigo-700 focus:border-indigo-500 focus:outline-none focus:ring-0 focus:ring-indigo-500',
        className,
      )}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
