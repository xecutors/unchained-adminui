import { XIcon } from '@heroicons/react/solid';
import { useIntl } from 'react-intl';

const HeaderDeleteButton = ({ onClick, text, Icon }) => {
  const { formatMessage } = useIntl();
  return (
    <button
      type="button"
      onClick={onClick}
      className="my-auto flex items-center justify-center rounded border border-red-400 px-3 py-2 text-sm font-semibold text-red-300 shadow-sm hover:border-red-800 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
    >
      <span className="pr-1">{Icon || <XIcon className="h-4 w-4" />}</span>
      {text ||
        formatMessage({
          id: 'order_delete',
          defaultMessage: 'Delete',
        })}
    </button>
  );
};

export default HeaderDeleteButton;
