import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import CountryListItem from './CountryListItem';

const CountryList = ({
  countries,
  // onLoadMore,
  // total,
  // onLimitChange,
  // onRemoveCountry,
  // includeInactive,
  // onIncludeInactiveChange,
}) => {
  const { formatMessage } = useIntl();
  return (
    <Table className="min-w-full ">
      {countries?.map((country) => (
        <Table.Row key={country._id} className="bg-white " header>
          <Table.Cell className="pr-6  text-left text-xs font-medium sm:py-1text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'iso_code',
              defaultMessage: 'ISO code',
            })}
          </Table.Cell>

          <Table.Cell className="pr-6  text-left text-xs font-medium sm:py-1text-gray-500 uppercase tracking-wider">
            {formatMessage({ id: 'name', defaultMessage: 'Name' })}
          </Table.Cell>

          <Table.Cell className="pr-6  text-left text-xs font-medium sm:py-1text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'default_currency',
              defaultMessage: 'Default currency',
            })}
          </Table.Cell>

          <Table.Cell className="pr-6  text-left text-xs font-medium sm:py-1text-gray-500 uppercase tracking-wider">
            <span className="sr-only">
              {formatMessage({ id: 'active', defaultMessage: ' ' })}
            </span>
          </Table.Cell>

          <Table.Cell className="pr-6  text-left text-xs font-medium sm:py-1text-gray-500 uppercase tracking-wider">
            <span className="sr-only">
              {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
            </span>
          </Table.Cell>
        </Table.Row>
      ))}

      {countries?.map((country) => (
        <CountryListItem key={`${country?._id}111`} country={country} />
      ))}
    </Table>

    // <div className="bg-white m-2 flex flex-col">
    //   <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    //     <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    //       <div className="shadow overflow-hidden border-b border-gray-200 ">
    //         <ListHeader addPath="/country/new">
    //           <Toggle
    //             toggleText={formatMessage({
    //               id: 'show_inactive',
    //               defaultMessage: 'Show inactive',
    //             })}
    //             toggleState={includeInactive}
    //             onToggle={onIncludeInactiveChange}
    //           />
    //         </ListHeader>
    //         <table className="min-w-full divide-y divide-gray-200">
    //           <thead className="bg-white">
    //             <tr>
    //               <th
    //                 scope="col"
    //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //               >
    //                 {formatMessage({
    //                   id: 'iso_code',
    //                   defaultMessage: 'ISO code',
    //                 })}
    //               </th>

    //               <th
    //                 scope="col"
    //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //               >
    //                 {formatMessage({ id: 'name', defaultMessage: 'Name' })}
    //               </th>

    //               <th
    //                 scope="col"
    //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //               >
    //                 {formatMessage({
    //                   id: 'default_currency',
    //                   defaultMessage: 'Default currency',
    //                 })}
    //               </th>
    //               <th
    //                 scope="col"
    //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    //               >
    //                 &nbsp;
    //               </th>
    //               <th scope="col" className="relative px-6 py-3">
    //                 <span className="sr-only">
    //                   {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
    //                 </span>
    //               </th>
    //             </tr>
    //           </thead>

    //           <tbody>
    //             {countries?.map((country) => (
    //               <CountryListItem
    //                 key={country._id}
    //                 country={country}
    //                 onRemove={onRemoveCountry}
    //               />
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>

    // <ListPagination
    //   onLoadMore={onLoadMore}
    //   data={countries}
    //   total={total}
    //   onLimitChange={onLimitChange}
    // />
    // </div>
  );
};

export default CountryList;
