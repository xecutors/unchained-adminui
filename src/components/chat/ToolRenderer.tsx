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

export const SkippedToolResponse = [
  'assortment_addMedia',
  'assortment_removeMedia',
  'productMedia_remove',
  'product_addMedia',
];

export const SingleProductReturnTools = [
  'product_get',
  'product_create',
  'product_update',
  'product_updateCommerce',
  'product_remove',
  'product_publish',
  'product_unpublish',
  'product_updateWarehousing',
  'product_updateSupply',
  'product_updateTokenization',
  'product_updatePlan',
  'product_createVariation',
];

export const MultipleProductReturnTools = [
  'product_list',
  'assortment_getProducts',
];

export const TextsReturnTools = [
  'product_updateTexts',
  'productMedia_updateTexts',
  'product_getTexts',
  'productMedia_getTexts',
  'assortmentMedia_updateTexts',
  'assortmentMedia_getTexts',
  'assortment_getTexts',
  'assortment_updateTexts',
  'productVariation_updateTexts',
  'productVariation_getTexts',
];

export const SingleAssortmentReturnTools = [
  'assortment_create',
  'assortment_update',
  'assortment_remove',
  'assortment_setBase',
  'assortment_get',
  'assortment_searchProducts',
];

export const MultipleAssortmentReturnTools = [
  'assortment_getChildren',
  'assortment_list',
];

export const SingleCountryReturnTools = [
  'country_create',
  'country_update',
  'country_remove',
  'country_get',
];

export const MultipleCountryReturnTools = ['country_list'];

export const SingleCurrencyReturnTools = [
  'currency_create',
  'currency_update',
  'currency_remove',
  'currency_get',
];

export const MultipleCurrencyReturnTools = ['currency_list'];

export const SingleLanguageReturnTools = [
  'language_create',
  'language_update',
  'language_remove',
  'language_get',
];

export const MultipleLanguageReturnTools = ['languages_list'];

type ToolRenderFn = (data: any) => ReactElement | null;

const ToolRenderer: Record<string, ToolRenderFn> = {
  shop_info: renderShopInfo,
  generateImage: renderImage,
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
