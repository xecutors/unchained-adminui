import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../../modules/common/components/BreadCrumbs';
import Loading from '../../../modules/common/components/Loading';
import PageHeader from '../../../modules/common/components/PageHeader';
import useAssortment from '../../../modules/assortment/hooks/useAssortment';
import AssortmentGraphDetail from '../../../modules/assortment/components/AssortmentGraphDetail';

const AssortmentGraphDetailPage = () => {
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
          defaultMessage: 'Assortment Graph Detail',
        })}
      />
      {loading ? (
        <Loading />
      ) : (
        <AssortmentGraphDetail assortment={assortment} />
      )}
    </div>
  );
};

export default AssortmentGraphDetailPage;
