import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import FormHeader from '../../common/components/FormHeader';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useProductWarehousing from '../hooks/useProductWarehousing';
import useUpdateProductWarehousing from '../hooks/useUpdateProductWarehousing';

const WarehousingForm = ({ _id: productId }) => {
  const { formatMessage } = useIntl();
  const { updateProductWarehousing } = useUpdateProductWarehousing();
  const { product, loading } = useProductWarehousing({ productId });

  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved...',
  });

  const onSubmit = async ({ sku, baseUnit }) => {
    await updateProductWarehousing({ productId, sku, baseUnit });
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
    if (product && !loading) form.formik.setValues(product);
  }, [product]);

  return (
    <FormHeader>
      <Form form={form}>
        <div className="space-y-6 sm:p-6 rounded-md relative max-w-full">
          <div className=" w-full  justify-between align-baseline">
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

export default WarehousingForm;
