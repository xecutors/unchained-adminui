import { useState } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';

import useAddAssortmentProduct from '../hooks/useAddAssortmentProduct';
import useSearchProducts from '../../product/hooks/useSearchProducts';
import FilterableDropdown from '../../common/components/FilterableDropdown';
import TagInputField from '../../forms/components/TagInputField';
import ACTION_ROLES from '../../common/data/roles';
import useAuth from '../../Auth/useAuth';

const normalizeProducts = (productsList = []) => {
  return productsList?.map(({ _id, status, texts, media }) => ({
    id: _id,
    tag: status,
    ...texts,
    image: media?.length ? media[0]?.file.url : null,
  }));
};

const AssortmentProductForm = ({ assortmentId }) => {
  const [queryString, setQueryString] = useState('');
  const { formatMessage } = useIntl();
  const { addAssortmentProduct } = useAddAssortmentProduct();
  const { hasRole } = useAuth();

  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const { products, loading } = useSearchProducts({
    queryString,
    limit: 10,
    includeInactive: true,
  });

  const onSubmit = async ({ productId, tags }) => {
    await addAssortmentProduct({ productId, assortmentId, tags });
    return true;
  };

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      productId: '',
      tags: '',
    },
  });

  return (
    <Form form={form}>
      <div className="shadow sm:rounded-md">
        <div className="grid gap-6 bg-white px-4 py-5 sm:p-6">
          <div className="col-span-12">
            <TagInputField
              name="tags"
              id="tags"
              className="mt-1 w-full py-2 text-sm font-medium text-slate-500 sm:ml-1"
            />

            <FilterableDropdown
              name="productId"
              data={normalizeProducts(products)}
              isLoading={loading}
              label={formatMessage({
                id: 'product',
                defaultMessage: 'Product',
              })}
              required
              onFilter={setQueryString}
              queryString={queryString}
              className="mt-1 w-full py-2 text-sm font-medium text-slate-500"
            />
          </div>
        </div>
        <div className="border-t-indigo-50 border-t bg-slate-50 px-4 py-5 text-right sm:px-6">
          <SubmitButton
            hidden={!hasRole(ACTION_ROLES.assortments.addProduct)}
            label={formatMessage({
              id: 'save',
              defaultMessage: 'Save',
            })}
          />
        </div>
      </div>
    </Form>
  );
};

export default AssortmentProductForm;
