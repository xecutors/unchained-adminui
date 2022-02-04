import { useIntl } from 'react-intl';
import FormHeader from '../../common/components/FormHeader';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useProductSupply from '../hooks/useProductSupply';
import useUpdateProductSupply from '../hooks/useUpdateProductSupply';

const SupplyForm = ({ _id: productId }) => {
  const { formatMessage } = useIntl();
  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });
  const { updateProductSupply } = useUpdateProductSupply();
  const { dimensions, loading } = useProductSupply({ productId });
  console.log(dimensions);
  const onSubmit = async ({ weight, length, width, height }) => {
    await updateProductSupply({
      productId,
      weightInGram: parseInt(weight, 10),
      lengthInMillimeters: parseInt(length, 10),
      heightInMillimeters: parseInt(height, 10),
      widthInMillimeters: parseInt(width, 10),
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

export default SupplyForm;
