import classNames from 'classnames';

const Button = ({ text, onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        '-ml-px relative inline-flex items-center space-x-2 px-2 py-1 border border-indigo-500 text-sm font-medium rounded-r-md bg-indigo-500 text-white bg-white-300 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:border-indigo-500',
        className,
      )}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
