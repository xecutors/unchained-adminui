import { useIntl } from 'react-intl';
import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';

import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import { validateCurrency } from '../../forms/lib/validators';

const CurrencyForm = ({
  onSubmit,
  onSubmitSuccess,
  defaultValue = {},
  isEdit,
}) => {
  const { formatMessage } = useIntl();

  const currencyAddedMessage = formatMessage({
    id: 'currency_added',
    defaultMessage: 'Currency added successfully!',
  });
  const currencyUpdatedMessage = formatMessage({
    id: 'currency_updated',
    defaultMessage: 'Currency updated successfully!',
  });

  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    successMessage: isEdit ? currencyUpdatedMessage : currencyAddedMessage,
    getSubmitErrorMessage: (error) => {
      if (error?.message?.includes('duplicate key')) {
        form.formik.setFieldError(
          'isoCode',
          formatMessage({
            id: 'currency_exists',
            defaultMessage: 'Currency with the same ISO code already exists',
          }),
        );
      }
    },
    initialValues: {
      isoCode: '',
      ...defaultValue,
    },
  });
  return (
    <Form form={form}>
      <div className="px-5 py-2">
        <TextField
          name="isoCode"
          id="isoCode"
          validators={[validateCurrency()]}
          label={formatMessage({
            id: 'iso_code',
            defaultMessage: 'ISO code',
          })}
          autoComplete="on"
          required
          className="my-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
        />

        {isEdit && (
          <div className="my-3 flex items-center">
            <CheckboxField
              id="is-active"
              name="isActive"
              label={formatMessage({
                id: 'active',
                defaultMessage: 'Active',
              })}
              className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400"
            />
          </div>
        )}
      </div>
      <div className="sm:px-15 space-y-6 bg-gray-50 p-5 text-right">
        <SubmitButton
          label={
            isEdit
              ? formatMessage({
                  id: 'update_currency',
                  defaultMessage: 'Update Currency',
                })
              : formatMessage({
                  id: 'add_currency',
                  defaultMessage: 'Add Currency',
                })
          }
        />
      </div>
    </Form>
  );
};

export default CurrencyForm;
