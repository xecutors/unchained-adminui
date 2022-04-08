import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import AssortmentDetail from '../../modules/assortment/components/AssortmentDetail';
import useAssortment from '../../modules/assortment/hooks/useAssortment';

const AssortmentDetailPage = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { slug = '' } = query || {};
  const { assortment, loading } = useAssortment({ slug });

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'assortment_detail',
          defaultMessage: 'Assortment Detail',
        })}
      />
      {loading ? <Loading /> : <AssortmentDetail assortment={assortment} />}
    </div>
  );
};

export default AssortmentDetailPage;
