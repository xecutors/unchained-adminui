import { ArrowDownIcon } from '@heroicons/react/outline';
import { useIntl } from 'react-intl';

const SyncChangeIcon = ({ new: added, removed, diff }) => {
  const { formatMessage } = useIntl();

  if (added < removed) {
    return (
      <div className="inline-flex items-baseline rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 md:mt-2 lg:mt-0">
        <ArrowDownIcon
          className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        />
        <span className="sr-only">
          {formatMessage({
            id: 'decreased',
            defaultMessage: 'Decreased by',
          })}
        </span>
        {diff}
      </div>
    );
  }
  if (added > removed) {
    return (
      <div className="inline-flex items-baseline rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 md:mt-2 lg:mt-0">
        <svg
          className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">
          {formatMessage({
            id: 'decreased_by',
            defaultMessage: 'Increased by',
          })}
        </span>
        {diff}
      </div>
    );
  }
  return (
    <div className="inline-flex items-baseline rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 md:mt-2 lg:mt-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-gray-800"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span className="sr-only">
        {formatMessage({
          id: 'increased_by',
          defaultMessage: 'Increased by',
        })}
      </span>
      {diff}
    </div>
  );
};

export default SyncChangeIcon;
