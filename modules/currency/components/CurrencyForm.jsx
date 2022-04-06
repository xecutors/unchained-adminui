import { useIntl } from 'react-intl';
import ACTION_ROLES from '../../common/data/roles';
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
          className="my-4"
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
              className="mr-2 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
            />
          </div>
        )}
      </div>
      <div className="border-t-indigo-50 border-t sm:px-15 space-y-6 rounded-b-md bg-slate-50 p-5 text-right">
        <SubmitButton
          disabled={ACTION_ROLES.currencies.update}
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
