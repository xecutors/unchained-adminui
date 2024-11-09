import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import EventDetail from '../../modules/event/components/EventDetail';
import useEvent from '../../modules/event/hooks/useEvent';

const OrderDetailPage = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { eventId } = query;
  const { event, loading } = useEvent({ eventId: eventId as string });

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'event_detail',
          defaultMessage: 'Event Detail',
        })}
        title={formatMessage(
          {
            id: 'event_detail_title',
            defaultMessage: 'Event {id}',
          },
          { id: (event as any)?._id },
        )}
      />
      {loading ? <Loading /> : <EventDetail event={event} />}
    </div>
  );
};

export default OrderDetailPage;
