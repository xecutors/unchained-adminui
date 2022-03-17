import { useIntl } from 'react-intl';
import Form from '../../forms/components/Form';
import PasswordField from '../../forms/components/PasswordField';
import SubmitButton from '../../forms/components/SubmitButton';

import useForm from '../../forms/hooks/useForm';
import useChangePassword from '../hooks/useChangePassword';

const ChangePassword = () => {
  const { changePassword } = useChangePassword();
  const { formatMessage } = useIntl();

  const onSubmit = async ({ oldPassword, newPassword }) => {
    await changePassword({ oldPassword, newPassword });
    return true;
  };

  const form = useForm({
    submit: onSubmit,
    enableReinitialize: true,
    initialValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  return (
    <div className="overflow-hidden lg:flex">
      <div className="pb-2 mb-7 border-gray-200 sm:flex sm:justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {formatMessage({
            id: 'change_password',
            defaultMessage: 'Change password',
          })}
        </h3>
      </div>
      <div className="bg-white shadow border-b border-gray-200 w-full lg:w-4/6 lg:ml-auto">
        <Form form={form}>
          <div className="space-y-6 sm:p-6 rounded-md relative max-w-full bg-white">
            <PasswordField
              label={formatMessage({
                id: 'current_password',
                defaultMessage: 'Current password',
              })}
              placeholder={formatMessage({
                id: 'current_password',
                defaultMessage: 'Current password',
              })}
              name="oldPassword"
              id="oldPassword"
              required
              className="mb-4 text-sm"
            />
            <PasswordField
              label={formatMessage({
                id: 'new_password',
                defaultMessage: 'New password',
              })}
              placeholder={formatMessage({
                id: 'new_password',
                defaultMessage: 'New password',
              })}
              name="newPassword"
              id="newPassword"
              required
              className="mb-4 text-sm"
            />
          </div>
          <div className="space-y-6 sm:p-6 bg-gray-50 text-right">
            <SubmitButton
              label={formatMessage({
                id: 'change_password',
                defaultMessage: 'Change password',
              })}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
