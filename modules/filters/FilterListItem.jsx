import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../common/components/Badge';

const FILTER_TYPES = {
  SWITCH: 'blue',
  SINGLE_CHOICE: 'lime',
  MULTI_CHOICE: 'cyan',
};
const FilterListItem = ({ filter }) => {
  const { formatMessage } = useIntl();
  const STATUS = {
    true: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    false: formatMessage({ id: 'in_active', defaultMessage: 'In-Active' }),
  };
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/filters/${filter._id}`}>
            <a className="text-blue-600">
              {filter.key}
              &nbsp;
              {filter.texts ? `( ${filter.texts.title} )` : ''}
            </a>
          </Link>
        </div>
      </td>
      <td className="flex px-6 py-4 border-1 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Badge text={filter.type} color={FILTER_TYPES[filter.type]} square />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge
          text={STATUS[filter.isActive]}
          color={filter.isActive ? 'green' : 'red'}
          square
        />
      </td>

      <td className="flex px-6 py-4 border-1 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {filter.options?.length}
        </div>
      </td>
    </tr>
  );
};

export default FilterListItem;
