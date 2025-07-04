import React from 'react';
import AssortmentList from '../../modules/chat/components/CopilotAssortmentList';
import AssortmentResultsSummary from '../../modules/chat/components/AssortmentResultsSummary';

interface UnifiedAssortmentListProps {
  assortmentSections: Array<{
    assortments: any[];
    filters?: any;
    title?: string;
  }>;
}

const UnifiedAssortmentList: React.FC<UnifiedAssortmentListProps> = ({
  assortmentSections,
}) => {
  // Combine all assortments from all sections
  const allAssortments = assortmentSections.flatMap(
    (section) => section.assortments,
  );

  // Combine all filters (if any)
  const combinedFilters = assortmentSections.reduce((acc, section) => {
    if (section.filters) {
      return { ...acc, ...section.filters };
    }
    return acc;
  }, {});

  if (!allAssortments.length) return null;

  return (
    <div className="mb-6 w-full max-w-full overflow-hidden">
      <div className="max-w-full overflow-hidden">
        <AssortmentResultsSummary
          assortments={allAssortments}
          requestedFilters={
            Object.keys(combinedFilters).length ? combinedFilters : undefined
          }
        />
      </div>
      <div className="w-full max-w-full overflow-hidden">
        <AssortmentList assortments={allAssortments} />
      </div>
    </div>
  );
};

export default UnifiedAssortmentList;
