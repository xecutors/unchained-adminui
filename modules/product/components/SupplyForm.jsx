import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import FormWrapper from '../../common/components/FormWrapper';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import { validateInteger } from '../../forms/lib/validators';
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
      weightInGram: weight,
      lengthInMillimeters: length,
      heightInMillimeters: height,
      widthInMillimeters: width,
    });
    return true;
  };

  const form = useForm({
    submit: onSubmit,
    getSubmitErrorMessage: (error) => {
      if (
        error.message.includes('supply.weightInGram') &&
        error.message.includes('Expected type Int')
      ) {
        form.formik.setFieldError(
          'weight',
          'Invalid value, only integer is accepted',
        );
      } else if (
        error.message.includes('supply.heightInMillimeters') &&
        error.message.includes('Expected type Int')
      ) {
        form.formik.setFieldError(
          'height',
          'Invalid value, only integer is accepted',
        );
      } else if (
        error.message.includes('supply.lengthInMillimeters') &&
        error.message.includes('Expected type Int')
      ) {
        form.formik.setFieldError(
          'length',
          'Invalid value, only integer is accepted',
        );
      }
    },
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
    <FormWrapper>
      <Form form={form}>
        <div className="relative bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <TextField
                validators={[validateInteger()]}
                type="number"
                name="weight"
                id="weight"
                label={formatMessage({
                  id: 'weight_gram',
                  defaultMessage: 'Weight (Gram)',
                })}
                className="text-sm font-medium text-slate-500"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <TextField
                validators={[validateInteger()]}
                name="length"
                id="length"
                type="number"
                label={formatMessage({
                  id: 'length_millimeter',
                  defaultMessage: 'Length (Millimeter)',
                })}
                className="text-sm font-medium text-slate-500"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <TextField
                validators={[validateInteger()]}
                type="number"
                name="width"
                id="width "
                label={formatMessage({
                  id: 'width',
                  defaultMessage: 'Width (Millimeter)',
                })}
                className="text-sm  font-medium text-slate-500"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <TextField
                validators={[validateInteger()]}
                name="height"
                type="number"
                id="height"
                label={formatMessage({
                  id: 'height',
                  defaultMessage: 'Height (Millimeter)',
                })}
                className="text-sm  font-medium text-slate-500"
              />
            </div>
          </div>
        </div>
        <FormErrors />
        <div className="border-t-indigo-50 border-t space-y-6 bg-slate-50 text-right sm:p-6">
          <SubmitButton
            label={formatMessage({
              id: 'save',
              defaultMessage: 'Save',
            })}
            full
          />
        </div>
      </Form>
    </FormWrapper>
  );
};

export default SupplyForm;
