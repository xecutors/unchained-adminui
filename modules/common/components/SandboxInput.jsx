import { XCircleIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const isSafariBrowser = (userAgent) =>
  userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') <= -1;

const testConnection = async (url) => {
  const result = { error: null, connection: null, endpoint: url };
  try {
    if (typeof window !== 'undefined') {
      const newUrl = new URL(url);
      if (
        isSafariBrowser(window.navigator.userAgent) &&
        newUrl.protocol === 'http'
      ) {
        result.error = 'safari';
      } else {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              variables: {},
              query: `{ __typename  }
    `,
            }),
          });
          result.response = response;
        } catch (e) {
          result.error = e.message;
          result.response = { ok: false };
        }
      }
    }
  } catch (e) {
    result.error = e.message;
  }
  return result;
};

const SandboxInput = ({ handleOnBlur, endpoint }) => {
  const [connection, setConnectionState] = useState({});
  const [currentEndpoint, setCurrentEndpoint] = useState(endpoint);

  const { formatMessage } = useIntl();

  useEffect(() => {
    const testAndUpdateConnectionState = async () => {
      const result = await testConnection(currentEndpoint);
      setConnectionState(result);
    };
    testAndUpdateConnectionState();
  }, [currentEndpoint]);

  return (
    <div className="mx-2 sm:mx-8 md:mx-auto md:w-1/2">
      <div className="my-2 flex items-center rounded-md border border-slate-300 dark:border-slate-600 ">
        <label
          htmlFor="endpoint"
          className="inline-flex items-center rounded-l-md px-3 py-2 border-r border-slate-300 bg-slate-50 uppercase dark:bg-slate-900 font-bold text-slate-500 dark:text-white  dark:border-slate-600"
        >
          {formatMessage({ id: 'endpoint', defaultMessage: 'endpoint' })}
        </label>
        <div className="relative w-full">
          <input
            type="text"
            name="endpoint"
            id="endpoint"
            className="block w-full px-3 py-2 border-none rounded-r-md dark:bg-slate-800"
            placeholder="http://unchained-engine.xyz/graphql"
            value={currentEndpoint}
            onChange={(e) => setCurrentEndpoint(e.target.value)}
            onBlur={() => handleOnBlur(currentEndpoint)}
            autoComplete="off"
          />
          <span
            className={classNames(
              'absolute right-1 sm:right-4 top-3 w-4 h-4 rounded-full',
              {
                'bg-green-600': !connection.error,
                'bg-red-600': connection.error,
              },
            )}
          />
        </div>
      </div>
      {connection.error && (
        <div className="fixed bottom-0 right-0 z-[9999] bg-red-100 dark:bg-red-300 w-4/5 sm:w-96 border border-slate-300 m-2 rounded-md">
          <div className="p-4 relative">
            <div className="flex items-center gap-2">
              <XCircleIcon className="h-5 w-5 text-red-400" />
              <h3 className="text-lg font-medium text-red-800">
                {formatMessage(
                  {
                    id: 'unable_server',
                    defaultMessage: 'Unable to reach server at {endpoint}',
                  },
                  {
                    endpoint: connection.endpoint,
                  },
                )}
              </h3>
            </div>

            {connection.error === 'safari' ? (
              <>
                <p className="py-2 text-sm font-medium text-red-700">
                  {formatMessage({
                    id: 'safari_does_not_support',
                    defaultMessage:
                      'Safari does not support network requests from unchained admin on HTTPS to your local HTTP endpoint, so we cannot introspect your                endpoint.',
                  })}
                </p>
                <p className="text-sm font-medium text-red-700">
                  {formatMessage({
                    id: 'solutions',
                    defaultMessage: 'There are a couple solutions:',
                  })}
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-red-600">
                  <li>
                    <p>
                      {formatMessage({
                        id: 'different_browser',
                        defaultMessage:
                          'Visit this page from a browser that supports HTTPS requests to local HTTP endpoints, like Chrome or Firefox.',
                      })}
                    </p>
                  </li>
                  <li>
                    <p>
                      {formatMessage({
                        id: 'ssl_certificate',
                        defaultMessage:
                          'Set up an SSL certificate for your local endpoint.',
                      })}
                    </p>
                  </li>
                </ul>
              </>
            ) : (
              <div className="mt-2 space-y-2">
                <p className="text-sm font-medium text-red-700">
                  {connection?.error}
                </p>
                <p className="text-sm font-medium text-red-700">
                  {formatMessage({
                    id: 'failed_url',
                    defaultMessage: 'Please check url on the endpoint',
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SandboxInput;
