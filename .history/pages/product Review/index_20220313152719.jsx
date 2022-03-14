import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Pagination from '../../modules/common/components/Pagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';

const Produvt = () => {
    const { formatMessage } = useIntl();
    const { query } = useRouter();
    const limit = parseInt(query?.limit, 10) || DefaultLimit;
    const offset = parseInt(query?.skip, 10) || 0;
  
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
            <QuotationList quotations={quotations} showUser />
          )}
          <Pagination data={quotations} total={quotationsCount} />
        </div>
      </>
    );
  };
  
  export default Quotations;
  