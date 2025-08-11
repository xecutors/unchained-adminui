import {
  AssortmentListItemCompact,
  AssortmentResultsSummary,
  CopilotAssortmentList,
} from '../assortment';
import CopilotMediaList from '../product/CopilotMediaList';
import { renderTexts } from './textRenderers';
import { ProductList, ProductListItemCompact } from '../product';
import CopilotFilterList, {
  CopilotFilterItem,
} from '../product/CopilotFilterList';

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

const toolsMap = {
  LIST: renderMultipleAssortments,
  GET_CHILDREN: renderMultipleAssortments,
  GET: renderSingleAssortment,
  CREATE: renderSingleAssortment,
  UPDATE: renderSingleAssortment,
  REMOVE: renderSingleAssortment,
  SET_BASE: renderSingleAssortment,
  UPDATE_STATUS: renderSingleAssortment,
  GET_TEXTS: renderTexts('GET_TEXTS'),
  GET_MEDIA_TEXTS: renderTexts('GET_MEDIA_TEXTS'),
  UPDATE_MEDIA_TEXTS: renderTexts('UPDATE_MEDIA_TEXTS'),
  REMOVE_MEDIA: CopilotMediaList,
  GET_MEDIA: CopilotMediaList,
  ADD_MEDIA: CopilotMediaList,
  REORDER_MEDIA: CopilotMediaList,
  GET_PRODUCTS: ProductList,
  ADD_PRODUCT: ProductListItemCompact,
  REORDER_PRODUCTS: ProductList,
  ADD_FILTER: CopilotFilterItem,
  GET_FILTERS: CopilotFilterList,
  REORDER_FILTERS: CopilotFilterList,
};

const AssortmentRenderers = ({ data, action }) => {
  const Component = toolsMap?.[action];
  return Component ? (
    <Component {...data} />
  ) : (
    JSON.stringify({ action, data }, null, 2)
  );
};
export default AssortmentRenderers;
