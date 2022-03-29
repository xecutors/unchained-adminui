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
        'my-3 flex w-full flex-row flex-nowrap divide-y divide-gray-200 overflow-hidden shadow sm:rounded-lg sm:bg-white',
        className,
      )}
      {...props}
    >
      {rowsWithSort.header.length ? (
        <thead className="bg-gray-50 text-sm text-gray-700">
          {rowsWithSort.header}
        </thead>
      ) : (
        <NoData
          message={formatMessage({
            id: 'data',
            defaultMessage: 'Data',
          })}
        />
      )}
      {rowsWithSort.body.length ? (
        <tbody className="flex-1 divide-y divide-gray-200 bg-white sm:flex-none">
          {rowsWithSort.body}
        </tbody>
      ) : null}
      {rowsWithSort.footer.length ? <tfoot>{rowsWithSort.footer}</tfoot> : null}
    </table>
  );
};

Table.Row = Row;
Table.Cell = Cell;

export default Table;
