import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import MiniUserAvatar from '../../common/components/MiniUserAvatar';
import Table from '../../common/components/Table';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import { getInterfaceLabel } from '../../common/utils/utils';

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
          {formatDateTime(enrollment.created)}
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
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
        </div>
      </Table.Cell>

      {showUser && enrollment.user && (
        <Table.Cell className="px-6  whitespace-nowrap ">
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

      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/products/${enrollment.plan.product._id}`}>
            <span className="flex items-center">
              <Image
                loader={defaultNextImageLoader}
                src={enrollment?.plan?.product?.media?.file?.url}
                width={20}
                height={20}
              />
              <a className="text-blue-600 ml-2">
                {enrollment?.plan.product.texts.title}
              </a>
            </span>
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

      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/payment-provider/${enrollment?.payment?.provider._id}`}>
            <a className="text-blue-600 ml-2">
              {getInterfaceLabel(enrollment?.payment?.provider?.interface)}
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link
            href={`/delivery-provider/${enrollment?.delivery?.provider._id}`}
          >
            <a className="text-blue-600 ml-2">
              {getInterfaceLabel(enrollment?.payment?.provider?.interface)}
            </a>
          </Link>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default EnrollmentListItem;
