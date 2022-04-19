import { useIntl } from 'react-intl';

import useAssortments from '../../../modules/assortment/hooks/useAssortments';
import BreadCrumbs from '../../../modules/common/components/BreadCrumbs';
import PageHeader from '../../../modules/common/components/PageHeader';
import Loading from '../../../modules/common/components/Loading';
import AssortmentSearchFilter from '../../../modules/assortment/components/AssortmentSearchFilter';
import AssortmentGraphList from '../../../modules/assortment/components/AssortmentGraphList';

const AssortmentGraphView = () => {
  const { formatMessage } = useIntl();

  const { assortments, loading } = useAssortments();

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'assortments_list_header',
          defaultMessage: 'Assortments Graph',
        })}
      />
      <AssortmentSearchFilter />
      <div className="min-w-full overflow-hidden">
        {loading ? (
          <Loading />
        ) : (
          <AssortmentGraphList assortments={assortments} />
        )}
      </div>
    </>
  );
};

export default AssortmentGraphView;
