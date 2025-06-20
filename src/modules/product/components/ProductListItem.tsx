import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import MediaAvatar from '../../common/components/MediaAvatar';
import Table from '../../common/components/Table';
import generateUniqueId from '../../common/utils/getUniqueId';

import useUpdateProduct from '../hooks/useUpdateProduct';

const PRODUCT_STATUS = {
  DRAFT: 'yellow',
  ACTIVE: 'green',
  DELETED: 'red',
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
  return (
    <Table.Row>
      <Table.Cell>
        <div className="flex items-center text-sm text-slate-900">
          {showAvatar && (
            <MediaAvatar
              file={product?.media?.length && product.media[0].file}
              className="mr-2"
            />
          )}
          {product?.status !== 'DELETED' ? (
            <Link
              href={`/products?slug=${generateUniqueId(product)}`}
              className="text-slate-900 dark:text-slate-700"
            >
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
            product?.texts?.title || (
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
            )
          )}
        </div>
      </Table.Cell>

      <Table.Cell className="whitespace-nowrap px-6">
        <Badge
          text={product?.status}
          color={PRODUCT_STATUS[product?.status]}
          square
          dotted
        />
      </Table.Cell>

      <Table.Cell>
        <div className="flex flex-wrap gap-2">
          {product.tags?.map((t) => <Badge key={t} text={t} color="slate" />)}
        </div>
      </Table.Cell>
      {hideSortIndex ? null : (
        <Table.Cell>
          <input
            type="number"
            id={`${product?._id}-sequence`}
            className="w-24 shadow-xs focus:ring-slate-900 dark:bg-slate-800 dark:border-slate-700 focus:border-slate-900 block text-sm  border-gray-300 rounded-full mr-2 font-bold text-slate-900"
            defaultValue={product?.sequence}
            onBlur={updateProductSequence}
          />
        </Table.Cell>
      )}
    </Table.Row>
  );
};

export default ProductListItem;
