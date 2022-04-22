import { useIntl } from 'react-intl';

import BreadCrumbs from '../../../modules/common/components/BreadCrumbs';
import PageHeader from '../../../modules/common/components/PageHeader';
import Loading from '../../../modules/common/components/Loading';
import AssortmentSearchFilter from '../../../modules/assortment/components/AssortmentSearchFilter';
import AssortmentGraph from '../../../modules/assortment/components/AssortmentGraph';
import useAssortmentPaths from '../../../modules/assortment/hooks/useAssortmentPaths';

const AssortmentGraphView = () => {
  const { formatMessage } = useIntl();

  const { assortments, loading } = useAssortmentPaths();

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'assortment_graph',
          defaultMessage: 'Assortments Graph',
        })}
      />
      <AssortmentSearchFilter />
      <div className="min-w-full overflow-hidden">
        {loading ? <Loading /> : <AssortmentGraph assortments={assortments} />}
      </div>
    </>
  );
};

export default AssortmentGraphView;
