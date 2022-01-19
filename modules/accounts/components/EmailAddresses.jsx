import { useIntl } from 'react-intl';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useAddEmail from '../hooks/useAddEmail';
import useRemoveEmail from '../hooks/useRemoveEmail';
import useSendVerificationEmail from '../hooks/useSendVerificationEmail';

const EmailAddresses = ({ emails, userId, enableVerification }) => {
  const { removeEmail } = useRemoveEmail();
  const { sendVerificationEmail } = useSendVerificationEmail();
  const { addEmail } = useAddEmail();
  const { formatMessage } = useIntl();
  const onAddEmail = async ({ email }) => {
    await addEmail({ email, userId });
    return true;
  };
  const form = useForm({
    submit: onAddEmail,
    enableReinitialize: true,
    initialValues: {
      email: '',
    },
  });
  return (
    <div>
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {formatMessage({ id: 'emails', defaultMessage: 'Emails' })}
        </h3>
      </div>

      <div className=" flow-root mt-6">
        <ul className="-my-5 divide-y divide-gray-200">
          {(emails || []).map(({ address, verified }) => (
            <li className="py-4" key={address}>
              <div className=" flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {address}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {verified ? 'Verified' : 'Not Verified'}
                  </p>
                </div>
                <div>
                  {enableVerification && (
                    <a
                      onClick={() => sendVerificationEmail({ email: address })}
                      className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-red-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-red-50"
                    >
                      {formatMessage({
                        id: 'send_verification_mail',
                        defaultMessage: 'Send verification mail',
                      })}
                    </a>
                  )}
                  <a
                    onClick={() => removeEmail({ email: address, userId })}
                    className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-red-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-red-50"
                  >
                    {formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Form form={form}>
          <div className="mt-7 border-t">
            <TextField className="mt-7  mr-24" name="email" required label="" />
            <SubmitButton
              className="mt-3 mb-4  items-center px-2 py-1 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500"
              label={formatMessage({
                id: 'add_email',
                defaultMessage: 'Add email',
              })}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EmailAddresses;
