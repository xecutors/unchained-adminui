import React from 'react';
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
      <BreadCrumbs
        currentPageTitle={
          quotation.quotationNumber ? `#${quotation.quotationNumber}` : ''
        }
      />
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
