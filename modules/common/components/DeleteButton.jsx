import { TrashIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
// import { classNames } from '../utils/utils';

const DeleteButton = ({
  onClick,
  className: classes = '',
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
          'items-center rounded-full border-red-500 bg-white px-1 py-1 text-sm text-red-500 hover:bg-red-400 hover:text-white  focus:outline-none focus:ring-0 focus:ring-red-500  focus:ring-offset-2',
          classes,
        )}
      >
        {textLeft || ''}
        {icon || <TrashIcon className="text-white-500 h-5 w-5" />}
        {textRight || ''}
      </button>
    </>
  );
};

export default DeleteButton;
