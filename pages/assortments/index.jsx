import { useState } from 'react';
import { useIntl } from 'react-intl';
import useAssortments from '../../modules/assortment/hooks/useAssortments';
import AssortmentList from '../../modules/asssortment/AssortmentList';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';

const index = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const [includeInactive, setIncludeInactive] = useState(false);
  const [includeLeaves, setIncludeLeaves] = useState(false);
  const { assortments, assortmentsCount, loadMore } = useAssortments({
    includeInactive,
    includeLeaves,
    limit,
  });

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'assortments_list_header',
          defaultMessage: 'Assortments',
        })}
      />
      <AssortmentList
        onLimitChange={setLimit}
        includeInactive={includeInactive}
        onIncludeInactiveChange={setIncludeInactive}
        onIncludeLeavesChange={setIncludeLeaves}
        assortments={assortments}
        onLoadMore={loadMore}
        total={assortmentsCount}
      />
    </>
  );
};

export default index;
