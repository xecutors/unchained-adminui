import { FieldArray } from 'formik';
import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import DeleteButton from '../../common/components/DeleteButton';
import convertArrayOfObjectToObject from '../../common/convertArrayOfObjectToObject';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';

import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm, {
  OnSubmitSuccessType,
  OnSubmitType,
} from '../../forms/hooks/useForm';
import useFilterTypes from '../hooks/useFilterTypes';

const FilterForm = ({
  onSubmit,
  onSubmitSuccess,
}: {
  onSubmit: OnSubmitType;
  onSubmitSuccess: OnSubmitSuccessType;
}) => {
  const { filterTypes } = useFilterTypes();
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const successMessage = formatMessage({
    id: 'filter_created',
    defaultMessage: 'Filter created successfully!',
  });
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    successMessage,
    enableReinitialize: true,
    initialValues: {
      title: '',
      type: '',
      key: '',
      options: [''],
    },
    getSubmitErrorMessage: (error) => {
      if (error.message?.includes('duplicate key')) {
        form.formik.setFieldError(
          'key',
          formatMessage({
            id: 'filter_key_already_exists',
            defaultMessage:
              'Filter key already exists, please provide unique key',
          }),
        );
        return formatMessage({
          id: 'filter_key_already_exists',
          defaultMessage:
            'Filter key already exists, please provide unique key',
        });
      }
      return (
        error?.message ||
        formatMessage({
          id: 'error-something-went-wrong',
          defaultMessage:
            'Unable to complete the task successfully please try again',
        })
      );
    },
  });

  const { values } = form.formik;

  return (
    <Form form={form}>
      <div className="p-5">
        <TextField
          name="title"
          id="title"
          label={formatMessage({
            id: 'title',
            defaultMessage: 'Title',
          })}
          placeholder={formatMessage({
            id: 'title',
            defaultMessage: 'Title',
          })}
          required
          className="mb-5"
        />

        <TextField
          name="key"
          id="key"
          label={formatMessage({
            id: 'key',
            defaultMessage: 'Key',
          })}
          placeholder={formatMessage({
            id: 'key',
            defaultMessage: 'Key',
          })}
          required
          className="mb-5"
        />

        <SelectField
          className="mb-5"
          label={formatMessage({ id: 'type', defaultMessage: 'Type' })}
          placeholder={formatMessage({ id: 'type', defaultMessage: 'Type' })}
          required
          name="type"
          options={convertArrayOfObjectToObject(filterTypes, 'label', 'value')}
        />

        <FieldArray name="options">
          {({ push, remove: removeConfig }) => (
            <div>
              {values.options.map((p, index) => {
                return (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="mb-3 flex justify-between align-baseline"
                  >
                    <TextField
                      placeholder={formatMessage({
                        id: 'option',
                        defaultMessage: 'Option',
                      })}
                      name={`options[${index}]`}
                      id={`options[${index}]`}
                      required
                      label={formatMessage({
                        id: 'option',
                        defaultMessage: 'Option',
                      })}
                    />
                    <div className="ml-2 flex-shrink-0 mt-8">
                      <DeleteButton onClick={() => removeConfig(index)} />
                    </div>
                  </div>
                );
              })}
              <div className="mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className=" mt-2 flex-shrink-0">
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="items-right inline-flex rounded border border-transparent bg-indigo-500 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                      onClick={() => push('')}
                    >
                      <svg
                        className="h-5 w-5"
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
                      <span className="ml-2">
                        {formatMessage({
                          id: 'add_option',
                          defaultMessage: 'Add option',
                        })}{' '}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </FieldArray>
      </div>
      <FormErrors />
      <div className="sm:px-15 space-y-6 bg-slate-50 dark:bg-slate-800 border-t-indigo-50 dark:border-t-slate-700 p-5 text-right">
        <SubmitButton
          hidden={!hasRole('addFilter')}
          label={formatMessage({
            id: 'create_filter',
            defaultMessage: 'Create Filter',
          })}
        />
      </div>
    </Form>
  );
};

export default FilterForm;
