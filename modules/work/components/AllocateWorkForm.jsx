import { Form } from 'formik';
import { useIntl } from 'react-intl';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const AllocateWorkForm = ({
  onSubmit = () => true,
  onSubmitSuccess = () => true,
}) => {
  const { formatMessage } = useIntl();
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    enableReinitialize: true,
    initialValues: {
      type: '',
    },
  });

  const WorkTypes = {
    EXTERNAL: 'EXTERNAL',
    BULK_IMPORT: 'BULK_IMPORT',
    PUBLICARE_SYNC: 'PUBLICARE_SYNC',
    HTTP_REQUEST: 'HTTP_REQUEST',
  };
  return (
    <Form form={form}>
      <div className="space-y-6 sm:p-6 rounded-md relative max-w-full">
        <div className="sm:flex max-w-4xl  justify-between align-baseline">
          <div className="py-3">
            <div className="text-sm  font-medium text-gray-500">
              {formatMessage({ id: 'type', defaultMessage: 'Type' })}
            </div>
          </div>
          <SelectField
            className="py-2 sm:ml-2 text-sm text-gray-900 sm:mt-0 w-full"
            label={formatMessage({ id: 'type', defaultMessage: 'Type' })}
            hideLabel
            name="type"
            required
            options={WorkTypes}
          />
        </div>
      </div>
      <div className="sm:flex max-w-4xl  justify-between align-baseline">
        <div className="sm:py-3">
          <div className="text-sm  font-medium text-gray-500">
            {formatMessage({
              id: 'worker',
              defaultMessage: 'worker',
            })}
          </div>
        </div>

        <TextField
          name="worker"
          id="worker"
          label={formatMessage({
            id: 'worker',
            defaultMessage: 'Worker',
          })}
          hideLabel
          placeholder={formatMessage({
            id: 'worker',
            defaultMessage: 'Worker',
          })}
          required
          autoComplete="on"
          className="py-2 sm:ml-1 text-sm text-gray-900 sm:mt-0 w-full"
        />
      </div>
      <div className="mx-auto sm:w-1/2 ">
        <SubmitButton
          label={formatMessage({
            id: 'add_allocate_work',
            defaultMessage: 'Add Allocate Work',
          })}
          className="py-6 h-9 "
          full
        />
      </div>
    </Form>
  );
};

export default AllocateWorkForm;
