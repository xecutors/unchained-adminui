import { FieldArray } from 'formik';
import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import ACTION_ROLES from '../../common/data/roles';
import Form from '../../forms/components/Form';

import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useFilterTypes from '../hooks/useFilterTypes';

const FilterForm = ({ onSubmit, onSubmitSuccess }) => {
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
                      <button
                        className="items-center rounded-full bg-white px-1 py-1 text-sm text-red-500 hover:bg-red-50 focus:outline-none focus:ring-0 focus:ring-red-500 focus:ring-offset-2"
                        type="button"
                        onClick={() => removeConfig(index)}
                      >
                        <svg
                          className="h-4 w-4 text-red-500"
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
                      className="items-right inline-flex rounded border border-transparent bg-indigo-500 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
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
                      <span className="ml-2">
                        {formatMessage({
                          id: 'add_option',
                          defaultMessage: 'Add Option',
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
      <div className="sm:px-15 space-y-6 bg-slate-50 dark:bg-slate-500 p-5 text-right">
        <SubmitButton
          hidden={!hasRole(ACTION_ROLES.filters.create)}
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
