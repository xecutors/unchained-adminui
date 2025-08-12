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

const renderMultipleAssortments = (data: any) =>
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
  GET_CHILDREN: CopilotAssortmentList,
  GET_LINKS: CopilotAssortmentList,
  REORDER_LINKS: CopilotAssortmentList,
  ADD_LINK: AssortmentListItemCompact,
  GET: AssortmentListItemCompact,
  CREATE: AssortmentListItemCompact,
  UPDATE: AssortmentListItemCompact,
  REMOVE: AssortmentListItemCompact,
  SET_BASE: AssortmentListItemCompact,
  UPDATE_STATUS: AssortmentListItemCompact,
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
