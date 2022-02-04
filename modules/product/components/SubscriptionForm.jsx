import { useIntl } from 'react-intl';
import FormHeader from '../../common/components/FormHeader';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useProductPlanConfigurationOptions from '../hooks/useProductPlanConfigurationOptions';
import useUpdateProductPlan from '../hooks/useUpdateProductPlan';

const SubscriptionForm = ({ _id: productId }) => {
  const { formatMessage } = useIntl();
  const { configurationIntervals, usageCalculationTypes } =
    useProductPlanConfigurationOptions();

  const { updateProductPlan } = useUpdateProductPlan();
  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved...',
  });

  const onSubmit = async ({
    trialInterval,
    trialIntervalCount,
    billingInterval,
    billingIntervalCount,
    usageCalculationType,
  }) => {
    await updateProductPlan({
      productId,
      billingInterval,
      usageCalculationType,
      billingIntervalCount,
      trialInterval,
      trialIntervalCount,
    });
    return true;
  };

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      trialInterval: '',
      trialIntervalCount: '',
      billingInterval: '',
      billingIntervalCount: '',
      usageCalculationType: '',
    },
  });

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
              name="billingInterval"
              options={convertArrayOfObjectToObject(
                configurationIntervals,
                'value',
                'value',
              )}
            />
            <TextField
              name="billingIntervalCount"
              id="billing_unit"
              type="number"
              label={formatMessage({
                id: 'billing_unit',
                defaultMessage: 'Billing Unit',
              })}
              required
              className="text-sm  font-medium text-gray-500 py-2 sm:ml-1 mt-1 w-full"
            />
          </div>

          <div className="sm:flex max-w-full  justify-between align-baseline">
            <SelectField
              className="text-sm  font-medium text-gray-500 py-1.5 w-full mt-2.5"
              label={formatMessage({
                id: 'trial_interval',
                defaultMessage: 'Trial Interval',
              })}
              name="trialInterval"
              options={convertArrayOfObjectToObject(
                configurationIntervals,
                'value',
                'value',
              )}
            />
            <TextField
              type="number"
              name="trialIntervalCount"
              id="trialIntervalCount "
              label={formatMessage({
                id: 'trial_unit',
                defaultMessage: 'Trial Unit',
              })}
              required
              className="text-sm  font-medium text-gray-500 py-2  sm:ml-1 mt-1 w-full"
            />
          </div>
          <SelectField
            className="text-sm  font-medium text-gray-500 py-1.5 w-full mt-2.5"
            label={formatMessage({
              id: 'usage_calculation_type',
              defaultMessage: 'Usage calculation type',
            })}
            name="usageCalculationType"
            options={convertArrayOfObjectToObject(
              usageCalculationTypes,
              'value',
              'value',
            )}
          />
          <FormErrors />
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
