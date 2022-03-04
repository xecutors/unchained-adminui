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
  const { id } = query;
  const { event, loading } = useEvent({ eventId: id });

  return (
    <div className="mt-6 max-w-full">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'event_detail',
          defaultMessage: 'Event Detail',
        })}
      />
      {loading ? <Loading /> : <EventDetail event={event} />}
    </div>
  );
};

export default OrderDetailPage;
