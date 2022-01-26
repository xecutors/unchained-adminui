import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import logOut from '../../accounts/hooks/logOut';
import { initializeApollo } from '../../apollo/apolloClient';

const PageHeader = ({ headerText, onEdit, onDelete }) => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const onLogout = async () => {
    const apollo = initializeApollo(null);
    await logOut(apollo);
    router.push('/log-in');
  };
  return (
    <div className=" md:flex md:items-center md:justify-between mb-1">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {headerText}
        </h2>
      </div>
      <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
        {onEdit && (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
          </button>
        )}

        {onDelete && (
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {formatMessage({ id: 'delete', defaultMessage: 'Delete' })}
          </button>
        )}
        <button
          type="button"
          onClick={onLogout}
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {formatMessage({ id: 'log_out', defaultMessage: 'Log Out' })}
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
