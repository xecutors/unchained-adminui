import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useIntl } from 'react-intl';
import Cell from './TableCell';
import Row from './TableRow';
import NoData from './NoData';

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
  const [rows, setRows] = useState(buildRows(props));
  const { formatMessage } = useIntl();

  const rowsWithSort = {
    ...rows,
    header: React.Children.map(rows.header, (c) => React.cloneElement(c)),
  };

  useEffect(() => {
    setRows(buildRows(props));
  }, [props.children]);

  return (
    <table
      className={classNames(
        'my-3 shadow w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden divide-y divide-gray-200',
        className,
      )}
      {...props}
    >
      {rowsWithSort.header.length ? (
        <thead className="bg-white">{rowsWithSort.header}</thead>
      ) : (
        <NoData
          message={formatMessage({
            id: 'data',
            defaultMessage: 'Data',
          })}
        />
      )}
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
