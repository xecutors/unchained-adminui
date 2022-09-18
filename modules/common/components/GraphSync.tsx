import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const GraphSync = ({ dailySync }) => {
  const normalizeChartData = () => {
    const chartData = dailySync?.map((syncDailyData) => {
      return {
        name: new Date(syncDailyData.started).toDateString().substring(4, 10),
        new: syncDailyData.result.sync.stats?.products?.newItems?.length || 0,
        removed:
          syncDailyData.result.sync.stats?.products?.removedItems?.length || 0,
      };
    });
    return chartData;
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  );

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: 'false',
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const data = {
    labels: normalizeChartData().map((syncDailyData) => syncDailyData.name),
    datasets: [
      {
        fill: true,
        label: 'New Product',
        data: normalizeChartData().map((syncDailyData) => syncDailyData.new),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        fill: true,
        label: 'Removed Product',
        data: normalizeChartData().map(
          (syncDailyData) => syncDailyData.removed,
        ),
        borderColor: 'rgba(250,204,21)',
        backgroundColor: 'rgba(250,204,21,0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default GraphSync;
