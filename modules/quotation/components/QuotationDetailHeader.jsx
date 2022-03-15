import Image from 'next/image';
import { useIntl } from 'react-intl';
import {
  CheckCircleIcon,
  AtSymbolIcon,
  XCircleIcon,
  DeviceMobileIcon,
} from '@heroicons/react/solid';
import { toast } from 'react-toastify';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import Badge from '../../common/components/Badge';
import Button from '../../common/components/Button';
import useModal from '../../modal/hooks/useModal';
import useRejectQuotation from '../hooks/useRejectQuotation';
import DangerMessage from '../../modal/components/DangerMessage';

const FallbackAvatar = ({ username }) => {
  return (
    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-500">
      <span className="text-4xl font-medium leading-none text-white">
        {username?.slice(0, 2)}
      </span>
    </span>
  );
};

const QuotationDetailHeader = ({ quotation }) => {
  const { formatMessage, locale } = useIntl();

  const { setModal } = useModal();

  const { rejectQuotation } = useRejectQuotation();

  const { formatDateTime } = useFormatDateTime();

  const onReject = async () => {
    await setModal(
      <DangerMessage
        buttonText={formatMessage({
          id: 'reject_alert_button',
          defaultMessage: 'Reject',
        })}
        headerText={formatMessage({
          id: 'Reject_alert_header',
          defaultMessage: 'Reject quotation?',
        })}
        onOkClick={async () => {
          setModal('');
          await rejectQuotation({ id: quotation._id });
          toast.success(
            formatMessage(
              {
                id: 'reject_alert_success',
                defaultMessage: 'Reject {id} verified successfully',
              },
              {
                id: quotation._id,
              },
            ),
          );
        }}
      />,
    );
  };

  const rejectButton = quotation.status !== 'FULLFILLED' &&
    quotation.status !== 'REJECTED' && (
      <Button
        text="Reject"
        onClick={onReject}
        className="rounded-md text-base"
      />
    );

  return (
    <section>
      <div className="flex items-center">
        <span className="hidden h-16 w-16 rounded-full sm:block">
          {quotation?.user?.avatar ? (
            <Image
              loader={defaultNextImageLoader}
              src={quotation.user.avatar.url}
              alt={quotation.user.name || quotation.user.username}
              width={64}
              height={64}
            />
          ) : (
            <FallbackAvatar username={quotation?.user?.username} />
          )}
        </span>
        <div>
          <div className="flex items-center">
            <span className="block h-16 w-16 rounded-full sm:hidden">
              {quotation?.user?.avatar ? (
                <Image
                  loader={defaultNextImageLoader}
                  src={quotation.user.avatar.url}
                  alt={quotation.user.name || quotation.user.username}
                  width={64}
                  height={64}
                />
              ) : (
                <FallbackAvatar username={quotation?.user?.username} />
              )}
            </span>
            <span className="flex items-center">
              <h3 className="ml-3 text-2xl font-bold capitalize leading-7 text-gray-900 sm:truncate sm:leading-9">
                {quotation?.user?.name
                  ? quotation.user.name
                  : quotation?.user?.username}
              </h3>
              {quotation?.user?.primaryEmail?.verified ? (
                <dl className="self-end">
                  <dt className="sr-only">
                    {formatMessage({
                      id: 'account_status',
                      defaultMessage: 'Account status',
                    })}
                  </dt>
                  <dd className="mt-3 flex items-center self-end text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                    {quotation.user?.primaryEmail?.verified ? (
                      <CheckCircleIcon
                        className="mb-1.5 h-4 w-4 flex-shrink-0 text-green-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <XCircleIcon
                        className="mb-1.5 h-4 w-4 flex-shrink-0 text-red-400"
                        aria-hidden="true"
                      />
                    )}
                  </dd>
                </dl>
              ) : null}
            </span>
          </div>
          <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
            {quotation?.contact?.emailAddress ? (
              <>
                <dt className="sr-only">
                  {formatMessage({ id: 'email', defaultMessage: 'Email' })}
                </dt>
                <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                  <AtSymbolIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {quotation.contact.emailAddress}
                </dd>
              </>
            ) : null}

            {quotation?.contact?.telNumber ? (
              <>
                <dt className="sr-only">
                  {formatMessage({ id: 'phone', defaultMessage: 'Phone' })}
                </dt>
                <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                  <DeviceMobileIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {quotation.contact.telNumber}
                </dd>
              </>
            ) : null}
          </dl>
        </div>
      </div>

      <div className="mt-2 border-b border-gray-200 pb-2 text-sm sm:flex sm:justify-between">
        <dl className="flex items-center">
          <dt className="capitalize text-gray-500">
            {formatMessage({
              id: 'quotation',
              defaultMessage: 'quotation',
            })}
            &#35; &nbsp;
          </dt>
          <dd className="text-xl font-bold text-gray-900">
            {quotation.quotationNumber ? (
              <Badge
                text={quotation.quotationNumber}
                className="bg-blue-600 p-1 text-xl font-bold"
              />
            ) : (
              <Badge
                text="Cart"
                color="yellow"
                className="p-1 text-xl font-bold"
              />
            )}
          </dd>
          <dt>
            <span className="sr-only">
              {formatMessage({ id: 'date', defaultMessage: 'Date' })}
            </span>
            <span className="mx-2 text-gray-400" aria-hidden="true">
              &middot;
            </span>
          </dt>
          <dd className="font-medium text-gray-900">
            <time dateTime="2021-03-22">
              {quotation?.ordered ? formatDateTime(quotation.ordered) : null}
            </time>
          </dd>
          {rejectButton && (
            <>
              <dt>
                <span className="sr-only">
                  {formatMessage({
                    id: 'button',
                    defaultMessage: 'Button',
                  })}
                </span>
                <span className="mx-2 text-gray-400" aria-hidden="true">
                  &middot;
                </span>
              </dt>
              <dd className="ml-6 font-medium text-gray-900">{rejectButton}</dd>
            </>
          )}
        </dl>
        <div className="flex items-center pl-2 text-base text-gray-900">
          <span>{quotation?.country?.flagEmoji}</span>
          <span className="ml-2">
            {new Intl.DisplayNames([locale], {
              type: 'currency',
            }).of(quotation?.currency?.isoCode)}
          </span>
          <span>
            {quotation?.currency?.isoCode && (
              <Badge
                text={quotation?.currency?.isoCode}
                color="amber"
                className="ml-2 px-2 py-1"
                square
              />
            )}
          </span>
        </div>
      </div>
    </section>
  );
};

export default QuotationDetailHeader;
