import { ReactElement } from 'react';

import renderShopInfo from './tool-renderers/shopRenderers';
import {
  renderSingleProduct,
  renderMultipleProducts,
} from './tool-renderers/productRenderers';
import {
  renderSingleAssortment,
  renderMultipleAssortments,
} from './tool-renderers/assortmentRenderers';
import {
  renderSingleCountry,
  renderMultipleCountries,
} from './tool-renderers/countryRenderers';
import {
  renderSingleCurrency,
  renderMultipleCurrencies,
} from './tool-renderers/currencyRenderers';
import renderImage from './tool-renderers/imageRenderer';
import {
  renderSingleLanguage,
  renderMultipleLanguages,
} from './tool-renderers/languageRenderers';
import { renderTexts } from './tool-renderers/textRenderers';
import { renderMedias } from './tool-renderers/renderMedias';
import {
  MediaListReturnTools,
  SingleProductReturnTools,
  MultipleProductReturnTools,
  TextsReturnTools,
  SingleAssortmentReturnTools,
  MultipleAssortmentReturnTools,
  SingleCountryReturnTools,
  MultipleCountryReturnTools,
  SingleCurrencyReturnTools,
  MultipleCurrencyReturnTools,
  SingleLanguageReturnTools,
  MultipleLanguageReturnTools,
} from '../../modules/chat/hooks/useToolTextNormalizer';

type ToolRenderFn = (data: any) => ReactElement | null;

const ToolRenderer: Record<string, ToolRenderFn> = {
  shop_info: renderShopInfo,
  generateImage: renderImage,
  ...Object.fromEntries(
    MediaListReturnTools.map((name) => [name, renderMedias]),
  ),
  ...Object.fromEntries(
    SingleProductReturnTools.map((name) => [name, renderSingleProduct]),
  ),
  ...Object.fromEntries(
    MultipleProductReturnTools.map((name) => [name, renderMultipleProducts]),
  ),
  ...Object.fromEntries(
    TextsReturnTools.map((name) => [name, renderTexts(name)]),
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
  ...Object.fromEntries(
    SingleCountryReturnTools.map((name) => [name, renderSingleCountry]),
  ),
  ...Object.fromEntries(
    MultipleCountryReturnTools.map((name) => [name, renderMultipleCountries]),
  ),
  ...Object.fromEntries(
    SingleCurrencyReturnTools.map((name) => [name, renderSingleCurrency]),
  ),
  ...Object.fromEntries(
    MultipleCurrencyReturnTools.map((name) => [name, renderMultipleCurrencies]),
  ),
  ...Object.fromEntries(
    SingleLanguageReturnTools.map((name) => [name, renderSingleLanguage]),
  ),
  ...Object.fromEntries(
    MultipleLanguageReturnTools.map((name) => [name, renderMultipleLanguages]),
  ),
};

export default ToolRenderer;
