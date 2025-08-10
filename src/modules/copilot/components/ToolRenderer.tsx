import { ReactElement } from 'react';

import renderShopInfo from './tool-renderers/shopRenderers';
import {
  renderVariations,
  renderAssignments,
  renderBundles,
  renderPrice,
  renderProductToolResponses,
} from './tool-renderers/productRenderers';
import {
  renderSingleAssortment,
  renderMultipleAssortments,
} from './tool-renderers/assortmentRenderers';

import { renderTexts } from './tool-renderers/textRenderers';
import { renderMedias } from './tool-renderers/renderMedias';
import {
  MediaListReturnTools,
  SingleAssortmentReturnTools,
  MultipleAssortmentReturnTools,
  ToolName,
  PriceReturnTools,
  ProductBundleReturnTools,
  ProductVariationsReturnTools,
  ProductAssignmentsReturnTools,
} from '../hooks/useToolTextNormalizer';
import { renderProvidersToolResponses } from './tool-renderers/providerRenderes';
import { renderOrderToolResponses } from './tool-renderers/orderRenderers';
import { renderLocalizationToolResponses } from './tool-renderers/localizationRenderes';
import renderImage from './tool-renderers/imageRenderer';

type ToolRenderFn = (data: any) => ReactElement | null;

const ToolRenderer: Record<ToolName, ToolRenderFn> = {
  shop_info: renderShopInfo,
  generateImage: renderImage,
  product_management: renderProductToolResponses,
  localization_management: renderLocalizationToolResponses,
  order_management: renderOrderToolResponses,
  provider_management: renderProvidersToolResponses,
  ...Object.fromEntries(
    ProductAssignmentsReturnTools.map((name) => [name, renderAssignments]),
  ),
  ...Object.fromEntries(
    ProductBundleReturnTools.map((name) => [name, renderBundles]),
  ),
  ...Object.fromEntries(
    ProductVariationsReturnTools.map((name) => [name, renderVariations]),
  ),

  ...Object.fromEntries(PriceReturnTools.map((name) => [name, renderPrice])),
  ...Object.fromEntries(
    MediaListReturnTools.map((name) => [name, renderMedias]),
  ),
  ...Object.fromEntries(
    SingleAssortmentReturnTools.map((name) => [name, renderSingleAssortment]),
  ),
  ...Object.fromEntries(
    MultipleAssortmentReturnTools.map((name) => [
      name,
      renderMultipleAssortments,
    ]),
  ),
};

export default ToolRenderer;
