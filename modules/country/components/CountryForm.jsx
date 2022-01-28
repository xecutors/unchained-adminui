import { useIntl } from 'react-intl';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import useCurrencies from '../../currency/hooks/useCurrencies';
import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

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
    enableReinitialize: true,
    initialValues: {
      isoCode: '',
      ...defaultValue,
    },
  });

  return (
    <Form form={form}>
      <div className="space-y-6 sm:space-y-5">
        <TextField
          name="isoCode"
          id="isoCode"
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
          className="text-sm block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />

        {isEdit && (
          <div className=" min-w-0 flex-1 sm:max-w-lg">
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
                defaultMessage: ' Active',
              })}
              className=" focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-md"
            />
          </div>
        )}
      </div>

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
        third
      />
    </Form>
  );
};

export default CountryForm;
