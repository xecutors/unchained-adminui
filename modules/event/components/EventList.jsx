import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import EventListItem from './EventListItem';

const EventList = ({ events }) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full ">
      {events?.map((event) => (
        <Table.Row key={event._id} className="bg-white " header>
          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'created',
              defaultMessage: 'Created',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({ id: 'type', defaultMessage: 'Type' })}
          </Table.Cell>
        </Table.Row>
      ))}

      {events?.map((event) => (
        <EventListItem key={`${event?._id}111`} event={event} />
      ))}
    </Table>

    // <div className="bg-white flex flex-col">
    //   <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    //     <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    //       <div className="shadow overflow-hidden border-b border-gray-200 ">
    //         <ListHeader>
    //           <SearchField onInputChange={onSearch} />
    //         </ListHeader>
    //         <table className="min-w-full divide-y divide-gray-200">
    //           <thead className="bg-white">
    //             <tr>
    //               <th
    //                 scope="col"
    //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //               >
    //                 {formatMessage({
    //                   id: 'created',
    //                   defaultMessage: 'Created',
    //                 })}
    //               </th>
    //               <th
    //                 scope="col"
    //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //               >
    //                 {formatMessage({ id: 'type', defaultMessage: 'Type' })}
    //               </th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {events?.map((event) => (
    //               <EventListItem key={event._id} event={event} />
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    //   <ListPagination
    //     onLoadMore={onLoadMore}
    //     data={events}
    //     total={total}
    //     onLimitChange={onLimitChange}
    //   />
    // </div>
  );
};

export default EventList;
