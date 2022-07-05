import React from 'react';
import classNames from 'classnames';

const TableCell = ({ className = '', header = false, children, ...props }) => {
  const Td = header ? 'th' : 'td';
  return (
    <Td
      className={classNames(
        header
          ? 'px-4 py-3 text-left font-medium tracking-wider text-slate-800 dark:text-slate-200'
          : 'whitespace-nowrap px-4 py-3 text-slate-500 dark:text-slate-200',
        className,
      )}
      {...props}
    >
      <div className="grid grid-cols-6 items-center gap-4 sm:inline">
        <div className="col-span-2 sm:hidden">{}</div>
        <div className="sm:inline">{children}</div>
      </div>
    </Td>
  );
};

export default TableCell;
