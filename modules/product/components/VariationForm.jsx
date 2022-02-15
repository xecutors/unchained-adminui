import { useIntl } from 'react-intl';
import FormHeader from '../../common/components/FormHeader';

import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
/* import useUpdateProductVariationTexts from '../hooks/useUpdateProductVariationTexts'; */
import ProductAssignmentListItem from './ProductAssignmentListItem';

export const userCalculation = {
  color_picker: 'Color Picker',
  text_answers: 'Text Answers',
};

const VariationForm = ({ products }) => {
  const { formatMessage } = useIntl();
  /*   const { updateProductVariationTexts } = useUpdateProductVariationTexts(); */
  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const form = useForm({
    submit: () => true,
    successMessage,
    initialValues: {
      title: '',
      key: '',
      type: '',
    },
  });

  return (
    <div className=" bg-white">
      <FormHeader>
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
              options={userCalculation}
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
      </FormHeader>
      <div className="shadow bg-white">
        <label className="text-sm font-sans text-black lg:not-sr-only sr-only flex w-full">
          <span className="flex w-full">
            <samp className="w-full  ">
              {' '}
              {formatMessage({
                id: 'max_quantity',
                defaultMessage: 'Max Quantity',
              })}{' '}
            </samp>
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
                {formatMessage({ id: '0ptions', defaultMessage: 'Options' })}
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <ProductAssignmentListItem key-={product._id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VariationForm;
