import { useState } from 'react';
import { useIntl } from 'react-intl';

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
  const [selectedVariation, setSelectedVariation] = useState({});
  const [queryString, setQueryString] = useState('');
  const { products } = useSearchProducts({
    queryString,
    limit: 50,
  });
  const { variations } = useProductVariations({ productId: proxyId });
  console.log(variations);

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
      vectors: [],
    },
  });
  console.log(selectedVariation);

  return (
    <FormWrapper>
      <Form form={form}>
        <div className="sm:rounded-md">
          <div className="grid gap-6 px-4 py-5 sm:p-6">
            <div className="col-span-12">
              <FilterableDropdown
                name="childAssortmentId"
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
            <div className="flex">
              <select
                onChange={(e) => {
                  setSelectedVariation(e.target.value);
                }}
              >
                <option>hello</option>
                {variations.map((variation) => (
                  <option value={variation}>
                    ({variation.type}) {variation.texts?.title}
                  </option>
                ))}
              </select>

              <select
                onChange={(e) => {
                  setSelectedVariation(e.target.value);
                }}
              >
                <option>hello</option>
                {(
                  variations?.filter(({ key }) => key === 'shirt')?.[0]
                    ?.options || []
                )?.map((option) => (
                  <option value={option.value}>
                    ({option.value}) {option.texts?.title}
                  </option>
                ))}
              </select>
            </div>
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
        </div>
      </Form>
    </FormWrapper>
  );
};

export default ProductAssignmentForm;
