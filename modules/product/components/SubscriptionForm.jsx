import { useIntl } from 'react-intl';
import FormHeader from '../../common/components/FormHeader';
import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

export const billingInterval = {
  hour: 'HOUR',
  day: 'DAY',
  week: 'WEEK',
  month: 'MONTH',
  year: 'YEAR',
};

export const trialInterval = {
  hour: 'HOUR',
  day: 'DAY',
  week: 'WEEK',
  month: 'MONTH',
  year: 'YEAR',
};

export const userCalculation = {
  licensed: 'LICENSED',
  metered: 'METERED',
};
const SubscriptionForm = () => {
  const { formatMessage } = useIntl();
  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved...',
  });

  const onSubmit = async ({ weight, length, width, billingUunit }) => {
    return true;
  };

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      weight: '',
      length: '',
      width: '',
      height: '',
    },
  });
  const { values } = form.formik;

  return (
    <FormHeader>
      <Form form={form}>
        <div className="space-y-6 sm:p-6 rounded-md relative max-w-full">
          <div className="sm:flex w-full  justify-between align-baseline">
            <SelectField
              className="text-sm  font-medium text-gray-500 py-1.5 w-full mt-2.5"
              label={formatMessage({
                id: 'billing_interval',
                defaultMessage: 'Billing Interval',
              })}
              placeholder={formatMessage({
                id: 'billing_interval',
                defaultMessage: 'Billing Interval',
              })}
              name="billing-interval"
              options={billingInterval}
            />
            <TextField
              name="billing_unit"
              id="billing_unit"
              label={formatMessage({
                id: 'billing_unit',
                defaultMessage: 'Billing Unit',
              })}
              required
              autoComplete="on"
              className="text-sm  font-medium text-gray-500 py-2 ml-1  mt-1 w-full"
            />
          </div>

          <div className="sm:flex max-w-full  justify-between align-baseline">
            <SelectField
              className="text-sm  font-medium text-gray-500 py-1.5 w-full mt-2.5"
              label={formatMessage({
                id: 'trial_interval',
                defaultMessage: 'Trial Interval',
              })}
              placeholder={formatMessage({
                id: 'trial_interval',
                defaultMessage: 'Trial Interval',
              })}
              name="trial-interval"
              options={trialInterval}
            />
            <TextField
              name="width"
              id="width "
              label={formatMessage({
                id: 'width',
                defaultMessage: 'Width (Millimeter)',
              })}
              required
              autoComplete="on"
              className="text-sm  font-medium text-gray-500 py-2 ml-1  mt-1 w-full"
            />
          </div>
            <SelectField
              className="text-sm  font-medium text-gray-500 py-1.5 w-full mt-2.5"
              label={formatMessage({
                id: 'usage_calculation_type',
                defaultMessage: 'Usage calculation type',
              })}
              placeholder={formatMessage({
                id: 'usage_calculation_type',
                defaultMessage: 'Usage calculation type',
              })}
              name="usage-calculation-type"
              options={userCalculation}
            />
          <div className="mx-auto sm:w-1/2 ">
            <SubmitButton
              label={formatMessage({
                id: 'save',
                defaultMessage: 'Save',
              })}
              className="py-6 h-9 "
              full
            />
          </div>
        </div>
      </Form>
    </FormHeader>
  );
};

export default SubscriptionForm;
