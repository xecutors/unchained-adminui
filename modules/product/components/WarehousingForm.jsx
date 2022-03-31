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
    defaultMessage: 'Saved',
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
    <Form className="rounded shadow" form={form}>
      <div className="relative bg-white px-4 pb-5 sm:p-6">
        <div className="w-full justify-between align-baseline">
          <TextField
            name="sku"
            id="sku"
            label={formatMessage({
              id: 'sku',
              defaultMessage: 'SKU',
            })}
            className="mb-4 text-sm font-medium text-slate-500"
          />

          <TextField
            name="baseUnit"
            id="baseUnit"
            label={formatMessage({
              id: 'baseUnit',
              defaultMessage: 'Base Unit',
            })}
            className="text-sm font-medium text-slate-500"
          />
        </div>
      </div>
      <div className="space-y-6 bg-slate-50 text-right sm:p-6">
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
