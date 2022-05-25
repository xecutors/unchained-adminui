import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import MediaAvatar from '../../common/components/MediaAvatar';
import Table from '../../common/components/Table';

const PRODUCT_STATUS = {
  DRAFT: 'yellow',
  ACTIVE: 'green',
  DELETED: 'red',
};

const ProductListItem = ({ product, showAvatar }) => {
  const { formatMessage } = useIntl();
  const { slug = '' } = product?.texts || {};
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
        </div>
      </Table.Cell>

      <Table.Cell className="whitespace-nowrap px-6">
        <Badge
          text={product.status}
          color={PRODUCT_STATUS[product.status]}
          square
        />
      </Table.Cell>

      <Table.Cell className="whitespace-nowrap px-6 inline-flex flex-wrap item-center gap-2">
        {product.tags?.map((t) => (
          <Badge key={t} text={t} color="indigo" />
        ))}
      </Table.Cell>
    </Table.Row>
  );
};

export default ProductListItem;
