import classnames from 'classnames';

const Button = ({ text, onClick, className, disabled = false, id }) => {
  return (
    <button
      id={id}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={classnames(
        'inline-flex items-center rounded-md border border-transparent bg-indigo-500 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2  px-3 py-3',
        className,
      )}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
