import { useIntl } from 'react-intl';
import UserTagsView from '../../accounts/components/UserTagsView';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const ProductForm = ({ onSubmit, onSubmitSuccess, tags, _id }) => {
  const { formatMessage } = useIntl();

  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    enableReinitialize: true,
    initialValues: {
      adapterKey: '',
      type: '',
    },
  });

  return (
    <Form form={form}>
      <div className="space-y-6 sm:space-y-5">
        <TextField
          name="title"
          id="title"
          label={formatMessage({
            id: 'title',
            defaultMessage: 'Title',
          })}
          hideLabel
          placeholder={formatMessage({
            id: 'title',
            defaultMessage: 'Title',
          })}
          required
          autoComplete="on"
          className="text-sm block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />

       <TextField
          name="type"
          id="type"
          label={formatMessage({
            id: 'type',
            defaultMessage: 'Type',
          })}
          hideLabel
          placeholder={formatMessage({
            id: 'type',
            defaultMessage: 'Type',
          })}
          required
          autoComplete="on"
          className="text-sm block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />
        <UserTagsView tags={tags} productId={_id} />
      </div>

      <SubmitButton
        label={formatMessage({ id: 'add', defaultMessage: 'Add Product' })}
      />
    </Form>
  );
};

export default ProductForm;
