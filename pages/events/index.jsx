import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import EventList from '../../modules/event/components/EventList';
import useEvents from '../../modules/event/hooks/useEvents';

const index = () => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const [queryString, setQueryString] = useState('');

  const { events, loadMore, eventsCount } = useEvents({
    limit,
    type: queryString,
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
      <EventList
        events={events}
        onLimitChange={setLimit}
        onLoadMore={loadMore}
        total={eventsCount}
        onSearch={setQueryString}
      />
    </>
  );
};

export default index;
