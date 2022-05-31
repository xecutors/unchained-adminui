import { useState } from 'react';
import { useIntl } from 'react-intl';

import { FieldArray } from 'formik';
import { PlusCircleIcon } from '@heroicons/react/solid';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';

import FilterableDropdown from '../../common/components/FilterableDropdown';
import ACTION_ROLES from '../../common/data/roles';
import useAuth from '../../Auth/useAuth';
import FormWrapper from '../../common/components/FormWrapper';
import FormErrors from '../../forms/components/FormErrors';
import useAddProductAssignment from '../hooks/useAddProductAssignment';
import useSearchProducts from '../hooks/useSearchProducts';
import useProductVariations from '../hooks/useProductVariations';
import SelectField from '../../forms/components/SelectField';
import {
  normalizeVariation,
  normalizeVariationOption,
} from '../../common/convertArrayOfObjectToObject';
import DeleteButton from '../../common/components/DeleteButton';

const normalizeAssortments = (productsList = []) => {
  return productsList?.map(({ _id, status, texts, media }) => ({
    id: _id,
    tag: status,
    ...texts,
    image: media?.length ? media[0]?.file.url : null,
  }));
};

const ProductAssignmentForm = ({ proxyId }) => {
  const { formatMessage } = useIntl();
  const { addProductAssignment } = useAddProductAssignment();
  const { hasRole } = useAuth();

  const [queryString, setQueryString] = useState('');
  const { products } = useSearchProducts({
    queryString,
    limit: 50,
  });
  const { variations } = useProductVariations({ productId: proxyId });

  const onSubmit = async ({ productId, vectors }) => {
    await addProductAssignment({
      proxyId,
      productId,
      vectors,
    });
    return true;
  };

  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      productId: '',
      vectors: [
        {
          key: null,
          value: null,
        },
      ],
    },
  });

  const { values } = form.formik;

  return (
    <FormWrapper>
      <Form form={form}>
        <div className="sm:rounded-md">
          <div className="col-span-12">
            <FilterableDropdown
              name="productId"
              label={formatMessage({
                id: 'child_assortment',
                defaultMessage: 'Sub-Assortment',
              })}
              required
              onFilter={setQueryString}
              queryString={queryString}
              data={normalizeAssortments(products)}
              className="mt-1 w-full py-2 text-sm font-medium text-slate-500"
            />
          </div>
          <FieldArray name="vectors">
            {({ push, remove: removeConfig }) => (
              <div className="w-full">
                {(values?.vectors || []).map((p, index) => {
                  return (
                    <div
                      className="flex w-full"
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                    >
                      <SelectField
                        label={formatMessage({
                          id: 'key',
                          defaultMessage: 'key',
                        })}
                        name={`vectors[${index}].key`}
                        id={`vectors[${index}].key`}
                        required
                        options={normalizeVariation(variations)}
                        hideLabel
                        placeholder={formatMessage({
                          id: 'key',
                          defaultMessage: 'key',
                        })}
                      />

                      <SelectField
                        label={formatMessage({
                          id: 'value',
                          defaultMessage: 'value',
                        })}
                        name={`vectors[${index}].value`}
                        id={`vectors[${index}].value`}
                        required
                        options={normalizeVariationOption(
                          variations?.filter(
                            ({ key }) => key === values.vectors[index].key,
                          )?.[0]?.options || [],
                        )}
                        hideLabel
                        placeholder={formatMessage({
                          id: 'value',
                          defaultMessage: 'value',
                        })}
                      />
                      <div>
                        <DeleteButton onClick={() => removeConfig(index)} />
                      </div>
                    </div>
                  );
                })}

                <div className="mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                  <div className=" " />
                  <div className="mt-2 flex-shrink-0">
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className="items-right inline-flex rounded-full border border-transparent bg-indigo-500 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                        variant="outlined"
                        onClick={() =>
                          push({
                            key: null,
                            value: null,
                          })
                        }
                      >
                        <PlusCircleIcon className="h-4 w-4" fill="white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </FieldArray>
        </div>
        <FormErrors />
        <div className="border-t-indigo-50 border-t bg-slate-50 dark:bg-slate-500 px-4 py-5 text-right sm:px-6">
          <SubmitButton
            hidden={!hasRole(ACTION_ROLES.assortments.addLink)}
            label={formatMessage({
              id: 'save',
              defaultMessage: 'Save',
            })}
          />
        </div>
      </Form>
    </FormWrapper>
  );
};

export default ProductAssignmentForm;
