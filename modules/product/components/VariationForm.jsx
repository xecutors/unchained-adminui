import { useIntl } from 'react-intl';
import FormWrapper from '../../common/components/FormWrapper';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';

import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useCreateProductVariation from '../hooks/useCreateProductVariation';
import useProductVariations from '../hooks/useProductVariations';
import useProductVariationTypes from '../hooks/useProductVariationTypes';
/* import useUpdateProductVariationTexts from '../hooks/useUpdateProductVariationTexts'; */
import ProductAssignmentListItem from './ProductAssignmentListItem';

export const userCalculation = {
  color_picker: 'Color Picker',
  text_answers: 'Text Answers',
};

const VariationForm = ({ productId, selectedLocale }) => {
  const { formatMessage } = useIntl();
  const { updateProductVariationTexts } = useUpdateProductVariationTexts();
  const { createProductVariation } = useCreateProductVariation();

  const { variations } = useProductVariations({ productId });
  const { variationTypes } = useProductVariationTypes();
  console.log(variations);

  const onSubmit = async ({ title, key, type }) => {
    await createProductVariation({ productId, key, type, title });
  };
  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      title: '',
      key: '',
      type: '',
    },
  });

  return (
    <div className=" bg-white">
      <FormWrapper>
        <Form form={form}>
          <div className="space-y-6 sm:p-6 rounded-md relative max-w-full">
            <div className="sm:flex max-w-full  justify-between align-baseline">
              <TextField
                name="title"
                id="title"
                label={formatMessage({
                  id: 'title',
                  defaultMessage: 'Title',
                })}
                required
                autoComplete="on"
                className="text-sm  font-medium text-gray-500 py-2 sm:ml-1 mt-1 w-full"
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
                className="text-sm  font-medium text-gray-500 py-2  sm:ml-1 mt-1 w-full"
              />
            </div>
            <SelectField
              className="text-sm  font-medium text-gray-500 py-1.5 w-full mt-2.5"
              label={formatMessage({
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
      </FormWrapper>
      <div className="shadow bg-white">
        <label className="text-sm font-sans text-black lg:not-sr-only sr-only flex w-full">
          <span className="flex w-full">
            <span className="w-full">
              {' '}
              {formatMessage({
                id: 'max_quantity',
                defaultMessage: 'Max Quantity',
              })}{' '}
            </span>
          </span>
        </label>
        <table className="bg-white min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {formatMessage({
                  id: 'product',
                  defaultMessage: 'Product',
                })}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {formatMessage({ id: 'options', defaultMessage: 'Options' })}
              </th>
            </tr>
          </thead>
          <tbody>
            {variations?.map((variation) => (
              <ProductAssignmentListItem
                key-={variation._id}
                variation={variation}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VariationForm;
