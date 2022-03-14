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
  const { formatMessage } = useIntl();

  const [submitError, setSubmitError] = useState('');
  // console.log(submitError);


  const onSubmit = async (values) => {
    setSubmitError('');

    try {
      const result = await submit(clean(values));
      const success =
        (typeof result === 'boolean' ? result : result?.success) ?? false;
          
      if (success) {
        if (successMessage) toast.success(successMessage);
        await onSubmitSuccess(success, values);
      } else {
        const error = typeof result === 'boolean' ? !result : result?.error;
      
          if (error?.message?.includes('auth failed')){
          
          setSubmitError(
            (await getSubmitErrorMessage(error))  ||
              
            formatMessage(
                {
                  id: 'auth_error',
                  defaultMessage: 'Authentication error',
                },
                { details: error?.message || '' },
              ),
              
              
          );
              }
          if (error?.message?.includes('Invalid credentials')){
          setSubmitError(
            (await getSubmitErrorMessage(error))  ||
              
            formatMessage(
                {
                  id: 'invalid_credential_error',
                  defaultMessage: 'Invalid credential error',
                },
                { details: error?.message || '' },
              ),
              
              
          );
              }
          if (error?.message?.includes('Email already exists'))
            return formatMessage({
              id: 'email_exists_error',
              defaultMessage: 'Email already exists',
            });
    
          setSubmitError(
          (await getSubmitErrorMessage(error))  ||
            
          formatMessage(
              {
                id: 'error_server',
                defaultMessage:
                  'There was a problem on the server ({details}). Please try again later.',
              },
              { details: error?.message || '' },
            ),
            
            
        );
        
        
      }
    } catch (error) {
      // console.error(error); // eslint-disable-line
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
