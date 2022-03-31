import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';

import useAssortmentProducts from '../hooks/useAssortmentProducts';
import useRemoveAssortmentProduct from '../hooks/useRemoveAssortmentProduct';
import AssortmentProductForm from './AssortmentProductForm';
import AssortmentProductList from './AssortmentProductList';
import Loading from '../../common/components/Loading';

const AssortmentProducts = ({ assortmentId }) => {
  const { formatMessage } = useIntl();

  const { linkedProducts, loading } = useAssortmentProducts({ assortmentId });
  const { setModal } = useModal();

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
    <div className="mt-5 md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-slate-900">
            {formatMessage({
              id: 'assortment_product',
              defaultMessage: 'Product',
            })}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </p>
        </div>
      </div>
      <div className="md:col-span-2">
        <AssortmentProductForm assortmentId={assortmentId} />
      </div>
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-slate-900">
            {formatMessage({
              id: 'assigned_assortment_products',
              defaultMessage: 'Assigned products',
            })}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </p>
        </div>
      </div>

      {loading ? (
        <div className="ml-auto w-full md:col-span-2">
          <Loading />
        </div>
      ) : (
        <div className="ml-auto w-full bg-white py-2 px-6 shadow md:col-span-2">
          <AssortmentProductList
            products={linkedProducts}
            onRemoveProduct={onRemoveProduct}
          />
        </div>
      )}
    </div>
  );
};

export default AssortmentProducts;
