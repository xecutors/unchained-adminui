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
      <div className="mb-7 border-slate-200 pb-2 sm:flex sm:justify-between">
        <h3 className="text-lg font-medium leading-6 text-slate-900">
          {formatMessage({
            id: 'change_password',
            defaultMessage: 'Change password',
          })}
        </h3>
      </div>
      <div className="w-full border-b border-slate-200 bg-white shadow rounded-md lg:ml-auto lg:w-4/6">
        <Form form={form}>
          <div className="relative max-w-full space-y-6 rounded-md bg-white sm:p-6">
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
          <div className="border-t-indigo-50 border-t space-y-6 bg-slate-50 text-right sm:p-6">
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
