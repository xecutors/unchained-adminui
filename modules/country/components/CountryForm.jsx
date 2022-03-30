import { useIntl } from 'react-intl';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import useCurrencies from '../../currency/hooks/useCurrencies';
import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';

import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import { validateCountry } from '../../forms/lib/validators';

const CountryForm = ({
  onSubmit,
  onSubmitSuccess,
  defaultValue = {},
  isEdit,
}) => {
  const { formatMessage } = useIntl();

  const countryAddedMessage = formatMessage({
    id: 'country_added',
    defaultMessage: 'Country added successfully!',
  });
  const countryUpdatedMessage = formatMessage({
    id: 'country_updated',
    defaultMessage: 'Country updated successfully!',
  });

  const { currencies } = useCurrencies();
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    successMessage: isEdit ? countryUpdatedMessage : countryAddedMessage,
    getSubmitErrorMessage: (error) => {
      if (error?.message?.includes('duplicate key')) {
        form.formik.setFieldError(
          'isoCode',
          formatMessage({
            id: 'country_exists',
            defaultMessage: 'Country with the same ISO code already exists',
          }),
        );
      }
    },
    enableReinitialize: true,
    initialValues: {
      isoCode: '',
      ...defaultValue,
    },
  });

  return (
    <Form form={form}>
      <div className="p-5 pb-7">
        <TextField
          name="isoCode"
          id="isoCode"
          validators={[validateCountry()]}
          label={formatMessage({
            id: 'iso_code',
            defaultMessage: 'ISO code',
          })}
          placeholder={formatMessage({
            id: 'iso_code',
            defaultMessage: 'ISO code',
          })}
          required
          autoComplete="on"
        />

        {isEdit && (
          <div className="my-3 min-w-0 flex-1">
            <SelectField
              name="defaultCurrencyId"
              id="defaultCurrencyId"
              label={formatMessage({
                id: 'default_currency',
                defaultMessage: 'Default currency',
              })}
              placeholder={formatMessage({
                id: 'default_currency',
                defaultMessage: 'Default currency',
              })}
              options={convertArrayOfObjectToObject(
                currencies,
                'isoCode',
                '_id',
              )}
              required
              className="mb-2 text-sm"
            />
            <CheckboxField
              id="isActive"
              name="isActive"
              type="checkbox"
              label={formatMessage({
                id: 'active',
                defaultMessage: 'Active',
              })}
              className="h-4 w-4 rounded-sm border-gray-300 text-indigo-600 focus:ring-indigo-400"
            />
          </div>
        )}
      </div>
      <div className="border-t border-t-indigo-50 sm:px-15 space-y-6 bg-gray-50 p-5 text-right">
        <SubmitButton
          label={
            isEdit
              ? formatMessage({
                  id: 'update_country',
                  defaultMessage: 'Update Country',
                })
              : formatMessage({
                  id: 'add_country',
                  defaultMessage: 'Add Country',
                })
          }
        />
      </div>
    </Form>
  );
};

export default CountryForm;
