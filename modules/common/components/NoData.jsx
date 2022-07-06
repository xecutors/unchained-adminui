import { BanIcon } from '@heroicons/react/solid';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

const NoData = ({ message, className = '', Icon }) => {
  return (
    <div
      className={classnames(
        'flex w-full flex-col items-center justify-center py-8 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400',
        className,
      )}
    >
      <div className="grid items-center justify-center">
        <div className="flex items-center justify-center text-indigo-300 dark:text-slate-200">
          {Icon || <BanIcon className="h-8 w-8" />}
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
            span: (chunks) => <span className="capitalize"> {chunks} </span>,
            message,
          }}
        />
      </div>
    </div>
  );
};

export default NoData;
