import { useIntl } from 'react-intl';

const SyncChangeIcon = ({ new: added, removed, diff }) => {
  const { formatMessage } = useIntl();

  if (added < removed) {
    return (
      <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 md:mt-2 lg:mt-0">
        <svg
          className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
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
      <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
        <svg
          className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
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
    <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 md:mt-2 lg:mt-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-gray-800"
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
