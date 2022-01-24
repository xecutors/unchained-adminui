import { useIntl } from 'react-intl';
import Table from '../common/components/Table';
// import ListHeader from '../common/components/ListHeader';
// import ListPagination from '../common/components/ListPagination';
// import Toggle from '../common/components/Toggle';
import FilterListItem from './FilterListItem';

const FilterList = ({
  filters,
  // onLoadMore,
  // total,
  // onLimitChange,
  // includeInactive,
  // onIncludeInactiveChange,
}) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full ">
      {filters?.map((filter) => (
        <Table.Row key={filter._id} className="bg-white " header>
          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'name',
              defaultMessage: 'Key(Name)',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'type',
              defaultMessage: 'Type',
            })}
          </Table.Cell>

          <Table.Cell className="pr-6  text-left text-xs font-medium sm:py-1text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'active',
              defaultMessage: 'Active',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'options',
              defaultMessage: 'Options',
            })}
          </Table.Cell>
        </Table.Row>
      ))}
      {filters?.map((filter) => (
        <FilterListItem key={`${filter?._id}111`} filter={filter} />
      ))}
    </Table>

    // <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    //   <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    //     <div className="shadow overflow-hidden border-b border-gray-200 ">
    //       <ListHeader addPath="/filters/new">
    //         <Toggle
    //           onToggle={onIncludeInactiveChange}
    //           toggleState={includeInactive}
    //           toggleText={formatMessage({
    //             id: 'include_inactive',
    //             defaultMessage: 'Include inactive',
    //           })}
    //         />
    //       </ListHeader>

    //       <table className="min-w-full divide-y divide-gray-200">
    //         <thead className="bg-white ">
    //           <tr>
    //             <th
    //               scope="col"
    //               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //             >
    //               {formatMessage({
    //                 id: 'name',
    //                 defaultMessage: 'Key(Name)',
    //               })}
    //             </th>

    //             <th
    //               scope="col"
    //               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //             >
    //               {formatMessage({
    //                 id: 'type',
    //                 defaultMessage: 'Type',
    //               })}
    //             </th>

    //             <th
    //               scope="col"
    //               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //             >
    //               {formatMessage({
    //                 id: 'active',
    //                 defaultMessage: 'Active',
    //               })}
    //             </th>

    //             <th
    //               scope="col"
    //               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //             >
    //               {formatMessage({
    //                 id: 'options',
    //                 defaultMessage: 'Options',
    //               })}
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody className="bg-white divide-y divide-gray-200">
    //           {filters?.map((filter) => (
    //             <FilterListItem key={filter?._id} filter={filter} />
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    //   <ListPagination
    //     onLoadMore={onLoadMore}
    //     data={filters}
    //     total={total}
    //     onLimitChange={onLimitChange}
    //   />
    // </div>
  );
};

export default FilterList;
