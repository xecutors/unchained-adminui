import { FieldArray } from 'formik';
import { useIntl } from 'react-intl';
import FormHeader from '../../common/components/FormHeader';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

export const country = {
  ch: 'CH/CHF',
  fr: 'FR/CHF',
};
const CommerceForm = () => {
  const { formatMessage } = useIntl();
  const onSubmit = async ({ commerce }) => {
    return true;
  };
  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });
  const form = useForm({
    submit: onSubmit,
    successMessage,
    enableReinitialize: true,
    initialValues: {
      commerce: [],
    },
  });

  const { values } = form.formik;
  return (
    <FormHeader>
      <Form form={form}>
        <div className="space-y-6 sm:p-6 rounded-md relative max-w-full">
          <div className=" max-w-full sm:mr-10 justify-between align-baseline" />

          <FieldArray name="commerce">
            {({ push, remove: removeConfig }) => (
              <div>
                {values.commerce.map((p, index) => {
                  return (
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      className="lg:flex max-w-full align-baseline relative"
                    >
                      <div className="flex w-full">
                        <TextField
                          className="w-full mr-2"
                          name={`commerce[${index}].max`}
                          id={`commerce[${index}].max`}
                          required
                          hideLabel
                          label={formatMessage({
                            id: 'max_quantity',
                            defaultMessage: 'Max Quantity',
                          })}
                          placeholder={formatMessage({
                            id: 'max_quantity',
                            defaultMessage: 'Max Quantity',
                          })}
                        />
                        <TextField
                          className="w-full mr-3"
                          name={`commerce[${index}].amount`}
                          id={`commerce[${index}].amount`}
                          required
                          hideLabel
                          label={formatMessage({
                            id: 'amount',
                            defaultMessage: 'Amount',
                          })}
                          placeholder={formatMessage({
                            id: 'amount',
                            defaultMessage: 'Amount',
                          })}
                        />
                      </div>

                      <div className="p-2 flex  w-full ml-5 mr-2">
                        <CheckboxField
                          id={`commerce[${index}].vat`}
                          name={`commerce[${index}].vat`}
                          labelClassName="flex flex-col items-center "
                          label={formatMessage({
                            id: 'vat_suspect',
                            defaultMessage: 'Vat Suspect',
                          })}
                          className="ml-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <div className="ml-4">
                          <CheckboxField
                            id={`commerce[${index}].net`}
                            name={`commerce[${index}].net`}
                            labelClassName="flex flex-col items-center "
                            label={formatMessage({
                              id: 'net_price',
                              defaultMessage: 'Net Price',
                            })}
                            className="mr-2 justify-between focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                      </div>

                      <SelectField
                        className="text-black w-full py-1.5 sm:mr-10"
                        label={formatMessage({
                          id: 'country_currency',
                          defaultMessage: 'Country/Currency',
                        })}
                        name={`commerce[${index}].country`}
                        id={`commerce[${index}].country`}
                        required
                        options={country}
                        hideLabel
                        placeholder={formatMessage({
                          id: 'country_currency',
                          defaultMessage: 'Country/Currency',
                        })}
                      />
                      <div className="absolute top-0 right-0 flex-shrink-0  sm:mt-4 mt-5">
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
        </div>

        <div className="mx-auto sm:w-1/2 ">
          <SubmitButton
            label={formatMessage({
              id: 'save',
              defaultMessage: 'Save',
            })}
            className="py-6 h-9 "
            full
          />
        </div>
      </Form>
    </FormHeader>
  );
};

export default CommerceForm;
