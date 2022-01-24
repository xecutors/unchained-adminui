import Link from 'next/link';
import { useIntl } from 'react-intl';
import EmailField from '../../forms/components/EmailField';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';

const ForgotPasswordForm = ({ onSubmit, onSubmitSuccess = () => true }) => {
  const { formatMessage } = useIntl();

  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    initialValues: {
      email: '',
    },
  });
  return (
    <Form form={form}>
      <div>
        <EmailField
          name="email"
          id="email-address"
          label={formatMessage({
            id: 'email_address',
            defaultMessage: 'Email Address',
          })}
          placeholder={formatMessage({
            id: 'email_address',
            defaultMessage: 'Email Address',
          })}
          required
          hideLabel
        />
      </div>

      <div className="mb-6">
        <SubmitButton
          className="w-full "
          label={formatMessage({
            id: 'send_rest_link',
            defaultMessage: 'Send reset link',
          })}
        />
      </div>
      <p className="text-sm text-center text-gray-400">
        {formatMessage({
          id: 'dont_have_account',
          defaultMessage: "Don't have an account yet?",
        })}
        {'  '}
        <Link href="/sign-up">
          <a className="font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline">
            {formatMessage({ id: 'sign_up', defaultMessage: 'Sign up' })}
          </a>
        </Link>
        .
      </p>
    </Form>
  );
};

export default ForgotPasswordForm;
