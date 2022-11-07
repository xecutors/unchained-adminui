import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import { getSortKeys, normalizeQuery } from '../utils/utils';

const SortButton = ({ onSort, sortDirection }) => {
  return sortDirection === 'ASC' ? (
    <ChevronUpIcon className="mr-2 w-6 h-6" onClick={onSort} />
  ) : (
    <ChevronDownIcon className="mr-2 w-6 h-6" onClick={onSort} />
  );
};

const TableCell = ({
  className = '',
  header = false,
  children,
  name,
  index,
  ...props
}) => {
  const router = useRouter();
  const sortKeys = getSortKeys(router.query?.sort);

  const onSort = (event) => {
    event.preventDefault();
    const sort = Object.entries({
      ...sortKeys,
      [name]: sortKeys[name] === 'ASC' ? 'DESC' : 'ASC',
    })
      .map(([key, value]) => [key, value].join('_'))
      .join(',');

    const { sort: currentSort, ...rest } = router.query;

    const newRest = Object.keys(rest)
      .map((key) => [key, rest[key]].join('='))
      .join('&');

    const newURL =
      rest === {}
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
          ? 'px-4 py-3 text-left font-medium tracking-wider text-slate-800 dark:text-slate-200'
          : 'whitespace-nowrap px-4 py-3 text-slate-500 dark:text-slate-200 border-b last:border-b-0 sm:border-b-0 text-left',
        className,
      )}
      {...props}
    >
      <div className="flex">
        {Td === 'th' && name && (
          <SortButton onSort={onSort} sortDirection={sortKeys[name] || 'ASC'} />
        )}

        <div className="sm:inline">{children}</div>
      </div>
    </Td>
  );
};

export default TableCell;
