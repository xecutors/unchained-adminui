import React from 'react';
import classNames from 'classnames';

const TableCell = ({ className = '', header = false, children, ...props }) => {
  const Td = header ? 'th' : 'td';
  return (
    <Td
      className={classNames(
        header
          ? 'border-gray-light border p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider  min-h-[40px] max-h-[30px]'
          : 'border-gray-light border sm:p-3 px-6  whitespace-nowrap min-h-[40px] max-h-[30px]',
        className,
      )}
      {...props}
    >
      {children}
    </Td>
  );
};

export default TableCell;
