import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import MediaAvatar from '../../common/components/MediaAvatar';
import Table from '../../common/components/Table';
import generateUniqueId from '../../common/utils/getUniqueId';

import useUpdateProduct from '../hooks/useUpdateProduct';

const PRODUCT_STATUS = {
  DRAFT: 'yellow',
  ACTIVE: 'emerald',
  DELETED: 'amber',
};

const ProductListItem = ({
  product,
  showAvatar = false,
  hideSortIndex = false,
}) => {
  const { formatMessage } = useIntl();
  const { updateProduct } = useUpdateProduct();
  const updateProductSequence = async (e) => {
    if (e.target.value)
      await updateProduct({
        productId: product?._id,
        product: {
          sequence: parseInt(e.target.value, 10),
        },
      });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return formatMessage({ id: 'active', defaultMessage: 'Active' });
      case 'DRAFT':
        return formatMessage({ id: 'draft', defaultMessage: 'Draft' });
      case 'DELETED':
        return formatMessage({ id: 'deleted', defaultMessage: 'Deleted' });
      default:
        return formatMessage({ id: 'draft', defaultMessage: 'Draft' });
    }
  };
  const productUrl = `/products?slug=${generateUniqueId(product)}`;
  
  return (
    <Table.Row className="group">
      <Table.Cell>
        {product?.status !== 'DELETED' ? (
          <Link
            href={productUrl}
            className="flex items-center text-sm text-slate-900 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-100"
          >
            {showAvatar && (
              <MediaAvatar
                file={product?.media?.length && product.media[0].file}
                className="mr-3"
              />
            )}
            {product?.texts?.title || (
              <>
                {product._id}{' '}
                <Badge
                  color="yellow"
                  text={formatMessage({
                    id: 'title_not_found',
                    defaultMessage: 'Title not found',
                  })}
                />
              </>
            )}
          </Link>
        ) : (
          <div className="flex items-center text-sm text-slate-900">
            {showAvatar && (
              <MediaAvatar
                file={product?.media?.length && product.media[0].file}
                className="mr-3"
              />
            )}
            {product?.texts?.title || (
              <>
                {product._id}{' '}
                <Badge
                  color="yellow"
                  text={formatMessage({
                    id: 'title_not_found',
                    defaultMessage: 'Title not found',
                  })}
                />
              </>
            )}
          </div>
        )}
      </Table.Cell>

      <Table.Cell className="whitespace-nowrap px-6">
        {product?.status !== 'DELETED' ? (
          <Link href={productUrl} className="block">
            <Badge
              text={getStatusLabel(product?.status)}
              color={PRODUCT_STATUS[product?.status]}
              square
              dotted
            />
          </Link>
        ) : (
          <Badge
            text={getStatusLabel(product?.status)}
            color={PRODUCT_STATUS[product?.status]}
            square
            dotted
          />
        )}
      </Table.Cell>

      <Table.Cell>
        {product?.status !== 'DELETED' ? (
          <Link href={productUrl} className="block">
            <div className="flex flex-wrap gap-2">
              {product.tags?.map((t) => (
                <Badge key={t} text={t} color="slate" />
              ))}
            </div>
          </Link>
        ) : (
          <div className="flex flex-wrap gap-2">
            {product.tags?.map((t) => (
              <Badge key={t} text={t} color="slate" />
            ))}
          </div>
        )}
      </Table.Cell>
      {hideSortIndex ? null : (
        <Table.Cell>
          <input
            type="number"
            id={`${product?._id}-sequence`}
            className="text-center w-16 shadow-xs focus:ring-slate-900 dark:bg-slate-800 dark:border-slate-700 focus:border-slate-900 block text-sm border-slate-300 rounded-md mr-2 font-bold text-slate-900 dark:text-slate-300"
            defaultValue={product?.sequence}
            onBlur={updateProductSequence}
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
          />
        </Table.Cell>
      )}
    </Table.Row>
  );
};

export default ProductListItem;
