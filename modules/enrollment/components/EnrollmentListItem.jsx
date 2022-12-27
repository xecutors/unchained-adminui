import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';

import Table from '../../common/components/Table';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import generateUniqueId from '../../common/utils/getUniqueId';

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
    <Table.Row>
      <Table.Cell>
        <div className="text-sm">
          <Link href={`/enrollments/${enrollment._id}`}>
            <a className="font-medium text-blue-500 dark:text-blue-400">
              {enrollment?.enrollmentNumber || enrollment._id?.substr(0, 10)}
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center text-sm ">
          {formatDateTime(enrollment.created, {
            dateStyle: 'medium',
            timeStyle: 'medium',
          })}
        </div>
      </Table.Cell>

      <Table.Cell>
        <div className="flex items-center text-sm ">
          {enrollment.isExpired ? (
            <Badge
              text={formatMessage({
                id: 'expired',
                defaultMessage: 'Expired',
              })}
              color="red"
            />
          ) : (
            formatDateTime(enrollment.expires, {
              dateStyle: 'medium',
              timeStyle: 'medium',
            })
          )}
        </div>
      </Table.Cell>

      {showUser && enrollment.user && (
        <Table.Cell>
          <Link href={`/users/${enrollment.user._id}`}>
            <a className="flex items-center text-sm text-blue-500 dark:text-blue-400 hover:text-decoration">
              <span className="inline-block h-9 w-9 rounded-full">
                <Image
                  loader={defaultNextImageLoader}
                  src={enrollment?.user?.avatar?.url}
                  width={36}
                  height={36}
                  placeholder="blur"
                  blurDataURL="/no-image.jpg"
                />
              </span>
              <span className="ml-2">{enrollment.user?.username}</span>
            </a>
          </Link>
        </Table.Cell>
      )}

      <Table.Cell>
        <div className="text-sm">
          <Link href={`/products/${generateUniqueId(enrollment.plan.product)}`}>
            <a className="flex text-blue-600 dark:text-blue-400">
              <Image
                loader={defaultNextImageLoader}
                src={enrollment?.plan?.product?.media?.file?.url}
                width={20}
                placeholder="blur"
                blurDataURL="/no-image.jpg"
                height={20}
              />
              <span className="ml-2 self-end">
                {enrollment?.plan.product.texts.title}
              </span>
            </a>
          </Link>
        </div>
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
