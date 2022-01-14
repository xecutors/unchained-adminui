import ListHeader from '../../common/components/ListHeader';
import ListPagination from '../../common/components/ListPagination';
import LanguageListItem from './LanguageListItem';

const LanguageList = ({
  languages,
  onRemove,
  onLoadMore,
  total,
  onLimitChange,
}) => {
  return (
    <div className="m-8 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <ListHeader headerText="Language" addPath="/language/add" />
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ISO Codee
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Active?
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    &nbsp;
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    &nbsp;
                  </th>
                </tr>
              </thead>
              <tbody>
                {languages?.map((language) => (
                  <LanguageListItem
                    key={language._id}
                    language={language}
                    onRemove={onRemove}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ListPagination
        onLoadMore={onLoadMore}
        data={languages}
        total={total}
        onLimitChange={onLimitChange}
      />
    </div>
  );
};

export default LanguageList;
