import Head from 'next/head';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { PlusIcon } from '@heroicons/react/24/outline';

const PageHeader = ({
  headerText = null,
  onEdit = null,
  onDelete = null,
  children = null,
  title = null,
  addPath = null,
  addButtonText = null,
}) => {
  const { formatMessage } = useIntl();
  return (
    <>
      <Head>
        <title>Unchained Copilot - {title || headerText} </title>
      </Head>
      <div className="flex gap-3 flex-wrap items-center justify-between">
        <div className="flex items-center justify-between w-full gap-4">
          {headerText && (
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-200 sm:truncate sm:text-3xl lg:text-4xl xl:text-5xl">
              {headerText}
            </h2>
          )}
          {addPath && (
            <Link
              href={addPath}
              className="relative inline-flex items-center rounded-sm border border-transparent bg-slate-800 dark:bg-slate-600 px-3 py-3 text-sm font-medium text-white shadow-xs hover:bg-slate-950 dark:hover:bg-slate-500 focus:outline-hidden focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:ring-offset-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span className="ml-2">
                {addButtonText ||
                  formatMessage({ id: 'add', defaultMessage: 'Add' })}
              </span>
            </Link>
          )}
          {onEdit && (
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-slate-300 dark:border-slate-600 bg-slate-800 dark:bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:shadow-xl hover:bg-slate-950 dark:hover:bg-slate-500 focus:outline-hidden focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:ring-offset-2"
              onClick={onEdit}
            >
              {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              className="inline-flex items-center rounded-md border-2 border-rose-100 dark:border-rose-400 px-4 py-2 text-sm font-medium text-rose-400 hover:text-white shadow-xs hover:shadow-xl hover:bg-rose-600 dark:hover:bg-rose-600 focus:outline-hidden focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 focus:ring-offset-2"
              onClick={onDelete}
            >
              {formatMessage({ id: 'delete', defaultMessage: 'Delete' })}
            </button>
          )}
          {children}
        </div>
      </div>
    </>
  );
};

export default PageHeader;
