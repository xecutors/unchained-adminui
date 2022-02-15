import { FieldArray } from 'formik';
import { useIntl } from 'react-intl';
import FormHeader from '../../common/components/FormHeader';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useAllocateWork from '../hooks/useAllocateWork';
import useRegisteredWorkTypes from '../hooks/useRegisteredWorkTypes';

const AllocateWorkForm = () => {
  const { formatMessage } = useIntl();
  const { allocateWork } = useAllocateWork();

  const onSubmit = async ({ types, worker }) => {
    await allocateWork({ types, worker });
    return true;
  };
  const successMessage = formatMessage({
    id: 'work_allocated_success',
    defaultMessage: 'Allocate work successfully!',
  });
  const form = useForm({
    submit: onSubmit,
    successMessage,
    enableReinitialize: true,
    initialValues: {
      types: [''],
      worker: '',
    },
  });

  const { workTypes } = useRegisteredWorkTypes();

  const { values } = form.formik;
  return (
    <FormHeader>
      <Form form={form}>
        <div className="max-w-4xl sm:mr-11 mr-8 mb-3 justify-between align-baseline">
          <div className="sm:py-3">
            <div className="text-sm  font-medium text-gray-500">
              {formatMessage({
                id: 'worker',
                defaultMessage: 'Worker',
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
            className=" text-sm text-gray-900 sm:mt-0 max-w-full"
          />
        </div>
        <FieldArray name="types">
          {({ push, remove: removeConfig }) => (
            <div>
              {values.types.map((p, index) => {
                return (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="flex max-w-4xl align-baseline"
                  >
                    <div className="space-y-3 w-100 sm:pr-2 rounded-md relative w-full">
                      <div className="sm:flex max-w-4xl  justify-between align-baseline">
                        <SelectField
                          className="py-2 text-sm text-gray-500 sm:mt-0 w-full"
                          label={formatMessage({
                            id: 'type',
                            defaultMessage: 'Type',
                          })}
                          placeholder={formatMessage({
                            id: 'type',
                            defaultMessage: 'Type',
                          })}
                          hideLabel
                          name={`types[${index}`}
                          required
                          options={convertArrayOfObjectToObject(
                            workTypes,
                            'label',
                            'value',
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-2  sm:mt-4 mt-5">
                      <button
                        className="items-center px-1 py-1 border shadow-sm text-sm rounded-full text-red-500 bg-white border-red-500 hover:text-white hover:bg-red-500 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-red-500"
                        type="button"
                        onClick={() => removeConfig(index)}
                      >
                        <svg
                          className="h-4 w-4"
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

        <div className="px-5 sm:px-15 space-y-6 sm:p-6 bg-gray-50 text-right">
          <SubmitButton
            label={formatMessage({
              id: 'allocate_work',
              defaultMessage: 'Allocate Work',
            })}
            full
          />
        </div>
      </Form>
    </FormHeader>
  );
};

export default AllocateWorkForm;
