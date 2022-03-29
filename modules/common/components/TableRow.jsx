import React from 'react';
import classNames from 'classnames';

const TableRow = ({
  className = '',
  children = [],
  header = false,
  ...props
}) => {
  const clone = (cell) => React?.cloneElement(cell || <></>, { header });
  const cells = React.Children.map(children, clone, {});

  return (
    <tr
      className={classNames(
        'flex-nowrap flex flex-col sm:mb-0 sm:table-row sm:rounded-none',
        className,
      )}
      {...props}
    >
      {cells}
    </tr>
  );
};

export default TableRow;
