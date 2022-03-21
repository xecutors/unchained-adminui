import { FieldArray } from 'formik';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import useCountries from '../../country/hooks/useCountries';
import useCurrencies from '../../currency/hooks/useCurrencies';

import CheckboxField from '../../forms/components/CheckboxField';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useProductCatalogPrices from '../hooks/useProductCatalogPrices';
import useUpdateProductCommerce from '../hooks/useUpdateProductCommerce';

const normalizeCatalogPrices = (prices = []) => {
  return prices.map((price) => ({
    countryCode: price.country.isoCode,
    currencyCode: price.currency.isoCode,
    isTaxable: !!price.isTaxable,
    isNetPrice: !!price.isNetPrice,
    amount: price.amount,
    maxQuantity: price.maxQuantity,
  }));
};

const CommerceForm = ({ productId }) => {
  const { formatMessage } = useIntl();
  const { catalogPrices, loading } = useProductCatalogPrices({ productId });

  const { updateProductCommerce } = useUpdateProductCommerce();
  const { countries } = useCountries();
  const { currencies } = useCurrencies();

  const onSubmit = async ({ pricing }) => {
    await updateProductCommerce({ productId, pricing });
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
      pricing: [
        ...(catalogPrices || [
          {
            maxQuantity: '',
            amount: '',
            isTaxable: '',
            isNetPrice: '',
            currencyCode: '',
            countryCode: '',
          },
        ]),
      ],
    },
  });

  const { values } = form.formik;

  useEffect(() => {
    if (!loading)
      form.formik.setValues({ pricing: normalizeCatalogPrices(catalogPrices) });
  }, [catalogPrices]);

  return (
    <Form className="bg-white shadow-md rounded-md" form={form}>
      <div className="sm:p-3 relative max-w-full">
        <div className="max-w-full justify-between align-baseline" />

        <label className="text-sm font-sans text-black lg:not-sr-only sr-only flex w-full">
          <span className="flex w-full">
            <span className="w-full">
              {formatMessage({
                id: 'max_quantity',
                defaultMessage: 'Max Quantity',
              })}
            </span>
            <span className="w-full">
              {formatMessage({
                id: 'amount',
                defaultMessage: 'Amount',
              })}
            </span>
          </span>
          <span className="flex w-full ml-3">
            <span className="w-full">
              {formatMessage({
                id: 'vat_suspect',
                defaultMessage: 'Vat Suspect',
              })}
            </span>
            <span className="w-full">
              {formatMessage({
                id: 'net_price',
                defaultMessage: 'Net Price',
              })}
            </span>
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

        <FieldArray name="pricing">
          {({ push, remove: removeConfig }) => (
            <div>
              {values.pricing.map((p, index) => {
                return (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="shadow mt-2 p-6  lg:p-0 md:p-6 md:shadow lg:shadow-none lg:flex max-w-full align-baseline relative"
                  >
                    <div className="flex w-full">
                      <TextField
                        className="w-full mr-2"
                        name={`pricing[${index}].maxQuantity`}
                        id={`pricing[${index}].maxQuantity`}
                        required
                        type="number"
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
                        type="number"
                        className="w-full mr-3"
                        name={`pricing[${index}].amount`}
                        id={`pricing[${index}].amount`}
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
                          name={`pricing[${index}].isTaxable`}
                          labelClassNames="lg:sr-only items-center "
                          label={formatMessage({
                            id: 'vat_suspect',
                            defaultMessage: 'Vat Suspect',
                          })}
                          onChange={async (e) => {
                            await form.formik.setFieldValue(
                              `pricing[${index}].isTaxable`,
                              e.target.checked,
                            );
                          }}
                          className="lg:items-center ml-1 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          type="checkbox"
                        />
                      </div>

                      <div className="w-full lg:ml-8">
                        <CheckboxField
                          name={`pricing[${index}].isNetPrice`}
                          labelClassNames="lg:sr-only items-center"
                          label={formatMessage({
                            id: 'net_price',
                            defaultMessage: 'Net Price',
                          })}
                          onChange={async (e) => {
                            await form.formik.setFieldValue(
                              `pricing[${index}].isNetPrice`,
                              e.target.checked,
                            );
                          }}
                          hideLabel
                          className="lg:items-center mr-2 justify-between focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          type="checkbox"
                        />
                      </div>
                    </div>

                    <div className=" flex w-full justify-center ">
                      <SelectField
                        className=" text-black w-full py-1.5 lg:ml-4  mr-2 lg:mr-5  "
                        label={formatMessage({
                          id: 'country',
                          defaultMessage: 'Country',
                        })}
                        name={`pricing[${index}].countryCode`}
                        id={`pricing[${index}].countryCode`}
                        required
                        options={convertArrayOfObjectToObject(
                          countries,
                          'isoCode',
                          'isoCode',
                        )}
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
                        name={`pricing[${index}].currencyCode`}
                        id={`pricing[${index}].currencyCode`}
                        required
                        options={convertArrayOfObjectToObject(
                          currencies,
                          'isoCode',
                          'isoCode',
                        )}
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
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
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
      <FormErrors />
      <div className="px-5 sm:px-15 space-y-6 sm:p-6 bg-gray-50 text-right">
        <SubmitButton
          label={formatMessage({
            id: 'save',
            defaultMessage: 'Save',
          })}
          full
        />
      </div>
    </Form>
  );
};

export default CommerceForm;
