
import EventList from "../../modules/event/EventList";
import useEvents from "../../modules/event/hooks/useEvents";

const index = () => {
   const { events } = useEvents();
   
  return <div>
   {events && <EventList events={events} />}</div>
};

export default index;


