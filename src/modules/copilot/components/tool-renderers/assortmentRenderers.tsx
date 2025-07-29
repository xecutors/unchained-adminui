import {
  AssortmentListItemCompact,
  AssortmentResultsSummary,
  CopilotAssortmentList,
} from '../assortment';

export const renderSingleAssortment = (data: any) =>
  data?.assortment ? (
    <AssortmentListItemCompact assortment={data.assortment} />
  ) : null;

export const renderMultipleAssortments = (data: any) =>
  data?.assortments ? (
    <div className="mb-6">
      <AssortmentResultsSummary
        assortments={data.assortments}
        requestedFilters={data.filters}
      />
      <CopilotAssortmentList assortments={data.assortments} />
    </div>
  ) : null;
