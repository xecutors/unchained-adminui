import { PlusSmIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useIntl } from 'react-intl';

const AddButton = ({ path, text }) => {
  const { formatMessage } = useIntl();
  return (
    <Link href={path}>
      <a
        type="button"
        className="relative inline-flex items-center rounded border border-transparent bg-indigo-500 px-3 py-3 text-sm font-medium  text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <PlusSmIcon className="h-5 w-5" />
        <span className="ml-2">
          {text || formatMessage({ id: 'add', defaultMessage: 'Add' })}
        </span>
      </a>
    </Link>
  );
};

export default AddButton;
