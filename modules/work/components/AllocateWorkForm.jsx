import { FieldArray } from 'formik';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import FormWrapper from '../../common/components/FormWrapper';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import ACTION_ROLES from '../../common/data/roles';
import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useAllocateWork from '../hooks/useAllocateWork';
import useRegisteredWorkTypes from '../hooks/useRegisteredWorkTypes';

const AllocateWorkForm = () => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { allocateWork } = useAllocateWork();
  const { hasRole } = useAuth();

  const onSubmit = async ({ types, worker }) => {
    const { data, errors } = await allocateWork({ types, worker });
    if (errors.length) return false;
    return { success: true, data: data?.allocateWork };
  };

  const onSubmitSuccess = (_, { _id }) => {
    router.push(`/works/${_id}`);
  };
  const successMessage = formatMessage({
    id: 'work_allocated_success',
    defaultMessage: 'Allocate work successfully!',
  });
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
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
    <FormWrapper>
      <Form form={form}>
        <div className="p-6">
          <div className="mb-3">
            <TextField
              name="worker"
              id="worker"
              label={formatMessage({
                id: 'worker',
                defaultMessage: 'Worker',
              })}
              labelClassName="text-sm font-medium text-slate-500 mb-1"
              placeholder={formatMessage({
                id: 'worker',
                defaultMessage: 'Worker',
              })}
              className="max-w-full text-sm text-slate-900 sm:mt-0"
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
                      className="flex max-w-4xl items-center"
                    >
                      <div className="w-100 relative w-full space-y-1 rounded-md sm:pr-2">
                        <div className="max-w-4xl justify-between align-baseline sm:flex">
                          <SelectField
                            className="w-full py-2 text-sm text-slate-500 dark:text-white sm:mt-0"
                            label={formatMessage({
                              id: 'type',
                              defaultMessage: 'Type',
                            })}
                            placeholder={formatMessage({
                              id: 'type',
                              defaultMessage: 'Type',
                            })}
                            labelClassName="text-sm font-medium text-slate-500 mb-1"
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
                      <div className="ml-2 mt-5  flex-shrink-0 sm:mt-4">
                        <button
                          className="items-center rounded-full bg-white px-1 py-1 text-sm text-red-500 hover:bg-red-50 focus:outline-none focus:ring-0 focus:ring-red-500 focus:ring-offset-2"
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
                <div className="mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                  <div className=" " />
                  <div className=" mt-2 flex-shrink-0">
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className="items-right inline-flex rounded-full border border-transparent bg-indigo-500 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
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
        <div className="border-t-indigo-50 border-t sm:px-15 space-y-6 bg-slate-50 dark:bg-slate-500 px-5 py-6 text-right">
          <SubmitButton
            hidden={!hasRole(ACTION_ROLES.work.allocateWork)}
            label={formatMessage({
              id: 'allocate_work',
              defaultMessage: 'Allocate Work',
            })}
            full
          />
        </div>
      </Form>
    </FormWrapper>
  );
};

export default AllocateWorkForm;
