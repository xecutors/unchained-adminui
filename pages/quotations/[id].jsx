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

//TODO: remove mock data
const quotationsss = [
  {
    _id: '6df9ce1a-1e3c-4ea4-9bbf-afdc2952789d',
    user: {
      username: 'Anita',
      avatar: {
        url: 'https://robohash.org/iustoquonam.png?size=50x50&set=set1',
      },
    },
    created: 111111111,
    expires: 333333333,
    status: 'FULLFILLED',
    isExpired: false,
    quotationNumber: '2659208298',
    fullfilled: '8/22/2021',
    rejected: '2/24/2022',
    product: {
      texts: {
        title: 'Chutney Sauce - Mango',
      },
      media: {
        file: {
          url: 'http://dummyimage.com/101x100.png/ff4444/ffffff',
        },
      },
      _id: {
        $oid: '6229cf8efc13ae61830000c8',
      },
    },
  },
  {
    _id: '452e2152-7468-42ee-be27-8100f79a1120',
    user: {
      username: 'Tan',
      avatar: {
        url: 'https://robohash.org/dolorquisplaceat.png?size=50x50&set=set1',
      },
    },
    created: 111111111,
    expires: 333333333,
    status: 'PROCESSING',
    isExpired: false,
    quotationNumber: '2642658899',
    fullfilled: '4/10/2021',
    rejected: '4/11/2021',
    product: {
      texts: {
        title: 'Mcgillicuddy Vanilla Schnap',
      },
      media: {
        file: {
          url: 'http://dummyimage.com/217x100.png/dddddd/000000',
        },
      },
      _id: {
        $oid: '6229cf8efc13ae61830000c9',
      },
    },
  },
  {
    _id: 'e4ff483f-1192-43e5-98cc-37e55c00e329',
    user: {
      username: 'Philip',
      avatar: {
        url: 'https://robohash.org/quiaccusamusnihil.png?size=50x50&set=set1',
      },
    },
    created: 111111111,
    expires: 333333333,
    status: 'FULLFILLED',
    isExpired: true,
    quotationNumber: '3402319314',
    fullfilled: '5/15/2021',
    rejected: '3/31/2021',
    product: {
      texts: {
        title: 'Wine - Merlot Vina Carmen',
      },
      media: {
        file: {
          url: 'http://dummyimage.com/136x100.png/5fa2dd/ffffff',
        },
      },
      _id: {
        $oid: '6229cf8efc13ae61830000ca',
      },
    },
  },
  {
    _id: '88db8f44-cc5f-4394-aab3-b984a6dd803d',
    user: {
      username: 'Bret',
      avatar: {
        url: 'https://robohash.org/inciduntdignissimosut.png?size=50x50&set=set1',
      },
    },
    created: 111111111,
    expires: 333333333,
    status: 'FULLFILLED',
    isExpired: false,
    quotationNumber: '3351809840',
    fullfilled: '4/6/2021',
    rejected: '9/16/2021',
    product: {
      texts: {
        title: 'Beans - Kidney, Canned',
      },
      media: {
        file: {
          url: 'http://dummyimage.com/143x100.png/5fa2dd/ffffff',
        },
      },
      _id: {
        $oid: '6229cf8efc13ae61830000cb',
      },
    },
  },
  {
    _id: '0d6e9865-9367-4d62-af24-afa962979bee',
    user: {
      username: 'Den',
      avatar: {
        url: 'https://robohash.org/iustoomnissaepe.png?size=50x50&set=set1',
      },
    },
    created: 111111111,
    expires: 333333333,
    status: 'REJECTED',
    isExpired: true,
    quotationNumber: '2120914931',
    fullfilled: '7/24/2021',
    rejected: '1/27/2022',
    product: {
      texts: {
        title: 'Muffin - Mix - Strawberry Rhubarb',
      },
      media: {
        file: {
          url: 'http://dummyimage.com/180x100.png/ff4444/ffffff',
        },
      },
      _id: {
        $oid: '6229cf8efc13ae61830000cc',
      },
    },
  },
];

const QuatationDetailPage = () => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { removeOrder } = useRemoveOrder();
  const { query } = useRouter();
  const { id } = query;
  const { quotations, loading } = useQuotations({ id });

  //TODO: remove filter operation
  const [quotationss] = quotationsss.filter((quote) => quote._id === id);
  console.log(quotationss);

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
            id: 'quotation_detail',
            defaultMessage: 'Quotation Detail',
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
      {/* //TODO: change passed props */}
      {loading ? <Loading /> : <QuotationDetail quotations={quotationss} />}
    </div>
  );
};

export default QuatationDetailPage;
