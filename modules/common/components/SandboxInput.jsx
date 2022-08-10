import classNames from 'classnames';
import { useIntl } from 'react-intl';

const SandboxInput = ({ endpoint, handleOnBlur, connection }) => {
  const { formatMessage } = useIntl();
  return (
    <div className="mx-4">
      <div className="relative w-1/2">
        <div className="my-2 flex items-center rounded-md border border-slate-300 dark:border-slate-600">
          <label
            htmlFor="endpoint"
            className="inline-flex items-center rounded-l-md px-3 py-2 border-r border-slate-300 bg-slate-50 uppercase dark:bg-slate-900 font-bold text-slate-500 dark:text-white  dark:border-slate-600"
          >
            {formatMessage({ id: 'endpoint', defaultMessage: 'endpoint' })}
          </label>
          <div className="w-full relative">
            <input
              type="text"
              name="endpoint"
              id="endpoint"
              className="block w-full px-3 py-2 border-none rounded-r-md dark:bg-slate-800"
              placeholder="http://localhost:4010/graphql"
              defaultValue={endpoint}
              onBlur={handleOnBlur}
              autoComplete="off"
            />
            <span
              className={classNames(
                'absolute right-4 top-3 w-4 h-4 rounded-full',
                {
                  'bg-green-600': connection.status,
                  'bg-red-600': !connection.status,
                },
              )}
            />
          </div>
        </div>
        {connection.error && (
          <div className="absolute top-0 left-full w-96 border border-slate-300 mx-2 rounded-md">
            <div>
              <p>Unable to reach server</p>
              <p>
                Safari does not support network requests from unchained admin on
                HTTPS to your local HTTP endpoint, so we cannot introspect your
                endpoint.
              </p>
              <p>There are a couple solutions:</p>
              <ul>
                <li>
                  <p>
                    Visit this page from a browser that supports HTTPS requests
                    to local HTTP endpoints, like Chrome or Firefox.
                  </p>
                </li>
                <li>
                  <p>Set up an SSL certificate for your local endpoint.</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SandboxInput;
