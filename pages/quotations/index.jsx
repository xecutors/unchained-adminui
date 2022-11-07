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

const Quotations = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
  const sort = query?.set || '';

  const { queryString, ...rest } = query;

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

  const { quotations, quotationsCount, loading } = useQuotations({
    queryString,
    limit,
    offset,
    sort: sortKeys,
  });

  return (
    <>
      <BreadCrumbs />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'quotation_list_header',
            defaultMessage: 'Quotations',
          })}
        />
        <SearchField
          defaultValue={queryString}
          onInputChange={setQueryString}
        />
      </div>
      <div className="min-w-full overflow-x-auto">
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
