import React from 'react';
import classNames from 'classnames';

const TableCell = ({ className = '', header = false, children, ...props }) => {
  const Td = header ? 'th' : 'td';
  return (
    <Td
      className={classNames(
        header
          ? 'border-gray-light max-h-[30px] min-h-[40px] border p-3 pl-4 text-left text-xs font-medium uppercase  tracking-wider text-gray-500'
          : 'border-gray-light max-h-[30px] min-h-[40px] border px-6 sm:p-3',
        className,
      )}
      {...props}
    >
      {children}
    </Td>
  );
};

export default TableCell;
