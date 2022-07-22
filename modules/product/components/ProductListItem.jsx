import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import MediaAvatar from '../../common/components/MediaAvatar';
import Table from '../../common/components/Table';

import useUpdateProduct from '../hooks/useUpdateProduct';

const PRODUCT_STATUS = {
  DRAFT: 'yellow',
  ACTIVE: 'green',
  DELETED: 'red',
};

const ProductListItem = ({ product, showAvatar }) => {
  const { formatMessage } = useIntl();
  const { slug = '' } = product?.texts || {};
  const { updateProduct } = useUpdateProduct();

  const updateProductSequence = async (e) => {
    if (e.target.value)
      await updateProduct({
        productId: product?._id,
        sequence: parseInt(e.target.value, 10),
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
            <Link href={`/products/${slug}`}>
              <a className="text-blue-600 dark:text-blue-400">
                {product?.texts.title || (
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
              </a>
            </Link>
          ) : (
            product?.texts.title || (
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
          text={product.status}
          color={PRODUCT_STATUS[product.status]}
          square
          dotted
        />
      </Table.Cell>

      <Table.Cell>
        {product.tags?.map((t) => (
          <Badge key={t} text={t} color="indigo" />
        ))}
      </Table.Cell>
      <Table.Cell>
        <input
          type="number"
          id={`${product?._id}-sequence`}
          className="w-24 shadow-sm focus:ring-indigo-500 dark:bg-slate-800 dark:border-slate-700 focus:border-indigo-500 block text-sm  border-gray-300 rounded-full mr-2 font-bold text-indigo-500"
          defaultValue={product?.sequence}
          onBlur={updateProductSequence}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default ProductListItem;
