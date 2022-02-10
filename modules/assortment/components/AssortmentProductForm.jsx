import { useState } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import Form from '../../forms/components/Form';
import TagInput from '../../common/components/TagInput';
import SubmitButton from '../../forms/components/SubmitButton';
import SelectField from '../../forms/components/SelectField';
import useForm from '../../forms/hooks/useForm';

import useAddAssortmentProduct from '../hooks/useAddAssortmentProduct';
import useModal from '../../modal/hooks/useModal';
import DangerMessage from '../../modal/components/DangerMessage';
import useRemoveAssortmentProduct from '../hooks/useRemoveAssortmentProduct';
import AssortmentProductsList from './AssortmentProductList';

const AssortmentProductForm = ({ assortmentId }) => {
  const [tags, setTags] = useState('');
  const { formatMessage } = useIntl();
  const { addAssortmentProduct } = useAddAssortmentProduct();

  const productSampleData = [
    {
      id: 1,
      image: '/publicare-logo.png',
      title: 'Product title',
      desc: 'product description placeholder',
    },
    {
      id: 2,
      image: '/publicare-logo.png',
      title: 'Product title',
      desc: 'product description placeholder',
    },
    {
      id: 2,
      image: '/publicare-logo.png',
      title: 'Product title',
      desc: 'product description placeholder',
    },
  ];
  const { setModal } = useModal();
  const { removeProduct } = useRemoveAssortmentProduct();

  const onRemoveProduct = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_product_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this language? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeProduct({ assortmentId });
          toast.success(
            formatMessage(
              {
                id: 'product_deleted',
                defaultMessage: 'product {id} deleted successfully',
              },
              {
                id: assortmentId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_product',
          defaultMessage: 'Delete Product',
        })}
      />,
    );
  };

  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const onSubmit = async ({ productId }) => {
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
    <div className="sm:max-w-full mt-5">
      <div className="px-2 lg:px-6 shadow sm:rounded-t sm:px-15">
        <Form form={form}>
          <div className=" sm:p-6 rounded-md relative max-w-full lg:grid lg:grid-cols-3 px-8">
            <div className="border-gray-200 sm:flex  col-span-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {formatMessage({
                  id: 'product',
                  defaultMessage: 'Product',
                })}
              </h3>
            </div>
            <div className="col-span-2 py-2 w-full ml-auto lg:shadow-md border-gray-200  bg-white px-8">
              <div className="w-full  justify-between1 1align-baseline">
                <TagInput
                  name="tags"
                  id="tags"
                  label={formatMessage({
                    id: 'tags',
                    defaultMessage: 'tags',
                  })}
                  onChange={(newTags) => setTags(newTags)}
                  autoComplete="on"
                  options={{}}
                  className="text-sm font-medium text-gray-500 py-2 sm:ml-1   mt-1 w-full"
                />

                <SelectField
                  name="productId"
                  label={formatMessage({
                    id: 'product',
                    defaultMessage: 'Product',
                  })}
                  autoComplete="on"
                  options={{}}
                  className="text-sm font-medium text-gray-500 py-2  mt-1 w-full"
                />
              </div>
              <div className="w-fit">
                <SubmitButton
                  label={formatMessage({
                    id: 'save',
                    defaultMessage: 'Save',
                  })}
                  className="py-6 h-9 "
                  full
                />
              </div>
            </div>
          </div>
        </Form>
        <div className="lg:grid lg:grid-cols-3 px-6 border-gray-200 border-b pb-8">
          <div className="pb-2 pt-4 mb-7 border-gray-200 sm:flex  col-span-1">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {formatMessage({
                id: 'assigned_products',
                defaultMessage: 'Assigned products',
              })}
            </h3>
          </div>
          <div className="col-span-2 w-full py-2 ml-auto shadow-md px-6">
            <AssortmentProductsList
              products={productSampleData}
              onRemoveProduct={onRemoveProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssortmentProductForm;
