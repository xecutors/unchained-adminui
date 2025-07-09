import React from 'react';
import { useIntl } from 'react-intl';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
import useRealAnalytics from '../hooks/useRealAnalytics';
import useOrderItemsAnalytics from '../hooks/useOrderItemsAnalytics';

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

const SimpleDashboard: React.FC = () => {
  const { formatMessage } = useIntl();
  const { analytics, loading, error } = useRealAnalytics();
  const {
    topProducts: realTopProducts,
    loading: productsLoading,
    error: productsError,
  } = useOrderItemsAnalytics();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="col-span-2">
          <CardContent className="p-6">
            <p className="text-red-600 dark:text-red-400">
              Error loading analytics: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const {
    totalSales,
    totalOrders,
    averageOrderValue,
    currency,
    salesGrowth,
    ordersGrowth,
    avgOrderValueGrowth,
    topProducts,
    salesData,
  } = analytics;

  // Use real top products if available, fallback to analytics mock data
  const displayTopProducts =
    realTopProducts.length > 0 ? realTopProducts : topProducts;

  // Custom formatter for currency values in tooltips
  const formatCurrency = (value) =>
    `${currency} ${Math.round(value).toLocaleString('de-CH')}`;

  // Custom formatter for count values in tooltips
  const formatCount = (value) => Math.round(value).toLocaleString('de-CH');

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
      {/* Total Sales Chart */}
      <Card className="relative overflow-hidden rounded-xl border-0 bg-white">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardDescription className="text-slate-500 font-medium">
              {formatMessage({
                id: 'total_sales',
                defaultMessage: 'Total sales',
              })}{' '}
              {new Date().toLocaleDateString('de-CH', {
                month: 'long',
                year: 'numeric',
              })}
            </CardDescription>
          </div>
          <CardTitle className="text-4xl font-bold text-slate-900 mt-2">
            {currency} {Math.round(totalSales).toLocaleString('de-CH')}
          </CardTitle>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp
              className={`h-4 w-4 ${salesGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}
            />
            <span
              className={`text-sm font-medium ${salesGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {salesGrowth >= 0 ? '+' : ''}
              {salesGrowth.toFixed(1)}% from last month
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={salesData}
              margin={{
                left: 12,
                right: 12,
                bottom: 12,
                top: 12,
              }}
            >
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                tickFormatter={(value) => value.slice(0, 6)}
              />
              <YAxis hide />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent hideLabel formatter={formatCurrency} />
                }
              />
              <Area
                dataKey="sales"
                type="monotone"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#salesGradient)"
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Total Orders Chart */}
      <Card className="relative overflow-hidden rounded-xl border-0 bg-white">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardDescription className="text-slate-500 font-medium">
              {formatMessage({
                id: 'total_orders',
                defaultMessage: 'Total orders',
              })}{' '}
              {new Date().toLocaleDateString('de-CH', {
                month: 'long',
                year: 'numeric',
              })}
            </CardDescription>
          </div>
          <CardTitle className="text-4xl font-bold text-slate-900 mt-2">
            {totalOrders.toLocaleString('de-CH')}
          </CardTitle>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp
              className={`h-4 w-4 ${ordersGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}
            />
            <span
              className={`text-sm font-medium ${ordersGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {ordersGrowth >= 0 ? '+' : ''}
              {ordersGrowth.toFixed(1)}% from last month
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={salesData}
              margin={{
                left: 12,
                right: 12,
                bottom: 12,
                top: 12,
              }}
            >
              <defs>
                <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                tickFormatter={(value) => value.slice(0, 6)}
              />
              <YAxis hide />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent hideLabel formatter={formatCount} />
                }
              />
              <Area
                dataKey="orders"
                type="monotone"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#ordersGradient)"
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Average Order Value Chart */}
      <Card className="relative overflow-hidden rounded-xl border-0 bg-white">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardDescription className="text-slate-500 font-medium">
              {formatMessage({
                id: 'average_order_value',
                defaultMessage: 'Average order value',
              })}{' '}
              {new Date().toLocaleDateString('de-CH', {
                month: 'long',
                year: 'numeric',
              })}
            </CardDescription>
          </div>
          <CardTitle className="text-4xl font-bold text-slate-900 mt-2">
            {currency} {Math.round(averageOrderValue).toLocaleString('de-CH')}
          </CardTitle>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp
              className={`h-4 w-4 ${avgOrderValueGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}
            />
            <span
              className={`text-sm font-medium ${avgOrderValueGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {avgOrderValueGrowth >= 0 ? '+' : ''}
              {avgOrderValueGrowth.toFixed(1)}% from last month
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={salesData}
              margin={{
                left: 12,
                right: 12,
                bottom: 12,
                top: 12,
              }}
            >
              <defs>
                <linearGradient
                  id="avgOrderGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                tickFormatter={(value) => value.slice(0, 6)}
              />
              <YAxis hide />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent hideLabel formatter={formatCurrency} />
                }
              />
              <Area
                dataKey="avgOrderValue"
                type="monotone"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#avgOrderGradient)"
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Top Selling Products */}
      <Card className="relative overflow-hidden rounded-xl border-0 bg-white">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardDescription className="text-slate-500 font-medium">
              {formatMessage({
                id: 'top_selling_products',
                defaultMessage: 'Top selling products',
              })}{' '}
              {new Date().toLocaleDateString('de-CH', {
                month: 'long',
                year: 'numeric',
              })}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {productsLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-4 w-40 bg-slate-100 rounded-lg animate-pulse" />
                  <div className="h-4 w-12 bg-slate-100 rounded-lg animate-pulse" />
                </div>
              ))}
            </div>
          ) : productsError && !realTopProducts.length ? (
            <div className="text-center py-8">
              <span className="text-slate-400 text-sm">
                {formatMessage({
                  id: 'products_data_unavailable',
                  defaultMessage: 'Product data unavailable',
                })}
              </span>
            </div>
          ) : displayTopProducts.length > 0 ? (
            <div className="space-y-4">
              {displayTopProducts.map((product, index) => (
                <div
                  key={product.productId || index}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {product.productImage && (
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="w-8 h-8 rounded-md object-cover flex-shrink-0"
                      />
                    )}
                    <span className="text-slate-700 text-sm font-medium truncate">
                      {product.productName || `Product ${index + 1}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-slate-700 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((product.totalQuantity / (displayTopProducts[0]?.totalQuantity || 1)) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-900 w-8 text-right">
                      {product.totalQuantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <span className="text-slate-400 text-sm">
                {formatMessage({
                  id: 'no_product_sales_data',
                  defaultMessage: 'No product sales data available',
                })}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleDashboard;
