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
  ) => Promise<{ success: boolean; data?: any; errors?: any } | boolean>;
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

  const onSubmit = async (values) => {
    setSubmitError('');

    try {
      const result = await submit(clean(values));

      const success =
        (typeof result === 'boolean' ? result : !result?.errors?.length) ??
        false;

      if (success) {
        if (successMessage) toast.success(successMessage);
        await onSubmitSuccess(success, result || values);
      } else {
        const errors = typeof result === 'boolean' ? !result : result?.errors;
        errors.forEach(async (error) => {
          if (error?.message.toLowerCase()?.includes('email already exists')) {
            setSubmitError(
              (await getSubmitErrorMessage(error)) ||
                intl.formatMessage({
                  id: 'email_exists_error',
                  defaultMessage: 'Email already exists',
                }),
            );
          } else {
            setSubmitError(
              (await getSubmitErrorMessage(error)) ||
                intl.formatMessage(
                  {
                    id: 'error_server',
                    defaultMessage: '{details}',
                  },
                  { details: error?.message?.message || '' },
                ),
            );
          }
        });
      }
    } catch (error) {
      if (!error.message.includes('option maxAge is invalid')) {
        setSubmitError(
          (await getSubmitErrorMessage(error)) ||
            intl.formatMessage(
              {
                id: 'error_server',
                defaultMessage: '{details}',
              },
              {
                details: error?.message || '{details}',
              },
            ),
        );
      }
    }
    return true;
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
