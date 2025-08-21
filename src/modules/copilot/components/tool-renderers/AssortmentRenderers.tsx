import {
  AssortmentListItemCompact,
  AssortmentResultsSummary,
  CopilotAssortmentList,
} from '../assortment';
import CopilotMediaList from '../product/CopilotMediaList';
import { renderTexts } from './textRenderers';
import { ProductList } from '../product';
import CopilotFilterList from '../product/CopilotFilterList';
import CopilotProductList from '../product/CopilotProductList';

const renderMultipleAssortments = (data: any) =>
  data?.assortments ? (
    <div className="mb-6">
      <AssortmentResultsSummary
        assortments={data.assortments}
        requestedFilters={data.filters}
      />
      <CopilotAssortmentList {...data} />
    </div>
  ) : null;

const AssortmentProducts = ({ assortment, products }) => {
  return (
    <AssortmentListItemCompact assortment={assortment}>
      <CopilotProductList products={products} />
    </AssortmentListItemCompact>
  );
};

const AssortmentLinks = ({ assortment, links }) => {
  return (
    <AssortmentListItemCompact assortment={assortment}>
      <CopilotAssortmentList assortments={links} />
    </AssortmentListItemCompact>
  );
};

const AssortmentChildren = ({ assortment, children }) => {
  return (
    <AssortmentListItemCompact assortment={assortment}>
      <CopilotAssortmentList assortments={children} />
    </AssortmentListItemCompact>
  );
};

const AssortmentFilters = ({ assortment, filters }) => {
  return (
    <AssortmentListItemCompact assortment={assortment}>
      <CopilotFilterList filters={filters} />
    </AssortmentListItemCompact>
  );
};

const toolsMap = {
  LIST: renderMultipleAssortments,
  GET_CHILDREN: AssortmentChildren,
  GET_LINKS: AssortmentLinks,
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
  ADD_MEDIA: AssortmentListItemCompact,
  REORDER_MEDIA: CopilotMediaList,
  GET_PRODUCTS: AssortmentProducts,
  ADD_PRODUCT: AssortmentListItemCompact,
  REORDER_PRODUCTS: ProductList,
  ADD_FILTER: AssortmentListItemCompact,
  GET_FILTERS: AssortmentFilters,
  REORDER_FILTERS: CopilotFilterList,
};

const AssortmentRenderers = ({ data, action, toolCallId }) => {
  const Component = toolsMap?.[action];
  return Component ? (
    <Component {...{ toolCallId, ...data }} />
  ) : (
    JSON.stringify({ action, data }, null, 2)
  );
};
export default AssortmentRenderers;
