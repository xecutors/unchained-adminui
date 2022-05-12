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
import useAuth from '../../modules/Auth/useAuth';
import SearchField from '../../modules/common/components/SearchField';
import AssortmentGraphView from '../../modules/assortment/components/AssortmentGraphView';

const GetCurrentView = ({ options, queryString }) => {
  const { graph, ...rest } = options;

  return graph === 'true' ? (
    <AssortmentGraphView options={rest} />
  ) : (
    <AssortmentListView options={rest} queryString={queryString} />
  );
};

const AssortmentListView = ({ options, queryString }) => {
  const { includeInactive, includeLeaves, limit, offset, tags } = options;
  const { query } = useRouter();
  const slug = query?.slug || '';

  const { assortments, assortmentsCount, loading } = useAssortments({
    queryString,
    includeInactive,
    includeLeaves,
    limit,
    offset,
    tags,
    slugs: slug,
  });

  return loading ? (
    <Loading />
  ) : (
    <>
      <AssortmentList assortments={assortments} />
      <Pagination data={assortments} total={assortmentsCount} />
    </>
  );
};

const AssortmentsListView = () => {
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

  const { queryString, ...restQuery } = query;

  const setQueryString = (searchString) => {
    if (searchString)
      push({
        query: {
          ...restQuery,
          queryString: searchString,
        },
      });
    else
      push({
        query: {
          ...restQuery,
        },
      });
  };

  return (
    <>
      <BreadCrumbs />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'assortments_list_header',
            defaultMessage: 'Assortments',
          })}
        />
        <SearchField
          onInputChange={setQueryString}
          defaultValue={queryString}
        />
      </div>
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

export default AssortmentsListView;
