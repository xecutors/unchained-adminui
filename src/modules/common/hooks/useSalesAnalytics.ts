import { useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import { format, parseISO, subDays, startOfDay, endOfDay } from 'date-fns';

const SALES_ANALYTICS_QUERY = gql`
  query SalesAnalytics($filter: OrderFilterInput) {
    orders(filter: $filter, limit: 1000) {
      _id
      ordered
      status
      total {
        amount
        currencyCode
      }
      items {
        product {
          _id
          texts {
            title
          }
        }
        quantity
        total {
          amount
        }
      }
    }
  }
`;

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
  avgOrderValue: number;
}

export interface TopProduct {
  name: string;
  sales: number;
  quantity: number;
}

export interface SalesAnalyticsResult {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  salesData: SalesData[];
  topProducts: TopProduct[];
  loading: boolean;
  error: any;
}

const useSalesAnalytics = (days: number = 30): SalesAnalyticsResult => {
  const endDate = new Date();
  const startDate = subDays(endDate, days);

  const { data, loading, error } = useQuery(SALES_ANALYTICS_QUERY, {
    variables: {
      filter: {
        ordered: {
          gte: startOfDay(startDate).toISOString(),
          lte: endOfDay(endDate).toISOString(),
        },
        status: 'CONFIRMED',
      },
    },
    errorPolicy: 'all',
  });

  return useMemo(() => {
    if (!data?.orders) {
      return {
        totalSales: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        salesData: [],
        topProducts: [],
        loading,
        error,
      };
    }

    const orders = data.orders;

    // Calculate total metrics
    const totalSales =
      orders.reduce(
        (sum: number, order: any) => sum + (order.total?.amount || 0),
        0,
      ) / 100; // Convert from cents

    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    // Generate daily sales data
    const dailySales = new Map<string, { sales: number; orders: number }>();

    // Initialize all days with 0
    for (let i = 0; i < days; i++) {
      const date = format(subDays(endDate, i), 'MMM d');
      dailySales.set(date, { sales: 0, orders: 0 });
    }

    // Aggregate orders by date
    orders.forEach((order: any) => {
      if (order.ordered && order.total?.amount) {
        const orderDate = format(parseISO(order.ordered), 'MMM d');
        const existing = dailySales.get(orderDate) || { sales: 0, orders: 0 };
        existing.sales += order.total.amount / 100; // Convert from cents
        existing.orders += 1;
        dailySales.set(orderDate, existing);
      }
    });

    const salesData: SalesData[] = Array.from(dailySales.entries())
      .map(([date, data]) => ({
        date,
        sales: Math.round(data.sales),
        orders: data.orders,
        avgOrderValue:
          data.orders > 0 ? Math.round(data.sales / data.orders) : 0,
      }))
      .reverse(); // Reverse to show chronological order

    // Calculate top products
    const productSales = new Map<
      string,
      { name: string; sales: number; quantity: number }
    >();

    orders.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        const productName = item.product?.texts?.title || 'Unknown Product';
        const existing = productSales.get(productName) || {
          name: productName,
          sales: 0,
          quantity: 0,
        };
        existing.sales += item.total?.amount / 100 || 0; // Convert from cents
        existing.quantity += item.quantity || 0;
        productSales.set(productName, existing);
      });
    });

    const topProducts: TopProduct[] = Array.from(productSales.values())
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10)
      .map((product) => ({
        ...product,
        sales: Math.round(product.sales),
      }));

    return {
      totalSales: Math.round(totalSales),
      totalOrders,
      averageOrderValue: Math.round(averageOrderValue),
      salesData,
      topProducts,
      loading,
      error,
    };
  }, [data, loading, error, days]);
};

export default useSalesAnalytics;
