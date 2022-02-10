import { useState } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/outline';
import Form from '../../forms/components/Form';
import TagInput from '../../common/components/TagInput';
import SubmitButton from '../../forms/components/SubmitButton';
import SelectField from '../../forms/components/SelectField';
import useForm from '../../forms/hooks/useForm';

import useAddAssortmentProduct from '../hooks/useAddAssortmentProduct';
import useModal from '../../modal/hooks/useModal';
import DangerMessage from '../../modal/components/DangerMessage';
import useRemoveAssortmentProduct from '../hooks/useRemoveAssortmentProduct';

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
      <div className="py-4 px-2 lg:px-5 shadow sm:rounded-t sm:px-15">
        <div className="lg:grid lg:grid-cols-3 px-6 border-gray-200 border-b pb-8 ">
          <div className="pb-2 pt-4 mb-7 border-gray-200 sm:flex  col-span-1">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {formatMessage({
                id: 'assigned_products',
                defaultMessage: 'Assigned products',
              })}
            </h3>
          </div>
          <div className="col-span-2 w-full py-2 ml-auto shadow-md px-6">
            {productSampleData.map((product) => (
              <div
                className="flex justify-between items-center  border-gray-200 border-b last:border-none"
                key={product.id}
              >
                <div className="flex items-center space-x-6 py-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={80}
                    height={40}
                    className="object-contain"
                  />
                  <div className="">
                    <h3 className="text-lg text-gray-800">{product.title}</h3>
                    <p className="text-xs text-gray-600">{product.desc}</p>
                  </div>
                </div>
                <div onClick={onRemoveProduct}>
                  <TrashIcon className="h-5 w-5 cursor-pointer text-red-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Form form={form}>
          <div className="space-y-4 mt-3 lg:mt-0 sm:p-6 rounded-md lg:grid lg:grid-cols-3 px-6">
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
                  className="text-sm font-medium text-gray-500 py-2 ml-1   mt-1 w-full"
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
      </div>
    </div>
  );
};

export default AssortmentProductForm;
