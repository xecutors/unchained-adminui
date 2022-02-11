import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import DangerMessage from '../../modal/components/DangerMessage';
import useAssortmentProducts from '../hooks/useAssortmentProducts';
import useRemoveAssortmentProduct from '../hooks/useRemoveAssortmentProduct';
import AssortmentProductForm from './AssortmentProductForm';
import AssortmentProductsList from './AssortmentProductsList';

const AssortmentProducts = ({ assortmentId }) => {
  const { formatMessage } = useIntl();
  const { assortmentProducts } = useAssortmentProducts({ assortmentId });
  const { setModal } = useIntl();
  const { removeAssortmentProduct } = useRemoveAssortmentProduct();

  const onRemoveProduct = async (assortmentProductId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_product_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this language? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeAssortmentProduct({ assortmentProductId });
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
  return (
    <div className="mt-4 sm:max-w-full">
      <div className="py-2 px-5 shadow sm:rounded-t sm:px-15">
        <div className=" sm:p-6 rounded-md relative max-w-full lg:grid lg:grid-cols-3 border-b pb-8">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {formatMessage({
                  id: 'assortment_product',
                  defaultMessage: 'Product',
                })}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco
              </p>
            </div>
          </div>
          <div className="col-span-2 py-2 w-full ml-auto lg:shadow-md border-gray-200  bg-white px-8">
            <AssortmentProductForm assortmentId={assortmentId} />
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-3 px-6 border-gray-200 space-y-2 sm:p-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {formatMessage({
                  id: 'assigned_assortment_products',
                  defaultMessage: 'Assigned products',
                })}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco
              </p>
            </div>
          </div>
          <div className="col-span-2 w-full py-2 ml-auto shadow-md px-6">
            <AssortmentProductsList
              products={assortmentProducts}
              onRemoveProduct={onRemoveProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssortmentProducts;
