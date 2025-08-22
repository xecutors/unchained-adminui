import { ReactNode } from 'react';

import renderSystemInfo from './tool-renderers/systemInfoRenderers';
import {
  renderPrice,
  ProductRenderers,
} from './tool-renderers/ProductRenderers';
import assortmentRenderers from './tool-renderers/AssortmentRenderers';

import { ToolName, PriceReturnTools } from '../hooks/useToolTextNormalizer';
import { renderProvidersToolResponses } from './tool-renderers/providerRenderes';
import { renderOrderToolResponses } from './tool-renderers/orderRenderers';
import { renderLocalizationToolResponses } from './tool-renderers/localizationRenderes';
import renderImage from './tool-renderers/imageRenderer';
import userRenderers from './tool-renderers/userRenderers';

type ToolRenderFn = (data: any) => ReactNode | null;

const ToolRenderer: Record<string, ToolRenderFn> = {
  system_management: renderSystemInfo,
  generateImage: renderImage,
  product_management: ProductRenderers,
  localization_management: renderLocalizationToolResponses,
  assortment_management: assortmentRenderers,
  order_management: renderOrderToolResponses,
  provider_management: renderProvidersToolResponses,
  users_management: userRenderers,
  ...Object.fromEntries(PriceReturnTools.map((name) => [name, renderPrice])),
};

export default ToolRenderer;
