import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import ListPagination from '../../modules/common/components/ListPagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import QuotationList from '../../modules/quotation/components/QuotationList';
import useQuotations from '../../modules/quotation/hooks/useQuotations';

const Quotations = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const [offset, setOffset] = useState(0);

  const { quotations, loadMore, quotationsCount, loading } = useQuotations({
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
      <div className=" inline-block min-w-full  sm:shadow-lg   shadow overflow-hidden border-b border-gray-200  ">
        <ListHeader />
        {loading ? (
          <Loading />
        ) : (
          <QuotationList quotations={quotations} showUser />
        )}
        <ListPagination
          onLoadMore={loadMore}
          data={quotations}
          total={quotationsCount}
          onLimitChange={setLimit}
          offset={offset}
          limit={limit}
          onOffsetChange={setOffset}
        />
      </div>
    </>
  );
};

export default Quotations;
