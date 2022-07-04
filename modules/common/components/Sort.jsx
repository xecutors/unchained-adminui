import {
  ChevronDownIcon,
  ChevronUpIcon,
  FilterIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const Sort = ({ sortFields }) => {
  const { formatMessage } = useIntl();
  const [show, setShow] = useState(false);
  const [sortReducer, setSortReducer] = useState({});
  const router = useRouter();

  const sortKeys =
    router.query?.sort?.split(',').map((field) => ({
      field: field.split('_')[0],
      direction: field.split('_')[1],
    })) || [];

  useEffect(() => {
    setSortReducer(
      sortKeys.reduce(
        (acc, curr) => ({ ...acc, [curr.field]: curr.direction }),
        {},
      ),
    );
  }, []);

  const handleOnClick = () => {
    const sort = Object.keys(sortReducer)
      .map((field) => [field, sortReducer[field]].join('_'))
      .join(',');

    router.push({
      query: {
        ...router.query,
        sort,
      },
    });
    setShow(!show);
  };

  return (
    <div className="ml-4 mt-2 w-max relative">
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="inline-flex items-center px-8 py-3 border-2 border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <FilterIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
        {formatMessage({ id: 'sort', defaultMessage: 'Sort' })}
      </button>

      {show && (
        <div className="z-50 absolute top-full left-1/4 transition-all w-56">
          <div className="border-2 flex flex-col bg-white dark:bg-slate-500 mt-2 rounded-md drop-shadow-md">
            <div className="flex flex-col">
              {Object.entries(sortFields).map(([field, label]) => (
                <button
                  key={field}
                  type="button"
                  onClick={() => {
                    // eslint-disable-next-line no-unused-expressions
                    sortReducer[field] === 'ASC'
                      ? setSortReducer({ ...sortReducer, [field]: 'DESC' })
                      : setSortReducer({ ...sortReducer, [field]: 'ASC' });
                  }}
                  className={classNames(
                    'py-2 px-3 w-full focus:bg-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-400 flex items-center gap-2',
                    {
                      'bg-indigo-300': sortReducer[field],
                    },
                  )}
                >
                  <span className="capitalize">{label}</span>
                  <span>
                    {sortReducer[field] === 'DESC' ? (
                      <ChevronDownIcon className="w-5 h-5 text-sky-600" />
                    ) : (
                      <ChevronUpIcon
                        className={classNames('w-5 h-5', {
                          'text-yellow-600': sortReducer[field] === 'ASC',
                        })}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleOnClick}
              className="m-2 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              {formatMessage({ id: 'sort_btn', defaultMessage: 'Sort' })}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
