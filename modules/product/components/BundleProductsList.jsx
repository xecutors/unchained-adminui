import React from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import Loading from '../../common/components/Loading';
import NoData from '../../common/components/NoData';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useProductBundleItems from '../hooks/useProductBundleItems';
import useRemoveBundleItem from '../hooks/useRemoveBundleItem';
import ProductBundleItemsListItem from './BundleProductsListItem';

const BundleProductList = ({ productId }) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();

  const { bundleItems, loading } = useProductBundleItems({ productId });
  const { removeBundleItem } = useRemoveBundleItem();

  const onRemoveBundleItem = async (index) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_bundle_item_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this bundle item? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeBundleItem({ productId, index });
          toast.success(
            formatMessage({
              id: 'bundle_item_deleted',
              defaultMessage: 'Bundle item deleted successfully',
            }),
          );
        }}
        okText={formatMessage({
          id: 'delete_bundle_item',
          defaultMessage: 'Delete item',
        })}
      />,
    );
  };

  if (loading) return <Loading />;

  return bundleItems.length ? (
    bundleItems.map((product, index) => (
      <ProductBundleItemsListItem
        key={product._id}
        index={index}
        item={product}
        onDelete={onRemoveBundleItem}
      />
    ))
  ) : (
    <NoData
      message={formatMessage({
        id: 'bundle',
        defaultMessage: 'Bundle product',
      })}
    />
  );
};

export default BundleProductList;
