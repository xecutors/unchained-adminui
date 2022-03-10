import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { XIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import useQuotations from '../../modules/quotation/hooks/useQuotations';
import QuotationDetail from '../../modules/quotation/components/QuotationDetail';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import useRemoveOrder from '../../modules/order/hooks/useRemoveOrder';

const OrderDetailPage = () => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { removeOrder } = useRemoveOrder();
  const { query } = useRouter();
  const { id } = query;
  const { quotations, loading } = useQuotations({ id });

  const isDeletable = (status) => {
    return (
      status === 'REQUESTED' ||
      status === 'PROCESSING' ||
      status === 'PROPOSED' ||
      status === 'REJECTED'
    );
  };

  const handleOnClick = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_quotation_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this quotation? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeOrder({ id });
          toast.success(
            formatMessage(
              {
                id: 'order_deleted',
                defaultMessage: 'Quotation {id} deleted successfully',
              },
              {
                id,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_order',
          defaultMessage: 'Delete order',
        })}
      />,
    );
  };

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs />
      <div className="flex align-center justify-between min-w-full">
        <PageHeader
          headerText={formatMessage({
            id: 'order_detail',
            defaultMessage: 'Order Detail',
          })}
        />
        {isDeletable(quotations.status) ? (
          <button
            type="button"
            onClick={handleOnClick}
            className="flex justify-center items-center bg-red-400 text-white my-auto h-full rounded px-3 py-2 border border-transparent shadow-sm text-sm font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
          >
            <span className="pr-1">
              <XIcon className="inline-block h-4 w-4" />
            </span>
            {formatMessage({
              id: 'quotation_delete',
              defaultMessage: 'Delete',
            })}
          </button>
        ) : null}
      </div>
      {loading ? <Loading /> : <QuotationDetail quotations={quotations} />}
    </div>
  );
};

export default OrderDetailPage;
