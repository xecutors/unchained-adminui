import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';

import { DefaultLimit } from '../../modules/common/data/miscellaneous';

import AssortmentSearchFilter from '../../modules/assortment/components/AssortmentSearchFilter';
import ACTION_ROLES from '../../modules/common/data/roles';
import useAuth from '../../modules/Auth/useAuth';
import AssortmentGraphView from '../../modules/assortment/components/AssortmentGraphView';
import AssortmentListView from '../../modules/assortment/components/AssortmentListView';

const GetCurrentView = ({ options, queryString }) => {
  const { graph, ...rest } = options;

  return graph === 'true' ? (
    <AssortmentGraphView options={rest} />
  ) : (
    <AssortmentListView options={rest} queryString={queryString} />
  );
};

const AssortmentsView = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const { hasRole } = useAuth();

  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
  const includeInactive = query?.includeInactive === 'true';
  const includeLeaves = query?.includeLeaves === 'true';
  const tags = query?.tags?.split(',') || undefined;
  const graph = query?.viewGraph || false;
  const slug = query?.slug || '';

  const { queryString } = query;

  const onViewGraph = () => {
    if (query.viewGraph) {
      push('/assortments');
    } else {
      push({
        query: {
          ...query,
          viewGraph: true,
        },
      });
    }
  };

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
          <div className="flex gap-4">
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
            <Toggle
              toggleKey="viewGraph"
              toggleText={formatMessage({
                id: 'display_as_graph',
                defaultMessage: 'Display as Graph',
              })}
              toggle={onViewGraph}
            />
          </div>
        </ListHeader>

        <GetCurrentView
          queryString={queryString}
          options={{
            graph,
            includeInactive,
            includeLeaves,
            slug,
            tags,
            limit,
            offset,
          }}
        />
      </div>
    </>
  );
};

export default AssortmentsView;
