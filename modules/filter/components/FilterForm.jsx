import { FieldArray } from 'formik';
import { useIntl } from 'react-intl';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useFilterTypes from '../hooks/useFilterTypes';

const FilterForm = ({ onSubmit, onSubmitSuccess }) => {
  const { filterTypes } = useFilterTypes();
  const { formatMessage } = useIntl();
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
  });

  const { values } = form.formik;

  return (
    <Form form={form}>
      <div className="m-5">
        <TextField
          name="title"
          id="title"
          label={formatMessage({
            id: 'title',
            defaultMessage: 'Title',
          })}
          hideLabel
          placeholder={formatMessage({
            id: 'title',
            defaultMessage: 'Title',
          })}
          required
          className="mb-5 block w-full max-w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />

        <TextField
          name="key"
          id="key"
          label={formatMessage({
            id: 'key',
            defaultMessage: 'Key',
          })}
          hideLabel
          placeholder={formatMessage({
            id: 'key',
            defaultMessage: 'Key',
          })}
          required
          className="mb-5 block w-full max-w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />

        <SelectField
          className="mb-5 w-full shadow-sm"
          label={formatMessage({ id: 'type', defaultMessage: 'Type' })}
          placeholder={formatMessage({ id: 'type', defaultMessage: 'Type' })}
          hideLabel
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
                    className="flex justify-between align-baseline"
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
                      hideLabel
                      className="w-full shadow-sm"
                    />
                    <div className="ml-2 mt-5 flex-shrink-0 sm:mt-4">
                      <button
                        className="items-center rounded-full border border-red-500 bg-white px-1 py-1 text-sm text-red-500 shadow-sm hover:bg-red-500 hover:text-white focus:outline-none focus:ring-0 focus:ring-red-500 focus:ring-offset-2"
                        type="button"
                        onClick={() => removeConfig(index)}
                      >
                        <svg
                          className=" h-4 w-4 text-red-500"
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
                <div className=" mt-2 flex-shrink-0">
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="items-right inline-flex rounded border border-transparent bg-indigo-600 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      variant="outlined"
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
                      <span className="ml-2">Add Option</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </FieldArray>
      </div>
      <FormErrors />
      <div className="sm:px-15 space-y-6 bg-gray-50 p-5 text-right sm:p-6">
        <SubmitButton
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
