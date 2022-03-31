import { TrashIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

const DeleteButton = ({
  onClick,
  className: classes = '',
  icon = null,
  textRight = '',
  textLeft = '',
} = {}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        'rounded-full bg-white px-1 py-1 text-sm text-red-500 hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2',
        classes,
      )}
    >
      {textLeft || ''}
      {icon || <TrashIcon className="h-5 w-5" />}
      {textRight || ''}
    </button>
  );
};

export default DeleteButton;
