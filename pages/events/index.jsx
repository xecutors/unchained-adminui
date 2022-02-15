import { useState } from 'react';
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

const Events = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;

  const [queryString, setQueryString] = useState('');

  const { events, eventsCount, loading } = useEvents({
    limit,
    type: queryString,
    offset,
  });

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'events_list_header',
          defaultMessage: 'Events',
        })}
      />

      <div className="min-w-full sm:shadow-lg shadow overflow-hidden border-b border-gray-200  ">
        <div className="mb-5">
          <SearchField onInputChange={setQueryString} />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <EventList events={events} onSearch={setQueryString} />
        )}
        <Pagination data={events} total={eventsCount} />
      </div>
    </>
  );
};

export default Events;
