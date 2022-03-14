import { useState } from 'react';
import { useFormik, FormikValues, FormikErrors, FormikTouched } from 'formik';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import clean from '../lib/clean';

/**
 * @param onSubmitSuccess Return `false` to skip redirect
 */
const useForm = ({
  submit,
  getSubmitErrorMessage = () => '',
  onSubmitSuccess = () => true,
  initialValues,
  initialErrors,
  initialTouched,
  successMessage,
  enableReinitialize,
  validate,
}: {
  submit: (
    // eslint-disable-next-line no-undef
    variables: Record<string, any>,
  ) => Promise<{ success: boolean; data?: any; error?: any } | boolean>;
  getSubmitErrorMessage?: (error?: Error | any) => Promise<string> | string;
  onSubmitSuccess?: (
    result: boolean,
    values: FormikValues,
  ) => Promise<boolean> | boolean;
  initialValues: FormikValues;
  initialTouched?: FormikTouched<FormikValues>;
  initialErrors?: FormikErrors<FormikValues>;
  enableReinitialize?: boolean;
  successMessage?: string;
  validate?: (
    values: FormikValues,
    // eslint-disable-next-line no-undef
  ) => void | object | Promise<FormikErrors<FormikValues>>;
}) => {
  const intl = useIntl();

  const [submitError, setSubmitError] = useState('');
  const { formatMessage } = useIntl();
  const onSubmit = async (values: FormikValues) => {
    setSubmitError('');

    try {
      const result = await submit(clean(values));
      const success =
        (typeof result === 'boolean' ? result : result?.success) ?? false;

      if (success) {
        if (successMessage) toast.success(successMessage);
        await onSubmitSuccess(success, values);
      } else {
        //console.log(result)
        const error = typeof result === 'boolean' ? !result : result?.error;
        // console.log( error)
        if (error?.includes('auth failed')) {
          // console.log('auth failed', error)

          setSubmitError(
            (await getSubmitErrorMessage(error)) ||
              intl.formatMessage({
                id: 'auth_error',
                defaultMessage: 'Authentication error',
              }),
          );
        }
        if (error?.includes('Invalid failed')) {
          // console.log('auth failed', error)

          setSubmitError(
            (await getSubmitErrorMessage(error)) ||
              intl.formatMessage({
                id: 'invalid_credential_error',
          defaultMessage: 'Invalid credential error',
              }),
          );
        }
       else{
        setSubmitError(
          (await getSubmitErrorMessage(error)) ||
            intl.formatMessage(
              {
                id: 'error_server',
                defaultMessage:
                  'There was a problem on the server ({details}). Please try again later..',
              },
              { details: error?.message || '' },
            ),
        );
            }
      }
    } catch (error) {
      console.error(error); // eslint-disable-line
      setSubmitError(
        (await getSubmitErrorMessage(error)) ||
          intl.formatMessage(
            {
              id: 'error_server',
              defaultMessage:
                'There was a problem on the server ({details}). Please try again later.',
            },
            {
              details:
                error?.message ||
                'There was a problem on the server ({details}). Please try again later.',
            },
          ),
      );
    }
  };

  const formik = useFormik({
    initialValues,
    initialErrors,
    initialTouched,
    enableReinitialize,
    onSubmit,
    validate,
  });

  return {
    submitError,
    formik,
    setSubmitError,
    disabled: false,
  };
};

export default useForm;
