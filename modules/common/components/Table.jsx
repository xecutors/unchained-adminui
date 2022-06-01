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

  return rowsWithSort.header.length || rowsWithSort.body.length ? (
    <table
      className={classNames(
        'my-3 flex w-full flex-row flex-nowrap divide-y divide-slate-200 overflow-hidden shadow sm:rounded-lg dark:rounded-none dark:border sm:bg-white dark:bg-slate-600',
        className,
      )}
      {...props}
    >
      <thead className="bg-slate-50 dark:bg-slate-500 text-sm text-slate-700 dark:text-white">
        {rowsWithSort.header}
      </thead>

      {rowsWithSort.body.length ? (
        <tbody className="flex-1 divide-y divide-slate-200 bg-white dark:bg-slate-600 sm:flex-none">
          {rowsWithSort.body}
        </tbody>
      ) : null}
      {rowsWithSort.footer.length ? <tfoot>{rowsWithSort.footer}</tfoot> : null}
    </table>
  ) : (
    <NoData
      message={formatMessage({
        id: 'data',
        defaultMessage: 'Data',
      })}
      className="border border-slate-300 rounded-lg drop-shadow dark:drop-shadow-none dark:shadow-sm dark:shadow-white"
    />
  );
};

Table.Row = Row;
Table.Cell = Cell;

export default Table;
