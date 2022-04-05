import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import useAssortments from '../../modules/assortment/hooks/useAssortments';
import AssortmentList from '../../modules/assortment/components/AssortmentList';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Pagination from '../../modules/common/components/Pagination';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';

import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import Loading from '../../modules/common/components/Loading';

import AssortmentSearchFilter from '../../modules/assortment/components/AssortmentSearchFilter';
import ACTION_ROLES from '../../modules/common/data/roles';
import useCurrentRoles from '../../modules/accounts/hooks/useCurrentRoles';

const AssortmentsListView = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { hasRole } = useCurrentRoles();

  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
  const includeInactive = query?.includeInactive === 'true';
  const includeLeaves = query?.includeLeaves === 'true';
  const tags = query?.tags?.split(',') || undefined;

  const { assortments, assortmentsCount, loading } = useAssortments({
    includeInactive,
    includeLeaves,
    limit,
    offset,
    tags,
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
      <AssortmentSearchFilter />
      <div className="min-w-full overflow-x-auto">
        <ListHeader
          addPath={
            hasRole(ACTION_ROLES.assortments.create) && '/assortments/new'
          }
        >
          <Toggle
            toggleKey="includeInactive"
            toggleText={formatMessage({
              id: 'include_inactive',
              defaultMessage: 'Include inactive',
            })}
          />
          <Toggle
            toggleKey="includeLeaves"
            toggleText={formatMessage({
              id: 'include_leaf',
              defaultMessage: 'Include leafs',
              description: 'Assortment children',
            })}
          />
        </ListHeader>
        {loading ? <Loading /> : <AssortmentList assortments={assortments} />}
        <Pagination data={assortments} total={assortmentsCount} />
      </div>
    </>
  );
};

export default AssortmentsListView;
