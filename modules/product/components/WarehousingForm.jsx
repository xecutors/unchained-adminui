import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useProductWarehousing from '../hooks/useProductWarehousing';
import useUpdateProductWarehousing from '../hooks/useUpdateProductWarehousing';

const WarehousingForm = ({ productId }) => {
  const { formatMessage } = useIntl();
  const { product, loading } = useProductWarehousing({ productId });
  const { updateProductWarehousing } = useUpdateProductWarehousing();

  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved...',
  });

  const onSubmit = async ({ sku, baseUnit }) => {
    await updateProductWarehousing({ productId, baseUnit, sku });
    return true;
  };

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      sku: '',
      baseUnit: '',
    },
  });

  useEffect(() => {
    if (Object.keys(product).length && !loading)
      form.formik.setValues({ ...product });
  }, [product]);

  return (
    <Form form={form}>
      <div className="space-y-6 sm:p-6 rounded-md relative max-w-full bg-white">
        <div className="w-full justify-between align-baseline">
          <TextField
            name="sku"
            id="sku"
            label={formatMessage({
              id: 'sku',
              defaultMessage: 'SKU',
            })}
            required
            className="text-sm font-medium text-gray-500 py-2 sm:ml-1   mt-1 w-full"
          />

          <TextField
            name="baseUnit"
            id="baseUnit"
            label={formatMessage({
              id: 'baseUnit',
              defaultMessage: 'Base Unit',
            })}
            required
            className="text-sm font-medium text-gray-500 py-2 ml-1   mt-1 w-full"
          />
        </div>
      </div>
      <div className="px-5 sm:px-15 space-y-6 sm:p-6 bg-gray-50 text-right">
        <SubmitButton
          label={formatMessage({
            id: 'save',
            defaultMessage: 'Save',
          })}
          full
        />
      </div>
    </Form>
  );
};

export default WarehousingForm;
