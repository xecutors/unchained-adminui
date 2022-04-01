import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';

import Table from '../../common/components/Table';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';

const ENROLLMENT_STATUS = {
  INITIAL: 'orange',
  PAUSED: 'yellow',
  TERMINATED: 'red',
  ACTIVE: 'green',
};

const EnrollmentListItem = ({ enrollment, showUser }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  return (
    <Table.Row className="text-sm">
      <Table.Cell>
        <Link href={`/enrollments/${enrollment._id}`}>
          <a className="text-blue-600">
            {enrollment?.orderNumber || enrollment._id?.substr(0, 10)}
          </a>
        </Link>
      </Table.Cell>

      <Table.Cell>{formatDateTime(enrollment.created)}</Table.Cell>

      <Table.Cell>
        {enrollment.expires ? formatDateTime(enrollment.expires) : 'n/a'}

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
      </Table.Cell>

      {showUser && enrollment.user && (
        <Table.Cell>
          <Link href={`/users/${enrollment.user._id}`}>
            <a className="flex items-center text-blue-500">
              <span className="inline-block h-9 w-9 rounded-full">
                <Image
                  loader={defaultNextImageLoader}
                  src={enrollment?.user?.avatar?.url}
                  width={36}
                  height={36}
                />
              </span>
              <span className="ml-2">{enrollment.user?.username}</span>
            </a>
          </Link>
        </Table.Cell>
      )}

      <Table.Cell>
        <Link href={`/products/${enrollment.plan.product._id}`}>
          <span className="flex items-center">
            <Image
              loader={defaultNextImageLoader}
              src={enrollment?.plan?.product?.media?.file?.url}
              width={20}
              height={20}
            />
            <a className="ml-2 text-blue-600">
              {enrollment?.plan.product.texts.title}
            </a>
          </span>
        </Link>
      </Table.Cell>

      <Table.Cell>
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
