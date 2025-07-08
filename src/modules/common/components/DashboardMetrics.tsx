import React from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import {
  InboxStackIcon,
  CubeIcon,
  UsersIcon,
  RectangleStackIcon,
} from '@heroicons/react/20/solid';
import MetricCard from './MetricCard';
import useDashboardMetrics from '../hooks/useDashboardMetrics';

const DashboardMetrics: React.FC = () => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { metrics } = useDashboardMetrics();

  const metricCards = [
    {
      title: formatMessage({
        id: 'total_orders',
        defaultMessage: 'Total Orders',
      }),
      value: metrics.orders.value,
      icon: <InboxStackIcon />,
      loading: metrics.orders.loading,
      onClick: () => router.push('/orders'),
    },
    {
      title: formatMessage({
        id: 'products_count',
        defaultMessage: 'Products',
      }),
      value: metrics.products.value,
      icon: <CubeIcon />,
      loading: metrics.products.loading,
      onClick: () => router.push('/products'),
    },
    {
      title: formatMessage({
        id: 'customers_count',
        defaultMessage: 'Customers',
      }),
      value: metrics.customers.value,
      icon: <UsersIcon />,
      loading: metrics.customers.loading,
      onClick: () => router.push('/users'),
    },
    {
      title: formatMessage({
        id: 'categories_count',
        defaultMessage: 'Assortments',
      }),
      value: metrics.categories.value,
      icon: <RectangleStackIcon />,
      loading: metrics.categories.loading,
      onClick: () => router.push('/assortments'),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricCards.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          loading={metric.loading}
          onClick={metric.onClick}
        />
      ))}
    </div>
  );
};

export default DashboardMetrics;
