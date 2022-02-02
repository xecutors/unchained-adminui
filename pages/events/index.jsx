import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import ListPagination from '../../modules/common/components/ListPagination';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import EventList from '../../modules/event/components/EventList';
import useEvents from '../../modules/event/hooks/useEvents';

const index = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const [queryString, setQueryString] = useState('');
  const [offset, setOffset] = useState(0);

  const { events, loadMore, eventsCount, loading } = useEvents({
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

      <div className="min-w-full  sm:shadow-lg   shadow overflow-hidden border-b border-gray-200  ">
        <ListHeader />
        {loading ? (
          <Loading />
        ) : (
          <EventList events={events} onSearch={setQueryString} />
        )}
        <ListPagination
          onLoadMore={loadMore}
          data={events}
          total={eventsCount}
          onLimitChange={setLimit}
          offset={offset}
          onOffsetChange={setOffset}
          limit={limit}
        />
      </div>
    </>
  );
};

export default index;
