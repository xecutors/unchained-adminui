import classnames from 'classnames';
import { bgColor, textColor } from '../data/miscellaneous';

const Badge = ({
  text,
  className: classes = '',
  dotted,
  color = 'green',
  square,
  onClick,
}) => {
  const normalizedColor = color?.trim();

  return (
    <span
      className={classnames(
        `inline-flex items-center px-3.5 text-sm font-sm ${bgColor(
          normalizedColor,
          100,
        )} ${textColor(normalizedColor, 800)}`,
        classes,
        {
          'rounded-full': !square,
          'rounded-md': square,
        },
      )}
    >
      {dotted && (
        <svg
          className={`-ml-1 mr-1.5 h-2 w-2 ${textColor(normalizedColor, 400)}`}
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
          className={`flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center ${textColor(
            normalizedColor,
            400,
          )} hover:${bgColor(
            normalizedColor,
            200,
          )} hover:text-${normalizedColor}-500 focus:outline-none focus:${bgColor(
            normalizedColor,
            500,
          )} focus:text-white`}
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
