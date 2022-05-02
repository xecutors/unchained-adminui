import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';

import Pagination from '../../modules/common/components/Pagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import SearchField from '../../modules/common/components/SearchField';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import EventList from '../../modules/event/components/EventList';
import useEvents from '../../modules/event/hooks/useEvents';
import useEventTypes from '../../modules/event/hooks/useEventTypes';

const Events = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;

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

  const changeType = (selectedType) => {
    const { type: newType, ...otherParams } = query;

    if (selectedType) {
      push({
        query: {
          ...otherParams,
          type: selectedType,
        },
      });
    } else
      push({
        query: {
          ...otherParams,
        },
      });
  };

  const { events, eventsCount, loading } = useEvents({
    limit,
    type: query?.type,
    offset,
    queryString,
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
        <select
          onChange={(e) => changeType(e.target.value)}
          className="cursor-pointer rounded-md border-slate-300 py-[0.25rem] pr-8 text-sm lg:py-1 lg:pr-10 dark:bg-slate-400"
        >
          <option value="">
            {formatMessage({
              id: 'select_type',
              defaultMessage: 'Select type',
            })}
          </option>
          {eventsType?.map((type) => (
            <option value={type.value}>{type.label} </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <EventList events={events} onSearch={setQueryString} />
      )}
      <Pagination data={events} total={eventsCount} />
    </>
  );
};

export default Events;
