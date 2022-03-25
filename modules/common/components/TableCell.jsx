import React from 'react';
import classNames from 'classnames';

const TableCell = ({ className = '', header = false, children, ...props }) => {
  const Td = header ? 'th' : 'td';
  return (
    <Td
      className={classNames(
        header
          ? 'px-4 py-3 text-left font-medium tracking-wider text-gray-800'
          : 'max-h-[30px] min-h-[40px] px-4 py-3',
        className,
      )}
      {...props}
    >
      {children}
    </Td>
  );
};

export default TableCell;
