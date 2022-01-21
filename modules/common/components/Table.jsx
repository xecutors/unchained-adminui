import React, { useState } from 'react';

import classNames from 'classnames';
import Cell from './TableCell';
import Row from './TableRow';

const buildRows = (props) => {
  const header = [];
  const body = [];
  const footer = [];

  React.Children.forEach(props.children, (row) => {
    if (row.props.header) {
      header.push(row);
    } else if (row.props.footer) {
      footer.push(row);
    } else {
      body.push(row);
    }
  });

  return { header, footer, body };
};

const Table = ({ className, ...props }) => {
  const [rows] = useState(buildRows(props));

  const rowsWithSort = {
    ...rows,
    header: React.Children.map(rows.header, (c) => React.cloneElement(c)),
  };

  return (
    <table
      className={classNames(
        'w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5 divide-y divide-gray-200',
        className,
      )}
      {...props}
    >
      {rowsWithSort.header.length ? (
        <thead className="bg-white">{rowsWithSort.header}</thead>
      ) : null}
      {rowsWithSort.body.length ? (
        <tbody className="flex-1 sm:flex-none">{rowsWithSort.body}</tbody>
      ) : null}
      {rowsWithSort.footer.length ? <tfoot>{rowsWithSort.footer}</tfoot> : null}
    </table>
  );
};

Table.Row = Row;
Table.Cell = Cell;

export default Table;
