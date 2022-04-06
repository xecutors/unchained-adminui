import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import useCurrentRoles from '../../accounts/hooks/useCurrentRoles';

import FormWrapper from '../../common/components/FormWrapper';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import ACTION_ROLES from '../../common/data/roles';
import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useProductPlan from '../hooks/useProductPlan';
import useProductPlanConfigurationOptions from '../hooks/useProductPlanConfigurationOptions';
import useUpdateProductPlan from '../hooks/useUpdateProductPlan';

const SubscriptionForm = ({ productId }) => {
  const { formatMessage } = useIntl();
  const { configurationIntervals, usageCalculationTypes } =
    useProductPlanConfigurationOptions();
  const { plan, loading } = useProductPlan({ productId });
  const { hasRole } = useCurrentRoles();
  const { updateProductPlan } = useUpdateProductPlan();
  const successMessage = formatMessage({
    id: 'enrollment_updated_successfully',
    defaultMessage: 'Enrollment saved successfully',
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
    getSubmitErrorMessage: (error) => {
      if (
        error?.message?.includes(
          'Status of the product does not allow this operation',
        )
      )
        return formatMessage({
          id: 'subscription_product_type_not_valid',
          defaultMessage: 'Status of the product does not allow this operation',
        });

      return error?.message || '';
    },
  });

  useEffect(() => {
    if (plan && !loading) form.formik.setValues(plan);
  }, [plan]);

  return (
    <FormWrapper>
      <Form form={form}>
        <div className="relative max-w-full space-y-6 rounded-md sm:p-6">
          <SelectField
            required
            className="mt-2.5  w-full py-1.5 text-sm font-medium text-slate-500"
            label={formatMessage({
              id: 'usage_calculation_type',
              defaultMessage: 'Usage calculation type',
            })}
            placeholder={formatMessage({
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
          <div className="w-full items-end  justify-end sm:flex">
            <SelectField
              className="mt-2.5  w-full text-sm  font-medium text-slate-500"
              required
              label={formatMessage({
                id: 'billing_interval_unit',
                defaultMessage: 'Billing interval unit',
              })}
              placeholder={formatMessage({
                id: 'billing_interval_unit',
                defaultMessage: 'Billing interval unit',
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
              required
              label={formatMessage({
                id: 'billing_unit',
                defaultMessage: 'Billing Unit',
              })}
              placeholder={formatMessage({
                id: 'billing_unit',
                defaultMessage: 'Billing Unit',
              })}
              className="mt-1  w-full text-sm  font-medium text-slate-500 sm:ml-1"
            />
          </div>

          <div className="max-w-full items-end  justify-end sm:flex">
            <SelectField
              className="mt-2.5  w-full text-sm  font-medium text-slate-500"
              label={formatMessage({
                id: 'trial_interval_unit',
                defaultMessage: 'Trial interval unit',
              })}
              placeholder={formatMessage({
                id: 'trial_interval_unit',
                defaultMessage: 'Trial interval unit',
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
              placeholder={formatMessage({
                id: 'trial_unit',
                defaultMessage: 'Trial Unit',
              })}
              required
              className="mt-1  w-full text-sm   font-medium text-slate-500 sm:ml-1"
            />
          </div>

          <div className="border-t-indigo-50 border-t sm:px-15 space-y-6 bg-slate-50 text-right sm:p-6">
            <SubmitButton
              hidden={!hasRole(ACTION_ROLES.enrollment.create)}
              label={formatMessage({
                id: 'save',
                defaultMessage: 'Save',
              })}
              full
            />
          </div>
        </div>
      </Form>
    </FormWrapper>
  );
};

export default SubscriptionForm;
