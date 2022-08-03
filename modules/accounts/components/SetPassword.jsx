import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import PasswordField from '../../forms/components/PasswordField';
import SubmitButton from '../../forms/components/SubmitButton';

import useForm from '../../forms/hooks/useForm';
import useSetPassword from '../hooks/useSetPassword';

const SetPassword = ({ userId }) => {
  const { setPassword } = useSetPassword();
  const { formatMessage } = useIntl();

  const onSubmit = async ({ newPassword }) => {
    const { data } = await setPassword({
      newPassword,
      disableHashing: true,
      userId,
    });

    return data?.setPassword;
  };

  const form = useForm({
    submit: onSubmit,
    enableReinitialize: true,
    onSubmitSuccess: () => {
      toast.success(
        formatMessage({
          id: 'password_success',
          defaultMessage: 'Password changed successfully.',
        }),
      );
    },
    getSubmitErrorMessage: (error) => {
      toast.error(
        formatMessage(
          {
            id: 'password_change_failed',
            defaultMessage: 'Password change failed, try again later',
          },
          { error: error.message },
        ),
      );
      return formatMessage(
        {
          id: 'password_change_failed',
          defaultMessage: 'Password change failed, try again later',
        },
        { error: error.message },
      );
    },
    initialValues: {
      newPassword: '',
    },
  });

  return (
    <div className="overflow-hidden lg:flex">
      <div className="mb-7 border-slate-200 dark:border-slate-800 pb-2 sm:flex sm:justify-between">
        <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-slate-200">
          {formatMessage({
            id: 'change_password',
            defaultMessage: 'Change password',
          })}
        </h3>
      </div>
      <div className="w-full border-b border-slate-200 dark:border-slate-800 bg-white  dark:bg-slate-900 rounded-md lg:ml-auto lg:w-4/6">
        <Form form={form}>
          <div className="relative max-w-full mb-4 p-3 space-y-6 sm:p-6">
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
              className="text-sm"
            />
          </div>
          <FormErrors />
          <div className="border-t-indigo-50 border-t dark:border-t-slate-700 space-y-6 bg-slate-50 dark:bg-slate-800 text-right sm:p-6">
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

export default SetPassword;
