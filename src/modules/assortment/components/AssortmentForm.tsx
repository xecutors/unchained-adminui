import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import SubmitButton from '../../forms/components/SubmitButton';
import TagInputField from '../../forms/components/TagInputField';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const AssortmentForm = ({
  onSubmit,
  onSubmitSuccess,
  selectedLocale = null,
}) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const successMessage = formatMessage({
    id: 'assortment_added',
    defaultMessage: 'Assortment added successfully!',
  });
  const form = useForm({
    submit: async (data) => onSubmit({ ...data, locale: selectedLocale }),
    onSubmitSuccess,
    successMessage,
    enableReinitialize: true,
    initialValues: {
      isRoot: true,
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
        <TextField
          name="subtitle"
          id="subtitle"
          label={formatMessage({
            id: 'subtitle',
            defaultMessage: 'Subtitle',
          })}
          autoComplete="off"
          className="mb-5"
        />

        <TagInputField
          name="tags"
          id="tags"
          label={formatMessage({ id: 'tags', defaultMessage: 'Tags' })}
        />
      </div>
      <div className="mx-5 mb-5">
        <CheckboxField
          id="isRoot"
          name="isRoot"
          type="checkbox"
          label={formatMessage({
            id: 'root_node',
            defaultMessage: 'Root node',
          })}
          className="mr-2 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
          containerClassName="flex items-center"
        />
        <span className="block text-sm text-slate-400 dark:text-slate-500">
          {formatMessage({
            id: 'root_description',
            defaultMessage: 'This makes the assortment is a top level',
          })}
        </span>
      </div>
      <FormErrors />
      <div className="border-t-indigo-50 border-t dark:border-t-slate-700 sm:px-15 space-y-6 bg-slate-50 dark:bg-slate-800 p-5 text-right">
        <SubmitButton
          hidden={!hasRole('addAssortment')}
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
