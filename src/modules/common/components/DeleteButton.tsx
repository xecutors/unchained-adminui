import { TrashIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

const DeleteButton = ({
  onClick,
  className: classes = '',
  icon = null,
  textRight = '',
  textLeft = '',
  ariaLabel = '',
}) => {
  const { formatMessage } = useIntl();
  return (
    <button
      aria-label={
        ariaLabel || formatMessage({ id: 'delete', defaultMessage: 'Delete' })
      }
      id="delete_button"
      type="button"
      onClick={onClick}
      className={classNames(
        'rounded-full bg-white dark:bg-slate-800 px-1 py-1 text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-200 focus:outline-hidden focus:ring-1 focus:ring-red-500 focus:ring-offset-2',
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
