import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../common/components/Badge';

const AssortmentListItem = ({ assortment }) => {
  const { formatMessage } = useIntl();
  const STATUS = {
    true: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    false: formatMessage({ id: 'in_active', defaultMessage: 'In-Active' }),
  };
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/assortment/${assortment._id}`}>
            <a className="text-blue-600">
              {assortment?.name || (
                <>
                  {assortment._id}{' '}
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
          text={STATUS[assortment.active]}
          color={assortment.active ? 'green' : 'red'}
          square
        />
      </td>

      <td className="flex px-6 py-4 border-1 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Badge text={assortment.base} color="indigo" />
        </div>
      </td>
    </tr>
  );
};

export default AssortmentListItem;
