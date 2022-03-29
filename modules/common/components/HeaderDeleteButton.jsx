import { XIcon } from '@heroicons/react/solid';
import { useIntl } from 'react-intl';

const HeaderDeleteButton = ({ onClick, text, Icon }) => {
  const { formatMessage } = useIntl();
  return (
    <button
      type="button"
      onClick={onClick}
      className="my-auto flex items-center justify-center rounded border-2 border-red-600 px-3 py-2 text-sm font-semibold text-red-600 shadow-sm hover:border-red-800 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
    >
      <span className="pr-1">{Icon || <XIcon className="h-5 w-5" />}</span>
      {text ||
        formatMessage({
          id: 'order_delete',
          defaultMessage: 'Delete',
        })}
    </button>
  );
};

export default HeaderDeleteButton;
