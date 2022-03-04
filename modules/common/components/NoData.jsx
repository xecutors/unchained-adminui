import { ExclamationIcon } from '@heroicons/react/solid';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

const NoData = ({ message, className = '', icon }) => {
  const Icon = icon || ExclamationIcon;
  return (
    <div
      className={classnames(
        'w-full border-2 flex flex-col justify-center items-center',
        className,
      )}
    >
      <div className="grid justify-center items-center">
        <div className="flex justify-center items-center">
          <Icon className="h-10 w-10" />
        </div>

        <FormattedMessage
          id="no_data_message"
          defaultMessage="<p> No &nbsp; <span>  {message}  available</span> </p>"
          values={{
            p: (chunks) => (
              <p className="flex justify-center items-center m-auto">
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
