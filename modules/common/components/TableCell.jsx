import React from 'react';
import classNames from 'classnames';

const TableCell = ({ className = '', header = false, children, ...props }) => {
  const Td = header ? 'th' : 'td';
  return (
    <Td
      className={classNames(
        header
          ? 'px-4 py-3 text-left font-medium tracking-wider text-slate-800 dark:text-white'
          : 'whitespace-nowrap px-4 py-3 bg-white sm:bg-inherit dark:bg-slate-600 text-slate-500 dark:text-white border-b last:border-b-0 sm:border-b-0',
        className,
      )}
      {...props}
    >
      <div>
        <div className="col-span-2 sm:hidden" />
        <div className="sm:inline">{children}</div>
      </div>
    </Td>
  );
};

export default TableCell;
