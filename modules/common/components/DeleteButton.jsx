import classNames from 'classnames';
// import { classNames } from '../utils/utils';

const DeleteButton = ({
  onClick,
  className = '',
  icon = null,
  textRight = '',
  textLeft = '',
} = {}) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={classNames(
          'items-center px-1 py-1 text-sm rounded-full text-red-500 bg-white border-red-500 hover:text-white focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-red-500',
          className,
        )}
      >
        {textLeft || ''}
        {icon || (
          <svg
            className="h-5 w-5 text-white-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {' '}
            <polyline points="3 6 5 6 21 6" />{' '}
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{' '}
            <line x1="10" y1="11" x2="10" y2="17" />{' '}
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        )}
        {textRight || ''}
      </button>
    </>
  );
};

export default DeleteButton;
