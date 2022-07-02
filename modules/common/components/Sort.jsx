import { ChevronDownIcon, FilterIcon } from '@heroicons/react/outline';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useIntl } from 'react-intl';

const Sort = ({ header }) => {
  const { formatMessage } = useIntl();
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleOnClick = (sortKey) => {
    router.push({
      query: {
        ...router.query,
        sortKey,
        sortDirection:
          !router.query.sortDirection || router.query.sortDirection === 'ASC'
            ? 'DESC'
            : 'ASC',
      },
    });
    setShow(!show);
  };

  return (
    <div className="ml-4 mt-2 flex-shrink-0 relative">
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="inline-flex items-center px-8 py-3 border-2 border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <FilterIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
        {formatMessage({ id: 'sort', defaultMessage: 'Sort' })}
      </button>

      {show && (
        <div className="z-50 absolute top-full left-1/4 transition-all w-48">
          <div className="border-2 flex flex-col bg-white mt-2 rounded-md drop-shadow-md">
            {Object.entries(header).map(([field, label]) => (
              <button
                key={field}
                type="button"
                onClick={() => handleOnClick(field)}
                className="py-2 px-3 w-full hover:bg-slate-100 flex items-center gap-2"
              >
                <span className="capitalize">{label}</span>
                <span>
                  {router.query?.sortKey === field &&
                  router.query?.sortDirection === 'ASC' ? (
                    <ChevronDownIcon className="w-5 h-5" />
                  ) : (
                    <ChevronUpIcon className="w-5 h-5" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
