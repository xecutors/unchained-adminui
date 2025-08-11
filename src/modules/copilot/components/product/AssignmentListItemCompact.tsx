import React from 'react';
import { useIntl } from 'react-intl';
import ProductItemWrapperCompact from './ProductItemWrapperCompact';

interface AssignmentListItemCompactProps {
  assignment: {
    productId: string;
    vectors: { key: string; value: string }[];
  };
}

const AssignmentListItemCompact: React.FC<AssignmentListItemCompactProps> = ({
  assignment,
}) => {
  const { formatMessage } = useIntl();

  return (
    <div className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-200 w-full overflow-hidden">
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
          {formatMessage({
            id: 'assignment.title',
            defaultMessage: 'Product Assignment',
          })}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
          {formatMessage({
            id: 'assignment.productId',
            defaultMessage: 'Product ID',
          })}
          : {assignment.productId}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 max-w-[60%]">
        {assignment.vectors?.map((vector, idx) => (
          <span
            key={idx}
            className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 dark:bg-blue-800 dark:text-blue-200 rounded"
          >
            <span className="font-semibold mr-1">{vector.key}:</span>{' '}
            {vector.value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AssignmentListItemCompact;
