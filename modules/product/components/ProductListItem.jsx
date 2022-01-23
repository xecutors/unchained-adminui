import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';

const PRODUCT_STATUS = {
  DRAFT: 'yellow',
  ACTIVE: 'green',
  DELETED: 'red',
};

const ProductListItem = ({ product }) => {
  const { formatMessage } = useIntl();

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/product/${product._id}`}>
            <a className="text-blue-600">
              {product?.texts.title || (
                <>
                  {product._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({ id: 'name', defaultMessage: 'name' })}
                  />
                </>
              )}
            </a>
          </Link>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <Badge
          text={product.status}
          color={PRODUCT_STATUS[product.status]}
          square
        />
      </td>

      <td className="flex px-6 py-4 border-1 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {product.tags?.map((t) => (
            <Badge key={t} text={t} color="indigo" />
          ))}
        </div>
      </td>
    </tr>
  );
};

export default ProductListItem;
