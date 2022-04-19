import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../../modules/common/components/BreadCrumbs';
import Loading from '../../../modules/common/components/Loading';
import PageHeader from '../../../modules/common/components/PageHeader';
import AssortmentGraphDetail from '../../../modules/assortment/components/AssortmentGraphDetail';
import useAssortmentPaths from '../../../modules/assortment/hooks/useAssortmentPaths';

const AssortmentGraphDetailPage = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { slug = '' } = query || {};
  const { assortment, loading } = useAssortmentPaths({ slug });

  console.log(assortment);

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
