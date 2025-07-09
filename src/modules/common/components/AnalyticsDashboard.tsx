import React from 'react';
import { useIntl } from 'react-intl';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Euro, ShoppingCart, Calculator } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '../../../components/ui/chart';
import useSalesAnalytics from '../hooks/useSalesAnalytics';

const chartConfig = {
  sales: {
    label: 'Sales',
    color: 'hsl(var(--chart-1))',
  },
  orders: {
    label: 'Orders',
    color: 'hsl(var(--chart-2))',
  },
  avgOrderValue: {
    label: 'Avg Order Value',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

const AnalyticsDashboard: React.FC = () => {
  const { formatMessage } = useIntl();
  const {
    totalSales,
    totalOrders,
    averageOrderValue,
    salesData,
    topProducts,
    loading,
  } = useSalesAnalytics(30);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Total Sales Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center gap-2">
            <Euro className="h-4 w-4" />
            {formatMessage({
              id: 'total_sales',
              defaultMessage: 'Total sales',
            })}
          </CardDescription>
          <CardTitle className="text-3xl">
            € {totalSales.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={salesData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 6)}
              />
              <YAxis hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="sales"
                type="natural"
                stroke="var(--color-sales)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mt-2">
            <TrendingUp className="h-4 w-4" />
            <span>03 Nov - 30 Nov</span>
          </div>
        </CardContent>
      </Card>

      {/* Total Orders Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            {formatMessage({
              id: 'total_orders',
              defaultMessage: 'Total orders',
            })}
          </CardDescription>
          <CardTitle className="text-3xl">{totalOrders}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={salesData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 6)}
              />
              <YAxis hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="orders" fill="var(--color-orders)" radius={4} />
            </BarChart>
          </ChartContainer>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mt-2">
            <TrendingUp className="h-4 w-4" />
            <span>03 Nov - 30 Nov</span>
          </div>
        </CardContent>
      </Card>

      {/* Average Order Value Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            {formatMessage({
              id: 'average_order_value',
              defaultMessage: 'Average order value',
            })}
          </CardDescription>
          <CardTitle className="text-3xl">€ {averageOrderValue}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={salesData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 6)}
              />
              <YAxis hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="avgOrderValue"
                type="natural"
                stroke="var(--color-avgOrderValue)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mt-2">
            <TrendingUp className="h-4 w-4" />
            <span>03 Nov - 30 Nov</span>
          </div>
        </CardContent>
      </Card>

      {/* Top Selling Products */}
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>
            {formatMessage({
              id: 'top_selling_products',
              defaultMessage: 'Top selling products',
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topProducts.slice(0, 6).map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                    {product.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min((product.sales / (topProducts[0]?.sales || 1)) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100 w-8 text-right">
                    {product.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mt-4">
            <TrendingUp className="h-4 w-4" />
            <span>03 Nov - 30 Nov</span>
          </div>
          <div className="mt-4">
            <button className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
              {formatMessage({
                id: 'show_all_products',
                defaultMessage: 'Show all products',
              })}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
