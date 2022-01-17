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
  const { currencies } = useCurrencies();
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    enableReinitialize: true,
    initialValues: {
      isoCode: '',
      ...defaultValue,
    },
  });

  return (
    <Form form={form}>
      <div className="space-y-6 sm:space-y-5">
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <TextField
            name="isoCode"
            id="isoCode"
            label={formatMessage({
              id: 'iso_code',
              defaultMessage: 'ISO code',
            })}
            required
            autoComplete="on"
            className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        {isEdit && (
          <div className="flex items-center h-5 justify-between">
            <CheckboxField
              id="isActive"
              name="isActive"
              type="checkbox"
              label={formatMessage({ id: 'active', defaultMessage: 'Active' })}
              className="m-3 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <SelectField
              name="defaultCurrencyId"
              id="defaultCurrencyId"
              label={formatMessage({
                id: 'default_currency',
                defaultMessage: 'Default currency',
              })}
              options={convertArrayOfObjectToObject(
                currencies,
                'isoCode',
                '_id',
              )}
              required
            />
          </div>
        )}
      </div>

      <SubmitButton
        className="w-16 mt-3 ml-2 mr-2  items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500"
        label={formatMessage({ id: 'add', defaultMessage: 'Add' })}
      />
    </Form>
  );
};

export default CountryForm;
