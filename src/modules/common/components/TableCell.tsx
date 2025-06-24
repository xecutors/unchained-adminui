import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import { getSortKeys, normalizeQuery } from '../utils/utils';

const getNextSortDirection = (direction) => {
  if (!direction) return 'ASC';
  if (direction === 'ASC') return 'DESC';
  return null;
};

const SortButton = ({ onSort, sortDirection }) => {
  if (!sortDirection)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="mr-2 w-6 h-6"
        onClick={onSort}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
        />
      </svg>
    );

  return sortDirection === 'ASC' ? (
    <ChevronUpIcon className="mr-2 w-6 h-6 text-slate-900" onClick={onSort} />
  ) : (
    <ChevronDownIcon className="mr-2 w-6 h-6 text-slate-900" onClick={onSort} />
  );
};

const TableCell = ({
  className = '',
  header = false,
  enablesort = false,
  children,
  sortKey = null,
  defaultSortDirection = null,
  ...props
}) => {
  const router = useRouter();
  const sortKeys = getSortKeys(router.query?.sort);

  const onSort = (event) => {
    event.preventDefault();
    const next = getNextSortDirection(sortKeys[sortKey]);

    let newSortKeys;
    if (!next && sortKeys[sortKey]) {
      delete sortKeys[sortKey];
      newSortKeys = sortKeys;
    } else {
      newSortKeys = {
        ...sortKeys,
        [sortKey]: sortKeys[sortKey] === 'ASC' ? 'DESC' : 'ASC',
      };
    }

    const sort = Object.entries(newSortKeys)
      .map(([key, value]) => [key, value].join('_'))
      .join(',');

    const { sort: currentSort, ...rest } = router.query;

    const newRest = Object.keys(rest)
      .map((key) => [key, rest[key]].join('='))
      .join('&');

    const newURL =
      Object.keys(rest).length === 0
        ? `${router.basePath}?sort=${sort}`
        : `${router.basePath}?${newRest}&sort=${sort}`;

    if (sort) router.push(newURL);
    else
      router.push({
        query: normalizeQuery(rest),
      });
  };

  const Td = header ? 'th' : 'td';
  return (
    <Td
      className={classNames(
        header
          ? 'px-4 py-3 text-left text-slate-500 dark:text-slate-200'
          : 'whitespace-nowrap px-4 py-3 text-slate-500 dark:text-slate-200 border-b dark:border-slate-700 last:border-b-0 sm:border-b-0 text-left flex items-center sm:table-cell',
        className,
      )}
      {...props}
    >
      <div className="flex">
        {Td === 'th' && enablesort && sortKey && (
          <SortButton
            onSort={onSort}
            sortDirection={
              Object.keys(sortKeys).length
                ? sortKeys[sortKey]
                : defaultSortDirection
            }
          />
        )}

        <div className="sm:inline w-full">{children}</div>
      </div>
    </Td>
  );
};

export default TableCell;
