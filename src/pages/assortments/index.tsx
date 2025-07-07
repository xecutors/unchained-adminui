import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';

import { DefaultLimit } from '../../modules/common/data/miscellaneous';

import useAuth from '../../modules/Auth/useAuth';
import AssortmentGraphView from '../../modules/assortment/components/AssortmentGraphView';
import AssortmentListView from '../../modules/assortment/components/AssortmentListView';
import { normalizeQuery } from '../../modules/common/utils/utils';
import SearchWithTags from '../../modules/common/components/SearchWithTags';
import useAssortmentsCount from '../../modules/assortment/hooks/useAssortmentsCount';
import AssortmentDetailPage from './AssortmentDetailPage';
import LocaleWrapper from '../../modules/common/components/LocaleWrapper';
import AnimatedCounter from '../../modules/common/components/AnimatedCounter';

const GetCurrentView = ({
  options,
  queryString,
  onSearchChange,
  defaultSearchValue,
}) => {
  const { graph, ...rest } = options;

  return (
    <SearchWithTags
      onSearchChange={onSearchChange}
      defaultSearchValue={defaultSearchValue}
    >
      <LocaleWrapper onlyFull>
        {graph === 'true' ? (
          <AssortmentGraphView options={rest} />
        ) : (
          <AssortmentListView
            options={rest}
            queryString={queryString}
            sortable
          />
        )}
      </LocaleWrapper>
    </SearchWithTags>
  );
};

const AssortmentsView = () => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { hasRole } = useAuth();
  const { query, push } = router;
  const limit = parseInt(query?.limit as string, 10) || DefaultLimit;
  const offset = parseInt(query?.skip as string, 10) || 0;
  const includeInactive =
    query?.includeInactive === 'true' || !query?.includeInactive;
  const includeLeaves = query?.includeLeaves === 'true';
  const tags = (query?.tags as string)?.split(',') || undefined;
  const graph = query?.viewGraph || false;
  const slug = query?.slug || '';
  const sort = query?.sort || '';

  const { queryString, assortmentSlug, ...restQuery } = query;
  const { assortmentsCount } = useAssortmentsCount({
    includeInactive,
    includeLeaves,
    queryString: queryString as string,
    tags,
  });
  const setQueryString = (searchString) => {
    const { skip, ...withoutSkip } = restQuery;
    if (searchString) {
      push({
        query: normalizeQuery(withoutSkip, searchString, 'queryString'),
      });
    } else {
      push({
        query: normalizeQuery(restQuery),
      });
    }
  };
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
  if (assortmentSlug)
    return <AssortmentDetailPage assortmentSlug={assortmentSlug} />;
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage(
          (assortmentsCount ?? 0) === 1
            ? {
                id: 'assortment_count_header_singular',
                defaultMessage: '1 Assortment',
              }
            : {
                id: 'assortments_count_header',
                defaultMessage: '{count} Assortments',
              },
          { count: <AnimatedCounter value={assortmentsCount ?? 0} /> },
        )}
        addPath={hasRole('addAssortment') && '/assortments/new'}
        addButtonText={formatMessage({
          id: 'add_assortment',
          defaultMessage: 'Add Assortment',
        })}
      />
      <div>
        <ListHeader>
          <div className="lg:flex gap-5">
            <Toggle
              toggleKey="includeInactive"
              toggleText={formatMessage({
                id: 'include_inactive',
                defaultMessage: 'Include inactive',
              })}
              active={includeInactive}
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
              onToggle={onViewGraph}
            />
          </div>
        </ListHeader>
        <GetCurrentView
          queryString={queryString}
          onSearchChange={setQueryString}
          defaultSearchValue={queryString}
          options={{
            graph,
            includeInactive,
            includeLeaves,
            slug,
            tags,
            limit,
            offset,
            sort,
          }}
        />
      </div>
    </>
  );
};

export default AssortmentsView;
