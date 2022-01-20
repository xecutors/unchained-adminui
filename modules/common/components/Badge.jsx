import classNames from 'classnames';

const Badge = ({
  text,
  className,
  dotted,
  color = 'green',
  square,
  onClick,
}) => {
  const normalizedColor = color?.trim();
  return (
    <span
      className={classNames(
        `inline-flex items-center px-2.5 py-0.5  text-sm font-medium  bg-${normalizedColor}-100 text-${normalizedColor}-800`,
        className,
        {
          'rounded-full': !square,
          'rounded-md': square,
        },
      )}
    >
      {dotted && (
        <svg
          className={`-ml-1 mr-1.5 h-2 w-2 text-${normalizedColor}-400`}
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle cx="4" cy="4" r="3" />
        </svg>
      )}
      {text}
      {onClick && (
        <button
          type="button"
          onClick={onClick}
          className={`flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-${normalizedColor}-400 hover:bg-${normalizedColor}-200 hover:text-${normalizedColor}-500 focus:outline-none focus:bg-${normalizedColor}-500 focus:text-white`}
        >
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Badge;
