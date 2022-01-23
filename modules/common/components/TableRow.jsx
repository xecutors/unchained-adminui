import React from 'react';
import classNames from 'classnames';

const TableRow = ({
  className = '',
  children = [],
  header = false,
  ...props
}) => {
  const clone = (cell) => React.cloneElement(cell, { header });
  const cells = React.Children.map(children, clone, {});

  return (
    <tr
      className={classNames(
        'flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none  sm:mb-0',
        className,
      )}
      {...props}
    >
      {cells}
    </tr>
  );
};

export default TableRow;
