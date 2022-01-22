import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../common/components/Badge';

const AsssortmentListItem = ({ asssortment }) => {
  const { formatMessage } = useIntl();
  const STATUS = {
    true: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    false: formatMessage({ id: 'in_active', defaultMessage: 'In-Active' }),
  };
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/asssortment/${asssortment._id}`}>
            <a className="text-blue-600">
              {asssortment?.name || (
                <>
                  {asssortment._id}{' '}
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
          text={STATUS[asssortment.active]}
          color={asssortment.active ? 'green' : 'red'}
          square
        />
      </td>

      <td className="flex px-6 py-4 border-1 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Badge text={asssortment.base} color="indigo" />
        </div>
      </td>
    </tr>
  );
};

export default AsssortmentListItem;
