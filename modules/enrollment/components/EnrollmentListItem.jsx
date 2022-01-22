import { format } from 'date-fns';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import MiniUserAvatar from '../../common/components/MiniUserAvatar';

const ENROLLMENT_STATUS = {
  INITIAL: 'orange',
  PAUSED: 'yellow',
  TERMINATED: 'red',
  ACTIVE: 'green',
};

const EnrollmentListItem = ({ enrollment, showUser }) => {
  const { formatMessage } = useIntl();
  return (
    <tr key={enrollment._id}>
      <td className="px-6  py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/enrollments/${enrollment._id}`}>
            <a className="text-blue-600">
              {enrollment?.orderNumber || enrollment._id?.substr(0, 10)}
            </a>
          </Link>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {format(new Date(enrollment.created), 'P')}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {enrollment.expires
            ? format(new Date(enrollment.expires), 'P')
            : 'n/a'}

          {!enrollment.isExpired && (
            <Badge
              className="ml-1"
              text={formatMessage({
                id: 'expired',
                defaultMessage: 'Expired',
              })}
              color="red"
            />
          )}
        </div>
      </td>

      {showUser && enrollment.user && (
        <td className="px-6 py-4 whitespace-nowrap">
          <Link href={`/users/${enrollment.user._id}`}>
            <a className="flex text-blue-500">
              <MiniUserAvatar
                {...enrollment?.user?.avatar}
                name={enrollment.user?.name || enrollment.user?.username}
              />
              {enrollment.user?.username}
            </a>
          </Link>
        </td>
      )}

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/products/${enrollment.plan.product._id}`}>
            <a className="text-blue-600">
              {enrollment?.plan.product.texts.title}
            </a>
          </Link>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <Badge
          text={enrollment?.status}
          color={ENROLLMENT_STATUS[enrollment.status]}
          square
        />
      </td>
    </tr>
  );
};

export default EnrollmentListItem;
