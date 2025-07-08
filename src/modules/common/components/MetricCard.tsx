import React from 'react';
import { useIntl } from 'react-intl';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  loading = false,
  onClick,
}) => {
  const { formatNumber } = useIntl();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`
        bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm
        ${onClick ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors' : ''}
      `}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {loading ? (
              <span className="animate-pulse bg-slate-300 dark:bg-slate-600 rounded h-8 w-16 inline-block"></span>
            ) : typeof value === 'number' ? (
              formatNumber(value)
            ) : (
              value
            )}
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
            {React.cloneElement(icon as React.ReactElement, {
              className: 'h-6 w-6 text-slate-600 dark:text-slate-300',
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
