import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import ListPagination from '../../modules/common/components/ListPagination';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import QuotationList from '../../modules/quotation/components/QuotationList';
import useQuotations from '../../modules/quotation/hooks/useQuotations';

const Quotations = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const { quotations, loadMore, quotationsCount, loading } = useQuotations({
    limit,
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
        <ListHeader addPath="/products/new" />
        <QuotationList
          isLoading={loading}
          quotations={quotations}
          showUser
          showPagination
          onLimitChange={setLimit}
          onLoadMore={loadMore}
          total={quotationsCount}
        />
        <ListPagination
          isLoading={loading}
          onLoadMore={loadMore}
          data={quotations}
          total={quotationsCount}
          onLimitChange={setLimit}
        />
      </div>
    </>
  );
};

export default Quotations;
