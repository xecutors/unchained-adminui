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
            <a className="text-blue-600">{assortment.texts?.title}</a>
          </Link>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <Badge
          text={STATUS[assortment?.isActive]}
          color={assortment.isActive ? 'green' : 'red'}
          square
        />
      </td>

      <td className="flex px-6 py-4 border-1 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Badge
            text={STATUS[assortment?.isBase]}
            color={assortment.isBase ? 'green' : 'red'}
            square
          />
        </div>
      </td>
    </tr>
  );
};

export default AssortmentListItem;
