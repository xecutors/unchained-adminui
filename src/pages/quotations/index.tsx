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
import SearchField from '../../modules/common/components/SearchField';
import { convertSortFieldsToQueryFormat } from '../../modules/common/utils/utils';
import LocaleWrapper from '../../modules/common/components/LocaleWrapper';
import QuotationDetailPage from './QuotationDetailPage';

const Quotations = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const limit = parseInt(query?.limit as string, 10) || DefaultLimit;
  const offset = parseInt(query?.skip as string, 10) || 0;
  const sort = query?.sort || '';

  const { queryString, quotationId, ...rest } = query;

  const setQueryString = (searchString) => {
    const { skip, ...withoutSkip } = rest;
    if (searchString)
      push({
        query: {
          ...withoutSkip,
          queryString: searchString,
        },
      });
    else
      push({
        query: {
          ...rest,
        },
      });
  };

  const sortKeys = convertSortFieldsToQueryFormat(sort);

  const { quotations, quotationsCount, loading, loadMore } = useQuotations({
    queryString: queryString as string,
    limit,
    offset,
    sort: sortKeys,
  });

  if (quotationId) return <QuotationDetailPage quotationId={quotationId} />;
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage(
          (quotationsCount ?? 0) === 1
            ? { id: 'quotation_count_header_singular', defaultMessage: '1 Quotation' }
            : { id: 'quotations_count_header', defaultMessage: '{count} Quotations' },
          { count: quotationsCount ?? 0 }
        )}
      />
      <div className="min-w-full overflow-x-auto">
        <ListHeader />
        
        <LocaleWrapper
          searchComponent={
            <SearchField
              defaultValue={queryString}
              onInputChange={setQueryString}
            />
          }
        >
          <div>
            {loading ? (
              <Loading />
            ) : (
              <QuotationList sortable quotations={quotations} showUser />
            )}
            <Pagination
              data={quotations}
              total={quotationsCount}
              onLoadMore={loadMore}
            />
          </div>
        </LocaleWrapper>
      </div>
    </>
  );
};

export default Quotations;
