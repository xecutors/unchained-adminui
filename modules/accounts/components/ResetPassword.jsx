import { useIntl } from 'react-intl';
import EmailField from '../../forms/components/EmailField';
import Form from '../../forms/components/Form';
import useForm from '../../forms/hooks/useForm';

export default function ResetPassword() {
  const intl = useIntl();
  const form = useForm({
    getSubmitErrorMessage: (error) => {
      if (error?.message?.includes('auth failed')) {
        return 'error';
      }
      return '';
    },
    initialValues: {
      email: null,
    },
  });

  return (
    <>
      <div>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h4 className="mt-6 font-extrabold text-gray-900">
                {intl.formatMessage({
                  id: 'reset_password',
                  defaultMessage: 'Reset password',
                })}
              </h4>
            </div>
            <Form
              form={form}
              className="mt-8 space-y-6 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
            >
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <EmailField
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    label={intl.formatMessage({
                      id: 'email',
                      defaultMessage: 'E-mail',
                    })}
                    className="appearance-none mb-7 relative block w-full px-3 py-2  border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div className="flex ">
                  <button
                    type="submit"
                    className="appearance-none  ml-5 mr-5  justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {intl.formatMessage({
                      id: 'reset_password',
                      defaultMessage: 'Reset password',
                    })}
                  </button>
                  <button
                    type="submit"
                    className="appearance-none ml-12 felx-1 justify-left py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {intl.formatMessage({
                      id: 'return_to_login',
                      defaultMessage: 'Return to Login',
                    })}
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
