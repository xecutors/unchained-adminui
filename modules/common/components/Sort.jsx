import {
  ChevronDownIcon,
  ChevronUpIcon,
  FilterIcon,
} from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { stopPropagation } from '../data/miscellaneous';
import { reducerToObject } from '../utils/utils';

const Sort = ({ sortFields, className }) => {
  const { formatMessage } = useIntl();
  const [show, setShow] = useState(false);
  const [sortReducer, setSortReducer] = useState({});
  const router = useRouter();

  const sortKeys =
    router.query?.sort?.split(',').map((field) => ({
      field: field.split('_')[0],
      direction: field.split('_')[1],
    })) || [];

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
    setShow(false);
  };

  useEffect(() => {
    setSortReducer(reducerToObject(sortKeys));
  }, []);

  return (
    <div className={classNames('ml-4 mt-2 w-max relative', className)}>
      <button
        type="button"
        onClick={() => {
          if (!show) {
            setShow(true);
          } else {
            setShow(false);
            setSortReducer(reducerToObject(sortKeys));
          }
        }}
        className="relative inline-flex items-center px-8 py-3 border-2 border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <FilterIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
        <span>{formatMessage({ id: 'sort', defaultMessage: 'Sort' })}</span>
        {Object.keys(sortReducer).length !== 0 && (
          <span className="absolute top-0 right-0 border inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-indigo-600 px-2 py-1 text-base leading-none text-white border-300">
            {Object.keys(sortReducer).length}
          </span>
        )}
      </button>

      {show && (
        <div className="z-50 absolute top-full left-1/4 transition-all w-56">
          <div className="border-2 p-4 flex flex-col bg-white dark:bg-slate-500 mt-2 rounded-md drop-shadow-md relative">
            <button
              type="button"
              onClick={() => {
                setShow(false);
                setSortReducer(reducerToObject(sortKeys));
              }}
              className="absolute top-0 right-0 inline-flex items-center justify-center hover:bg-red-300 px-1 py-1 rounded"
            >
              <XIcon className="h-5 w-5 text-red-400" />
            </button>
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
                    'py-2 px-3 w-full hover:bg-slate-100 dark:hover:bg-slate-400 flex items-center gap-2',
                    {
                      'text-indigo-600 dark:text-sky-400 bg-slate-50 dark:bg-slate-600':
                        sortReducer[field],
                    },
                  )}
                >
                  <span className="capitalize">{label}</span>
                  <span>
                    {sortReducer[field] === 'DESC' ? (
                      <ChevronDownIcon
                        className={classNames('w-5 h-5', {
                          'text-yellow-600': sortReducer[field] === 'DESC',
                        })}
                      />
                    ) : (
                      <ChevronUpIcon
                        className={classNames('w-5 h-5', {
                          'text-indigo-600 dark:text-sky-400':
                            sortReducer[field] === 'ASC',
                        })}
                      />
                    )}
                  </span>
                  {sortReducer[field] && (
                    <button
                      type="button"
                      className="ml-auto rounded-full hover:bg-red-200"
                      onClick={(e) => {
                        stopPropagation(e);
                        setSortReducer((current) => {
                          const copy = { ...current };
                          delete copy[field];
                          return copy;
                        });
                      }}
                    >
                      <XIcon className="w-5 h-5 text-red-400 " />
                    </button>
                  )}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleOnClick}
              className="mt-2 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
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
