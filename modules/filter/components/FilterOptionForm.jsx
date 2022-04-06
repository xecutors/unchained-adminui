import { useIntl } from 'react-intl';
import useCurrentRoles from '../../accounts/hooks/useCurrentRoles';
import ACTION_ROLES from '../../common/data/roles';
import Form from '../../forms/components/Form';

import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const FilterOptionForm = ({ onCancel, onSubmit }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useCurrentRoles();
  const successMessage = formatMessage({
    id: 'filter_option_added_success',
    defaultMessage: 'Filter option added successfully',
  });

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      title: '',
      value: '',
    },
  });
  return (
    <Form form={form}>
      <div className="flex gap-2">
        <TextField
          name="value"
          label={formatMessage({
            id: 'filter_option_value',
            defaultMessage: 'Value',
          })}
          placeholder={formatMessage({
            id: 'filter_option_value',
            defaultMessage: 'Value',
          })}
          required
        />
        <TextField
          name="title"
          label={formatMessage({
            id: 'filter_option_title',
            defaultMessage: 'Title',
          })}
          placeholder={formatMessage({
            id: 'filter_option_title',
            defaultMessage: 'Title',
          })}
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={onCancel}
          type="button"
          className="mb-5 mt-5 mr-2  h-9 rounded-md border border-transparent border-slate-300 bg-white px-3 py-1 text-sm font-medium leading-5 text-slate-700 shadow-sm"
        >
          {formatMessage({ id: 'cancel', defaultMessage: 'Cancel' })}
        </button>
        <span className="flex items-center">
          <SubmitButton
            hidden={!hasRole(ACTION_ROLES.filters.createOption)}
            className="m-auto w-full"
            label={formatMessage({
              id: 'add_filter_option',
              defaultMessage: 'Add option',
            })}
          />
        </span>
      </div>
    </Form>
  );
};

export default FilterOptionForm;
