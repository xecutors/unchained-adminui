import React from 'react';
import classNames from 'classnames';

const TableCell = ({ className = '', header = false, children, ...props }) => {
  const Td = header ? 'th' : 'td';
  return (
    <Td
      className={classNames(
        header === 'th'
          ? 'p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          : 'border-grey-light border p-3 px-6 py-4 whitespace-nowrap',
        className,
      )}
      {...props}
    >
      {children}
    </Td>
  );
};

export default TableCell;
