import { useIntl } from 'react-intl';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import QuotationDetail from '../../modules/quotation/components/QuotationDetail';
import useQuotation from '../../modules/quotation/hooks/useQuotation';

const QuotationDetailPage = ({ quotationId }) => {
  const { formatMessage } = useIntl();

  const { quotation, loading } = useQuotation({
    quotationId: quotationId as string,
  });

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs currentPageTitle={quotation?.quotationNumber ?? ''} />
      <div className="align-center flex min-w-full justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'quotation_detail',
            defaultMessage: 'Quotation Detail',
          })}
        />
      </div>
      {/* TODO change mock props data */}
      {loading ? <Loading /> : <QuotationDetail quotation={quotation} />}
    </div>
  );
};

export default QuotationDetailPage;
