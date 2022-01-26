import { useIntl } from 'react-intl';
import TagInput from '../../common/components/TagInput';
import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const AssortmentForm = ({ onSubmit, onSubmitSuccess }) => {
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    enableReinitialize: true,
    initialValues: {
      isRoot: false,
      title: '',
      tags: [],
    },
  });
  const { formatMessage } = useIntl();

  return (
    <Form form={form}>
      <div className=" space-y-6 sm:space-y-5">
        <TextField
          name="title"
          id="title"
          label={formatMessage({
            id: 'title',
            defaultMessage: 'Title',
          })}
          autoComplete="off"
          required
          className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
        />
        <div className="flex items-center h-5">
          <CheckboxField
            id="isRoot"
            name="isRoot"
            type="checkbox"
            label={formatMessage({
              id: 'root_node',
              defaultMessage: 'Root node',
            })}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
        <TagInput
          onChange={async (value) => {
            await form.formik.setValues({ ...form.formik.values, tags: value });
          }}
        />
      </div>

      <SubmitButton
        label={formatMessage({ id: 'add', defaultMessage: 'Add' })}
      />
    </Form>
  );
};

export default AssortmentForm;
