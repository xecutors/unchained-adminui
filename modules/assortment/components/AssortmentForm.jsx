import { useIntl } from 'react-intl';
import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TagInputField from '../../forms/components/TagInputField';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const AssortmentForm = ({ onSubmit, onSubmitSuccess }) => {
  const { formatMessage } = useIntl();
  const successMessage = formatMessage({
    id: 'assortment_added',
    defaultMessage: 'Assortment added successfully!',
  });
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    successMessage,
    enableReinitialize: true,
    initialValues: {
      isRoot: false,
      title: '',
      tags: [],
    },
  });

  return (
    <Form form={form}>
      <div className="py-5 px-5">
        <TextField
          name="title"
          id="title"
          label={formatMessage({
            id: 'title',
            defaultMessage: 'Title',
          })}
          autoComplete="off"
          required
          className="mb-5"
        />

        <TagInputField
          name="tags"
          id="tags"
          label={formatMessage({ id: 'tags', defaultMessage: 'Tags' })}
        />
      </div>
      <div className="mx-5 mb-5 flex h-5 items-center">
        <CheckboxField
          id="isRoot"
          name="isRoot"
          type="checkbox"
          label={formatMessage({
            id: 'root_node',
            defaultMessage: 'Root node',
          })}
          className="mr-2 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
        />
      </div>
      <div className="border-t-indigo-50 border-t sm:px-15 space-y-6 bg-slate-50 p-5 text-right">
        <SubmitButton
          label={formatMessage({
            id: 'add_assortment',
            defaultMessage: 'Add Assortment',
          })}
        />
      </div>
    </Form>
  );
};

export default AssortmentForm;
