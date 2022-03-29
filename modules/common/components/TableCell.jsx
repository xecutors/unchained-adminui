import React from 'react';
import classNames from 'classnames';

const TableCell = ({ className = '', header = false, children, ...props }) => {
  const Td = header ? 'th' : 'td';
  return (
    <Td
      className={classNames(
        header
          ? 'px-4 py-3 text-left font-medium tracking-wider text-gray-800'
          : 'px-4 py-3 whitespace-nowrap',
        className,
      )}
      {...props}
    >
      {children}
    </Td>
  );
};

export default TableCell;
