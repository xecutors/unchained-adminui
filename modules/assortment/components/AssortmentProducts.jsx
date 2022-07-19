import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { DragDropContext } from 'react-beautiful-dnd';

import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';

import useAssortmentProducts from '../hooks/useAssortmentProducts';
import useRemoveAssortmentProduct from '../hooks/useRemoveAssortmentProduct';
import AssortmentProductForm from './AssortmentProductForm';
import AssortmentProductList from './AssortmentProductList';
import Loading from '../../common/components/Loading';
import useReorderAssortmentProducts from '../hooks/useReorderAssortmentProducts';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';

const AssortmentProducts = ({ assortmentId }) => {
  const { formatMessage } = useIntl();

  const { linkedProducts, loading } = useAssortmentProducts({ assortmentId });
  const { setModal } = useModal();

  const { removeAssortmentProduct } = useRemoveAssortmentProduct();
  const { reorderAssortmentProducts } = useReorderAssortmentProducts();

  const onRemoveProduct = async (assortmentProductId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_product_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it and it is nonreversible. Are you sure you want to delete this product? ',
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

  const handleDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) {
      toast.info(
        formatMessage({
          id: 'drop_area_empty',
          defaultMessage: 'Destination is empty',
        }),
      );
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newSortKeys = linkedProducts.map((media) => ({
      assortmentProductId: media._id,
      sortKey: media.sortKey,
    }));

    const [removedSortKey] = newSortKeys.splice(source.index, 1);
    newSortKeys.splice(destination.index, 0, removedSortKey);

    const sortKeys = newSortKeys.map((sortKey, index) => ({
      ...sortKey,
      sortKey: index,
    }));

    try {
      await reorderAssortmentProducts({ sortKeys });
      toast.success(
        formatMessage({
          id: 'product_reorder',
          defaultMessage: 'Product reorder successfully',
        }),
      );
    } catch (error) {
      toast.error(
        formatMessage({
          id: 'fail_reorder',
          defaultMessage: 'Reordering failed, Try again!',
        }),
      );
    }
  };

  return (
    <>
      <SelfDocumentingView
        documentationLabel={formatMessage({
          id: 'assortment_product_form_header',
          defaultMessage: 'Products',
        })}
        className="mt-2 sm:mt-0"
        documentation={
          <FormattedMessage
            id="assortment_product_form_description"
            defaultMessage="<ul> <li>Products that belong to this assortment </li>
          </ul>"
            values={{
              ul: (chunk) => (
                <ul className="list-disc list-inside">{chunk} </ul>
              ),
              li: (chunk) => <li>{chunk} </li>,
            }}
          />
        }
      >
        <AssortmentProductForm assortmentId={assortmentId} />
      </SelfDocumentingView>

      <SelfDocumentingView
        documentationLabel={formatMessage({
          id: 'assortment_products_header',
          defaultMessage: 'Assortment product',
        })}
        className="sm:mt-4"
        documentation={
          <FormattedMessage
            id="assortment_product_list_description"
            defaultMessage="<ul> <li>All products that belong to this assortment</li>
            <li> Drag and drop list items to sort products order </li>
          </ul>"
            values={{
              ul: (chunk) => (
                <ul className="list-disc list-inside">{chunk} </ul>
              ),
              li: (chunk) => <li>{chunk} </li>,
            }}
          />
        }
      >
        {loading ? (
          <div className="ml-auto w-full md:col-span-2 my-auto">
            <Loading />
          </div>
        ) : (
          <div className="ml-auto my-auto w-full rounded shadow dark:shadow-none md:col-span-2">
            <DragDropContext onDragEnd={handleDragEnd}>
              <AssortmentProductList
                products={linkedProducts}
                onRemoveProduct={onRemoveProduct}
              />
            </DragDropContext>
          </div>
        )}
      </SelfDocumentingView>
    </>
  );
};

export default AssortmentProducts;
