import { useIntl } from 'react-intl';
import FormHeader from '../../common/components/FormHeader';
import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextAreaField from '../../forms/components/TextAreaField';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';


const SupplyForm = () => {
  const { formatMessage } = useIntl();
  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved...',
  });

  const onSubmit = async ({
    weight,
    length,
    width,
    height,
  }) => {
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
            <TextField
              name="weight"
              id="weight"
              label={formatMessage({
                id: 'weight_gram',
                defaultMessage: 'Weight (Gram)',
              })}
              required
              autoComplete="on"
              className="text-sm font-medium text-gray-500 py-2 sm:ml-1   mt-1 w-full"
            />

            <TextField
              name="length"
              id="length"
              label={formatMessage({
                id: 'length_millimeter',
                defaultMessage: 'Length (Millimeter)',
              })}
              required
              autoComplete="on"
              className="text-sm font-medium text-gray-500 py-2 ml-1   mt-1 w-full"
            />
          </div>

          <div className="sm:flex max-w-full  justify-between align-baseline">
            <TextField
              name="width "
              id="width "
              label={formatMessage({
                id: 'width',
                defaultMessage: 'Width (Millimeter)',
              })}
              required
              autoComplete="on"
              className="text-sm  font-medium text-gray-500 py-2 ml-1  mt-1 w-full"
            />

            <TextField
              name="height"
              id="height"
              label={formatMessage({
                id: 'height',
                defaultMessage: 'Height (Millimeter)',
              })}
              required
              autoComplete="on"
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

export default SupplyForm
