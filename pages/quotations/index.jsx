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
      _id: '06faa3f2-c13a-421e-8aaf-2143cd784112',
      user: {
        username: 'Chrysa',
        avatar: {
          url: 'https://robohash.org/debitisaliquidincidunt.png?size=50x50&set=set1',
        },
      },
      created: '1625349155000',
      expires: '1640146879000',
      status: 'PROCESSING',
      isExpired: false,
      quotationNumber: '1316618803',
      fullfilled: '1644851603000',
      rejected: '1617507784000',
      product: {
        texts: {
          title: 'Beef - Rib Roast, Capless',
        },
        media: {
          file: {
            url: 'http://dummyimage.com/210x100.png/dddddd/000000',
          },
        },
        _id: {
          $oid: '622afabbfc13ae1e390001f9',
        },
      },
    },
    {
      _id: 'c30ab64e-7bf6-44b2-ad28-6ee1a02d70fc',
      user: {
        username: 'Chloette',
        avatar: {
          url: 'https://robohash.org/velitmodiporro.png?size=50x50&set=set1',
        },
      },
      created: '1643052576000',
      expires: '1636566311000',
      status: 'FULLFILLED',
      isExpired: false,
      quotationNumber: '0251603326',
      fullfilled: '1628435902000',
      rejected: '1629720828000',
      product: {
        texts: {
          title: 'Bread - Pumpernickle, Rounds',
        },
        media: {
          file: {
            url: 'http://dummyimage.com/166x100.png/dddddd/000000',
          },
        },
        _id: {
          $oid: '622afabbfc13ae1e390001fa',
        },
      },
    },
    {
      _id: '83fae6fd-fd12-4369-9543-913a0cae7993',
      user: {
        username: 'Tremayne',
        avatar: {
          url: 'https://robohash.org/ducimusomnisaut.png?size=50x50&set=set1',
        },
      },
      created: '1642633082000',
      expires: '1627500078000',
      status: 'FULLFILLED',
      isExpired: false,
      quotationNumber: '1170057918',
      fullfilled: '1623353612000',
      rejected: '1617311714000',
      product: {
        texts: {
          title: 'Spinach - Baby',
        },
        media: {
          file: {
            url: 'http://dummyimage.com/118x100.png/cc0000/ffffff',
          },
        },
        _id: {
          $oid: '622afabbfc13ae1e390001fb',
        },
      },
    },
    {
      _id: '70b56421-44d2-4b32-abbc-aa0f3bb0f5de',
      user: {
        username: 'Roch',
        avatar: {
          url: 'https://robohash.org/veritatissolutamagnam.png?size=50x50&set=set1',
        },
      },
      created: '1639215708000',
      expires: '1628561857000',
      status: 'PROPOSED',
      isExpired: true,
      quotationNumber: '0655048561',
      fullfilled: '1618573674000',
      rejected: '1641360188000',
      product: {
        texts: {
          title: 'Dc Hikiage Hira Huba',
        },
        media: {
          file: {
            url: 'http://dummyimage.com/173x100.png/5fa2dd/ffffff',
          },
        },
        _id: {
          $oid: '622afabbfc13ae1e390001fc',
        },
      },
    },
    {
      _id: '796d8fb6-6d90-4ace-a63e-863158afcfbb',
      user: {
        username: 'Scottie',
        avatar: {
          url: 'https://robohash.org/quipariaturitaque.png?size=50x50&set=set1',
        },
      },
      created: '1640246805000',
      expires: '1618018367000',
      status: 'REJECTED',
      isExpired: false,
      quotationNumber: '1384725512',
      fullfilled: '1629966284000',
      rejected: '1626874170000',
      product: {
        texts: {
          title: 'Bread - Kimel Stick Poly',
        },
        media: {
          file: {
            url: 'http://dummyimage.com/223x100.png/5fa2dd/ffffff',
          },
        },
        _id: {
          $oid: '622afabbfc13ae1e390001fd',
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
