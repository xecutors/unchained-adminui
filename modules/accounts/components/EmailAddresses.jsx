import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useAddEmail from '../hooks/useAddEmail';
import useRemoveEmail from '../hooks/useRemoveEmail';
import useSendVerificationEmail from '../hooks/useSendVerificationEmail';
import Badge from '../../common/components/Badge';
import useModal from '../../modal/hooks/useModal';
import DangerMessage from '../../modal/components/DangerMessage';

const STATUS = {
  true: 'Verified',
  false: 'Not Verified',
};

const EmailAddresses = ({
  emails,
  userId,
  enableVerification,
  emailBodyContainer,
}) => {
  const { removeEmail } = useRemoveEmail();
  const { sendVerificationEmail } = useSendVerificationEmail();
  const { addEmail } = useAddEmail();
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const onAddEmail = async ({ email }) => {
    await addEmail({ email, userId });
    return true;
  };

  const onRemoveEmail = async ({ email }) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_email_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this email? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeEmail({ email, userId });
          toast.success(
            formatMessage(
              {
                id: 'email_deleted',
                defaultMessage: 'email {id} deleted successfully',
              },
              {
                id: userId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_email',
          defaultMessage: 'Delete email',
        })}
      />,
    );
  };

  const successMessage = formatMessage({
    id: 'email_added',
    defaultMessage: 'Email added successfully!',
  });
  const form = useForm({
    submit: onAddEmail,
    successMessage,
    enableReinitialize: true,
    initialValues: {
      email: '',
    },
  });
  return (
    <div>
      <div className="border-t pt-5 lg:grid lg:grid-cols-3 lg:gap-6">
        <div className="mb-7 border-gray-200 pb-2 sm:flex sm:justify-between lg:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {formatMessage({
              id: 'email_addresses',
              defaultMessage: 'Email addresses',
            })}
          </h3>
        </div>
        <div
          className={classNames(
            'w-full bg-white px-4 py-5 sm:p-6 lg:col-span-2',
            emailBodyContainer,
          )}
        >
          <ul className="-my-5 divide-y divide-gray-200">
            {(emails || []).map(({ address, verified }) => (
              <li className="py-4" key={address}>
                <div className="flex items-center justify-between flex-wrap">
                  <div className="flex flex-wrap max-w-md space-x-2 mr-2">
                    <div className="truncate text-sm font-medium text-gray-900">
                      {address}
                    </div>
                    <Badge
                      className="flex-shrink-0"
                      text={STATUS[verified]}
                      color={verified ? 'green' : 'red'}
                    />
                  </div>
                  <div className="flex items-center my-1">
                    {!enableVerification && (
                      <a
                        onClick={() =>
                          sendVerificationEmail({ email: address })
                        }
                        className="focus:ring-indigo-500 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {formatMessage({
                          id: 'send_verification_mail',
                          defaultMessage: 'Send verification mail',
                        })}
                      </a>
                    )}
                    <a
                      onClick={() => onRemoveEmail({ email: address, userId })}
                      className="inline-flex items-center rounded-full bg-white hover:bg-red-50 ml-2"
                    >
                      <svg
                        className="m-2 h-4 w-4 text-red-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Form form={form}>
            <div className="mt-4 border-t">
              <div className="mt-4 flex space-x-4 items-between">
                <TextField
                  className="mt-0"
                  name="email"
                  required
                  hideLabel
                  placeholder={formatMessage({
                    id: 'email',
                    defaultMessage: 'Email',
                  })}
                  label={formatMessage({
                    id: 'email',
                    defaultMessage: 'Email',
                  })}
                />
                <SubmitButton
                  className="flex-shrink-0"
                  label={formatMessage({
                    id: 'add_email',
                    defaultMessage: 'Add email',
                  })}
                />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EmailAddresses;
