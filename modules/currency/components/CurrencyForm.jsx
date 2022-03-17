import { useIntl } from 'react-intl';
import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';

import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

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
    enableReinitialize: true,
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
          label={formatMessage({
            id: 'iso_code',
            defaultMessage: 'ISO code',
          })}
          autoComplete="on"
          required
          className="block mt-3 w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />

        {isEdit && (
          <div className="flex items-center mt-3">
            <CheckboxField
              id="is-active"
              name="isActive"
              label={formatMessage({
                id: 'active',
                defaultMessage: 'Active',
              })}
              className="m-3 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
        )}
      </div>

      <div className="mt-5 px-5 sm:px-15 space-y-6 sm:p-6 bg-gray-50 text-right">
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
