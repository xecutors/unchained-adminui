import { FieldArray } from 'formik';
import { useIntl } from 'react-intl';
import DatePickerField from '../../forms/components/DatePickerField';
import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

const WorkForm = ({ onSubmit = () => true, onSubmitSuccess = () => true }) => {
  const { formatMessage } = useIntl();
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    enableReinitialize: true,
    initialValues: {
      adapterKey: '',
      type: '',
      input: [],
    },
  });

  const WorkTypes = {
    EXTERNAL: 'EXTERNAL',
    BULK_IMPORT: 'BULK_IMPORT',
    PUBLICARE_SYNC: 'PUBLICARE_SYNC',
    HTTP_REQUEST: 'HTTP_REQUEST',
  };
  const { values } = form.formik;
  return (
    <Form form={form}>
      <div className="space-y-6 sm:p-6 rounded-md relative max-w-4xl">
        <div className="flex max-w-4xl justify-between align-baseline">
          <TextField
            name="originalWorkId"
            id="original_work_id"
            label={formatMessage({
              id: 'original_work_id',
              defaultMessage: 'Work Id',
            })}
            hideLabel
            placeholder={formatMessage({
              id: 'original_work_id',
              defaultMessage: 'Work Id',
            })}
            required
            autoComplete="on"
            className="mr-2 text-sm block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
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
            className="text-sm block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="flex">
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
            className="mr-2 text-sm block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          />

          <DatePickerField
            label={formatMessage({
              id: 'scheduled',
              defaultMessage: 'Scheduled',
            })}
            hideLabel
            className="w-full mt-0"
            name="scheduled"
            placeholder={formatMessage({
              id: 'scheduled',
              defaultMessage: 'Scheduled',
            })}
          />
        </div>
        <div className="flex w-full">
          <SelectField
            className="w-full mt-0"
            label={formatMessage({ id: 'type', defaultMessage: 'Type' })}
            hideLabel
            name="type"
            options={WorkTypes}
          />
          <div className="w-full" />
        </div>

        <FieldArray name="input">
          {({ push, remove: removeConfig }) => (
            <div>
              {values.input.map((p, index) => {
                return (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="flex max-w-4xl align-baseline"
                  >
                    <TextField
                      placeholder={formatMessage({
                        id: 'key',
                        defaultMessage: 'Key',
                      })}
                      className="w-full mr-2"
                      name={`input[${index}].key`}
                      id={`input[${index}].key`}
                      required
                      label={formatMessage({
                        id: 'input_key',
                        defaultMessage: 'Input Key',
                      })}
                      hideLabel
                    />
                    <TextField
                      placeholder={formatMessage({
                        id: 'value',
                        defaultMessage: 'Value',
                      })}
                      className="w-full mr-3"
                      name={`input[${index}].value`}
                      id={`input[${index}].value`}
                      required
                      label={formatMessage({
                        id: 'input_value',
                        defaultMessage: 'Input value',
                      })}
                      hideLabel
                    />
                    <button
                      className="mt-2 mr-2 items-center text-red-500 align-baseline"
                      type="button"
                      onClick={() => removeConfig(index)}
                    >
                      <svg
                        className="mt-1 h-4 w-4 text-red-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {' '}
                        <polyline points="3 6 5 6 21 6" />{' '}
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{' '}
                        <line x1="10" y1="11" x2="10" y2="17" />{' '}
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </div>
                );
              })}
              <div className="mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                <div className=" " />
                <div className=" mt-2 flex-shrink-0">
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex items-right px-2 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      variant="outlined"
                      onClick={() => push('')}
                    >
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </FieldArray>
      </div>

      <SubmitButton
        label={formatMessage({ id: 'add_work', defaultMessage: 'Add Work' })}
        className="ml-6"
      />
    </Form>
  );
};

export default WorkForm;
