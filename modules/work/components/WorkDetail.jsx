import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import loadable from '@loadable/component';
const ReactJson = loadable(() => import('react-json-view'));

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const WorkDetail = ({ work }) => {
  const formattedDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const typeStyle = {
    NEW: 'bg-slate-300',
    ALLOCATED: 'bg-slate-100',
    SUCCESS: 'bg-green-500 text-black',
    FAILED: 'bg-red-500 text-white',
    DELETED: 'bg-yellow-200 text-red-500',
  };

  return (
    <>
      <div className="w-full border-t border-gray-300" />

      <div className="my-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-8 w-full">
          <div className="bg-white rounded-lg border border-gray-200 shadow-md p-2 sm:p-3 lg:p-4">
            <div className="flex justify-around items-center">
              <div className="text-sm font-medium text-gray-500 mr-4">
                Work Type
              </div>
              <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                {work?.type}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-gray-500">
                Work Status
              </div>
              <div
                className={`mt-1 max-w-prose text-sm rounded-full text-gray-900 space-y-5 ${
                  typeStyle[work?.status]
                } py-2 px-6`}
              >
                {work?.status}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-gray-500">Priority</div>
              <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                {work?.priority}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8">
            <Line
              options={options}
              data={{
                labels: ['Created', 'Scheduled', 'Started', 'Finished'],
                datasets: [
                  {
                    label: 'Work Schedule',
                    data: [
                      work?.created,
                      work?.scheduled,
                      work?.started,
                      work?.finished,
                    ],
                    borderColor: 'red',
                    backgroundColor: 'blue',
                    showLine: false,
                    pointStyle: 'rectRounded',
                    pointRadius: 10,
                    pointHoverRadius: 15,
                  },
                ],
              }}
            />
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8">
            <div className="sm:col-span-1">
              <div className="text-sm font-medium text-gray-500">
                Work Result
              </div>

              <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                <ReactJson src={work?.result} collapsed={true} />
              </div>
            </div>

            <div className="sm:col-span-1">
              <div className="text-sm font-medium text-gray-500">
                Work Input
              </div>
              <div className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                <ReactJson src={work?.input} collapsed={true} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Error</dt>
              <dd className="mt-1 max-w-prose text-sm text-gray-900 space-y-5">
                {work?.error ? (
                  <ReactJson src={work?.error} collapsed={true} />
                ) : (
                  'No Error'
                )}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkDetail;
