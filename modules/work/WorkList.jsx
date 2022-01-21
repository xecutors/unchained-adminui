import { useIntl } from 'react-intl';
import ListHeader from '../common/components/ListHeader';
import WorkListItem from './WorkListItem';

const WorkList = ({ works }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="bg-white m-2 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 ">
            <ListHeader addPath="/work/new" />

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({
                      id: 'type',
                      defaultMessage: 'Work#',
                    })}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({ id: 'status', defaultMessage: 'Status' })}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({
                      id: 'created',
                      defaultMessage: 'Created',
                    })}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({
                      id: 'scheduled',
                      defaultMessage: 'Scheduled',
                    })}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({
                      id: 'started',
                      defaultMessage: 'Started',
                    })}
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {formatMessage({
                      id: 'finished',
                      defaultMessage: 'Finished',
                    })}
                  </th>
                </tr>
              </thead>

              <tbody>
                {works?.map((work) => (
                  <WorkListItem key={work?._id} work={work} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkList;
