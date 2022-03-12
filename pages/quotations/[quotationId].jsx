import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import QuotationDetail from '../../modules/quotation/components/QuotationDetail';
import useQuotation from '../../modules/quotation/hooks/useQuotation';

const QuotationDetailPage = () => {
  const { formatMessage } = useIntl();

  const { query } = useRouter();
  const { quotationId } = query;
  const { quotation, loading } = useQuotation({ quotationId });

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
      </div>

      {loading ? <Loading /> : <QuotationDetail quotation={quotation} />}
    </div>
  );
};

export default QuotationDetailPage;
