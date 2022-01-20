import { format } from 'date-fns';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';

const ENROLLMENT_STATUS = {
  INITIAL: 'purple',
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
          <Link href={`/order/${enrollment.user._id}`}>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>{' '}
              {enrollment.user?.name}
            </a>
          </Link>
        </td>
      )}

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/products/${enrollment.plan.product._id}`}>
            <a className="text-blue-600">
              {enrollment?.plan.product._id ||
                enrollment?.plan?.product._id?.substr(0, 10)}
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
