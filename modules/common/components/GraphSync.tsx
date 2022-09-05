import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function GraphSync({ dailySync }) {
  const normalizeChartData = () => {
    const chartData = dailySync?.map((syncDailyData) => {
      return {
        name: new Date(syncDailyData.started).toDateString().substring(4, 10),
        new: syncDailyData.result.sync.stats.products.newItems.length,
        removed: syncDailyData.result.sync.stats.products.removedItems?.length,
      };
    });
    return chartData;
  };

  return (
    <>
      <AreaChart
        width={350}
        height={150}
        data={normalizeChartData()}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ff4d4d" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#4a4db5" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" fontSize={12} fontWeight={400} />
        <YAxis fontSize={12} fontWeight={400} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="removed"
          stroke="#ff4d4d"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="new"
          stroke="#6366f1"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </>
  );
}

export default GraphSync;
