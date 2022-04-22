import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../../modules/common/components/BreadCrumbs';
import Loading from '../../../modules/common/components/Loading';
import PageHeader from '../../../modules/common/components/PageHeader';
import AssortmentGraph from '../../../modules/assortment/components/AssortmentGraph';
import useAssortmentPaths from '../../../modules/assortment/hooks/useAssortmentPath';

const AssortmentGraphDetailPage = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { slug = '' } = query || {};
  const { assortment, loading } = useAssortmentPaths({ slug });

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'assortment_graph',
          defaultMessage: 'Assortment Graph',
        })}
      />
      {loading ? <Loading /> : <AssortmentGraph assortments={[assortment]} />}
    </div>
  );
};

export default AssortmentGraphDetailPage;
