import { XMarkIcon } from '@heroicons/react/24/solid';
import { useIntl } from 'react-intl';

const HeaderDeleteButton = ({ onClick, text = null, Icon = null }) => {
  const { formatMessage } = useIntl();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-describedby="header-delete-button"
      className="my-auto flex items-center justify-center rounded-sm border-2 border-rose-500 px-3 py-2 text-sm font-semibold text-rose-600 shadow-xs hover:border-rose-600 hover:bg-rose-600 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
    >
      <span className="pr-1">{Icon || <XMarkIcon className="h-5 w-5" />}</span>
      {text ||
        formatMessage({
          id: 'delete',
          defaultMessage: 'Delete',
        })}
    </button>
  );
};

export default HeaderDeleteButton;
