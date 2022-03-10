import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Pagination from '../../modules/common/components/Pagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import QuotationList from '../../modules/quotation/components/QuotationList';
import useQuotations from '../../modules/quotation/hooks/useQuotations';

const Quotations = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;

  const quotationss = [
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

  const { quotations, quotationsCount, loading } = useQuotations({
    limit,
    offset,
  });

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'quotation_list_header',
          defaultMessage: 'Quotations',
        })}
      />
      <div className="min-w-full overflow-hidden">
        <ListHeader />
        {loading ? (
          <Loading />
        ) : (
          <QuotationList quotations={quotationss} showUser />
        )}
        <Pagination data={quotations} total={quotationsCount} />
      </div>
    </>
  );
};

export default Quotations;
