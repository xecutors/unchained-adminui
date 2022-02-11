import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import FormHeader from '../../common/components/FormHeader';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useProductSupply from '../hooks/useProductSupply';
import useUpdateProductSupply from '../hooks/useUpdateProductSupply';

const SupplyForm = ({ productId }) => {
  const { formatMessage } = useIntl();
  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });
  const { updateProductSupply } = useUpdateProductSupply();
  const { dimensions } = useProductSupply({ productId });

  const onSubmit = async ({ weight, length, width, height }) => {
    await updateProductSupply({
      productId,
      weightInGram: parseFloat(weight, 10),
      lengthInMillimeters: parseFloat(length, 10),
      heightInMillimeters: parseFloat(height, 10),
      widthInMillimeters: parseFloat(width, 10),
    });
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

  useEffect(() => {
    if (Object.keys(dimensions).length) form.formik.setValues(dimensions);
  }, [dimensions]);
  return (
    <FormHeader>
      <Form form={form}>
        <div className="space-y-6 sm:p-6 rounded-md relative max-w-full">
          <div className="sm:flex w-full  justify-between align-baseline">
            <TextField
              type="number"
              name="weight"
              id="weight"
              label={formatMessage({
                id: 'weight_gram',
                defaultMessage: 'Weight (Gram)',
              })}
              className="text-sm font-medium text-gray-500 py-2 sm:ml-1   mt-1 w-full"
            />

            <TextField
              name="length"
              id="length"
              type="number"
              label={formatMessage({
                id: 'length_millimeter',
                defaultMessage: 'Length (Millimeter)',
              })}
              className="text-sm font-medium text-gray-500 py-2 ml-1   mt-1 w-full"
            />
          </div>

          <div className="sm:flex max-w-full  justify-between align-baseline">
            <TextField
              type="number"
              name="width "
              id="width "
              label={formatMessage({
                id: 'width',
                defaultMessage: 'Width (Millimeter)',
              })}
              className="text-sm  font-medium text-gray-500 py-2 ml-1  mt-1 w-full"
            />

            <TextField
              name="height"
              type="number"
              id="height"
              label={formatMessage({
                id: 'height',
                defaultMessage: 'Height (Millimeter)',
              })}
              className="text-sm  font-medium text-gray-500 py-2 ml-1  mt-1 w-full"
            />
          </div>

          <SubmitButton
            label={formatMessage({
              id: 'save',
              defaultMessage: 'Save',
            })}
          />
        </div>
      </Form>
    </FormHeader>
  );
};

export default SupplyForm;
