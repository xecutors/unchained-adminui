import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';

import useAssortmentProducts from '../hooks/useAssortmentProducts';
import useRemoveAssortmentProduct from '../hooks/useRemoveAssortmentProduct';
import AssortmentProductForm from './AssortmentProductForm';
import AssortmentProductList from './AssortmentProductList';
import Loading from '../../common/components/Loading';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';

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
    <>
      <SelfDocumentingView
        documentationLabel={formatMessage({
          id: 'assortment_product',
          defaultMessage: 'Product',
        })}
        documentation="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco"
        mainContent={<AssortmentProductForm assortmentId={assortmentId} />}
      />
      <SelfDocumentingView
        className="mt-5"
        documentationLabel={formatMessage({
          id: 'assigned_assortment_products',
          defaultMessage: 'Assigned products',
        })}
        documentation="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco"
        mainContent={
          loading ? (
            <Loading />
          ) : (
            <div className=" bg-white py-2 px-6 shadow">
              <AssortmentProductList
                products={linkedProducts}
                onRemoveProduct={onRemoveProduct}
              />
            </div>
          )
        }
      />
    </>
  );
};

export default AssortmentProducts;
