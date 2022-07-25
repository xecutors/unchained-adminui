import {
  ChevronDownIcon,
  ChevronUpIcon,
  SortDescendingIcon,
} from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { stopPropagation } from '../data/miscellaneous';
import { reducerToObject } from '../utils/utils';

const Sort = ({ sortFields, className }) => {
  const { formatMessage } = useIntl();
  const [show, setShow] = useState(false);
  const [sortReducer, setSortReducer] = useState({});
  const router = useRouter();

  const sortKeys = useMemo(() => {
    return (router.query?.sort?.split(',') || []).map((field) => ({
      field: field.split('_')[0],
      direction: field.split('_')[1],
    }));
  }, [router.query?.sort]);

  const handleOnClick = () => {
    const sort = Object.keys(sortReducer)
      .map((field) => [field, sortReducer[field]].join('_'))
      .join(',');
    const { sort: currentSort, ...rest } = router.query;
    if (sort)
      router.push({
        query: {
          ...rest,
          sort,
        },
      });
    else
      router.push({
        query: {
          ...rest,
        },
      });
    setShow(false);
  };

  useEffect(() => {
    setSortReducer(reducerToObject(sortKeys));
  }, [sortKeys]);

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
        className="relative inline-flex items-center px-1 py-1 border-2 border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="flex items-center gap-2">
          <SortDescendingIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        {Object.keys(sortReducer).length !== 0 && (
          <span className="absolute top-0 right-0 border inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-indigo-600 px-2 py-1 text-base leading-none text-white border-300">
            {Object.keys(sortReducer).length}
          </span>
        )}
      </button>

      {show && (
        <div className="z-50 absolute top-full left-1/4 transition-all w-56">
          <div className="border-2 p-5 flex flex-col bg-white dark:bg-slate-800 mt-2 rounded-md drop-shadow-md relative">
            <button
              type="button"
              onClick={() => {
                setShow(false);
                setSortReducer(reducerToObject(sortKeys));
              }}
              className="absolute top-0 right-0 inline-flex items-center justify-center hover:bg-red-300 p-1 rounded"
            >
              <XIcon className="h-5 w-5 text-red-400" />
            </button>
            <div className="flex flex-col">
              {Object.entries(sortFields).map(([field, label]) => (
                <button
                  key={field}
                  type="button"
                  onClick={() => {
                    setSortReducer({
                      ...sortReducer,
                      [field]: sortReducer[field] === 'ASC' ? 'DESC' : 'ASC',
                    });
                  }}
                  className={classNames(
                    'py-2 px-3 w-full rounded-sm hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center gap-2 justify-between',
                    {
                      'text-indigo-600 dark:text-sky-400 bg-slate-50 dark:bg-slate-600':
                        sortReducer[field],
                    },
                  )}
                >
                  <span className="capitalize">{label}</span>
                  <div className="flex">
                    {sortReducer[field] && (
                      <span className="mr-2">
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
                    )}
                    {sortReducer[field] && (
                      <button
                        type="button"
                        className="rounded-full hover:bg-red-200"
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
                  </div>
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
