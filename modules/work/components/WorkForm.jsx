import { useIntl } from 'react-intl';
import FormWrapper from '../../common/components/FormWrapper';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';

import DatePickerField from '../../forms/components/DatePickerField';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import JSONAreaField from '../../forms/components/JSONAreaField';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useAddWork from '../hooks/useAddWork';
import useRegisteredWorkTypes from '../hooks/useRegisteredWorkTypes';

const WorkForm = () => {
  const { formatMessage } = useIntl();
  const { workTypes } = useRegisteredWorkTypes();
  const { addWork } = useAddWork();
  const successMessage = formatMessage({
    id: 'work_added_success',
    defaultMessage: 'Work added successfully!',
  });

  const onSubmit = async ({
    type,
    retries: inputRetry,
    priority: inputPriority,
    input: userInput,
    scheduled,
    originalWorkId,
  }) => {
    await addWork({
      type,
      retries: parseInt(inputRetry, 10),
      priority: parseInt(inputPriority, 10),
      input: JSON.parse(userInput || '[]'),
      scheduled,
      originalWorkId,
    });
    return true;
  };

  const form = useForm({
    submit: onSubmit,
    successMessage,
    enableReinitialize: true,
    initialValues: {
      priority: '',
      retries: '',
      originalWorkId: null,
      scheduled: null,
      type: '',
      input: '',
    },
  });

  return (
    <FormWrapper>
      <Form form={form}>
        <div className="relative max-w-full space-y-6 rounded-md p-6">
          <div className="max-w-4xl justify-between align-baseline sm:flex">
            <SelectField
              className="w-full py-2 text-sm text-gray-900 sm:mt-0"
              label={formatMessage({ id: 'type', defaultMessage: 'Type' })}
              placeholder={formatMessage({
                id: 'type',
                defaultMessage: 'Type',
              })}
              labelClassName="text-sm font-medium text-gray-500 mb-1"
              name="type"
              required
              options={convertArrayOfObjectToObject(
                workTypes,
                'label',
                'value',
              )}
            />
          </div>
          <div className="max-w-4xl justify-between  align-baseline sm:flex sm:gap-4">
            <TextField
              name="priority"
              id="priority"
              label={formatMessage({
                id: 'priority',
                defaultMessage: 'Priority',
              })}
              labelClassName="text-sm font-medium text-gray-500 mb-1"
              placeholder={formatMessage({
                id: 'priority',
                defaultMessage: 'Priority',
              })}
              required
              autoComplete="on"
              className="w-full py-2 text-sm text-gray-900 sm:mt-0"
            />

            <TextField
              name="retries"
              id="retries"
              label={formatMessage({
                id: 'retries',
                defaultMessage: 'Retries',
              })}
              labelClassName="text-sm  font-medium text-gray-500 mb-1"
              placeholder={formatMessage({
                id: 'retries',
                defaultMessage: 'Retries',
              })}
              required
              autoComplete="on"
              className="w-full py-2 text-sm text-gray-900 sm:mt-0"
            />
          </div>

          <div className="max-w-4xl justify-between align-baseline sm:flex sm:gap-4">
            <TextField
              name="originalWorkId"
              id="original_work_id"
              label={formatMessage({
                id: 'original_work_id',
                defaultMessage: 'Original Work Id',
              })}
              labelClassName="text-sm font-medium text-gray-500 mb-1"
              placeholder={formatMessage({
                id: 'original_work_id',
                defaultMessage: 'Original Work Id',
              })}
              autoComplete="on"
              className="w-full py-2 text-sm text-gray-900 sm:mt-0"
            />

            <DatePickerField
              label={formatMessage({
                id: 'scheduled',
                defaultMessage: 'Scheduled',
              })}
              labelClassName="text-sm font-medium text-gray-500 mb-1"
              className="w-full py-2 text-sm text-gray-900 sm:mt-0 "
              name="scheduled"
              placeholder={formatMessage({
                id: 'scheduled',
                defaultMessage: 'Scheduled',
              })}
            />
          </div>

          <div>
            <JSONAreaField
              name="input"
              labelClassName="font-sm text-gray-500 mb-1"
              label={formatMessage({
                id: 'input',
                defaultMessage: 'Input',
              })}
              placeholder={formatMessage({
                id: 'input',
                defaultMessage: 'Input',
              })}
            />
          </div>
        </div>
        <FormErrors />

        <div className="sm:px-15 space-y-6 bg-gray-50 p-5 text-right">
          <SubmitButton
            label={formatMessage({
              id: 'add_work',
              defaultMessage: 'Add Work',
            })}
          />
        </div>
      </Form>
    </FormWrapper>
  );
};

export default WorkForm;
