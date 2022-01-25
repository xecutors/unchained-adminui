import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import Table from '../../common/components/Table';

const PRODUCT_STATUS = {
  DRAFT: 'yellow',
  ACTIVE: 'green',
  DELETED: 'red',
};

const ProductListItem = ({ product }) => {
  const { formatMessage } = useIntl();

  return (
    <Table.Row>
      <Table.Cell className="px-6  whitespace-nowrap ">
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
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap">
        <Badge
          text={product.status}
          color={PRODUCT_STATUS[product.status]}
          square
        />
      </Table.Cell>

      <Table.Cell className=" px-6   whitespace-nowrap">
        <div className="flex">
          <div className="pl-2 flex items-center text-sm text-gray-900">
            {product.tags?.map((t) => (
              <Badge key={t} text={t} color="indigo" />
            ))}
          </div>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default ProductListItem;
