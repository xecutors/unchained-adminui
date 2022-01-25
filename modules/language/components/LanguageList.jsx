import { useIntl } from 'react-intl';
import Table from '../../common/components/Table';
import LanguageListItem from './LanguageListItem';

const LanguageList = ({ languages }) => {
  const { formatMessage } = useIntl();

  return (
    <Table className="min-w-full ">
      {languages?.map((language) => (
        <Table.Row key={language._id} className="bg-white " header>
          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({
              id: 'iso_code',
              defaultMessage: 'ISO code',
            })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({ id: 'name', defaultMessage: 'Name' })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            {formatMessage({ id: 'active', defaultMessage: 'Active' })}
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            &nbsp;
          </Table.Cell>

          <Table.Cell className="text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
            &nbsp;
          </Table.Cell>
        </Table.Row>
      ))}

      {languages?.map((language) => (
        <LanguageListItem key={`${language?._id}111`} language={language} />
      ))}
    </Table>
  );
};

export default LanguageList;

// <div className="bg-white m-2 flex flex-col">
//   <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//     <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//       <div className="shadow overflow-hidden border-b border-gray-200 ">
//         <ListHeader addPath="/language/new">
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
//                 {formatMessage({ id: 'active', defaultMessage: 'Active' })}
//               </th>

//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 &nbsp;
//               </th>

//               <th scope="col" className="relative px-6 py-3">
//                 &nbsp;
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {languages?.map((language) => (
//               <LanguageListItem
//                 key={language._id}
//                 language={language}
//                 onRemove={onRemove}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </div>

//   <ListPagination
//     onLoadMore={onLoadMore}
//     data={languages}
//     total={total}
//     onLimitChange={onLimitChange}
//   />
// </div>
