import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import QuotationList from '../../modules/quotation/components/QuotationList';
import useQuotations from '../../modules/quotation/hooks/useQuotations';

const Quotations = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const { quotations, loadMore, quotationsCount } = useQuotations({ limit });
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'quotation_list_header',
          defaultMessage: 'Quotations',
        })}
      />
      <QuotationList
        quotations={quotations}
        showUser
        showPagination
        onLimitChange={setLimit}
        onLoadMore={loadMore}
        total={quotationsCount}
      />
    </>
  );
};

export default Quotations;
