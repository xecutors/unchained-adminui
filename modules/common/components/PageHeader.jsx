import { useIntl } from 'react-intl';

const PageHeader = ({ headerText, onEdit, onDelete, children }) => {
  const { formatMessage } = useIntl();
  return (
    <div className="my-2 md:flex md:items-center md:justify-between w-full">
      <div className="min-w-0 flex-1">
        {headerText && (
          <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 sm:truncate sm:text-3xl lg:text-4xl xl:text-5xl">
            {headerText}
          </h2>
        )}
      </div>
      <div className="flex flex-shrink-0 md:mt-0 md:ml-4">
        {onEdit && (
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-slate-300 bg-indigo-500 px-4 py-2 text-sm font-medium text-white dark shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          >
            {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
          </button>
        )}

        {onDelete && (
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {formatMessage({ id: 'delete', defaultMessage: 'Delete' })}
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
