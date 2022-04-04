import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { DragDropContext } from 'react-beautiful-dnd';

import { useState } from 'react';
import classNames from 'classnames';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';

import useAssortmentProducts from '../hooks/useAssortmentProducts';
import useRemoveAssortmentProduct from '../hooks/useRemoveAssortmentProduct';
import AssortmentProductForm from './AssortmentProductForm';
import AssortmentProductList from './AssortmentProductList';
import Loading from '../../common/components/Loading';
<<<<<<< HEAD
import SelfDocumentingView from '../../common/components/SelfDocumentingView';
=======
import useReorderAssortmentProducts from '../hooks/useReorderAssortmentProducts';
>>>>>>> Add reorder for assortment links, products and filters.

const AssortmentProducts = ({ assortmentId }) => {
  const { formatMessage } = useIntl();

  const { linkedProducts, loading } = useAssortmentProducts({ assortmentId });
  const { setModal } = useModal();

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const { removeAssortmentProduct } = useRemoveAssortmentProduct();
  const { reorderAssortmentProducts } = useReorderAssortmentProducts();

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

  const handleDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) {
      toast.success(
        formatMessage({
          id: 'product_reorder_empty',
          defaultMessage: 'Product destination is empty',
        }),
      );
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      toast.success(
        formatMessage({
          id: 'link_already_ordered',
          defaultMessage: 'Product already on that order',
        }),
      );
      return;
    }

    const sortKeys = linkedProducts.map((media) => ({
      assortmentProductId: media._id,
      sortKey: media.sortKey,
    }));

    const [removedSortKey] = sortKeys.splice(source.index, 1);
    sortKeys.splice(destination.index, 0, removedSortKey);

    sortKeys.map((sk, index) => {
      // eslint-disable-next-line no-param-reassign
      sk.sortKey = index;
      return sk;
    });

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
          defaultMessage: 'Product reorder failed, Try again!',
        }),
      );
    }
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
        <div
          className={classNames(
            'ml-auto w-full bg-white py-2 px-6 shadow md:col-span-2',
            {
              'bg-slate-100': isDraggingOver,
            },
          )}
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <AssortmentProductList
              products={linkedProducts}
              onRemoveProduct={onRemoveProduct}
              setIsDraggingOver={setIsDraggingOver}
            />
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

export default AssortmentProducts;
