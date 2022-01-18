import { useIntl } from 'react-intl';
import useRemoveEmail from '../hooks/useRemoveEmail';

const EmailAddresses = ({ emails, userId }) => {
  const { removeEmail } = useRemoveEmail();
  const { formatMessage } = useIntl();

  return (
    <div>
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {formatMessage({ id: 'emails', defaultMessage: 'Emails' })}
        </h3>
      </div>

      <div className="flow-root mt-6">
        <ul className="-my-5 divide-y divide-gray-200">
          {(emails || []).map(({ address, verified }) => (
            <li className="py-4" key={address}>
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {address}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {verified ? 'Verified' : 'Not Verified'}
                  </p>
                </div>
                <div>
                  <a
                    onClick={() => removeEmail({ email: address, userId })}
                    className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-red-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-red-50"
                  >
                    Remove
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmailAddresses;
