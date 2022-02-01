import { useIntl } from 'react-intl';
import FormHeader from '../../common/components/FormHeader';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const WarehousingForm = () => {
  const { formatMessage } = useIntl();
  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved...',
  });

  const onSubmit = async ({
    sku,
    base_unit,
  }) => {
    return true;
  };

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      suk: '',
      base_unit: '',
    },
  });
  const { values } = form.formik;
  return (
    <FormHeader>
      <Form form={form}>
      
        <div className="space-y-6 sm:p-6 rounded-md relative max-w-full">
          <div className=" w-full  justify-between align-baseline">
            <TextField
              name="suk"
              id="suk"
              label={formatMessage({
                id: 'suk',
                defaultMessage: 'SUK',
              })}
              required
              autoComplete="on"
              className="text-sm font-medium text-gray-500 py-2 sm:ml-1   mt-1 w-full"
            />

            <TextField
              name="base_unit"
              id="base_unit"
              label={formatMessage({
                id: 'base_unit',
                defaultMessage: 'Base Unit',
              })}
              required
              autoComplete="on"
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
