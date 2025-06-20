import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';

import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TagInputField from '../../forms/components/TagInputField';
import TextField from '../../forms/components/TextField';
import useForm, {
  OnSubmitSuccessType,
  OnSubmitType,
} from '../../forms/hooks/useForm';
import { PRODUCT_TYPES } from '../ProductTypes';

const ProductForm = ({
  onSubmit,
  onSubmitSuccess,
  selectedLocale,
}: {
  onSubmit: OnSubmitType;
  onSubmitSuccess: OnSubmitSuccessType;
  selectedLocale?: string;
}) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const successMessage = formatMessage({
    id: 'product_added',
    defaultMessage: 'Product added successfully!',
  });
  const form = useForm({
    submit: ({ title, subtitle, ...rest }) =>
      onSubmit({
        texts: [{ title, subtitle, locale: selectedLocale }],
        ...rest,
      }),
    onSubmitSuccess,
    enableReinitialize: true,
    successMessage,
    initialValues: {
      title: '',
      type: '',
      tags: [],
    },
  });

  return (
    <Form form={form}>
      <div className="p-5 pb-7 sm:max-w-full">
        <TextField
          name="title"
          id="name"
          label={formatMessage({
            id: 'name',
            defaultMessage: 'Name',
          })}
          placeholder={formatMessage({
            id: 'name',
            defaultMessage: 'Name',
          })}
          required
          className="block w-full max-w-full rounded-md border-slate-200 dark:border-slate-800 text-sm focus:border-slate-800 focus:ring-slate-800 sm:text-sm"
        />

        <TextField
          name="subtitle"
          id="subtitle"
          label={formatMessage({
            id: 'subtitle',
            defaultMessage: 'Subtitle',
          })}
          placeholder={formatMessage({
            id: 'subtitle',
            defaultMessage: 'Subtitle',
          })}
          className="block w-full max-w-full rounded-md border-slate-200 dark:border-slate-800 text-sm focus:border-slate-800 focus:ring-slate-800 sm:text-sm"
        />

        <div className="my-5 flex items-center">
          <SelectField
            className="mt-1 w-full"
            label={formatMessage({ id: 'type', defaultMessage: 'Type' })}
            placeholder={formatMessage({ id: 'type', defaultMessage: 'Type' })}
            required
            name="type"
            options={PRODUCT_TYPES}
          />
        </div>
        <TagInputField
          name="tags"
          label={formatMessage({ id: 'tags', defaultMessage: 'Tags' })}
        />
      </div>

      <div className="space-y-6 border-t border-t-slate-100 dark:border-t-slate-700 bg-slate-50 dark:bg-slate-800 p-5 text-right">
        <SubmitButton
          hidden={!hasRole('addProduct')}
          label={formatMessage({
            id: 'add_product',
            defaultMessage: 'Add product',
          })}
        />
      </div>
    </Form>
  );
};

export default ProductForm;
