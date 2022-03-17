import { ExclamationIcon } from '@heroicons/react/solid';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

const NoData = ({ message, className = '', Icon }) => {
  return (
    <div
      className={classnames(
        'flex w-full flex-col items-center justify-center py-5',
        className,
      )}
    >
      <div className="grid items-center justify-center">
        <div className="flex items-center justify-center text-indigo-500">
          {Icon || <ExclamationIcon className="h-10 w-10" />}
        </div>

        <FormattedMessage
          id="no_data_message"
          defaultMessage="<p> No &nbsp; <span>  {message}  available</span> </p>"
          values={{
            p: (chunks) => (
              <p className="m-auto flex items-center justify-center">
                {chunks}
              </p>
            ),
            span: (chunks) => <span className="capitalize"> {chunks}</span>,
            message,
          }}
        />
      </div>
    </div>
  );
};

export default NoData;
