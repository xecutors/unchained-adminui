import { format } from 'date-fns';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
// import MiniUserAvatar from '../../common/components/MiniUserAvatar';
import Table from '../../common/components/Table';

const ENROLLMENT_STATUS = {
  INITIAL: 'orange',
  PAUSED: 'yellow',
  TERMINATED: 'red',
  ACTIVE: 'green',
};

const EnrollmentListItem = ({ enrollment }) => {
  const { formatMessage } = useIntl();
  return (
    <Table.Row>
      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/enrollments/${enrollment._id}`}>
            <a className="text-blue-600">
              {enrollment?.orderNumber || enrollment._id?.substr(0, 10)}
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {format(new Date(enrollment.created), 'P')}
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap ">
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
      </Table.Cell>

      {/* {showUser && enrollment.user && ( */}
      <Table.Cell className="px-6  whitespace-nowrap ">
        {/* <Link href={`/users/${enrollment.user._id}`}>
            <a className="flex text-blue-500">
              <MiniUserAvatar
                {...enrollment?.user?.avatar}
                name={enrollment.user?.name || enrollment.user?.username}
              />
              {enrollment.user?.username}
            </a>
          </Link> */}
      </Table.Cell>
      {/* )} */}

      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/products/${enrollment.plan.product._id}`}>
            <a className="text-blue-600">
              {enrollment?.plan.product.texts.title}
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap ">
        <Badge
          text={enrollment?.status}
          color={ENROLLMENT_STATUS[enrollment.status]}
          square
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default EnrollmentListItem;
