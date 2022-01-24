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
    <div className="rounded-md px-4 py-5 bg-white shadow overflow-hidden border-b border-gray-200">
      <div className="border-b pb-2 pt-4 mb-7 border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {formatMessage({
            id: 'change_password',
            defaultMessage: 'Change password',
          })}
        </h3>
      </div>
      <Form form={form}>
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
        <SubmitButton
          label={formatMessage({
            id: 'change_password',
            defaultMessage: 'Change password',
          })}
        />
      </Form>
    </div>
  );
};

export default ChangePassword;
