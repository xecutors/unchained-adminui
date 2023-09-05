import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { VariableIcon } from '@heroicons/react/24/solid';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';

import Pagination from '../../modules/common/components/Pagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import SearchField from '../../modules/common/components/SearchField';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import EventList from '../../modules/event/components/EventList';
import useEvents from '../../modules/event/hooks/useEvents';
import useEventTypes from '../../modules/event/hooks/useEventTypes';
import MultipleSelect from '../../modules/common/components/MultipleSelect';
import { extractQuery } from '../../modules/common/utils/normalizeFilterKeys';
import {
  convertSortFieldsToQueryFormat,
  normalizeQuery,
} from '../../modules/common/utils/utils';
import ListHeader from '../../modules/common/components/ListHeader';

const Events = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const limit = parseInt(query?.limit as string, 10) || DefaultLimit;
  const offset = parseInt(query?.skip as string, 10) || 0;
  const sort = query?.sort || '';

  const { queryString, ...restQuery } = query;

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

  const sortKeys = convertSortFieldsToQueryFormat(sort);

  const typeChangeHandler = (selectedTypes) => {
    const { types, ...rest } = query;
    if (selectedTypes?.length) {
      push({
        query: normalizeQuery(rest, selectedTypes?.join(','), 'types'),
      });
    } else {
      push({
        query: normalizeQuery(rest),
      });
    }
  };

  const { events, eventsCount, loading } = useEvents({
    limit,
    types: (query?.types as string)?.split(','),
    offset,
    queryString: queryString as string,
    sort: sortKeys,
  });

  const { eventsType } = useEventTypes();

  return (
    <>
      <BreadCrumbs />
      <div className="w-full py-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <PageHeader
            headerText={formatMessage({
              id: 'events_list_header',
              defaultMessage: 'Events',
            })}
          />
          <SearchField
            onInputChange={setQueryString}
            defaultValue={queryString}
          />
        </div>
        <div className="mt-4 flex space-x-2 sm:mt-1 md:mt-5 lg:mt-0">
          <VariableIcon
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          />
          <p className="text-xl font-medium leading-5 text-slate-800 dark:text-slate-200 lg:leading-6 ">
            {formatMessage({ id: 'type', defaultMessage: 'Type' })}
          </p>
        </div>
        <div>
          <div className="mt-4">
            <MultipleSelect
              label={formatMessage({
                id: 'select_type',
                defaultMessage: 'Select type',
              })}
              tagList={extractQuery(query?.types)}
              onChange={typeChangeHandler}
              options={eventsType}
            />
          </div>
        </div>
      </div>
      <div className="min-w-full overflow-x-auto">
        <ListHeader />

        {loading ? <Loading /> : <EventList events={events} sortable />}
        <Pagination data={events} total={eventsCount} />
      </div>
    </>
  );
};

export default Events;
