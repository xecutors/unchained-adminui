import { useIntl } from 'react-intl';

import useAuth from '../../Auth/useAuth';
import FormWrapper from '../../common/components/FormWrapper';
import convertArrayOfObjectToObject from '../../common/convertArrayOfObjectToObject';

import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm, { OnSubmitType } from '../../forms/hooks/useForm';
import useProductVariationTypes from '../hooks/useProductVariationTypes';

const ProductVariationForm = ({
  onSubmit,
  disabled = false,
}: {
  onSubmit: OnSubmitType;
  disabled?: boolean;
}) => {
  const { formatMessage } = useIntl();

  const { variationTypes } = useProductVariationTypes();
  const { hasRole } = useAuth();
  const successMessage = formatMessage({
    id: 'product_variation_added',
    defaultMessage: 'Product variation added successfully',
  });

  const form = useForm({
    disabled,
    submit: onSubmit,
    successMessage,
    initialValues: {
      title: '',
      key: '',
      type: '',
    },
  });

  return (
    <FormWrapper>
      <Form form={form}>
        <div className="max-w-full rounded-md p-4 sm:p-6">
          <div className="max-w-full mb-0">
            <TextField
              name="title"
              id="title"
              label={formatMessage({
                id: 'title',
                defaultMessage: 'Title',
              })}
              required
              autoComplete="on"
              className="w-full pb-3 text-sm text-slate-400 dark:text-slate-200"
            />
            <TextField
              name="key"
              id="key "
              label={formatMessage({
                id: 'key',
                defaultMessage: 'Key',
              })}
              required
              autoComplete="on"
              className="w-full pb-3 text-sm text-slate-400 dark:text-slate-200"
            />
          </div>
          <SelectField
            required
            className="mt-0 w-full pb-2 text-sm text-slate-400 dark:text-slate-200"
            label={formatMessage({
              id: 'type',
              defaultMessage: 'Type',
            })}
            placeholder={formatMessage({
              id: 'type',
              defaultMessage: 'Type',
            })}
            name="type"
            options={convertArrayOfObjectToObject(
              variationTypes,
              'value',
              'value',
            )}
          />
        </div>
        <div className="space-y-6 bg-slate-50 dark:bg-slate-700 px-5 py-6 text-right">
          <SubmitButton
            hidden={!hasRole('addProductVariation')}
            label={formatMessage({
              id: 'save',
              defaultMessage: 'Save',
            })}
          />
        </div>
      </Form>
    </FormWrapper>
  );
};

export default ProductVariationForm;
