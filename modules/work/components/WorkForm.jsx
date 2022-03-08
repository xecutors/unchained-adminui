import { useIntl } from 'react-intl';
import FormHeader from '../../common/components/FormHeader';
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
    id: 'work_added',
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
      input: JSON.parse(userInput || []),
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
      input: [],
    },
  });

  return (
    <FormHeader>
      <Form form={form}>
        <div className="space-y-6 sm:p-6 rounded-md relative max-w-full">
          <div className="sm:flex max-w-4xl justify-between align-baseline">
            <div className="py-3">
              <div className="text-sm font-medium text-gray-500">
                {formatMessage({ id: 'type', defaultMessage: 'Type' })}
              </div>
            </div>
            <SelectField
              className="py-2 sm:ml-2 text-sm text-gray-900 sm:mt-0 w-full"
              label={formatMessage({ id: 'type', defaultMessage: 'Type' })}
              hideLabel
              name="type"
              required
              options={convertArrayOfObjectToObject(
                workTypes,
                'label',
                'value',
              )}
            />
          </div>
          <div className="sm:flex max-w-4xl  justify-between align-baseline">
            <div className="sm:py-3">
              <div className="text-sm  font-medium text-gray-500">
                {formatMessage({
                  id: 'priority',
                  defaultMessage: 'Priority',
                })}
              </div>
            </div>

            <TextField
              name="priority"
              id="priority"
              label={formatMessage({
                id: 'priority',
                defaultMessage: 'Priority',
              })}
              hideLabel
              placeholder={formatMessage({
                id: 'priority',
                defaultMessage: 'Priority',
              })}
              required
              autoComplete="on"
              className="py-2 sm:ml-1 text-sm text-gray-900 sm:mt-0 w-full"
            />

            <div className="sm:py-3 sm:ml-4 ">
              <div className="text-sm  font-medium text-gray-500">
                {formatMessage({
                  id: 'retries',
                  defaultMessage: 'Retries',
                })}
              </div>
            </div>
            <TextField
              name="retries"
              id="retries"
              label={formatMessage({
                id: 'retries',
                defaultMessage: 'Retries',
              })}
              hideLabel
              placeholder={formatMessage({
                id: 'retries',
                defaultMessage: 'Retries',
              })}
              required
              autoComplete="on"
              className="py-2 sm:ml-1 text-sm text-gray-900 sm:mt-0 w-full"
            />
          </div>

          <div className="sm:flex max-w-4xl  justify-between align-baseline">
            <div className="sm:py-3">
              <div className="text-sm  font-medium text-gray-500">
                {formatMessage({
                  id: 'original_work_id',
                  defaultMessage: 'Original Work Id',
                })}
              </div>
            </div>
            <TextField
              name="originalWorkId"
              id="original_work_id"
              label={formatMessage({
                id: 'original_work_id',
                defaultMessage: 'Original Work Id',
              })}
              hideLabel
              placeholder={formatMessage({
                id: 'original_work_id',
                defaultMessage: 'Original Work Id',
              })}
              autoComplete="on"
              className="py-2 sm:ml-1 sm:pr-4 text-sm text-gray-900 sm:mt-0 w-full"
            />
            <div className="sm:py-3">
              <div className="text-sm  font-medium text-gray-500">
                {formatMessage({
                  id: 'scheduled',
                  defaultMessage: 'Scheduled',
                })}
              </div>
            </div>

            <DatePickerField
              label={formatMessage({
                id: 'scheduled',
                defaultMessage: 'Scheduled',
              })}
              hideLabel
              className="py-2 sm:ml-1 text-sm text-gray-900 sm:mt-0 w-full "
              name="scheduled"
              placeholder={formatMessage({
                id: 'scheduled',
                defaultMessage: 'Scheduled',
              })}
            />
          </div>

          <div>
            <div className=" text-lg font-sm text-gray-500">
              {formatMessage({
                id: 'input',
                defaultMessage: 'Input',
              })}
            </div>
            <JSONAreaField
              name="input"
              hideLabel
              label={formatMessage({
                id: 'input',
                defaultMessage: 'Input',
              })}
            />
          </div>
        </div>
        <FormErrors />

        <div className="px-5 sm:px-15 space-y-6 sm:p-6 bg-gray-50 text-right">
          <SubmitButton
            label={formatMessage({
              id: 'add_work',
              defaultMessage: 'Add Work',
            })}
          />
        </div>
      </Form>
    </FormHeader>
  );
};

export default WorkForm;
