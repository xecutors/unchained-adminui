import { NoSymbolIcon } from '@heroicons/react/24/solid';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

const NoData = ({ message, className = '', Icon = null }) => {
  return (
    <div
      className={classnames(
        'mt-3 flex w-full flex-col items-center justify-center py-8 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400',
        className,
      )}
    >
      <div className="grid items-center justify-center">
        <div className="flex items-center justify-center text-slate-400 dark:text-slate-200">
          {Icon || <NoSymbolIcon className="h-8 w-8" />}
        </div>

        <FormattedMessage
          id="no_data_message"
          defaultMessage="<p>No <span>  {message}  available</span> </p>"
          values={{
            p: (chunks) => (
              <p className="mt-2 m-auto flex items-center justify-center">
                {chunks}
              </p>
            ),
            span: (chunks) => (
              <span className="capitalize ml-1"> {chunks} </span>
            ),
            message,
          }}
        />
      </div>
    </div>
  );
};

export default NoData;
