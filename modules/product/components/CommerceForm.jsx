import { FieldArray } from 'formik';
import { useIntl } from 'react-intl';
import FormHeader from '../../common/components/FormHeader';
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
  const onSubmit = async () => {
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
      commerce: [{ max: '', amount: '', vat: '', net: '', country: '' }],
    },
  });

  const { values } = form.formik;
  return (
    <FormHeader>
      <Form form={form}>
        <div className="sm:p-3 rounded-md relative max-w-full">
          <div className=" max-w-full justify-between align-baseline" />

          <label className="text-sm font-sans text-black lg:not-sr-only sr-only flex w-full">
            <span className="flex w-full">
              <samp className="w-full  ">
                {' '}
                {formatMessage({
                  id: 'max_quantity',
                  defaultMessage: 'Max Quantity',
                })}{' '}
              </samp>
              <samp className="w-full">
                {formatMessage({
                  id: 'amount',
                  defaultMessage: 'Amount',
                })}{' '}
              </samp>
            </span>
            <span className="flex w-full ml-3">
              <samp className="w-full">
                {' '}
                {formatMessage({
                  id: 'vat_suspect',
                  defaultMessage: 'Vat Suspect',
                })}
              </samp>
              <samp className="w-full">
                {formatMessage({
                  id: 'net_price',
                  defaultMessage: 'Net Price',
                })}
              </samp>
            </span>
            <span className="flex w-full mr-5">
              <span className="w-full ml-10">
                {formatMessage({
                  id: 'country',
                  defaultMessage: 'Country',
                })}
              </span>
              <span className="w-full">
                {formatMessage({
                  id: 'currency',
                  defaultMessage: 'Currency',
                })}
              </span>
            </span>
          </label>

          <FieldArray name="commerce">
            {({ push, remove: removeConfig }) => (
              <div>
                {values.commerce.map((p, index) => {
                  return (
                    <div
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      className="shadow mt-2 p-6  lg:p-0 md:p-6 md:shadow lg:shadow-none lg:flex max-w-full align-baseline relative"
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

                      <div className=" p-2 flex w-full ">
                        <div className="w-full lg:ml-8 lg:items-center">
                          <CheckboxField
                            id={`commerce[${index}].vat`}
                            name={`commerce[${index}].vat`}
                            labelClassNames="lg:sr-only items-center "
                            label={formatMessage({
                              id: 'vat_suspect',
                              defaultMessage: 'Vat Suspect',
                            })}
                            className="lg:items-center ml-1 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>

                        <div className="w-full lg:ml-8">
                          <CheckboxField
                            id={`commerce[${index}].net`}
                            name={`commerce[${index}].net`}
                            labelClassNames="lg:sr-only items-center"
                            label={formatMessage({
                              id: 'net_price',
                              defaultMessage: 'Net Price',
                            })}
                            hideLabel
                            className="lg:items-center mr-2 justify-between focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                      </div>

                      <div className=" flex w-full ">
                        <SelectField
                          className=" text-black w-full py-1.5 lg:ml-4  mr-2 lg:mr-5  "
                          label={formatMessage({
                            id: 'country',
                            defaultMessage: 'Country',
                          })}
                          name={`commerce[${index}].country`}
                          id={`commerce[${index}].country`}
                          required
                          options={country}
                          hideLabel
                          placeholder={formatMessage({
                            id: 'country',
                            defaultMessage: 'Country',
                          })}
                        />

                        <SelectField
                          className="text-black w-full  py-1.5 mr-2 lg:mr-8 "
                          label={formatMessage({
                            id: 'currency',
                            defaultMessage: 'Currency',
                          })}
                          name={`commerce[${index}].currency`}
                          id={`commerce[${index}].currency`}
                          required
                          options={country}
                          hideLabel
                          placeholder={formatMessage({
                            id: 'country_currency',
                            defaultMessage: 'Currency',
                          })}
                        />
                      </div>

                      <div className="absolute top-0 mt-0 right-0 mr-0 md:mr-0  pb-1 lg:py-0 lg:px-0 flex-shrink-0  lg:mt-4 ">
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
