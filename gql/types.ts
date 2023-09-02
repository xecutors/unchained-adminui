import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type FieldWrapper<T> = T | Promise<T>;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
  LowerCaseString: { input: any; output: any };
  Timestamp: { input: any; output: any };
  Upload: { input: any; output: any };
};

export type IAddress = {
  __typename?: 'Address';
  addressLine?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  addressLine2?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  city?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  company?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  countryCode?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  firstName?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  lastName?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  postalCode?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  regionCode?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IAddressInput = {
  addressLine?: InputMaybe<Scalars['String']['input']>;
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  regionCode?: InputMaybe<Scalars['String']['input']>;
};

export type IAdminUiConfig = {
  __typename?: 'AdminUiConfig';
  customProperties: Array<FieldWrapper<IAdminUiConfigCustomEntityInterface>>;
};

export type IAdminUiConfigCustomEntityInterface = {
  __typename?: 'AdminUiConfigCustomEntityInterface';
  entityName: FieldWrapper<Scalars['String']['output']>;
  inlineFragment: FieldWrapper<Scalars['String']['output']>;
};

/** Assortment */
export type IAssortment = {
  __typename?: 'Assortment';
  _id: FieldWrapper<Scalars['ID']['output']>;
  assortmentPaths: Array<FieldWrapper<IAssortmentPath>>;
  children?: Maybe<Array<FieldWrapper<IAssortment>>>;
  childrenCount: FieldWrapper<Scalars['Int']['output']>;
  created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  deleted?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  filterAssignments?: Maybe<Array<FieldWrapper<IAssortmentFilter>>>;
  isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  isBase?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  isRoot?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  linkedAssortments?: Maybe<Array<FieldWrapper<IAssortmentLink>>>;
  media: Array<FieldWrapper<IAssortmentMedia>>;
  productAssignments?: Maybe<Array<FieldWrapper<IAssortmentProduct>>>;
  searchProducts: FieldWrapper<IProductSearchResult>;
  sequence: FieldWrapper<Scalars['Int']['output']>;
  tags?: Maybe<Array<FieldWrapper<Scalars['LowerCaseString']['output']>>>;
  texts?: Maybe<FieldWrapper<IAssortmentTexts>>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

/** Assortment */
export type IAssortmentChildrenArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Assortment */
export type IAssortmentChildrenCountArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Assortment */
export type IAssortmentMediaArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

/** Assortment */
export type IAssortmentSearchProductsArgs = {
  filterQuery?: InputMaybe<Array<IFilterQueryInput>>;
  ignoreChildAssortments?: InputMaybe<Scalars['Boolean']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<ISearchOrderBy>;
  queryString?: InputMaybe<Scalars['String']['input']>;
};

/** Assortment */
export type IAssortmentTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IAssortmentFilter = {
  __typename?: 'AssortmentFilter';
  _id: FieldWrapper<Scalars['ID']['output']>;
  assortment: FieldWrapper<IAssortment>;
  filter: FieldWrapper<IFilter>;
  sortKey: FieldWrapper<Scalars['Int']['output']>;
  tags?: Maybe<Array<FieldWrapper<Scalars['LowerCaseString']['output']>>>;
};

export type IAssortmentLink = {
  __typename?: 'AssortmentLink';
  _id: FieldWrapper<Scalars['ID']['output']>;
  child: FieldWrapper<IAssortment>;
  parent: FieldWrapper<IAssortment>;
  sortKey: FieldWrapper<Scalars['Int']['output']>;
  tags?: Maybe<Array<FieldWrapper<Scalars['LowerCaseString']['output']>>>;
};

export type IAssortmentMedia = {
  __typename?: 'AssortmentMedia';
  _id: FieldWrapper<Scalars['ID']['output']>;
  file: FieldWrapper<IMedia>;
  sortKey: FieldWrapper<Scalars['Int']['output']>;
  tags?: Maybe<Array<FieldWrapper<Scalars['LowerCaseString']['output']>>>;
  texts?: Maybe<FieldWrapper<IAssortmentMediaTexts>>;
};

export type IAssortmentMediaTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IAssortmentMediaTexts = {
  __typename?: 'AssortmentMediaTexts';
  _id: FieldWrapper<Scalars['ID']['output']>;
  locale?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  subtitle?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

/** Directed assortment to product paths (breadcrumbs) */
export type IAssortmentPath = {
  __typename?: 'AssortmentPath';
  links: Array<FieldWrapper<IAssortmentPathLink>>;
};

/**
 * A connection that represents an uplink from assortment to assortment,
 * assortmentId and assortmentTexts are there for convenience
 * to short-circuit breadcrumb lookups
 */
export type IAssortmentPathLink = {
  __typename?: 'AssortmentPathLink';
  assortmentId: FieldWrapper<Scalars['ID']['output']>;
  assortmentTexts: FieldWrapper<IAssortmentTexts>;
  link?: Maybe<FieldWrapper<IAssortmentLink>>;
};

/**
 * A connection that represents an uplink from assortment to assortment,
 * assortmentId and assortmentTexts are there for convenience
 * to short-circuit breadcrumb lookups
 */
export type IAssortmentPathLinkAssortmentTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IAssortmentProduct = {
  __typename?: 'AssortmentProduct';
  _id: FieldWrapper<Scalars['ID']['output']>;
  assortment: FieldWrapper<IAssortment>;
  product: FieldWrapper<IProduct>;
  sortKey: FieldWrapper<Scalars['Int']['output']>;
  tags?: Maybe<Array<FieldWrapper<Scalars['LowerCaseString']['output']>>>;
};

export type IAssortmentSearchResult = {
  __typename?: 'AssortmentSearchResult';
  assortments: Array<FieldWrapper<IAssortment>>;
  assortmentsCount: FieldWrapper<Scalars['Int']['output']>;
};

export type IAssortmentSearchResultAssortmentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type IAssortmentTexts = {
  __typename?: 'AssortmentTexts';
  _id: FieldWrapper<Scalars['ID']['output']>;
  description?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  locale?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  slug?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  subtitle?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IBookmark = {
  __typename?: 'Bookmark';
  _id: FieldWrapper<Scalars['ID']['output']>;
  created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  product: FieldWrapper<IProduct>;
  user: FieldWrapper<IUser>;
};

/** A Bundle product consists of multiple configured products */
export type IBundleProduct = IProduct & {
  __typename?: 'BundleProduct';
  _id: FieldWrapper<Scalars['ID']['output']>;
  assortmentPaths: Array<FieldWrapper<IProductAssortmentPath>>;
  bundleItems?: Maybe<Array<FieldWrapper<IProductBundleItem>>>;
  created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  media: Array<FieldWrapper<IProductMedia>>;
  published?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  reviews: Array<FieldWrapper<IProductReview>>;
  reviewsCount: FieldWrapper<Scalars['Int']['output']>;
  sequence: FieldWrapper<Scalars['Int']['output']>;
  siblings: Array<FieldWrapper<IProduct>>;
  status: FieldWrapper<IProductStatus>;
  tags?: Maybe<Array<FieldWrapper<Scalars['LowerCaseString']['output']>>>;
  texts?: Maybe<FieldWrapper<IProductTexts>>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

/** A Bundle product consists of multiple configured products */
export type IBundleProductMediaArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

/** A Bundle product consists of multiple configured products */
export type IBundleProductReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

/** A Bundle product consists of multiple configured products */
export type IBundleProductReviewsCountArgs = {
  queryString?: InputMaybe<Scalars['String']['input']>;
};

/** A Bundle product consists of multiple configured products */
export type IBundleProductSiblingsArgs = {
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** A Bundle product consists of multiple configured products */
export type IBundleProductTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export enum ICacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
}

export type IColor = {
  __typename?: 'Color';
  blue?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  green?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  hex?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  name?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  red?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
};

/** Configurable Product (Proxy) */
export type IConfigurableProduct = IProduct & {
  __typename?: 'ConfigurableProduct';
  _id: FieldWrapper<Scalars['ID']['output']>;
  /** Complete assignment matrix */
  assignments: Array<FieldWrapper<IProductVariationAssignment>>;
  assortmentPaths: Array<FieldWrapper<IProductAssortmentPath>>;
  catalogPriceRange?: Maybe<FieldWrapper<IPriceRange>>;
  created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  media: Array<FieldWrapper<IProductMedia>>;
  /** Reduced list of possible products by key/value combinations */
  products?: Maybe<Array<FieldWrapper<IProduct>>>;
  published?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  reviews: Array<FieldWrapper<IProductReview>>;
  reviewsCount: FieldWrapper<Scalars['Int']['output']>;
  sequence: FieldWrapper<Scalars['Int']['output']>;
  siblings: Array<FieldWrapper<IProduct>>;
  simulatedPriceRange?: Maybe<FieldWrapper<IPriceRange>>;
  status: FieldWrapper<IProductStatus>;
  tags?: Maybe<Array<FieldWrapper<Scalars['LowerCaseString']['output']>>>;
  texts?: Maybe<FieldWrapper<IProductTexts>>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  /** Product's variations (keys) and their options (values) */
  variations?: Maybe<Array<FieldWrapper<IProductVariation>>>;
};

/** Configurable Product (Proxy) */
export type IConfigurableProductAssignmentsArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Configurable Product (Proxy) */
export type IConfigurableProductCatalogPriceRangeArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  vectors?: InputMaybe<Array<IProductAssignmentVectorInput>>;
};

/** Configurable Product (Proxy) */
export type IConfigurableProductMediaArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

/** Configurable Product (Proxy) */
export type IConfigurableProductProductsArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  vectors?: InputMaybe<Array<IProductAssignmentVectorInput>>;
};

/** Configurable Product (Proxy) */
export type IConfigurableProductReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

/** Configurable Product (Proxy) */
export type IConfigurableProductReviewsCountArgs = {
  queryString?: InputMaybe<Scalars['String']['input']>;
};

/** Configurable Product (Proxy) */
export type IConfigurableProductSiblingsArgs = {
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Configurable Product (Proxy) */
export type IConfigurableProductSimulatedPriceRangeArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  useNetPrice?: InputMaybe<Scalars['Boolean']['input']>;
  vectors?: InputMaybe<Array<IProductAssignmentVectorInput>>;
};

/** Configurable Product (Proxy) */
export type IConfigurableProductTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IContact = {
  __typename?: 'Contact';
  emailAddress?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  telNumber?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IContactInput = {
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  telNumber?: InputMaybe<Scalars['String']['input']>;
};

export type IContractConfiguration = {
  __typename?: 'ContractConfiguration';
  ercMetadataProperties?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  supply: FieldWrapper<Scalars['Int']['output']>;
  tokenId: FieldWrapper<Scalars['String']['output']>;
};

export type ICountry = {
  __typename?: 'Country';
  _id: FieldWrapper<Scalars['ID']['output']>;
  defaultCurrency?: Maybe<FieldWrapper<ICurrency>>;
  flagEmoji?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  isBase?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  /** ISO 3166-1 alpha-2 https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements */
  isoCode?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  name?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type ICountryNameArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type ICreateAssortmentInput = {
  isRoot?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
  title: Scalars['String']['input'];
};

export type ICreateCountryInput = {
  isoCode: Scalars['String']['input'];
};

export type ICreateCurrencyInput = {
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  isoCode: Scalars['String']['input'];
};

export type ICreateDeliveryProviderInput = {
  adapterKey: Scalars['String']['input'];
  type: IDeliveryProviderType;
};

export type ICreateFilterInput = {
  key: Scalars['String']['input'];
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  type: IFilterType;
};

export type ICreateFilterOptionInput = {
  title: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ICreateLanguageInput = {
  isoCode: Scalars['String']['input'];
};

export type ICreatePaymentProviderInput = {
  adapterKey: Scalars['String']['input'];
  type: IPaymentProviderType;
};

export type ICreateProductBundleItemInput = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type ICreateProductInput = {
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type ICreateProductVariationInput = {
  key: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: IProductVariationType;
};

export type ICreateProductVariationOptionInput = {
  title: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ICreateWarehousingProviderInput = {
  adapterKey: Scalars['String']['input'];
  type: IWarehousingProviderType;
};

export type ICurrency = {
  __typename?: 'Currency';
  _id: FieldWrapper<Scalars['ID']['output']>;
  contractAddress?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  decimals?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  isoCode: FieldWrapper<Scalars['String']['output']>;
};

export type IDateFilterInput = {
  end?: InputMaybe<Scalars['DateTime']['input']>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type IDeliveryInterface = {
  __typename?: 'DeliveryInterface';
  _id: FieldWrapper<Scalars['ID']['output']>;
  label?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  version?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IDeliveryProvider = {
  __typename?: 'DeliveryProvider';
  _id: FieldWrapper<Scalars['ID']['output']>;
  configuration?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  configurationError?: Maybe<FieldWrapper<IDeliveryProviderError>>;
  created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  deleted?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  interface?: Maybe<FieldWrapper<IDeliveryInterface>>;
  isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  simulatedPrice?: Maybe<FieldWrapper<IPrice>>;
  type?: Maybe<FieldWrapper<IDeliveryProviderType>>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

export type IDeliveryProviderSimulatedPriceArgs = {
  context?: InputMaybe<Scalars['JSON']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['ID']['input']>;
  useNetPrice?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum IDeliveryProviderError {
  AdapterNotFound = 'ADAPTER_NOT_FOUND',
  IncompleteConfiguration = 'INCOMPLETE_CONFIGURATION',
  NotImplemented = 'NOT_IMPLEMENTED',
  WrongCredentials = 'WRONG_CREDENTIALS',
}

export enum IDeliveryProviderType {
  /** Pick-Up */
  Pickup = 'PICKUP',
  /** Shipping */
  Shipping = 'SHIPPING',
}

export type IDimensions = {
  __typename?: 'Dimensions';
  height?: Maybe<FieldWrapper<Scalars['Float']['output']>>;
  length?: Maybe<FieldWrapper<Scalars['Float']['output']>>;
  weight?: Maybe<FieldWrapper<Scalars['Float']['output']>>;
  width?: Maybe<FieldWrapper<Scalars['Float']['output']>>;
};

export type IDimensionsHeightArgs = {
  unit?: InputMaybe<ILengthUnit>;
};

export type IDimensionsLengthArgs = {
  unit?: InputMaybe<ILengthUnit>;
};

export type IDimensionsWeightArgs = {
  unit?: InputMaybe<IMassUnit>;
};

export type IDimensionsWidthArgs = {
  unit?: InputMaybe<ILengthUnit>;
};

export type IDiscountInterface = {
  __typename?: 'DiscountInterface';
  _id: FieldWrapper<Scalars['ID']['output']>;
  isManualAdditionAllowed?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  isManualRemovalAllowed?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  label?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  version?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IDispatch = {
  __typename?: 'Dispatch';
  _id: FieldWrapper<Scalars['ID']['output']>;
  deliveryProvider?: Maybe<FieldWrapper<IDeliveryProvider>>;
  earliestDelivery?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  shipping?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  warehousingProvider?: Maybe<FieldWrapper<IWarehousingProvider>>;
};

/** Enrollment */
export type IEnrollment = {
  __typename?: 'Enrollment';
  _id: FieldWrapper<Scalars['ID']['output']>;
  billingAddress?: Maybe<FieldWrapper<IAddress>>;
  contact?: Maybe<FieldWrapper<IContact>>;
  country?: Maybe<FieldWrapper<ICountry>>;
  created: FieldWrapper<Scalars['DateTime']['output']>;
  currency?: Maybe<FieldWrapper<ICurrency>>;
  delivery?: Maybe<FieldWrapper<IEnrollmentDelivery>>;
  enrollmentNumber?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  expires?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  isExpired?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  payment?: Maybe<FieldWrapper<IEnrollmentPayment>>;
  periods: Array<FieldWrapper<IEnrollmentPeriod>>;
  plan: FieldWrapper<IEnrollmentPlan>;
  status: FieldWrapper<IEnrollmentStatus>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  user: FieldWrapper<IUser>;
};

/** Enrollment */
export type IEnrollmentIsExpiredArgs = {
  referenceDate?: InputMaybe<Scalars['Timestamp']['input']>;
};

export type IEnrollmentDelivery = {
  __typename?: 'EnrollmentDelivery';
  provider?: Maybe<FieldWrapper<IDeliveryProvider>>;
};

export type IEnrollmentDeliveryInput = {
  deliveryProviderId: Scalars['ID']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
};

export type IEnrollmentPayment = {
  __typename?: 'EnrollmentPayment';
  provider?: Maybe<FieldWrapper<IPaymentProvider>>;
};

export type IEnrollmentPaymentInput = {
  meta?: InputMaybe<Scalars['JSON']['input']>;
  paymentProviderId: Scalars['ID']['input'];
};

export type IEnrollmentPeriod = {
  __typename?: 'EnrollmentPeriod';
  end: FieldWrapper<Scalars['DateTime']['output']>;
  isTrial: FieldWrapper<Scalars['Boolean']['output']>;
  order?: Maybe<FieldWrapper<IOrder>>;
  start: FieldWrapper<Scalars['DateTime']['output']>;
};

export type IEnrollmentPlan = {
  __typename?: 'EnrollmentPlan';
  configuration?: Maybe<Array<FieldWrapper<IProductConfigurationParameter>>>;
  product: FieldWrapper<IPlanProduct>;
  quantity: FieldWrapper<Scalars['Int']['output']>;
};

export type IEnrollmentPlanInput = {
  configuration?: InputMaybe<Array<IProductConfigurationParameterInput>>;
  productId: Scalars['ID']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export enum IEnrollmentStatus {
  /** Active Enrollment */
  Active = 'ACTIVE',
  /** Initial */
  Initial = 'INITIAL',
  /** Paused because of overdue payments */
  Paused = 'PAUSED',
  /** Terminated / Ended enrollment */
  Terminated = 'TERMINATED',
}

export type IEvent = {
  __typename?: 'Event';
  _id: FieldWrapper<Scalars['ID']['output']>;
  created: FieldWrapper<Scalars['Timestamp']['output']>;
  payload?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  type: FieldWrapper<Scalars['String']['output']>;
};

export enum IEventType {
  AssortmentAddFilter = 'ASSORTMENT_ADD_FILTER',
  AssortmentAddLink = 'ASSORTMENT_ADD_LINK',
  AssortmentAddMedia = 'ASSORTMENT_ADD_MEDIA',
  AssortmentAddProduct = 'ASSORTMENT_ADD_PRODUCT',
  AssortmentCreate = 'ASSORTMENT_CREATE',
  AssortmentRemove = 'ASSORTMENT_REMOVE',
  AssortmentRemoveFilter = 'ASSORTMENT_REMOVE_FILTER',
  AssortmentRemoveLink = 'ASSORTMENT_REMOVE_LINK',
  AssortmentRemoveMedia = 'ASSORTMENT_REMOVE_MEDIA',
  AssortmentRemoveProduct = 'ASSORTMENT_REMOVE_PRODUCT',
  AssortmentReorderFilters = 'ASSORTMENT_REORDER_FILTERS',
  AssortmentReorderLinks = 'ASSORTMENT_REORDER_LINKS',
  AssortmentReorderMedia = 'ASSORTMENT_REORDER_MEDIA',
  AssortmentReorderProducts = 'ASSORTMENT_REORDER_PRODUCTS',
  AssortmentSetBase = 'ASSORTMENT_SET_BASE',
  AssortmentUpdate = 'ASSORTMENT_UPDATE',
  AssortmentUpdateMediaText = 'ASSORTMENT_UPDATE_MEDIA_TEXT',
  AssortmentUpdateTexts = 'ASSORTMENT_UPDATE_TEXTS',
  BookmarkCreate = 'BOOKMARK_CREATE',
  BookmarkRemove = 'BOOKMARK_REMOVE',
  BookmarkUpdate = 'BOOKMARK_UPDATE',
  CountryCreate = 'COUNTRY_CREATE',
  CountryRemove = 'COUNTRY_REMOVE',
  CountryUpdate = 'COUNTRY_UPDATE',
  CurrencyCreate = 'CURRENCY_CREATE',
  CurrencyRemove = 'CURRENCY_REMOVE',
  CurrencyUpdate = 'CURRENCY_UPDATE',
  DeliveryProviderCreate = 'DELIVERY_PROVIDER_CREATE',
  DeliveryProviderRemove = 'DELIVERY_PROVIDER_REMOVE',
  DeliveryProviderUpdate = 'DELIVERY_PROVIDER_UPDATE',
  EnrollmentAddPeriod = 'ENROLLMENT_ADD_PERIOD',
  EnrollmentCreate = 'ENROLLMENT_CREATE',
  EnrollmentRemove = 'ENROLLMENT_REMOVE',
  EnrollmentUpdate = 'ENROLLMENT_UPDATE',
  FileCreate = 'FILE_CREATE',
  FileRemove = 'FILE_REMOVE',
  FileUpdate = 'FILE_UPDATE',
  FilterCreate = 'FILTER_CREATE',
  FilterRemove = 'FILTER_REMOVE',
  FilterUpdate = 'FILTER_UPDATE',
  FilterUpdateTexts = 'FILTER_UPDATE_TEXTS',
  LanguageCreate = 'LANGUAGE_CREATE',
  LanguageRemove = 'LANGUAGE_REMOVE',
  LanguageUpdate = 'LANGUAGE_UPDATE',
  OrderAddDiscount = 'ORDER_ADD_DISCOUNT',
  OrderAddProduct = 'ORDER_ADD_PRODUCT',
  OrderCheckout = 'ORDER_CHECKOUT',
  OrderConfirmed = 'ORDER_CONFIRMED',
  OrderCreate = 'ORDER_CREATE',
  OrderCreateDiscount = 'ORDER_CREATE_DISCOUNT',
  OrderDeliver = 'ORDER_DELIVER',
  OrderEmptyCart = 'ORDER_EMPTY_CART',
  OrderFullfilled = 'ORDER_FULLFILLED',
  OrderPay = 'ORDER_PAY',
  OrderRejected = 'ORDER_REJECTED',
  OrderRemove = 'ORDER_REMOVE',
  OrderRemoveCartItem = 'ORDER_REMOVE_CART_ITEM',
  OrderRemoveDiscount = 'ORDER_REMOVE_DISCOUNT',
  OrderSetDeliveryProvider = 'ORDER_SET_DELIVERY_PROVIDER',
  OrderSetPaymentProvider = 'ORDER_SET_PAYMENT_PROVIDER',
  OrderSignPayment = 'ORDER_SIGN_PAYMENT',
  OrderUpdate = 'ORDER_UPDATE',
  OrderUpdateCartItem = 'ORDER_UPDATE_CART_ITEM',
  OrderUpdateDelivery = 'ORDER_UPDATE_DELIVERY',
  OrderUpdateDiscount = 'ORDER_UPDATE_DISCOUNT',
  OrderUpdatePayment = 'ORDER_UPDATE_PAYMENT',
  PageView = 'PAGE_VIEW',
  PaymentProviderCreate = 'PAYMENT_PROVIDER_CREATE',
  PaymentProviderRemove = 'PAYMENT_PROVIDER_REMOVE',
  PaymentProviderUpdate = 'PAYMENT_PROVIDER_UPDATE',
  ProductAddAssignment = 'PRODUCT_ADD_ASSIGNMENT',
  ProductAddMedia = 'PRODUCT_ADD_MEDIA',
  ProductCreate = 'PRODUCT_CREATE',
  ProductCreateBundleItem = 'PRODUCT_CREATE_BUNDLE_ITEM',
  ProductCreateVariation = 'PRODUCT_CREATE_VARIATION',
  ProductPublish = 'PRODUCT_PUBLISH',
  ProductRemove = 'PRODUCT_REMOVE',
  ProductRemoveAssignment = 'PRODUCT_REMOVE_ASSIGNMENT',
  ProductRemoveBundleItem = 'PRODUCT_REMOVE_BUNDLE_ITEM',
  ProductRemoveMedia = 'PRODUCT_REMOVE_MEDIA',
  ProductRemoveReview = 'PRODUCT_REMOVE_REVIEW',
  ProductRemoveReviewVote = 'PRODUCT_REMOVE_REVIEW_VOTE',
  ProductRemoveVariation = 'PRODUCT_REMOVE_VARIATION',
  ProductRemoveVariationOption = 'PRODUCT_REMOVE_VARIATION_OPTION',
  ProductReorderMedia = 'PRODUCT_REORDER_MEDIA',
  ProductReviewAddVote = 'PRODUCT_REVIEW_ADD_VOTE',
  ProductReviewCreate = 'PRODUCT_REVIEW_CREATE',
  ProductSetBase = 'PRODUCT_SET_BASE',
  ProductUnpublish = 'PRODUCT_UNPUBLISH',
  ProductUpdate = 'PRODUCT_UPDATE',
  ProductUpdateMediaText = 'PRODUCT_UPDATE_MEDIA_TEXT',
  ProductUpdateReview = 'PRODUCT_UPDATE_REVIEW',
  ProductUpdateTexts = 'PRODUCT_UPDATE_TEXTS',
  ProductUpdateVariationTexts = 'PRODUCT_UPDATE_VARIATION_TEXTS',
  ProductVariationOptionCreate = 'PRODUCT_VARIATION_OPTION_CREATE',
  QuotationRemove = 'QUOTATION_REMOVE',
  QuotationRequestCreate = 'QUOTATION_REQUEST_CREATE',
  QuotationUpdate = 'QUOTATION_UPDATE',
  Unknown = 'UNKNOWN',
  UserAddRoles = 'USER_ADD_ROLES',
  UserRemove = 'USER_REMOVE',
  UserUpdate = 'USER_UPDATE',
  UserUpdateAvatar = 'USER_UPDATE_AVATAR',
  UserUpdateBillingAddress = 'USER_UPDATE_BILLING_ADDRESS',
  UserUpdateHeartbeat = 'USER_UPDATE_HEARTBEAT',
  UserUpdateLastContact = 'USER_UPDATE_LAST_CONTACT',
  UserUpdateProfile = 'USER_UPDATE_PROFILE',
  UserUpdateRole = 'USER_UPDATE_ROLE',
  UserUpdateTags = 'USER_UPDATE_TAGS',
  WarehousingProviderCreate = 'WAREHOUSING_PROVIDER_CREATE',
  WarehousingProviderRemove = 'WAREHOUSING_PROVIDER_REMOVE',
  WarehousingProviderUpdate = 'WAREHOUSING_PROVIDER_UPDATE',
}

export type IFilter = {
  __typename?: 'Filter';
  _id: FieldWrapper<Scalars['ID']['output']>;
  created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  key?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  options?: Maybe<Array<FieldWrapper<IFilterOption>>>;
  texts?: Maybe<FieldWrapper<IFilterTexts>>;
  type?: Maybe<FieldWrapper<IFilterType>>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

export type IFilterTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IFilterOption = {
  __typename?: 'FilterOption';
  _id: FieldWrapper<Scalars['ID']['output']>;
  texts?: Maybe<FieldWrapper<IFilterTexts>>;
  value?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IFilterOptionTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IFilterQueryInput = {
  key: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

export type IFilterTexts = {
  __typename?: 'FilterTexts';
  _id: FieldWrapper<Scalars['ID']['output']>;
  locale?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  subtitle?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export enum IFilterType {
  /** Multi-choice */
  MultiChoice = 'MULTI_CHOICE',
  /** Range */
  Range = 'RANGE',
  /** Single-choice */
  SingleChoice = 'SINGLE_CHOICE',
  /** Switch / Boolean */
  Switch = 'SWITCH',
}

export type IGeoPosition = {
  __typename?: 'GeoPosition';
  altitute?: Maybe<FieldWrapper<Scalars['Float']['output']>>;
  latitude: FieldWrapper<Scalars['Float']['output']>;
  longitude: FieldWrapper<Scalars['Float']['output']>;
};

export type ILanguage = {
  __typename?: 'Language';
  _id: FieldWrapper<Scalars['ID']['output']>;
  isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  isBase?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  /** ISO 639-1 alpha-2 https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes */
  isoCode?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  name?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export enum ILengthUnit {
  Feet = 'FEET',
  Meters = 'METERS',
  Millimeters = 'MILLIMETERS',
}

export type ILink = {
  __typename?: 'Link';
  href?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type ILoadedFilter = {
  __typename?: 'LoadedFilter';
  definition: FieldWrapper<IFilter>;
  filteredProductsCount: FieldWrapper<Scalars['Int']['output']>;
  isSelected?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  options?: Maybe<Array<FieldWrapper<ILoadedFilterOption>>>;
  productsCount: FieldWrapper<Scalars['Int']['output']>;
};

export type ILoadedFilterOption = {
  __typename?: 'LoadedFilterOption';
  definition: FieldWrapper<IFilterOption>;
  filteredProductsCount: FieldWrapper<Scalars['Int']['output']>;
  isSelected?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
};

/** Type returned when the user logs in */
export type ILoginMethodResponse = {
  __typename?: 'LoginMethodResponse';
  /** Id of the user logged in user */
  id: FieldWrapper<Scalars['String']['output']>;
  /** Token of the connection */
  token: FieldWrapper<Scalars['String']['output']>;
  /** Expiration date for the token */
  tokenExpires: FieldWrapper<Scalars['DateTime']['output']>;
  /** The logged in user */
  user?: Maybe<FieldWrapper<IUser>>;
};

export enum IMassUnit {
  Gram = 'GRAM',
  Kilogram = 'KILOGRAM',
  Pounds = 'POUNDS',
}

export type IMedia = {
  __typename?: 'Media';
  _id: FieldWrapper<Scalars['ID']['output']>;
  name: FieldWrapper<Scalars['String']['output']>;
  size: FieldWrapper<Scalars['Int']['output']>;
  type: FieldWrapper<Scalars['String']['output']>;
  url: FieldWrapper<Scalars['String']['output']>;
};

export type IMediaUrlArgs = {
  baseUrl?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

export type IMediaUploadTicket = {
  __typename?: 'MediaUploadTicket';
  _id: FieldWrapper<Scalars['ID']['output']>;
  expires: FieldWrapper<Scalars['DateTime']['output']>;
  putURL: FieldWrapper<Scalars['String']['output']>;
};

export type IMutation = {
  __typename?: 'Mutation';
  /** Activate a enrollment by changing the status to ACTIVE */
  activateEnrollment: FieldWrapper<IEnrollment>;
  /** Add a new filter to an assortment */
  addAssortmentFilter: FieldWrapper<IAssortmentFilter>;
  /** Add a new child assortment to an assortment */
  addAssortmentLink: FieldWrapper<IAssortmentLink>;
  /** Add a new media to a assortment */
  addAssortmentMedia: FieldWrapper<IAssortmentMedia>;
  /** Add a new product to an assortment */
  addAssortmentProduct: FieldWrapper<IAssortmentProduct>;
  /** Add a new discount to the cart, a new order gets generated with status = open (= order before checkout / cart) if necessary */
  addCartDiscount: FieldWrapper<IOrderDiscount>;
  /** Add a new item to the cart. Order gets generated with status = open (= order before checkout / cart) if necessary. */
  addCartProduct: FieldWrapper<IOrderItem>;
  /** Add a new quotation to the cart. */
  addCartQuotation: FieldWrapper<IOrderItem>;
  /** Update E-Mail address of any user or logged in user if userId is not provided */
  addEmail: FieldWrapper<IUser>;
  /** Add multiple new item to the cart. Order gets generated with status = open (= order before checkout / cart) if necessary. */
  addMultipleCartProducts: Array<Maybe<FieldWrapper<IOrderItem>>>;
  /**
   * Link a new product to a ConfigurableProduct by providing a configuration
   * combination that uniquely identifies a row in the assignment matrix
   */
  addProductAssignment: FieldWrapper<IProduct>;
  /** Add a new media to a product's visualization */
  addProductMedia: FieldWrapper<IProductMedia>;
  /**
   * Add a vote to a ProductReview.
   * If there there is a previous vote from the user invoking this it will be removed and updated with the new vote
   */
  addProductReviewVote: FieldWrapper<IProductReview>;
  /** Store user W3C Push subscription object */
  addPushSubscription: FieldWrapper<IUser>;
  /** Web3 */
  addWeb3Address: FieldWrapper<IUser>;
  /** Register WebAuthn Credentials for current user */
  addWebAuthnCredentials: FieldWrapper<IUser>;
  /**
   * Add work to the work queue. Each type has its own input shape. If you pinpoint the worker by setting it
   * during creation, the work will be only run by the worker who identifies as that worker.
   */
  addWork?: Maybe<FieldWrapper<IWork>>;
  /**
   * Get the next task from the worker queue. This will also mark the task as "started".
   * Optional worker to identify the worker.
   */
  allocateWork?: Maybe<FieldWrapper<IWork>>;
  /**
   * Toggle Bookmark state on a product as currently logged in user,
   * Does not work when multiple bookmarks with different explicit meta configurations exist.
   * In those cases please use createBookmark and removeBookmark
   */
  bookmark: FieldWrapper<IBookmark>;
  /** In order to activate TOTP, generate a secret and return */
  buildSecretTOTPAuthURL: FieldWrapper<Scalars['String']['output']>;
  /** Change the current user's password. Must be logged in. */
  changePassword?: Maybe<FieldWrapper<ISuccessResponse>>;
  /**
   * Process the checkout (automatically charge & deliver if possible), the cart will get
   * transformed to an ordinary order if everything goes well.
   */
  checkoutCart: FieldWrapper<IOrder>;
  confirmMediaUpload: FieldWrapper<IMedia>;
  /** Manually confirm an order which is in progress */
  confirmOrder: FieldWrapper<IOrder>;
  /** Creates new assortment. */
  createAssortment: FieldWrapper<IAssortment>;
  /** Create a bookmark for a specific user */
  createBookmark: FieldWrapper<IBookmark>;
  /**
   * Creates an alternative cart. If you use this feature, you should use explicit orderId's when using the
   * cart mutations. Else it will work like a stack and the checkout will use the very first cart of the user.
   */
  createCart: FieldWrapper<IOrder>;
  createCountry: FieldWrapper<ICountry>;
  createCurrency: FieldWrapper<ICurrency>;
  /** Creates new delivery provider */
  createDeliveryProvider: FieldWrapper<IDeliveryProvider>;
  /** Create a enrollment. */
  createEnrollment: FieldWrapper<IEnrollment>;
  /** Creates new Filter along with the user who created it. */
  createFilter: FieldWrapper<IFilter>;
  /** Adds new option to filters */
  createFilterOption: FieldWrapper<IFilter>;
  /** Adds new language along with the user who created it */
  createLanguage: FieldWrapper<ILanguage>;
  /** Adds new payment provider */
  createPaymentProvider: FieldWrapper<IPaymentProvider>;
  /** Create a new product */
  createProduct: FieldWrapper<IProduct>;
  /** Adds one product as bundle for another products */
  createProductBundleItem: FieldWrapper<IProduct>;
  /** Add a new ProductReview */
  createProductReview: FieldWrapper<IProductReview>;
  /** Creates new product variation for a product. */
  createProductVariation: FieldWrapper<IProductVariation>;
  /** Adds variation option to an existing product variations */
  createProductVariationOption: FieldWrapper<IProductVariation>;
  /** Create a new user. */
  createUser?: Maybe<FieldWrapper<ILoginMethodResponse>>;
  /** Creates new warehouse provider. */
  createWarehousingProvider: FieldWrapper<IWarehousingProvider>;
  /** Create WebAuthn PublicKeyCredentialCreationOptions to use for Registering a new WebAuthn Device */
  createWebAuthnCredentialCreationOptions: FieldWrapper<
    Scalars['JSON']['output']
  >;
  /** Create WebAuthn PublicKeyCredentialRequestrOptions to use for WebAuthn Login Flow */
  createWebAuthnCredentialRequestOptions: FieldWrapper<
    Scalars['JSON']['output']
  >;
  /** Manually mark a undelivered order as delivered */
  deliverOrder: FieldWrapper<IOrder>;
  /** Disable the 2nd factor (TOTP) */
  disableTOTP: FieldWrapper<IUser>;
  /**
   * Remove all items of an open order (cart) if possible.
   * if you want to remove single cart item use removeCartItem instead
   */
  emptyCart?: Maybe<FieldWrapper<IOrder>>;
  /** In order to activate 2nd factor (TOTP), generate a secret and return */
  enableTOTP: FieldWrapper<IUser>;
  /** Enroll a new user, setting enroll to true will let the user choose his password (e-mail gets sent) */
  enrollUser: FieldWrapper<IUser>;
  /** Tokenize */
  exportToken: FieldWrapper<IToken>;
  /**
   * Register a work attempt manually.
   * Note: Usually, work attempts are handled internally by the inbuilt cron
   * worker. This mutation is part of the interface for "outside" workers.
   */
  finishWork: FieldWrapper<IWork>;
  /** Request a forgot password email. */
  forgotPassword?: Maybe<FieldWrapper<ISuccessResponse>>;
  /**
   * Update hearbeat (updates user activity information such as last
   * login and logged in user IP address, locale and country where they
   * accessed the system)
   */
  heartbeat: FieldWrapper<IUser>;
  /** Impersonate a user */
  impersonate: FieldWrapper<ILoginMethodResponse>;
  /** OAuth2 */
  linkOAuthAccount: FieldWrapper<IUser>;
  /** Login as Guest User (creates an anonymous user and returns logged in token) */
  loginAsGuest?: Maybe<FieldWrapper<ILoginMethodResponse>>;
  /** Log the user with OAuth2 service provider */
  loginWithOAuth?: Maybe<FieldWrapper<ILoginMethodResponse>>;
  /** Log the user in with a password. */
  loginWithPassword?: Maybe<FieldWrapper<ILoginMethodResponse>>;
  /** Log the user in with a WebAuthn device */
  loginWithWebAuthn?: Maybe<FieldWrapper<ILoginMethodResponse>>;
  /** Log the user out. */
  logout?: Maybe<FieldWrapper<ISuccessResponse>>;
  /** Log out all sessions related with user. */
  logoutAllSessions?: Maybe<FieldWrapper<ISuccessResponse>>;
  /** Make a proposal as answer to the RFP by changing its status to PROCESSED */
  makeQuotationProposal: FieldWrapper<IQuotation>;
  /** Make's the provided payment credential as the users preferred method of payment. */
  markPaymentCredentialsPreferred?: Maybe<FieldWrapper<IPaymentCredentials>>;
  pageView: FieldWrapper<Scalars['String']['output']>;
  /** Manually mark an unpaid/partially paid order as fully paid */
  payOrder: FieldWrapper<IOrder>;
  prepareAssortmentMediaUpload: FieldWrapper<IMediaUploadTicket>;
  prepareProductMediaUpload: FieldWrapper<IMediaUploadTicket>;
  prepareUserAvatarUpload: FieldWrapper<IMediaUploadTicket>;
  /**
   * This will pick up non-external work, execute, await result and finish
   * it up on the target system. This function allows you to do work queue "ticks"
   * from outside instead of waiting for default Cron and Event Listener to trigger
   * and can be helpful in serverless environments.
   */
  processNextWork?: Maybe<FieldWrapper<IWork>>;
  /** Make the product visible on any shop listings (product queries) */
  publishProduct: FieldWrapper<IProduct>;
  /**
   * Register credentials for an existing payment provider allowing to store and use them
   * for later payments (1-click checkout or enrollments)
   */
  registerPaymentCredentials?: Maybe<FieldWrapper<IPaymentCredentials>>;
  /** Manually reject an order which is in progress */
  rejectOrder: FieldWrapper<IOrder>;
  /** Reject an RFP, this is possible as long as a quotation is not fullfilled */
  rejectQuotation: FieldWrapper<IQuotation>;
  /** Removes assortment with the provided ID */
  removeAssortment: FieldWrapper<IAssortment>;
  /** Remove a product from an assortment */
  removeAssortmentFilter: FieldWrapper<IAssortmentFilter>;
  /** Remove a child/parent assortment link from it's parent */
  removeAssortmentLink: FieldWrapper<IAssortmentLink>;
  /** Remove a media asset from a assortment */
  removeAssortmentMedia: FieldWrapper<IAssortmentMedia>;
  /** Remove a product from an assortment */
  removeAssortmentProduct: FieldWrapper<IAssortmentProduct>;
  /** Remove an existing bookmark by ID */
  removeBookmark: FieldWrapper<IBookmark>;
  /** Removes products bundle item found at the given 0 based index. */
  removeBundleItem: FieldWrapper<IProduct>;
  /** Remove a discount from the cart */
  removeCartDiscount: FieldWrapper<IOrderDiscount>;
  /** Remove an item from an open order */
  removeCartItem: FieldWrapper<IOrderItem>;
  /** Deletes the specified country */
  removeCountry: FieldWrapper<ICountry>;
  /** Deletes the specified currency */
  removeCurrency: FieldWrapper<ICurrency>;
  /**
   * Deletes a delivery provider by setting the deleted field to current timestamp.
   * Note the delivery provider still exists.
   */
  removeDeliveryProvider: FieldWrapper<IDeliveryProvider>;
  /** Update E-Mail address of any user or logged in user if userId is not provided */
  removeEmail: FieldWrapper<IUser>;
  /** Deletes the specified filter */
  removeFilter: FieldWrapper<IFilter>;
  /** Removes the filter option from the specified filter. */
  removeFilterOption: FieldWrapper<IFilter>;
  /** Deletes the specified languages */
  removeLanguage: FieldWrapper<ILanguage>;
  /** Remove an order while it's still open */
  removeOrder: FieldWrapper<IOrder>;
  /** Deletes the specified payment credential. */
  removePaymentCredentials?: Maybe<FieldWrapper<IPaymentCredentials>>;
  /**
   * Deletes the specified payment provider by setting the deleted filed to current timestamp.
   * Note the payment provider is still available only it’s status is deleted
   */
  removePaymentProvider: FieldWrapper<IPaymentProvider>;
  /** Remove the product completely! */
  removeProduct: FieldWrapper<IProduct>;
  /**
   * Unlinks a product from a ConfigurableProduct by providing a configuration
   * combination that uniquely identifies a row in the assignment matrix
   */
  removeProductAssignment: FieldWrapper<IProduct>;
  /** Remove a media asset from a product's visualization */
  removeProductMedia: FieldWrapper<IProductMedia>;
  /** Remove an existing ProductReview. The logic to allow/dissallow removal is controlled by product plugin logic */
  removeProductReview: FieldWrapper<IProductReview>;
  /** Remove a vote from a ProductReview */
  removeProductReviewVote: FieldWrapper<IProductReview>;
  /** Removes product variation with the provided ID */
  removeProductVariation: FieldWrapper<IProductVariation>;
  /** Removes product option value for product variation with the provided variation option value */
  removeProductVariationOption: FieldWrapper<IProductVariation>;
  /** Remove user W3C push subscription object */
  removePushSubscription: FieldWrapper<IUser>;
  /** Remove any user or logged in user if userId is not provided */
  removeUser: FieldWrapper<IUser>;
  /**
   * Deletes the specified warehousing provider by setting the deleted filed to current timestamp.
   * Note warehousing provider still exists in the system after successful
   * completing of this operation with status deleted.
   */
  removeWarehousingProvider: FieldWrapper<IWarehousingProvider>;
  removeWeb3Address: FieldWrapper<IUser>;
  /** Remove WebAuthn Credentials for current user */
  removeWebAuthnCredentials: FieldWrapper<IUser>;
  /** Manually remove a work */
  removeWork: FieldWrapper<IWork>;
  /** Reorder the products in an assortment */
  reorderAssortmentFilters: Array<FieldWrapper<IAssortmentFilter>>;
  /** Reorder the child assortment links in it's parent */
  reorderAssortmentLinks: Array<FieldWrapper<IAssortmentLink>>;
  /** Reorder a media asset (first is primary) */
  reorderAssortmentMedia: Array<FieldWrapper<IAssortmentMedia>>;
  /** Reorder the products in an assortment */
  reorderAssortmentProducts: Array<FieldWrapper<IAssortmentProduct>>;
  /** Reorder a media asset (first is primary) */
  reorderProductMedia: Array<FieldWrapper<IProductMedia>>;
  /** Request for Proposal (RFP) for the specified product */
  requestQuotation: FieldWrapper<IQuotation>;
  /** Reset the password for a user using a token received in email. Logs the user in afterwards. */
  resetPassword?: Maybe<FieldWrapper<ILoginMethodResponse>>;
  /** Forcefully trigger an enrollment email for already added users by e-mail */
  sendEnrollmentEmail?: Maybe<FieldWrapper<ISuccessResponse>>;
  /** Send an email with a link the user can use verify their email address. */
  sendVerificationEmail?: Maybe<FieldWrapper<ISuccessResponse>>;
  /**
   * Makes the assortment provided as the base assortment and make
   * any other existing base assortment regular assortments.
   */
  setBaseAssortment: FieldWrapper<IAssortment>;
  /**
   * Change the delivery method/provider to an order. If the delivery provider
   * doesn’t exists new delivery provider will be created with the provided ID.
   */
  setOrderDeliveryProvider: FieldWrapper<IOrder>;
  /**
   * Change the payment method/provider to an order. If the payment provider
   * doesn’t exists new payment provider will be created with the provided ID.
   */
  setOrderPaymentProvider: FieldWrapper<IOrder>;
  /** Set a new password for a specific user */
  setPassword: FieldWrapper<IUser>;
  /** Set roles of a user */
  setRoles: FieldWrapper<IUser>;
  /** Set tags of user */
  setUserTags: FieldWrapper<IUser>;
  /** Set username for a specific user */
  setUsername: FieldWrapper<IUser>;
  /** Sign a generic order payment */
  signPaymentProviderForCheckout: FieldWrapper<Scalars['String']['output']>;
  /** Sign a generic payment provider for registration */
  signPaymentProviderForCredentialRegistration?: Maybe<
    FieldWrapper<Scalars['String']['output']>
  >;
  /** End customer impersonated user session and resume the impersonator session */
  stopImpersonation: FieldWrapper<ILoginMethodResponse>;
  /** Terminate an actively running enrollment by changing it's status to TERMINATED */
  terminateEnrollment: FieldWrapper<IEnrollment>;
  unlinkOAuthAccount: FieldWrapper<IUser>;
  /** Hide the product visible from any shop listings (product queries) */
  unpublishProduct: FieldWrapper<IProduct>;
  /** Updates the provided assortment */
  updateAssortment: FieldWrapper<IAssortment>;
  /** Modify localized texts part of a assortment media asset */
  updateAssortmentMediaTexts: Array<FieldWrapper<IAssortmentMediaTexts>>;
  /** Modify localized texts part of an assortment */
  updateAssortmentTexts: Array<FieldWrapper<IAssortmentTexts>>;
  /**
   * Change billing address and order contact of an open order (cart). All of the parameters
   * except order ID are optional and the update will ocure for parameters provided.
   * If the delivery provider or payment provider ID provided doesn’t already exist new order payment
   * will be created with the provided ID.
   */
  updateCart: FieldWrapper<IOrder>;
  /**
   * Change the quantity or configuration of an item in an open order.align-baselineAll
   * of the parameters are optional except item ID and for the parameters provided the
   * update will be performed accordingly.
   */
  updateCartItem: FieldWrapper<IOrderItem>;
  /** Updates provided country information */
  updateCountry: FieldWrapper<ICountry>;
  /** Updates the specified currency */
  updateCurrency: FieldWrapper<ICurrency>;
  /** Updates the delivery provider specified */
  updateDeliveryProvider: FieldWrapper<IDeliveryProvider>;
  /** Update a enrollment */
  updateEnrollment: FieldWrapper<IEnrollment>;
  /** Updates the specified filter with the information passed. */
  updateFilter: FieldWrapper<IFilter>;
  /** Updates or created specified filter texts for filter with ID provided and locale and optionally filterOptionValue */
  updateFilterTexts: Array<FieldWrapper<IFilterTexts>>;
  /** Updates the specified language. */
  updateLanguage: FieldWrapper<ILanguage>;
  /** Update a Pick Up Delivery Provider's specific configuration */
  updateOrderDeliveryPickUp: FieldWrapper<IOrderDeliveryPickUp>;
  /** Update a Shipping Delivery Provider's specific configuration */
  updateOrderDeliveryShipping: FieldWrapper<IOrderDeliveryShipping>;
  /** Update a Card Payment Provider's specific configuration */
  updateOrderPaymentCard: FieldWrapper<IOrderPaymentCard>;
  /** Update a Generic Payment Provider's specific configuration */
  updateOrderPaymentGeneric: FieldWrapper<IOrderPaymentGeneric>;
  /** Update an Invoice Payment Provider's specific configuration */
  updateOrderPaymentInvoice: FieldWrapper<IOrderPaymentInvoice>;
  /** Updates payment provider information with the provided ID */
  updatePaymentProvider: FieldWrapper<IPaymentProvider>;
  /** Modify generic infos of a product (tags for ex.) */
  updateProduct?: Maybe<FieldWrapper<IProduct>>;
  /** Modify commerce part of a product */
  updateProductCommerce?: Maybe<FieldWrapper<IProduct>>;
  /** Modify localized texts part of a product's media asset */
  updateProductMediaTexts: Array<FieldWrapper<IProductMediaTexts>>;
  /** Modify plan part of a product */
  updateProductPlan?: Maybe<FieldWrapper<IProduct>>;
  /** Update an existing ProductReview. The logic to allow/dissallow editing is controlled by product plugin logic */
  updateProductReview: FieldWrapper<IProductReview>;
  /** Modify delivery part of a product */
  updateProductSupply?: Maybe<FieldWrapper<IProduct>>;
  /** Modify localized texts part of a product */
  updateProductTexts: Array<FieldWrapper<IProductTexts>>;
  /** Modify tokenization part of a product */
  updateProductTokenization?: Maybe<FieldWrapper<ITokenizedProduct>>;
  /**
   * Update product variation texts with the specified locales for product variations
   * that match the provided variation ID and production option value
   */
  updateProductVariationTexts: Array<FieldWrapper<IProductVariationTexts>>;
  /** Modify warehousing part of a product */
  updateProductWarehousing?: Maybe<FieldWrapper<IProduct>>;
  /** Update Avatar of any user or logged in user if userId is not provided */
  updateUserAvatar: FieldWrapper<IUser>;
  /** Update Profile of any user or logged in user if userId is not provided */
  updateUserProfile: FieldWrapper<IUser>;
  /** Updates warehousing provider information with the provided ID */
  updateWarehousingProvider: FieldWrapper<IWarehousingProvider>;
  /** Marks the user's email address as verified. Logs the user in afterwards. */
  verifyEmail?: Maybe<FieldWrapper<ILoginMethodResponse>>;
  /** Verify quotation request elligibility. and marks requested quotations as verified if it is */
  verifyQuotation: FieldWrapper<IQuotation>;
  verifyWeb3Address: FieldWrapper<IUser>;
};

export type IMutationActivateEnrollmentArgs = {
  enrollmentId: Scalars['ID']['input'];
};

export type IMutationAddAssortmentFilterArgs = {
  assortmentId: Scalars['ID']['input'];
  filterId: Scalars['ID']['input'];
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

export type IMutationAddAssortmentLinkArgs = {
  childAssortmentId: Scalars['ID']['input'];
  parentAssortmentId: Scalars['ID']['input'];
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

export type IMutationAddAssortmentMediaArgs = {
  assortmentId: Scalars['ID']['input'];
  media: Scalars['Upload']['input'];
};

export type IMutationAddAssortmentProductArgs = {
  assortmentId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

export type IMutationAddCartDiscountArgs = {
  code: Scalars['String']['input'];
  orderId?: InputMaybe<Scalars['ID']['input']>;
};

export type IMutationAddCartProductArgs = {
  configuration?: InputMaybe<Array<IProductConfigurationParameterInput>>;
  orderId?: InputMaybe<Scalars['ID']['input']>;
  productId: Scalars['ID']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type IMutationAddCartQuotationArgs = {
  configuration?: InputMaybe<Array<IProductConfigurationParameterInput>>;
  orderId?: InputMaybe<Scalars['ID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  quotationId: Scalars['ID']['input'];
};

export type IMutationAddEmailArgs = {
  email: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type IMutationAddMultipleCartProductsArgs = {
  items: Array<IOrderItemInput>;
  orderId?: InputMaybe<Scalars['ID']['input']>;
};

export type IMutationAddProductAssignmentArgs = {
  productId: Scalars['ID']['input'];
  proxyId: Scalars['ID']['input'];
  vectors: Array<IProductAssignmentVectorInput>;
};

export type IMutationAddProductMediaArgs = {
  media: Scalars['Upload']['input'];
  productId: Scalars['ID']['input'];
};

export type IMutationAddProductReviewVoteArgs = {
  meta?: InputMaybe<Scalars['JSON']['input']>;
  productReviewId: Scalars['ID']['input'];
  type: IProductReviewVoteType;
};

export type IMutationAddPushSubscriptionArgs = {
  subscription: Scalars['JSON']['input'];
  unsubscribeFromOtherUsers?: InputMaybe<Scalars['Boolean']['input']>;
};

export type IMutationAddWeb3AddressArgs = {
  address: Scalars['String']['input'];
};

export type IMutationAddWebAuthnCredentialsArgs = {
  credentials: Scalars['JSON']['input'];
};

export type IMutationAddWorkArgs = {
  input?: InputMaybe<Scalars['JSON']['input']>;
  originalWorkId?: InputMaybe<Scalars['ID']['input']>;
  priority?: Scalars['Int']['input'];
  retries?: Scalars['Int']['input'];
  scheduled?: InputMaybe<Scalars['Timestamp']['input']>;
  type: IWorkType;
  worker?: InputMaybe<Scalars['String']['input']>;
};

export type IMutationAllocateWorkArgs = {
  types?: InputMaybe<Array<InputMaybe<IWorkType>>>;
  worker?: InputMaybe<Scalars['String']['input']>;
};

export type IMutationBookmarkArgs = {
  bookmarked?: InputMaybe<Scalars['Boolean']['input']>;
  productId: Scalars['ID']['input'];
};

export type IMutationChangePasswordArgs = {
  newPlainPassword?: InputMaybe<Scalars['String']['input']>;
  oldPlainPassword?: InputMaybe<Scalars['String']['input']>;
};

export type IMutationCheckoutCartArgs = {
  deliveryContext?: InputMaybe<Scalars['JSON']['input']>;
  orderContext?: InputMaybe<Scalars['JSON']['input']>;
  orderId?: InputMaybe<Scalars['ID']['input']>;
  paymentContext?: InputMaybe<Scalars['JSON']['input']>;
};

export type IMutationConfirmMediaUploadArgs = {
  mediaUploadTicketId: Scalars['ID']['input'];
  size: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};

export type IMutationConfirmOrderArgs = {
  deliveryContext?: InputMaybe<Scalars['JSON']['input']>;
  orderContext?: InputMaybe<Scalars['JSON']['input']>;
  orderId: Scalars['ID']['input'];
  paymentContext?: InputMaybe<Scalars['JSON']['input']>;
};

export type IMutationCreateAssortmentArgs = {
  assortment: ICreateAssortmentInput;
};

export type IMutationCreateBookmarkArgs = {
  meta?: InputMaybe<Scalars['JSON']['input']>;
  productId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type IMutationCreateCartArgs = {
  orderNumber: Scalars['String']['input'];
};

export type IMutationCreateCountryArgs = {
  country: ICreateCountryInput;
};

export type IMutationCreateCurrencyArgs = {
  currency: ICreateCurrencyInput;
};

export type IMutationCreateDeliveryProviderArgs = {
  deliveryProvider: ICreateDeliveryProviderInput;
};

export type IMutationCreateEnrollmentArgs = {
  billingAddress?: InputMaybe<IAddressInput>;
  contact?: InputMaybe<IContactInput>;
  delivery?: InputMaybe<IEnrollmentDeliveryInput>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  payment?: InputMaybe<IEnrollmentPaymentInput>;
  plan: IEnrollmentPlanInput;
};

export type IMutationCreateFilterArgs = {
  filter: ICreateFilterInput;
};

export type IMutationCreateFilterOptionArgs = {
  filterId: Scalars['ID']['input'];
  option: ICreateFilterOptionInput;
};

export type IMutationCreateLanguageArgs = {
  language: ICreateLanguageInput;
};

export type IMutationCreatePaymentProviderArgs = {
  paymentProvider: ICreatePaymentProviderInput;
};

export type IMutationCreateProductArgs = {
  product: ICreateProductInput;
};

export type IMutationCreateProductBundleItemArgs = {
  item: ICreateProductBundleItemInput;
  productId: Scalars['ID']['input'];
};

export type IMutationCreateProductReviewArgs = {
  productId: Scalars['ID']['input'];
  productReview: IProductReviewInput;
};

export type IMutationCreateProductVariationArgs = {
  productId: Scalars['ID']['input'];
  variation: ICreateProductVariationInput;
};

export type IMutationCreateProductVariationOptionArgs = {
  option: ICreateProductVariationOptionInput;
  productVariationId: Scalars['ID']['input'];
};

export type IMutationCreateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  plainPassword?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<IUserProfileInput>;
  username?: InputMaybe<Scalars['String']['input']>;
  webAuthnPublicKeyCredentials?: InputMaybe<Scalars['JSON']['input']>;
};

export type IMutationCreateWarehousingProviderArgs = {
  warehousingProvider: ICreateWarehousingProviderInput;
};

export type IMutationCreateWebAuthnCredentialCreationOptionsArgs = {
  extensionOptions?: InputMaybe<Scalars['JSON']['input']>;
  username: Scalars['String']['input'];
};

export type IMutationCreateWebAuthnCredentialRequestOptionsArgs = {
  extensionOptions?: InputMaybe<Scalars['JSON']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type IMutationDeliverOrderArgs = {
  orderId: Scalars['ID']['input'];
};

export type IMutationDisableTotpArgs = {
  code: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type IMutationEmptyCartArgs = {
  orderId?: InputMaybe<Scalars['ID']['input']>;
};

export type IMutationEnableTotpArgs = {
  code: Scalars['String']['input'];
  secretBase32: Scalars['String']['input'];
};

export type IMutationEnrollUserArgs = {
  email: Scalars['String']['input'];
  plainPassword?: InputMaybe<Scalars['String']['input']>;
  profile: IUserProfileInput;
};

export type IMutationExportTokenArgs = {
  quantity?: Scalars['Int']['input'];
  recipientWalletAddress: Scalars['String']['input'];
  tokenId: Scalars['ID']['input'];
};

export type IMutationFinishWorkArgs = {
  error?: InputMaybe<Scalars['JSON']['input']>;
  finished?: InputMaybe<Scalars['Timestamp']['input']>;
  result?: InputMaybe<Scalars['JSON']['input']>;
  started?: InputMaybe<Scalars['Timestamp']['input']>;
  success?: InputMaybe<Scalars['Boolean']['input']>;
  workId: Scalars['ID']['input'];
  worker?: InputMaybe<Scalars['String']['input']>;
};

export type IMutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};

export type IMutationImpersonateArgs = {
  userId: Scalars['ID']['input'];
};

export type IMutationLinkOAuthAccountArgs = {
  authorizationCode: Scalars['String']['input'];
  provider: Scalars['String']['input'];
  redirectUrl: Scalars['String']['input'];
};

export type IMutationLoginWithOAuthArgs = {
  authorizationCode: Scalars['String']['input'];
  provider: Scalars['String']['input'];
  redirectUrl: Scalars['String']['input'];
};

export type IMutationLoginWithPasswordArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  plainPassword?: InputMaybe<Scalars['String']['input']>;
  totpCode?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type IMutationLoginWithWebAuthnArgs = {
  webAuthnPublicKeyCredentials: Scalars['JSON']['input'];
};

export type IMutationLogoutArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};

export type IMutationMakeQuotationProposalArgs = {
  quotationContext?: InputMaybe<Scalars['JSON']['input']>;
  quotationId: Scalars['ID']['input'];
};

export type IMutationMarkPaymentCredentialsPreferredArgs = {
  paymentCredentialsId: Scalars['ID']['input'];
};

export type IMutationPageViewArgs = {
  path: Scalars['String']['input'];
  referrer?: InputMaybe<Scalars['String']['input']>;
};

export type IMutationPayOrderArgs = {
  orderId: Scalars['ID']['input'];
};

export type IMutationPrepareAssortmentMediaUploadArgs = {
  assortmentId: Scalars['ID']['input'];
  mediaName: Scalars['String']['input'];
};

export type IMutationPrepareProductMediaUploadArgs = {
  mediaName: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
};

export type IMutationPrepareUserAvatarUploadArgs = {
  mediaName: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type IMutationProcessNextWorkArgs = {
  worker?: InputMaybe<Scalars['String']['input']>;
};

export type IMutationPublishProductArgs = {
  productId: Scalars['ID']['input'];
};

export type IMutationRegisterPaymentCredentialsArgs = {
  paymentProviderId: Scalars['ID']['input'];
  transactionContext: Scalars['JSON']['input'];
};

export type IMutationRejectOrderArgs = {
  deliveryContext?: InputMaybe<Scalars['JSON']['input']>;
  orderContext?: InputMaybe<Scalars['JSON']['input']>;
  orderId: Scalars['ID']['input'];
  paymentContext?: InputMaybe<Scalars['JSON']['input']>;
};

export type IMutationRejectQuotationArgs = {
  quotationContext?: InputMaybe<Scalars['JSON']['input']>;
  quotationId: Scalars['ID']['input'];
};

export type IMutationRemoveAssortmentArgs = {
  assortmentId: Scalars['ID']['input'];
};

export type IMutationRemoveAssortmentFilterArgs = {
  assortmentFilterId: Scalars['ID']['input'];
};

export type IMutationRemoveAssortmentLinkArgs = {
  assortmentLinkId: Scalars['ID']['input'];
};

export type IMutationRemoveAssortmentMediaArgs = {
  assortmentMediaId: Scalars['ID']['input'];
};

export type IMutationRemoveAssortmentProductArgs = {
  assortmentProductId: Scalars['ID']['input'];
};

export type IMutationRemoveBookmarkArgs = {
  bookmarkId: Scalars['ID']['input'];
};

export type IMutationRemoveBundleItemArgs = {
  index: Scalars['Int']['input'];
  productId: Scalars['ID']['input'];
};

export type IMutationRemoveCartDiscountArgs = {
  discountId: Scalars['ID']['input'];
};

export type IMutationRemoveCartItemArgs = {
  itemId: Scalars['ID']['input'];
};

export type IMutationRemoveCountryArgs = {
  countryId: Scalars['ID']['input'];
};

export type IMutationRemoveCurrencyArgs = {
  currencyId: Scalars['ID']['input'];
};

export type IMutationRemoveDeliveryProviderArgs = {
  deliveryProviderId: Scalars['ID']['input'];
};

export type IMutationRemoveEmailArgs = {
  email: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type IMutationRemoveFilterArgs = {
  filterId: Scalars['ID']['input'];
};

export type IMutationRemoveFilterOptionArgs = {
  filterId: Scalars['ID']['input'];
  filterOptionValue: Scalars['String']['input'];
};

export type IMutationRemoveLanguageArgs = {
  languageId: Scalars['ID']['input'];
};

export type IMutationRemoveOrderArgs = {
  orderId: Scalars['ID']['input'];
};

export type IMutationRemovePaymentCredentialsArgs = {
  paymentCredentialsId: Scalars['ID']['input'];
};

export type IMutationRemovePaymentProviderArgs = {
  paymentProviderId: Scalars['ID']['input'];
};

export type IMutationRemoveProductArgs = {
  productId: Scalars['ID']['input'];
};

export type IMutationRemoveProductAssignmentArgs = {
  proxyId: Scalars['ID']['input'];
  vectors: Array<IProductAssignmentVectorInput>;
};

export type IMutationRemoveProductMediaArgs = {
  productMediaId: Scalars['ID']['input'];
};

export type IMutationRemoveProductReviewArgs = {
  productReviewId: Scalars['ID']['input'];
};

export type IMutationRemoveProductReviewVoteArgs = {
  productReviewId: Scalars['ID']['input'];
  type?: InputMaybe<IProductReviewVoteType>;
};

export type IMutationRemoveProductVariationArgs = {
  productVariationId: Scalars['ID']['input'];
};

export type IMutationRemoveProductVariationOptionArgs = {
  productVariationId: Scalars['ID']['input'];
  productVariationOptionValue: Scalars['String']['input'];
};

export type IMutationRemovePushSubscriptionArgs = {
  p256dh: Scalars['String']['input'];
};

export type IMutationRemoveUserArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type IMutationRemoveWarehousingProviderArgs = {
  warehousingProviderId: Scalars['ID']['input'];
};

export type IMutationRemoveWeb3AddressArgs = {
  address: Scalars['String']['input'];
};

export type IMutationRemoveWebAuthnCredentialsArgs = {
  credentialsId: Scalars['ID']['input'];
};

export type IMutationRemoveWorkArgs = {
  workId: Scalars['ID']['input'];
};

export type IMutationReorderAssortmentFiltersArgs = {
  sortKeys: Array<IReorderAssortmentFilterInput>;
};

export type IMutationReorderAssortmentLinksArgs = {
  sortKeys: Array<IReorderAssortmentLinkInput>;
};

export type IMutationReorderAssortmentMediaArgs = {
  sortKeys: Array<IReorderAssortmentMediaInput>;
};

export type IMutationReorderAssortmentProductsArgs = {
  sortKeys: Array<IReorderAssortmentProductInput>;
};

export type IMutationReorderProductMediaArgs = {
  sortKeys: Array<IReorderProductMediaInput>;
};

export type IMutationRequestQuotationArgs = {
  configuration?: InputMaybe<Array<IProductConfigurationParameterInput>>;
  productId: Scalars['ID']['input'];
};

export type IMutationResetPasswordArgs = {
  newPlainPassword?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type IMutationSendEnrollmentEmailArgs = {
  email: Scalars['String']['input'];
};

export type IMutationSendVerificationEmailArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};

export type IMutationSetBaseAssortmentArgs = {
  assortmentId: Scalars['ID']['input'];
};

export type IMutationSetOrderDeliveryProviderArgs = {
  deliveryProviderId: Scalars['ID']['input'];
  orderId: Scalars['ID']['input'];
};

export type IMutationSetOrderPaymentProviderArgs = {
  orderId: Scalars['ID']['input'];
  paymentProviderId: Scalars['ID']['input'];
};

export type IMutationSetPasswordArgs = {
  newPlainPassword?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type IMutationSetRolesArgs = {
  roles: Array<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type IMutationSetUserTagsArgs = {
  tags: Array<InputMaybe<Scalars['LowerCaseString']['input']>>;
  userId: Scalars['ID']['input'];
};

export type IMutationSetUsernameArgs = {
  userId: Scalars['ID']['input'];
  username: Scalars['String']['input'];
};

export type IMutationSignPaymentProviderForCheckoutArgs = {
  orderPaymentId: Scalars['ID']['input'];
  transactionContext?: InputMaybe<Scalars['JSON']['input']>;
};

export type IMutationSignPaymentProviderForCredentialRegistrationArgs = {
  paymentProviderId: Scalars['ID']['input'];
};

export type IMutationTerminateEnrollmentArgs = {
  enrollmentId: Scalars['ID']['input'];
};

export type IMutationUnlinkOAuthAccountArgs = {
  oAuthAccountId: Scalars['ID']['input'];
  provider: Scalars['String']['input'];
};

export type IMutationUnpublishProductArgs = {
  productId: Scalars['ID']['input'];
};

export type IMutationUpdateAssortmentArgs = {
  assortment: IUpdateAssortmentInput;
  assortmentId: Scalars['ID']['input'];
};

export type IMutationUpdateAssortmentMediaTextsArgs = {
  assortmentMediaId: Scalars['ID']['input'];
  texts: Array<IUpdateAssortmentMediaTextInput>;
};

export type IMutationUpdateAssortmentTextsArgs = {
  assortmentId: Scalars['ID']['input'];
  texts: Array<IUpdateAssortmentTextInput>;
};

export type IMutationUpdateCartArgs = {
  billingAddress?: InputMaybe<IAddressInput>;
  contact?: InputMaybe<IContactInput>;
  deliveryProviderId?: InputMaybe<Scalars['ID']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  orderId?: InputMaybe<Scalars['ID']['input']>;
  paymentProviderId?: InputMaybe<Scalars['ID']['input']>;
};

export type IMutationUpdateCartItemArgs = {
  configuration?: InputMaybe<Array<IProductConfigurationParameterInput>>;
  itemId: Scalars['ID']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type IMutationUpdateCountryArgs = {
  country: IUpdateCountryInput;
  countryId: Scalars['ID']['input'];
};

export type IMutationUpdateCurrencyArgs = {
  currency: IUpdateCurrencyInput;
  currencyId: Scalars['ID']['input'];
};

export type IMutationUpdateDeliveryProviderArgs = {
  deliveryProvider: IUpdateProviderInput;
  deliveryProviderId: Scalars['ID']['input'];
};

export type IMutationUpdateEnrollmentArgs = {
  billingAddress?: InputMaybe<IAddressInput>;
  contact?: InputMaybe<IContactInput>;
  delivery?: InputMaybe<IEnrollmentDeliveryInput>;
  enrollmentId?: InputMaybe<Scalars['ID']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  payment?: InputMaybe<IEnrollmentPaymentInput>;
  plan?: InputMaybe<IEnrollmentPlanInput>;
};

export type IMutationUpdateFilterArgs = {
  filter: IUpdateFilterInput;
  filterId: Scalars['ID']['input'];
};

export type IMutationUpdateFilterTextsArgs = {
  filterId: Scalars['ID']['input'];
  filterOptionValue?: InputMaybe<Scalars['String']['input']>;
  texts: Array<IUpdateFilterTextInput>;
};

export type IMutationUpdateLanguageArgs = {
  language: IUpdateLanguageInput;
  languageId: Scalars['ID']['input'];
};

export type IMutationUpdateOrderDeliveryPickUpArgs = {
  meta?: InputMaybe<Scalars['JSON']['input']>;
  orderDeliveryId: Scalars['ID']['input'];
  orderPickUpLocationId: Scalars['ID']['input'];
};

export type IMutationUpdateOrderDeliveryShippingArgs = {
  address?: InputMaybe<IAddressInput>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  orderDeliveryId: Scalars['ID']['input'];
};

export type IMutationUpdateOrderPaymentCardArgs = {
  meta?: InputMaybe<Scalars['JSON']['input']>;
  orderPaymentId: Scalars['ID']['input'];
};

export type IMutationUpdateOrderPaymentGenericArgs = {
  meta?: InputMaybe<Scalars['JSON']['input']>;
  orderPaymentId: Scalars['ID']['input'];
};

export type IMutationUpdateOrderPaymentInvoiceArgs = {
  meta?: InputMaybe<Scalars['JSON']['input']>;
  orderPaymentId: Scalars['ID']['input'];
};

export type IMutationUpdatePaymentProviderArgs = {
  paymentProvider: IUpdateProviderInput;
  paymentProviderId: Scalars['ID']['input'];
};

export type IMutationUpdateProductArgs = {
  product: IUpdateProductInput;
  productId: Scalars['ID']['input'];
};

export type IMutationUpdateProductCommerceArgs = {
  commerce: IUpdateProductCommerceInput;
  productId: Scalars['ID']['input'];
};

export type IMutationUpdateProductMediaTextsArgs = {
  productMediaId: Scalars['ID']['input'];
  texts: Array<IUpdateProductMediaTextInput>;
};

export type IMutationUpdateProductPlanArgs = {
  plan: IUpdateProductPlanInput;
  productId: Scalars['ID']['input'];
};

export type IMutationUpdateProductReviewArgs = {
  productReview: IProductReviewInput;
  productReviewId: Scalars['ID']['input'];
};

export type IMutationUpdateProductSupplyArgs = {
  productId: Scalars['ID']['input'];
  supply: IUpdateProductSupplyInput;
};

export type IMutationUpdateProductTextsArgs = {
  productId: Scalars['ID']['input'];
  texts: Array<IUpdateProductTextInput>;
};

export type IMutationUpdateProductTokenizationArgs = {
  productId: Scalars['ID']['input'];
  tokenization: IUpdateProductTokenizationInput;
};

export type IMutationUpdateProductVariationTextsArgs = {
  productVariationId: Scalars['ID']['input'];
  productVariationOptionValue?: InputMaybe<Scalars['String']['input']>;
  texts: Array<IUpdateProductVariationTextInput>;
};

export type IMutationUpdateProductWarehousingArgs = {
  productId: Scalars['ID']['input'];
  warehousing: IUpdateProductWarehousingInput;
};

export type IMutationUpdateUserAvatarArgs = {
  avatar: Scalars['Upload']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type IMutationUpdateUserProfileArgs = {
  meta?: InputMaybe<Scalars['JSON']['input']>;
  profile?: InputMaybe<IUserProfileInput>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type IMutationUpdateWarehousingProviderArgs = {
  warehousingProvider: IUpdateProviderInput;
  warehousingProviderId: Scalars['ID']['input'];
};

export type IMutationVerifyEmailArgs = {
  token: Scalars['String']['input'];
};

export type IMutationVerifyQuotationArgs = {
  quotationContext?: InputMaybe<Scalars['JSON']['input']>;
  quotationId: Scalars['ID']['input'];
};

export type IMutationVerifyWeb3AddressArgs = {
  address: Scalars['String']['input'];
  hash: Scalars['String']['input'];
};

export type IOAuthAccount = {
  __typename?: 'OAuthAccount';
  _id: FieldWrapper<Scalars['ID']['output']>;
  authorizationCode: FieldWrapper<Scalars['String']['output']>;
  provider: FieldWrapper<IOAuthProvider>;
};

export type IOAuthProvider = {
  __typename?: 'OAuthProvider';
  _id: FieldWrapper<Scalars['String']['output']>;
  clientId: FieldWrapper<Scalars['String']['output']>;
  scopes: Array<FieldWrapper<Scalars['String']['output']>>;
};

/** Just an order */
export type IOrder = {
  __typename?: 'Order';
  _id: FieldWrapper<Scalars['ID']['output']>;
  billingAddress?: Maybe<FieldWrapper<IAddress>>;
  confirmed?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  contact?: Maybe<FieldWrapper<IContact>>;
  country?: Maybe<FieldWrapper<ICountry>>;
  created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  currency?: Maybe<FieldWrapper<ICurrency>>;
  delivery?: Maybe<FieldWrapper<IOrderDelivery>>;
  discounts?: Maybe<Array<FieldWrapper<IOrderDiscount>>>;
  enrollment?: Maybe<FieldWrapper<IEnrollment>>;
  fullfilled?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  items?: Maybe<Array<FieldWrapper<IOrderItem>>>;
  orderNumber?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  ordered?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  payment?: Maybe<FieldWrapper<IOrderPayment>>;
  rejected?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  status?: Maybe<FieldWrapper<IOrderStatus>>;
  supportedDeliveryProviders: Array<FieldWrapper<IDeliveryProvider>>;
  supportedPaymentProviders: Array<FieldWrapper<IPaymentProvider>>;
  total?: Maybe<FieldWrapper<IPrice>>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  user?: Maybe<FieldWrapper<IUser>>;
};

/** Just an order */
export type IOrderTotalArgs = {
  category?: InputMaybe<IOrderPriceCategory>;
};

export type IOrderDelivery = {
  _id: FieldWrapper<Scalars['ID']['output']>;
  delivered?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  discounts?: Maybe<Array<FieldWrapper<IOrderDeliveryDiscount>>>;
  fee?: Maybe<FieldWrapper<IPrice>>;
  provider?: Maybe<FieldWrapper<IDeliveryProvider>>;
  status?: Maybe<FieldWrapper<IOrderDeliveryStatus>>;
};

export type IOrderDeliveryDiscount = IOrderDiscountable & {
  __typename?: 'OrderDeliveryDiscount';
  _id: FieldWrapper<Scalars['ID']['output']>;
  delivery: FieldWrapper<IOrderDelivery>;
  orderDiscount: FieldWrapper<IOrderDiscount>;
  total: FieldWrapper<IPrice>;
};

export type IOrderDeliveryPickUp = IOrderDelivery & {
  __typename?: 'OrderDeliveryPickUp';
  _id: FieldWrapper<Scalars['ID']['output']>;
  activePickUpLocation?: Maybe<FieldWrapper<IOrderPickUpLocation>>;
  delivered?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  discounts?: Maybe<Array<FieldWrapper<IOrderDeliveryDiscount>>>;
  fee?: Maybe<FieldWrapper<IPrice>>;
  pickUpLocations: Array<FieldWrapper<IOrderPickUpLocation>>;
  provider?: Maybe<FieldWrapper<IDeliveryProvider>>;
  status?: Maybe<FieldWrapper<IOrderDeliveryStatus>>;
};

export type IOrderDeliveryShipping = IOrderDelivery & {
  __typename?: 'OrderDeliveryShipping';
  _id: FieldWrapper<Scalars['ID']['output']>;
  address?: Maybe<FieldWrapper<IAddress>>;
  delivered?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  discounts?: Maybe<Array<FieldWrapper<IOrderDeliveryDiscount>>>;
  fee?: Maybe<FieldWrapper<IPrice>>;
  provider?: Maybe<FieldWrapper<IDeliveryProvider>>;
  status?: Maybe<FieldWrapper<IOrderDeliveryStatus>>;
};

export enum IOrderDeliveryStatus {
  /** Delivery complete */
  Delivered = 'DELIVERED',
  /** Order is not delivered */
  Open = 'OPEN',
  /** Delivery returned */
  Returned = 'RETURNED',
}

export type IOrderDiscount = {
  __typename?: 'OrderDiscount';
  _id: FieldWrapper<Scalars['ID']['output']>;
  code?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  discounted?: Maybe<Array<FieldWrapper<IOrderDiscountable>>>;
  interface?: Maybe<FieldWrapper<IDiscountInterface>>;
  order: FieldWrapper<IOrder>;
  total: FieldWrapper<IPrice>;
  trigger: FieldWrapper<IOrderDiscountTrigger>;
};

export enum IOrderDiscountTrigger {
  /** System triggered */
  System = 'SYSTEM',
  /** User triggered */
  User = 'USER',
}

export type IOrderDiscountable = {
  _id: FieldWrapper<Scalars['ID']['output']>;
  orderDiscount: FieldWrapper<IOrderDiscount>;
  total: FieldWrapper<IPrice>;
};

export type IOrderGlobalDiscount = IOrderDiscountable & {
  __typename?: 'OrderGlobalDiscount';
  _id: FieldWrapper<Scalars['ID']['output']>;
  order: FieldWrapper<IOrder>;
  orderDiscount: FieldWrapper<IOrderDiscount>;
  total: FieldWrapper<IPrice>;
};

export type IOrderItem = {
  __typename?: 'OrderItem';
  _id: FieldWrapper<Scalars['ID']['output']>;
  configuration?: Maybe<Array<FieldWrapper<IProductConfigurationParameter>>>;
  discounts?: Maybe<Array<FieldWrapper<IOrderItemDiscount>>>;
  dispatches?: Maybe<Array<FieldWrapper<IDispatch>>>;
  order: FieldWrapper<IOrder>;
  originalProduct: FieldWrapper<IProduct>;
  product: FieldWrapper<IProduct>;
  quantity: FieldWrapper<Scalars['Int']['output']>;
  quotation?: Maybe<FieldWrapper<IQuotation>>;
  total?: Maybe<FieldWrapper<IPrice>>;
  unitPrice?: Maybe<FieldWrapper<IPrice>>;
};

export type IOrderItemTotalArgs = {
  category?: InputMaybe<IOrderItemPriceCategory>;
};

export type IOrderItemDiscount = IOrderDiscountable & {
  __typename?: 'OrderItemDiscount';
  _id: FieldWrapper<Scalars['ID']['output']>;
  item: FieldWrapper<IOrderItem>;
  orderDiscount: FieldWrapper<IOrderDiscount>;
  total: FieldWrapper<IPrice>;
};

export type IOrderItemInput = {
  configuration?: InputMaybe<Array<IProductConfigurationParameterInput>>;
  productId: Scalars['ID']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export enum IOrderItemPriceCategory {
  /** Discount */
  Discount = 'DISCOUNT',
  /** Items */
  Item = 'ITEM',
  /** Tax */
  Tax = 'TAX',
}

export type IOrderPayment = {
  _id: FieldWrapper<Scalars['ID']['output']>;
  discounts?: Maybe<Array<FieldWrapper<IOrderPaymentDiscount>>>;
  fee?: Maybe<FieldWrapper<IPrice>>;
  paid?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  provider?: Maybe<FieldWrapper<IPaymentProvider>>;
  status?: Maybe<FieldWrapper<IOrderPaymentStatus>>;
};

export type IOrderPaymentCard = IOrderPayment & {
  __typename?: 'OrderPaymentCard';
  _id: FieldWrapper<Scalars['ID']['output']>;
  discounts?: Maybe<Array<FieldWrapper<IOrderPaymentDiscount>>>;
  fee?: Maybe<FieldWrapper<IPrice>>;
  paid?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  provider?: Maybe<FieldWrapper<IPaymentProvider>>;
  status?: Maybe<FieldWrapper<IOrderPaymentStatus>>;
};

export type IOrderPaymentDiscount = IOrderDiscountable & {
  __typename?: 'OrderPaymentDiscount';
  _id: FieldWrapper<Scalars['ID']['output']>;
  orderDiscount: FieldWrapper<IOrderDiscount>;
  payment: FieldWrapper<IOrderPayment>;
  total: FieldWrapper<IPrice>;
};

export type IOrderPaymentGeneric = IOrderPayment & {
  __typename?: 'OrderPaymentGeneric';
  _id: FieldWrapper<Scalars['ID']['output']>;
  discounts?: Maybe<Array<FieldWrapper<IOrderPaymentDiscount>>>;
  fee?: Maybe<FieldWrapper<IPrice>>;
  paid?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  provider?: Maybe<FieldWrapper<IPaymentProvider>>;
  status?: Maybe<FieldWrapper<IOrderPaymentStatus>>;
};

export type IOrderPaymentInvoice = IOrderPayment & {
  __typename?: 'OrderPaymentInvoice';
  _id: FieldWrapper<Scalars['ID']['output']>;
  discounts?: Maybe<Array<FieldWrapper<IOrderPaymentDiscount>>>;
  fee?: Maybe<FieldWrapper<IPrice>>;
  paid?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  provider?: Maybe<FieldWrapper<IPaymentProvider>>;
  status?: Maybe<FieldWrapper<IOrderPaymentStatus>>;
};

export enum IOrderPaymentStatus {
  /** Unpaid Order */
  Open = 'OPEN',
  /** Order has been paid */
  Paid = 'PAID',
  /** Order has been refunded */
  Refunded = 'REFUNDED',
}

export type IOrderPickUpLocation = {
  __typename?: 'OrderPickUpLocation';
  _id: FieldWrapper<Scalars['ID']['output']>;
  address?: Maybe<FieldWrapper<IAddress>>;
  geoPoint?: Maybe<FieldWrapper<IGeoPosition>>;
  name: FieldWrapper<Scalars['String']['output']>;
  order: FieldWrapper<IOrder>;
};

export enum IOrderPriceCategory {
  /** Delivery Fees */
  Delivery = 'DELIVERY',
  /** Discount */
  Discounts = 'DISCOUNTS',
  /** Product Price Total */
  Items = 'ITEMS',
  /** Payment Fees */
  Payment = 'PAYMENT',
  /** Tax */
  Taxes = 'TAXES',
}

export enum IOrderStatus {
  /** Order has been confirmed */
  Confirmed = 'CONFIRMED',
  /** Order has been fulfilled completely (all positions in delivery) */
  Fullfilled = 'FULLFILLED',
  /** Open Order / Cart */
  Open = 'OPEN',
  /** Order has been sent but confirmation awaiting */
  Pending = 'PENDING',
  /** Order has been rejected */
  Rejected = 'REJECTED',
}

export type IPaymentCredentials = {
  __typename?: 'PaymentCredentials';
  _id: FieldWrapper<Scalars['ID']['output']>;
  isPreferred: FieldWrapper<Scalars['Boolean']['output']>;
  isValid: FieldWrapper<Scalars['Boolean']['output']>;
  meta?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  paymentProvider: FieldWrapper<IPaymentProvider>;
  token?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  user: FieldWrapper<IUser>;
};

export type IPaymentInterface = {
  __typename?: 'PaymentInterface';
  _id: FieldWrapper<Scalars['ID']['output']>;
  label?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  version?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IPaymentProvider = {
  __typename?: 'PaymentProvider';
  _id: FieldWrapper<Scalars['ID']['output']>;
  configuration?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  configurationError?: Maybe<FieldWrapper<IPaymentProviderError>>;
  created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  deleted?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  interface?: Maybe<FieldWrapper<IPaymentInterface>>;
  isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  simulatedPrice?: Maybe<FieldWrapper<IPrice>>;
  type?: Maybe<FieldWrapper<IPaymentProviderType>>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

export type IPaymentProviderSimulatedPriceArgs = {
  context?: InputMaybe<Scalars['JSON']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['ID']['input']>;
  useNetPrice?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum IPaymentProviderError {
  AdapterNotFound = 'ADAPTER_NOT_FOUND',
  IncompleteConfiguration = 'INCOMPLETE_CONFIGURATION',
  NotImplemented = 'NOT_IMPLEMENTED',
  WrongCredentials = 'WRONG_CREDENTIALS',
}

export enum IPaymentProviderType {
  /** Card */
  Card = 'CARD',
  /** Generic */
  Generic = 'GENERIC',
  /** Invoice */
  Invoice = 'INVOICE',
}

/** Plan (Virtual Product that somebody can enroll to) */
export type IPlanProduct = IProduct & {
  __typename?: 'PlanProduct';
  _id: FieldWrapper<Scalars['ID']['output']>;
  assortmentPaths: Array<FieldWrapper<IProductAssortmentPath>>;
  catalogPrice?: Maybe<FieldWrapper<IPrice>>;
  created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  defaultOrderQuantity?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  leveledCatalogPrices: Array<FieldWrapper<IPriceLevel>>;
  media: Array<FieldWrapper<IProductMedia>>;
  plan?: Maybe<FieldWrapper<IProductPlanConfiguration>>;
  published?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  reviews: Array<FieldWrapper<IProductReview>>;
  reviewsCount: FieldWrapper<Scalars['Int']['output']>;
  salesQuantityPerUnit?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  salesUnit?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  sequence: FieldWrapper<Scalars['Int']['output']>;
  siblings: Array<FieldWrapper<IProduct>>;
  simulatedPrice?: Maybe<FieldWrapper<IPrice>>;
  status: FieldWrapper<IProductStatus>;
  tags?: Maybe<Array<FieldWrapper<Scalars['LowerCaseString']['output']>>>;
  texts?: Maybe<FieldWrapper<IProductTexts>>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

/** Plan (Virtual Product that somebody can enroll to) */
export type IPlanProductAssortmentPathsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

/** Plan (Virtual Product that somebody can enroll to) */
export type IPlanProductCatalogPriceArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

/** Plan (Virtual Product that somebody can enroll to) */
export type IPlanProductLeveledCatalogPricesArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
};

/** Plan (Virtual Product that somebody can enroll to) */
export type IPlanProductMediaArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

/** Plan (Virtual Product that somebody can enroll to) */
export type IPlanProductReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

/** Plan (Virtual Product that somebody can enroll to) */
export type IPlanProductReviewsCountArgs = {
  queryString?: InputMaybe<Scalars['String']['input']>;
};

/** Plan (Virtual Product that somebody can enroll to) */
export type IPlanProductSiblingsArgs = {
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Plan (Virtual Product that somebody can enroll to) */
export type IPlanProductSimulatedPriceArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  useNetPrice?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Plan (Virtual Product that somebody can enroll to) */
export type IPlanProductTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IPrice = {
  __typename?: 'Price';
  _id: FieldWrapper<Scalars['ID']['output']>;
  amount: FieldWrapper<Scalars['Int']['output']>;
  currency: FieldWrapper<Scalars['String']['output']>;
  isNetPrice: FieldWrapper<Scalars['Boolean']['output']>;
  isTaxable: FieldWrapper<Scalars['Boolean']['output']>;
};

export type IPriceLevel = {
  __typename?: 'PriceLevel';
  maxQuantity?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  minQuantity: FieldWrapper<Scalars['Int']['output']>;
  price: FieldWrapper<IPrice>;
};

export type IPriceRange = {
  __typename?: 'PriceRange';
  _id: FieldWrapper<Scalars['ID']['output']>;
  maxPrice: FieldWrapper<IPrice>;
  minPrice: FieldWrapper<IPrice>;
};

/** Abstract Product */
export type IProduct = {
  _id: FieldWrapper<Scalars['ID']['output']>;
  assortmentPaths: Array<FieldWrapper<IProductAssortmentPath>>;
  created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  media: Array<FieldWrapper<IProductMedia>>;
  published?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  reviews: Array<FieldWrapper<IProductReview>>;
  reviewsCount: FieldWrapper<Scalars['Int']['output']>;
  sequence: FieldWrapper<Scalars['Int']['output']>;
  siblings: Array<FieldWrapper<IProduct>>;
  status: FieldWrapper<IProductStatus>;
  tags?: Maybe<Array<FieldWrapper<Scalars['LowerCaseString']['output']>>>;
  texts?: Maybe<FieldWrapper<IProductTexts>>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

/** Abstract Product */
export type IProductMediaArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

/** Abstract Product */
export type IProductReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

/** Abstract Product */
export type IProductReviewsCountArgs = {
  queryString?: InputMaybe<Scalars['String']['input']>;
};

/** Abstract Product */
export type IProductSiblingsArgs = {
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Abstract Product */
export type IProductTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IProductAssignmentVectorInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

/** Directed assortment to product paths (breadcrumbs) */
export type IProductAssortmentPath = {
  __typename?: 'ProductAssortmentPath';
  assortmentProduct: FieldWrapper<IAssortmentProduct>;
  links: Array<FieldWrapper<IAssortmentPathLink>>;
};

export type IProductBundleItem = {
  __typename?: 'ProductBundleItem';
  configuration?: Maybe<Array<FieldWrapper<IProductConfigurationParameter>>>;
  product: FieldWrapper<IProduct>;
  quantity: FieldWrapper<Scalars['Int']['output']>;
};

export type IProductCatalogPrice = {
  __typename?: 'ProductCatalogPrice';
  _id: FieldWrapper<Scalars['ID']['output']>;
  amount: FieldWrapper<Scalars['Int']['output']>;
  country: FieldWrapper<ICountry>;
  currency: FieldWrapper<ICurrency>;
  isNetPrice: FieldWrapper<Scalars['Boolean']['output']>;
  isTaxable: FieldWrapper<Scalars['Boolean']['output']>;
  maxQuantity?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
};

export type IProductConfigurationParameter = {
  __typename?: 'ProductConfigurationParameter';
  key: FieldWrapper<Scalars['String']['output']>;
  value: FieldWrapper<Scalars['String']['output']>;
};

export type IProductConfigurationParameterInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type IProductDiscount = {
  __typename?: 'ProductDiscount';
  _id: FieldWrapper<Scalars['ID']['output']>;
  interface?: Maybe<FieldWrapper<IDiscountInterface>>;
  total: FieldWrapper<IPrice>;
};

export type IProductMedia = {
  __typename?: 'ProductMedia';
  _id: FieldWrapper<Scalars['ID']['output']>;
  file: FieldWrapper<IMedia>;
  sortKey: FieldWrapper<Scalars['Int']['output']>;
  tags?: Maybe<Array<FieldWrapper<Scalars['LowerCaseString']['output']>>>;
  texts?: Maybe<FieldWrapper<IProductMediaTexts>>;
};

export type IProductMediaTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IProductMediaTexts = {
  __typename?: 'ProductMediaTexts';
  _id: FieldWrapper<Scalars['ID']['output']>;
  locale?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  subtitle?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IProductPlanConfiguration = {
  __typename?: 'ProductPlanConfiguration';
  billingInterval: FieldWrapper<IProductPlanConfigurationInterval>;
  billingIntervalCount?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  trialInterval?: Maybe<FieldWrapper<IProductPlanConfigurationInterval>>;
  trialIntervalCount?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  usageCalculationType: FieldWrapper<IProductPlanUsageCalculationType>;
};

export enum IProductPlanConfigurationInterval {
  Days = 'DAYS',
  Hours = 'HOURS',
  Months = 'MONTHS',
  Weeks = 'WEEKS',
  Years = 'YEARS',
}

export enum IProductPlanUsageCalculationType {
  Licensed = 'LICENSED',
  Metered = 'METERED',
}

export type IProductReview = {
  __typename?: 'ProductReview';
  _id: FieldWrapper<Scalars['ID']['output']>;
  author: FieldWrapper<IUser>;
  created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  deleted?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  ownVotes: Array<FieldWrapper<IProductReviewVote>>;
  product: FieldWrapper<IProduct>;
  rating?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  review?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  voteCount?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
};

export type IProductReviewVoteCountArgs = {
  type?: InputMaybe<IProductReviewVoteType>;
};

export type IProductReviewInput = {
  rating?: InputMaybe<Scalars['Int']['input']>;
  review?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type IProductReviewVote = {
  __typename?: 'ProductReviewVote';
  _id: FieldWrapper<Scalars['ID']['output']>;
  timestamp: FieldWrapper<Scalars['Timestamp']['output']>;
  type: FieldWrapper<IProductReviewVoteType>;
};

export enum IProductReviewVoteType {
  Downvote = 'DOWNVOTE',
  Report = 'REPORT',
  Upvote = 'UPVOTE',
}

/** Search result */
export type IProductSearchResult = {
  __typename?: 'ProductSearchResult';
  filteredProductsCount: FieldWrapper<Scalars['Int']['output']>;
  filters: Array<FieldWrapper<ILoadedFilter>>;
  products: Array<FieldWrapper<IProduct>>;
  productsCount: FieldWrapper<Scalars['Int']['output']>;
};

/** Search result */
export type IProductSearchResultProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export enum IProductStatus {
  /** Published */
  Active = 'ACTIVE',
  /** Deleted */
  Deleted = 'DELETED',
  /** Unpublished (hidden from catalog) */
  Draft = 'DRAFT',
}

export type IProductTexts = {
  __typename?: 'ProductTexts';
  _id: FieldWrapper<Scalars['ID']['output']>;
  brand?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  description?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  labels?: Maybe<Array<FieldWrapper<Scalars['String']['output']>>>;
  locale?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  slug?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  subtitle?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  vendor?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IProductVariation = {
  __typename?: 'ProductVariation';
  _id: FieldWrapper<Scalars['ID']['output']>;
  key?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  options?: Maybe<Array<FieldWrapper<IProductVariationOption>>>;
  texts?: Maybe<FieldWrapper<IProductVariationTexts>>;
  type?: Maybe<FieldWrapper<IProductVariationType>>;
};

export type IProductVariationTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

/** Key Value Combination to Product Assignment */
export type IProductVariationAssignment = {
  __typename?: 'ProductVariationAssignment';
  _id: FieldWrapper<Scalars['ID']['output']>;
  /** Assigned Product */
  product?: Maybe<FieldWrapper<IProduct>>;
  /** Query string key=val&key=val ... */
  vectors?: Maybe<Array<FieldWrapper<IProductVariationAssignmentVector>>>;
};

/** Key Value Combination */
export type IProductVariationAssignmentVector = {
  __typename?: 'ProductVariationAssignmentVector';
  _id: FieldWrapper<Scalars['ID']['output']>;
  option?: Maybe<FieldWrapper<IProductVariationOption>>;
  variation?: Maybe<FieldWrapper<IProductVariation>>;
};

export type IProductVariationOption = {
  __typename?: 'ProductVariationOption';
  _id: FieldWrapper<Scalars['ID']['output']>;
  texts?: Maybe<FieldWrapper<IProductVariationTexts>>;
  value?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IProductVariationOptionTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IProductVariationTexts = {
  __typename?: 'ProductVariationTexts';
  _id: FieldWrapper<Scalars['ID']['output']>;
  locale?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  subtitle?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export enum IProductVariationType {
  /** Color Picker */
  Color = 'COLOR',
  /** Text Answers */
  Text = 'TEXT',
}

export type IPushSubscription = {
  __typename?: 'PushSubscription';
  _id: FieldWrapper<Scalars['ID']['output']>;
  endpoint: FieldWrapper<Scalars['String']['output']>;
  expirationTime?: Maybe<FieldWrapper<Scalars['Timestamp']['output']>>;
  userAgent?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IQuery = {
  __typename?: 'Query';
  /** Get List of currently registered worker plugins */
  activeWorkTypes: Array<FieldWrapper<IWorkType>>;
  /** Get a specific assortment by ID */
  assortment?: Maybe<FieldWrapper<IAssortment>>;
  /** Get all root assortments, by default sorted by sequence (ascending) */
  assortments: Array<FieldWrapper<IAssortment>>;
  /** Returns total number of assortments that match a given criteria or all if no criteria is given */
  assortmentsCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get all countries, by default sorted by creation date (ascending) */
  countries: Array<FieldWrapper<ICountry>>;
  /** Returns total number of countries */
  countriesCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific country by ID */
  country?: Maybe<FieldWrapper<ICountry>>;
  /** Get all currencies, by default sorted by creation date (ascending) */
  currencies: Array<FieldWrapper<ICurrency>>;
  /** Returns total number of currencies */
  currenciesCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific currency by ID */
  currency?: Maybe<FieldWrapper<ICurrency>>;
  /** Get all delivery interfaces filtered by type */
  deliveryInterfaces: Array<FieldWrapper<IDeliveryInterface>>;
  /** Get a specific delivery provider by ID */
  deliveryProvider?: Maybe<FieldWrapper<IDeliveryProvider>>;
  /** Get all delivery providers, optionally filtered by type */
  deliveryProviders: Array<FieldWrapper<IDeliveryProvider>>;
  /** Returns total number of delivery providers, optionally filtered by type */
  deliveryProvidersCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific quotation by ID */
  enrollment?: Maybe<FieldWrapper<IEnrollment>>;
  /** Get all enrollments, by default sorted by creation date (ascending) */
  enrollments: Array<FieldWrapper<IEnrollment>>;
  /** Returns total number of enrollments */
  enrollmentsCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific work unit by ID */
  event?: Maybe<FieldWrapper<IEvent>>;
  /** Get all emitted events, by default sorted by creation date (desc) */
  events: Array<FieldWrapper<IEvent>>;
  /** Get total count of all emitted events */
  eventsCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific filter by ID */
  filter?: Maybe<FieldWrapper<IFilter>>;
  /** Get all filters, by default sorted by creation date (ascending) */
  filters: Array<FieldWrapper<IFilter>>;
  /** Returns total number of filters */
  filtersCount: FieldWrapper<Scalars['Int']['output']>;
  /** User impersonating current user session using the  impersonate API */
  impersonator?: Maybe<FieldWrapper<IUser>>;
  /** Get a specific language */
  language?: Maybe<FieldWrapper<ILanguage>>;
  /** Get all languages, by default sorted by creation date (ascending) */
  languages: Array<Maybe<FieldWrapper<ILanguage>>>;
  /** Returns total number languages */
  languagesCount: FieldWrapper<Scalars['Int']['output']>;
  /** Currently logged in user */
  me?: Maybe<FieldWrapper<IUser>>;
  /** Get a specific single order */
  order?: Maybe<FieldWrapper<IOrder>>;
  /** Get all orders, by default sorted by creation date (descending) */
  orders: Array<FieldWrapper<IOrder>>;
  /** Returns total number of orders */
  ordersCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get all payment interfaces filtered by type */
  paymentInterfaces: Array<FieldWrapper<IPaymentInterface>>;
  /** Get a specific payment provider by ID */
  paymentProvider?: Maybe<FieldWrapper<IPaymentProvider>>;
  /** Get all payment providers, optionally filtered by type */
  paymentProviders: Array<FieldWrapper<IPaymentProvider>>;
  /** Returns total number of payment providers, optionally filtered by type */
  paymentProvidersCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific product by id or slug */
  product?: Maybe<FieldWrapper<IProduct>>;
  /** List products specified prices */
  productCatalogPrices: Array<FieldWrapper<IProductCatalogPrice>>;
  /** Get a specific product review by ID */
  productReview: FieldWrapper<IProductReview>;
  /** Get all product reviews, by default sorted by creation date (descending) */
  productReviews: Array<FieldWrapper<IProductReview>>;
  /** Returns total number of product reviews */
  productReviewsCount: FieldWrapper<Scalars['Int']['output']>;
  /**
   * Simple list of published products filtered either by tags or explicit slugs
   * If a slug is provided, limit and offset don't have any effect on the result
   * By default sorted by sequence (ascending) and published (ascending) unless a queryString is set
   */
  products: Array<FieldWrapper<IProduct>>;
  /**
   * Return total number of published products filtered either by tags or explicit slugs
   * If a slug is provided
   */
  productsCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific quotation by ID */
  quotation?: Maybe<FieldWrapper<IQuotation>>;
  /** Get all quotations, by default sorted by creation date (ascending) */
  quotations: Array<FieldWrapper<IQuotation>>;
  /** Returns total number of quotations */
  quotationsCount: FieldWrapper<Scalars['Int']['output']>;
  /** Search assortments */
  searchAssortments: FieldWrapper<IAssortmentSearchResult>;
  /** Search products */
  searchProducts: FieldWrapper<IProductSearchResult>;
  /** Get shop-global data and the resolved country/language pair */
  shopInfo: FieldWrapper<IShop>;
  /** Get token */
  token?: Maybe<FieldWrapper<IToken>>;
  /** Localization: Media title/subtitle of a media that is attached to a assortment */
  translatedAssortmentMediaTexts: Array<FieldWrapper<IAssortmentMediaTexts>>;
  /** Localization: Meta data for assortments */
  translatedAssortmentTexts: Array<FieldWrapper<IAssortmentTexts>>;
  /** Localization: Filters and Filter Options */
  translatedFilterTexts: Array<FieldWrapper<IFilterTexts>>;
  /** Localization: Media title/subtitle of a media that is attached to a product */
  translatedProductMediaTexts: Array<FieldWrapper<IProductMediaTexts>>;
  /** Localization: Meta data for product */
  translatedProductTexts: Array<FieldWrapper<IProductTexts>>;
  /** Localization: Variations and Variation Options */
  translatedProductVariationTexts: Array<FieldWrapper<IProductVariationTexts>>;
  /** Specific user data if userId provided, else returns currently logged in */
  user?: Maybe<FieldWrapper<IUser>>;
  /** Get list of users, by default sorted by creation date (ascending) unless a queryString is set */
  users: Array<FieldWrapper<IUser>>;
  /** Get total number of users in the system that match query */
  usersCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get all warehousing interfaces filtered by type */
  warehousingInterfaces: Array<FieldWrapper<IWarehousingInterface>>;
  /** Get a specific warehousing provider by ID */
  warehousingProvider?: Maybe<FieldWrapper<IWarehousingProvider>>;
  /** Get all warehousing providers, optionally filtered by type */
  warehousingProviders: Array<FieldWrapper<IWarehousingProvider>>;
  /** Returns total number of delivery providers, optionally filtered by type */
  warehousingProvidersCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific work unit by ID */
  work?: Maybe<FieldWrapper<IWork>>;
  /** Get all work from the queue, by default sorted by start date (desc), priority (desc), originalWorkId (asc) and created (asc) */
  workQueue: Array<FieldWrapper<IWork>>;
  /** Return total number of workers filtered the provided arguments */
  workQueueCount: FieldWrapper<Scalars['Int']['output']>;
};

export type IQueryAssortmentArgs = {
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type IQueryAssortmentsArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  includeLeaves?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  slugs?: InputMaybe<Array<Scalars['String']['input']>>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

export type IQueryAssortmentsCountArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  includeLeaves?: InputMaybe<Scalars['Boolean']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  slugs?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

export type IQueryCountriesArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

export type IQueryCountriesCountArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
};

export type IQueryCountryArgs = {
  countryId: Scalars['ID']['input'];
};

export type IQueryCurrenciesArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

export type IQueryCurrenciesCountArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
};

export type IQueryCurrencyArgs = {
  currencyId: Scalars['ID']['input'];
};

export type IQueryDeliveryInterfacesArgs = {
  type: IDeliveryProviderType;
};

export type IQueryDeliveryProviderArgs = {
  deliveryProviderId: Scalars['ID']['input'];
};

export type IQueryDeliveryProvidersArgs = {
  type?: InputMaybe<IDeliveryProviderType>;
};

export type IQueryDeliveryProvidersCountArgs = {
  type?: InputMaybe<IDeliveryProviderType>;
};

export type IQueryEnrollmentArgs = {
  enrollmentId: Scalars['ID']['input'];
};

export type IQueryEnrollmentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
  status?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type IQueryEnrollmentsCountArgs = {
  queryString?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type IQueryEventArgs = {
  eventId: Scalars['ID']['input'];
};

export type IQueryEventsArgs = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
  types?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type IQueryEventsCountArgs = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  types?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type IQueryFilterArgs = {
  filterId?: InputMaybe<Scalars['ID']['input']>;
};

export type IQueryFiltersArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

export type IQueryFiltersCountArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
};

export type IQueryLanguageArgs = {
  languageId: Scalars['ID']['input'];
};

export type IQueryLanguagesArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

export type IQueryLanguagesCountArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
};

export type IQueryOrderArgs = {
  orderId: Scalars['ID']['input'];
};

export type IQueryOrdersArgs = {
  includeCarts?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

export type IQueryOrdersCountArgs = {
  includeCarts?: InputMaybe<Scalars['Boolean']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
};

export type IQueryPaymentInterfacesArgs = {
  type: IPaymentProviderType;
};

export type IQueryPaymentProviderArgs = {
  paymentProviderId: Scalars['ID']['input'];
};

export type IQueryPaymentProvidersArgs = {
  type?: InputMaybe<IPaymentProviderType>;
};

export type IQueryPaymentProvidersCountArgs = {
  type?: InputMaybe<IPaymentProviderType>;
};

export type IQueryProductArgs = {
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type IQueryProductCatalogPricesArgs = {
  productId: Scalars['ID']['input'];
};

export type IQueryProductReviewArgs = {
  productReviewId: Scalars['ID']['input'];
};

export type IQueryProductReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

export type IQueryProductReviewsCountArgs = {
  queryString?: InputMaybe<Scalars['String']['input']>;
};

export type IQueryProductsArgs = {
  includeDrafts?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  slugs?: InputMaybe<Array<Scalars['String']['input']>>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

export type IQueryProductsCountArgs = {
  includeDrafts?: InputMaybe<Scalars['Boolean']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  slugs?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

export type IQueryQuotationArgs = {
  quotationId: Scalars['ID']['input'];
};

export type IQueryQuotationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

export type IQueryQuotationsCountArgs = {
  queryString?: InputMaybe<Scalars['String']['input']>;
};

export type IQuerySearchAssortmentsArgs = {
  assortmentIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<ISearchOrderBy>;
  queryString?: InputMaybe<Scalars['String']['input']>;
};

export type IQuerySearchProductsArgs = {
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  filterQuery?: InputMaybe<Array<IFilterQueryInput>>;
  ignoreChildAssortments?: InputMaybe<Scalars['Boolean']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<ISearchOrderBy>;
  queryString?: InputMaybe<Scalars['String']['input']>;
};

export type IQueryTokenArgs = {
  tokenId: Scalars['ID']['input'];
};

export type IQueryTranslatedAssortmentMediaTextsArgs = {
  assortmentMediaId: Scalars['ID']['input'];
};

export type IQueryTranslatedAssortmentTextsArgs = {
  assortmentId: Scalars['ID']['input'];
};

export type IQueryTranslatedFilterTextsArgs = {
  filterId: Scalars['ID']['input'];
  filterOptionValue?: InputMaybe<Scalars['String']['input']>;
};

export type IQueryTranslatedProductMediaTextsArgs = {
  productMediaId: Scalars['ID']['input'];
};

export type IQueryTranslatedProductTextsArgs = {
  productId: Scalars['ID']['input'];
};

export type IQueryTranslatedProductVariationTextsArgs = {
  productVariationId: Scalars['ID']['input'];
  productVariationOptionValue?: InputMaybe<Scalars['String']['input']>;
};

export type IQueryUserArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type IQueryUsersArgs = {
  includeGuests?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

export type IQueryUsersCountArgs = {
  includeGuests?: InputMaybe<Scalars['Boolean']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
};

export type IQueryWarehousingInterfacesArgs = {
  type: IWarehousingProviderType;
};

export type IQueryWarehousingProviderArgs = {
  warehousingProviderId: Scalars['ID']['input'];
};

export type IQueryWarehousingProvidersArgs = {
  type?: InputMaybe<IWarehousingProviderType>;
};

export type IQueryWarehousingProvidersCountArgs = {
  type?: InputMaybe<IWarehousingProviderType>;
};

export type IQueryWorkArgs = {
  workId: Scalars['ID']['input'];
};

export type IQueryWorkQueueArgs = {
  created?: InputMaybe<IDateFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
  status?: InputMaybe<Array<IWorkStatus>>;
  types?: InputMaybe<Array<IWorkType>>;
};

export type IQueryWorkQueueCountArgs = {
  created?: InputMaybe<IDateFilterInput>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<IWorkStatus>>;
  types?: InputMaybe<Array<IWorkType>>;
};

/** Quotation */
export type IQuotation = {
  __typename?: 'Quotation';
  _id: FieldWrapper<Scalars['ID']['output']>;
  configuration?: Maybe<Array<FieldWrapper<IProductConfigurationParameter>>>;
  country?: Maybe<FieldWrapper<ICountry>>;
  created: FieldWrapper<Scalars['DateTime']['output']>;
  currency?: Maybe<FieldWrapper<ICurrency>>;
  expires?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  fullfilled?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  isExpired?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  product: FieldWrapper<IProduct>;
  quotationNumber?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  rejected?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  status: FieldWrapper<IQuotationStatus>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  user: FieldWrapper<IUser>;
};

/** Quotation */
export type IQuotationIsExpiredArgs = {
  referenceDate?: InputMaybe<Scalars['Timestamp']['input']>;
};

export enum IQuotationDocumentType {
  /** Other */
  Other = 'OTHER',
  /** Proposal */
  Proposal = 'PROPOSAL',
}

export enum IQuotationStatus {
  /** Quotation has been used to order the product */
  Fullfilled = 'FULLFILLED',
  /** Awaiting Offer */
  Processing = 'PROCESSING',
  /** Proposal ready */
  Proposed = 'PROPOSED',
  /** Quotation has been rejected by either party */
  Rejected = 'REJECTED',
  /** Request for Proposal */
  Requested = 'REQUESTED',
}

export type IReorderAssortmentFilterInput = {
  assortmentFilterId: Scalars['ID']['input'];
  sortKey: Scalars['Int']['input'];
};

export type IReorderAssortmentLinkInput = {
  assortmentLinkId: Scalars['ID']['input'];
  sortKey: Scalars['Int']['input'];
};

export type IReorderAssortmentMediaInput = {
  assortmentMediaId: Scalars['ID']['input'];
  sortKey: Scalars['Int']['input'];
};

export type IReorderAssortmentProductInput = {
  assortmentProductId: Scalars['ID']['input'];
  sortKey: Scalars['Int']['input'];
};

export type IReorderProductMediaInput = {
  productMediaId: Scalars['ID']['input'];
  sortKey: Scalars['Int']['input'];
};

export enum IRoleAction {
  AnswerQuotation = 'answerQuotation',
  AuthTwoFactor = 'authTwoFactor',
  BookmarkProduct = 'bookmarkProduct',
  BulkImport = 'bulkImport',
  ChangePassword = 'changePassword',
  CheckoutCart = 'checkoutCart',
  CreateCart = 'createCart',
  CreateEnrollment = 'createEnrollment',
  CreateUser = 'createUser',
  ForgotPassword = 'forgotPassword',
  Heartbeat = 'heartbeat',
  Impersonate = 'impersonate',
  LoginAsGuest = 'loginAsGuest',
  LoginWithOAuth = 'loginWithOAuth',
  LoginWithPassword = 'loginWithPassword',
  LoginWithWebAuthn = 'loginWithWebAuthn',
  Logout = 'logout',
  LogoutAllSessions = 'logoutAllSessions',
  ManageAssortments = 'manageAssortments',
  ManageBookmarks = 'manageBookmarks',
  ManageCountries = 'manageCountries',
  ManageCurrencies = 'manageCurrencies',
  ManageDeliveryProviders = 'manageDeliveryProviders',
  ManageFilters = 'manageFilters',
  ManageLanguages = 'manageLanguages',
  ManagePaymentCredentials = 'managePaymentCredentials',
  ManagePaymentProviders = 'managePaymentProviders',
  ManageProductReviews = 'manageProductReviews',
  ManageProducts = 'manageProducts',
  ManageQuotations = 'manageQuotations',
  ManageTwoFactor = 'manageTwoFactor',
  ManageUsers = 'manageUsers',
  ManageWarehousingProviders = 'manageWarehousingProviders',
  ManageWorker = 'manageWorker',
  MarkOrderConfirmed = 'markOrderConfirmed',
  MarkOrderDelivered = 'markOrderDelivered',
  MarkOrderPaid = 'markOrderPaid',
  MarkOrderRejected = 'markOrderRejected',
  PageView = 'pageView',
  RegisterPaymentCredentials = 'registerPaymentCredentials',
  RequestQuotation = 'requestQuotation',
  ResetPassword = 'resetPassword',
  ReviewProduct = 'reviewProduct',
  Search = 'search',
  SendEmail = 'sendEmail',
  StopImpersonation = 'stopImpersonation',
  UpdateCart = 'updateCart',
  UpdateEnrollment = 'updateEnrollment',
  UpdateOrder = 'updateOrder',
  UpdateOrderDelivery = 'updateOrderDelivery',
  UpdateOrderDiscount = 'updateOrderDiscount',
  UpdateOrderItem = 'updateOrderItem',
  UpdateOrderPayment = 'updateOrderPayment',
  UpdateProductReview = 'updateProductReview',
  UpdateToken = 'updateToken',
  UpdateUser = 'updateUser',
  UpdateUsername = 'updateUsername',
  UseWebAuthn = 'useWebAuthn',
  VerifyEmail = 'verifyEmail',
  ViewAssortment = 'viewAssortment',
  ViewAssortments = 'viewAssortments',
  ViewCountries = 'viewCountries',
  ViewCountry = 'viewCountry',
  ViewCurrencies = 'viewCurrencies',
  ViewCurrency = 'viewCurrency',
  ViewDeliveryInterfaces = 'viewDeliveryInterfaces',
  ViewDeliveryProvider = 'viewDeliveryProvider',
  ViewDeliveryProviders = 'viewDeliveryProviders',
  ViewEnrollment = 'viewEnrollment',
  ViewEnrollments = 'viewEnrollments',
  ViewEvent = 'viewEvent',
  ViewEvents = 'viewEvents',
  ViewFilter = 'viewFilter',
  ViewFilters = 'viewFilters',
  ViewLanguage = 'viewLanguage',
  ViewLanguages = 'viewLanguages',
  ViewLogs = 'viewLogs',
  ViewOrder = 'viewOrder',
  ViewOrders = 'viewOrders',
  ViewPaymentInterfaces = 'viewPaymentInterfaces',
  ViewPaymentProvider = 'viewPaymentProvider',
  ViewPaymentProviders = 'viewPaymentProviders',
  ViewProduct = 'viewProduct',
  ViewProducts = 'viewProducts',
  ViewQuotation = 'viewQuotation',
  ViewQuotations = 'viewQuotations',
  ViewShopInfo = 'viewShopInfo',
  ViewToken = 'viewToken',
  ViewTranslations = 'viewTranslations',
  ViewUser = 'viewUser',
  ViewUserEnrollments = 'viewUserEnrollments',
  ViewUserOrders = 'viewUserOrders',
  ViewUserPrivateInfos = 'viewUserPrivateInfos',
  ViewUserProductReviews = 'viewUserProductReviews',
  ViewUserPublicInfos = 'viewUserPublicInfos',
  ViewUserQuotations = 'viewUserQuotations',
  ViewUserRoles = 'viewUserRoles',
  ViewUserTokens = 'viewUserTokens',
  ViewUsers = 'viewUsers',
  ViewWarehousingInterfaces = 'viewWarehousingInterfaces',
  ViewWarehousingProvider = 'viewWarehousingProvider',
  ViewWarehousingProviders = 'viewWarehousingProviders',
  VoteProductReview = 'voteProductReview',
}

export enum ISearchOrderBy {
  Default = 'default',
}

/** Search result */
export type ISearchResult = {
  __typename?: 'SearchResult';
  filteredProductsCount: FieldWrapper<Scalars['Int']['output']>;
  filters: Array<FieldWrapper<ILoadedFilter>>;
  products: Array<FieldWrapper<IProduct>>;
  productsCount: FieldWrapper<Scalars['Int']['output']>;
};

/** Search result */
export type ISearchResultProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type IShop = {
  __typename?: 'Shop';
  _id: FieldWrapper<Scalars['ID']['output']>;
  adminUiConfig: FieldWrapper<IAdminUiConfig>;
  country?: Maybe<FieldWrapper<ICountry>>;
  externalLinks: Array<Maybe<FieldWrapper<ILink>>>;
  language?: Maybe<FieldWrapper<ILanguage>>;
  oAuthProviders: Array<FieldWrapper<IOAuthProvider>>;
  userRoles: Array<FieldWrapper<Scalars['String']['output']>>;
  vapidPublicKey?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  version?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

/** Simple Product */
export type ISimpleProduct = IProduct & {
  __typename?: 'SimpleProduct';
  _id: FieldWrapper<Scalars['ID']['output']>;
  assortmentPaths: Array<FieldWrapper<IProductAssortmentPath>>;
  baseUnit?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  catalogPrice?: Maybe<FieldWrapper<IPrice>>;
  created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  defaultOrderQuantity?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  dimensions?: Maybe<FieldWrapper<IDimensions>>;
  leveledCatalogPrices: Array<FieldWrapper<IPriceLevel>>;
  media: Array<FieldWrapper<IProductMedia>>;
  published?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  reviews: Array<FieldWrapper<IProductReview>>;
  reviewsCount: FieldWrapper<Scalars['Int']['output']>;
  salesQuantityPerUnit?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  salesUnit?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  sequence: FieldWrapper<Scalars['Int']['output']>;
  siblings: Array<FieldWrapper<IProduct>>;
  simulatedDispatches?: Maybe<Array<FieldWrapper<IDispatch>>>;
  simulatedPrice?: Maybe<FieldWrapper<IPrice>>;
  simulatedStocks?: Maybe<Array<FieldWrapper<IStock>>>;
  sku?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  status: FieldWrapper<IProductStatus>;
  tags?: Maybe<Array<FieldWrapper<Scalars['LowerCaseString']['output']>>>;
  texts?: Maybe<FieldWrapper<IProductTexts>>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

/** Simple Product */
export type ISimpleProductCatalogPriceArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

/** Simple Product */
export type ISimpleProductLeveledCatalogPricesArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
};

/** Simple Product */
export type ISimpleProductMediaArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

/** Simple Product */
export type ISimpleProductReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

/** Simple Product */
export type ISimpleProductReviewsCountArgs = {
  queryString?: InputMaybe<Scalars['String']['input']>;
};

/** Simple Product */
export type ISimpleProductSiblingsArgs = {
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Simple Product */
export type ISimpleProductSimulatedDispatchesArgs = {
  deliveryProviderType?: InputMaybe<IDeliveryProviderType>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  referenceDate?: InputMaybe<Scalars['Timestamp']['input']>;
};

/** Simple Product */
export type ISimpleProductSimulatedPriceArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  useNetPrice?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Simple Product */
export type ISimpleProductSimulatedStocksArgs = {
  deliveryProviderType?: InputMaybe<IDeliveryProviderType>;
  referenceDate?: InputMaybe<Scalars['Timestamp']['input']>;
};

/** Simple Product */
export type ISimpleProductTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export enum ISmartContractStandard {
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155',
}

export enum ISortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type ISortOptionInput = {
  key: Scalars['String']['input'];
  value: ISortDirection;
};

export type IStock = {
  __typename?: 'Stock';
  _id: FieldWrapper<Scalars['ID']['output']>;
  deliveryProvider?: Maybe<FieldWrapper<IDeliveryProvider>>;
  quantity?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  warehousingProvider?: Maybe<FieldWrapper<IWarehousingProvider>>;
};

export type ISuccessResponse = {
  __typename?: 'SuccessResponse';
  success?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
};

export type IToken = {
  __typename?: 'Token';
  _id: FieldWrapper<Scalars['ID']['output']>;
  chainId?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  chainTokenId?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  contractAddress?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  ercMetadata?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  product: FieldWrapper<ITokenizedProduct>;
  quantity: FieldWrapper<Scalars['Int']['output']>;
  status: FieldWrapper<ITokenExportStatus>;
  user?: Maybe<FieldWrapper<IUser>>;
  walletAddress?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type ITokenErcMetadataArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export enum ITokenExportStatus {
  Centralized = 'CENTRALIZED',
  Decentralized = 'DECENTRALIZED',
  Exporting = 'EXPORTING',
}

/** Tokenized Product (Blockchain materialized Product) */
export type ITokenizedProduct = IProduct & {
  __typename?: 'TokenizedProduct';
  _id: FieldWrapper<Scalars['ID']['output']>;
  assortmentPaths: Array<FieldWrapper<IProductAssortmentPath>>;
  catalogPrice?: Maybe<FieldWrapper<IPrice>>;
  contractAddress?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  contractConfiguration?: Maybe<FieldWrapper<IContractConfiguration>>;
  contractStandard?: Maybe<FieldWrapper<ISmartContractStandard>>;
  created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  leveledCatalogPrices: Array<FieldWrapper<IPriceLevel>>;
  media: Array<FieldWrapper<IProductMedia>>;
  published?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  reviews: Array<FieldWrapper<IProductReview>>;
  reviewsCount: FieldWrapper<Scalars['Int']['output']>;
  sequence: FieldWrapper<Scalars['Int']['output']>;
  siblings: Array<FieldWrapper<IProduct>>;
  simulatedPrice?: Maybe<FieldWrapper<IPrice>>;
  simulatedStocks?: Maybe<Array<FieldWrapper<IStock>>>;
  status: FieldWrapper<IProductStatus>;
  tags?: Maybe<Array<FieldWrapper<Scalars['LowerCaseString']['output']>>>;
  texts?: Maybe<FieldWrapper<IProductTexts>>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

/** Tokenized Product (Blockchain materialized Product) */
export type ITokenizedProductAssortmentPathsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

/** Tokenized Product (Blockchain materialized Product) */
export type ITokenizedProductCatalogPriceArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

/** Tokenized Product (Blockchain materialized Product) */
export type ITokenizedProductLeveledCatalogPricesArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
};

/** Tokenized Product (Blockchain materialized Product) */
export type ITokenizedProductMediaArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

/** Tokenized Product (Blockchain materialized Product) */
export type ITokenizedProductReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

/** Tokenized Product (Blockchain materialized Product) */
export type ITokenizedProductReviewsCountArgs = {
  queryString?: InputMaybe<Scalars['String']['input']>;
};

/** Tokenized Product (Blockchain materialized Product) */
export type ITokenizedProductSiblingsArgs = {
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** Tokenized Product (Blockchain materialized Product) */
export type ITokenizedProductSimulatedPriceArgs = {
  currency?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  useNetPrice?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Tokenized Product (Blockchain materialized Product) */
export type ITokenizedProductSimulatedStocksArgs = {
  referenceDate?: InputMaybe<Scalars['Timestamp']['input']>;
};

/** Tokenized Product (Blockchain materialized Product) */
export type ITokenizedProductTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateAssortmentInput = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isRoot?: InputMaybe<Scalars['Boolean']['input']>;
  sequence?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

export type IUpdateAssortmentMediaTextInput = {
  locale: Scalars['String']['input'];
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateAssortmentTextInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  locale: Scalars['String']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateCountryInput = {
  defaultCurrencyId?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isoCode: Scalars['String']['input'];
};

export type IUpdateCurrencyInput = {
  contractAddress?: InputMaybe<Scalars['String']['input']>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isoCode: Scalars['String']['input'];
};

export type IUpdateFilterInput = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateFilterTextInput = {
  locale: Scalars['String']['input'];
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateLanguageInput = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isoCode: Scalars['String']['input'];
};

export type IUpdateProductCommerceInput = {
  pricing: Array<IUpdateProductCommercePricingInput>;
};

export type IUpdateProductCommercePricingInput = {
  amount: Scalars['Int']['input'];
  countryCode: Scalars['String']['input'];
  currencyCode: Scalars['String']['input'];
  isNetPrice?: InputMaybe<Scalars['Boolean']['input']>;
  isTaxable?: InputMaybe<Scalars['Boolean']['input']>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type IUpdateProductInput = {
  meta?: InputMaybe<Scalars['JSON']['input']>;
  sequence?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['LowerCaseString']['input']>>;
};

export type IUpdateProductMediaTextInput = {
  locale: Scalars['String']['input'];
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateProductPlanInput = {
  billingInterval: IProductPlanConfigurationInterval;
  billingIntervalCount?: InputMaybe<Scalars['Int']['input']>;
  trialInterval?: InputMaybe<IProductPlanConfigurationInterval>;
  trialIntervalCount?: InputMaybe<Scalars['Int']['input']>;
  usageCalculationType: IProductPlanUsageCalculationType;
};

export type IUpdateProductSupplyInput = {
  heightInMillimeters?: InputMaybe<Scalars['Int']['input']>;
  lengthInMillimeters?: InputMaybe<Scalars['Int']['input']>;
  weightInGram?: InputMaybe<Scalars['Int']['input']>;
  widthInMillimeters?: InputMaybe<Scalars['Int']['input']>;
};

export type IUpdateProductTextInput = {
  brand?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  labels?: InputMaybe<Array<Scalars['String']['input']>>;
  locale: Scalars['String']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  vendor?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateProductTokenizationInput = {
  contractAddress: Scalars['String']['input'];
  contractStandard: ISmartContractStandard;
  ercMetadataProperties?: InputMaybe<Scalars['JSON']['input']>;
  supply: Scalars['Int']['input'];
  tokenId: Scalars['String']['input'];
};

export type IUpdateProductVariationTextInput = {
  locale: Scalars['String']['input'];
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateProductWarehousingInput = {
  baseUnit?: InputMaybe<Scalars['String']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateProviderInput = {
  configuration?: InputMaybe<Array<Scalars['JSON']['input']>>;
};

export type IUser = {
  __typename?: 'User';
  _id: FieldWrapper<Scalars['ID']['output']>;
  allowedActions: Array<FieldWrapper<IRoleAction>>;
  avatar?: Maybe<FieldWrapper<IMedia>>;
  bookmarks: Array<FieldWrapper<IBookmark>>;
  cart?: Maybe<FieldWrapper<IOrder>>;
  country?: Maybe<FieldWrapper<ICountry>>;
  created: FieldWrapper<Scalars['DateTime']['output']>;
  deleted?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  emails?: Maybe<Array<FieldWrapper<IUserEmail>>>;
  enrollments: Array<FieldWrapper<IEnrollment>>;
  isGuest: FieldWrapper<Scalars['Boolean']['output']>;
  isInitialPassword: FieldWrapper<Scalars['Boolean']['output']>;
  isTwoFactorEnabled: FieldWrapper<Scalars['Boolean']['output']>;
  language?: Maybe<FieldWrapper<ILanguage>>;
  lastBillingAddress?: Maybe<FieldWrapper<IAddress>>;
  lastContact?: Maybe<FieldWrapper<IContact>>;
  lastLogin?: Maybe<FieldWrapper<IUserLoginTracker>>;
  name: FieldWrapper<Scalars['String']['output']>;
  oAuthAccounts: Array<FieldWrapper<IOAuthAccount>>;
  orders: Array<FieldWrapper<IOrder>>;
  paymentCredentials: Array<FieldWrapper<IPaymentCredentials>>;
  primaryEmail?: Maybe<FieldWrapper<IUserEmail>>;
  profile?: Maybe<FieldWrapper<IUserProfile>>;
  pushSubscriptions: Array<FieldWrapper<IPushSubscription>>;
  quotations: Array<FieldWrapper<IQuotation>>;
  reviews: Array<FieldWrapper<IProductReview>>;
  reviewsCount: FieldWrapper<Scalars['Int']['output']>;
  roles?: Maybe<Array<FieldWrapper<Scalars['String']['output']>>>;
  tags?: Maybe<Array<FieldWrapper<Scalars['LowerCaseString']['output']>>>;
  tokens: Array<FieldWrapper<IToken>>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  username?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  web3Addresses: Array<FieldWrapper<IWeb3Address>>;
  webAuthnCredentials: Array<FieldWrapper<IWebAuthnCredentials>>;
};

export type IUserCartArgs = {
  orderNumber?: InputMaybe<Scalars['String']['input']>;
};

export type IUserEnrollmentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
  status?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type IUserOrdersArgs = {
  includeCarts?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

export type IUserQuotationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

export type IUserReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput>>;
};

export type IUserEmail = {
  __typename?: 'UserEmail';
  address: FieldWrapper<Scalars['String']['output']>;
  verified: FieldWrapper<Scalars['Boolean']['output']>;
};

export type IUserLoginTracker = {
  __typename?: 'UserLoginTracker';
  countryCode?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  locale?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  remoteAddress?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  remotePort?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  timestamp: FieldWrapper<Scalars['Timestamp']['output']>;
  userAgent?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IUserProfile = {
  __typename?: 'UserProfile';
  address?: Maybe<FieldWrapper<IAddress>>;
  birthday?: Maybe<FieldWrapper<Scalars['Date']['output']>>;
  displayName?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  gender?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  phoneMobile?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IUserProfileInput = {
  address?: InputMaybe<IAddressInput>;
  birthday?: InputMaybe<Scalars['Timestamp']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  phoneMobile?: InputMaybe<Scalars['String']['input']>;
};

export type IWarehousingInterface = {
  __typename?: 'WarehousingInterface';
  _id: FieldWrapper<Scalars['ID']['output']>;
  label?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  version?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IWarehousingProvider = {
  __typename?: 'WarehousingProvider';
  _id: FieldWrapper<Scalars['ID']['output']>;
  configuration?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  configurationError?: Maybe<FieldWrapper<IWarehousingProviderError>>;
  created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  deleted?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  interface?: Maybe<FieldWrapper<IWarehousingInterface>>;
  isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  type?: Maybe<FieldWrapper<IWarehousingProviderType>>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

export enum IWarehousingProviderError {
  AdapterNotFound = 'ADAPTER_NOT_FOUND',
  IncompleteConfiguration = 'INCOMPLETE_CONFIGURATION',
  NotImplemented = 'NOT_IMPLEMENTED',
  WrongCredentials = 'WRONG_CREDENTIALS',
}

export enum IWarehousingProviderType {
  /** Physical warehousing providers resemble stores or facilities that hold a quantity of stocks physically in stock. */
  Physical = 'PHYSICAL',
  /** Virtual warehousing providers resemble software that control ownership and validity of virtual products (for ex. smart contract bridges) */
  Virtual = 'VIRTUAL',
}

export type IWeb3Address = {
  __typename?: 'Web3Address';
  address: FieldWrapper<Scalars['String']['output']>;
  nonce?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  verified: FieldWrapper<Scalars['Boolean']['output']>;
};

export type IWebAuthnCredentials = {
  __typename?: 'WebAuthnCredentials';
  _id: FieldWrapper<Scalars['ID']['output']>;
  aaguid: FieldWrapper<Scalars['String']['output']>;
  counter: FieldWrapper<Scalars['Int']['output']>;
  created: FieldWrapper<Scalars['DateTime']['output']>;
  mdsMetadata?: Maybe<FieldWrapper<IWebAuthnMdSv3Metadata>>;
};

export type IWebAuthnMdSv3Metadata = {
  __typename?: 'WebAuthnMDSv3Metadata';
  attachmentHint?: Maybe<Array<FieldWrapper<Scalars['String']['output']>>>;
  attestationRootCertificates?: Maybe<
    Array<FieldWrapper<Scalars['String']['output']>>
  >;
  attestationTypes?: Maybe<Array<FieldWrapper<Scalars['String']['output']>>>;
  authenticationAlgorithms?: Maybe<
    Array<FieldWrapper<Scalars['String']['output']>>
  >;
  authenticatorGetInfo?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  authenticatorVersion?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  cryptoStrength?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  description?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  icon?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  keyProtection?: Maybe<Array<FieldWrapper<Scalars['String']['output']>>>;
  legalHeader?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  matcherProtection?: Maybe<Array<FieldWrapper<Scalars['String']['output']>>>;
  protocolFamily?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  publicKeyAlgAndEncodings?: Maybe<
    Array<FieldWrapper<Scalars['String']['output']>>
  >;
  schema?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  tcDisplay?: Maybe<Array<FieldWrapper<Scalars['JSON']['output']>>>;
  upv?: Maybe<Array<FieldWrapper<Scalars['JSON']['output']>>>;
  userVerificationDetails?: Maybe<
    Array<FieldWrapper<Scalars['JSON']['output']>>
  >;
};

export type IWork = {
  __typename?: 'Work';
  _id: FieldWrapper<Scalars['ID']['output']>;
  created: FieldWrapper<Scalars['DateTime']['output']>;
  deleted?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  error?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  finished?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  input?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  original?: Maybe<FieldWrapper<IWork>>;
  priority: FieldWrapper<Scalars['Int']['output']>;
  result?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  retries: FieldWrapper<Scalars['Int']['output']>;
  scheduled?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  started?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  status: FieldWrapper<IWorkStatus>;
  success?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  timeout?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  type: FieldWrapper<IWorkType>;
  updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  worker?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IWorkOutput = {
  __typename?: 'WorkOutput';
  error?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  result?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  success: FieldWrapper<Scalars['Boolean']['output']>;
};

export enum IWorkStatus {
  Allocated = 'ALLOCATED',
  Deleted = 'DELETED',
  Failed = 'FAILED',
  New = 'NEW',
  Success = 'SUCCESS',
}

export enum IWorkType {
  BulkImport = 'BULK_IMPORT',
  Email = 'EMAIL',
  EnrollmentOrderGenerator = 'ENROLLMENT_ORDER_GENERATOR',
  ErrorNotifications = 'ERROR_NOTIFICATIONS',
  ExportToken = 'EXPORT_TOKEN',
  External = 'EXTERNAL',
  Heartbeat = 'HEARTBEAT',
  HttpRequest = 'HTTP_REQUEST',
  Message = 'MESSAGE',
  Push = 'PUSH',
  RefreshTokens = 'REFRESH_TOKENS',
  Sms = 'SMS',
  Unknown = 'UNKNOWN',
  UpdateCoinbaseRates = 'UPDATE_COINBASE_RATES',
  UpdateEcbRates = 'UPDATE_ECB_RATES',
  UpdateTokenOwnership = 'UPDATE_TOKEN_OWNERSHIP',
  ZombieKiller = 'ZOMBIE_KILLER',
}

/** One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string. */
export type I__EnumValue = {
  __typename?: '__EnumValue';
  name: FieldWrapper<Scalars['String']['output']>;
  description?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  isDeprecated: FieldWrapper<Scalars['Boolean']['output']>;
  deprecationReason?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type I__Field = {
  __typename?: '__Field';
  name: FieldWrapper<Scalars['String']['output']>;
  description?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  args: Array<FieldWrapper<I__InputValue>>;
  type: FieldWrapper<I__Type>;
  isDeprecated: FieldWrapper<Scalars['Boolean']['output']>;
  deprecationReason?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type I__FieldArgsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value. */
export type I__InputValue = {
  __typename?: '__InputValue';
  name: FieldWrapper<Scalars['String']['output']>;
  description?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  type: FieldWrapper<I__Type>;
  /** A GraphQL-formatted string representing the default value for this input value. */
  defaultValue?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  isDeprecated: FieldWrapper<Scalars['Boolean']['output']>;
  deprecationReason?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type I__Type = {
  __typename?: '__Type';
  kind: FieldWrapper<I__TypeKind>;
  name?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  description?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  specifiedByURL?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  fields?: Maybe<Array<FieldWrapper<I__Field>>>;
  interfaces?: Maybe<Array<FieldWrapper<I__Type>>>;
  possibleTypes?: Maybe<Array<FieldWrapper<I__Type>>>;
  enumValues?: Maybe<Array<FieldWrapper<I__EnumValue>>>;
  inputFields?: Maybe<Array<FieldWrapper<I__InputValue>>>;
  ofType?: Maybe<FieldWrapper<I__Type>>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type I__TypeFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type I__TypeEnumValuesArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type I__TypeInputFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An enum describing what kind of type a given `__Type` is. */
export enum I__TypeKind {
  /** Indicates this type is a scalar. */
  Scalar = 'SCALAR',
  /** Indicates this type is an object. `fields` and `interfaces` are valid fields. */
  Object = 'OBJECT',
  /** Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields. */
  Interface = 'INTERFACE',
  /** Indicates this type is a union. `possibleTypes` is a valid field. */
  Union = 'UNION',
  /** Indicates this type is an enum. `enumValues` is a valid field. */
  Enum = 'ENUM',
  /** Indicates this type is an input object. `inputFields` is a valid field. */
  InputObject = 'INPUT_OBJECT',
  /** Indicates this type is a list. `ofType` is a valid field. */
  List = 'LIST',
  /** Indicates this type is a non-null. `ofType` is a valid field. */
  NonNull = 'NON_NULL',
}

export type IMd5MetaDataFragmentFragment = {
  __typename?: 'WebAuthnMDSv3Metadata';
  legalHeader?: string | null;
  description?: string | null;
  authenticatorVersion?: number | null;
  protocolFamily?: string | null;
  schema?: number | null;
  authenticationAlgorithms?: Array<string> | null;
  publicKeyAlgAndEncodings?: Array<string> | null;
  attestationTypes?: Array<string> | null;
  keyProtection?: Array<string> | null;
  upv?: Array<any> | null;
  tcDisplay?: Array<any> | null;
  icon?: string | null;
  authenticatorGetInfo?: any | null;
};

export type IUserFragmentFragment = {
  __typename?: 'User';
  _id: string;
  isTwoFactorEnabled: boolean;
  allowedActions: Array<IRoleAction>;
  username?: string | null;
  isGuest: boolean;
  isInitialPassword: boolean;
  name: string;
  roles?: Array<string> | null;
  tags?: Array<any> | null;
  lastBillingAddress?: {
    __typename?: 'Address';
    firstName?: string | null;
    lastName?: string | null;
    company?: string | null;
    addressLine?: string | null;
    addressLine2?: string | null;
    postalCode?: string | null;
    countryCode?: string | null;
    regionCode?: string | null;
    city?: string | null;
  } | null;
  lastContact?: {
    __typename?: 'Contact';
    emailAddress?: string | null;
    telNumber?: string | null;
  } | null;
  lastLogin?: {
    __typename?: 'UserLoginTracker';
    countryCode?: string | null;
    locale?: string | null;
    remoteAddress?: string | null;
    remotePort?: string | null;
    timestamp: any;
    userAgent?: string | null;
  } | null;
  avatar?: {
    __typename?: 'Media';
    _id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  } | null;
  paymentCredentials: Array<{
    __typename?: 'PaymentCredentials';
    _id: string;
    isValid: boolean;
    isPreferred: boolean;
    paymentProvider: {
      __typename?: 'PaymentProvider';
      _id: string;
      type?: IPaymentProviderType | null;
      interface?: {
        __typename?: 'PaymentInterface';
        _id: string;
        label?: string | null;
        version?: string | null;
      } | null;
    };
  }>;
  emails?: Array<{
    __typename?: 'UserEmail';
    verified: boolean;
    address: string;
  }> | null;
  web3Addresses: Array<{
    __typename?: 'Web3Address';
    address: string;
    nonce?: number | null;
    verified: boolean;
  }>;
  webAuthnCredentials: Array<{
    __typename?: 'WebAuthnCredentials';
    _id: string;
    created: any;
    aaguid: string;
    counter: number;
    mdsMetadata?: {
      __typename?: 'WebAuthnMDSv3Metadata';
      legalHeader?: string | null;
      description?: string | null;
      authenticatorVersion?: number | null;
      protocolFamily?: string | null;
      schema?: number | null;
      authenticationAlgorithms?: Array<string> | null;
      publicKeyAlgAndEncodings?: Array<string> | null;
      attestationTypes?: Array<string> | null;
      keyProtection?: Array<string> | null;
      upv?: Array<any> | null;
      tcDisplay?: Array<any> | null;
      icon?: string | null;
      authenticatorGetInfo?: any | null;
    } | null;
  }>;
  profile?: {
    __typename?: 'UserProfile';
    displayName?: string | null;
    phoneMobile?: string | null;
    gender?: string | null;
    birthday?: any | null;
    address?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
  } | null;
  primaryEmail?: {
    __typename?: 'UserEmail';
    verified: boolean;
    address: string;
  } | null;
};

export type ILogoutMutationVariables = Exact<{
  token?: InputMaybe<Scalars['String']['input']>;
}>;

export type ILogoutMutation = {
  __typename?: 'Mutation';
  logout?: { __typename?: 'SuccessResponse'; success?: boolean | null } | null;
};

export type IAddEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IAddEmailMutation = {
  __typename?: 'Mutation';
  addEmail: {
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  };
};

export type IAddWeb3AddressMutationVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type IAddWeb3AddressMutation = {
  __typename?: 'Mutation';
  addWeb3Address: {
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  };
};

export type IAddWebAuthnCredentialsMutationVariables = Exact<{
  credentials: Scalars['JSON']['input'];
}>;

export type IAddWebAuthnCredentialsMutation = {
  __typename?: 'Mutation';
  addWebAuthnCredentials: {
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  };
};

export type IBuildSecretTotpAuthUrlMutationVariables = Exact<{
  [key: string]: never;
}>;

export type IBuildSecretTotpAuthUrlMutation = {
  __typename?: 'Mutation';
  buildSecretTOTPAuthURL: string;
};

export type IChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;

export type IChangePasswordMutation = {
  __typename?: 'Mutation';
  changePassword?: {
    __typename?: 'SuccessResponse';
    success?: boolean | null;
  } | null;
};

export type ICreateUserMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  plainPassword?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<IUserProfileInput>;
  webAuthnPublicKeyCredentials?: InputMaybe<Scalars['JSON']['input']>;
}>;

export type ICreateUserMutation = {
  __typename?: 'Mutation';
  createUser?: {
    __typename?: 'LoginMethodResponse';
    id: string;
    token: string;
    tokenExpires: any;
  } | null;
};

export type ICreateUserWithWebAuthMutationMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  webAuthnPublicKeyCredentials?: InputMaybe<Scalars['JSON']['input']>;
}>;

export type ICreateUserWithWebAuthMutationMutation = {
  __typename?: 'Mutation';
  createUser?: {
    __typename?: 'LoginMethodResponse';
    id: string;
    token: string;
    tokenExpires: any;
  } | null;
};

export type ICreateWebAuthnCredentialCreationOptionsMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;

export type ICreateWebAuthnCredentialCreationOptionsMutation = {
  __typename?: 'Mutation';
  createWebAuthnCredentialCreationOptions: any;
};

export type ICreateWebAuthnCredentialRequestOptionsMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;

export type ICreateWebAuthnCredentialRequestOptionsMutation = {
  __typename?: 'Mutation';
  createWebAuthnCredentialRequestOptions: any;
};

export type ICurrentUserRoleQueryVariables = Exact<{ [key: string]: never }>;

export type ICurrentUserRoleQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    _id: string;
    allowedActions: Array<IRoleAction>;
  } | null;
};

export type ICurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type ICurrentUserQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  } | null;
  impersonator?: { __typename?: 'User'; _id: string } | null;
};

export type IDisableTotpMutationVariables = Exact<{
  code: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IDisableTotpMutation = {
  __typename?: 'Mutation';
  disableTOTP: {
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  };
};

export type IEnableTotpMutationVariables = Exact<{
  secretBase32: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;

export type IEnableTotpMutation = {
  __typename?: 'Mutation';
  enableTOTP: {
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  };
};

export type IEnrollUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  plainPassword?: InputMaybe<Scalars['String']['input']>;
  profile: IUserProfileInput;
}>;

export type IEnrollUserMutation = {
  __typename?: 'Mutation';
  enrollUser: {
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  };
};

export type IForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type IForgotPasswordMutation = {
  __typename?: 'Mutation';
  forgotPassword?: {
    __typename?: 'SuccessResponse';
    success?: boolean | null;
  } | null;
};

export type IImpersonateMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;

export type IImpersonateMutation = {
  __typename?: 'Mutation';
  impersonate: {
    __typename?: 'LoginMethodResponse';
    id: string;
    tokenExpires: any;
    token: string;
    user?: { __typename?: 'User'; _id: string } | null;
  };
};

export type ILogInWithOAuthMutationVariables = Exact<{
  authorizationCode: Scalars['String']['input'];
  provider: Scalars['String']['input'];
  redirectUrl: Scalars['String']['input'];
}>;

export type ILogInWithOAuthMutation = {
  __typename?: 'Mutation';
  loginWithOAuth?: {
    __typename?: 'LoginMethodResponse';
    id: string;
    token: string;
    tokenExpires: any;
  } | null;
};

export type ILoginWithPasswordMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  plainPassword?: InputMaybe<Scalars['String']['input']>;
  totpCode?: InputMaybe<Scalars['String']['input']>;
}>;

export type ILoginWithPasswordMutation = {
  __typename?: 'Mutation';
  loginWithPassword?: {
    __typename?: 'LoginMethodResponse';
    id: string;
    token: string;
    tokenExpires: any;
    user?: {
      __typename?: 'User';
      _id: string;
      allowedActions: Array<IRoleAction>;
      roles?: Array<string> | null;
      isTwoFactorEnabled: boolean;
    } | null;
  } | null;
};

export type ILoginWithWebAuthnMutationVariables = Exact<{
  webAuthnPublicKeyCredentials: Scalars['JSON']['input'];
}>;

export type ILoginWithWebAuthnMutation = {
  __typename?: 'Mutation';
  loginWithWebAuthn?: {
    __typename?: 'LoginMethodResponse';
    id: string;
    token: string;
    tokenExpires: any;
  } | null;
};

export type IRemoveEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IRemoveEmailMutation = {
  __typename?: 'Mutation';
  removeEmail: {
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  };
};

export type IRemoveWeb3AddressMutationVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type IRemoveWeb3AddressMutation = {
  __typename?: 'Mutation';
  removeWeb3Address: {
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  };
};

export type IRemoveWebAuthCredentialsMutationVariables = Exact<{
  credentialsId: Scalars['ID']['input'];
}>;

export type IRemoveWebAuthCredentialsMutation = {
  __typename?: 'Mutation';
  removeWebAuthnCredentials: {
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  };
};

export type IResetPasswordMutationVariables = Exact<{
  newPlainPassword?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
}>;

export type IResetPasswordMutation = {
  __typename?: 'Mutation';
  resetPassword?: {
    __typename?: 'LoginMethodResponse';
    id: string;
    token: string;
    tokenExpires: any;
  } | null;
};

export type ISendVerificationEmailMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
}>;

export type ISendVerificationEmailMutation = {
  __typename?: 'Mutation';
  sendVerificationEmail?: {
    __typename?: 'SuccessResponse';
    success?: boolean | null;
  } | null;
};

export type ISetPasswordMutationVariables = Exact<{
  newPlainPassword?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
}>;

export type ISetPasswordMutation = {
  __typename?: 'Mutation';
  setPassword: {
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  };
};

export type ISetRolesMutationVariables = Exact<{
  roles: Array<Scalars['String']['input']> | Scalars['String']['input'];
  userId: Scalars['ID']['input'];
}>;

export type ISetRolesMutation = {
  __typename?: 'Mutation';
  setRoles: {
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  };
};

export type ISetUserTagsMutationVariables = Exact<{
  tags:
    | Array<InputMaybe<Scalars['LowerCaseString']['input']>>
    | InputMaybe<Scalars['LowerCaseString']['input']>;
  userId: Scalars['ID']['input'];
}>;

export type ISetUserTagsMutation = {
  __typename?: 'Mutation';
  setUserTags: { __typename?: 'User'; _id: string; tags?: Array<any> | null };
};

export type ISetUsernameMutationVariables = Exact<{
  username: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
}>;

export type ISetUsernameMutation = {
  __typename?: 'Mutation';
  setUsername: {
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  };
};

export type IStopImpersonateMutationVariables = Exact<{ [key: string]: never }>;

export type IStopImpersonateMutation = {
  __typename?: 'Mutation';
  stopImpersonation: {
    __typename?: 'LoginMethodResponse';
    id: string;
    token: string;
    tokenExpires: any;
  };
};

export type IUserQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IUserQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  } | null;
};

export type IUserWebAuthnCredentialsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;

export type IUserWebAuthnCredentialsQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    _id: string;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
  } | null;
};

export type IUsersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  includeGuests?: InputMaybe<Scalars['Boolean']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
}>;

export type IUsersQuery = {
  __typename?: 'Query';
  usersCount: number;
  users: Array<{
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  }>;
};

export type IVerifyEmailMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;

export type IVerifyEmailMutation = {
  __typename?: 'Mutation';
  verifyEmail?: {
    __typename?: 'LoginMethodResponse';
    id: string;
    token: string;
    tokenExpires: any;
    user?: {
      __typename?: 'User';
      _id: string;
      isTwoFactorEnabled: boolean;
      allowedActions: Array<IRoleAction>;
      username?: string | null;
      isGuest: boolean;
      isInitialPassword: boolean;
      name: string;
      roles?: Array<string> | null;
      tags?: Array<any> | null;
      lastBillingAddress?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
      lastContact?: {
        __typename?: 'Contact';
        emailAddress?: string | null;
        telNumber?: string | null;
      } | null;
      lastLogin?: {
        __typename?: 'UserLoginTracker';
        countryCode?: string | null;
        locale?: string | null;
        remoteAddress?: string | null;
        remotePort?: string | null;
        timestamp: any;
        userAgent?: string | null;
      } | null;
      avatar?: {
        __typename?: 'Media';
        _id: string;
        name: string;
        size: number;
        type: string;
        url: string;
      } | null;
      paymentCredentials: Array<{
        __typename?: 'PaymentCredentials';
        _id: string;
        isValid: boolean;
        isPreferred: boolean;
        paymentProvider: {
          __typename?: 'PaymentProvider';
          _id: string;
          type?: IPaymentProviderType | null;
          interface?: {
            __typename?: 'PaymentInterface';
            _id: string;
            label?: string | null;
            version?: string | null;
          } | null;
        };
      }>;
      emails?: Array<{
        __typename?: 'UserEmail';
        verified: boolean;
        address: string;
      }> | null;
      web3Addresses: Array<{
        __typename?: 'Web3Address';
        address: string;
        nonce?: number | null;
        verified: boolean;
      }>;
      webAuthnCredentials: Array<{
        __typename?: 'WebAuthnCredentials';
        _id: string;
        created: any;
        aaguid: string;
        counter: number;
        mdsMetadata?: {
          __typename?: 'WebAuthnMDSv3Metadata';
          legalHeader?: string | null;
          description?: string | null;
          authenticatorVersion?: number | null;
          protocolFamily?: string | null;
          schema?: number | null;
          authenticationAlgorithms?: Array<string> | null;
          publicKeyAlgAndEncodings?: Array<string> | null;
          attestationTypes?: Array<string> | null;
          keyProtection?: Array<string> | null;
          upv?: Array<any> | null;
          tcDisplay?: Array<any> | null;
          icon?: string | null;
          authenticatorGetInfo?: any | null;
        } | null;
      }>;
      profile?: {
        __typename?: 'UserProfile';
        displayName?: string | null;
        phoneMobile?: string | null;
        gender?: string | null;
        birthday?: any | null;
        address?: {
          __typename?: 'Address';
          firstName?: string | null;
          lastName?: string | null;
          company?: string | null;
          addressLine?: string | null;
          addressLine2?: string | null;
          postalCode?: string | null;
          countryCode?: string | null;
          regionCode?: string | null;
          city?: string | null;
        } | null;
      } | null;
      primaryEmail?: {
        __typename?: 'UserEmail';
        verified: boolean;
        address: string;
      } | null;
    } | null;
  } | null;
};

export type IVerifyWeb3AddressMutationVariables = Exact<{
  address: Scalars['String']['input'];
  hash: Scalars['String']['input'];
}>;

export type IVerifyWeb3AddressMutation = {
  __typename?: 'Mutation';
  verifyWeb3Address: {
    __typename?: 'User';
    _id: string;
    isTwoFactorEnabled: boolean;
    allowedActions: Array<IRoleAction>;
    username?: string | null;
    isGuest: boolean;
    isInitialPassword: boolean;
    name: string;
    roles?: Array<string> | null;
    tags?: Array<any> | null;
    lastBillingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    lastContact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    lastLogin?: {
      __typename?: 'UserLoginTracker';
      countryCode?: string | null;
      locale?: string | null;
      remoteAddress?: string | null;
      remotePort?: string | null;
      timestamp: any;
      userAgent?: string | null;
    } | null;
    avatar?: {
      __typename?: 'Media';
      _id: string;
      name: string;
      size: number;
      type: string;
      url: string;
    } | null;
    paymentCredentials: Array<{
      __typename?: 'PaymentCredentials';
      _id: string;
      isValid: boolean;
      isPreferred: boolean;
      paymentProvider: {
        __typename?: 'PaymentProvider';
        _id: string;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      };
    }>;
    emails?: Array<{
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    }> | null;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    webAuthnCredentials: Array<{
      __typename?: 'WebAuthnCredentials';
      _id: string;
      created: any;
      aaguid: string;
      counter: number;
      mdsMetadata?: {
        __typename?: 'WebAuthnMDSv3Metadata';
        legalHeader?: string | null;
        description?: string | null;
        authenticatorVersion?: number | null;
        protocolFamily?: string | null;
        schema?: number | null;
        authenticationAlgorithms?: Array<string> | null;
        publicKeyAlgAndEncodings?: Array<string> | null;
        attestationTypes?: Array<string> | null;
        keyProtection?: Array<string> | null;
        upv?: Array<any> | null;
        tcDisplay?: Array<any> | null;
        icon?: string | null;
        authenticatorGetInfo?: any | null;
      } | null;
    }>;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      phoneMobile?: string | null;
      gender?: string | null;
      birthday?: any | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine?: string | null;
        addressLine2?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        regionCode?: string | null;
        city?: string | null;
      } | null;
    } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  };
};

export type IAssortmentChildrenFragmentFragment = {
  __typename?: 'Assortment';
  _id: string;
  childrenCount: number;
  texts?: {
    __typename?: 'AssortmentTexts';
    _id: string;
    slug?: string | null;
    title?: string | null;
    subtitle?: string | null;
  } | null;
};

export type IAssortmentFragmentFragment = {
  __typename?: 'Assortment';
  _id: string;
  isActive?: boolean | null;
  created?: any | null;
  updated?: any | null;
  sequence: number;
  isBase?: boolean | null;
  isRoot?: boolean | null;
  tags?: Array<any> | null;
  childrenCount: number;
  texts?: {
    __typename?: 'AssortmentTexts';
    _id: string;
    slug?: string | null;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
  } | null;
  media: Array<{
    __typename?: 'AssortmentMedia';
    _id: string;
    tags?: Array<any> | null;
    file: { __typename?: 'Media'; _id: string; url: string };
  }>;
};

export type IAssortmentLinkFragmentFragment = {
  __typename?: 'AssortmentLink';
  _id: string;
  sortKey: number;
  parent: {
    __typename?: 'Assortment';
    _id: string;
    isActive?: boolean | null;
    created?: any | null;
    updated?: any | null;
    sequence: number;
    isBase?: boolean | null;
    isRoot?: boolean | null;
    tags?: Array<any> | null;
    childrenCount: number;
    texts?: {
      __typename?: 'AssortmentTexts';
      _id: string;
      slug?: string | null;
      title?: string | null;
      subtitle?: string | null;
      description?: string | null;
    } | null;
    media: Array<{
      __typename?: 'AssortmentMedia';
      _id: string;
      tags?: Array<any> | null;
      file: { __typename?: 'Media'; _id: string; url: string };
    }>;
  };
  child: {
    __typename?: 'Assortment';
    _id: string;
    isActive?: boolean | null;
    created?: any | null;
    updated?: any | null;
    sequence: number;
    isBase?: boolean | null;
    isRoot?: boolean | null;
    tags?: Array<any> | null;
    childrenCount: number;
    texts?: {
      __typename?: 'AssortmentTexts';
      _id: string;
      slug?: string | null;
      title?: string | null;
      subtitle?: string | null;
      description?: string | null;
    } | null;
    media: Array<{
      __typename?: 'AssortmentMedia';
      _id: string;
      tags?: Array<any> | null;
      file: { __typename?: 'Media'; _id: string; url: string };
    }>;
  };
};

export type IAssortmentMediaFragmentFragment = {
  __typename?: 'AssortmentMedia';
  _id: string;
  tags?: Array<any> | null;
  file: { __typename?: 'Media'; _id: string; url: string };
  texts?: {
    __typename?: 'AssortmentMediaTexts';
    _id: string;
    locale?: string | null;
    title?: string | null;
    subtitle?: string | null;
  } | null;
};

export type IAssortmentMediaTextsFragmentFragment = {
  __typename?: 'AssortmentMediaTexts';
  _id: string;
  locale?: string | null;
  title?: string | null;
  subtitle?: string | null;
};

export type IAssortmentTextsFragmentFragment = {
  __typename?: 'AssortmentTexts';
  _id: string;
  locale?: string | null;
  slug?: string | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
};

export type IAddAssortmentFilterMutationVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
  filterId: Scalars['ID']['input'];
  tags?: InputMaybe<
    | Array<Scalars['LowerCaseString']['input']>
    | Scalars['LowerCaseString']['input']
  >;
}>;

export type IAddAssortmentFilterMutation = {
  __typename?: 'Mutation';
  addAssortmentFilter: { __typename?: 'AssortmentFilter'; _id: string };
};

export type IAddAssortmentLinkMutationVariables = Exact<{
  parentAssortmentId: Scalars['ID']['input'];
  childAssortmentId: Scalars['ID']['input'];
  tags?: InputMaybe<
    | Array<Scalars['LowerCaseString']['input']>
    | Scalars['LowerCaseString']['input']
  >;
}>;

export type IAddAssortmentLinkMutation = {
  __typename?: 'Mutation';
  addAssortmentLink: {
    __typename?: 'AssortmentLink';
    _id: string;
    sortKey: number;
    parent: {
      __typename?: 'Assortment';
      _id: string;
      isActive?: boolean | null;
      created?: any | null;
      updated?: any | null;
      sequence: number;
      isBase?: boolean | null;
      isRoot?: boolean | null;
      tags?: Array<any> | null;
      childrenCount: number;
      texts?: {
        __typename?: 'AssortmentTexts';
        _id: string;
        slug?: string | null;
        title?: string | null;
        subtitle?: string | null;
        description?: string | null;
      } | null;
      media: Array<{
        __typename?: 'AssortmentMedia';
        _id: string;
        tags?: Array<any> | null;
        file: { __typename?: 'Media'; _id: string; url: string };
      }>;
    };
    child: {
      __typename?: 'Assortment';
      _id: string;
      isActive?: boolean | null;
      created?: any | null;
      updated?: any | null;
      sequence: number;
      isBase?: boolean | null;
      isRoot?: boolean | null;
      tags?: Array<any> | null;
      childrenCount: number;
      texts?: {
        __typename?: 'AssortmentTexts';
        _id: string;
        slug?: string | null;
        title?: string | null;
        subtitle?: string | null;
        description?: string | null;
      } | null;
      media: Array<{
        __typename?: 'AssortmentMedia';
        _id: string;
        tags?: Array<any> | null;
        file: { __typename?: 'Media'; _id: string; url: string };
      }>;
    };
  };
};

export type IAddAssortmentMediaMutationVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
  media: Scalars['Upload']['input'];
}>;

export type IAddAssortmentMediaMutation = {
  __typename?: 'Mutation';
  addAssortmentMedia: {
    __typename?: 'AssortmentMedia';
    _id: string;
    tags?: Array<any> | null;
    file: { __typename?: 'Media'; _id: string; url: string };
    texts?: {
      __typename?: 'AssortmentMediaTexts';
      _id: string;
      locale?: string | null;
      title?: string | null;
      subtitle?: string | null;
    } | null;
  };
};

export type IAddAssortmentProductMutationVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  tags?: InputMaybe<
    | Array<Scalars['LowerCaseString']['input']>
    | Scalars['LowerCaseString']['input']
  >;
}>;

export type IAddAssortmentProductMutation = {
  __typename?: 'Mutation';
  addAssortmentProduct: { __typename?: 'AssortmentProduct'; _id: string };
};

export type IAssortmentQueryVariables = Exact<{
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IAssortmentQuery = {
  __typename?: 'Query';
  assortment?: {
    __typename?: 'Assortment';
    _id: string;
    isActive?: boolean | null;
    created?: any | null;
    updated?: any | null;
    sequence: number;
    isBase?: boolean | null;
    isRoot?: boolean | null;
    tags?: Array<any> | null;
    childrenCount: number;
    texts?: {
      __typename?: 'AssortmentTexts';
      _id: string;
      slug?: string | null;
      title?: string | null;
      subtitle?: string | null;
      description?: string | null;
    } | null;
    media: Array<{
      __typename?: 'AssortmentMedia';
      _id: string;
      tags?: Array<any> | null;
      file: { __typename?: 'Media'; _id: string; url: string };
    }>;
  } | null;
};

export type IAssortmentChildrenQueryVariables = Exact<{
  slugs?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  includeLeaves?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type IAssortmentChildrenQuery = {
  __typename?: 'Query';
  assortments: Array<{
    __typename?: 'Assortment';
    _id: string;
    childrenCount: number;
    children?: Array<{
      __typename?: 'Assortment';
      _id: string;
      childrenCount: number;
      texts?: {
        __typename?: 'AssortmentTexts';
        _id: string;
        slug?: string | null;
        title?: string | null;
        subtitle?: string | null;
      } | null;
    }> | null;
    texts?: {
      __typename?: 'AssortmentTexts';
      _id: string;
      slug?: string | null;
      title?: string | null;
      subtitle?: string | null;
    } | null;
  }>;
};

export type IAssortmentFiltersQueryVariables = Exact<{
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IAssortmentFiltersQuery = {
  __typename?: 'Query';
  assortment?: {
    __typename?: 'Assortment';
    _id: string;
    filterAssignments?: Array<{
      __typename?: 'AssortmentFilter';
      _id: string;
      sortKey: number;
      tags?: Array<any> | null;
      filter: {
        __typename?: 'Filter';
        _id: string;
        updated?: any | null;
        created?: any | null;
        key?: string | null;
        isActive?: boolean | null;
        type?: IFilterType | null;
        options?: Array<{
          __typename?: 'FilterOption';
          _id: string;
          value?: string | null;
          texts?: {
            __typename?: 'FilterTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
            locale?: string | null;
          } | null;
        }> | null;
      };
    }> | null;
  } | null;
};

export type IAssortmentLinksQueryVariables = Exact<{
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IAssortmentLinksQuery = {
  __typename?: 'Query';
  assortment?: {
    __typename?: 'Assortment';
    _id: string;
    linkedAssortments?: Array<{
      __typename?: 'AssortmentLink';
      _id: string;
      sortKey: number;
      parent: {
        __typename?: 'Assortment';
        _id: string;
        isActive?: boolean | null;
        created?: any | null;
        updated?: any | null;
        sequence: number;
        isBase?: boolean | null;
        isRoot?: boolean | null;
        tags?: Array<any> | null;
        childrenCount: number;
        texts?: {
          __typename?: 'AssortmentTexts';
          _id: string;
          slug?: string | null;
          title?: string | null;
          subtitle?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'AssortmentMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      };
      child: {
        __typename?: 'Assortment';
        _id: string;
        isActive?: boolean | null;
        created?: any | null;
        updated?: any | null;
        sequence: number;
        isBase?: boolean | null;
        isRoot?: boolean | null;
        tags?: Array<any> | null;
        childrenCount: number;
        texts?: {
          __typename?: 'AssortmentTexts';
          _id: string;
          slug?: string | null;
          title?: string | null;
          subtitle?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'AssortmentMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      };
    }> | null;
  } | null;
};

export type IAssortmentMediaQueryVariables = Exact<{
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IAssortmentMediaQuery = {
  __typename?: 'Query';
  assortment?: {
    __typename?: 'Assortment';
    _id: string;
    media: Array<{
      __typename?: 'AssortmentMedia';
      _id: string;
      tags?: Array<any> | null;
      sortKey: number;
      texts?: {
        __typename?: 'AssortmentMediaTexts';
        _id: string;
        locale?: string | null;
        title?: string | null;
        subtitle?: string | null;
      } | null;
      file: {
        __typename?: 'Media';
        _id: string;
        url: string;
        name: string;
        size: number;
        type: string;
      };
    }>;
  } | null;
};

export type IAssortmentPathsQueryVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
}>;

export type IAssortmentPathsQuery = {
  __typename?: 'Query';
  assortment?: {
    __typename?: 'Assortment';
    assortmentPaths: Array<{
      __typename?: 'AssortmentPath';
      links: Array<{ __typename?: 'AssortmentPathLink'; assortmentId: string }>;
    }>;
  } | null;
};

export type IAssortmentProductsQueryVariables = Exact<{
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IAssortmentProductsQuery = {
  __typename?: 'Query';
  assortment?: {
    __typename?: 'Assortment';
    _id: string;
    productAssignments?: Array<{
      __typename?: 'AssortmentProduct';
      _id: string;
      sortKey: number;
      tags?: Array<any> | null;
      product:
        | {
            __typename?: 'BundleProduct';
            _id: string;
            sequence: number;
            status: IProductStatus;
            tags?: Array<any> | null;
            updated?: any | null;
            published?: any | null;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              slug?: string | null;
              title?: string | null;
              subtitle?: string | null;
              description?: string | null;
              vendor?: string | null;
              brand?: string | null;
              labels?: Array<string> | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              tags?: Array<any> | null;
              file: { __typename?: 'Media'; _id: string; url: string };
            }>;
          }
        | {
            __typename?: 'ConfigurableProduct';
            _id: string;
            sequence: number;
            status: IProductStatus;
            tags?: Array<any> | null;
            updated?: any | null;
            published?: any | null;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              slug?: string | null;
              title?: string | null;
              subtitle?: string | null;
              description?: string | null;
              vendor?: string | null;
              brand?: string | null;
              labels?: Array<string> | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              tags?: Array<any> | null;
              file: { __typename?: 'Media'; _id: string; url: string };
            }>;
          }
        | {
            __typename?: 'PlanProduct';
            _id: string;
            sequence: number;
            status: IProductStatus;
            tags?: Array<any> | null;
            updated?: any | null;
            published?: any | null;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              slug?: string | null;
              title?: string | null;
              subtitle?: string | null;
              description?: string | null;
              vendor?: string | null;
              brand?: string | null;
              labels?: Array<string> | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              tags?: Array<any> | null;
              file: { __typename?: 'Media'; _id: string; url: string };
            }>;
          }
        | {
            __typename?: 'SimpleProduct';
            _id: string;
            sequence: number;
            status: IProductStatus;
            tags?: Array<any> | null;
            updated?: any | null;
            published?: any | null;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              slug?: string | null;
              title?: string | null;
              subtitle?: string | null;
              description?: string | null;
              vendor?: string | null;
              brand?: string | null;
              labels?: Array<string> | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              tags?: Array<any> | null;
              file: { __typename?: 'Media'; _id: string; url: string };
            }>;
          }
        | {
            __typename?: 'TokenizedProduct';
            _id: string;
            sequence: number;
            status: IProductStatus;
            tags?: Array<any> | null;
            updated?: any | null;
            published?: any | null;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              slug?: string | null;
              title?: string | null;
              subtitle?: string | null;
              description?: string | null;
              vendor?: string | null;
              brand?: string | null;
              labels?: Array<string> | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              tags?: Array<any> | null;
              file: { __typename?: 'Media'; _id: string; url: string };
            }>;
          };
    }> | null;
  } | null;
};

export type IAssortmentsQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<
    | Array<Scalars['LowerCaseString']['input']>
    | Scalars['LowerCaseString']['input']
  >;
  slugs?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  includeLeaves?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
}>;

export type IAssortmentsQuery = {
  __typename?: 'Query';
  assortmentsCount: number;
  assortments: Array<{
    __typename?: 'Assortment';
    _id: string;
    isActive?: boolean | null;
    created?: any | null;
    updated?: any | null;
    sequence: number;
    isBase?: boolean | null;
    isRoot?: boolean | null;
    tags?: Array<any> | null;
    childrenCount: number;
    linkedAssortments?: Array<{
      __typename?: 'AssortmentLink';
      child: { __typename?: 'Assortment'; _id: string };
    }> | null;
    texts?: {
      __typename?: 'AssortmentTexts';
      _id: string;
      slug?: string | null;
      title?: string | null;
      subtitle?: string | null;
      description?: string | null;
    } | null;
    media: Array<{
      __typename?: 'AssortmentMedia';
      _id: string;
      tags?: Array<any> | null;
      file: { __typename?: 'Media'; _id: string; url: string };
    }>;
  }>;
};

export type IAssortmentsCountQueryVariables = Exact<{ [key: string]: never }>;

export type IAssortmentsCountQuery = {
  __typename?: 'Query';
  assortmentsCount: number;
};

export type ICreateAssortmentMutationVariables = Exact<{
  assortment: ICreateAssortmentInput;
}>;

export type ICreateAssortmentMutation = {
  __typename?: 'Mutation';
  createAssortment: {
    __typename?: 'Assortment';
    _id: string;
    isActive?: boolean | null;
    created?: any | null;
    updated?: any | null;
    sequence: number;
    isBase?: boolean | null;
    isRoot?: boolean | null;
    tags?: Array<any> | null;
    childrenCount: number;
    texts?: {
      __typename?: 'AssortmentTexts';
      _id: string;
      slug?: string | null;
      title?: string | null;
      subtitle?: string | null;
      description?: string | null;
    } | null;
    media: Array<{
      __typename?: 'AssortmentMedia';
      _id: string;
      tags?: Array<any> | null;
      file: { __typename?: 'Media'; _id: string; url: string };
    }>;
  };
};

export type IRemoveAssortmentMutationVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
}>;

export type IRemoveAssortmentMutation = {
  __typename?: 'Mutation';
  removeAssortment: { __typename?: 'Assortment'; _id: string };
};

export type IRemoveAssortmentFilterMutationVariables = Exact<{
  assortmentFilterId: Scalars['ID']['input'];
}>;

export type IRemoveAssortmentFilterMutation = {
  __typename?: 'Mutation';
  removeAssortmentFilter: { __typename?: 'AssortmentFilter'; _id: string };
};

export type IRemoveAssortmentLinkMutationVariables = Exact<{
  assortmentLinkId: Scalars['ID']['input'];
}>;

export type IRemoveAssortmentLinkMutation = {
  __typename?: 'Mutation';
  removeAssortmentLink: {
    __typename?: 'AssortmentLink';
    _id: string;
    sortKey: number;
    parent: {
      __typename?: 'Assortment';
      _id: string;
      isActive?: boolean | null;
      created?: any | null;
      updated?: any | null;
      sequence: number;
      isBase?: boolean | null;
      isRoot?: boolean | null;
      tags?: Array<any> | null;
      childrenCount: number;
      texts?: {
        __typename?: 'AssortmentTexts';
        _id: string;
        slug?: string | null;
        title?: string | null;
        subtitle?: string | null;
        description?: string | null;
      } | null;
      media: Array<{
        __typename?: 'AssortmentMedia';
        _id: string;
        tags?: Array<any> | null;
        file: { __typename?: 'Media'; _id: string; url: string };
      }>;
    };
    child: {
      __typename?: 'Assortment';
      _id: string;
      isActive?: boolean | null;
      created?: any | null;
      updated?: any | null;
      sequence: number;
      isBase?: boolean | null;
      isRoot?: boolean | null;
      tags?: Array<any> | null;
      childrenCount: number;
      texts?: {
        __typename?: 'AssortmentTexts';
        _id: string;
        slug?: string | null;
        title?: string | null;
        subtitle?: string | null;
        description?: string | null;
      } | null;
      media: Array<{
        __typename?: 'AssortmentMedia';
        _id: string;
        tags?: Array<any> | null;
        file: { __typename?: 'Media'; _id: string; url: string };
      }>;
    };
  };
};

export type IRemoveAssortmentMediaMutationVariables = Exact<{
  assortmentMediaId: Scalars['ID']['input'];
}>;

export type IRemoveAssortmentMediaMutation = {
  __typename?: 'Mutation';
  removeAssortmentMedia: { __typename?: 'AssortmentMedia'; _id: string };
};

export type IRemoveAssortmentProductMutationVariables = Exact<{
  assortmentProductId: Scalars['ID']['input'];
}>;

export type IRemoveAssortmentProductMutation = {
  __typename?: 'Mutation';
  removeAssortmentProduct: { __typename?: 'AssortmentProduct'; _id: string };
};

export type IReorderAssortmentFiltersMutationVariables = Exact<{
  sortKeys:
    | Array<IReorderAssortmentFilterInput>
    | IReorderAssortmentFilterInput;
}>;

export type IReorderAssortmentFiltersMutation = {
  __typename?: 'Mutation';
  reorderAssortmentFilters: Array<{
    __typename?: 'AssortmentFilter';
    _id: string;
  }>;
};

export type IReorderAssortmentLinksMutationVariables = Exact<{
  sortKeys: Array<IReorderAssortmentLinkInput> | IReorderAssortmentLinkInput;
}>;

export type IReorderAssortmentLinksMutation = {
  __typename?: 'Mutation';
  reorderAssortmentLinks: Array<{ __typename?: 'AssortmentLink'; _id: string }>;
};

export type IReorderAssortmentMediaMutationVariables = Exact<{
  sortKeys: Array<IReorderAssortmentMediaInput> | IReorderAssortmentMediaInput;
}>;

export type IReorderAssortmentMediaMutation = {
  __typename?: 'Mutation';
  reorderAssortmentMedia: Array<{
    __typename?: 'AssortmentMedia';
    _id: string;
  }>;
};

export type IReorderAssortmentProductsMutationVariables = Exact<{
  sortKeys:
    | Array<IReorderAssortmentProductInput>
    | IReorderAssortmentProductInput;
}>;

export type IReorderAssortmentProductsMutation = {
  __typename?: 'Mutation';
  reorderAssortmentProducts: Array<{
    __typename?: 'AssortmentProduct';
    _id: string;
  }>;
};

export type ISearchAssortmentsQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type ISearchAssortmentsQuery = {
  __typename?: 'Query';
  searchAssortments: {
    __typename?: 'AssortmentSearchResult';
    assortments: Array<{
      __typename?: 'Assortment';
      _id: string;
      isActive?: boolean | null;
      created?: any | null;
      updated?: any | null;
      sequence: number;
      isBase?: boolean | null;
      isRoot?: boolean | null;
      tags?: Array<any> | null;
      childrenCount: number;
      texts?: {
        __typename?: 'AssortmentTexts';
        _id: string;
        slug?: string | null;
        title?: string | null;
        subtitle?: string | null;
        description?: string | null;
      } | null;
      media: Array<{
        __typename?: 'AssortmentMedia';
        _id: string;
        tags?: Array<any> | null;
        file: { __typename?: 'Media'; _id: string; url: string };
      }>;
    }>;
  };
};

export type ISetBaseAssortmentMutationVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
}>;

export type ISetBaseAssortmentMutation = {
  __typename?: 'Mutation';
  setBaseAssortment: {
    __typename?: 'Assortment';
    _id: string;
    isBase?: boolean | null;
  };
};

export type ITranslatedAssortmentMediaTextsQueryVariables = Exact<{
  assortmentMediaId: Scalars['ID']['input'];
}>;

export type ITranslatedAssortmentMediaTextsQuery = {
  __typename?: 'Query';
  translatedAssortmentMediaTexts: Array<{
    __typename?: 'AssortmentMediaTexts';
    _id: string;
    locale?: string | null;
    title?: string | null;
    subtitle?: string | null;
  }>;
};

export type ITranslatedAssortmentTextsQueryVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
}>;

export type ITranslatedAssortmentTextsQuery = {
  __typename?: 'Query';
  translatedAssortmentTexts: Array<{
    __typename?: 'AssortmentTexts';
    _id: string;
    locale?: string | null;
    slug?: string | null;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
  }>;
};

export type IUpdateAssortmentMutationVariables = Exact<{
  assortment: IUpdateAssortmentInput;
  assortmentId: Scalars['ID']['input'];
}>;

export type IUpdateAssortmentMutation = {
  __typename?: 'Mutation';
  updateAssortment: {
    __typename?: 'Assortment';
    _id: string;
    isActive?: boolean | null;
    created?: any | null;
    updated?: any | null;
    sequence: number;
    isBase?: boolean | null;
    isRoot?: boolean | null;
    tags?: Array<any> | null;
    childrenCount: number;
    texts?: {
      __typename?: 'AssortmentTexts';
      _id: string;
      slug?: string | null;
      title?: string | null;
      subtitle?: string | null;
      description?: string | null;
    } | null;
    media: Array<{
      __typename?: 'AssortmentMedia';
      _id: string;
      tags?: Array<any> | null;
      file: { __typename?: 'Media'; _id: string; url: string };
    }>;
  };
};

export type IUpdateAssortmentMediaTextsMutationVariables = Exact<{
  assortmentMediaId: Scalars['ID']['input'];
  texts:
    | Array<IUpdateAssortmentMediaTextInput>
    | IUpdateAssortmentMediaTextInput;
}>;

export type IUpdateAssortmentMediaTextsMutation = {
  __typename?: 'Mutation';
  updateAssortmentMediaTexts: Array<{
    __typename?: 'AssortmentMediaTexts';
    _id: string;
    locale?: string | null;
    title?: string | null;
    subtitle?: string | null;
  }>;
};

export type IUpdateAssortmentTextsMutationVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
  texts: Array<IUpdateAssortmentTextInput> | IUpdateAssortmentTextInput;
}>;

export type IUpdateAssortmentTextsMutation = {
  __typename?: 'Mutation';
  updateAssortmentTexts: Array<{
    __typename?: 'AssortmentTexts';
    _id: string;
    locale?: string | null;
    slug?: string | null;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
  }>;
};

export type IShopInfoQueryVariables = Exact<{ [key: string]: never }>;

export type IShopInfoQuery = {
  __typename?: 'Query';
  shopInfo: {
    __typename?: 'Shop';
    _id: string;
    version?: string | null;
    language?: {
      __typename?: 'Language';
      _id: string;
      isoCode?: string | null;
      name?: string | null;
    } | null;
    country?: {
      __typename?: 'Country';
      _id: string;
      isoCode?: string | null;
      flagEmoji?: string | null;
      name?: string | null;
      defaultCurrency?: {
        __typename?: 'Currency';
        _id: string;
        isoCode: string;
      } | null;
    } | null;
    externalLinks: Array<{
      __typename?: 'Link';
      href?: string | null;
      title?: string | null;
    } | null>;
    adminUiConfig: {
      __typename?: 'AdminUiConfig';
      customProperties: Array<{
        __typename?: 'AdminUiConfigCustomEntityInterface';
        entityName: string;
        inlineFragment: string;
      }>;
    };
  };
};

export type ISystemRolesQueryVariables = Exact<{ [key: string]: never }>;

export type ISystemRolesQuery = {
  __typename?: 'Query';
  shopInfo: { __typename?: 'Shop'; _id: string; userRoles: Array<string> };
};

export type ICountryFragmentFragment = {
  __typename?: 'Country';
  _id: string;
  isoCode?: string | null;
  isActive?: boolean | null;
  isBase?: boolean | null;
  defaultCurrency?: {
    __typename?: 'Currency';
    _id: string;
    isoCode: string;
  } | null;
};

export type ICountriesQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
}>;

export type ICountriesQuery = {
  __typename?: 'Query';
  countriesCount: number;
  countries: Array<{
    __typename?: 'Country';
    _id: string;
    isoCode?: string | null;
    isActive?: boolean | null;
    isBase?: boolean | null;
    defaultCurrency?: {
      __typename?: 'Currency';
      _id: string;
      isoCode: string;
    } | null;
  }>;
};

export type ICountryQueryVariables = Exact<{
  countryId: Scalars['ID']['input'];
}>;

export type ICountryQuery = {
  __typename?: 'Query';
  country?: {
    __typename?: 'Country';
    _id: string;
    isoCode?: string | null;
    isActive?: boolean | null;
    isBase?: boolean | null;
    defaultCurrency?: {
      __typename?: 'Currency';
      _id: string;
      isoCode: string;
    } | null;
  } | null;
};

export type ICreateCountryMutationVariables = Exact<{
  country: ICreateCountryInput;
}>;

export type ICreateCountryMutation = {
  __typename?: 'Mutation';
  createCountry: {
    __typename?: 'Country';
    _id: string;
    isoCode?: string | null;
    isActive?: boolean | null;
    isBase?: boolean | null;
    defaultCurrency?: {
      __typename?: 'Currency';
      _id: string;
      isoCode: string;
    } | null;
  };
};

export type IRemoveCountryMutationVariables = Exact<{
  countryId: Scalars['ID']['input'];
}>;

export type IRemoveCountryMutation = {
  __typename?: 'Mutation';
  removeCountry: {
    __typename?: 'Country';
    _id: string;
    isoCode?: string | null;
    isActive?: boolean | null;
    isBase?: boolean | null;
    defaultCurrency?: {
      __typename?: 'Currency';
      _id: string;
      isoCode: string;
    } | null;
  };
};

export type IUpdateCountryMutationVariables = Exact<{
  country: IUpdateCountryInput;
  countryId: Scalars['ID']['input'];
}>;

export type IUpdateCountryMutation = {
  __typename?: 'Mutation';
  updateCountry: {
    __typename?: 'Country';
    _id: string;
    isoCode?: string | null;
    isActive?: boolean | null;
    isBase?: boolean | null;
    defaultCurrency?: {
      __typename?: 'Currency';
      _id: string;
      isoCode: string;
    } | null;
  };
};

export type ICurrencyFragmentFragment = {
  __typename?: 'Currency';
  _id: string;
  isoCode: string;
  isActive?: boolean | null;
  contractAddress?: string | null;
  decimals?: number | null;
};

export type ICreateCurrencyMutationVariables = Exact<{
  currency: ICreateCurrencyInput;
}>;

export type ICreateCurrencyMutation = {
  __typename?: 'Mutation';
  createCurrency: {
    __typename?: 'Currency';
    _id: string;
    isoCode: string;
    isActive?: boolean | null;
    contractAddress?: string | null;
    decimals?: number | null;
  };
};

export type ICurrenciesQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
}>;

export type ICurrenciesQuery = {
  __typename?: 'Query';
  currenciesCount: number;
  currencies: Array<{
    __typename?: 'Currency';
    _id: string;
    isoCode: string;
    isActive?: boolean | null;
    contractAddress?: string | null;
    decimals?: number | null;
  }>;
};

export type ICurrencyQueryVariables = Exact<{
  currencyId: Scalars['ID']['input'];
}>;

export type ICurrencyQuery = {
  __typename?: 'Query';
  currency?: {
    __typename?: 'Currency';
    _id: string;
    isoCode: string;
    isActive?: boolean | null;
    contractAddress?: string | null;
    decimals?: number | null;
  } | null;
};

export type IRemoveCurrencyMutationVariables = Exact<{
  currencyId: Scalars['ID']['input'];
}>;

export type IRemoveCurrencyMutation = {
  __typename?: 'Mutation';
  removeCurrency: {
    __typename?: 'Currency';
    _id: string;
    isoCode: string;
    isActive?: boolean | null;
    contractAddress?: string | null;
    decimals?: number | null;
  };
};

export type IUpdateCurrencyMutationVariables = Exact<{
  currency: IUpdateCurrencyInput;
  currencyId: Scalars['ID']['input'];
}>;

export type IUpdateCurrencyMutation = {
  __typename?: 'Mutation';
  updateCurrency: {
    __typename?: 'Currency';
    _id: string;
    isoCode: string;
    isActive?: boolean | null;
    contractAddress?: string | null;
    decimals?: number | null;
  };
};

export type IDeliveryProviderFragmentFragment = {
  __typename?: 'DeliveryProvider';
  _id: string;
  created?: any | null;
  updated?: any | null;
  deleted?: any | null;
  type?: IDeliveryProviderType | null;
  isActive?: boolean | null;
  configuration?: any | null;
  configurationError?: IDeliveryProviderError | null;
  interface?: {
    __typename?: 'DeliveryInterface';
    _id: string;
    label?: string | null;
    version?: string | null;
  } | null;
};

export type ICreateDeliveryProviderMutationVariables = Exact<{
  deliveryProvider: ICreateDeliveryProviderInput;
}>;

export type ICreateDeliveryProviderMutation = {
  __typename?: 'Mutation';
  createDeliveryProvider: {
    __typename?: 'DeliveryProvider';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    type?: IDeliveryProviderType | null;
    isActive?: boolean | null;
    configuration?: any | null;
    configurationError?: IDeliveryProviderError | null;
    interface?: {
      __typename?: 'DeliveryInterface';
      _id: string;
      label?: string | null;
      version?: string | null;
    } | null;
  };
};

export type IDeliveryInterfacesQueryVariables = Exact<{
  providerType: IDeliveryProviderType;
}>;

export type IDeliveryInterfacesQuery = {
  __typename?: 'Query';
  deliveryInterfaces: Array<{
    __typename?: 'DeliveryInterface';
    _id: string;
    label?: string | null;
    value: string;
  }>;
};

export type IDeliveryProviderQueryVariables = Exact<{
  deliveryProviderId: Scalars['ID']['input'];
}>;

export type IDeliveryProviderQuery = {
  __typename?: 'Query';
  deliveryProvider?: {
    __typename?: 'DeliveryProvider';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    type?: IDeliveryProviderType | null;
    isActive?: boolean | null;
    configuration?: any | null;
    configurationError?: IDeliveryProviderError | null;
    interface?: {
      __typename?: 'DeliveryInterface';
      _id: string;
      label?: string | null;
      version?: string | null;
    } | null;
  } | null;
};

export type IDeliveryProvidersTypeQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IDeliveryProvidersTypeQuery = {
  __typename?: 'Query';
  deliveryProviderType?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label?: string | null;
    }> | null;
  } | null;
};

export type IDeliveryProvidersQueryVariables = Exact<{
  type?: InputMaybe<IDeliveryProviderType>;
}>;

export type IDeliveryProvidersQuery = {
  __typename?: 'Query';
  deliveryProviders: Array<{
    __typename?: 'DeliveryProvider';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    type?: IDeliveryProviderType | null;
    isActive?: boolean | null;
    configuration?: any | null;
    configurationError?: IDeliveryProviderError | null;
    interface?: {
      __typename?: 'DeliveryInterface';
      _id: string;
      label?: string | null;
      version?: string | null;
    } | null;
  }>;
};

export type IOrderDeliveryStatusQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IOrderDeliveryStatusQuery = {
  __typename?: 'Query';
  deliveryStatusType?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label?: string | null;
    }> | null;
  } | null;
};

export type IRemoveDeliveryProviderMutationVariables = Exact<{
  deliveryProviderId: Scalars['ID']['input'];
}>;

export type IRemoveDeliveryProviderMutation = {
  __typename?: 'Mutation';
  removeDeliveryProvider: { __typename?: 'DeliveryProvider'; _id: string };
};

export type IUpdateDeliveryProviderMutationVariables = Exact<{
  deliveryProvider: IUpdateProviderInput;
  deliveryProviderId: Scalars['ID']['input'];
}>;

export type IUpdateDeliveryProviderMutation = {
  __typename?: 'Mutation';
  updateDeliveryProvider: {
    __typename?: 'DeliveryProvider';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    type?: IDeliveryProviderType | null;
    isActive?: boolean | null;
    configuration?: any | null;
    configurationError?: IDeliveryProviderError | null;
    interface?: {
      __typename?: 'DeliveryInterface';
      _id: string;
      label?: string | null;
      version?: string | null;
    } | null;
  };
};

export type IEnrollmentDetailFragmentFragment = {
  __typename?: 'Enrollment';
  _id: string;
  enrollmentNumber?: string | null;
  updated?: any | null;
  status: IEnrollmentStatus;
  created: any;
  expires?: any | null;
  isExpired?: boolean | null;
  country?: {
    __typename?: 'Country';
    _id: string;
    isoCode?: string | null;
  } | null;
  billingAddress?: {
    __typename?: 'Address';
    addressLine?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    company?: string | null;
    countryCode?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    postalCode?: string | null;
    regionCode?: string | null;
  } | null;
  contact?: {
    __typename?: 'Contact';
    emailAddress?: string | null;
    telNumber?: string | null;
  } | null;
  currency?: {
    __typename?: 'Currency';
    _id: string;
    contractAddress?: string | null;
    decimals?: number | null;
    isActive?: boolean | null;
    isoCode: string;
  } | null;
  delivery?: {
    __typename?: 'EnrollmentDelivery';
    provider?: {
      __typename?: 'DeliveryProvider';
      _id: string;
      configuration?: any | null;
      configurationError?: IDeliveryProviderError | null;
      isActive?: boolean | null;
      type?: IDeliveryProviderType | null;
      interface?: {
        __typename?: 'DeliveryInterface';
        _id: string;
        label?: string | null;
        version?: string | null;
      } | null;
      simulatedPrice?: {
        __typename?: 'Price';
        _id: string;
        amount: number;
        currency: string;
        isNetPrice: boolean;
        isTaxable: boolean;
      } | null;
    } | null;
  } | null;
  payment?: {
    __typename?: 'EnrollmentPayment';
    provider?: {
      __typename?: 'PaymentProvider';
      _id: string;
      configuration?: any | null;
      configurationError?: IPaymentProviderError | null;
      isActive?: boolean | null;
      type?: IPaymentProviderType | null;
      interface?: {
        __typename?: 'PaymentInterface';
        _id: string;
        label?: string | null;
        version?: string | null;
      } | null;
    } | null;
  } | null;
  periods: Array<{
    __typename?: 'EnrollmentPeriod';
    end: any;
    isTrial: boolean;
    start: any;
    order?: { __typename?: 'Order'; _id: string } | null;
  }>;
  plan: {
    __typename?: 'EnrollmentPlan';
    quantity: number;
    configuration?: Array<{
      __typename?: 'ProductConfigurationParameter';
      key: string;
      value: string;
    }> | null;
    product: {
      __typename?: 'PlanProduct';
      _id: string;
      texts?: {
        __typename?: 'ProductTexts';
        _id: string;
        title?: string | null;
      } | null;
    };
  };
  user: {
    __typename?: 'User';
    _id: string;
    username?: string | null;
    name: string;
    avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
  };
};

export type IEnrollmentFragmentFragment = {
  __typename?: 'Enrollment';
  _id: string;
  enrollmentNumber?: string | null;
  updated?: any | null;
  status: IEnrollmentStatus;
  created: any;
  expires?: any | null;
  isExpired?: boolean | null;
  country?: {
    __typename?: 'Country';
    _id: string;
    isoCode?: string | null;
  } | null;
  currency?: { __typename?: 'Currency'; _id: string; isoCode: string } | null;
  periods: Array<{
    __typename?: 'EnrollmentPeriod';
    start: any;
    end: any;
    isTrial: boolean;
  }>;
  payment?: {
    __typename?: 'EnrollmentPayment';
    provider?: { __typename?: 'PaymentProvider'; _id: string } | null;
  } | null;
  delivery?: {
    __typename?: 'EnrollmentDelivery';
    provider?: { __typename?: 'DeliveryProvider'; _id: string } | null;
  } | null;
  plan: {
    __typename?: 'EnrollmentPlan';
    quantity: number;
    product: {
      __typename?: 'PlanProduct';
      _id: string;
      media: Array<{
        __typename?: 'ProductMedia';
        _id: string;
        file: { __typename?: 'Media'; _id: string; url: string };
      }>;
      texts?: {
        __typename?: 'ProductTexts';
        _id: string;
        title?: string | null;
      } | null;
    };
  };
  user: {
    __typename?: 'User';
    _id: string;
    username?: string | null;
    name: string;
    avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
  };
};

export type IActivateEnrollmentMutationVariables = Exact<{
  enrollmentId: Scalars['ID']['input'];
}>;

export type IActivateEnrollmentMutation = {
  __typename?: 'Mutation';
  activateEnrollment: { __typename?: 'Enrollment'; _id: string };
};

export type IEnrollmentQueryVariables = Exact<{
  enrollmentId: Scalars['ID']['input'];
}>;

export type IEnrollmentQuery = {
  __typename?: 'Query';
  enrollment?: {
    __typename?: 'Enrollment';
    _id: string;
    enrollmentNumber?: string | null;
    updated?: any | null;
    status: IEnrollmentStatus;
    created: any;
    expires?: any | null;
    isExpired?: boolean | null;
    country?: {
      __typename?: 'Country';
      _id: string;
      isoCode?: string | null;
    } | null;
    billingAddress?: {
      __typename?: 'Address';
      addressLine?: string | null;
      addressLine2?: string | null;
      city?: string | null;
      company?: string | null;
      countryCode?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      postalCode?: string | null;
      regionCode?: string | null;
    } | null;
    contact?: {
      __typename?: 'Contact';
      emailAddress?: string | null;
      telNumber?: string | null;
    } | null;
    currency?: {
      __typename?: 'Currency';
      _id: string;
      contractAddress?: string | null;
      decimals?: number | null;
      isActive?: boolean | null;
      isoCode: string;
    } | null;
    delivery?: {
      __typename?: 'EnrollmentDelivery';
      provider?: {
        __typename?: 'DeliveryProvider';
        _id: string;
        configuration?: any | null;
        configurationError?: IDeliveryProviderError | null;
        isActive?: boolean | null;
        type?: IDeliveryProviderType | null;
        interface?: {
          __typename?: 'DeliveryInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
        simulatedPrice?: {
          __typename?: 'Price';
          _id: string;
          amount: number;
          currency: string;
          isNetPrice: boolean;
          isTaxable: boolean;
        } | null;
      } | null;
    } | null;
    payment?: {
      __typename?: 'EnrollmentPayment';
      provider?: {
        __typename?: 'PaymentProvider';
        _id: string;
        configuration?: any | null;
        configurationError?: IPaymentProviderError | null;
        isActive?: boolean | null;
        type?: IPaymentProviderType | null;
        interface?: {
          __typename?: 'PaymentInterface';
          _id: string;
          label?: string | null;
          version?: string | null;
        } | null;
      } | null;
    } | null;
    periods: Array<{
      __typename?: 'EnrollmentPeriod';
      end: any;
      isTrial: boolean;
      start: any;
      order?: { __typename?: 'Order'; _id: string } | null;
    }>;
    plan: {
      __typename?: 'EnrollmentPlan';
      quantity: number;
      configuration?: Array<{
        __typename?: 'ProductConfigurationParameter';
        key: string;
        value: string;
      }> | null;
      product: {
        __typename?: 'PlanProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
        } | null;
      };
    };
    user: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      name: string;
      avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
    };
  } | null;
};

export type IEnrollmentStatusQueryVariables = Exact<{ [key: string]: never }>;

export type IEnrollmentStatusQuery = {
  __typename?: 'Query';
  enrollmentStatusTypes?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label?: string | null;
    }> | null;
  } | null;
};

export type IEnrollmentsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
  status?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >;
}>;

export type IEnrollmentsQuery = {
  __typename?: 'Query';
  enrollmentsCount: number;
  enrollments: Array<{
    __typename?: 'Enrollment';
    _id: string;
    enrollmentNumber?: string | null;
    updated?: any | null;
    status: IEnrollmentStatus;
    created: any;
    expires?: any | null;
    isExpired?: boolean | null;
    country?: {
      __typename?: 'Country';
      _id: string;
      isoCode?: string | null;
    } | null;
    currency?: { __typename?: 'Currency'; _id: string; isoCode: string } | null;
    periods: Array<{
      __typename?: 'EnrollmentPeriod';
      start: any;
      end: any;
      isTrial: boolean;
    }>;
    payment?: {
      __typename?: 'EnrollmentPayment';
      provider?: { __typename?: 'PaymentProvider'; _id: string } | null;
    } | null;
    delivery?: {
      __typename?: 'EnrollmentDelivery';
      provider?: { __typename?: 'DeliveryProvider'; _id: string } | null;
    } | null;
    plan: {
      __typename?: 'EnrollmentPlan';
      quantity: number;
      product: {
        __typename?: 'PlanProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
        } | null;
      };
    };
    user: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      name: string;
      avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
    };
  }>;
};

export type ISendEnrollmentEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type ISendEnrollmentEmailMutation = {
  __typename?: 'Mutation';
  sendEnrollmentEmail?: {
    __typename?: 'SuccessResponse';
    success?: boolean | null;
  } | null;
};

export type ITerminateEnrollmentMutationVariables = Exact<{
  enrollmentId: Scalars['ID']['input'];
}>;

export type ITerminateEnrollmentMutation = {
  __typename?: 'Mutation';
  terminateEnrollment: { __typename?: 'Enrollment'; _id: string };
};

export type IUserEnrollmentsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  queryString?: InputMaybe<Scalars['String']['input']>;
}>;

export type IUserEnrollmentsQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    _id: string;
    enrollments: Array<{
      __typename?: 'Enrollment';
      _id: string;
      enrollmentNumber?: string | null;
      updated?: any | null;
      status: IEnrollmentStatus;
      created: any;
      expires?: any | null;
      isExpired?: boolean | null;
      country?: {
        __typename?: 'Country';
        _id: string;
        isoCode?: string | null;
      } | null;
      currency?: {
        __typename?: 'Currency';
        _id: string;
        isoCode: string;
      } | null;
      periods: Array<{
        __typename?: 'EnrollmentPeriod';
        start: any;
        end: any;
        isTrial: boolean;
      }>;
      payment?: {
        __typename?: 'EnrollmentPayment';
        provider?: { __typename?: 'PaymentProvider'; _id: string } | null;
      } | null;
      delivery?: {
        __typename?: 'EnrollmentDelivery';
        provider?: { __typename?: 'DeliveryProvider'; _id: string } | null;
      } | null;
      plan: {
        __typename?: 'EnrollmentPlan';
        quantity: number;
        product: {
          __typename?: 'PlanProduct';
          _id: string;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
          } | null;
        };
      };
      user: {
        __typename?: 'User';
        _id: string;
        username?: string | null;
        name: string;
        avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
      };
    }>;
  } | null;
};

export type IEventFragmentFragment = {
  __typename?: 'Event';
  _id: string;
  type: string;
  payload?: any | null;
  created: any;
};

export type IEventQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;

export type IEventQuery = {
  __typename?: 'Query';
  event?: {
    __typename?: 'Event';
    _id: string;
    type: string;
    payload?: any | null;
    created: any;
  } | null;
};

export type IEventsTypeQueryVariables = Exact<{ [key: string]: never }>;

export type IEventsTypeQuery = {
  __typename?: 'Query';
  eventTypes?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label: string;
    }> | null;
  } | null;
};

export type IEventsQueryVariables = Exact<{
  types?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
  queryString?: InputMaybe<Scalars['String']['input']>;
}>;

export type IEventsQuery = {
  __typename?: 'Query';
  eventsCount: number;
  events: Array<{
    __typename?: 'Event';
    _id: string;
    type: string;
    payload?: any | null;
    created: any;
  }>;
};

export type IRegisteredEventTypeQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IRegisteredEventTypeQuery = {
  __typename?: 'Query';
  registeredEvents?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label?: string | null;
    }> | null;
  } | null;
};

export type IFilterFragmentFragment = {
  __typename?: 'Filter';
  _id: string;
  updated?: any | null;
  created?: any | null;
  key?: string | null;
  isActive?: boolean | null;
  type?: IFilterType | null;
  options?: Array<{
    __typename?: 'FilterOption';
    _id: string;
    value?: string | null;
    texts?: {
      __typename?: 'FilterTexts';
      _id: string;
      title?: string | null;
      subtitle?: string | null;
      locale?: string | null;
    } | null;
  }> | null;
};

export type IFilterOptionFragmentFragment = {
  __typename?: 'FilterOption';
  _id: string;
  value?: string | null;
  texts?: {
    __typename?: 'FilterTexts';
    _id: string;
    title?: string | null;
    subtitle?: string | null;
    locale?: string | null;
  } | null;
};

export type IFilterTextsFragmentFragment = {
  __typename?: 'FilterTexts';
  _id: string;
  locale?: string | null;
  title?: string | null;
  subtitle?: string | null;
};

export type ICreateFilterMutationVariables = Exact<{
  filter: ICreateFilterInput;
}>;

export type ICreateFilterMutation = {
  __typename?: 'Mutation';
  createFilter: {
    __typename?: 'Filter';
    _id: string;
    updated?: any | null;
    created?: any | null;
    key?: string | null;
    isActive?: boolean | null;
    type?: IFilterType | null;
    options?: Array<{
      __typename?: 'FilterOption';
      _id: string;
      value?: string | null;
      texts?: {
        __typename?: 'FilterTexts';
        _id: string;
        title?: string | null;
        subtitle?: string | null;
        locale?: string | null;
      } | null;
    }> | null;
  };
};

export type ICreateFilterOptionMutationVariables = Exact<{
  filterId: Scalars['ID']['input'];
  option: ICreateFilterOptionInput;
}>;

export type ICreateFilterOptionMutation = {
  __typename?: 'Mutation';
  createFilterOption: { __typename?: 'Filter'; _id: string };
};

export type IFilterQueryVariables = Exact<{
  filterId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IFilterQuery = {
  __typename?: 'Query';
  filter?: {
    __typename?: 'Filter';
    _id: string;
    updated?: any | null;
    created?: any | null;
    key?: string | null;
    isActive?: boolean | null;
    type?: IFilterType | null;
    texts?: {
      __typename?: 'FilterTexts';
      _id: string;
      title?: string | null;
      subtitle?: string | null;
      locale?: string | null;
    } | null;
    options?: Array<{
      __typename?: 'FilterOption';
      _id: string;
      value?: string | null;
      texts?: {
        __typename?: 'FilterTexts';
        _id: string;
        title?: string | null;
        subtitle?: string | null;
        locale?: string | null;
      } | null;
    }> | null;
  } | null;
};

export type IFilterOptionsQueryVariables = Exact<{
  filterId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IFilterOptionsQuery = {
  __typename?: 'Query';
  filter?: {
    __typename?: 'Filter';
    _id: string;
    options?: Array<{
      __typename?: 'FilterOption';
      _id: string;
      value?: string | null;
      texts?: {
        __typename?: 'FilterTexts';
        _id: string;
        title?: string | null;
        subtitle?: string | null;
        locale?: string | null;
      } | null;
    }> | null;
  } | null;
};

export type IFilterTypesQueryVariables = Exact<{ [key: string]: never }>;

export type IFilterTypesQuery = {
  __typename?: 'Query';
  filterTypes?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      label: string;
      value: string;
    }> | null;
  } | null;
};

export type IFiltersQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
}>;

export type IFiltersQuery = {
  __typename?: 'Query';
  filtersCount: number;
  filters: Array<{
    __typename?: 'Filter';
    _id: string;
    updated?: any | null;
    created?: any | null;
    key?: string | null;
    isActive?: boolean | null;
    type?: IFilterType | null;
    texts?: {
      __typename?: 'FilterTexts';
      _id: string;
      title?: string | null;
      subtitle?: string | null;
      locale?: string | null;
    } | null;
    options?: Array<{
      __typename?: 'FilterOption';
      _id: string;
      value?: string | null;
      texts?: {
        __typename?: 'FilterTexts';
        _id: string;
        title?: string | null;
        subtitle?: string | null;
        locale?: string | null;
      } | null;
    }> | null;
  }>;
};

export type IFiltersCountQueryVariables = Exact<{ [key: string]: never }>;

export type IFiltersCountQuery = { __typename?: 'Query'; filtersCount: number };

export type IRemoveFilterMutationVariables = Exact<{
  filterId: Scalars['ID']['input'];
}>;

export type IRemoveFilterMutation = {
  __typename?: 'Mutation';
  removeFilter: { __typename?: 'Filter'; _id: string };
};

export type IRemoveFilterOptionMutationVariables = Exact<{
  filterId: Scalars['ID']['input'];
  filterOptionValue: Scalars['String']['input'];
}>;

export type IRemoveFilterOptionMutation = {
  __typename?: 'Mutation';
  removeFilterOption: { __typename?: 'Filter'; _id: string };
};

export type ITranslatedFilterTextsQueryVariables = Exact<{
  filterId: Scalars['ID']['input'];
  filterOptionValue?: InputMaybe<Scalars['String']['input']>;
}>;

export type ITranslatedFilterTextsQuery = {
  __typename?: 'Query';
  translatedFilterTexts: Array<{
    __typename?: 'FilterTexts';
    _id: string;
    locale?: string | null;
    title?: string | null;
    subtitle?: string | null;
  }>;
};

export type IUpdateFilterMutationVariables = Exact<{
  filter: IUpdateFilterInput;
  filterId: Scalars['ID']['input'];
}>;

export type IUpdateFilterMutation = {
  __typename?: 'Mutation';
  updateFilter: {
    __typename?: 'Filter';
    _id: string;
    updated?: any | null;
    created?: any | null;
    key?: string | null;
    isActive?: boolean | null;
    type?: IFilterType | null;
    options?: Array<{
      __typename?: 'FilterOption';
      _id: string;
      value?: string | null;
      texts?: {
        __typename?: 'FilterTexts';
        _id: string;
        title?: string | null;
        subtitle?: string | null;
        locale?: string | null;
      } | null;
    }> | null;
  };
};

export type IUpdateFilterTextsMutationVariables = Exact<{
  filterId: Scalars['ID']['input'];
  filterOptionValue?: InputMaybe<Scalars['String']['input']>;
  texts: Array<IUpdateFilterTextInput> | IUpdateFilterTextInput;
}>;

export type IUpdateFilterTextsMutation = {
  __typename?: 'Mutation';
  updateFilterTexts: Array<{
    __typename?: 'FilterTexts';
    _id: string;
    locale?: string | null;
    title?: string | null;
    subtitle?: string | null;
  }>;
};

export type ILanguageFragmentFragment = {
  __typename?: 'Language';
  _id: string;
  isoCode?: string | null;
  isActive?: boolean | null;
  isBase?: boolean | null;
  name?: string | null;
};

export type ICreateLanguageMutationVariables = Exact<{
  language: ICreateLanguageInput;
}>;

export type ICreateLanguageMutation = {
  __typename?: 'Mutation';
  createLanguage: {
    __typename?: 'Language';
    _id: string;
    isoCode?: string | null;
    isActive?: boolean | null;
    isBase?: boolean | null;
    name?: string | null;
  };
};

export type ILanguageQueryVariables = Exact<{
  languageId: Scalars['ID']['input'];
}>;

export type ILanguageQuery = {
  __typename?: 'Query';
  language?: {
    __typename?: 'Language';
    _id: string;
    isoCode?: string | null;
    isActive?: boolean | null;
    isBase?: boolean | null;
    name?: string | null;
  } | null;
};

export type ILanguagesQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
}>;

export type ILanguagesQuery = {
  __typename?: 'Query';
  languagesCount: number;
  languages: Array<{
    __typename?: 'Language';
    _id: string;
    isoCode?: string | null;
    isActive?: boolean | null;
    isBase?: boolean | null;
    name?: string | null;
  } | null>;
};

export type IRemoveLanguageMutationVariables = Exact<{
  languageId: Scalars['ID']['input'];
}>;

export type IRemoveLanguageMutation = {
  __typename?: 'Mutation';
  removeLanguage: {
    __typename?: 'Language';
    _id: string;
    isoCode?: string | null;
    isActive?: boolean | null;
    isBase?: boolean | null;
    name?: string | null;
  };
};

export type IUpdateLanguageMutationVariables = Exact<{
  language: IUpdateLanguageInput;
  languageId: Scalars['ID']['input'];
}>;

export type IUpdateLanguageMutation = {
  __typename?: 'Mutation';
  updateLanguage: {
    __typename?: 'Language';
    _id: string;
    isoCode?: string | null;
    isActive?: boolean | null;
    isBase?: boolean | null;
    name?: string | null;
  };
};

export type IOrderDetailFragmentFragment = {
  __typename?: 'Order';
  _id: string;
  orderNumber?: string | null;
  status?: IOrderStatus | null;
  created?: any | null;
  updated?: any | null;
  ordered?: any | null;
  confirmed?: any | null;
  fullfilled?: any | null;
  totalTax?: { __typename?: 'Price'; amount: number; currency: string } | null;
  itemsTotal?: {
    __typename?: 'Price';
    amount: number;
    currency: string;
  } | null;
  totalDiscount?: {
    __typename?: 'Price';
    amount: number;
    currency: string;
  } | null;
  totalPayment?: {
    __typename?: 'Price';
    amount: number;
    currency: string;
  } | null;
  totalDelivery?: {
    __typename?: 'Price';
    amount: number;
    currency: string;
  } | null;
  user?: {
    __typename?: 'User';
    _id: string;
    username?: string | null;
    isGuest: boolean;
    avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
  } | null;
  discounts?: Array<{
    __typename?: 'OrderDiscount';
    _id: string;
    trigger: IOrderDiscountTrigger;
    code?: string | null;
    interface?: {
      __typename?: 'DiscountInterface';
      _id: string;
      label?: string | null;
      version?: string | null;
    } | null;
    total: {
      __typename?: 'Price';
      amount: number;
      currency: string;
      isTaxable: boolean;
      isNetPrice: boolean;
    };
    discounted?: Array<
      | {
          __typename?: 'OrderDeliveryDiscount';
          _id: string;
          orderDiscount: {
            __typename?: 'OrderDiscount';
            _id: string;
            total: {
              __typename?: 'Price';
              amount: number;
              currency: string;
              isTaxable: boolean;
              isNetPrice: boolean;
            };
          };
          total: {
            __typename?: 'Price';
            amount: number;
            currency: string;
            isTaxable: boolean;
            isNetPrice: boolean;
          };
        }
      | {
          __typename?: 'OrderGlobalDiscount';
          _id: string;
          orderDiscount: {
            __typename?: 'OrderDiscount';
            _id: string;
            total: {
              __typename?: 'Price';
              amount: number;
              currency: string;
              isTaxable: boolean;
              isNetPrice: boolean;
            };
          };
          total: {
            __typename?: 'Price';
            amount: number;
            currency: string;
            isTaxable: boolean;
            isNetPrice: boolean;
          };
        }
      | {
          __typename?: 'OrderItemDiscount';
          _id: string;
          orderDiscount: {
            __typename?: 'OrderDiscount';
            _id: string;
            total: {
              __typename?: 'Price';
              amount: number;
              currency: string;
              isTaxable: boolean;
              isNetPrice: boolean;
            };
          };
          total: {
            __typename?: 'Price';
            amount: number;
            currency: string;
            isTaxable: boolean;
            isNetPrice: boolean;
          };
        }
      | {
          __typename?: 'OrderPaymentDiscount';
          _id: string;
          orderDiscount: {
            __typename?: 'OrderDiscount';
            _id: string;
            total: {
              __typename?: 'Price';
              amount: number;
              currency: string;
              isTaxable: boolean;
              isNetPrice: boolean;
            };
          };
          total: {
            __typename?: 'Price';
            amount: number;
            currency: string;
            isTaxable: boolean;
            isNetPrice: boolean;
          };
        }
    > | null;
  }> | null;
  payment?:
    | {
        __typename?: 'OrderPaymentCard';
        _id: string;
        status?: IOrderPaymentStatus | null;
        paid?: any | null;
        provider?: {
          __typename?: 'PaymentProvider';
          _id: string;
          type?: IPaymentProviderType | null;
          interface?: {
            __typename?: 'PaymentInterface';
            _id: string;
            label?: string | null;
            version?: string | null;
          } | null;
        } | null;
        fee?: { __typename?: 'Price'; currency: string; amount: number } | null;
      }
    | {
        __typename?: 'OrderPaymentGeneric';
        _id: string;
        status?: IOrderPaymentStatus | null;
        paid?: any | null;
        provider?: {
          __typename?: 'PaymentProvider';
          _id: string;
          type?: IPaymentProviderType | null;
          interface?: {
            __typename?: 'PaymentInterface';
            _id: string;
            label?: string | null;
            version?: string | null;
          } | null;
        } | null;
        fee?: { __typename?: 'Price'; currency: string; amount: number } | null;
      }
    | {
        __typename?: 'OrderPaymentInvoice';
        _id: string;
        status?: IOrderPaymentStatus | null;
        paid?: any | null;
        provider?: {
          __typename?: 'PaymentProvider';
          _id: string;
          type?: IPaymentProviderType | null;
          interface?: {
            __typename?: 'PaymentInterface';
            _id: string;
            label?: string | null;
            version?: string | null;
          } | null;
        } | null;
        fee?: { __typename?: 'Price'; currency: string; amount: number } | null;
      }
    | null;
  delivery?:
    | {
        __typename?: 'OrderDeliveryPickUp';
        _id: string;
        status?: IOrderDeliveryStatus | null;
        delivered?: any | null;
        provider?: {
          __typename?: 'DeliveryProvider';
          _id: string;
          type?: IDeliveryProviderType | null;
          created?: any | null;
          updated?: any | null;
          deleted?: any | null;
          configuration?: any | null;
          interface?: {
            __typename?: 'DeliveryInterface';
            _id: string;
            label?: string | null;
            version?: string | null;
          } | null;
        } | null;
        fee?: {
          __typename?: 'Price';
          isTaxable: boolean;
          isNetPrice: boolean;
          amount: number;
          currency: string;
        } | null;
        discounts?: Array<{
          __typename?: 'OrderDeliveryDiscount';
          _id: string;
          orderDiscount: {
            __typename?: 'OrderDiscount';
            _id: string;
            trigger: IOrderDiscountTrigger;
            code?: string | null;
            order: {
              __typename?: 'Order';
              _id: string;
              orderNumber?: string | null;
            };
            interface?: {
              __typename?: 'DiscountInterface';
              _id: string;
              label?: string | null;
              version?: string | null;
            } | null;
            total: {
              __typename?: 'Price';
              isTaxable: boolean;
              isNetPrice: boolean;
              amount: number;
              currency: string;
            };
            discounted?: Array<
              | {
                  __typename?: 'OrderDeliveryDiscount';
                  _id: string;
                  orderDiscount: {
                    __typename?: 'OrderDiscount';
                    _id: string;
                    trigger: IOrderDiscountTrigger;
                    code?: string | null;
                    order: {
                      __typename?: 'Order';
                      _id: string;
                      orderNumber?: string | null;
                    };
                    interface?: {
                      __typename?: 'DiscountInterface';
                      _id: string;
                      label?: string | null;
                      version?: string | null;
                    } | null;
                    total: {
                      __typename?: 'Price';
                      isTaxable: boolean;
                      isNetPrice: boolean;
                      amount: number;
                      currency: string;
                    };
                  };
                }
              | {
                  __typename?: 'OrderGlobalDiscount';
                  _id: string;
                  orderDiscount: {
                    __typename?: 'OrderDiscount';
                    _id: string;
                    trigger: IOrderDiscountTrigger;
                    code?: string | null;
                    order: {
                      __typename?: 'Order';
                      _id: string;
                      orderNumber?: string | null;
                    };
                    interface?: {
                      __typename?: 'DiscountInterface';
                      _id: string;
                      label?: string | null;
                      version?: string | null;
                    } | null;
                    total: {
                      __typename?: 'Price';
                      isTaxable: boolean;
                      isNetPrice: boolean;
                      amount: number;
                      currency: string;
                    };
                  };
                }
              | {
                  __typename?: 'OrderItemDiscount';
                  _id: string;
                  orderDiscount: {
                    __typename?: 'OrderDiscount';
                    _id: string;
                    trigger: IOrderDiscountTrigger;
                    code?: string | null;
                    order: {
                      __typename?: 'Order';
                      _id: string;
                      orderNumber?: string | null;
                    };
                    interface?: {
                      __typename?: 'DiscountInterface';
                      _id: string;
                      label?: string | null;
                      version?: string | null;
                    } | null;
                    total: {
                      __typename?: 'Price';
                      isTaxable: boolean;
                      isNetPrice: boolean;
                      amount: number;
                      currency: string;
                    };
                  };
                }
              | {
                  __typename?: 'OrderPaymentDiscount';
                  _id: string;
                  orderDiscount: {
                    __typename?: 'OrderDiscount';
                    _id: string;
                    trigger: IOrderDiscountTrigger;
                    code?: string | null;
                    order: {
                      __typename?: 'Order';
                      _id: string;
                      orderNumber?: string | null;
                    };
                    interface?: {
                      __typename?: 'DiscountInterface';
                      _id: string;
                      label?: string | null;
                      version?: string | null;
                    } | null;
                    total: {
                      __typename?: 'Price';
                      isTaxable: boolean;
                      isNetPrice: boolean;
                      amount: number;
                      currency: string;
                    };
                  };
                }
            > | null;
          };
        }> | null;
      }
    | {
        __typename?: 'OrderDeliveryShipping';
        _id: string;
        status?: IOrderDeliveryStatus | null;
        delivered?: any | null;
        provider?: {
          __typename?: 'DeliveryProvider';
          _id: string;
          type?: IDeliveryProviderType | null;
          created?: any | null;
          updated?: any | null;
          deleted?: any | null;
          configuration?: any | null;
          interface?: {
            __typename?: 'DeliveryInterface';
            _id: string;
            label?: string | null;
            version?: string | null;
          } | null;
        } | null;
        fee?: {
          __typename?: 'Price';
          isTaxable: boolean;
          isNetPrice: boolean;
          amount: number;
          currency: string;
        } | null;
        discounts?: Array<{
          __typename?: 'OrderDeliveryDiscount';
          _id: string;
          orderDiscount: {
            __typename?: 'OrderDiscount';
            _id: string;
            trigger: IOrderDiscountTrigger;
            code?: string | null;
            order: {
              __typename?: 'Order';
              _id: string;
              orderNumber?: string | null;
            };
            interface?: {
              __typename?: 'DiscountInterface';
              _id: string;
              label?: string | null;
              version?: string | null;
            } | null;
            total: {
              __typename?: 'Price';
              isTaxable: boolean;
              isNetPrice: boolean;
              amount: number;
              currency: string;
            };
            discounted?: Array<
              | {
                  __typename?: 'OrderDeliveryDiscount';
                  _id: string;
                  orderDiscount: {
                    __typename?: 'OrderDiscount';
                    _id: string;
                    trigger: IOrderDiscountTrigger;
                    code?: string | null;
                    order: {
                      __typename?: 'Order';
                      _id: string;
                      orderNumber?: string | null;
                    };
                    interface?: {
                      __typename?: 'DiscountInterface';
                      _id: string;
                      label?: string | null;
                      version?: string | null;
                    } | null;
                    total: {
                      __typename?: 'Price';
                      isTaxable: boolean;
                      isNetPrice: boolean;
                      amount: number;
                      currency: string;
                    };
                  };
                }
              | {
                  __typename?: 'OrderGlobalDiscount';
                  _id: string;
                  orderDiscount: {
                    __typename?: 'OrderDiscount';
                    _id: string;
                    trigger: IOrderDiscountTrigger;
                    code?: string | null;
                    order: {
                      __typename?: 'Order';
                      _id: string;
                      orderNumber?: string | null;
                    };
                    interface?: {
                      __typename?: 'DiscountInterface';
                      _id: string;
                      label?: string | null;
                      version?: string | null;
                    } | null;
                    total: {
                      __typename?: 'Price';
                      isTaxable: boolean;
                      isNetPrice: boolean;
                      amount: number;
                      currency: string;
                    };
                  };
                }
              | {
                  __typename?: 'OrderItemDiscount';
                  _id: string;
                  orderDiscount: {
                    __typename?: 'OrderDiscount';
                    _id: string;
                    trigger: IOrderDiscountTrigger;
                    code?: string | null;
                    order: {
                      __typename?: 'Order';
                      _id: string;
                      orderNumber?: string | null;
                    };
                    interface?: {
                      __typename?: 'DiscountInterface';
                      _id: string;
                      label?: string | null;
                      version?: string | null;
                    } | null;
                    total: {
                      __typename?: 'Price';
                      isTaxable: boolean;
                      isNetPrice: boolean;
                      amount: number;
                      currency: string;
                    };
                  };
                }
              | {
                  __typename?: 'OrderPaymentDiscount';
                  _id: string;
                  orderDiscount: {
                    __typename?: 'OrderDiscount';
                    _id: string;
                    trigger: IOrderDiscountTrigger;
                    code?: string | null;
                    order: {
                      __typename?: 'Order';
                      _id: string;
                      orderNumber?: string | null;
                    };
                    interface?: {
                      __typename?: 'DiscountInterface';
                      _id: string;
                      label?: string | null;
                      version?: string | null;
                    } | null;
                    total: {
                      __typename?: 'Price';
                      isTaxable: boolean;
                      isNetPrice: boolean;
                      amount: number;
                      currency: string;
                    };
                  };
                }
            > | null;
          };
        }> | null;
      }
    | null;
  contact?: {
    __typename?: 'Contact';
    telNumber?: string | null;
    emailAddress?: string | null;
  } | null;
  country?: {
    __typename?: 'Country';
    _id: string;
    isoCode?: string | null;
    flagEmoji?: string | null;
    name?: string | null;
  } | null;
  currency?: {
    __typename?: 'Currency';
    _id: string;
    isoCode: string;
    isActive?: boolean | null;
  } | null;
  billingAddress?: {
    __typename?: 'Address';
    firstName?: string | null;
    lastName?: string | null;
    company?: string | null;
    addressLine?: string | null;
    addressLine2?: string | null;
    postalCode?: string | null;
    countryCode?: string | null;
    regionCode?: string | null;
    city?: string | null;
  } | null;
  total?: {
    __typename?: 'Price';
    isTaxable: boolean;
    amount: number;
    currency: string;
  } | null;
  items?: Array<{
    __typename?: 'OrderItem';
    _id: string;
    quantity: number;
    product:
      | {
          __typename?: 'BundleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            brand?: string | null;
            vendor?: string | null;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'ConfigurableProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            brand?: string | null;
            vendor?: string | null;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'PlanProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            brand?: string | null;
            vendor?: string | null;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'SimpleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            brand?: string | null;
            vendor?: string | null;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'TokenizedProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            brand?: string | null;
            vendor?: string | null;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        };
    unitPrice?: {
      __typename?: 'Price';
      amount: number;
      isTaxable: boolean;
      isNetPrice: boolean;
      currency: string;
    } | null;
    total?: {
      __typename?: 'Price';
      amount: number;
      isTaxable: boolean;
      isNetPrice: boolean;
      currency: string;
    } | null;
  }> | null;
};

export type IOrderFragmentFragment = {
  __typename?: 'Order';
  _id: string;
  status?: IOrderStatus | null;
  created?: any | null;
  updated?: any | null;
  ordered?: any | null;
  orderNumber?: string | null;
  confirmed?: any | null;
  fullfilled?: any | null;
  contact?: {
    __typename?: 'Contact';
    telNumber?: string | null;
    emailAddress?: string | null;
  } | null;
  total?: {
    __typename?: 'Price';
    _id: string;
    isTaxable: boolean;
    isNetPrice: boolean;
    amount: number;
    currency: string;
  } | null;
  user?: {
    __typename?: 'User';
    _id: string;
    username?: string | null;
    isGuest: boolean;
    avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
      } | null;
    } | null;
  } | null;
};

export type IConfirmOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type IConfirmOrderMutation = {
  __typename?: 'Mutation';
  confirmOrder: { __typename?: 'Order'; _id: string };
};

export type IDeliverOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type IDeliverOrderMutation = {
  __typename?: 'Mutation';
  deliverOrder: { __typename?: 'Order'; _id: string };
};

export type IOrderQueryVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type IOrderQuery = {
  __typename?: 'Query';
  order?: {
    __typename?: 'Order';
    _id: string;
    orderNumber?: string | null;
    status?: IOrderStatus | null;
    created?: any | null;
    updated?: any | null;
    ordered?: any | null;
    confirmed?: any | null;
    fullfilled?: any | null;
    totalTax?: {
      __typename?: 'Price';
      amount: number;
      currency: string;
    } | null;
    itemsTotal?: {
      __typename?: 'Price';
      amount: number;
      currency: string;
    } | null;
    totalDiscount?: {
      __typename?: 'Price';
      amount: number;
      currency: string;
    } | null;
    totalPayment?: {
      __typename?: 'Price';
      amount: number;
      currency: string;
    } | null;
    totalDelivery?: {
      __typename?: 'Price';
      amount: number;
      currency: string;
    } | null;
    user?: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      isGuest: boolean;
      avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
    } | null;
    discounts?: Array<{
      __typename?: 'OrderDiscount';
      _id: string;
      trigger: IOrderDiscountTrigger;
      code?: string | null;
      interface?: {
        __typename?: 'DiscountInterface';
        _id: string;
        label?: string | null;
        version?: string | null;
      } | null;
      total: {
        __typename?: 'Price';
        amount: number;
        currency: string;
        isTaxable: boolean;
        isNetPrice: boolean;
      };
      discounted?: Array<
        | {
            __typename?: 'OrderDeliveryDiscount';
            _id: string;
            orderDiscount: {
              __typename?: 'OrderDiscount';
              _id: string;
              total: {
                __typename?: 'Price';
                amount: number;
                currency: string;
                isTaxable: boolean;
                isNetPrice: boolean;
              };
            };
            total: {
              __typename?: 'Price';
              amount: number;
              currency: string;
              isTaxable: boolean;
              isNetPrice: boolean;
            };
          }
        | {
            __typename?: 'OrderGlobalDiscount';
            _id: string;
            orderDiscount: {
              __typename?: 'OrderDiscount';
              _id: string;
              total: {
                __typename?: 'Price';
                amount: number;
                currency: string;
                isTaxable: boolean;
                isNetPrice: boolean;
              };
            };
            total: {
              __typename?: 'Price';
              amount: number;
              currency: string;
              isTaxable: boolean;
              isNetPrice: boolean;
            };
          }
        | {
            __typename?: 'OrderItemDiscount';
            _id: string;
            orderDiscount: {
              __typename?: 'OrderDiscount';
              _id: string;
              total: {
                __typename?: 'Price';
                amount: number;
                currency: string;
                isTaxable: boolean;
                isNetPrice: boolean;
              };
            };
            total: {
              __typename?: 'Price';
              amount: number;
              currency: string;
              isTaxable: boolean;
              isNetPrice: boolean;
            };
          }
        | {
            __typename?: 'OrderPaymentDiscount';
            _id: string;
            orderDiscount: {
              __typename?: 'OrderDiscount';
              _id: string;
              total: {
                __typename?: 'Price';
                amount: number;
                currency: string;
                isTaxable: boolean;
                isNetPrice: boolean;
              };
            };
            total: {
              __typename?: 'Price';
              amount: number;
              currency: string;
              isTaxable: boolean;
              isNetPrice: boolean;
            };
          }
      > | null;
    }> | null;
    payment?:
      | {
          __typename?: 'OrderPaymentCard';
          _id: string;
          status?: IOrderPaymentStatus | null;
          paid?: any | null;
          provider?: {
            __typename?: 'PaymentProvider';
            _id: string;
            type?: IPaymentProviderType | null;
            interface?: {
              __typename?: 'PaymentInterface';
              _id: string;
              label?: string | null;
              version?: string | null;
            } | null;
          } | null;
          fee?: {
            __typename?: 'Price';
            currency: string;
            amount: number;
          } | null;
        }
      | {
          __typename?: 'OrderPaymentGeneric';
          _id: string;
          status?: IOrderPaymentStatus | null;
          paid?: any | null;
          provider?: {
            __typename?: 'PaymentProvider';
            _id: string;
            type?: IPaymentProviderType | null;
            interface?: {
              __typename?: 'PaymentInterface';
              _id: string;
              label?: string | null;
              version?: string | null;
            } | null;
          } | null;
          fee?: {
            __typename?: 'Price';
            currency: string;
            amount: number;
          } | null;
        }
      | {
          __typename?: 'OrderPaymentInvoice';
          _id: string;
          status?: IOrderPaymentStatus | null;
          paid?: any | null;
          provider?: {
            __typename?: 'PaymentProvider';
            _id: string;
            type?: IPaymentProviderType | null;
            interface?: {
              __typename?: 'PaymentInterface';
              _id: string;
              label?: string | null;
              version?: string | null;
            } | null;
          } | null;
          fee?: {
            __typename?: 'Price';
            currency: string;
            amount: number;
          } | null;
        }
      | null;
    delivery?:
      | {
          __typename?: 'OrderDeliveryPickUp';
          _id: string;
          status?: IOrderDeliveryStatus | null;
          delivered?: any | null;
          provider?: {
            __typename?: 'DeliveryProvider';
            _id: string;
            type?: IDeliveryProviderType | null;
            created?: any | null;
            updated?: any | null;
            deleted?: any | null;
            configuration?: any | null;
            interface?: {
              __typename?: 'DeliveryInterface';
              _id: string;
              label?: string | null;
              version?: string | null;
            } | null;
          } | null;
          fee?: {
            __typename?: 'Price';
            isTaxable: boolean;
            isNetPrice: boolean;
            amount: number;
            currency: string;
          } | null;
          discounts?: Array<{
            __typename?: 'OrderDeliveryDiscount';
            _id: string;
            orderDiscount: {
              __typename?: 'OrderDiscount';
              _id: string;
              trigger: IOrderDiscountTrigger;
              code?: string | null;
              order: {
                __typename?: 'Order';
                _id: string;
                orderNumber?: string | null;
              };
              interface?: {
                __typename?: 'DiscountInterface';
                _id: string;
                label?: string | null;
                version?: string | null;
              } | null;
              total: {
                __typename?: 'Price';
                isTaxable: boolean;
                isNetPrice: boolean;
                amount: number;
                currency: string;
              };
              discounted?: Array<
                | {
                    __typename?: 'OrderDeliveryDiscount';
                    _id: string;
                    orderDiscount: {
                      __typename?: 'OrderDiscount';
                      _id: string;
                      trigger: IOrderDiscountTrigger;
                      code?: string | null;
                      order: {
                        __typename?: 'Order';
                        _id: string;
                        orderNumber?: string | null;
                      };
                      interface?: {
                        __typename?: 'DiscountInterface';
                        _id: string;
                        label?: string | null;
                        version?: string | null;
                      } | null;
                      total: {
                        __typename?: 'Price';
                        isTaxable: boolean;
                        isNetPrice: boolean;
                        amount: number;
                        currency: string;
                      };
                    };
                  }
                | {
                    __typename?: 'OrderGlobalDiscount';
                    _id: string;
                    orderDiscount: {
                      __typename?: 'OrderDiscount';
                      _id: string;
                      trigger: IOrderDiscountTrigger;
                      code?: string | null;
                      order: {
                        __typename?: 'Order';
                        _id: string;
                        orderNumber?: string | null;
                      };
                      interface?: {
                        __typename?: 'DiscountInterface';
                        _id: string;
                        label?: string | null;
                        version?: string | null;
                      } | null;
                      total: {
                        __typename?: 'Price';
                        isTaxable: boolean;
                        isNetPrice: boolean;
                        amount: number;
                        currency: string;
                      };
                    };
                  }
                | {
                    __typename?: 'OrderItemDiscount';
                    _id: string;
                    orderDiscount: {
                      __typename?: 'OrderDiscount';
                      _id: string;
                      trigger: IOrderDiscountTrigger;
                      code?: string | null;
                      order: {
                        __typename?: 'Order';
                        _id: string;
                        orderNumber?: string | null;
                      };
                      interface?: {
                        __typename?: 'DiscountInterface';
                        _id: string;
                        label?: string | null;
                        version?: string | null;
                      } | null;
                      total: {
                        __typename?: 'Price';
                        isTaxable: boolean;
                        isNetPrice: boolean;
                        amount: number;
                        currency: string;
                      };
                    };
                  }
                | {
                    __typename?: 'OrderPaymentDiscount';
                    _id: string;
                    orderDiscount: {
                      __typename?: 'OrderDiscount';
                      _id: string;
                      trigger: IOrderDiscountTrigger;
                      code?: string | null;
                      order: {
                        __typename?: 'Order';
                        _id: string;
                        orderNumber?: string | null;
                      };
                      interface?: {
                        __typename?: 'DiscountInterface';
                        _id: string;
                        label?: string | null;
                        version?: string | null;
                      } | null;
                      total: {
                        __typename?: 'Price';
                        isTaxable: boolean;
                        isNetPrice: boolean;
                        amount: number;
                        currency: string;
                      };
                    };
                  }
              > | null;
            };
          }> | null;
        }
      | {
          __typename?: 'OrderDeliveryShipping';
          _id: string;
          status?: IOrderDeliveryStatus | null;
          delivered?: any | null;
          provider?: {
            __typename?: 'DeliveryProvider';
            _id: string;
            type?: IDeliveryProviderType | null;
            created?: any | null;
            updated?: any | null;
            deleted?: any | null;
            configuration?: any | null;
            interface?: {
              __typename?: 'DeliveryInterface';
              _id: string;
              label?: string | null;
              version?: string | null;
            } | null;
          } | null;
          fee?: {
            __typename?: 'Price';
            isTaxable: boolean;
            isNetPrice: boolean;
            amount: number;
            currency: string;
          } | null;
          discounts?: Array<{
            __typename?: 'OrderDeliveryDiscount';
            _id: string;
            orderDiscount: {
              __typename?: 'OrderDiscount';
              _id: string;
              trigger: IOrderDiscountTrigger;
              code?: string | null;
              order: {
                __typename?: 'Order';
                _id: string;
                orderNumber?: string | null;
              };
              interface?: {
                __typename?: 'DiscountInterface';
                _id: string;
                label?: string | null;
                version?: string | null;
              } | null;
              total: {
                __typename?: 'Price';
                isTaxable: boolean;
                isNetPrice: boolean;
                amount: number;
                currency: string;
              };
              discounted?: Array<
                | {
                    __typename?: 'OrderDeliveryDiscount';
                    _id: string;
                    orderDiscount: {
                      __typename?: 'OrderDiscount';
                      _id: string;
                      trigger: IOrderDiscountTrigger;
                      code?: string | null;
                      order: {
                        __typename?: 'Order';
                        _id: string;
                        orderNumber?: string | null;
                      };
                      interface?: {
                        __typename?: 'DiscountInterface';
                        _id: string;
                        label?: string | null;
                        version?: string | null;
                      } | null;
                      total: {
                        __typename?: 'Price';
                        isTaxable: boolean;
                        isNetPrice: boolean;
                        amount: number;
                        currency: string;
                      };
                    };
                  }
                | {
                    __typename?: 'OrderGlobalDiscount';
                    _id: string;
                    orderDiscount: {
                      __typename?: 'OrderDiscount';
                      _id: string;
                      trigger: IOrderDiscountTrigger;
                      code?: string | null;
                      order: {
                        __typename?: 'Order';
                        _id: string;
                        orderNumber?: string | null;
                      };
                      interface?: {
                        __typename?: 'DiscountInterface';
                        _id: string;
                        label?: string | null;
                        version?: string | null;
                      } | null;
                      total: {
                        __typename?: 'Price';
                        isTaxable: boolean;
                        isNetPrice: boolean;
                        amount: number;
                        currency: string;
                      };
                    };
                  }
                | {
                    __typename?: 'OrderItemDiscount';
                    _id: string;
                    orderDiscount: {
                      __typename?: 'OrderDiscount';
                      _id: string;
                      trigger: IOrderDiscountTrigger;
                      code?: string | null;
                      order: {
                        __typename?: 'Order';
                        _id: string;
                        orderNumber?: string | null;
                      };
                      interface?: {
                        __typename?: 'DiscountInterface';
                        _id: string;
                        label?: string | null;
                        version?: string | null;
                      } | null;
                      total: {
                        __typename?: 'Price';
                        isTaxable: boolean;
                        isNetPrice: boolean;
                        amount: number;
                        currency: string;
                      };
                    };
                  }
                | {
                    __typename?: 'OrderPaymentDiscount';
                    _id: string;
                    orderDiscount: {
                      __typename?: 'OrderDiscount';
                      _id: string;
                      trigger: IOrderDiscountTrigger;
                      code?: string | null;
                      order: {
                        __typename?: 'Order';
                        _id: string;
                        orderNumber?: string | null;
                      };
                      interface?: {
                        __typename?: 'DiscountInterface';
                        _id: string;
                        label?: string | null;
                        version?: string | null;
                      } | null;
                      total: {
                        __typename?: 'Price';
                        isTaxable: boolean;
                        isNetPrice: boolean;
                        amount: number;
                        currency: string;
                      };
                    };
                  }
              > | null;
            };
          }> | null;
        }
      | null;
    contact?: {
      __typename?: 'Contact';
      telNumber?: string | null;
      emailAddress?: string | null;
    } | null;
    country?: {
      __typename?: 'Country';
      _id: string;
      isoCode?: string | null;
      flagEmoji?: string | null;
      name?: string | null;
    } | null;
    currency?: {
      __typename?: 'Currency';
      _id: string;
      isoCode: string;
      isActive?: boolean | null;
    } | null;
    billingAddress?: {
      __typename?: 'Address';
      firstName?: string | null;
      lastName?: string | null;
      company?: string | null;
      addressLine?: string | null;
      addressLine2?: string | null;
      postalCode?: string | null;
      countryCode?: string | null;
      regionCode?: string | null;
      city?: string | null;
    } | null;
    total?: {
      __typename?: 'Price';
      isTaxable: boolean;
      amount: number;
      currency: string;
    } | null;
    items?: Array<{
      __typename?: 'OrderItem';
      _id: string;
      quantity: number;
      product:
        | {
            __typename?: 'BundleProduct';
            _id: string;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              slug?: string | null;
              brand?: string | null;
              vendor?: string | null;
              title?: string | null;
              subtitle?: string | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              file: { __typename?: 'Media'; _id: string; url: string };
            }>;
          }
        | {
            __typename?: 'ConfigurableProduct';
            _id: string;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              slug?: string | null;
              brand?: string | null;
              vendor?: string | null;
              title?: string | null;
              subtitle?: string | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              file: { __typename?: 'Media'; _id: string; url: string };
            }>;
          }
        | {
            __typename?: 'PlanProduct';
            _id: string;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              slug?: string | null;
              brand?: string | null;
              vendor?: string | null;
              title?: string | null;
              subtitle?: string | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              file: { __typename?: 'Media'; _id: string; url: string };
            }>;
          }
        | {
            __typename?: 'SimpleProduct';
            _id: string;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              slug?: string | null;
              brand?: string | null;
              vendor?: string | null;
              title?: string | null;
              subtitle?: string | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              file: { __typename?: 'Media'; _id: string; url: string };
            }>;
          }
        | {
            __typename?: 'TokenizedProduct';
            _id: string;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              slug?: string | null;
              brand?: string | null;
              vendor?: string | null;
              title?: string | null;
              subtitle?: string | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              file: { __typename?: 'Media'; _id: string; url: string };
            }>;
          };
      unitPrice?: {
        __typename?: 'Price';
        amount: number;
        isTaxable: boolean;
        isNetPrice: boolean;
        currency: string;
      } | null;
      total?: {
        __typename?: 'Price';
        amount: number;
        isTaxable: boolean;
        isNetPrice: boolean;
        currency: string;
      } | null;
    }> | null;
  } | null;
};

export type IOrderStatusQueryVariables = Exact<{ [key: string]: never }>;

export type IOrderStatusQuery = {
  __typename?: 'Query';
  orderStatusType?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label?: string | null;
    }> | null;
  } | null;
};

export type IOrdersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  includeCarts?: InputMaybe<Scalars['Boolean']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
}>;

export type IOrdersQuery = {
  __typename?: 'Query';
  ordersCount: number;
  orders: Array<{
    __typename?: 'Order';
    _id: string;
    status?: IOrderStatus | null;
    created?: any | null;
    updated?: any | null;
    ordered?: any | null;
    orderNumber?: string | null;
    confirmed?: any | null;
    fullfilled?: any | null;
    contact?: {
      __typename?: 'Contact';
      telNumber?: string | null;
      emailAddress?: string | null;
    } | null;
    total?: {
      __typename?: 'Price';
      _id: string;
      isTaxable: boolean;
      isNetPrice: boolean;
      amount: number;
      currency: string;
    } | null;
    user?: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      isGuest: boolean;
      avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
      profile?: {
        __typename?: 'UserProfile';
        displayName?: string | null;
        address?: {
          __typename?: 'Address';
          firstName?: string | null;
          lastName?: string | null;
        } | null;
      } | null;
    } | null;
  }>;
};

export type IPayOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type IPayOrderMutation = {
  __typename?: 'Mutation';
  payOrder: { __typename?: 'Order'; _id: string };
};

export type IRejectOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type IRejectOrderMutation = {
  __typename?: 'Mutation';
  rejectOrder: { __typename?: 'Order'; _id: string };
};

export type IRemoveOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type IRemoveOrderMutation = {
  __typename?: 'Mutation';
  removeOrder: { __typename?: 'Order'; _id: string };
};

export type IUserOrderQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
}>;

export type IUserOrderQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    orders: Array<{
      __typename?: 'Order';
      _id: string;
      status?: IOrderStatus | null;
      created?: any | null;
      updated?: any | null;
      ordered?: any | null;
      orderNumber?: string | null;
      confirmed?: any | null;
      fullfilled?: any | null;
      contact?: {
        __typename?: 'Contact';
        telNumber?: string | null;
        emailAddress?: string | null;
      } | null;
      total?: {
        __typename?: 'Price';
        _id: string;
        isTaxable: boolean;
        isNetPrice: boolean;
        amount: number;
        currency: string;
      } | null;
      user?: {
        __typename?: 'User';
        _id: string;
        username?: string | null;
        isGuest: boolean;
        avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
        profile?: {
          __typename?: 'UserProfile';
          displayName?: string | null;
          address?: {
            __typename?: 'Address';
            firstName?: string | null;
            lastName?: string | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type IPaymentProviderFragmentFragment = {
  __typename?: 'PaymentProvider';
  _id: string;
  created?: any | null;
  updated?: any | null;
  deleted?: any | null;
  isActive?: boolean | null;
  type?: IPaymentProviderType | null;
  configuration?: any | null;
  configurationError?: IPaymentProviderError | null;
  interface?: {
    __typename?: 'PaymentInterface';
    _id: string;
    label?: string | null;
    version?: string | null;
  } | null;
};

export type ICreatePaymentProviderMutationVariables = Exact<{
  paymentProvider: ICreatePaymentProviderInput;
}>;

export type ICreatePaymentProviderMutation = {
  __typename?: 'Mutation';
  createPaymentProvider: {
    __typename?: 'PaymentProvider';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    isActive?: boolean | null;
    type?: IPaymentProviderType | null;
    configuration?: any | null;
    configurationError?: IPaymentProviderError | null;
    interface?: {
      __typename?: 'PaymentInterface';
      _id: string;
      label?: string | null;
      version?: string | null;
    } | null;
  };
};

export type IPaymentInterfacesQueryVariables = Exact<{
  providerType: IPaymentProviderType;
}>;

export type IPaymentInterfacesQuery = {
  __typename?: 'Query';
  paymentInterfaces: Array<{
    __typename?: 'PaymentInterface';
    _id: string;
    label?: string | null;
    value: string;
  }>;
};

export type IPaymentProviderQueryVariables = Exact<{
  paymentProviderId: Scalars['ID']['input'];
}>;

export type IPaymentProviderQuery = {
  __typename?: 'Query';
  paymentProvider?: {
    __typename?: 'PaymentProvider';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    isActive?: boolean | null;
    type?: IPaymentProviderType | null;
    configuration?: any | null;
    configurationError?: IPaymentProviderError | null;
    interface?: {
      __typename?: 'PaymentInterface';
      _id: string;
      label?: string | null;
      version?: string | null;
    } | null;
  } | null;
};

export type IPaymentProvidersTypeQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IPaymentProvidersTypeQuery = {
  __typename?: 'Query';
  paymentProviderType?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label?: string | null;
    }> | null;
  } | null;
};

export type IPaymentProvidersQueryVariables = Exact<{
  type?: InputMaybe<IPaymentProviderType>;
}>;

export type IPaymentProvidersQuery = {
  __typename?: 'Query';
  paymentProviders: Array<{
    __typename?: 'PaymentProvider';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    isActive?: boolean | null;
    type?: IPaymentProviderType | null;
    configuration?: any | null;
    configurationError?: IPaymentProviderError | null;
    interface?: {
      __typename?: 'PaymentInterface';
      _id: string;
      label?: string | null;
      version?: string | null;
    } | null;
  }>;
};

export type IOrderPaymentStatusQueryVariables = Exact<{ [key: string]: never }>;

export type IOrderPaymentStatusQuery = {
  __typename?: 'Query';
  paymentStatusTypes?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label?: string | null;
    }> | null;
  } | null;
};

export type IRemovePaymentProviderMutationVariables = Exact<{
  paymentProviderId: Scalars['ID']['input'];
}>;

export type IRemovePaymentProviderMutation = {
  __typename?: 'Mutation';
  removePaymentProvider: { __typename?: 'PaymentProvider'; _id: string };
};

export type IUpdatePaymentProviderMutationVariables = Exact<{
  paymentProvider: IUpdateProviderInput;
  paymentProviderId: Scalars['ID']['input'];
}>;

export type IUpdatePaymentProviderMutation = {
  __typename?: 'Mutation';
  updatePaymentProvider: {
    __typename?: 'PaymentProvider';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    isActive?: boolean | null;
    type?: IPaymentProviderType | null;
    configuration?: any | null;
    configurationError?: IPaymentProviderError | null;
    interface?: {
      __typename?: 'PaymentInterface';
      _id: string;
      label?: string | null;
      version?: string | null;
    } | null;
  };
};

export type IProductReviewDetailFragmentFragment = {
  __typename?: 'ProductReview';
  _id: string;
  created?: any | null;
  updated?: any | null;
  deleted?: any | null;
  rating?: number | null;
  title?: string | null;
  review?: string | null;
  upVote?: number | null;
  downVote?: number | null;
  voteReport?: number | null;
  author: {
    __typename?: 'User';
    _id: string;
    username?: string | null;
    name: string;
    isGuest: boolean;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
      } | null;
    } | null;
    avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
  };
  product:
    | {
        __typename?: 'BundleProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          subtitle?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          subtitle?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          subtitle?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          subtitle?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          subtitle?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      };
  ownVotes: Array<{
    __typename?: 'ProductReviewVote';
    timestamp: any;
    type: IProductReviewVoteType;
  }>;
};

export type IProductReviewFragmentFragment = {
  __typename?: 'ProductReview';
  _id: string;
  created?: any | null;
  updated?: any | null;
  deleted?: any | null;
  rating?: number | null;
  title?: string | null;
  upVote?: number | null;
  downVote?: number | null;
  voteReport?: number | null;
  author: {
    __typename?: 'User';
    _id: string;
    username?: string | null;
    name: string;
    isGuest: boolean;
    profile?: {
      __typename?: 'UserProfile';
      displayName?: string | null;
      address?: {
        __typename?: 'Address';
        firstName?: string | null;
        lastName?: string | null;
      } | null;
    } | null;
    avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
  };
  product:
    | {
        __typename?: 'BundleProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          subtitle?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          subtitle?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          subtitle?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          subtitle?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          subtitle?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      };
};

export type IAddProductReviewVoteMutationVariables = Exact<{
  productReviewId: Scalars['ID']['input'];
  type: IProductReviewVoteType;
  meta?: InputMaybe<Scalars['JSON']['input']>;
}>;

export type IAddProductReviewVoteMutation = {
  __typename?: 'Mutation';
  addProductReviewVote: {
    __typename?: 'ProductReview';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    rating?: number | null;
    title?: string | null;
    review?: string | null;
    upVote?: number | null;
    downVote?: number | null;
    voteReport?: number | null;
    author: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      name: string;
      isGuest: boolean;
      profile?: {
        __typename?: 'UserProfile';
        displayName?: string | null;
        address?: {
          __typename?: 'Address';
          firstName?: string | null;
          lastName?: string | null;
        } | null;
      } | null;
      avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
    };
    product:
      | {
          __typename?: 'BundleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'ConfigurableProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'PlanProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'SimpleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'TokenizedProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        };
    ownVotes: Array<{
      __typename?: 'ProductReviewVote';
      timestamp: any;
      type: IProductReviewVoteType;
    }>;
  };
};

export type ICreateProductReviewMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  productReview: IProductReviewInput;
}>;

export type ICreateProductReviewMutation = {
  __typename?: 'Mutation';
  createProductReview: {
    __typename?: 'ProductReview';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    rating?: number | null;
    title?: string | null;
    review?: string | null;
    upVote?: number | null;
    downVote?: number | null;
    voteReport?: number | null;
    author: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      name: string;
      isGuest: boolean;
      profile?: {
        __typename?: 'UserProfile';
        displayName?: string | null;
        address?: {
          __typename?: 'Address';
          firstName?: string | null;
          lastName?: string | null;
        } | null;
      } | null;
      avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
    };
    product:
      | {
          __typename?: 'BundleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'ConfigurableProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'PlanProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'SimpleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'TokenizedProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        };
    ownVotes: Array<{
      __typename?: 'ProductReviewVote';
      timestamp: any;
      type: IProductReviewVoteType;
    }>;
  };
};

export type IProductReviewQueryVariables = Exact<{
  productReviewId: Scalars['ID']['input'];
}>;

export type IProductReviewQuery = {
  __typename?: 'Query';
  productReview: {
    __typename?: 'ProductReview';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    rating?: number | null;
    title?: string | null;
    review?: string | null;
    upVote?: number | null;
    downVote?: number | null;
    voteReport?: number | null;
    author: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      name: string;
      isGuest: boolean;
      profile?: {
        __typename?: 'UserProfile';
        displayName?: string | null;
        address?: {
          __typename?: 'Address';
          firstName?: string | null;
          lastName?: string | null;
        } | null;
      } | null;
      avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
    };
    product:
      | {
          __typename?: 'BundleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'ConfigurableProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'PlanProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'SimpleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'TokenizedProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        };
    ownVotes: Array<{
      __typename?: 'ProductReviewVote';
      timestamp: any;
      type: IProductReviewVoteType;
    }>;
  };
};

export type IProductReviewByProductQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
}>;

export type IProductReviewByProductQuery = {
  __typename?: 'Query';
  product?:
    | {
        __typename?: 'BundleProduct';
        _id: string;
        reviewsCount: number;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          updated?: any | null;
          deleted?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          upVote?: number | null;
          downVote?: number | null;
          voteReport?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            name: string;
            isGuest: boolean;
            profile?: {
              __typename?: 'UserProfile';
              displayName?: string | null;
              address?: {
                __typename?: 'Address';
                firstName?: string | null;
                lastName?: string | null;
              } | null;
            } | null;
            avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
          };
          product:
            | {
                __typename?: 'BundleProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'ConfigurableProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'PlanProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'SimpleProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'TokenizedProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            timestamp: any;
            type: IProductReviewVoteType;
          }>;
        }>;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        reviewsCount: number;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          updated?: any | null;
          deleted?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          upVote?: number | null;
          downVote?: number | null;
          voteReport?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            name: string;
            isGuest: boolean;
            profile?: {
              __typename?: 'UserProfile';
              displayName?: string | null;
              address?: {
                __typename?: 'Address';
                firstName?: string | null;
                lastName?: string | null;
              } | null;
            } | null;
            avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
          };
          product:
            | {
                __typename?: 'BundleProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'ConfigurableProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'PlanProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'SimpleProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'TokenizedProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            timestamp: any;
            type: IProductReviewVoteType;
          }>;
        }>;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        reviewsCount: number;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          updated?: any | null;
          deleted?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          upVote?: number | null;
          downVote?: number | null;
          voteReport?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            name: string;
            isGuest: boolean;
            profile?: {
              __typename?: 'UserProfile';
              displayName?: string | null;
              address?: {
                __typename?: 'Address';
                firstName?: string | null;
                lastName?: string | null;
              } | null;
            } | null;
            avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
          };
          product:
            | {
                __typename?: 'BundleProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'ConfigurableProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'PlanProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'SimpleProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'TokenizedProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            timestamp: any;
            type: IProductReviewVoteType;
          }>;
        }>;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        reviewsCount: number;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          updated?: any | null;
          deleted?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          upVote?: number | null;
          downVote?: number | null;
          voteReport?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            name: string;
            isGuest: boolean;
            profile?: {
              __typename?: 'UserProfile';
              displayName?: string | null;
              address?: {
                __typename?: 'Address';
                firstName?: string | null;
                lastName?: string | null;
              } | null;
            } | null;
            avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
          };
          product:
            | {
                __typename?: 'BundleProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'ConfigurableProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'PlanProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'SimpleProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'TokenizedProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            timestamp: any;
            type: IProductReviewVoteType;
          }>;
        }>;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        reviewsCount: number;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          updated?: any | null;
          deleted?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          upVote?: number | null;
          downVote?: number | null;
          voteReport?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            name: string;
            isGuest: boolean;
            profile?: {
              __typename?: 'UserProfile';
              displayName?: string | null;
              address?: {
                __typename?: 'Address';
                firstName?: string | null;
                lastName?: string | null;
              } | null;
            } | null;
            avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
          };
          product:
            | {
                __typename?: 'BundleProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'ConfigurableProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'PlanProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'SimpleProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'TokenizedProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  subtitle?: string | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            timestamp: any;
            type: IProductReviewVoteType;
          }>;
        }>;
      }
    | null;
};

export type IRemoveProductReviewMutationVariables = Exact<{
  productReviewId: Scalars['ID']['input'];
}>;

export type IRemoveProductReviewMutation = {
  __typename?: 'Mutation';
  removeProductReview: { __typename?: 'ProductReview'; _id: string };
};

export type IRemoveProductReviewVoteMutationVariables = Exact<{
  productReviewId: Scalars['ID']['input'];
  type: IProductReviewVoteType;
}>;

export type IRemoveProductReviewVoteMutation = {
  __typename?: 'Mutation';
  removeProductReviewVote: {
    __typename?: 'ProductReview';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    rating?: number | null;
    title?: string | null;
    review?: string | null;
    upVote?: number | null;
    downVote?: number | null;
    voteReport?: number | null;
    author: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      name: string;
      isGuest: boolean;
      profile?: {
        __typename?: 'UserProfile';
        displayName?: string | null;
        address?: {
          __typename?: 'Address';
          firstName?: string | null;
          lastName?: string | null;
        } | null;
      } | null;
      avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
    };
    product:
      | {
          __typename?: 'BundleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'ConfigurableProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'PlanProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'SimpleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'TokenizedProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        };
    ownVotes: Array<{
      __typename?: 'ProductReviewVote';
      timestamp: any;
      type: IProductReviewVoteType;
    }>;
  };
};

export type IUserProductReviewsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
}>;

export type IUserProductReviewsQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    _id: string;
    reviewsCount: number;
    reviews: Array<{
      __typename?: 'ProductReview';
      _id: string;
      created?: any | null;
      updated?: any | null;
      deleted?: any | null;
      rating?: number | null;
      title?: string | null;
      review?: string | null;
      upVote?: number | null;
      downVote?: number | null;
      voteReport?: number | null;
      product:
        | {
            __typename?: 'BundleProduct';
            _id: string;
            sequence: number;
            status: IProductStatus;
            tags?: Array<any> | null;
            updated?: any | null;
            published?: any | null;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              title?: string | null;
              subtitle?: string | null;
              slug?: string | null;
              description?: string | null;
              vendor?: string | null;
              brand?: string | null;
              labels?: Array<string> | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              tags?: Array<any> | null;
              file: { __typename?: 'Media'; _id: string; url: string };
            }>;
          }
        | {
            __typename?: 'ConfigurableProduct';
            _id: string;
            sequence: number;
            status: IProductStatus;
            tags?: Array<any> | null;
            updated?: any | null;
            published?: any | null;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              title?: string | null;
              subtitle?: string | null;
              slug?: string | null;
              description?: string | null;
              vendor?: string | null;
              brand?: string | null;
              labels?: Array<string> | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              tags?: Array<any> | null;
              file: { __typename?: 'Media'; _id: string; url: string };
            }>;
          }
        | {
            __typename?: 'PlanProduct';
            _id: string;
            sequence: number;
            status: IProductStatus;
            tags?: Array<any> | null;
            updated?: any | null;
            published?: any | null;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              title?: string | null;
              subtitle?: string | null;
              slug?: string | null;
              description?: string | null;
              vendor?: string | null;
              brand?: string | null;
              labels?: Array<string> | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              tags?: Array<any> | null;
              file: { __typename?: 'Media'; _id: string; url: string };
            }>;
          }
        | {
            __typename?: 'SimpleProduct';
            _id: string;
            sequence: number;
            status: IProductStatus;
            tags?: Array<any> | null;
            updated?: any | null;
            published?: any | null;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              title?: string | null;
              subtitle?: string | null;
              slug?: string | null;
              description?: string | null;
              vendor?: string | null;
              brand?: string | null;
              labels?: Array<string> | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              tags?: Array<any> | null;
              file: { __typename?: 'Media'; _id: string; url: string };
            }>;
          }
        | {
            __typename?: 'TokenizedProduct';
            _id: string;
            sequence: number;
            status: IProductStatus;
            tags?: Array<any> | null;
            updated?: any | null;
            published?: any | null;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              title?: string | null;
              subtitle?: string | null;
              slug?: string | null;
              description?: string | null;
              vendor?: string | null;
              brand?: string | null;
              labels?: Array<string> | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              tags?: Array<any> | null;
              file: { __typename?: 'Media'; _id: string; url: string };
            }>;
          };
      author: {
        __typename?: 'User';
        _id: string;
        username?: string | null;
        name: string;
        isGuest: boolean;
        profile?: {
          __typename?: 'UserProfile';
          displayName?: string | null;
          address?: {
            __typename?: 'Address';
            firstName?: string | null;
            lastName?: string | null;
          } | null;
        } | null;
        avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
      };
      ownVotes: Array<{
        __typename?: 'ProductReviewVote';
        timestamp: any;
        type: IProductReviewVoteType;
      }>;
    }>;
  } | null;
};

export type IProductAssignmentFragmentFragment = {
  __typename?: 'ProductVariationAssignment';
  _id: string;
  vectors?: Array<{
    __typename?: 'ProductVariationAssignmentVector';
    _id: string;
    option?: {
      __typename?: 'ProductVariationOption';
      _id: string;
      value?: string | null;
      texts?: {
        __typename?: 'ProductVariationTexts';
        _id: string;
        title?: string | null;
        subtitle?: string | null;
      } | null;
    } | null;
    variation?: {
      __typename?: 'ProductVariation';
      _id: string;
      key?: string | null;
      texts?: {
        __typename?: 'ProductVariationTexts';
        _id: string;
        locale?: string | null;
        title?: string | null;
      } | null;
    } | null;
  }> | null;
  product?:
    | {
        __typename?: 'BundleProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          slug?: string | null;
          subtitle?: string | null;
        } | null;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          slug?: string | null;
          subtitle?: string | null;
        } | null;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          slug?: string | null;
          subtitle?: string | null;
        } | null;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          slug?: string | null;
          subtitle?: string | null;
        } | null;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          slug?: string | null;
          subtitle?: string | null;
        } | null;
      }
    | null;
};

type IProductBriefFragment_BundleProduct_Fragment = {
  __typename?: 'BundleProduct';
  _id: string;
  sequence: number;
  status: IProductStatus;
  tags?: Array<any> | null;
  updated?: any | null;
  published?: any | null;
  texts?: {
    __typename?: 'ProductTexts';
    _id: string;
    slug?: string | null;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    vendor?: string | null;
    brand?: string | null;
    labels?: Array<string> | null;
  } | null;
  media: Array<{
    __typename?: 'ProductMedia';
    _id: string;
    tags?: Array<any> | null;
    file: { __typename?: 'Media'; _id: string; url: string };
  }>;
};

type IProductBriefFragment_ConfigurableProduct_Fragment = {
  __typename?: 'ConfigurableProduct';
  _id: string;
  sequence: number;
  status: IProductStatus;
  tags?: Array<any> | null;
  updated?: any | null;
  published?: any | null;
  texts?: {
    __typename?: 'ProductTexts';
    _id: string;
    slug?: string | null;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    vendor?: string | null;
    brand?: string | null;
    labels?: Array<string> | null;
  } | null;
  media: Array<{
    __typename?: 'ProductMedia';
    _id: string;
    tags?: Array<any> | null;
    file: { __typename?: 'Media'; _id: string; url: string };
  }>;
};

type IProductBriefFragment_PlanProduct_Fragment = {
  __typename?: 'PlanProduct';
  _id: string;
  sequence: number;
  status: IProductStatus;
  tags?: Array<any> | null;
  updated?: any | null;
  published?: any | null;
  texts?: {
    __typename?: 'ProductTexts';
    _id: string;
    slug?: string | null;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    vendor?: string | null;
    brand?: string | null;
    labels?: Array<string> | null;
  } | null;
  media: Array<{
    __typename?: 'ProductMedia';
    _id: string;
    tags?: Array<any> | null;
    file: { __typename?: 'Media'; _id: string; url: string };
  }>;
};

type IProductBriefFragment_SimpleProduct_Fragment = {
  __typename?: 'SimpleProduct';
  _id: string;
  sequence: number;
  status: IProductStatus;
  tags?: Array<any> | null;
  updated?: any | null;
  published?: any | null;
  texts?: {
    __typename?: 'ProductTexts';
    _id: string;
    slug?: string | null;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    vendor?: string | null;
    brand?: string | null;
    labels?: Array<string> | null;
  } | null;
  media: Array<{
    __typename?: 'ProductMedia';
    _id: string;
    tags?: Array<any> | null;
    file: { __typename?: 'Media'; _id: string; url: string };
  }>;
};

type IProductBriefFragment_TokenizedProduct_Fragment = {
  __typename?: 'TokenizedProduct';
  _id: string;
  sequence: number;
  status: IProductStatus;
  tags?: Array<any> | null;
  updated?: any | null;
  published?: any | null;
  texts?: {
    __typename?: 'ProductTexts';
    _id: string;
    slug?: string | null;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    vendor?: string | null;
    brand?: string | null;
    labels?: Array<string> | null;
  } | null;
  media: Array<{
    __typename?: 'ProductMedia';
    _id: string;
    tags?: Array<any> | null;
    file: { __typename?: 'Media'; _id: string; url: string };
  }>;
};

export type IProductBriefFragmentFragment =
  | IProductBriefFragment_BundleProduct_Fragment
  | IProductBriefFragment_ConfigurableProduct_Fragment
  | IProductBriefFragment_PlanProduct_Fragment
  | IProductBriefFragment_SimpleProduct_Fragment
  | IProductBriefFragment_TokenizedProduct_Fragment;

export type IProductCatalogPriceFragmentFragment = {
  __typename?: 'ProductCatalogPrice';
  _id: string;
  isTaxable: boolean;
  isNetPrice: boolean;
  amount: number;
  maxQuantity?: number | null;
  country: {
    __typename?: 'Country';
    _id: string;
    isoCode?: string | null;
    name?: string | null;
    flagEmoji?: string | null;
  };
  currency: {
    __typename?: 'Currency';
    _id: string;
    isoCode: string;
    isActive?: boolean | null;
  };
};

type IProductDetailFragment_BundleProduct_Fragment = {
  __typename?: 'BundleProduct';
  _id: string;
  sequence: number;
  status: IProductStatus;
  created?: any | null;
  tags?: Array<any> | null;
  updated?: any | null;
  published?: any | null;
  media: Array<{
    __typename?: 'ProductMedia';
    _id: string;
    tags?: Array<any> | null;
    file: { __typename?: 'Media'; _id: string; url: string };
  }>;
  reviews: Array<{
    __typename?: 'ProductReview';
    _id: string;
    created?: any | null;
    rating?: number | null;
    title?: string | null;
    review?: string | null;
    voteCount?: number | null;
    author: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      isGuest: boolean;
    };
    ownVotes: Array<{
      __typename?: 'ProductReviewVote';
      type: IProductReviewVoteType;
      timestamp: any;
    }>;
  }>;
  siblings: Array<
    | {
        __typename?: 'BundleProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
  >;
};

type IProductDetailFragment_ConfigurableProduct_Fragment = {
  __typename?: 'ConfigurableProduct';
  _id: string;
  sequence: number;
  status: IProductStatus;
  created?: any | null;
  tags?: Array<any> | null;
  updated?: any | null;
  published?: any | null;
  media: Array<{
    __typename?: 'ProductMedia';
    _id: string;
    tags?: Array<any> | null;
    file: { __typename?: 'Media'; _id: string; url: string };
  }>;
  reviews: Array<{
    __typename?: 'ProductReview';
    _id: string;
    created?: any | null;
    rating?: number | null;
    title?: string | null;
    review?: string | null;
    voteCount?: number | null;
    author: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      isGuest: boolean;
    };
    ownVotes: Array<{
      __typename?: 'ProductReviewVote';
      type: IProductReviewVoteType;
      timestamp: any;
    }>;
  }>;
  siblings: Array<
    | {
        __typename?: 'BundleProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
  >;
};

type IProductDetailFragment_PlanProduct_Fragment = {
  __typename?: 'PlanProduct';
  _id: string;
  sequence: number;
  status: IProductStatus;
  created?: any | null;
  tags?: Array<any> | null;
  updated?: any | null;
  published?: any | null;
  media: Array<{
    __typename?: 'ProductMedia';
    _id: string;
    tags?: Array<any> | null;
    file: { __typename?: 'Media'; _id: string; url: string };
  }>;
  reviews: Array<{
    __typename?: 'ProductReview';
    _id: string;
    created?: any | null;
    rating?: number | null;
    title?: string | null;
    review?: string | null;
    voteCount?: number | null;
    author: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      isGuest: boolean;
    };
    ownVotes: Array<{
      __typename?: 'ProductReviewVote';
      type: IProductReviewVoteType;
      timestamp: any;
    }>;
  }>;
  siblings: Array<
    | {
        __typename?: 'BundleProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
  >;
};

type IProductDetailFragment_SimpleProduct_Fragment = {
  __typename?: 'SimpleProduct';
  _id: string;
  sequence: number;
  status: IProductStatus;
  created?: any | null;
  tags?: Array<any> | null;
  updated?: any | null;
  published?: any | null;
  media: Array<{
    __typename?: 'ProductMedia';
    _id: string;
    tags?: Array<any> | null;
    file: { __typename?: 'Media'; _id: string; url: string };
  }>;
  reviews: Array<{
    __typename?: 'ProductReview';
    _id: string;
    created?: any | null;
    rating?: number | null;
    title?: string | null;
    review?: string | null;
    voteCount?: number | null;
    author: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      isGuest: boolean;
    };
    ownVotes: Array<{
      __typename?: 'ProductReviewVote';
      type: IProductReviewVoteType;
      timestamp: any;
    }>;
  }>;
  siblings: Array<
    | {
        __typename?: 'BundleProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
  >;
};

type IProductDetailFragment_TokenizedProduct_Fragment = {
  __typename?: 'TokenizedProduct';
  _id: string;
  sequence: number;
  status: IProductStatus;
  created?: any | null;
  tags?: Array<any> | null;
  updated?: any | null;
  published?: any | null;
  media: Array<{
    __typename?: 'ProductMedia';
    _id: string;
    tags?: Array<any> | null;
    file: { __typename?: 'Media'; _id: string; url: string };
  }>;
  reviews: Array<{
    __typename?: 'ProductReview';
    _id: string;
    created?: any | null;
    rating?: number | null;
    title?: string | null;
    review?: string | null;
    voteCount?: number | null;
    author: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      isGuest: boolean;
    };
    ownVotes: Array<{
      __typename?: 'ProductReviewVote';
      type: IProductReviewVoteType;
      timestamp: any;
    }>;
  }>;
  siblings: Array<
    | {
        __typename?: 'BundleProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
  >;
};

export type IProductDetailFragmentFragment =
  | IProductDetailFragment_BundleProduct_Fragment
  | IProductDetailFragment_ConfigurableProduct_Fragment
  | IProductDetailFragment_PlanProduct_Fragment
  | IProductDetailFragment_SimpleProduct_Fragment
  | IProductDetailFragment_TokenizedProduct_Fragment;

export type IProductDimensionFragmentFragment = {
  __typename?: 'Dimensions';
  weight?: number | null;
  length?: number | null;
  width?: number | null;
  height?: number | null;
};

export type IProductMediaFragmentFragment = {
  __typename?: 'ProductMedia';
  _id: string;
  tags?: Array<any> | null;
  sortKey: number;
  file: {
    __typename?: 'Media';
    _id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  };
  texts?: {
    __typename?: 'ProductMediaTexts';
    _id: string;
    locale?: string | null;
    title?: string | null;
    subtitle?: string | null;
  } | null;
};

export type IProductMediaTextsFragmentFragment = {
  __typename?: 'ProductMediaTexts';
  _id: string;
  locale?: string | null;
  title?: string | null;
  subtitle?: string | null;
};

export type IProductPlanConfigurationFragmentFragment = {
  __typename?: 'ProductPlanConfiguration';
  usageCalculationType: IProductPlanUsageCalculationType;
  billingInterval: IProductPlanConfigurationInterval;
  trialInterval?: IProductPlanConfigurationInterval | null;
  trialIntervalCount?: number | null;
  billingIntervalCount?: number | null;
};

export type IProductTextsFragmentFragment = {
  __typename?: 'ProductTexts';
  _id: string;
  locale?: string | null;
  slug?: string | null;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  vendor?: string | null;
  brand?: string | null;
  labels?: Array<string> | null;
};

export type IProductVariationFragmentFragment = {
  __typename?: 'ProductVariation';
  _id: string;
  type?: IProductVariationType | null;
  key?: string | null;
  texts?: {
    __typename?: 'ProductVariationTexts';
    _id: string;
    locale?: string | null;
    title?: string | null;
    subtitle?: string | null;
  } | null;
  options?: Array<{
    __typename?: 'ProductVariationOption';
    _id: string;
    value?: string | null;
    texts?: {
      __typename?: 'ProductVariationTexts';
      _id: string;
      locale?: string | null;
      title?: string | null;
      subtitle?: string | null;
    } | null;
  }> | null;
};

export type ITokenFragmentFragment = {
  __typename?: 'Token';
  _id: string;
  walletAddress?: string | null;
  status: ITokenExportStatus;
  quantity: number;
  contractAddress?: string | null;
  chainId?: string | null;
  chainTokenId?: string | null;
};

export type IAddProductAssignmentMutationVariables = Exact<{
  proxyId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  vectors: Array<IProductAssignmentVectorInput> | IProductAssignmentVectorInput;
}>;

export type IAddProductAssignmentMutation = {
  __typename?: 'Mutation';
  addProductAssignment:
    | { __typename?: 'BundleProduct'; _id: string }
    | { __typename?: 'ConfigurableProduct'; _id: string }
    | { __typename?: 'PlanProduct'; _id: string }
    | { __typename?: 'SimpleProduct'; _id: string }
    | { __typename?: 'TokenizedProduct'; _id: string };
};

export type IAddProductMediaMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  media: Scalars['Upload']['input'];
}>;

export type IAddProductMediaMutation = {
  __typename?: 'Mutation';
  addProductMedia: { __typename?: 'ProductMedia'; _id: string };
};

export type ICreateProductMutationVariables = Exact<{
  product: ICreateProductInput;
}>;

export type ICreateProductMutation = {
  __typename?: 'Mutation';
  createProduct:
    | {
        __typename?: 'BundleProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      };
};

export type ICreateProductBundleItemMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  item: ICreateProductBundleItemInput;
}>;

export type ICreateProductBundleItemMutation = {
  __typename?: 'Mutation';
  createProductBundleItem:
    | { __typename?: 'BundleProduct'; _id: string }
    | { __typename?: 'ConfigurableProduct'; _id: string }
    | { __typename?: 'PlanProduct'; _id: string }
    | { __typename?: 'SimpleProduct'; _id: string }
    | { __typename?: 'TokenizedProduct'; _id: string };
};

export type ICreateProductVariationMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  variation: ICreateProductVariationInput;
}>;

export type ICreateProductVariationMutation = {
  __typename?: 'Mutation';
  createProductVariation: { __typename?: 'ProductVariation'; _id: string };
};

export type ICreateProductVariationOptionMutationVariables = Exact<{
  productVariationId: Scalars['ID']['input'];
  option: ICreateProductVariationOptionInput;
}>;

export type ICreateProductVariationOptionMutation = {
  __typename?: 'Mutation';
  createProductVariationOption: {
    __typename?: 'ProductVariation';
    _id: string;
  };
};

export type IExportTokenMutationVariables = Exact<{
  tokenId: Scalars['ID']['input'];
  quantity?: Scalars['Int']['input'];
  recipientWalletAddress: Scalars['String']['input'];
}>;

export type IExportTokenMutation = {
  __typename?: 'Mutation';
  exportToken: {
    __typename?: 'Token';
    _id: string;
    walletAddress?: string | null;
    status: ITokenExportStatus;
    quantity: number;
    contractAddress?: string | null;
    chainId?: string | null;
    chainTokenId?: string | null;
  };
};

export type IProductQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductQuery = {
  __typename?: 'Query';
  product?:
    | {
        __typename?: 'BundleProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          subtitle?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          subtitle?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          subtitle?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          title?: string | null;
          subtitle?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | null;
};

export type IProductAssignmentsQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductAssignmentsQuery = {
  __typename?: 'Query';
  product?:
    | { __typename?: 'BundleProduct'; _id: string }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          subtitle?: string | null;
          slug?: string | null;
          title?: string | null;
        } | null;
        variations?: Array<{
          __typename?: 'ProductVariation';
          _id: string;
          key?: string | null;
          texts?: {
            __typename?: 'ProductVariationTexts';
            _id: string;
            title?: string | null;
          } | null;
          options?: Array<{
            __typename?: 'ProductVariationOption';
            _id: string;
            value?: string | null;
            texts?: {
              __typename?: 'ProductVariationTexts';
              _id: string;
              title?: string | null;
            } | null;
          }> | null;
        }> | null;
        assignments: Array<{
          __typename?: 'ProductVariationAssignment';
          _id: string;
          vectors?: Array<{
            __typename?: 'ProductVariationAssignmentVector';
            _id: string;
            option?: {
              __typename?: 'ProductVariationOption';
              _id: string;
              value?: string | null;
              texts?: {
                __typename?: 'ProductVariationTexts';
                _id: string;
                title?: string | null;
                subtitle?: string | null;
              } | null;
            } | null;
            variation?: {
              __typename?: 'ProductVariation';
              _id: string;
              key?: string | null;
              texts?: {
                __typename?: 'ProductVariationTexts';
                _id: string;
                locale?: string | null;
                title?: string | null;
              } | null;
            } | null;
          }> | null;
          product?:
            | {
                __typename?: 'BundleProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  slug?: string | null;
                  subtitle?: string | null;
                } | null;
              }
            | {
                __typename?: 'ConfigurableProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  slug?: string | null;
                  subtitle?: string | null;
                } | null;
              }
            | {
                __typename?: 'PlanProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  slug?: string | null;
                  subtitle?: string | null;
                } | null;
              }
            | {
                __typename?: 'SimpleProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  slug?: string | null;
                  subtitle?: string | null;
                } | null;
              }
            | {
                __typename?: 'TokenizedProduct';
                _id: string;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  title?: string | null;
                  slug?: string | null;
                  subtitle?: string | null;
                } | null;
              }
            | null;
        }>;
      }
    | { __typename?: 'PlanProduct'; _id: string }
    | { __typename?: 'SimpleProduct'; _id: string }
    | { __typename?: 'TokenizedProduct'; _id: string }
    | null;
};

export type IProductBundleItemsQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductBundleItemsQuery = {
  __typename?: 'Query';
  product?:
    | {
        __typename?: 'BundleProduct';
        _id: string;
        bundleItems?: Array<{
          __typename?: 'ProductBundleItem';
          quantity: number;
          product:
            | {
                __typename?: 'BundleProduct';
                _id: string;
                sequence: number;
                status: IProductStatus;
                tags?: Array<any> | null;
                updated?: any | null;
                published?: any | null;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  slug?: string | null;
                  title?: string | null;
                  subtitle?: string | null;
                  description?: string | null;
                  vendor?: string | null;
                  brand?: string | null;
                  labels?: Array<string> | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  tags?: Array<any> | null;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'ConfigurableProduct';
                _id: string;
                sequence: number;
                status: IProductStatus;
                tags?: Array<any> | null;
                updated?: any | null;
                published?: any | null;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  slug?: string | null;
                  title?: string | null;
                  subtitle?: string | null;
                  description?: string | null;
                  vendor?: string | null;
                  brand?: string | null;
                  labels?: Array<string> | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  tags?: Array<any> | null;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'PlanProduct';
                _id: string;
                sequence: number;
                status: IProductStatus;
                tags?: Array<any> | null;
                updated?: any | null;
                published?: any | null;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  slug?: string | null;
                  title?: string | null;
                  subtitle?: string | null;
                  description?: string | null;
                  vendor?: string | null;
                  brand?: string | null;
                  labels?: Array<string> | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  tags?: Array<any> | null;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'SimpleProduct';
                _id: string;
                sequence: number;
                status: IProductStatus;
                tags?: Array<any> | null;
                updated?: any | null;
                published?: any | null;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  slug?: string | null;
                  title?: string | null;
                  subtitle?: string | null;
                  description?: string | null;
                  vendor?: string | null;
                  brand?: string | null;
                  labels?: Array<string> | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  tags?: Array<any> | null;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              }
            | {
                __typename?: 'TokenizedProduct';
                _id: string;
                sequence: number;
                status: IProductStatus;
                tags?: Array<any> | null;
                updated?: any | null;
                published?: any | null;
                texts?: {
                  __typename?: 'ProductTexts';
                  _id: string;
                  slug?: string | null;
                  title?: string | null;
                  subtitle?: string | null;
                  description?: string | null;
                  vendor?: string | null;
                  brand?: string | null;
                  labels?: Array<string> | null;
                } | null;
                media: Array<{
                  __typename?: 'ProductMedia';
                  _id: string;
                  tags?: Array<any> | null;
                  file: { __typename?: 'Media'; _id: string; url: string };
                }>;
              };
        }> | null;
      }
    | { __typename?: 'ConfigurableProduct'; _id: string }
    | { __typename?: 'PlanProduct'; _id: string }
    | { __typename?: 'SimpleProduct'; _id: string }
    | { __typename?: 'TokenizedProduct'; _id: string }
    | null;
};

export type IProductCatalogPricesQueryVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type IProductCatalogPricesQuery = {
  __typename?: 'Query';
  productCatalogPrices: Array<{
    __typename?: 'ProductCatalogPrice';
    _id: string;
    isTaxable: boolean;
    isNetPrice: boolean;
    amount: number;
    maxQuantity?: number | null;
    country: {
      __typename?: 'Country';
      _id: string;
      isoCode?: string | null;
      name?: string | null;
      flagEmoji?: string | null;
    };
    currency: {
      __typename?: 'Currency';
      _id: string;
      isoCode: string;
      isActive?: boolean | null;
    };
  }>;
};

export type IProductDimensionUnitsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IProductDimensionUnitsQuery = {
  __typename?: 'Query';
  massUnits?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label?: string | null;
    }> | null;
  } | null;
  lengthUnits?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label?: string | null;
    }> | null;
  } | null;
};

export type IProductMediaQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductMediaQuery = {
  __typename?: 'Query';
  product?:
    | {
        __typename?: 'BundleProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          sortKey: number;
          file: {
            __typename?: 'Media';
            _id: string;
            name: string;
            type: string;
            size: number;
            url: string;
          };
          texts?: {
            __typename?: 'ProductMediaTexts';
            _id: string;
            locale?: string | null;
            title?: string | null;
            subtitle?: string | null;
          } | null;
        }>;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          sortKey: number;
          file: {
            __typename?: 'Media';
            _id: string;
            name: string;
            type: string;
            size: number;
            url: string;
          };
          texts?: {
            __typename?: 'ProductMediaTexts';
            _id: string;
            locale?: string | null;
            title?: string | null;
            subtitle?: string | null;
          } | null;
        }>;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          sortKey: number;
          file: {
            __typename?: 'Media';
            _id: string;
            name: string;
            type: string;
            size: number;
            url: string;
          };
          texts?: {
            __typename?: 'ProductMediaTexts';
            _id: string;
            locale?: string | null;
            title?: string | null;
            subtitle?: string | null;
          } | null;
        }>;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          sortKey: number;
          file: {
            __typename?: 'Media';
            _id: string;
            name: string;
            type: string;
            size: number;
            url: string;
          };
          texts?: {
            __typename?: 'ProductMediaTexts';
            _id: string;
            locale?: string | null;
            title?: string | null;
            subtitle?: string | null;
          } | null;
        }>;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          sortKey: number;
          file: {
            __typename?: 'Media';
            _id: string;
            name: string;
            type: string;
            size: number;
            url: string;
          };
          texts?: {
            __typename?: 'ProductMediaTexts';
            _id: string;
            locale?: string | null;
            title?: string | null;
            subtitle?: string | null;
          } | null;
        }>;
      }
    | null;
};

export type IProductPlanQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductPlanQuery = {
  __typename?: 'Query';
  product?:
    | { __typename?: 'BundleProduct'; _id: string }
    | { __typename?: 'ConfigurableProduct'; _id: string }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        plan?: {
          __typename?: 'ProductPlanConfiguration';
          usageCalculationType: IProductPlanUsageCalculationType;
          billingInterval: IProductPlanConfigurationInterval;
          trialInterval?: IProductPlanConfigurationInterval | null;
          trialIntervalCount?: number | null;
          billingIntervalCount?: number | null;
        } | null;
      }
    | { __typename?: 'SimpleProduct'; _id: string }
    | { __typename?: 'TokenizedProduct'; _id: string }
    | null;
};

export type IProductPlanConfigurationOptionsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IProductPlanConfigurationOptionsQuery = {
  __typename?: 'Query';
  usageCalculationTypes?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label?: string | null;
    }> | null;
  } | null;
  configurationIntervals?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label?: string | null;
    }> | null;
  } | null;
};

export type IProductReviewsQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
}>;

export type IProductReviewsQuery = {
  __typename?: 'Query';
  productReviews: Array<{
    __typename?: 'ProductReview';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    rating?: number | null;
    title?: string | null;
    review?: string | null;
    upVote?: number | null;
    downVote?: number | null;
    voteReport?: number | null;
    author: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      name: string;
      isGuest: boolean;
      profile?: {
        __typename?: 'UserProfile';
        displayName?: string | null;
        address?: {
          __typename?: 'Address';
          firstName?: string | null;
          lastName?: string | null;
        } | null;
      } | null;
      avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
    };
    product:
      | {
          __typename?: 'BundleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'ConfigurableProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'PlanProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'SimpleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'TokenizedProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        };
    ownVotes: Array<{
      __typename?: 'ProductReviewVote';
      timestamp: any;
      type: IProductReviewVoteType;
    }>;
  }>;
};

export type IProductSupplyQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductSupplyQuery = {
  __typename?: 'Query';
  product?:
    | { __typename?: 'BundleProduct'; _id: string }
    | { __typename?: 'ConfigurableProduct'; _id: string }
    | { __typename?: 'PlanProduct'; _id: string }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        dimensions?: {
          __typename?: 'Dimensions';
          weight?: number | null;
          length?: number | null;
          width?: number | null;
          height?: number | null;
        } | null;
      }
    | { __typename?: 'TokenizedProduct'; _id: string }
    | null;
};

export type IProductTokenizationQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductTokenizationQuery = {
  __typename?: 'Query';
  product?:
    | { __typename?: 'BundleProduct'; _id: string }
    | { __typename?: 'ConfigurableProduct'; _id: string }
    | { __typename?: 'PlanProduct'; _id: string }
    | { __typename?: 'SimpleProduct'; _id: string }
    | {
        __typename?: 'TokenizedProduct';
        contractStandard?: ISmartContractStandard | null;
        contractAddress?: string | null;
        _id: string;
        contractConfiguration?: {
          __typename?: 'ContractConfiguration';
          tokenId: string;
          supply: number;
        } | null;
      }
    | null;
};

export type IProductVariationTypeQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IProductVariationTypeQuery = {
  __typename?: 'Query';
  variationTypes?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label?: string | null;
    }> | null;
  } | null;
};

export type IProductVariationsQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductVariationsQuery = {
  __typename?: 'Query';
  product?:
    | { __typename?: 'BundleProduct'; _id: string }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        variations?: Array<{
          __typename?: 'ProductVariation';
          _id: string;
          type?: IProductVariationType | null;
          key?: string | null;
          texts?: {
            __typename?: 'ProductVariationTexts';
            _id: string;
            locale?: string | null;
            title?: string | null;
            subtitle?: string | null;
          } | null;
          options?: Array<{
            __typename?: 'ProductVariationOption';
            _id: string;
            value?: string | null;
            texts?: {
              __typename?: 'ProductVariationTexts';
              _id: string;
              locale?: string | null;
              title?: string | null;
              subtitle?: string | null;
            } | null;
          }> | null;
        }> | null;
      }
    | { __typename?: 'PlanProduct'; _id: string }
    | { __typename?: 'SimpleProduct'; _id: string }
    | { __typename?: 'TokenizedProduct'; _id: string }
    | null;
};

export type IProductWarehousingQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductWarehousingQuery = {
  __typename?: 'Query';
  product?:
    | { __typename?: 'BundleProduct'; _id: string }
    | { __typename?: 'ConfigurableProduct'; _id: string }
    | { __typename?: 'PlanProduct'; _id: string }
    | {
        __typename?: 'SimpleProduct';
        sku?: string | null;
        baseUnit?: string | null;
        _id: string;
      }
    | { __typename?: 'TokenizedProduct'; _id: string }
    | null;
};

export type IProductsQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<
    | Array<Scalars['LowerCaseString']['input']>
    | Scalars['LowerCaseString']['input']
  >;
  slugs?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  includeDrafts?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
}>;

export type IProductsQuery = {
  __typename?: 'Query';
  productsCount: number;
  products: Array<
    | {
        __typename?: 'BundleProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          title?: string | null;
          subtitle?: string | null;
          description?: string | null;
          vendor?: string | null;
          brand?: string | null;
          labels?: Array<string> | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          title?: string | null;
          subtitle?: string | null;
          description?: string | null;
          vendor?: string | null;
          brand?: string | null;
          labels?: Array<string> | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          title?: string | null;
          subtitle?: string | null;
          description?: string | null;
          vendor?: string | null;
          brand?: string | null;
          labels?: Array<string> | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          title?: string | null;
          subtitle?: string | null;
          description?: string | null;
          vendor?: string | null;
          brand?: string | null;
          labels?: Array<string> | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          title?: string | null;
          subtitle?: string | null;
          description?: string | null;
          vendor?: string | null;
          brand?: string | null;
          labels?: Array<string> | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      }
  >;
};

export type IProductsCountQueryVariables = Exact<{ [key: string]: never }>;

export type IProductsCountQuery = {
  __typename?: 'Query';
  productsCount: number;
};

export type IPublishProductMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type IPublishProductMutation = {
  __typename?: 'Mutation';
  publishProduct:
    | {
        __typename?: 'BundleProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      };
};

export type IReOrderProductMediaMutationVariables = Exact<{
  sortKeys: Array<IReorderProductMediaInput> | IReorderProductMediaInput;
}>;

export type IReOrderProductMediaMutation = {
  __typename?: 'Mutation';
  reorderProductMedia: Array<{ __typename?: 'ProductMedia'; _id: string }>;
};

export type IRemoveBundleItemMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  index: Scalars['Int']['input'];
}>;

export type IRemoveBundleItemMutation = {
  __typename?: 'Mutation';
  removeBundleItem:
    | { __typename?: 'BundleProduct'; _id: string }
    | { __typename?: 'ConfigurableProduct'; _id: string }
    | { __typename?: 'PlanProduct'; _id: string }
    | { __typename?: 'SimpleProduct'; _id: string }
    | { __typename?: 'TokenizedProduct'; _id: string };
};

export type IRemoveProductMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type IRemoveProductMutation = {
  __typename?: 'Mutation';
  removeProduct:
    | { __typename?: 'BundleProduct'; _id: string }
    | { __typename?: 'ConfigurableProduct'; _id: string }
    | { __typename?: 'PlanProduct'; _id: string }
    | { __typename?: 'SimpleProduct'; _id: string }
    | { __typename?: 'TokenizedProduct'; _id: string };
};

export type IRemoveProductAssignmentMutationVariables = Exact<{
  proxyId: Scalars['ID']['input'];
  vectors: Array<IProductAssignmentVectorInput> | IProductAssignmentVectorInput;
}>;

export type IRemoveProductAssignmentMutation = {
  __typename?: 'Mutation';
  removeProductAssignment:
    | { __typename?: 'BundleProduct'; _id: string }
    | { __typename?: 'ConfigurableProduct'; _id: string }
    | { __typename?: 'PlanProduct'; _id: string }
    | { __typename?: 'SimpleProduct'; _id: string }
    | { __typename?: 'TokenizedProduct'; _id: string };
};

export type IRemoveProductMediaMutationVariables = Exact<{
  productMediaId: Scalars['ID']['input'];
}>;

export type IRemoveProductMediaMutation = {
  __typename?: 'Mutation';
  removeProductMedia: { __typename?: 'ProductMedia'; _id: string };
};

export type IRemoveProductVariationMutationVariables = Exact<{
  productVariationId: Scalars['ID']['input'];
}>;

export type IRemoveProductVariationMutation = {
  __typename?: 'Mutation';
  removeProductVariation: { __typename?: 'ProductVariation'; _id: string };
};

export type IRemoveProductVariationOptionMutationVariables = Exact<{
  productVariationId: Scalars['ID']['input'];
  productVariationOptionValue: Scalars['String']['input'];
}>;

export type IRemoveProductVariationOptionMutation = {
  __typename?: 'Mutation';
  removeProductVariationOption: {
    __typename?: 'ProductVariation';
    _id: string;
  };
};

export type ISearchProductsQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  filterQuery?: InputMaybe<Array<IFilterQueryInput> | IFilterQueryInput>;
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  orderBy?: InputMaybe<ISearchOrderBy>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  ignoreChildAssortments?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;

export type ISearchProductsQuery = {
  __typename?: 'Query';
  searchProducts: {
    __typename?: 'ProductSearchResult';
    productsCount: number;
    filteredProductsCount: number;
    products: Array<
      | {
          __typename?: 'BundleProduct';
          _id: string;
          sequence: number;
          status: IProductStatus;
          tags?: Array<any> | null;
          updated?: any | null;
          published?: any | null;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            title?: string | null;
            subtitle?: string | null;
            description?: string | null;
            vendor?: string | null;
            brand?: string | null;
            labels?: Array<string> | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            tags?: Array<any> | null;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'ConfigurableProduct';
          _id: string;
          sequence: number;
          status: IProductStatus;
          tags?: Array<any> | null;
          updated?: any | null;
          published?: any | null;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            title?: string | null;
            subtitle?: string | null;
            description?: string | null;
            vendor?: string | null;
            brand?: string | null;
            labels?: Array<string> | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            tags?: Array<any> | null;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'PlanProduct';
          _id: string;
          sequence: number;
          status: IProductStatus;
          tags?: Array<any> | null;
          updated?: any | null;
          published?: any | null;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            title?: string | null;
            subtitle?: string | null;
            description?: string | null;
            vendor?: string | null;
            brand?: string | null;
            labels?: Array<string> | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            tags?: Array<any> | null;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'SimpleProduct';
          _id: string;
          sequence: number;
          status: IProductStatus;
          tags?: Array<any> | null;
          updated?: any | null;
          published?: any | null;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            title?: string | null;
            subtitle?: string | null;
            description?: string | null;
            vendor?: string | null;
            brand?: string | null;
            labels?: Array<string> | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            tags?: Array<any> | null;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
      | {
          __typename?: 'TokenizedProduct';
          _id: string;
          sequence: number;
          status: IProductStatus;
          tags?: Array<any> | null;
          updated?: any | null;
          published?: any | null;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            title?: string | null;
            subtitle?: string | null;
            description?: string | null;
            vendor?: string | null;
            brand?: string | null;
            labels?: Array<string> | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            tags?: Array<any> | null;
            file: { __typename?: 'Media'; _id: string; url: string };
          }>;
        }
    >;
  };
};

export type ISmartContractStandardsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type ISmartContractStandardsQuery = {
  __typename?: 'Query';
  smartContractStandards?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label: string;
    }> | null;
  } | null;
};

export type ITranslatedProductMediaTextsQueryVariables = Exact<{
  productMediaId: Scalars['ID']['input'];
}>;

export type ITranslatedProductMediaTextsQuery = {
  __typename?: 'Query';
  translatedProductMediaTexts: Array<{
    __typename?: 'ProductMediaTexts';
    _id: string;
    locale?: string | null;
    title?: string | null;
    subtitle?: string | null;
  }>;
};

export type ITranslatedProductTextsQueryVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type ITranslatedProductTextsQuery = {
  __typename?: 'Query';
  translatedProductTexts: Array<{
    __typename?: 'ProductTexts';
    _id: string;
    locale?: string | null;
    slug?: string | null;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    vendor?: string | null;
    brand?: string | null;
    labels?: Array<string> | null;
  }>;
};

export type ITranslatedProductVariationTextsQueryVariables = Exact<{
  productVariationId: Scalars['ID']['input'];
  productVariationOptionValue?: InputMaybe<Scalars['String']['input']>;
}>;

export type ITranslatedProductVariationTextsQuery = {
  __typename?: 'Query';
  translatedProductVariationTexts: Array<{
    __typename?: 'ProductVariationTexts';
    _id: string;
    locale?: string | null;
    title?: string | null;
    subtitle?: string | null;
  }>;
};

export type IUnpublishProductMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type IUnpublishProductMutation = {
  __typename?: 'Mutation';
  unpublishProduct:
    | {
        __typename?: 'BundleProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      };
};

export type IUpdateProductMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  product: IUpdateProductInput;
}>;

export type IUpdateProductMutation = {
  __typename?: 'Mutation';
  updateProduct?:
    | {
        __typename?: 'BundleProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | null;
};

export type IUpdateProductCommerceMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  commerce: IUpdateProductCommerceInput;
}>;

export type IUpdateProductCommerceMutation = {
  __typename?: 'Mutation';
  updateProductCommerce?:
    | {
        __typename?: 'BundleProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        created?: any | null;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
        reviews: Array<{
          __typename?: 'ProductReview';
          _id: string;
          created?: any | null;
          rating?: number | null;
          title?: string | null;
          review?: string | null;
          voteCount?: number | null;
          author: {
            __typename?: 'User';
            _id: string;
            username?: string | null;
            isGuest: boolean;
          };
          ownVotes: Array<{
            __typename?: 'ProductReviewVote';
            type: IProductReviewVoteType;
            timestamp: any;
          }>;
        }>;
        siblings: Array<
          | {
              __typename?: 'BundleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'ConfigurableProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'PlanProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'SimpleProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
          | {
              __typename?: 'TokenizedProduct';
              _id: string;
              media: Array<{
                __typename?: 'ProductMedia';
                _id: string;
                file: { __typename?: 'Media'; _id: string; url: string };
              }>;
            }
        >;
      }
    | null;
};

export type IUpdateProductMediaTextsMutationVariables = Exact<{
  productMediaId: Scalars['ID']['input'];
  texts: Array<IUpdateProductMediaTextInput> | IUpdateProductMediaTextInput;
}>;

export type IUpdateProductMediaTextsMutation = {
  __typename?: 'Mutation';
  updateProductMediaTexts: Array<{
    __typename?: 'ProductMediaTexts';
    _id: string;
    locale?: string | null;
    title?: string | null;
    subtitle?: string | null;
  }>;
};

export type IUpdateProductPlanMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  plan: IUpdateProductPlanInput;
}>;

export type IUpdateProductPlanMutation = {
  __typename?: 'Mutation';
  updateProductPlan?:
    | { __typename?: 'BundleProduct'; _id: string }
    | { __typename?: 'ConfigurableProduct'; _id: string }
    | { __typename?: 'PlanProduct'; _id: string }
    | { __typename?: 'SimpleProduct'; _id: string }
    | { __typename?: 'TokenizedProduct'; _id: string }
    | null;
};

export type IUpdateProductSupplyMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  supply: IUpdateProductSupplyInput;
}>;

export type IUpdateProductSupplyMutation = {
  __typename?: 'Mutation';
  updateProductSupply?:
    | { __typename?: 'BundleProduct'; _id: string }
    | { __typename?: 'ConfigurableProduct'; _id: string }
    | { __typename?: 'PlanProduct'; _id: string }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        dimensions?: {
          __typename?: 'Dimensions';
          weight?: number | null;
          length?: number | null;
          width?: number | null;
          height?: number | null;
        } | null;
      }
    | { __typename?: 'TokenizedProduct'; _id: string }
    | null;
};

export type IUpdateProductTextsMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  texts: Array<IUpdateProductTextInput> | IUpdateProductTextInput;
}>;

export type IUpdateProductTextsMutation = {
  __typename?: 'Mutation';
  updateProductTexts: Array<{
    __typename?: 'ProductTexts';
    _id: string;
    locale?: string | null;
    slug?: string | null;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    vendor?: string | null;
    brand?: string | null;
    labels?: Array<string> | null;
  }>;
};

export type IUpdateProductTokenizationMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  tokenization: IUpdateProductTokenizationInput;
}>;

export type IUpdateProductTokenizationMutation = {
  __typename?: 'Mutation';
  updateProductTokenization?: {
    __typename?: 'TokenizedProduct';
    _id: string;
  } | null;
};

export type IUpdateProductVariationTextsMutationVariables = Exact<{
  productVariationId: Scalars['ID']['input'];
  productVariationOptionValue?: InputMaybe<Scalars['String']['input']>;
  texts:
    | Array<IUpdateProductVariationTextInput>
    | IUpdateProductVariationTextInput;
}>;

export type IUpdateProductVariationTextsMutation = {
  __typename?: 'Mutation';
  updateProductVariationTexts: Array<{
    __typename?: 'ProductVariationTexts';
    _id: string;
  }>;
};

export type IUpdateProductWarehousingMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  warehousing: IUpdateProductWarehousingInput;
}>;

export type IUpdateProductWarehousingMutation = {
  __typename?: 'Mutation';
  updateProductWarehousing?:
    | { __typename?: 'BundleProduct'; _id: string }
    | { __typename?: 'ConfigurableProduct'; _id: string }
    | { __typename?: 'PlanProduct'; _id: string }
    | {
        __typename?: 'SimpleProduct';
        sku?: string | null;
        baseUnit?: string | null;
        _id: string;
      }
    | { __typename?: 'TokenizedProduct'; _id: string }
    | null;
};

export type IUserTokensQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;

export type IUserTokensQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    _id: string;
    web3Addresses: Array<{
      __typename?: 'Web3Address';
      address: string;
      nonce?: number | null;
      verified: boolean;
    }>;
    tokens: Array<{
      __typename?: 'Token';
      _id: string;
      walletAddress?: string | null;
      status: ITokenExportStatus;
      quantity: number;
      contractAddress?: string | null;
      chainId?: string | null;
      chainTokenId?: string | null;
      product: {
        __typename?: 'TokenizedProduct';
        _id: string;
        sequence: number;
        status: IProductStatus;
        tags?: Array<any> | null;
        updated?: any | null;
        published?: any | null;
        simulatedPrice?: {
          __typename?: 'Price';
          _id: string;
          amount: number;
          currency: string;
        } | null;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          title?: string | null;
          subtitle?: string | null;
          description?: string | null;
          vendor?: string | null;
          brand?: string | null;
          labels?: Array<string> | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          tags?: Array<any> | null;
          file: { __typename?: 'Media'; _id: string; url: string };
        }>;
      };
    }>;
  } | null;
};

export type IQuotationDetailFragmentFragment = {
  __typename?: 'Quotation';
  _id: string;
  status: IQuotationStatus;
  created: any;
  expires?: any | null;
  updated?: any | null;
  isExpired?: boolean | null;
  quotationNumber?: string | null;
  fullfilled?: any | null;
  rejected?: any | null;
  user: {
    __typename?: 'User';
    _id: string;
    username?: string | null;
    name: string;
    avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  };
  configuration?: Array<{
    __typename?: 'ProductConfigurationParameter';
    key: string;
    value: string;
  }> | null;
  country?: {
    __typename?: 'Country';
    _id: string;
    isoCode?: string | null;
    flagEmoji?: string | null;
    name?: string | null;
  } | null;
  currency?: {
    __typename?: 'Currency';
    _id: string;
    isoCode: string;
    isActive?: boolean | null;
  } | null;
  product:
    | {
        __typename?: 'BundleProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          subtitle?: string | null;
          title?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: {
            __typename?: 'Media';
            _id: string;
            type: string;
            url: string;
          };
        }>;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          subtitle?: string | null;
          title?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: {
            __typename?: 'Media';
            _id: string;
            type: string;
            url: string;
          };
        }>;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          subtitle?: string | null;
          title?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: {
            __typename?: 'Media';
            _id: string;
            type: string;
            url: string;
          };
        }>;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          subtitle?: string | null;
          title?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: {
            __typename?: 'Media';
            _id: string;
            type: string;
            url: string;
          };
        }>;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          subtitle?: string | null;
          title?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: {
            __typename?: 'Media';
            _id: string;
            type: string;
            url: string;
          };
        }>;
      };
};

export type IQuotationFragmentFragment = {
  __typename?: 'Quotation';
  _id: string;
  status: IQuotationStatus;
  created: any;
  expires?: any | null;
  updated?: any | null;
  isExpired?: boolean | null;
  quotationNumber?: string | null;
  fullfilled?: any | null;
  rejected?: any | null;
  user: {
    __typename?: 'User';
    _id: string;
    username?: string | null;
    name: string;
    avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
    primaryEmail?: {
      __typename?: 'UserEmail';
      verified: boolean;
      address: string;
    } | null;
  };
  product:
    | {
        __typename?: 'BundleProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          subtitle?: string | null;
          title?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: {
            __typename?: 'Media';
            _id: string;
            type: string;
            url: string;
          };
        }>;
      }
    | {
        __typename?: 'ConfigurableProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          subtitle?: string | null;
          title?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: {
            __typename?: 'Media';
            _id: string;
            type: string;
            url: string;
          };
        }>;
      }
    | {
        __typename?: 'PlanProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          subtitle?: string | null;
          title?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: {
            __typename?: 'Media';
            _id: string;
            type: string;
            url: string;
          };
        }>;
      }
    | {
        __typename?: 'SimpleProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          subtitle?: string | null;
          title?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: {
            __typename?: 'Media';
            _id: string;
            type: string;
            url: string;
          };
        }>;
      }
    | {
        __typename?: 'TokenizedProduct';
        _id: string;
        texts?: {
          __typename?: 'ProductTexts';
          _id: string;
          slug?: string | null;
          subtitle?: string | null;
          title?: string | null;
          description?: string | null;
        } | null;
        media: Array<{
          __typename?: 'ProductMedia';
          _id: string;
          file: {
            __typename?: 'Media';
            _id: string;
            type: string;
            url: string;
          };
        }>;
      };
  currency?: {
    __typename?: 'Currency';
    _id: string;
    contractAddress?: string | null;
    decimals?: number | null;
    isoCode: string;
  } | null;
};

export type IMakeQuotationProposalMutationVariables = Exact<{
  quotationId: Scalars['ID']['input'];
  quotationContext?: InputMaybe<Scalars['JSON']['input']>;
}>;

export type IMakeQuotationProposalMutation = {
  __typename?: 'Mutation';
  makeQuotationProposal: {
    __typename?: 'Quotation';
    _id: string;
    status: IQuotationStatus;
    created: any;
    expires?: any | null;
    updated?: any | null;
    isExpired?: boolean | null;
    quotationNumber?: string | null;
    fullfilled?: any | null;
    rejected?: any | null;
    user: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      name: string;
      avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
      primaryEmail?: {
        __typename?: 'UserEmail';
        verified: boolean;
        address: string;
      } | null;
    };
    configuration?: Array<{
      __typename?: 'ProductConfigurationParameter';
      key: string;
      value: string;
    }> | null;
    country?: {
      __typename?: 'Country';
      _id: string;
      isoCode?: string | null;
      flagEmoji?: string | null;
      name?: string | null;
    } | null;
    currency?: {
      __typename?: 'Currency';
      _id: string;
      isoCode: string;
      isActive?: boolean | null;
    } | null;
    product:
      | {
          __typename?: 'BundleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'ConfigurableProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'PlanProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'SimpleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'TokenizedProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        };
  };
};

export type IQuotationQueryVariables = Exact<{
  quotationId: Scalars['ID']['input'];
}>;

export type IQuotationQuery = {
  __typename?: 'Query';
  quotationsCount: number;
  quotation?: {
    __typename?: 'Quotation';
    _id: string;
    status: IQuotationStatus;
    created: any;
    expires?: any | null;
    updated?: any | null;
    isExpired?: boolean | null;
    quotationNumber?: string | null;
    fullfilled?: any | null;
    rejected?: any | null;
    user: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      name: string;
      avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
      primaryEmail?: {
        __typename?: 'UserEmail';
        verified: boolean;
        address: string;
      } | null;
    };
    configuration?: Array<{
      __typename?: 'ProductConfigurationParameter';
      key: string;
      value: string;
    }> | null;
    country?: {
      __typename?: 'Country';
      _id: string;
      isoCode?: string | null;
      flagEmoji?: string | null;
      name?: string | null;
    } | null;
    currency?: {
      __typename?: 'Currency';
      _id: string;
      isoCode: string;
      isActive?: boolean | null;
    } | null;
    product:
      | {
          __typename?: 'BundleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'ConfigurableProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'PlanProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'SimpleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'TokenizedProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        };
  } | null;
};

export type IQuotationStatusQueryVariables = Exact<{ [key: string]: never }>;

export type IQuotationStatusQuery = {
  __typename?: 'Query';
  quotationStatusType?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label?: string | null;
    }> | null;
  } | null;
};

export type IQuotationsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
}>;

export type IQuotationsQuery = {
  __typename?: 'Query';
  quotationsCount: number;
  quotations: Array<{
    __typename?: 'Quotation';
    _id: string;
    status: IQuotationStatus;
    created: any;
    expires?: any | null;
    updated?: any | null;
    isExpired?: boolean | null;
    quotationNumber?: string | null;
    fullfilled?: any | null;
    rejected?: any | null;
    user: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      name: string;
      avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
      primaryEmail?: {
        __typename?: 'UserEmail';
        verified: boolean;
        address: string;
      } | null;
    };
    product:
      | {
          __typename?: 'BundleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'ConfigurableProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'PlanProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'SimpleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'TokenizedProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        };
    currency?: {
      __typename?: 'Currency';
      _id: string;
      contractAddress?: string | null;
      decimals?: number | null;
      isoCode: string;
    } | null;
  }>;
};

export type IRejectQuotationMutationVariables = Exact<{
  quotationId: Scalars['ID']['input'];
  quotationContext?: InputMaybe<Scalars['JSON']['input']>;
}>;

export type IRejectQuotationMutation = {
  __typename?: 'Mutation';
  rejectQuotation: {
    __typename?: 'Quotation';
    _id: string;
    status: IQuotationStatus;
    created: any;
    expires?: any | null;
    updated?: any | null;
    isExpired?: boolean | null;
    quotationNumber?: string | null;
    fullfilled?: any | null;
    rejected?: any | null;
    user: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      name: string;
      avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
      primaryEmail?: {
        __typename?: 'UserEmail';
        verified: boolean;
        address: string;
      } | null;
    };
    configuration?: Array<{
      __typename?: 'ProductConfigurationParameter';
      key: string;
      value: string;
    }> | null;
    country?: {
      __typename?: 'Country';
      _id: string;
      isoCode?: string | null;
      flagEmoji?: string | null;
      name?: string | null;
    } | null;
    currency?: {
      __typename?: 'Currency';
      _id: string;
      isoCode: string;
      isActive?: boolean | null;
    } | null;
    product:
      | {
          __typename?: 'BundleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'ConfigurableProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'PlanProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'SimpleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'TokenizedProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        };
  };
};

export type IUserQuotationsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  queryString?: InputMaybe<Scalars['String']['input']>;
}>;

export type IUserQuotationsQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    _id: string;
    quotations: Array<{
      __typename?: 'Quotation';
      _id: string;
      status: IQuotationStatus;
      created: any;
      expires?: any | null;
      updated?: any | null;
      isExpired?: boolean | null;
      quotationNumber?: string | null;
      fullfilled?: any | null;
      rejected?: any | null;
      user: {
        __typename?: 'User';
        _id: string;
        username?: string | null;
        name: string;
        avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
        primaryEmail?: {
          __typename?: 'UserEmail';
          verified: boolean;
          address: string;
        } | null;
      };
      product:
        | {
            __typename?: 'BundleProduct';
            _id: string;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              slug?: string | null;
              subtitle?: string | null;
              title?: string | null;
              description?: string | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              file: {
                __typename?: 'Media';
                _id: string;
                type: string;
                url: string;
              };
            }>;
          }
        | {
            __typename?: 'ConfigurableProduct';
            _id: string;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              slug?: string | null;
              subtitle?: string | null;
              title?: string | null;
              description?: string | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              file: {
                __typename?: 'Media';
                _id: string;
                type: string;
                url: string;
              };
            }>;
          }
        | {
            __typename?: 'PlanProduct';
            _id: string;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              slug?: string | null;
              subtitle?: string | null;
              title?: string | null;
              description?: string | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              file: {
                __typename?: 'Media';
                _id: string;
                type: string;
                url: string;
              };
            }>;
          }
        | {
            __typename?: 'SimpleProduct';
            _id: string;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              slug?: string | null;
              subtitle?: string | null;
              title?: string | null;
              description?: string | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              file: {
                __typename?: 'Media';
                _id: string;
                type: string;
                url: string;
              };
            }>;
          }
        | {
            __typename?: 'TokenizedProduct';
            _id: string;
            texts?: {
              __typename?: 'ProductTexts';
              _id: string;
              slug?: string | null;
              subtitle?: string | null;
              title?: string | null;
              description?: string | null;
            } | null;
            media: Array<{
              __typename?: 'ProductMedia';
              _id: string;
              file: {
                __typename?: 'Media';
                _id: string;
                type: string;
                url: string;
              };
            }>;
          };
      currency?: {
        __typename?: 'Currency';
        _id: string;
        contractAddress?: string | null;
        decimals?: number | null;
        isoCode: string;
      } | null;
    }>;
  } | null;
};

export type IVerifyQuotationMutationVariables = Exact<{
  quotationId: Scalars['ID']['input'];
  quotationContext?: InputMaybe<Scalars['JSON']['input']>;
}>;

export type IVerifyQuotationMutation = {
  __typename?: 'Mutation';
  verifyQuotation: {
    __typename?: 'Quotation';
    _id: string;
    status: IQuotationStatus;
    created: any;
    expires?: any | null;
    updated?: any | null;
    isExpired?: boolean | null;
    quotationNumber?: string | null;
    fullfilled?: any | null;
    rejected?: any | null;
    user: {
      __typename?: 'User';
      _id: string;
      username?: string | null;
      name: string;
      avatar?: { __typename?: 'Media'; _id: string; url: string } | null;
      primaryEmail?: {
        __typename?: 'UserEmail';
        verified: boolean;
        address: string;
      } | null;
    };
    configuration?: Array<{
      __typename?: 'ProductConfigurationParameter';
      key: string;
      value: string;
    }> | null;
    country?: {
      __typename?: 'Country';
      _id: string;
      isoCode?: string | null;
      flagEmoji?: string | null;
      name?: string | null;
    } | null;
    currency?: {
      __typename?: 'Currency';
      _id: string;
      isoCode: string;
      isActive?: boolean | null;
    } | null;
    product:
      | {
          __typename?: 'BundleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'ConfigurableProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'PlanProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'SimpleProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        }
      | {
          __typename?: 'TokenizedProduct';
          _id: string;
          texts?: {
            __typename?: 'ProductTexts';
            _id: string;
            slug?: string | null;
            subtitle?: string | null;
            title?: string | null;
            description?: string | null;
          } | null;
          media: Array<{
            __typename?: 'ProductMedia';
            _id: string;
            file: {
              __typename?: 'Media';
              _id: string;
              type: string;
              url: string;
            };
          }>;
        };
  };
};

export type ISyncReportsQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Array<IWorkStatus> | IWorkStatus>;
  types?: InputMaybe<Array<IWorkType> | IWorkType>;
  created?: InputMaybe<IDateFilterInput>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
}>;

export type ISyncReportsQuery = {
  __typename?: 'Query';
  workQueue: Array<{
    __typename?: 'Work';
    _id: string;
    type: IWorkType;
    scheduled?: any | null;
    status: IWorkStatus;
    started?: any | null;
    success?: boolean | null;
    finished?: any | null;
    created: any;
    deleted?: any | null;
    priority: number;
    worker?: string | null;
    retries: number;
    timeout?: number | null;
    input?: any | null;
    result?: any | null;
    error?: any | null;
    original?: { __typename?: 'Work'; _id: string } | null;
  }>;
};

export type IWarehousingProviderFragmentFragment = {
  __typename?: 'WarehousingProvider';
  _id: string;
  created?: any | null;
  updated?: any | null;
  deleted?: any | null;
  isActive?: boolean | null;
  type?: IWarehousingProviderType | null;
  configuration?: any | null;
  configurationError?: IWarehousingProviderError | null;
  interface?: {
    __typename?: 'WarehousingInterface';
    _id: string;
    label?: string | null;
    version?: string | null;
  } | null;
};

export type ICreateWarehousingProviderMutationVariables = Exact<{
  warehousingProvider: ICreateWarehousingProviderInput;
}>;

export type ICreateWarehousingProviderMutation = {
  __typename?: 'Mutation';
  createWarehousingProvider: {
    __typename?: 'WarehousingProvider';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    isActive?: boolean | null;
    type?: IWarehousingProviderType | null;
    configuration?: any | null;
    configurationError?: IWarehousingProviderError | null;
    interface?: {
      __typename?: 'WarehousingInterface';
      _id: string;
      label?: string | null;
      version?: string | null;
    } | null;
  };
};

export type IRemoveWarehousingProviderMutationVariables = Exact<{
  warehousingProviderId: Scalars['ID']['input'];
}>;

export type IRemoveWarehousingProviderMutation = {
  __typename?: 'Mutation';
  removeWarehousingProvider: {
    __typename?: 'WarehousingProvider';
    _id: string;
  };
};

export type IUpdateWarehousingProviderMutationVariables = Exact<{
  warehousingProvider: IUpdateProviderInput;
  warehousingProviderId: Scalars['ID']['input'];
}>;

export type IUpdateWarehousingProviderMutation = {
  __typename?: 'Mutation';
  updateWarehousingProvider: {
    __typename?: 'WarehousingProvider';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    isActive?: boolean | null;
    type?: IWarehousingProviderType | null;
    configuration?: any | null;
    configurationError?: IWarehousingProviderError | null;
    interface?: {
      __typename?: 'WarehousingInterface';
      _id: string;
      label?: string | null;
      version?: string | null;
    } | null;
  };
};

export type IWarehousingInterfacesQueryVariables = Exact<{
  providerType: IWarehousingProviderType;
}>;

export type IWarehousingInterfacesQuery = {
  __typename?: 'Query';
  warehousingInterfaces: Array<{
    __typename?: 'WarehousingInterface';
    _id: string;
    label?: string | null;
    value: string;
  }>;
};

export type IWarehousingProviderQueryVariables = Exact<{
  warehousingProviderId: Scalars['ID']['input'];
}>;

export type IWarehousingProviderQuery = {
  __typename?: 'Query';
  warehousingProvider?: {
    __typename?: 'WarehousingProvider';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    isActive?: boolean | null;
    type?: IWarehousingProviderType | null;
    configuration?: any | null;
    configurationError?: IWarehousingProviderError | null;
    interface?: {
      __typename?: 'WarehousingInterface';
      _id: string;
      label?: string | null;
      version?: string | null;
    } | null;
  } | null;
};

export type IWarehousingProvidersTypeQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IWarehousingProvidersTypeQuery = {
  __typename?: 'Query';
  warehousingProviderType?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label?: string | null;
    }> | null;
  } | null;
};

export type IWarehousingProvidersQueryVariables = Exact<{
  type?: InputMaybe<IWarehousingProviderType>;
}>;

export type IWarehousingProvidersQuery = {
  __typename?: 'Query';
  warehousingProviders: Array<{
    __typename?: 'WarehousingProvider';
    _id: string;
    created?: any | null;
    updated?: any | null;
    deleted?: any | null;
    isActive?: boolean | null;
    type?: IWarehousingProviderType | null;
    configuration?: any | null;
    configurationError?: IWarehousingProviderError | null;
    interface?: {
      __typename?: 'WarehousingInterface';
      _id: string;
      label?: string | null;
      version?: string | null;
    } | null;
  }>;
};

export type IWorkFragmentFragment = {
  __typename?: 'Work';
  _id: string;
  type: IWorkType;
  scheduled?: any | null;
  status: IWorkStatus;
  started?: any | null;
  success?: boolean | null;
  finished?: any | null;
  created: any;
  deleted?: any | null;
};

export type IActiveWorkTypesQueryVariables = Exact<{ [key: string]: never }>;

export type IActiveWorkTypesQuery = {
  __typename?: 'Query';
  activeWorkTypes: Array<IWorkType>;
};

export type IAddWorkMutationVariables = Exact<{
  type: IWorkType;
  priority?: Scalars['Int']['input'];
  input?: InputMaybe<Scalars['JSON']['input']>;
  originalWorkId?: InputMaybe<Scalars['ID']['input']>;
  scheduled?: InputMaybe<Scalars['Timestamp']['input']>;
  retries?: Scalars['Int']['input'];
}>;

export type IAddWorkMutation = {
  __typename?: 'Mutation';
  addWork?: { __typename?: 'Work'; _id: string } | null;
};

export type IAllocateWorkMutationVariables = Exact<{
  types?: InputMaybe<Array<InputMaybe<IWorkType>> | InputMaybe<IWorkType>>;
  worker?: InputMaybe<Scalars['String']['input']>;
}>;

export type IAllocateWorkMutation = {
  __typename?: 'Mutation';
  allocateWork?: { __typename?: 'Work'; _id: string } | null;
};

export type IWorkTypesQueryVariables = Exact<{ [key: string]: never }>;

export type IWorkTypesQuery = {
  __typename?: 'Query';
  registeredWorkTypes?: {
    __typename?: '__Type';
    options?: Array<{
      __typename?: '__EnumValue';
      value: string;
      label: string;
    }> | null;
  } | null;
};

export type IRemoveWorkMutationVariables = Exact<{
  workId: Scalars['ID']['input'];
}>;

export type IRemoveWorkMutation = {
  __typename?: 'Mutation';
  removeWork: { __typename?: 'Work'; _id: string };
};

export type IWorkQueryVariables = Exact<{
  workId: Scalars['ID']['input'];
}>;

export type IWorkQuery = {
  __typename?: 'Query';
  work?: {
    __typename?: 'Work';
    input?: any | null;
    result?: any | null;
    error?: any | null;
    priority: number;
    worker?: string | null;
    retries: number;
    timeout?: number | null;
    _id: string;
    type: IWorkType;
    scheduled?: any | null;
    status: IWorkStatus;
    started?: any | null;
    success?: boolean | null;
    finished?: any | null;
    created: any;
    deleted?: any | null;
    original?: { __typename?: 'Work'; _id: string } | null;
  } | null;
};

export type IWorkQueueQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Array<IWorkStatus> | IWorkStatus>;
  types?: InputMaybe<Array<IWorkType> | IWorkType>;
  created?: InputMaybe<IDateFilterInput>;
  sort?: InputMaybe<Array<ISortOptionInput> | ISortOptionInput>;
}>;

export type IWorkQueueQuery = {
  __typename?: 'Query';
  activeWorkTypes: Array<IWorkType>;
  workQueueCount: number;
  workQueue: Array<{
    __typename?: 'Work';
    _id: string;
    type: IWorkType;
    scheduled?: any | null;
    status: IWorkStatus;
    started?: any | null;
    success?: boolean | null;
    finished?: any | null;
    created: any;
    deleted?: any | null;
  }>;
};

export const Md5MetaDataFragmentFragmentDoc = gql`
  fragment MD5MetaDataFragment on WebAuthnMDSv3Metadata {
    legalHeader
    description
    authenticatorVersion
    protocolFamily
    schema
    authenticationAlgorithms
    publicKeyAlgAndEncodings
    attestationTypes
    keyProtection
    upv
    tcDisplay
    authenticationAlgorithms
    publicKeyAlgAndEncodings
    icon
    authenticatorGetInfo
  }
`;
export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    _id
    isTwoFactorEnabled
    lastBillingAddress {
      firstName
      lastName
      company
      addressLine
      addressLine2
      postalCode
      countryCode
      regionCode
      city
    }
    lastContact {
      emailAddress
      telNumber
    }
    lastLogin {
      countryCode
      locale
      remoteAddress
      remotePort
      timestamp
      userAgent
    }
    avatar {
      _id
      name
      size
      type
      url
    }
    allowedActions
    paymentCredentials {
      _id
      isValid
      isPreferred
      paymentProvider {
        _id
        type
        interface {
          _id
          label
          version
        }
      }
    }
    emails {
      verified
      address
    }
    web3Addresses {
      address
      nonce
      verified
    }
    webAuthnCredentials {
      _id
      created
      aaguid
      counter
      mdsMetadata {
        ...MD5MetaDataFragment
      }
    }
    profile {
      displayName
      phoneMobile
      gender
      address {
        firstName
        lastName
        company
        addressLine
        addressLine2
        postalCode
        countryCode
        regionCode
        city
      }
      birthday
    }
    username
    primaryEmail {
      verified
      address
    }
    isGuest
    isInitialPassword
    name
    roles
    tags
  }
  ${Md5MetaDataFragmentFragmentDoc}
`;
export const AssortmentChildrenFragmentFragmentDoc = gql`
  fragment AssortmentChildrenFragment on Assortment {
    _id
    texts {
      _id
      slug
      title
      subtitle
    }
    childrenCount
  }
`;
export const AssortmentFragmentFragmentDoc = gql`
  fragment AssortmentFragment on Assortment {
    _id
    isActive
    created
    updated
    sequence
    isBase
    isRoot
    tags
    texts {
      _id
      slug
      title
      subtitle
      description
    }
    childrenCount
    media {
      _id
      tags
      file {
        _id
        url
      }
    }
  }
`;
export const AssortmentLinkFragmentFragmentDoc = gql`
  fragment AssortmentLinkFragment on AssortmentLink {
    _id
    sortKey
    parent {
      ...AssortmentFragment
    }
    child {
      ...AssortmentFragment
    }
  }
  ${AssortmentFragmentFragmentDoc}
`;
export const AssortmentMediaTextsFragmentFragmentDoc = gql`
  fragment AssortmentMediaTextsFragment on AssortmentMediaTexts {
    _id
    locale
    title
    subtitle
  }
`;
export const AssortmentMediaFragmentFragmentDoc = gql`
  fragment AssortmentMediaFragment on AssortmentMedia {
    _id
    tags
    file {
      _id
      url
    }
    texts {
      ...AssortmentMediaTextsFragment
    }
  }
  ${AssortmentMediaTextsFragmentFragmentDoc}
`;
export const AssortmentTextsFragmentFragmentDoc = gql`
  fragment AssortmentTextsFragment on AssortmentTexts {
    _id
    locale
    slug
    title
    subtitle
    description
  }
`;
export const CountryFragmentFragmentDoc = gql`
  fragment CountryFragment on Country {
    _id
    isoCode
    isActive
    isBase
    defaultCurrency {
      _id
      isoCode
    }
  }
`;
export const CurrencyFragmentFragmentDoc = gql`
  fragment CurrencyFragment on Currency {
    _id
    isoCode
    isActive
    contractAddress
    decimals
  }
`;
export const DeliveryProviderFragmentFragmentDoc = gql`
  fragment DeliveryProviderFragment on DeliveryProvider {
    _id
    created
    updated
    deleted
    type
    isActive
    configuration
    interface {
      _id
      label
      version
    }
    configurationError
  }
`;
export const EnrollmentDetailFragmentFragmentDoc = gql`
  fragment EnrollmentDetailFragment on Enrollment {
    _id
    country {
      _id
      isoCode
    }
    enrollmentNumber
    updated
    status
    created
    expires
    billingAddress {
      addressLine
      addressLine2
      city
      company
      countryCode
      firstName
      lastName
      postalCode
      regionCode
    }
    contact {
      emailAddress
      telNumber
    }
    currency {
      _id
      contractAddress
      decimals
      isActive
      isoCode
    }
    delivery {
      provider {
        _id
        configuration
        configurationError
        interface {
          _id
          label
          version
        }
        isActive
        simulatedPrice {
          _id
          amount
          currency
          isNetPrice
          isTaxable
        }
        type
      }
    }
    payment {
      provider {
        _id
        configuration
        configurationError
        interface {
          _id
          label
          version
        }
        isActive
        type
      }
    }
    periods {
      end
      isTrial
      start
      order {
        _id
      }
    }
    isExpired
    periods {
      start
      end
      isTrial
    }
    plan {
      configuration {
        key
        value
      }
      product {
        _id
        texts {
          _id
          title
        }
      }
      quantity
    }
    user {
      _id
      username
      name
      avatar {
        _id
        url
      }
    }
  }
`;
export const EnrollmentFragmentFragmentDoc = gql`
  fragment EnrollmentFragment on Enrollment {
    _id
    country {
      _id
      isoCode
    }
    currency {
      _id
      isoCode
    }
    enrollmentNumber
    updated
    status
    created
    expires
    isExpired
    periods {
      start
      end
      isTrial
    }
    payment {
      provider {
        _id
      }
    }
    delivery {
      provider {
        _id
      }
    }
    plan {
      product {
        _id
        media {
          _id
          file {
            _id
            url
          }
        }
        texts {
          _id
          title
        }
      }
      quantity
    }
    user {
      _id
      username
      name
      avatar {
        _id
        url
      }
    }
  }
`;
export const EventFragmentFragmentDoc = gql`
  fragment EventFragment on Event {
    _id
    type
    payload
    created
  }
`;
export const FilterFragmentFragmentDoc = gql`
  fragment FilterFragment on Filter {
    _id
    updated
    created
    key
    isActive
    type
    options {
      _id
      texts {
        _id
        title
        subtitle
        locale
      }
      value
    }
  }
`;
export const FilterOptionFragmentFragmentDoc = gql`
  fragment FilterOptionFragment on FilterOption {
    _id
    texts {
      _id
      title
      subtitle
      locale
    }
    value
  }
`;
export const FilterTextsFragmentFragmentDoc = gql`
  fragment FilterTextsFragment on FilterTexts {
    _id
    locale
    title
    subtitle
  }
`;
export const LanguageFragmentFragmentDoc = gql`
  fragment LanguageFragment on Language {
    _id
    isoCode
    isActive
    isBase
    name
  }
`;
export const OrderDetailFragmentFragmentDoc = gql`
  fragment OrderDetailFragment on Order {
    _id
    totalTax: total(category: TAXES) {
      amount
      currency
    }
    itemsTotal: total(category: ITEMS) {
      amount
      currency
    }
    totalDiscount: total(category: DISCOUNTS) {
      amount
      currency
    }
    totalPayment: total(category: PAYMENT) {
      amount
      currency
    }
    totalDelivery: total(category: DELIVERY) {
      amount
      currency
    }
    user {
      _id
      username
      isGuest
      avatar {
        _id
        url
      }
    }
    discounts {
      _id
      trigger
      code
      interface {
        _id
        label
        version
      }
      total {
        amount
        currency
        isTaxable
        isNetPrice
      }
      discounted {
        _id
        orderDiscount {
          _id
          total {
            amount
            currency
            isTaxable
            isNetPrice
          }
        }
        total {
          amount
          currency
          isTaxable
          isNetPrice
        }
      }
    }
    payment {
      _id
      provider {
        _id
        type
        interface {
          _id
          label
          version
        }
      }
      status
      fee {
        currency
        amount
      }
      paid
    }
    delivery {
      _id
      status
      provider {
        _id
        type
        interface {
          _id
          label
          version
        }
      }
      delivered
    }
    orderNumber
    status
    created
    updated
    ordered
    confirmed
    fullfilled
    contact {
      telNumber
      emailAddress
    }
    country {
      _id
      isoCode
      flagEmoji
      name
    }
    currency {
      _id
      isoCode
      isActive
    }
    billingAddress {
      firstName
      lastName
      company
      addressLine
      addressLine2
      postalCode
      countryCode
      regionCode
      city
    }
    delivery {
      _id
      provider {
        _id
        created
        updated
        deleted
        type
        configuration
        interface {
          _id
          label
          version
        }
      }
      status
      delivered
      fee {
        isTaxable
        isNetPrice
        amount
        currency
      }
      discounts {
        _id
        orderDiscount {
          _id
          trigger
          code
          order {
            _id
            orderNumber
          }
          interface {
            _id
            label
            version
          }
          total {
            isTaxable
            isNetPrice
            amount
            currency
          }
          discounted {
            _id
            orderDiscount {
              _id
              trigger
              code
              order {
                _id
                orderNumber
              }
              interface {
                _id
                label
                version
              }
              total {
                isTaxable
                isNetPrice
                amount
                currency
              }
            }
          }
        }
      }
      delivered
    }
    total {
      isTaxable
      isTaxable
      amount
      currency
    }
    items {
      _id
      product {
        _id
        texts {
          _id
          slug
          brand
          vendor
          title
          subtitle
        }
        media {
          _id
          file {
            _id
            url
          }
        }
      }
      quantity
      unitPrice {
        amount
        isTaxable
        isNetPrice
        currency
      }
      total {
        amount
        isTaxable
        isNetPrice
        currency
      }
    }
  }
`;
export const OrderFragmentFragmentDoc = gql`
  fragment OrderFragment on Order {
    _id
    status
    created
    updated
    ordered
    orderNumber
    confirmed
    fullfilled
    contact {
      telNumber
      emailAddress
    }
    total {
      _id
      isTaxable
      isNetPrice
      amount
      currency
    }
    user {
      _id
      username
      isGuest
      avatar {
        _id
        url
      }
      profile {
        displayName
        address {
          firstName
          lastName
        }
      }
    }
  }
`;
export const PaymentProviderFragmentFragmentDoc = gql`
  fragment PaymentProviderFragment on PaymentProvider {
    _id
    created
    updated
    deleted
    isActive
    type
    interface {
      _id
      label
      version
    }
    configuration
    configurationError
  }
`;
export const ProductReviewDetailFragmentFragmentDoc = gql`
  fragment ProductReviewDetailFragment on ProductReview {
    _id
    created
    updated
    deleted
    author {
      _id
      username
      name
      profile {
        displayName
        address {
          firstName
          lastName
        }
      }
      isGuest
      avatar {
        _id
        url
      }
    }
    product {
      _id
      texts {
        _id
        title
        subtitle
      }
      media {
        _id
        file {
          _id
          url
        }
      }
    }
    rating
    title
    review
    upVote: voteCount(type: UPVOTE)
    downVote: voteCount(type: DOWNVOTE)
    voteReport: voteCount(type: REPORT)
    ownVotes {
      timestamp
      type
    }
  }
`;
export const ProductReviewFragmentFragmentDoc = gql`
  fragment ProductReviewFragment on ProductReview {
    _id
    created
    updated
    deleted
    author {
      _id
      username
      name
      profile {
        displayName
        address {
          firstName
          lastName
        }
      }
      isGuest
      avatar {
        _id
        url
      }
    }
    product {
      _id
      texts {
        _id
        title
        subtitle
      }
      media {
        _id
        file {
          _id
          url
        }
      }
    }
    rating
    title
    upVote: voteCount(type: UPVOTE)
    downVote: voteCount(type: DOWNVOTE)
    voteReport: voteCount(type: REPORT)
  }
`;
export const ProductAssignmentFragmentFragmentDoc = gql`
  fragment ProductAssignmentFragment on ProductVariationAssignment {
    _id
    vectors {
      _id
      option {
        _id
        value
        texts {
          _id
          title
          subtitle
        }
      }
      variation {
        _id
        key
        texts {
          _id
          locale
          title
        }
      }
    }
    product {
      _id
      texts {
        _id
        title
        slug
        subtitle
      }
    }
  }
`;
export const ProductBriefFragmentFragmentDoc = gql`
  fragment ProductBriefFragment on Product {
    texts {
      _id
      slug
      title
      subtitle
      description
      vendor
      brand
      labels
    }
    _id
    sequence
    status
    tags
    sequence
    updated
    published
    media {
      _id
      tags
      file {
        _id
        url
      }
    }
  }
`;
export const ProductCatalogPriceFragmentFragmentDoc = gql`
  fragment ProductCatalogPriceFragment on ProductCatalogPrice {
    _id
    isTaxable
    isNetPrice
    country {
      _id
      isoCode
      name
      flagEmoji
    }
    currency {
      _id
      isoCode
      isActive
    }
    amount
    maxQuantity
  }
`;
export const ProductDetailFragmentFragmentDoc = gql`
  fragment ProductDetailFragment on Product {
    _id
    sequence
    status
    created
    tags
    updated
    published
    media {
      _id
      tags
      file {
        _id
        url
      }
    }
    reviews {
      _id
      created
      author {
        _id
        username
        isGuest
      }
      rating
      title
      review
      voteCount
      ownVotes {
        type
        timestamp
      }
    }
    siblings {
      _id
      media {
        _id
        file {
          _id
          url
        }
      }
    }
  }
`;
export const ProductDimensionFragmentFragmentDoc = gql`
  fragment ProductDimensionFragment on Dimensions {
    weight(unit: GRAM)
    length(unit: MILLIMETERS)
    width(unit: MILLIMETERS)
    height(unit: MILLIMETERS)
  }
`;
export const ProductMediaFragmentFragmentDoc = gql`
  fragment ProductMediaFragment on ProductMedia {
    _id
    tags
    file {
      _id
      name
      type
      size
      url
    }
    sortKey
    texts {
      _id
      locale
      title
      subtitle
    }
  }
`;
export const ProductMediaTextsFragmentFragmentDoc = gql`
  fragment ProductMediaTextsFragment on ProductMediaTexts {
    _id
    locale
    title
    subtitle
  }
`;
export const ProductPlanConfigurationFragmentFragmentDoc = gql`
  fragment ProductPlanConfigurationFragment on ProductPlanConfiguration {
    usageCalculationType
    billingInterval
    trialInterval
    trialIntervalCount
    billingIntervalCount
  }
`;
export const ProductTextsFragmentFragmentDoc = gql`
  fragment ProductTextsFragment on ProductTexts {
    _id
    locale
    slug
    title
    subtitle
    description
    vendor
    brand
    labels
  }
`;
export const ProductVariationFragmentFragmentDoc = gql`
  fragment ProductVariationFragment on ProductVariation {
    _id
    type
    key
    texts {
      _id
      locale
      title
      subtitle
    }
    options {
      _id
      texts {
        _id
        locale
        title
        subtitle
      }
      value
    }
  }
`;
export const TokenFragmentFragmentDoc = gql`
  fragment TokenFragment on Token {
    _id
    walletAddress
    status
    quantity
    contractAddress
    chainId
    chainTokenId
  }
`;
export const QuotationDetailFragmentFragmentDoc = gql`
  fragment QuotationDetailFragment on Quotation {
    _id
    user {
      _id
      username
      avatar {
        _id
        url
      }
      name
      primaryEmail {
        verified
        address
      }
    }
    configuration {
      key
      value
    }
    country {
      _id
      isoCode
      flagEmoji
      name
    }
    currency {
      _id
      isoCode
      isActive
    }
    product {
      _id
      texts {
        _id
        slug
        subtitle
        title
        description
      }
      media {
        _id
        file {
          _id
          type
          url
        }
      }
    }
    status
    created
    expires
    updated
    isExpired
    quotationNumber
    fullfilled
    rejected
  }
`;
export const QuotationFragmentFragmentDoc = gql`
  fragment QuotationFragment on Quotation {
    _id
    user {
      _id
      username
      avatar {
        _id
        url
      }
      name
      primaryEmail {
        verified
        address
      }
    }
    product {
      _id
      texts {
        _id
        slug
        subtitle
        title
        description
      }
      media {
        _id
        file {
          _id
          type
          url
        }
      }
    }
    currency {
      _id
      contractAddress
      decimals
      isoCode
    }
    status
    created
    expires
    updated
    isExpired
    quotationNumber
    fullfilled
    rejected
  }
`;
export const WarehousingProviderFragmentFragmentDoc = gql`
  fragment WarehousingProviderFragment on WarehousingProvider {
    _id
    created
    updated
    deleted
    isActive
    type
    interface {
      _id
      label
      version
    }
    configuration
    configurationError
  }
`;
export const WorkFragmentFragmentDoc = gql`
  fragment WorkFragment on Work {
    _id
    type
    scheduled
    status
    started
    success
    finished
    created
    deleted
  }
`;
export const LogoutDocument = gql`
  mutation logout($token: String) {
    logout(token: $token) {
      success
    }
  }
`;
export type ILogoutMutationFn = Apollo.MutationFunction<
  ILogoutMutation,
  ILogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ILogoutMutation,
    ILogoutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ILogoutMutation, ILogoutMutationVariables>(
    LogoutDocument,
    options,
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<ILogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  ILogoutMutation,
  ILogoutMutationVariables
>;
export const AddEmailDocument = gql`
  mutation AddEmail($email: String!, $userId: ID) {
    addEmail(email: $email, userId: $userId) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type IAddEmailMutationFn = Apollo.MutationFunction<
  IAddEmailMutation,
  IAddEmailMutationVariables
>;

/**
 * __useAddEmailMutation__
 *
 * To run a mutation, you first call `useAddEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEmailMutation, { data, loading, error }] = useAddEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IAddEmailMutation,
    IAddEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IAddEmailMutation, IAddEmailMutationVariables>(
    AddEmailDocument,
    options,
  );
}
export type AddEmailMutationHookResult = ReturnType<typeof useAddEmailMutation>;
export type AddEmailMutationResult = Apollo.MutationResult<IAddEmailMutation>;
export type AddEmailMutationOptions = Apollo.BaseMutationOptions<
  IAddEmailMutation,
  IAddEmailMutationVariables
>;
export const AddWeb3AddressDocument = gql`
  mutation AddWeb3Address($address: String!) {
    addWeb3Address(address: $address) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type IAddWeb3AddressMutationFn = Apollo.MutationFunction<
  IAddWeb3AddressMutation,
  IAddWeb3AddressMutationVariables
>;

/**
 * __useAddWeb3AddressMutation__
 *
 * To run a mutation, you first call `useAddWeb3AddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWeb3AddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWeb3AddressMutation, { data, loading, error }] = useAddWeb3AddressMutation({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useAddWeb3AddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IAddWeb3AddressMutation,
    IAddWeb3AddressMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IAddWeb3AddressMutation,
    IAddWeb3AddressMutationVariables
  >(AddWeb3AddressDocument, options);
}
export type AddWeb3AddressMutationHookResult = ReturnType<
  typeof useAddWeb3AddressMutation
>;
export type AddWeb3AddressMutationResult =
  Apollo.MutationResult<IAddWeb3AddressMutation>;
export type AddWeb3AddressMutationOptions = Apollo.BaseMutationOptions<
  IAddWeb3AddressMutation,
  IAddWeb3AddressMutationVariables
>;
export const AddWebAuthnCredentialsDocument = gql`
  mutation AddWebAuthnCredentials($credentials: JSON!) {
    addWebAuthnCredentials(credentials: $credentials) {
      ...UserFragment
      webAuthnCredentials {
        _id
        created
        aaguid
        counter
        mdsMetadata {
          ...MD5MetaDataFragment
        }
      }
    }
  }
  ${UserFragmentFragmentDoc}
  ${Md5MetaDataFragmentFragmentDoc}
`;
export type IAddWebAuthnCredentialsMutationFn = Apollo.MutationFunction<
  IAddWebAuthnCredentialsMutation,
  IAddWebAuthnCredentialsMutationVariables
>;

/**
 * __useAddWebAuthnCredentialsMutation__
 *
 * To run a mutation, you first call `useAddWebAuthnCredentialsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWebAuthnCredentialsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWebAuthnCredentialsMutation, { data, loading, error }] = useAddWebAuthnCredentialsMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useAddWebAuthnCredentialsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IAddWebAuthnCredentialsMutation,
    IAddWebAuthnCredentialsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IAddWebAuthnCredentialsMutation,
    IAddWebAuthnCredentialsMutationVariables
  >(AddWebAuthnCredentialsDocument, options);
}
export type AddWebAuthnCredentialsMutationHookResult = ReturnType<
  typeof useAddWebAuthnCredentialsMutation
>;
export type AddWebAuthnCredentialsMutationResult =
  Apollo.MutationResult<IAddWebAuthnCredentialsMutation>;
export type AddWebAuthnCredentialsMutationOptions = Apollo.BaseMutationOptions<
  IAddWebAuthnCredentialsMutation,
  IAddWebAuthnCredentialsMutationVariables
>;
export const BuildSecretTotpAuthUrlDocument = gql`
  mutation BuildSecretTOTPAuthURL {
    buildSecretTOTPAuthURL
  }
`;
export type IBuildSecretTotpAuthUrlMutationFn = Apollo.MutationFunction<
  IBuildSecretTotpAuthUrlMutation,
  IBuildSecretTotpAuthUrlMutationVariables
>;

/**
 * __useBuildSecretTotpAuthUrlMutation__
 *
 * To run a mutation, you first call `useBuildSecretTotpAuthUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBuildSecretTotpAuthUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [buildSecretTotpAuthUrlMutation, { data, loading, error }] = useBuildSecretTotpAuthUrlMutation({
 *   variables: {
 *   },
 * });
 */
export function useBuildSecretTotpAuthUrlMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IBuildSecretTotpAuthUrlMutation,
    IBuildSecretTotpAuthUrlMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IBuildSecretTotpAuthUrlMutation,
    IBuildSecretTotpAuthUrlMutationVariables
  >(BuildSecretTotpAuthUrlDocument, options);
}
export type BuildSecretTotpAuthUrlMutationHookResult = ReturnType<
  typeof useBuildSecretTotpAuthUrlMutation
>;
export type BuildSecretTotpAuthUrlMutationResult =
  Apollo.MutationResult<IBuildSecretTotpAuthUrlMutation>;
export type BuildSecretTotpAuthUrlMutationOptions = Apollo.BaseMutationOptions<
  IBuildSecretTotpAuthUrlMutation,
  IBuildSecretTotpAuthUrlMutationVariables
>;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(
      oldPlainPassword: $oldPassword
      newPlainPassword: $newPassword
    ) {
      success
    }
  }
`;
export type IChangePasswordMutationFn = Apollo.MutationFunction<
  IChangePasswordMutation,
  IChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IChangePasswordMutation,
    IChangePasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IChangePasswordMutation,
    IChangePasswordMutationVariables
  >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
  Apollo.MutationResult<IChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  IChangePasswordMutation,
  IChangePasswordMutationVariables
>;
export const CreateUserDocument = gql`
  mutation CreateUser(
    $username: String
    $email: String
    $plainPassword: String
    $profile: UserProfileInput
    $webAuthnPublicKeyCredentials: JSON
  ) {
    createUser(
      username: $username
      email: $email
      plainPassword: $plainPassword
      profile: $profile
      webAuthnPublicKeyCredentials: $webAuthnPublicKeyCredentials
    ) {
      id
      token
      tokenExpires
    }
  }
`;
export type ICreateUserMutationFn = Apollo.MutationFunction<
  ICreateUserMutation,
  ICreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      plainPassword: // value for 'plainPassword'
 *      profile: // value for 'profile'
 *      webAuthnPublicKeyCredentials: // value for 'webAuthnPublicKeyCredentials'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateUserMutation,
    ICreateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ICreateUserMutation, ICreateUserMutationVariables>(
    CreateUserDocument,
    options,
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<ICreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  ICreateUserMutation,
  ICreateUserMutationVariables
>;
export const CreateUserWithWebAuthMutationDocument = gql`
  mutation CreateUserWithWebAuthMutation(
    $username: String
    $email: String
    $webAuthnPublicKeyCredentials: JSON
  ) {
    createUser(
      username: $username
      email: $email
      webAuthnPublicKeyCredentials: $webAuthnPublicKeyCredentials
    ) {
      id
      token
      tokenExpires
    }
  }
`;
export type ICreateUserWithWebAuthMutationMutationFn = Apollo.MutationFunction<
  ICreateUserWithWebAuthMutationMutation,
  ICreateUserWithWebAuthMutationMutationVariables
>;

/**
 * __useCreateUserWithWebAuthMutationMutation__
 *
 * To run a mutation, you first call `useCreateUserWithWebAuthMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserWithWebAuthMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserWithWebAuthMutationMutation, { data, loading, error }] = useCreateUserWithWebAuthMutationMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      webAuthnPublicKeyCredentials: // value for 'webAuthnPublicKeyCredentials'
 *   },
 * });
 */
export function useCreateUserWithWebAuthMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateUserWithWebAuthMutationMutation,
    ICreateUserWithWebAuthMutationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateUserWithWebAuthMutationMutation,
    ICreateUserWithWebAuthMutationMutationVariables
  >(CreateUserWithWebAuthMutationDocument, options);
}
export type CreateUserWithWebAuthMutationMutationHookResult = ReturnType<
  typeof useCreateUserWithWebAuthMutationMutation
>;
export type CreateUserWithWebAuthMutationMutationResult =
  Apollo.MutationResult<ICreateUserWithWebAuthMutationMutation>;
export type CreateUserWithWebAuthMutationMutationOptions =
  Apollo.BaseMutationOptions<
    ICreateUserWithWebAuthMutationMutation,
    ICreateUserWithWebAuthMutationMutationVariables
  >;
export const CreateWebAuthnCredentialCreationOptionsDocument = gql`
  mutation CreateWebAuthnCredentialCreationOptions($username: String!) {
    createWebAuthnCredentialCreationOptions(username: $username)
  }
`;
export type ICreateWebAuthnCredentialCreationOptionsMutationFn =
  Apollo.MutationFunction<
    ICreateWebAuthnCredentialCreationOptionsMutation,
    ICreateWebAuthnCredentialCreationOptionsMutationVariables
  >;

/**
 * __useCreateWebAuthnCredentialCreationOptionsMutation__
 *
 * To run a mutation, you first call `useCreateWebAuthnCredentialCreationOptionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWebAuthnCredentialCreationOptionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWebAuthnCredentialCreationOptionsMutation, { data, loading, error }] = useCreateWebAuthnCredentialCreationOptionsMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateWebAuthnCredentialCreationOptionsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateWebAuthnCredentialCreationOptionsMutation,
    ICreateWebAuthnCredentialCreationOptionsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateWebAuthnCredentialCreationOptionsMutation,
    ICreateWebAuthnCredentialCreationOptionsMutationVariables
  >(CreateWebAuthnCredentialCreationOptionsDocument, options);
}
export type CreateWebAuthnCredentialCreationOptionsMutationHookResult =
  ReturnType<typeof useCreateWebAuthnCredentialCreationOptionsMutation>;
export type CreateWebAuthnCredentialCreationOptionsMutationResult =
  Apollo.MutationResult<ICreateWebAuthnCredentialCreationOptionsMutation>;
export type CreateWebAuthnCredentialCreationOptionsMutationOptions =
  Apollo.BaseMutationOptions<
    ICreateWebAuthnCredentialCreationOptionsMutation,
    ICreateWebAuthnCredentialCreationOptionsMutationVariables
  >;
export const CreateWebAuthnCredentialRequestOptionsDocument = gql`
  mutation CreateWebAuthnCredentialRequestOptions($username: String) {
    createWebAuthnCredentialRequestOptions(username: $username)
  }
`;
export type ICreateWebAuthnCredentialRequestOptionsMutationFn =
  Apollo.MutationFunction<
    ICreateWebAuthnCredentialRequestOptionsMutation,
    ICreateWebAuthnCredentialRequestOptionsMutationVariables
  >;

/**
 * __useCreateWebAuthnCredentialRequestOptionsMutation__
 *
 * To run a mutation, you first call `useCreateWebAuthnCredentialRequestOptionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWebAuthnCredentialRequestOptionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWebAuthnCredentialRequestOptionsMutation, { data, loading, error }] = useCreateWebAuthnCredentialRequestOptionsMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateWebAuthnCredentialRequestOptionsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateWebAuthnCredentialRequestOptionsMutation,
    ICreateWebAuthnCredentialRequestOptionsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateWebAuthnCredentialRequestOptionsMutation,
    ICreateWebAuthnCredentialRequestOptionsMutationVariables
  >(CreateWebAuthnCredentialRequestOptionsDocument, options);
}
export type CreateWebAuthnCredentialRequestOptionsMutationHookResult =
  ReturnType<typeof useCreateWebAuthnCredentialRequestOptionsMutation>;
export type CreateWebAuthnCredentialRequestOptionsMutationResult =
  Apollo.MutationResult<ICreateWebAuthnCredentialRequestOptionsMutation>;
export type CreateWebAuthnCredentialRequestOptionsMutationOptions =
  Apollo.BaseMutationOptions<
    ICreateWebAuthnCredentialRequestOptionsMutation,
    ICreateWebAuthnCredentialRequestOptionsMutationVariables
  >;
export const CurrentUserRoleDocument = gql`
  query CurrentUserRole {
    me {
      _id
      allowedActions
    }
  }
`;

/**
 * __useCurrentUserRoleQuery__
 *
 * To run a query within a React component, call `useCurrentUserRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserRoleQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserRoleQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ICurrentUserRoleQuery,
    ICurrentUserRoleQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ICurrentUserRoleQuery, ICurrentUserRoleQueryVariables>(
    CurrentUserRoleDocument,
    options,
  );
}
export function useCurrentUserRoleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ICurrentUserRoleQuery,
    ICurrentUserRoleQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ICurrentUserRoleQuery,
    ICurrentUserRoleQueryVariables
  >(CurrentUserRoleDocument, options);
}
export type CurrentUserRoleQueryHookResult = ReturnType<
  typeof useCurrentUserRoleQuery
>;
export type CurrentUserRoleLazyQueryHookResult = ReturnType<
  typeof useCurrentUserRoleLazyQuery
>;
export type CurrentUserRoleQueryResult = Apollo.QueryResult<
  ICurrentUserRoleQuery,
  ICurrentUserRoleQueryVariables
>;
export const CurrentUserDocument = gql`
  query CurrentUser {
    me {
      ...UserFragment
    }
    impersonator {
      _id
    }
  }
  ${UserFragmentFragmentDoc}
`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ICurrentUserQuery,
    ICurrentUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ICurrentUserQuery, ICurrentUserQueryVariables>(
    CurrentUserDocument,
    options,
  );
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ICurrentUserQuery,
    ICurrentUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ICurrentUserQuery, ICurrentUserQueryVariables>(
    CurrentUserDocument,
    options,
  );
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<
  typeof useCurrentUserLazyQuery
>;
export type CurrentUserQueryResult = Apollo.QueryResult<
  ICurrentUserQuery,
  ICurrentUserQueryVariables
>;
export const DisableTotpDocument = gql`
  mutation DisableTOTP($code: String!, $userId: ID) {
    disableTOTP(code: $code, userId: $userId) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type IDisableTotpMutationFn = Apollo.MutationFunction<
  IDisableTotpMutation,
  IDisableTotpMutationVariables
>;

/**
 * __useDisableTotpMutation__
 *
 * To run a mutation, you first call `useDisableTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableTotpMutation, { data, loading, error }] = useDisableTotpMutation({
 *   variables: {
 *      code: // value for 'code'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDisableTotpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IDisableTotpMutation,
    IDisableTotpMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IDisableTotpMutation,
    IDisableTotpMutationVariables
  >(DisableTotpDocument, options);
}
export type DisableTotpMutationHookResult = ReturnType<
  typeof useDisableTotpMutation
>;
export type DisableTotpMutationResult =
  Apollo.MutationResult<IDisableTotpMutation>;
export type DisableTotpMutationOptions = Apollo.BaseMutationOptions<
  IDisableTotpMutation,
  IDisableTotpMutationVariables
>;
export const EnableTotpDocument = gql`
  mutation EnableTOTP($secretBase32: String!, $code: String!) {
    enableTOTP(secretBase32: $secretBase32, code: $code) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type IEnableTotpMutationFn = Apollo.MutationFunction<
  IEnableTotpMutation,
  IEnableTotpMutationVariables
>;

/**
 * __useEnableTotpMutation__
 *
 * To run a mutation, you first call `useEnableTotpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableTotpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableTotpMutation, { data, loading, error }] = useEnableTotpMutation({
 *   variables: {
 *      secretBase32: // value for 'secretBase32'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useEnableTotpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IEnableTotpMutation,
    IEnableTotpMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IEnableTotpMutation, IEnableTotpMutationVariables>(
    EnableTotpDocument,
    options,
  );
}
export type EnableTotpMutationHookResult = ReturnType<
  typeof useEnableTotpMutation
>;
export type EnableTotpMutationResult =
  Apollo.MutationResult<IEnableTotpMutation>;
export type EnableTotpMutationOptions = Apollo.BaseMutationOptions<
  IEnableTotpMutation,
  IEnableTotpMutationVariables
>;
export const EnrollUserDocument = gql`
  mutation EnrollUser(
    $email: String!
    $plainPassword: String
    $profile: UserProfileInput!
  ) {
    enrollUser(
      email: $email
      plainPassword: $plainPassword
      profile: $profile
    ) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type IEnrollUserMutationFn = Apollo.MutationFunction<
  IEnrollUserMutation,
  IEnrollUserMutationVariables
>;

/**
 * __useEnrollUserMutation__
 *
 * To run a mutation, you first call `useEnrollUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrollUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrollUserMutation, { data, loading, error }] = useEnrollUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      plainPassword: // value for 'plainPassword'
 *      profile: // value for 'profile'
 *   },
 * });
 */
export function useEnrollUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IEnrollUserMutation,
    IEnrollUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IEnrollUserMutation, IEnrollUserMutationVariables>(
    EnrollUserDocument,
    options,
  );
}
export type EnrollUserMutationHookResult = ReturnType<
  typeof useEnrollUserMutation
>;
export type EnrollUserMutationResult =
  Apollo.MutationResult<IEnrollUserMutation>;
export type EnrollUserMutationOptions = Apollo.BaseMutationOptions<
  IEnrollUserMutation,
  IEnrollUserMutationVariables
>;
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
    }
  }
`;
export type IForgotPasswordMutationFn = Apollo.MutationFunction<
  IForgotPasswordMutation,
  IForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IForgotPasswordMutation,
    IForgotPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IForgotPasswordMutation,
    IForgotPasswordMutationVariables
  >(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult =
  Apollo.MutationResult<IForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  IForgotPasswordMutation,
  IForgotPasswordMutationVariables
>;
export const ImpersonateDocument = gql`
  mutation Impersonate($userId: ID!) {
    impersonate(userId: $userId) {
      id
      tokenExpires
      token
      user {
        _id
      }
    }
  }
`;
export type IImpersonateMutationFn = Apollo.MutationFunction<
  IImpersonateMutation,
  IImpersonateMutationVariables
>;

/**
 * __useImpersonateMutation__
 *
 * To run a mutation, you first call `useImpersonateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImpersonateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [impersonateMutation, { data, loading, error }] = useImpersonateMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useImpersonateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IImpersonateMutation,
    IImpersonateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IImpersonateMutation,
    IImpersonateMutationVariables
  >(ImpersonateDocument, options);
}
export type ImpersonateMutationHookResult = ReturnType<
  typeof useImpersonateMutation
>;
export type ImpersonateMutationResult =
  Apollo.MutationResult<IImpersonateMutation>;
export type ImpersonateMutationOptions = Apollo.BaseMutationOptions<
  IImpersonateMutation,
  IImpersonateMutationVariables
>;
export const LogInWithOAuthDocument = gql`
  mutation LogInWithOAuth(
    $authorizationCode: String!
    $provider: String!
    $redirectUrl: String!
  ) {
    loginWithOAuth(
      provider: $provider
      authorizationCode: $authorizationCode
      redirectUrl: $redirectUrl
    ) {
      id
      token
      tokenExpires
    }
  }
`;
export type ILogInWithOAuthMutationFn = Apollo.MutationFunction<
  ILogInWithOAuthMutation,
  ILogInWithOAuthMutationVariables
>;

/**
 * __useLogInWithOAuthMutation__
 *
 * To run a mutation, you first call `useLogInWithOAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInWithOAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInWithOAuthMutation, { data, loading, error }] = useLogInWithOAuthMutation({
 *   variables: {
 *      authorizationCode: // value for 'authorizationCode'
 *      provider: // value for 'provider'
 *      redirectUrl: // value for 'redirectUrl'
 *   },
 * });
 */
export function useLogInWithOAuthMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ILogInWithOAuthMutation,
    ILogInWithOAuthMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ILogInWithOAuthMutation,
    ILogInWithOAuthMutationVariables
  >(LogInWithOAuthDocument, options);
}
export type LogInWithOAuthMutationHookResult = ReturnType<
  typeof useLogInWithOAuthMutation
>;
export type LogInWithOAuthMutationResult =
  Apollo.MutationResult<ILogInWithOAuthMutation>;
export type LogInWithOAuthMutationOptions = Apollo.BaseMutationOptions<
  ILogInWithOAuthMutation,
  ILogInWithOAuthMutationVariables
>;
export const LoginWithPasswordDocument = gql`
  mutation LoginWithPassword(
    $username: String
    $email: String
    $plainPassword: String
    $totpCode: String
  ) {
    loginWithPassword(
      username: $username
      email: $email
      plainPassword: $plainPassword
      totpCode: $totpCode
    ) {
      id
      token
      tokenExpires
      user {
        _id
        allowedActions
        roles
        isTwoFactorEnabled
      }
    }
  }
`;
export type ILoginWithPasswordMutationFn = Apollo.MutationFunction<
  ILoginWithPasswordMutation,
  ILoginWithPasswordMutationVariables
>;

/**
 * __useLoginWithPasswordMutation__
 *
 * To run a mutation, you first call `useLoginWithPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithPasswordMutation, { data, loading, error }] = useLoginWithPasswordMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      plainPassword: // value for 'plainPassword'
 *      totpCode: // value for 'totpCode'
 *   },
 * });
 */
export function useLoginWithPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ILoginWithPasswordMutation,
    ILoginWithPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ILoginWithPasswordMutation,
    ILoginWithPasswordMutationVariables
  >(LoginWithPasswordDocument, options);
}
export type LoginWithPasswordMutationHookResult = ReturnType<
  typeof useLoginWithPasswordMutation
>;
export type LoginWithPasswordMutationResult =
  Apollo.MutationResult<ILoginWithPasswordMutation>;
export type LoginWithPasswordMutationOptions = Apollo.BaseMutationOptions<
  ILoginWithPasswordMutation,
  ILoginWithPasswordMutationVariables
>;
export const LoginWithWebAuthnDocument = gql`
  mutation LoginWithWebAuthn($webAuthnPublicKeyCredentials: JSON!) {
    loginWithWebAuthn(
      webAuthnPublicKeyCredentials: $webAuthnPublicKeyCredentials
    ) {
      id
      token
      tokenExpires
    }
  }
`;
export type ILoginWithWebAuthnMutationFn = Apollo.MutationFunction<
  ILoginWithWebAuthnMutation,
  ILoginWithWebAuthnMutationVariables
>;

/**
 * __useLoginWithWebAuthnMutation__
 *
 * To run a mutation, you first call `useLoginWithWebAuthnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithWebAuthnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithWebAuthnMutation, { data, loading, error }] = useLoginWithWebAuthnMutation({
 *   variables: {
 *      webAuthnPublicKeyCredentials: // value for 'webAuthnPublicKeyCredentials'
 *   },
 * });
 */
export function useLoginWithWebAuthnMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ILoginWithWebAuthnMutation,
    ILoginWithWebAuthnMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ILoginWithWebAuthnMutation,
    ILoginWithWebAuthnMutationVariables
  >(LoginWithWebAuthnDocument, options);
}
export type LoginWithWebAuthnMutationHookResult = ReturnType<
  typeof useLoginWithWebAuthnMutation
>;
export type LoginWithWebAuthnMutationResult =
  Apollo.MutationResult<ILoginWithWebAuthnMutation>;
export type LoginWithWebAuthnMutationOptions = Apollo.BaseMutationOptions<
  ILoginWithWebAuthnMutation,
  ILoginWithWebAuthnMutationVariables
>;
export const RemoveEmailDocument = gql`
  mutation RemoveEmail($email: String!, $userId: ID) {
    removeEmail(email: $email, userId: $userId) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type IRemoveEmailMutationFn = Apollo.MutationFunction<
  IRemoveEmailMutation,
  IRemoveEmailMutationVariables
>;

/**
 * __useRemoveEmailMutation__
 *
 * To run a mutation, you first call `useRemoveEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeEmailMutation, { data, loading, error }] = useRemoveEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveEmailMutation,
    IRemoveEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveEmailMutation,
    IRemoveEmailMutationVariables
  >(RemoveEmailDocument, options);
}
export type RemoveEmailMutationHookResult = ReturnType<
  typeof useRemoveEmailMutation
>;
export type RemoveEmailMutationResult =
  Apollo.MutationResult<IRemoveEmailMutation>;
export type RemoveEmailMutationOptions = Apollo.BaseMutationOptions<
  IRemoveEmailMutation,
  IRemoveEmailMutationVariables
>;
export const RemoveWeb3AddressDocument = gql`
  mutation RemoveWeb3Address($address: String!) {
    removeWeb3Address(address: $address) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type IRemoveWeb3AddressMutationFn = Apollo.MutationFunction<
  IRemoveWeb3AddressMutation,
  IRemoveWeb3AddressMutationVariables
>;

/**
 * __useRemoveWeb3AddressMutation__
 *
 * To run a mutation, you first call `useRemoveWeb3AddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveWeb3AddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeWeb3AddressMutation, { data, loading, error }] = useRemoveWeb3AddressMutation({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useRemoveWeb3AddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveWeb3AddressMutation,
    IRemoveWeb3AddressMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveWeb3AddressMutation,
    IRemoveWeb3AddressMutationVariables
  >(RemoveWeb3AddressDocument, options);
}
export type RemoveWeb3AddressMutationHookResult = ReturnType<
  typeof useRemoveWeb3AddressMutation
>;
export type RemoveWeb3AddressMutationResult =
  Apollo.MutationResult<IRemoveWeb3AddressMutation>;
export type RemoveWeb3AddressMutationOptions = Apollo.BaseMutationOptions<
  IRemoveWeb3AddressMutation,
  IRemoveWeb3AddressMutationVariables
>;
export const RemoveWebAuthCredentialsDocument = gql`
  mutation removeWebAuthCredentials($credentialsId: ID!) {
    removeWebAuthnCredentials(credentialsId: $credentialsId) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type IRemoveWebAuthCredentialsMutationFn = Apollo.MutationFunction<
  IRemoveWebAuthCredentialsMutation,
  IRemoveWebAuthCredentialsMutationVariables
>;

/**
 * __useRemoveWebAuthCredentialsMutation__
 *
 * To run a mutation, you first call `useRemoveWebAuthCredentialsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveWebAuthCredentialsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeWebAuthCredentialsMutation, { data, loading, error }] = useRemoveWebAuthCredentialsMutation({
 *   variables: {
 *      credentialsId: // value for 'credentialsId'
 *   },
 * });
 */
export function useRemoveWebAuthCredentialsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveWebAuthCredentialsMutation,
    IRemoveWebAuthCredentialsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveWebAuthCredentialsMutation,
    IRemoveWebAuthCredentialsMutationVariables
  >(RemoveWebAuthCredentialsDocument, options);
}
export type RemoveWebAuthCredentialsMutationHookResult = ReturnType<
  typeof useRemoveWebAuthCredentialsMutation
>;
export type RemoveWebAuthCredentialsMutationResult =
  Apollo.MutationResult<IRemoveWebAuthCredentialsMutation>;
export type RemoveWebAuthCredentialsMutationOptions =
  Apollo.BaseMutationOptions<
    IRemoveWebAuthCredentialsMutation,
    IRemoveWebAuthCredentialsMutationVariables
  >;
export const ResetPasswordDocument = gql`
  mutation ResetPassword($newPlainPassword: String, $token: String!) {
    resetPassword(newPlainPassword: $newPlainPassword, token: $token) {
      id
      token
      tokenExpires
    }
  }
`;
export type IResetPasswordMutationFn = Apollo.MutationFunction<
  IResetPasswordMutation,
  IResetPasswordMutationVariables
>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      newPlainPassword: // value for 'newPlainPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IResetPasswordMutation,
    IResetPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IResetPasswordMutation,
    IResetPasswordMutationVariables
  >(ResetPasswordDocument, options);
}
export type ResetPasswordMutationHookResult = ReturnType<
  typeof useResetPasswordMutation
>;
export type ResetPasswordMutationResult =
  Apollo.MutationResult<IResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  IResetPasswordMutation,
  IResetPasswordMutationVariables
>;
export const SendVerificationEmailDocument = gql`
  mutation SendVerificationEmail($email: String) {
    sendVerificationEmail(email: $email) {
      success
    }
  }
`;
export type ISendVerificationEmailMutationFn = Apollo.MutationFunction<
  ISendVerificationEmailMutation,
  ISendVerificationEmailMutationVariables
>;

/**
 * __useSendVerificationEmailMutation__
 *
 * To run a mutation, you first call `useSendVerificationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendVerificationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendVerificationEmailMutation, { data, loading, error }] = useSendVerificationEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendVerificationEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ISendVerificationEmailMutation,
    ISendVerificationEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ISendVerificationEmailMutation,
    ISendVerificationEmailMutationVariables
  >(SendVerificationEmailDocument, options);
}
export type SendVerificationEmailMutationHookResult = ReturnType<
  typeof useSendVerificationEmailMutation
>;
export type SendVerificationEmailMutationResult =
  Apollo.MutationResult<ISendVerificationEmailMutation>;
export type SendVerificationEmailMutationOptions = Apollo.BaseMutationOptions<
  ISendVerificationEmailMutation,
  ISendVerificationEmailMutationVariables
>;
export const SetPasswordDocument = gql`
  mutation SetPassword($newPlainPassword: String, $userId: ID!) {
    setPassword(newPlainPassword: $newPlainPassword, userId: $userId) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type ISetPasswordMutationFn = Apollo.MutationFunction<
  ISetPasswordMutation,
  ISetPasswordMutationVariables
>;

/**
 * __useSetPasswordMutation__
 *
 * To run a mutation, you first call `useSetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPasswordMutation, { data, loading, error }] = useSetPasswordMutation({
 *   variables: {
 *      newPlainPassword: // value for 'newPlainPassword'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ISetPasswordMutation,
    ISetPasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ISetPasswordMutation,
    ISetPasswordMutationVariables
  >(SetPasswordDocument, options);
}
export type SetPasswordMutationHookResult = ReturnType<
  typeof useSetPasswordMutation
>;
export type SetPasswordMutationResult =
  Apollo.MutationResult<ISetPasswordMutation>;
export type SetPasswordMutationOptions = Apollo.BaseMutationOptions<
  ISetPasswordMutation,
  ISetPasswordMutationVariables
>;
export const SetRolesDocument = gql`
  mutation SetRoles($roles: [String!]!, $userId: ID!) {
    setRoles(roles: $roles, userId: $userId) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type ISetRolesMutationFn = Apollo.MutationFunction<
  ISetRolesMutation,
  ISetRolesMutationVariables
>;

/**
 * __useSetRolesMutation__
 *
 * To run a mutation, you first call `useSetRolesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetRolesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setRolesMutation, { data, loading, error }] = useSetRolesMutation({
 *   variables: {
 *      roles: // value for 'roles'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSetRolesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ISetRolesMutation,
    ISetRolesMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ISetRolesMutation, ISetRolesMutationVariables>(
    SetRolesDocument,
    options,
  );
}
export type SetRolesMutationHookResult = ReturnType<typeof useSetRolesMutation>;
export type SetRolesMutationResult = Apollo.MutationResult<ISetRolesMutation>;
export type SetRolesMutationOptions = Apollo.BaseMutationOptions<
  ISetRolesMutation,
  ISetRolesMutationVariables
>;
export const SetUserTagsDocument = gql`
  mutation setUserTags($tags: [LowerCaseString]!, $userId: ID!) {
    setUserTags(tags: $tags, userId: $userId) {
      _id
      tags
    }
  }
`;
export type ISetUserTagsMutationFn = Apollo.MutationFunction<
  ISetUserTagsMutation,
  ISetUserTagsMutationVariables
>;

/**
 * __useSetUserTagsMutation__
 *
 * To run a mutation, you first call `useSetUserTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserTagsMutation, { data, loading, error }] = useSetUserTagsMutation({
 *   variables: {
 *      tags: // value for 'tags'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSetUserTagsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ISetUserTagsMutation,
    ISetUserTagsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ISetUserTagsMutation,
    ISetUserTagsMutationVariables
  >(SetUserTagsDocument, options);
}
export type SetUserTagsMutationHookResult = ReturnType<
  typeof useSetUserTagsMutation
>;
export type SetUserTagsMutationResult =
  Apollo.MutationResult<ISetUserTagsMutation>;
export type SetUserTagsMutationOptions = Apollo.BaseMutationOptions<
  ISetUserTagsMutation,
  ISetUserTagsMutationVariables
>;
export const SetUsernameDocument = gql`
  mutation SetUsername($username: String!, $userId: ID!) {
    setUsername(username: $username, userId: $userId) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type ISetUsernameMutationFn = Apollo.MutationFunction<
  ISetUsernameMutation,
  ISetUsernameMutationVariables
>;

/**
 * __useSetUsernameMutation__
 *
 * To run a mutation, you first call `useSetUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUsernameMutation, { data, loading, error }] = useSetUsernameMutation({
 *   variables: {
 *      username: // value for 'username'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSetUsernameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ISetUsernameMutation,
    ISetUsernameMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ISetUsernameMutation,
    ISetUsernameMutationVariables
  >(SetUsernameDocument, options);
}
export type SetUsernameMutationHookResult = ReturnType<
  typeof useSetUsernameMutation
>;
export type SetUsernameMutationResult =
  Apollo.MutationResult<ISetUsernameMutation>;
export type SetUsernameMutationOptions = Apollo.BaseMutationOptions<
  ISetUsernameMutation,
  ISetUsernameMutationVariables
>;
export const StopImpersonateDocument = gql`
  mutation StopImpersonate {
    stopImpersonation {
      id
      token
      tokenExpires
    }
  }
`;
export type IStopImpersonateMutationFn = Apollo.MutationFunction<
  IStopImpersonateMutation,
  IStopImpersonateMutationVariables
>;

/**
 * __useStopImpersonateMutation__
 *
 * To run a mutation, you first call `useStopImpersonateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopImpersonateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopImpersonateMutation, { data, loading, error }] = useStopImpersonateMutation({
 *   variables: {
 *   },
 * });
 */
export function useStopImpersonateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IStopImpersonateMutation,
    IStopImpersonateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IStopImpersonateMutation,
    IStopImpersonateMutationVariables
  >(StopImpersonateDocument, options);
}
export type StopImpersonateMutationHookResult = ReturnType<
  typeof useStopImpersonateMutation
>;
export type StopImpersonateMutationResult =
  Apollo.MutationResult<IStopImpersonateMutation>;
export type StopImpersonateMutationOptions = Apollo.BaseMutationOptions<
  IStopImpersonateMutation,
  IStopImpersonateMutationVariables
>;
export const UserDocument = gql`
  query User($userId: ID) {
    user(userId: $userId) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: Apollo.QueryHookOptions<IUserQuery, IUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IUserQuery, IUserQueryVariables>(
    UserDocument,
    options,
  );
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IUserQuery, IUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IUserQuery, IUserQueryVariables>(
    UserDocument,
    options,
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<
  IUserQuery,
  IUserQueryVariables
>;
export const UserWebAuthnCredentialsDocument = gql`
  query UserWebAuthnCredentials($userId: ID!) {
    user(userId: $userId) {
      _id
      webAuthnCredentials {
        _id
        created
        aaguid
        counter
        mdsMetadata {
          ...MD5MetaDataFragment
        }
      }
    }
  }
  ${Md5MetaDataFragmentFragmentDoc}
`;

/**
 * __useUserWebAuthnCredentialsQuery__
 *
 * To run a query within a React component, call `useUserWebAuthnCredentialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserWebAuthnCredentialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserWebAuthnCredentialsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserWebAuthnCredentialsQuery(
  baseOptions: Apollo.QueryHookOptions<
    IUserWebAuthnCredentialsQuery,
    IUserWebAuthnCredentialsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IUserWebAuthnCredentialsQuery,
    IUserWebAuthnCredentialsQueryVariables
  >(UserWebAuthnCredentialsDocument, options);
}
export function useUserWebAuthnCredentialsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IUserWebAuthnCredentialsQuery,
    IUserWebAuthnCredentialsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IUserWebAuthnCredentialsQuery,
    IUserWebAuthnCredentialsQueryVariables
  >(UserWebAuthnCredentialsDocument, options);
}
export type UserWebAuthnCredentialsQueryHookResult = ReturnType<
  typeof useUserWebAuthnCredentialsQuery
>;
export type UserWebAuthnCredentialsLazyQueryHookResult = ReturnType<
  typeof useUserWebAuthnCredentialsLazyQuery
>;
export type UserWebAuthnCredentialsQueryResult = Apollo.QueryResult<
  IUserWebAuthnCredentialsQuery,
  IUserWebAuthnCredentialsQueryVariables
>;
export const UsersDocument = gql`
  query Users(
    $limit: Int
    $offset: Int
    $includeGuests: Boolean
    $queryString: String
  ) {
    users(
      limit: $limit
      offset: $offset
      includeGuests: $includeGuests
      queryString: $queryString
    ) {
      ...UserFragment
    }
    usersCount(includeGuests: $includeGuests, queryString: $queryString)
  }
  ${UserFragmentFragmentDoc}
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      includeGuests: // value for 'includeGuests'
 *      queryString: // value for 'queryString'
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<IUsersQuery, IUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IUsersQuery, IUsersQueryVariables>(
    UsersDocument,
    options,
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IUsersQuery, IUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IUsersQuery, IUsersQueryVariables>(
    UsersDocument,
    options,
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<
  IUsersQuery,
  IUsersQueryVariables
>;
export const VerifyEmailDocument = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      id
      token
      tokenExpires
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type IVerifyEmailMutationFn = Apollo.MutationFunction<
  IVerifyEmailMutation,
  IVerifyEmailMutationVariables
>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IVerifyEmailMutation,
    IVerifyEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IVerifyEmailMutation,
    IVerifyEmailMutationVariables
  >(VerifyEmailDocument, options);
}
export type VerifyEmailMutationHookResult = ReturnType<
  typeof useVerifyEmailMutation
>;
export type VerifyEmailMutationResult =
  Apollo.MutationResult<IVerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<
  IVerifyEmailMutation,
  IVerifyEmailMutationVariables
>;
export const VerifyWeb3AddressDocument = gql`
  mutation VerifyWeb3Address($address: String!, $hash: String!) {
    verifyWeb3Address(address: $address, hash: $hash) {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type IVerifyWeb3AddressMutationFn = Apollo.MutationFunction<
  IVerifyWeb3AddressMutation,
  IVerifyWeb3AddressMutationVariables
>;

/**
 * __useVerifyWeb3AddressMutation__
 *
 * To run a mutation, you first call `useVerifyWeb3AddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyWeb3AddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyWeb3AddressMutation, { data, loading, error }] = useVerifyWeb3AddressMutation({
 *   variables: {
 *      address: // value for 'address'
 *      hash: // value for 'hash'
 *   },
 * });
 */
export function useVerifyWeb3AddressMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IVerifyWeb3AddressMutation,
    IVerifyWeb3AddressMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IVerifyWeb3AddressMutation,
    IVerifyWeb3AddressMutationVariables
  >(VerifyWeb3AddressDocument, options);
}
export type VerifyWeb3AddressMutationHookResult = ReturnType<
  typeof useVerifyWeb3AddressMutation
>;
export type VerifyWeb3AddressMutationResult =
  Apollo.MutationResult<IVerifyWeb3AddressMutation>;
export type VerifyWeb3AddressMutationOptions = Apollo.BaseMutationOptions<
  IVerifyWeb3AddressMutation,
  IVerifyWeb3AddressMutationVariables
>;
export const AddAssortmentFilterDocument = gql`
  mutation AddAssortmentFilter(
    $assortmentId: ID!
    $filterId: ID!
    $tags: [LowerCaseString!]
  ) {
    addAssortmentFilter(
      assortmentId: $assortmentId
      filterId: $filterId
      tags: $tags
    ) {
      _id
    }
  }
`;
export type IAddAssortmentFilterMutationFn = Apollo.MutationFunction<
  IAddAssortmentFilterMutation,
  IAddAssortmentFilterMutationVariables
>;

/**
 * __useAddAssortmentFilterMutation__
 *
 * To run a mutation, you first call `useAddAssortmentFilterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAssortmentFilterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAssortmentFilterMutation, { data, loading, error }] = useAddAssortmentFilterMutation({
 *   variables: {
 *      assortmentId: // value for 'assortmentId'
 *      filterId: // value for 'filterId'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useAddAssortmentFilterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IAddAssortmentFilterMutation,
    IAddAssortmentFilterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IAddAssortmentFilterMutation,
    IAddAssortmentFilterMutationVariables
  >(AddAssortmentFilterDocument, options);
}
export type AddAssortmentFilterMutationHookResult = ReturnType<
  typeof useAddAssortmentFilterMutation
>;
export type AddAssortmentFilterMutationResult =
  Apollo.MutationResult<IAddAssortmentFilterMutation>;
export type AddAssortmentFilterMutationOptions = Apollo.BaseMutationOptions<
  IAddAssortmentFilterMutation,
  IAddAssortmentFilterMutationVariables
>;
export const AddAssortmentLinkDocument = gql`
  mutation AddAssortmentLink(
    $parentAssortmentId: ID!
    $childAssortmentId: ID!
    $tags: [LowerCaseString!]
  ) {
    addAssortmentLink(
      parentAssortmentId: $parentAssortmentId
      childAssortmentId: $childAssortmentId
      tags: $tags
    ) {
      ...AssortmentLinkFragment
    }
  }
  ${AssortmentLinkFragmentFragmentDoc}
`;
export type IAddAssortmentLinkMutationFn = Apollo.MutationFunction<
  IAddAssortmentLinkMutation,
  IAddAssortmentLinkMutationVariables
>;

/**
 * __useAddAssortmentLinkMutation__
 *
 * To run a mutation, you first call `useAddAssortmentLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAssortmentLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAssortmentLinkMutation, { data, loading, error }] = useAddAssortmentLinkMutation({
 *   variables: {
 *      parentAssortmentId: // value for 'parentAssortmentId'
 *      childAssortmentId: // value for 'childAssortmentId'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useAddAssortmentLinkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IAddAssortmentLinkMutation,
    IAddAssortmentLinkMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IAddAssortmentLinkMutation,
    IAddAssortmentLinkMutationVariables
  >(AddAssortmentLinkDocument, options);
}
export type AddAssortmentLinkMutationHookResult = ReturnType<
  typeof useAddAssortmentLinkMutation
>;
export type AddAssortmentLinkMutationResult =
  Apollo.MutationResult<IAddAssortmentLinkMutation>;
export type AddAssortmentLinkMutationOptions = Apollo.BaseMutationOptions<
  IAddAssortmentLinkMutation,
  IAddAssortmentLinkMutationVariables
>;
export const AddAssortmentMediaDocument = gql`
  mutation AddAssortmentMedia($assortmentId: ID!, $media: Upload!) {
    addAssortmentMedia(assortmentId: $assortmentId, media: $media) {
      ...AssortmentMediaFragment
    }
  }
  ${AssortmentMediaFragmentFragmentDoc}
`;
export type IAddAssortmentMediaMutationFn = Apollo.MutationFunction<
  IAddAssortmentMediaMutation,
  IAddAssortmentMediaMutationVariables
>;

/**
 * __useAddAssortmentMediaMutation__
 *
 * To run a mutation, you first call `useAddAssortmentMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAssortmentMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAssortmentMediaMutation, { data, loading, error }] = useAddAssortmentMediaMutation({
 *   variables: {
 *      assortmentId: // value for 'assortmentId'
 *      media: // value for 'media'
 *   },
 * });
 */
export function useAddAssortmentMediaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IAddAssortmentMediaMutation,
    IAddAssortmentMediaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IAddAssortmentMediaMutation,
    IAddAssortmentMediaMutationVariables
  >(AddAssortmentMediaDocument, options);
}
export type AddAssortmentMediaMutationHookResult = ReturnType<
  typeof useAddAssortmentMediaMutation
>;
export type AddAssortmentMediaMutationResult =
  Apollo.MutationResult<IAddAssortmentMediaMutation>;
export type AddAssortmentMediaMutationOptions = Apollo.BaseMutationOptions<
  IAddAssortmentMediaMutation,
  IAddAssortmentMediaMutationVariables
>;
export const AddAssortmentProductDocument = gql`
  mutation AddAssortmentProduct(
    $assortmentId: ID!
    $productId: ID!
    $tags: [LowerCaseString!]
  ) {
    addAssortmentProduct(
      assortmentId: $assortmentId
      productId: $productId
      tags: $tags
    ) {
      _id
    }
  }
`;
export type IAddAssortmentProductMutationFn = Apollo.MutationFunction<
  IAddAssortmentProductMutation,
  IAddAssortmentProductMutationVariables
>;

/**
 * __useAddAssortmentProductMutation__
 *
 * To run a mutation, you first call `useAddAssortmentProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAssortmentProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAssortmentProductMutation, { data, loading, error }] = useAddAssortmentProductMutation({
 *   variables: {
 *      assortmentId: // value for 'assortmentId'
 *      productId: // value for 'productId'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useAddAssortmentProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IAddAssortmentProductMutation,
    IAddAssortmentProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IAddAssortmentProductMutation,
    IAddAssortmentProductMutationVariables
  >(AddAssortmentProductDocument, options);
}
export type AddAssortmentProductMutationHookResult = ReturnType<
  typeof useAddAssortmentProductMutation
>;
export type AddAssortmentProductMutationResult =
  Apollo.MutationResult<IAddAssortmentProductMutation>;
export type AddAssortmentProductMutationOptions = Apollo.BaseMutationOptions<
  IAddAssortmentProductMutation,
  IAddAssortmentProductMutationVariables
>;
export const AssortmentDocument = gql`
  query Assortment($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      ...AssortmentFragment
    }
  }
  ${AssortmentFragmentFragmentDoc}
`;

/**
 * __useAssortmentQuery__
 *
 * To run a query within a React component, call `useAssortmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssortmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssortmentQuery({
 *   variables: {
 *      assortmentId: // value for 'assortmentId'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useAssortmentQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IAssortmentQuery,
    IAssortmentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IAssortmentQuery, IAssortmentQueryVariables>(
    AssortmentDocument,
    options,
  );
}
export function useAssortmentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IAssortmentQuery,
    IAssortmentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IAssortmentQuery, IAssortmentQueryVariables>(
    AssortmentDocument,
    options,
  );
}
export type AssortmentQueryHookResult = ReturnType<typeof useAssortmentQuery>;
export type AssortmentLazyQueryHookResult = ReturnType<
  typeof useAssortmentLazyQuery
>;
export type AssortmentQueryResult = Apollo.QueryResult<
  IAssortmentQuery,
  IAssortmentQueryVariables
>;
export const AssortmentChildrenDocument = gql`
  query AssortmentChildren(
    $slugs: [String!]
    $includeInactive: Boolean
    $includeLeaves: Boolean
  ) {
    assortments(
      slugs: $slugs
      includeInactive: $includeInactive
      includeLeaves: $includeLeaves
    ) {
      ...AssortmentChildrenFragment
      children {
        ...AssortmentChildrenFragment
      }
    }
  }
  ${AssortmentChildrenFragmentFragmentDoc}
`;

/**
 * __useAssortmentChildrenQuery__
 *
 * To run a query within a React component, call `useAssortmentChildrenQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssortmentChildrenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssortmentChildrenQuery({
 *   variables: {
 *      slugs: // value for 'slugs'
 *      includeInactive: // value for 'includeInactive'
 *      includeLeaves: // value for 'includeLeaves'
 *   },
 * });
 */
export function useAssortmentChildrenQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IAssortmentChildrenQuery,
    IAssortmentChildrenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IAssortmentChildrenQuery,
    IAssortmentChildrenQueryVariables
  >(AssortmentChildrenDocument, options);
}
export function useAssortmentChildrenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IAssortmentChildrenQuery,
    IAssortmentChildrenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IAssortmentChildrenQuery,
    IAssortmentChildrenQueryVariables
  >(AssortmentChildrenDocument, options);
}
export type AssortmentChildrenQueryHookResult = ReturnType<
  typeof useAssortmentChildrenQuery
>;
export type AssortmentChildrenLazyQueryHookResult = ReturnType<
  typeof useAssortmentChildrenLazyQuery
>;
export type AssortmentChildrenQueryResult = Apollo.QueryResult<
  IAssortmentChildrenQuery,
  IAssortmentChildrenQueryVariables
>;
export const AssortmentFiltersDocument = gql`
  query AssortmentFilters($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      _id
      filterAssignments {
        _id
        sortKey
        tags
        filter {
          ...FilterFragment
        }
      }
    }
  }
  ${FilterFragmentFragmentDoc}
`;

/**
 * __useAssortmentFiltersQuery__
 *
 * To run a query within a React component, call `useAssortmentFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssortmentFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssortmentFiltersQuery({
 *   variables: {
 *      assortmentId: // value for 'assortmentId'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useAssortmentFiltersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IAssortmentFiltersQuery,
    IAssortmentFiltersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IAssortmentFiltersQuery,
    IAssortmentFiltersQueryVariables
  >(AssortmentFiltersDocument, options);
}
export function useAssortmentFiltersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IAssortmentFiltersQuery,
    IAssortmentFiltersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IAssortmentFiltersQuery,
    IAssortmentFiltersQueryVariables
  >(AssortmentFiltersDocument, options);
}
export type AssortmentFiltersQueryHookResult = ReturnType<
  typeof useAssortmentFiltersQuery
>;
export type AssortmentFiltersLazyQueryHookResult = ReturnType<
  typeof useAssortmentFiltersLazyQuery
>;
export type AssortmentFiltersQueryResult = Apollo.QueryResult<
  IAssortmentFiltersQuery,
  IAssortmentFiltersQueryVariables
>;
export const AssortmentLinksDocument = gql`
  query AssortmentLinks($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      _id
      linkedAssortments {
        _id
        sortKey
        parent {
          ...AssortmentFragment
        }
        child {
          ...AssortmentFragment
        }
      }
    }
  }
  ${AssortmentFragmentFragmentDoc}
`;

/**
 * __useAssortmentLinksQuery__
 *
 * To run a query within a React component, call `useAssortmentLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssortmentLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssortmentLinksQuery({
 *   variables: {
 *      assortmentId: // value for 'assortmentId'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useAssortmentLinksQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IAssortmentLinksQuery,
    IAssortmentLinksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IAssortmentLinksQuery, IAssortmentLinksQueryVariables>(
    AssortmentLinksDocument,
    options,
  );
}
export function useAssortmentLinksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IAssortmentLinksQuery,
    IAssortmentLinksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IAssortmentLinksQuery,
    IAssortmentLinksQueryVariables
  >(AssortmentLinksDocument, options);
}
export type AssortmentLinksQueryHookResult = ReturnType<
  typeof useAssortmentLinksQuery
>;
export type AssortmentLinksLazyQueryHookResult = ReturnType<
  typeof useAssortmentLinksLazyQuery
>;
export type AssortmentLinksQueryResult = Apollo.QueryResult<
  IAssortmentLinksQuery,
  IAssortmentLinksQueryVariables
>;
export const AssortmentMediaDocument = gql`
  query AssortmentMedia($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      _id
      media {
        _id
        tags
        texts {
          _id
          locale
          title
          subtitle
        }
        file {
          _id
          url
          name
          size
          type
        }
        sortKey
      }
    }
  }
`;

/**
 * __useAssortmentMediaQuery__
 *
 * To run a query within a React component, call `useAssortmentMediaQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssortmentMediaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssortmentMediaQuery({
 *   variables: {
 *      assortmentId: // value for 'assortmentId'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useAssortmentMediaQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IAssortmentMediaQuery,
    IAssortmentMediaQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IAssortmentMediaQuery, IAssortmentMediaQueryVariables>(
    AssortmentMediaDocument,
    options,
  );
}
export function useAssortmentMediaLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IAssortmentMediaQuery,
    IAssortmentMediaQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IAssortmentMediaQuery,
    IAssortmentMediaQueryVariables
  >(AssortmentMediaDocument, options);
}
export type AssortmentMediaQueryHookResult = ReturnType<
  typeof useAssortmentMediaQuery
>;
export type AssortmentMediaLazyQueryHookResult = ReturnType<
  typeof useAssortmentMediaLazyQuery
>;
export type AssortmentMediaQueryResult = Apollo.QueryResult<
  IAssortmentMediaQuery,
  IAssortmentMediaQueryVariables
>;
export const AssortmentPathsDocument = gql`
  query AssortmentPaths($assortmentId: ID!) {
    assortment(assortmentId: $assortmentId) {
      assortmentPaths {
        links {
          assortmentId
        }
      }
    }
  }
`;

/**
 * __useAssortmentPathsQuery__
 *
 * To run a query within a React component, call `useAssortmentPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssortmentPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssortmentPathsQuery({
 *   variables: {
 *      assortmentId: // value for 'assortmentId'
 *   },
 * });
 */
export function useAssortmentPathsQuery(
  baseOptions: Apollo.QueryHookOptions<
    IAssortmentPathsQuery,
    IAssortmentPathsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IAssortmentPathsQuery, IAssortmentPathsQueryVariables>(
    AssortmentPathsDocument,
    options,
  );
}
export function useAssortmentPathsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IAssortmentPathsQuery,
    IAssortmentPathsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IAssortmentPathsQuery,
    IAssortmentPathsQueryVariables
  >(AssortmentPathsDocument, options);
}
export type AssortmentPathsQueryHookResult = ReturnType<
  typeof useAssortmentPathsQuery
>;
export type AssortmentPathsLazyQueryHookResult = ReturnType<
  typeof useAssortmentPathsLazyQuery
>;
export type AssortmentPathsQueryResult = Apollo.QueryResult<
  IAssortmentPathsQuery,
  IAssortmentPathsQueryVariables
>;
export const AssortmentProductsDocument = gql`
  query AssortmentProducts($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      _id
      productAssignments {
        _id
        sortKey
        tags
        product {
          ...ProductBriefFragment
        }
      }
    }
  }
  ${ProductBriefFragmentFragmentDoc}
`;

/**
 * __useAssortmentProductsQuery__
 *
 * To run a query within a React component, call `useAssortmentProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssortmentProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssortmentProductsQuery({
 *   variables: {
 *      assortmentId: // value for 'assortmentId'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useAssortmentProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IAssortmentProductsQuery,
    IAssortmentProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IAssortmentProductsQuery,
    IAssortmentProductsQueryVariables
  >(AssortmentProductsDocument, options);
}
export function useAssortmentProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IAssortmentProductsQuery,
    IAssortmentProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IAssortmentProductsQuery,
    IAssortmentProductsQueryVariables
  >(AssortmentProductsDocument, options);
}
export type AssortmentProductsQueryHookResult = ReturnType<
  typeof useAssortmentProductsQuery
>;
export type AssortmentProductsLazyQueryHookResult = ReturnType<
  typeof useAssortmentProductsLazyQuery
>;
export type AssortmentProductsQueryResult = Apollo.QueryResult<
  IAssortmentProductsQuery,
  IAssortmentProductsQueryVariables
>;
export const AssortmentsDocument = gql`
  query Assortments(
    $queryString: String
    $tags: [LowerCaseString!]
    $slugs: [String!]
    $limit: Int
    $offset: Int
    $includeInactive: Boolean
    $includeLeaves: Boolean
    $sort: [SortOptionInput!]
  ) {
    assortments(
      queryString: $queryString
      tags: $tags
      slugs: $slugs
      limit: $limit
      offset: $offset
      includeInactive: $includeInactive
      includeLeaves: $includeLeaves
      sort: $sort
    ) {
      ...AssortmentFragment
      linkedAssortments {
        child {
          _id
        }
      }
    }
    assortmentsCount(
      tags: $tags
      slugs: $slugs
      includeInactive: $includeInactive
      includeLeaves: $includeLeaves
      queryString: $queryString
    )
  }
  ${AssortmentFragmentFragmentDoc}
`;

/**
 * __useAssortmentsQuery__
 *
 * To run a query within a React component, call `useAssortmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssortmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssortmentsQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *      tags: // value for 'tags'
 *      slugs: // value for 'slugs'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      includeInactive: // value for 'includeInactive'
 *      includeLeaves: // value for 'includeLeaves'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useAssortmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IAssortmentsQuery,
    IAssortmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IAssortmentsQuery, IAssortmentsQueryVariables>(
    AssortmentsDocument,
    options,
  );
}
export function useAssortmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IAssortmentsQuery,
    IAssortmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IAssortmentsQuery, IAssortmentsQueryVariables>(
    AssortmentsDocument,
    options,
  );
}
export type AssortmentsQueryHookResult = ReturnType<typeof useAssortmentsQuery>;
export type AssortmentsLazyQueryHookResult = ReturnType<
  typeof useAssortmentsLazyQuery
>;
export type AssortmentsQueryResult = Apollo.QueryResult<
  IAssortmentsQuery,
  IAssortmentsQueryVariables
>;
export const AssortmentsCountDocument = gql`
  query AssortmentsCount {
    assortmentsCount
  }
`;

/**
 * __useAssortmentsCountQuery__
 *
 * To run a query within a React component, call `useAssortmentsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssortmentsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssortmentsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useAssortmentsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IAssortmentsCountQuery,
    IAssortmentsCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IAssortmentsCountQuery,
    IAssortmentsCountQueryVariables
  >(AssortmentsCountDocument, options);
}
export function useAssortmentsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IAssortmentsCountQuery,
    IAssortmentsCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IAssortmentsCountQuery,
    IAssortmentsCountQueryVariables
  >(AssortmentsCountDocument, options);
}
export type AssortmentsCountQueryHookResult = ReturnType<
  typeof useAssortmentsCountQuery
>;
export type AssortmentsCountLazyQueryHookResult = ReturnType<
  typeof useAssortmentsCountLazyQuery
>;
export type AssortmentsCountQueryResult = Apollo.QueryResult<
  IAssortmentsCountQuery,
  IAssortmentsCountQueryVariables
>;
export const CreateAssortmentDocument = gql`
  mutation CreateAssortment($assortment: CreateAssortmentInput!) {
    createAssortment(assortment: $assortment) {
      ...AssortmentFragment
    }
  }
  ${AssortmentFragmentFragmentDoc}
`;
export type ICreateAssortmentMutationFn = Apollo.MutationFunction<
  ICreateAssortmentMutation,
  ICreateAssortmentMutationVariables
>;

/**
 * __useCreateAssortmentMutation__
 *
 * To run a mutation, you first call `useCreateAssortmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssortmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssortmentMutation, { data, loading, error }] = useCreateAssortmentMutation({
 *   variables: {
 *      assortment: // value for 'assortment'
 *   },
 * });
 */
export function useCreateAssortmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateAssortmentMutation,
    ICreateAssortmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateAssortmentMutation,
    ICreateAssortmentMutationVariables
  >(CreateAssortmentDocument, options);
}
export type CreateAssortmentMutationHookResult = ReturnType<
  typeof useCreateAssortmentMutation
>;
export type CreateAssortmentMutationResult =
  Apollo.MutationResult<ICreateAssortmentMutation>;
export type CreateAssortmentMutationOptions = Apollo.BaseMutationOptions<
  ICreateAssortmentMutation,
  ICreateAssortmentMutationVariables
>;
export const RemoveAssortmentDocument = gql`
  mutation RemoveAssortment($assortmentId: ID!) {
    removeAssortment(assortmentId: $assortmentId) {
      _id
    }
  }
`;
export type IRemoveAssortmentMutationFn = Apollo.MutationFunction<
  IRemoveAssortmentMutation,
  IRemoveAssortmentMutationVariables
>;

/**
 * __useRemoveAssortmentMutation__
 *
 * To run a mutation, you first call `useRemoveAssortmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAssortmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAssortmentMutation, { data, loading, error }] = useRemoveAssortmentMutation({
 *   variables: {
 *      assortmentId: // value for 'assortmentId'
 *   },
 * });
 */
export function useRemoveAssortmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveAssortmentMutation,
    IRemoveAssortmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveAssortmentMutation,
    IRemoveAssortmentMutationVariables
  >(RemoveAssortmentDocument, options);
}
export type RemoveAssortmentMutationHookResult = ReturnType<
  typeof useRemoveAssortmentMutation
>;
export type RemoveAssortmentMutationResult =
  Apollo.MutationResult<IRemoveAssortmentMutation>;
export type RemoveAssortmentMutationOptions = Apollo.BaseMutationOptions<
  IRemoveAssortmentMutation,
  IRemoveAssortmentMutationVariables
>;
export const RemoveAssortmentFilterDocument = gql`
  mutation RemoveAssortmentFilter($assortmentFilterId: ID!) {
    removeAssortmentFilter(assortmentFilterId: $assortmentFilterId) {
      _id
    }
  }
`;
export type IRemoveAssortmentFilterMutationFn = Apollo.MutationFunction<
  IRemoveAssortmentFilterMutation,
  IRemoveAssortmentFilterMutationVariables
>;

/**
 * __useRemoveAssortmentFilterMutation__
 *
 * To run a mutation, you first call `useRemoveAssortmentFilterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAssortmentFilterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAssortmentFilterMutation, { data, loading, error }] = useRemoveAssortmentFilterMutation({
 *   variables: {
 *      assortmentFilterId: // value for 'assortmentFilterId'
 *   },
 * });
 */
export function useRemoveAssortmentFilterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveAssortmentFilterMutation,
    IRemoveAssortmentFilterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveAssortmentFilterMutation,
    IRemoveAssortmentFilterMutationVariables
  >(RemoveAssortmentFilterDocument, options);
}
export type RemoveAssortmentFilterMutationHookResult = ReturnType<
  typeof useRemoveAssortmentFilterMutation
>;
export type RemoveAssortmentFilterMutationResult =
  Apollo.MutationResult<IRemoveAssortmentFilterMutation>;
export type RemoveAssortmentFilterMutationOptions = Apollo.BaseMutationOptions<
  IRemoveAssortmentFilterMutation,
  IRemoveAssortmentFilterMutationVariables
>;
export const RemoveAssortmentLinkDocument = gql`
  mutation RemoveAssortmentLink($assortmentLinkId: ID!) {
    removeAssortmentLink(assortmentLinkId: $assortmentLinkId) {
      ...AssortmentLinkFragment
    }
  }
  ${AssortmentLinkFragmentFragmentDoc}
`;
export type IRemoveAssortmentLinkMutationFn = Apollo.MutationFunction<
  IRemoveAssortmentLinkMutation,
  IRemoveAssortmentLinkMutationVariables
>;

/**
 * __useRemoveAssortmentLinkMutation__
 *
 * To run a mutation, you first call `useRemoveAssortmentLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAssortmentLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAssortmentLinkMutation, { data, loading, error }] = useRemoveAssortmentLinkMutation({
 *   variables: {
 *      assortmentLinkId: // value for 'assortmentLinkId'
 *   },
 * });
 */
export function useRemoveAssortmentLinkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveAssortmentLinkMutation,
    IRemoveAssortmentLinkMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveAssortmentLinkMutation,
    IRemoveAssortmentLinkMutationVariables
  >(RemoveAssortmentLinkDocument, options);
}
export type RemoveAssortmentLinkMutationHookResult = ReturnType<
  typeof useRemoveAssortmentLinkMutation
>;
export type RemoveAssortmentLinkMutationResult =
  Apollo.MutationResult<IRemoveAssortmentLinkMutation>;
export type RemoveAssortmentLinkMutationOptions = Apollo.BaseMutationOptions<
  IRemoveAssortmentLinkMutation,
  IRemoveAssortmentLinkMutationVariables
>;
export const RemoveAssortmentMediaDocument = gql`
  mutation RemoveAssortmentMedia($assortmentMediaId: ID!) {
    removeAssortmentMedia(assortmentMediaId: $assortmentMediaId) {
      _id
    }
  }
`;
export type IRemoveAssortmentMediaMutationFn = Apollo.MutationFunction<
  IRemoveAssortmentMediaMutation,
  IRemoveAssortmentMediaMutationVariables
>;

/**
 * __useRemoveAssortmentMediaMutation__
 *
 * To run a mutation, you first call `useRemoveAssortmentMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAssortmentMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAssortmentMediaMutation, { data, loading, error }] = useRemoveAssortmentMediaMutation({
 *   variables: {
 *      assortmentMediaId: // value for 'assortmentMediaId'
 *   },
 * });
 */
export function useRemoveAssortmentMediaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveAssortmentMediaMutation,
    IRemoveAssortmentMediaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveAssortmentMediaMutation,
    IRemoveAssortmentMediaMutationVariables
  >(RemoveAssortmentMediaDocument, options);
}
export type RemoveAssortmentMediaMutationHookResult = ReturnType<
  typeof useRemoveAssortmentMediaMutation
>;
export type RemoveAssortmentMediaMutationResult =
  Apollo.MutationResult<IRemoveAssortmentMediaMutation>;
export type RemoveAssortmentMediaMutationOptions = Apollo.BaseMutationOptions<
  IRemoveAssortmentMediaMutation,
  IRemoveAssortmentMediaMutationVariables
>;
export const RemoveAssortmentProductDocument = gql`
  mutation RemoveAssortmentProduct($assortmentProductId: ID!) {
    removeAssortmentProduct(assortmentProductId: $assortmentProductId) {
      _id
    }
  }
`;
export type IRemoveAssortmentProductMutationFn = Apollo.MutationFunction<
  IRemoveAssortmentProductMutation,
  IRemoveAssortmentProductMutationVariables
>;

/**
 * __useRemoveAssortmentProductMutation__
 *
 * To run a mutation, you first call `useRemoveAssortmentProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAssortmentProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAssortmentProductMutation, { data, loading, error }] = useRemoveAssortmentProductMutation({
 *   variables: {
 *      assortmentProductId: // value for 'assortmentProductId'
 *   },
 * });
 */
export function useRemoveAssortmentProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveAssortmentProductMutation,
    IRemoveAssortmentProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveAssortmentProductMutation,
    IRemoveAssortmentProductMutationVariables
  >(RemoveAssortmentProductDocument, options);
}
export type RemoveAssortmentProductMutationHookResult = ReturnType<
  typeof useRemoveAssortmentProductMutation
>;
export type RemoveAssortmentProductMutationResult =
  Apollo.MutationResult<IRemoveAssortmentProductMutation>;
export type RemoveAssortmentProductMutationOptions = Apollo.BaseMutationOptions<
  IRemoveAssortmentProductMutation,
  IRemoveAssortmentProductMutationVariables
>;
export const ReorderAssortmentFiltersDocument = gql`
  mutation ReorderAssortmentFilters(
    $sortKeys: [ReorderAssortmentFilterInput!]!
  ) {
    reorderAssortmentFilters(sortKeys: $sortKeys) {
      _id
    }
  }
`;
export type IReorderAssortmentFiltersMutationFn = Apollo.MutationFunction<
  IReorderAssortmentFiltersMutation,
  IReorderAssortmentFiltersMutationVariables
>;

/**
 * __useReorderAssortmentFiltersMutation__
 *
 * To run a mutation, you first call `useReorderAssortmentFiltersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReorderAssortmentFiltersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reorderAssortmentFiltersMutation, { data, loading, error }] = useReorderAssortmentFiltersMutation({
 *   variables: {
 *      sortKeys: // value for 'sortKeys'
 *   },
 * });
 */
export function useReorderAssortmentFiltersMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IReorderAssortmentFiltersMutation,
    IReorderAssortmentFiltersMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IReorderAssortmentFiltersMutation,
    IReorderAssortmentFiltersMutationVariables
  >(ReorderAssortmentFiltersDocument, options);
}
export type ReorderAssortmentFiltersMutationHookResult = ReturnType<
  typeof useReorderAssortmentFiltersMutation
>;
export type ReorderAssortmentFiltersMutationResult =
  Apollo.MutationResult<IReorderAssortmentFiltersMutation>;
export type ReorderAssortmentFiltersMutationOptions =
  Apollo.BaseMutationOptions<
    IReorderAssortmentFiltersMutation,
    IReorderAssortmentFiltersMutationVariables
  >;
export const ReorderAssortmentLinksDocument = gql`
  mutation ReorderAssortmentLinks($sortKeys: [ReorderAssortmentLinkInput!]!) {
    reorderAssortmentLinks(sortKeys: $sortKeys) {
      _id
    }
  }
`;
export type IReorderAssortmentLinksMutationFn = Apollo.MutationFunction<
  IReorderAssortmentLinksMutation,
  IReorderAssortmentLinksMutationVariables
>;

/**
 * __useReorderAssortmentLinksMutation__
 *
 * To run a mutation, you first call `useReorderAssortmentLinksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReorderAssortmentLinksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reorderAssortmentLinksMutation, { data, loading, error }] = useReorderAssortmentLinksMutation({
 *   variables: {
 *      sortKeys: // value for 'sortKeys'
 *   },
 * });
 */
export function useReorderAssortmentLinksMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IReorderAssortmentLinksMutation,
    IReorderAssortmentLinksMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IReorderAssortmentLinksMutation,
    IReorderAssortmentLinksMutationVariables
  >(ReorderAssortmentLinksDocument, options);
}
export type ReorderAssortmentLinksMutationHookResult = ReturnType<
  typeof useReorderAssortmentLinksMutation
>;
export type ReorderAssortmentLinksMutationResult =
  Apollo.MutationResult<IReorderAssortmentLinksMutation>;
export type ReorderAssortmentLinksMutationOptions = Apollo.BaseMutationOptions<
  IReorderAssortmentLinksMutation,
  IReorderAssortmentLinksMutationVariables
>;
export const ReorderAssortmentMediaDocument = gql`
  mutation ReorderAssortmentMedia($sortKeys: [ReorderAssortmentMediaInput!]!) {
    reorderAssortmentMedia(sortKeys: $sortKeys) {
      _id
    }
  }
`;
export type IReorderAssortmentMediaMutationFn = Apollo.MutationFunction<
  IReorderAssortmentMediaMutation,
  IReorderAssortmentMediaMutationVariables
>;

/**
 * __useReorderAssortmentMediaMutation__
 *
 * To run a mutation, you first call `useReorderAssortmentMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReorderAssortmentMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reorderAssortmentMediaMutation, { data, loading, error }] = useReorderAssortmentMediaMutation({
 *   variables: {
 *      sortKeys: // value for 'sortKeys'
 *   },
 * });
 */
export function useReorderAssortmentMediaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IReorderAssortmentMediaMutation,
    IReorderAssortmentMediaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IReorderAssortmentMediaMutation,
    IReorderAssortmentMediaMutationVariables
  >(ReorderAssortmentMediaDocument, options);
}
export type ReorderAssortmentMediaMutationHookResult = ReturnType<
  typeof useReorderAssortmentMediaMutation
>;
export type ReorderAssortmentMediaMutationResult =
  Apollo.MutationResult<IReorderAssortmentMediaMutation>;
export type ReorderAssortmentMediaMutationOptions = Apollo.BaseMutationOptions<
  IReorderAssortmentMediaMutation,
  IReorderAssortmentMediaMutationVariables
>;
export const ReorderAssortmentProductsDocument = gql`
  mutation ReorderAssortmentProducts(
    $sortKeys: [ReorderAssortmentProductInput!]!
  ) {
    reorderAssortmentProducts(sortKeys: $sortKeys) {
      _id
    }
  }
`;
export type IReorderAssortmentProductsMutationFn = Apollo.MutationFunction<
  IReorderAssortmentProductsMutation,
  IReorderAssortmentProductsMutationVariables
>;

/**
 * __useReorderAssortmentProductsMutation__
 *
 * To run a mutation, you first call `useReorderAssortmentProductsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReorderAssortmentProductsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reorderAssortmentProductsMutation, { data, loading, error }] = useReorderAssortmentProductsMutation({
 *   variables: {
 *      sortKeys: // value for 'sortKeys'
 *   },
 * });
 */
export function useReorderAssortmentProductsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IReorderAssortmentProductsMutation,
    IReorderAssortmentProductsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IReorderAssortmentProductsMutation,
    IReorderAssortmentProductsMutationVariables
  >(ReorderAssortmentProductsDocument, options);
}
export type ReorderAssortmentProductsMutationHookResult = ReturnType<
  typeof useReorderAssortmentProductsMutation
>;
export type ReorderAssortmentProductsMutationResult =
  Apollo.MutationResult<IReorderAssortmentProductsMutation>;
export type ReorderAssortmentProductsMutationOptions =
  Apollo.BaseMutationOptions<
    IReorderAssortmentProductsMutation,
    IReorderAssortmentProductsMutationVariables
  >;
export const SearchAssortmentsDocument = gql`
  query SearchAssortments($queryString: String, $offset: Int, $limit: Int) {
    searchAssortments(queryString: $queryString, includeInactive: true) {
      assortments(limit: $limit, offset: $offset) {
        ...AssortmentFragment
      }
    }
  }
  ${AssortmentFragmentFragmentDoc}
`;

/**
 * __useSearchAssortmentsQuery__
 *
 * To run a query within a React component, call `useSearchAssortmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAssortmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAssortmentsQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchAssortmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ISearchAssortmentsQuery,
    ISearchAssortmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ISearchAssortmentsQuery,
    ISearchAssortmentsQueryVariables
  >(SearchAssortmentsDocument, options);
}
export function useSearchAssortmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ISearchAssortmentsQuery,
    ISearchAssortmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ISearchAssortmentsQuery,
    ISearchAssortmentsQueryVariables
  >(SearchAssortmentsDocument, options);
}
export type SearchAssortmentsQueryHookResult = ReturnType<
  typeof useSearchAssortmentsQuery
>;
export type SearchAssortmentsLazyQueryHookResult = ReturnType<
  typeof useSearchAssortmentsLazyQuery
>;
export type SearchAssortmentsQueryResult = Apollo.QueryResult<
  ISearchAssortmentsQuery,
  ISearchAssortmentsQueryVariables
>;
export const SetBaseAssortmentDocument = gql`
  mutation SetBaseAssortment($assortmentId: ID!) {
    setBaseAssortment(assortmentId: $assortmentId) {
      _id
      isBase
    }
  }
`;
export type ISetBaseAssortmentMutationFn = Apollo.MutationFunction<
  ISetBaseAssortmentMutation,
  ISetBaseAssortmentMutationVariables
>;

/**
 * __useSetBaseAssortmentMutation__
 *
 * To run a mutation, you first call `useSetBaseAssortmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetBaseAssortmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setBaseAssortmentMutation, { data, loading, error }] = useSetBaseAssortmentMutation({
 *   variables: {
 *      assortmentId: // value for 'assortmentId'
 *   },
 * });
 */
export function useSetBaseAssortmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ISetBaseAssortmentMutation,
    ISetBaseAssortmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ISetBaseAssortmentMutation,
    ISetBaseAssortmentMutationVariables
  >(SetBaseAssortmentDocument, options);
}
export type SetBaseAssortmentMutationHookResult = ReturnType<
  typeof useSetBaseAssortmentMutation
>;
export type SetBaseAssortmentMutationResult =
  Apollo.MutationResult<ISetBaseAssortmentMutation>;
export type SetBaseAssortmentMutationOptions = Apollo.BaseMutationOptions<
  ISetBaseAssortmentMutation,
  ISetBaseAssortmentMutationVariables
>;
export const TranslatedAssortmentMediaTextsDocument = gql`
  query TranslatedAssortmentMediaTexts($assortmentMediaId: ID!) {
    translatedAssortmentMediaTexts(assortmentMediaId: $assortmentMediaId) {
      ...AssortmentMediaTextsFragment
    }
  }
  ${AssortmentMediaTextsFragmentFragmentDoc}
`;

/**
 * __useTranslatedAssortmentMediaTextsQuery__
 *
 * To run a query within a React component, call `useTranslatedAssortmentMediaTextsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTranslatedAssortmentMediaTextsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranslatedAssortmentMediaTextsQuery({
 *   variables: {
 *      assortmentMediaId: // value for 'assortmentMediaId'
 *   },
 * });
 */
export function useTranslatedAssortmentMediaTextsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ITranslatedAssortmentMediaTextsQuery,
    ITranslatedAssortmentMediaTextsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ITranslatedAssortmentMediaTextsQuery,
    ITranslatedAssortmentMediaTextsQueryVariables
  >(TranslatedAssortmentMediaTextsDocument, options);
}
export function useTranslatedAssortmentMediaTextsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ITranslatedAssortmentMediaTextsQuery,
    ITranslatedAssortmentMediaTextsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ITranslatedAssortmentMediaTextsQuery,
    ITranslatedAssortmentMediaTextsQueryVariables
  >(TranslatedAssortmentMediaTextsDocument, options);
}
export type TranslatedAssortmentMediaTextsQueryHookResult = ReturnType<
  typeof useTranslatedAssortmentMediaTextsQuery
>;
export type TranslatedAssortmentMediaTextsLazyQueryHookResult = ReturnType<
  typeof useTranslatedAssortmentMediaTextsLazyQuery
>;
export type TranslatedAssortmentMediaTextsQueryResult = Apollo.QueryResult<
  ITranslatedAssortmentMediaTextsQuery,
  ITranslatedAssortmentMediaTextsQueryVariables
>;
export const TranslatedAssortmentTextsDocument = gql`
  query TranslatedAssortmentTexts($assortmentId: ID!) {
    translatedAssortmentTexts(assortmentId: $assortmentId) {
      ...AssortmentTextsFragment
    }
  }
  ${AssortmentTextsFragmentFragmentDoc}
`;

/**
 * __useTranslatedAssortmentTextsQuery__
 *
 * To run a query within a React component, call `useTranslatedAssortmentTextsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTranslatedAssortmentTextsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranslatedAssortmentTextsQuery({
 *   variables: {
 *      assortmentId: // value for 'assortmentId'
 *   },
 * });
 */
export function useTranslatedAssortmentTextsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ITranslatedAssortmentTextsQuery,
    ITranslatedAssortmentTextsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ITranslatedAssortmentTextsQuery,
    ITranslatedAssortmentTextsQueryVariables
  >(TranslatedAssortmentTextsDocument, options);
}
export function useTranslatedAssortmentTextsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ITranslatedAssortmentTextsQuery,
    ITranslatedAssortmentTextsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ITranslatedAssortmentTextsQuery,
    ITranslatedAssortmentTextsQueryVariables
  >(TranslatedAssortmentTextsDocument, options);
}
export type TranslatedAssortmentTextsQueryHookResult = ReturnType<
  typeof useTranslatedAssortmentTextsQuery
>;
export type TranslatedAssortmentTextsLazyQueryHookResult = ReturnType<
  typeof useTranslatedAssortmentTextsLazyQuery
>;
export type TranslatedAssortmentTextsQueryResult = Apollo.QueryResult<
  ITranslatedAssortmentTextsQuery,
  ITranslatedAssortmentTextsQueryVariables
>;
export const UpdateAssortmentDocument = gql`
  mutation UpdateAssortment(
    $assortment: UpdateAssortmentInput!
    $assortmentId: ID!
  ) {
    updateAssortment(assortment: $assortment, assortmentId: $assortmentId) {
      ...AssortmentFragment
    }
  }
  ${AssortmentFragmentFragmentDoc}
`;
export type IUpdateAssortmentMutationFn = Apollo.MutationFunction<
  IUpdateAssortmentMutation,
  IUpdateAssortmentMutationVariables
>;

/**
 * __useUpdateAssortmentMutation__
 *
 * To run a mutation, you first call `useUpdateAssortmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssortmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAssortmentMutation, { data, loading, error }] = useUpdateAssortmentMutation({
 *   variables: {
 *      assortment: // value for 'assortment'
 *      assortmentId: // value for 'assortmentId'
 *   },
 * });
 */
export function useUpdateAssortmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateAssortmentMutation,
    IUpdateAssortmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateAssortmentMutation,
    IUpdateAssortmentMutationVariables
  >(UpdateAssortmentDocument, options);
}
export type UpdateAssortmentMutationHookResult = ReturnType<
  typeof useUpdateAssortmentMutation
>;
export type UpdateAssortmentMutationResult =
  Apollo.MutationResult<IUpdateAssortmentMutation>;
export type UpdateAssortmentMutationOptions = Apollo.BaseMutationOptions<
  IUpdateAssortmentMutation,
  IUpdateAssortmentMutationVariables
>;
export const UpdateAssortmentMediaTextsDocument = gql`
  mutation UpdateAssortmentMediaTexts(
    $assortmentMediaId: ID!
    $texts: [UpdateAssortmentMediaTextInput!]!
  ) {
    updateAssortmentMediaTexts(
      assortmentMediaId: $assortmentMediaId
      texts: $texts
    ) {
      ...AssortmentMediaTextsFragment
    }
  }
  ${AssortmentMediaTextsFragmentFragmentDoc}
`;
export type IUpdateAssortmentMediaTextsMutationFn = Apollo.MutationFunction<
  IUpdateAssortmentMediaTextsMutation,
  IUpdateAssortmentMediaTextsMutationVariables
>;

/**
 * __useUpdateAssortmentMediaTextsMutation__
 *
 * To run a mutation, you first call `useUpdateAssortmentMediaTextsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssortmentMediaTextsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAssortmentMediaTextsMutation, { data, loading, error }] = useUpdateAssortmentMediaTextsMutation({
 *   variables: {
 *      assortmentMediaId: // value for 'assortmentMediaId'
 *      texts: // value for 'texts'
 *   },
 * });
 */
export function useUpdateAssortmentMediaTextsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateAssortmentMediaTextsMutation,
    IUpdateAssortmentMediaTextsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateAssortmentMediaTextsMutation,
    IUpdateAssortmentMediaTextsMutationVariables
  >(UpdateAssortmentMediaTextsDocument, options);
}
export type UpdateAssortmentMediaTextsMutationHookResult = ReturnType<
  typeof useUpdateAssortmentMediaTextsMutation
>;
export type UpdateAssortmentMediaTextsMutationResult =
  Apollo.MutationResult<IUpdateAssortmentMediaTextsMutation>;
export type UpdateAssortmentMediaTextsMutationOptions =
  Apollo.BaseMutationOptions<
    IUpdateAssortmentMediaTextsMutation,
    IUpdateAssortmentMediaTextsMutationVariables
  >;
export const UpdateAssortmentTextsDocument = gql`
  mutation updateAssortmentTexts(
    $assortmentId: ID!
    $texts: [UpdateAssortmentTextInput!]!
  ) {
    updateAssortmentTexts(assortmentId: $assortmentId, texts: $texts) {
      ...AssortmentTextsFragment
    }
  }
  ${AssortmentTextsFragmentFragmentDoc}
`;
export type IUpdateAssortmentTextsMutationFn = Apollo.MutationFunction<
  IUpdateAssortmentTextsMutation,
  IUpdateAssortmentTextsMutationVariables
>;

/**
 * __useUpdateAssortmentTextsMutation__
 *
 * To run a mutation, you first call `useUpdateAssortmentTextsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssortmentTextsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAssortmentTextsMutation, { data, loading, error }] = useUpdateAssortmentTextsMutation({
 *   variables: {
 *      assortmentId: // value for 'assortmentId'
 *      texts: // value for 'texts'
 *   },
 * });
 */
export function useUpdateAssortmentTextsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateAssortmentTextsMutation,
    IUpdateAssortmentTextsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateAssortmentTextsMutation,
    IUpdateAssortmentTextsMutationVariables
  >(UpdateAssortmentTextsDocument, options);
}
export type UpdateAssortmentTextsMutationHookResult = ReturnType<
  typeof useUpdateAssortmentTextsMutation
>;
export type UpdateAssortmentTextsMutationResult =
  Apollo.MutationResult<IUpdateAssortmentTextsMutation>;
export type UpdateAssortmentTextsMutationOptions = Apollo.BaseMutationOptions<
  IUpdateAssortmentTextsMutation,
  IUpdateAssortmentTextsMutationVariables
>;
export const ShopInfoDocument = gql`
  query ShopInfo {
    shopInfo {
      _id
      version
      language {
        _id
        isoCode
        name
      }
      country {
        _id
        isoCode
        flagEmoji
        name
        defaultCurrency {
          _id
          isoCode
        }
      }
      externalLinks {
        href
        title
      }
      adminUiConfig {
        customProperties {
          entityName
          inlineFragment
        }
      }
    }
  }
`;

/**
 * __useShopInfoQuery__
 *
 * To run a query within a React component, call `useShopInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useShopInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShopInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useShopInfoQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IShopInfoQuery,
    IShopInfoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IShopInfoQuery, IShopInfoQueryVariables>(
    ShopInfoDocument,
    options,
  );
}
export function useShopInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IShopInfoQuery,
    IShopInfoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IShopInfoQuery, IShopInfoQueryVariables>(
    ShopInfoDocument,
    options,
  );
}
export type ShopInfoQueryHookResult = ReturnType<typeof useShopInfoQuery>;
export type ShopInfoLazyQueryHookResult = ReturnType<
  typeof useShopInfoLazyQuery
>;
export type ShopInfoQueryResult = Apollo.QueryResult<
  IShopInfoQuery,
  IShopInfoQueryVariables
>;
export const SystemRolesDocument = gql`
  query SystemRoles {
    shopInfo {
      _id
      userRoles
    }
  }
`;

/**
 * __useSystemRolesQuery__
 *
 * To run a query within a React component, call `useSystemRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSystemRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSystemRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSystemRolesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ISystemRolesQuery,
    ISystemRolesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ISystemRolesQuery, ISystemRolesQueryVariables>(
    SystemRolesDocument,
    options,
  );
}
export function useSystemRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ISystemRolesQuery,
    ISystemRolesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ISystemRolesQuery, ISystemRolesQueryVariables>(
    SystemRolesDocument,
    options,
  );
}
export type SystemRolesQueryHookResult = ReturnType<typeof useSystemRolesQuery>;
export type SystemRolesLazyQueryHookResult = ReturnType<
  typeof useSystemRolesLazyQuery
>;
export type SystemRolesQueryResult = Apollo.QueryResult<
  ISystemRolesQuery,
  ISystemRolesQueryVariables
>;
export const CountriesDocument = gql`
  query Countries(
    $queryString: String
    $limit: Int
    $offset: Int
    $includeInactive: Boolean
    $sort: [SortOptionInput!]
  ) {
    countries(
      queryString: $queryString
      limit: $limit
      offset: $offset
      includeInactive: $includeInactive
      sort: $sort
    ) {
      ...CountryFragment
    }
    countriesCount(includeInactive: $includeInactive, queryString: $queryString)
  }
  ${CountryFragmentFragmentDoc}
`;

/**
 * __useCountriesQuery__
 *
 * To run a query within a React component, call `useCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountriesQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      includeInactive: // value for 'includeInactive'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useCountriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ICountriesQuery,
    ICountriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ICountriesQuery, ICountriesQueryVariables>(
    CountriesDocument,
    options,
  );
}
export function useCountriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ICountriesQuery,
    ICountriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ICountriesQuery, ICountriesQueryVariables>(
    CountriesDocument,
    options,
  );
}
export type CountriesQueryHookResult = ReturnType<typeof useCountriesQuery>;
export type CountriesLazyQueryHookResult = ReturnType<
  typeof useCountriesLazyQuery
>;
export type CountriesQueryResult = Apollo.QueryResult<
  ICountriesQuery,
  ICountriesQueryVariables
>;
export const CountryDocument = gql`
  query Country($countryId: ID!) {
    country(countryId: $countryId) {
      ...CountryFragment
    }
  }
  ${CountryFragmentFragmentDoc}
`;

/**
 * __useCountryQuery__
 *
 * To run a query within a React component, call `useCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountryQuery({
 *   variables: {
 *      countryId: // value for 'countryId'
 *   },
 * });
 */
export function useCountryQuery(
  baseOptions: Apollo.QueryHookOptions<ICountryQuery, ICountryQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ICountryQuery, ICountryQueryVariables>(
    CountryDocument,
    options,
  );
}
export function useCountryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ICountryQuery,
    ICountryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ICountryQuery, ICountryQueryVariables>(
    CountryDocument,
    options,
  );
}
export type CountryQueryHookResult = ReturnType<typeof useCountryQuery>;
export type CountryLazyQueryHookResult = ReturnType<typeof useCountryLazyQuery>;
export type CountryQueryResult = Apollo.QueryResult<
  ICountryQuery,
  ICountryQueryVariables
>;
export const CreateCountryDocument = gql`
  mutation CreateCountry($country: CreateCountryInput!) {
    createCountry(country: $country) {
      ...CountryFragment
    }
  }
  ${CountryFragmentFragmentDoc}
`;
export type ICreateCountryMutationFn = Apollo.MutationFunction<
  ICreateCountryMutation,
  ICreateCountryMutationVariables
>;

/**
 * __useCreateCountryMutation__
 *
 * To run a mutation, you first call `useCreateCountryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCountryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCountryMutation, { data, loading, error }] = useCreateCountryMutation({
 *   variables: {
 *      country: // value for 'country'
 *   },
 * });
 */
export function useCreateCountryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateCountryMutation,
    ICreateCountryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateCountryMutation,
    ICreateCountryMutationVariables
  >(CreateCountryDocument, options);
}
export type CreateCountryMutationHookResult = ReturnType<
  typeof useCreateCountryMutation
>;
export type CreateCountryMutationResult =
  Apollo.MutationResult<ICreateCountryMutation>;
export type CreateCountryMutationOptions = Apollo.BaseMutationOptions<
  ICreateCountryMutation,
  ICreateCountryMutationVariables
>;
export const RemoveCountryDocument = gql`
  mutation RemoveCountry($countryId: ID!) {
    removeCountry(countryId: $countryId) {
      ...CountryFragment
    }
  }
  ${CountryFragmentFragmentDoc}
`;
export type IRemoveCountryMutationFn = Apollo.MutationFunction<
  IRemoveCountryMutation,
  IRemoveCountryMutationVariables
>;

/**
 * __useRemoveCountryMutation__
 *
 * To run a mutation, you first call `useRemoveCountryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCountryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCountryMutation, { data, loading, error }] = useRemoveCountryMutation({
 *   variables: {
 *      countryId: // value for 'countryId'
 *   },
 * });
 */
export function useRemoveCountryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveCountryMutation,
    IRemoveCountryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveCountryMutation,
    IRemoveCountryMutationVariables
  >(RemoveCountryDocument, options);
}
export type RemoveCountryMutationHookResult = ReturnType<
  typeof useRemoveCountryMutation
>;
export type RemoveCountryMutationResult =
  Apollo.MutationResult<IRemoveCountryMutation>;
export type RemoveCountryMutationOptions = Apollo.BaseMutationOptions<
  IRemoveCountryMutation,
  IRemoveCountryMutationVariables
>;
export const UpdateCountryDocument = gql`
  mutation UpdateCountry($country: UpdateCountryInput!, $countryId: ID!) {
    updateCountry(country: $country, countryId: $countryId) {
      ...CountryFragment
    }
  }
  ${CountryFragmentFragmentDoc}
`;
export type IUpdateCountryMutationFn = Apollo.MutationFunction<
  IUpdateCountryMutation,
  IUpdateCountryMutationVariables
>;

/**
 * __useUpdateCountryMutation__
 *
 * To run a mutation, you first call `useUpdateCountryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCountryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCountryMutation, { data, loading, error }] = useUpdateCountryMutation({
 *   variables: {
 *      country: // value for 'country'
 *      countryId: // value for 'countryId'
 *   },
 * });
 */
export function useUpdateCountryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateCountryMutation,
    IUpdateCountryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateCountryMutation,
    IUpdateCountryMutationVariables
  >(UpdateCountryDocument, options);
}
export type UpdateCountryMutationHookResult = ReturnType<
  typeof useUpdateCountryMutation
>;
export type UpdateCountryMutationResult =
  Apollo.MutationResult<IUpdateCountryMutation>;
export type UpdateCountryMutationOptions = Apollo.BaseMutationOptions<
  IUpdateCountryMutation,
  IUpdateCountryMutationVariables
>;
export const CreateCurrencyDocument = gql`
  mutation CreateCurrency($currency: CreateCurrencyInput!) {
    createCurrency(currency: $currency) {
      ...CurrencyFragment
    }
  }
  ${CurrencyFragmentFragmentDoc}
`;
export type ICreateCurrencyMutationFn = Apollo.MutationFunction<
  ICreateCurrencyMutation,
  ICreateCurrencyMutationVariables
>;

/**
 * __useCreateCurrencyMutation__
 *
 * To run a mutation, you first call `useCreateCurrencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCurrencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCurrencyMutation, { data, loading, error }] = useCreateCurrencyMutation({
 *   variables: {
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useCreateCurrencyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateCurrencyMutation,
    ICreateCurrencyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateCurrencyMutation,
    ICreateCurrencyMutationVariables
  >(CreateCurrencyDocument, options);
}
export type CreateCurrencyMutationHookResult = ReturnType<
  typeof useCreateCurrencyMutation
>;
export type CreateCurrencyMutationResult =
  Apollo.MutationResult<ICreateCurrencyMutation>;
export type CreateCurrencyMutationOptions = Apollo.BaseMutationOptions<
  ICreateCurrencyMutation,
  ICreateCurrencyMutationVariables
>;
export const CurrenciesDocument = gql`
  query Currencies(
    $queryString: String
    $limit: Int
    $offset: Int
    $includeInactive: Boolean
    $sort: [SortOptionInput!]
  ) {
    currencies(
      queryString: $queryString
      limit: $limit
      offset: $offset
      includeInactive: $includeInactive
      sort: $sort
    ) {
      ...CurrencyFragment
    }
    currenciesCount(
      includeInactive: $includeInactive
      queryString: $queryString
    )
  }
  ${CurrencyFragmentFragmentDoc}
`;

/**
 * __useCurrenciesQuery__
 *
 * To run a query within a React component, call `useCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrenciesQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      includeInactive: // value for 'includeInactive'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useCurrenciesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ICurrenciesQuery,
    ICurrenciesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ICurrenciesQuery, ICurrenciesQueryVariables>(
    CurrenciesDocument,
    options,
  );
}
export function useCurrenciesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ICurrenciesQuery,
    ICurrenciesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ICurrenciesQuery, ICurrenciesQueryVariables>(
    CurrenciesDocument,
    options,
  );
}
export type CurrenciesQueryHookResult = ReturnType<typeof useCurrenciesQuery>;
export type CurrenciesLazyQueryHookResult = ReturnType<
  typeof useCurrenciesLazyQuery
>;
export type CurrenciesQueryResult = Apollo.QueryResult<
  ICurrenciesQuery,
  ICurrenciesQueryVariables
>;
export const CurrencyDocument = gql`
  query Currency($currencyId: ID!) {
    currency(currencyId: $currencyId) {
      ...CurrencyFragment
    }
  }
  ${CurrencyFragmentFragmentDoc}
`;

/**
 * __useCurrencyQuery__
 *
 * To run a query within a React component, call `useCurrencyQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrencyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrencyQuery({
 *   variables: {
 *      currencyId: // value for 'currencyId'
 *   },
 * });
 */
export function useCurrencyQuery(
  baseOptions: Apollo.QueryHookOptions<ICurrencyQuery, ICurrencyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ICurrencyQuery, ICurrencyQueryVariables>(
    CurrencyDocument,
    options,
  );
}
export function useCurrencyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ICurrencyQuery,
    ICurrencyQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ICurrencyQuery, ICurrencyQueryVariables>(
    CurrencyDocument,
    options,
  );
}
export type CurrencyQueryHookResult = ReturnType<typeof useCurrencyQuery>;
export type CurrencyLazyQueryHookResult = ReturnType<
  typeof useCurrencyLazyQuery
>;
export type CurrencyQueryResult = Apollo.QueryResult<
  ICurrencyQuery,
  ICurrencyQueryVariables
>;
export const RemoveCurrencyDocument = gql`
  mutation RemoveCurrency($currencyId: ID!) {
    removeCurrency(currencyId: $currencyId) {
      ...CurrencyFragment
    }
  }
  ${CurrencyFragmentFragmentDoc}
`;
export type IRemoveCurrencyMutationFn = Apollo.MutationFunction<
  IRemoveCurrencyMutation,
  IRemoveCurrencyMutationVariables
>;

/**
 * __useRemoveCurrencyMutation__
 *
 * To run a mutation, you first call `useRemoveCurrencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCurrencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCurrencyMutation, { data, loading, error }] = useRemoveCurrencyMutation({
 *   variables: {
 *      currencyId: // value for 'currencyId'
 *   },
 * });
 */
export function useRemoveCurrencyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveCurrencyMutation,
    IRemoveCurrencyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveCurrencyMutation,
    IRemoveCurrencyMutationVariables
  >(RemoveCurrencyDocument, options);
}
export type RemoveCurrencyMutationHookResult = ReturnType<
  typeof useRemoveCurrencyMutation
>;
export type RemoveCurrencyMutationResult =
  Apollo.MutationResult<IRemoveCurrencyMutation>;
export type RemoveCurrencyMutationOptions = Apollo.BaseMutationOptions<
  IRemoveCurrencyMutation,
  IRemoveCurrencyMutationVariables
>;
export const UpdateCurrencyDocument = gql`
  mutation UpdateCurrency($currency: UpdateCurrencyInput!, $currencyId: ID!) {
    updateCurrency(currency: $currency, currencyId: $currencyId) {
      ...CurrencyFragment
    }
  }
  ${CurrencyFragmentFragmentDoc}
`;
export type IUpdateCurrencyMutationFn = Apollo.MutationFunction<
  IUpdateCurrencyMutation,
  IUpdateCurrencyMutationVariables
>;

/**
 * __useUpdateCurrencyMutation__
 *
 * To run a mutation, you first call `useUpdateCurrencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCurrencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCurrencyMutation, { data, loading, error }] = useUpdateCurrencyMutation({
 *   variables: {
 *      currency: // value for 'currency'
 *      currencyId: // value for 'currencyId'
 *   },
 * });
 */
export function useUpdateCurrencyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateCurrencyMutation,
    IUpdateCurrencyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateCurrencyMutation,
    IUpdateCurrencyMutationVariables
  >(UpdateCurrencyDocument, options);
}
export type UpdateCurrencyMutationHookResult = ReturnType<
  typeof useUpdateCurrencyMutation
>;
export type UpdateCurrencyMutationResult =
  Apollo.MutationResult<IUpdateCurrencyMutation>;
export type UpdateCurrencyMutationOptions = Apollo.BaseMutationOptions<
  IUpdateCurrencyMutation,
  IUpdateCurrencyMutationVariables
>;
export const CreateDeliveryProviderDocument = gql`
  mutation CreateDeliveryProvider(
    $deliveryProvider: CreateDeliveryProviderInput!
  ) {
    createDeliveryProvider(deliveryProvider: $deliveryProvider) {
      ...DeliveryProviderFragment
    }
  }
  ${DeliveryProviderFragmentFragmentDoc}
`;
export type ICreateDeliveryProviderMutationFn = Apollo.MutationFunction<
  ICreateDeliveryProviderMutation,
  ICreateDeliveryProviderMutationVariables
>;

/**
 * __useCreateDeliveryProviderMutation__
 *
 * To run a mutation, you first call `useCreateDeliveryProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeliveryProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeliveryProviderMutation, { data, loading, error }] = useCreateDeliveryProviderMutation({
 *   variables: {
 *      deliveryProvider: // value for 'deliveryProvider'
 *   },
 * });
 */
export function useCreateDeliveryProviderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateDeliveryProviderMutation,
    ICreateDeliveryProviderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateDeliveryProviderMutation,
    ICreateDeliveryProviderMutationVariables
  >(CreateDeliveryProviderDocument, options);
}
export type CreateDeliveryProviderMutationHookResult = ReturnType<
  typeof useCreateDeliveryProviderMutation
>;
export type CreateDeliveryProviderMutationResult =
  Apollo.MutationResult<ICreateDeliveryProviderMutation>;
export type CreateDeliveryProviderMutationOptions = Apollo.BaseMutationOptions<
  ICreateDeliveryProviderMutation,
  ICreateDeliveryProviderMutationVariables
>;
export const DeliveryInterfacesDocument = gql`
  query DeliveryInterfaces($providerType: DeliveryProviderType!) {
    deliveryInterfaces(type: $providerType) {
      _id
      value: _id
      label
    }
  }
`;

/**
 * __useDeliveryInterfacesQuery__
 *
 * To run a query within a React component, call `useDeliveryInterfacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeliveryInterfacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeliveryInterfacesQuery({
 *   variables: {
 *      providerType: // value for 'providerType'
 *   },
 * });
 */
export function useDeliveryInterfacesQuery(
  baseOptions: Apollo.QueryHookOptions<
    IDeliveryInterfacesQuery,
    IDeliveryInterfacesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IDeliveryInterfacesQuery,
    IDeliveryInterfacesQueryVariables
  >(DeliveryInterfacesDocument, options);
}
export function useDeliveryInterfacesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IDeliveryInterfacesQuery,
    IDeliveryInterfacesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IDeliveryInterfacesQuery,
    IDeliveryInterfacesQueryVariables
  >(DeliveryInterfacesDocument, options);
}
export type DeliveryInterfacesQueryHookResult = ReturnType<
  typeof useDeliveryInterfacesQuery
>;
export type DeliveryInterfacesLazyQueryHookResult = ReturnType<
  typeof useDeliveryInterfacesLazyQuery
>;
export type DeliveryInterfacesQueryResult = Apollo.QueryResult<
  IDeliveryInterfacesQuery,
  IDeliveryInterfacesQueryVariables
>;
export const DeliveryProviderDocument = gql`
  query DeliveryProvider($deliveryProviderId: ID!) {
    deliveryProvider(deliveryProviderId: $deliveryProviderId) {
      ...DeliveryProviderFragment
    }
  }
  ${DeliveryProviderFragmentFragmentDoc}
`;

/**
 * __useDeliveryProviderQuery__
 *
 * To run a query within a React component, call `useDeliveryProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeliveryProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeliveryProviderQuery({
 *   variables: {
 *      deliveryProviderId: // value for 'deliveryProviderId'
 *   },
 * });
 */
export function useDeliveryProviderQuery(
  baseOptions: Apollo.QueryHookOptions<
    IDeliveryProviderQuery,
    IDeliveryProviderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IDeliveryProviderQuery,
    IDeliveryProviderQueryVariables
  >(DeliveryProviderDocument, options);
}
export function useDeliveryProviderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IDeliveryProviderQuery,
    IDeliveryProviderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IDeliveryProviderQuery,
    IDeliveryProviderQueryVariables
  >(DeliveryProviderDocument, options);
}
export type DeliveryProviderQueryHookResult = ReturnType<
  typeof useDeliveryProviderQuery
>;
export type DeliveryProviderLazyQueryHookResult = ReturnType<
  typeof useDeliveryProviderLazyQuery
>;
export type DeliveryProviderQueryResult = Apollo.QueryResult<
  IDeliveryProviderQuery,
  IDeliveryProviderQueryVariables
>;
export const DeliveryProvidersTypeDocument = gql`
  query DeliveryProvidersType {
    deliveryProviderType: __type(name: "DeliveryProviderType") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

/**
 * __useDeliveryProvidersTypeQuery__
 *
 * To run a query within a React component, call `useDeliveryProvidersTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeliveryProvidersTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeliveryProvidersTypeQuery({
 *   variables: {
 *   },
 * });
 */
export function useDeliveryProvidersTypeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IDeliveryProvidersTypeQuery,
    IDeliveryProvidersTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IDeliveryProvidersTypeQuery,
    IDeliveryProvidersTypeQueryVariables
  >(DeliveryProvidersTypeDocument, options);
}
export function useDeliveryProvidersTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IDeliveryProvidersTypeQuery,
    IDeliveryProvidersTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IDeliveryProvidersTypeQuery,
    IDeliveryProvidersTypeQueryVariables
  >(DeliveryProvidersTypeDocument, options);
}
export type DeliveryProvidersTypeQueryHookResult = ReturnType<
  typeof useDeliveryProvidersTypeQuery
>;
export type DeliveryProvidersTypeLazyQueryHookResult = ReturnType<
  typeof useDeliveryProvidersTypeLazyQuery
>;
export type DeliveryProvidersTypeQueryResult = Apollo.QueryResult<
  IDeliveryProvidersTypeQuery,
  IDeliveryProvidersTypeQueryVariables
>;
export const DeliveryProvidersDocument = gql`
  query DeliveryProviders($type: DeliveryProviderType) {
    deliveryProviders(type: $type) {
      ...DeliveryProviderFragment
    }
  }
  ${DeliveryProviderFragmentFragmentDoc}
`;

/**
 * __useDeliveryProvidersQuery__
 *
 * To run a query within a React component, call `useDeliveryProvidersQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeliveryProvidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeliveryProvidersQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useDeliveryProvidersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IDeliveryProvidersQuery,
    IDeliveryProvidersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IDeliveryProvidersQuery,
    IDeliveryProvidersQueryVariables
  >(DeliveryProvidersDocument, options);
}
export function useDeliveryProvidersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IDeliveryProvidersQuery,
    IDeliveryProvidersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IDeliveryProvidersQuery,
    IDeliveryProvidersQueryVariables
  >(DeliveryProvidersDocument, options);
}
export type DeliveryProvidersQueryHookResult = ReturnType<
  typeof useDeliveryProvidersQuery
>;
export type DeliveryProvidersLazyQueryHookResult = ReturnType<
  typeof useDeliveryProvidersLazyQuery
>;
export type DeliveryProvidersQueryResult = Apollo.QueryResult<
  IDeliveryProvidersQuery,
  IDeliveryProvidersQueryVariables
>;
export const OrderDeliveryStatusDocument = gql`
  query OrderDeliveryStatus {
    deliveryStatusType: __type(name: "OrderDeliveryStatus") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

/**
 * __useOrderDeliveryStatusQuery__
 *
 * To run a query within a React component, call `useOrderDeliveryStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderDeliveryStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderDeliveryStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrderDeliveryStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IOrderDeliveryStatusQuery,
    IOrderDeliveryStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IOrderDeliveryStatusQuery,
    IOrderDeliveryStatusQueryVariables
  >(OrderDeliveryStatusDocument, options);
}
export function useOrderDeliveryStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IOrderDeliveryStatusQuery,
    IOrderDeliveryStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IOrderDeliveryStatusQuery,
    IOrderDeliveryStatusQueryVariables
  >(OrderDeliveryStatusDocument, options);
}
export type OrderDeliveryStatusQueryHookResult = ReturnType<
  typeof useOrderDeliveryStatusQuery
>;
export type OrderDeliveryStatusLazyQueryHookResult = ReturnType<
  typeof useOrderDeliveryStatusLazyQuery
>;
export type OrderDeliveryStatusQueryResult = Apollo.QueryResult<
  IOrderDeliveryStatusQuery,
  IOrderDeliveryStatusQueryVariables
>;
export const RemoveDeliveryProviderDocument = gql`
  mutation RemoveDeliveryProvider($deliveryProviderId: ID!) {
    removeDeliveryProvider(deliveryProviderId: $deliveryProviderId) {
      _id
    }
  }
`;
export type IRemoveDeliveryProviderMutationFn = Apollo.MutationFunction<
  IRemoveDeliveryProviderMutation,
  IRemoveDeliveryProviderMutationVariables
>;

/**
 * __useRemoveDeliveryProviderMutation__
 *
 * To run a mutation, you first call `useRemoveDeliveryProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDeliveryProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDeliveryProviderMutation, { data, loading, error }] = useRemoveDeliveryProviderMutation({
 *   variables: {
 *      deliveryProviderId: // value for 'deliveryProviderId'
 *   },
 * });
 */
export function useRemoveDeliveryProviderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveDeliveryProviderMutation,
    IRemoveDeliveryProviderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveDeliveryProviderMutation,
    IRemoveDeliveryProviderMutationVariables
  >(RemoveDeliveryProviderDocument, options);
}
export type RemoveDeliveryProviderMutationHookResult = ReturnType<
  typeof useRemoveDeliveryProviderMutation
>;
export type RemoveDeliveryProviderMutationResult =
  Apollo.MutationResult<IRemoveDeliveryProviderMutation>;
export type RemoveDeliveryProviderMutationOptions = Apollo.BaseMutationOptions<
  IRemoveDeliveryProviderMutation,
  IRemoveDeliveryProviderMutationVariables
>;
export const UpdateDeliveryProviderDocument = gql`
  mutation UpdateDeliveryProvider(
    $deliveryProvider: UpdateProviderInput!
    $deliveryProviderId: ID!
  ) {
    updateDeliveryProvider(
      deliveryProvider: $deliveryProvider
      deliveryProviderId: $deliveryProviderId
    ) {
      ...DeliveryProviderFragment
    }
  }
  ${DeliveryProviderFragmentFragmentDoc}
`;
export type IUpdateDeliveryProviderMutationFn = Apollo.MutationFunction<
  IUpdateDeliveryProviderMutation,
  IUpdateDeliveryProviderMutationVariables
>;

/**
 * __useUpdateDeliveryProviderMutation__
 *
 * To run a mutation, you first call `useUpdateDeliveryProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDeliveryProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDeliveryProviderMutation, { data, loading, error }] = useUpdateDeliveryProviderMutation({
 *   variables: {
 *      deliveryProvider: // value for 'deliveryProvider'
 *      deliveryProviderId: // value for 'deliveryProviderId'
 *   },
 * });
 */
export function useUpdateDeliveryProviderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateDeliveryProviderMutation,
    IUpdateDeliveryProviderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateDeliveryProviderMutation,
    IUpdateDeliveryProviderMutationVariables
  >(UpdateDeliveryProviderDocument, options);
}
export type UpdateDeliveryProviderMutationHookResult = ReturnType<
  typeof useUpdateDeliveryProviderMutation
>;
export type UpdateDeliveryProviderMutationResult =
  Apollo.MutationResult<IUpdateDeliveryProviderMutation>;
export type UpdateDeliveryProviderMutationOptions = Apollo.BaseMutationOptions<
  IUpdateDeliveryProviderMutation,
  IUpdateDeliveryProviderMutationVariables
>;
export const ActivateEnrollmentDocument = gql`
  mutation ActivateEnrollment($enrollmentId: ID!) {
    activateEnrollment(enrollmentId: $enrollmentId) {
      _id
    }
  }
`;
export type IActivateEnrollmentMutationFn = Apollo.MutationFunction<
  IActivateEnrollmentMutation,
  IActivateEnrollmentMutationVariables
>;

/**
 * __useActivateEnrollmentMutation__
 *
 * To run a mutation, you first call `useActivateEnrollmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateEnrollmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateEnrollmentMutation, { data, loading, error }] = useActivateEnrollmentMutation({
 *   variables: {
 *      enrollmentId: // value for 'enrollmentId'
 *   },
 * });
 */
export function useActivateEnrollmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IActivateEnrollmentMutation,
    IActivateEnrollmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IActivateEnrollmentMutation,
    IActivateEnrollmentMutationVariables
  >(ActivateEnrollmentDocument, options);
}
export type ActivateEnrollmentMutationHookResult = ReturnType<
  typeof useActivateEnrollmentMutation
>;
export type ActivateEnrollmentMutationResult =
  Apollo.MutationResult<IActivateEnrollmentMutation>;
export type ActivateEnrollmentMutationOptions = Apollo.BaseMutationOptions<
  IActivateEnrollmentMutation,
  IActivateEnrollmentMutationVariables
>;
export const EnrollmentDocument = gql`
  query Enrollment($enrollmentId: ID!) {
    enrollment(enrollmentId: $enrollmentId) {
      ...EnrollmentDetailFragment
    }
  }
  ${EnrollmentDetailFragmentFragmentDoc}
`;

/**
 * __useEnrollmentQuery__
 *
 * To run a query within a React component, call `useEnrollmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnrollmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrollmentQuery({
 *   variables: {
 *      enrollmentId: // value for 'enrollmentId'
 *   },
 * });
 */
export function useEnrollmentQuery(
  baseOptions: Apollo.QueryHookOptions<
    IEnrollmentQuery,
    IEnrollmentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IEnrollmentQuery, IEnrollmentQueryVariables>(
    EnrollmentDocument,
    options,
  );
}
export function useEnrollmentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IEnrollmentQuery,
    IEnrollmentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IEnrollmentQuery, IEnrollmentQueryVariables>(
    EnrollmentDocument,
    options,
  );
}
export type EnrollmentQueryHookResult = ReturnType<typeof useEnrollmentQuery>;
export type EnrollmentLazyQueryHookResult = ReturnType<
  typeof useEnrollmentLazyQuery
>;
export type EnrollmentQueryResult = Apollo.QueryResult<
  IEnrollmentQuery,
  IEnrollmentQueryVariables
>;
export const EnrollmentStatusDocument = gql`
  query EnrollmentStatus {
    enrollmentStatusTypes: __type(name: "EnrollmentStatus") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

/**
 * __useEnrollmentStatusQuery__
 *
 * To run a query within a React component, call `useEnrollmentStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnrollmentStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrollmentStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useEnrollmentStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IEnrollmentStatusQuery,
    IEnrollmentStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IEnrollmentStatusQuery,
    IEnrollmentStatusQueryVariables
  >(EnrollmentStatusDocument, options);
}
export function useEnrollmentStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IEnrollmentStatusQuery,
    IEnrollmentStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IEnrollmentStatusQuery,
    IEnrollmentStatusQueryVariables
  >(EnrollmentStatusDocument, options);
}
export type EnrollmentStatusQueryHookResult = ReturnType<
  typeof useEnrollmentStatusQuery
>;
export type EnrollmentStatusLazyQueryHookResult = ReturnType<
  typeof useEnrollmentStatusLazyQuery
>;
export type EnrollmentStatusQueryResult = Apollo.QueryResult<
  IEnrollmentStatusQuery,
  IEnrollmentStatusQueryVariables
>;
export const EnrollmentsDocument = gql`
  query Enrollments(
    $offset: Int
    $limit: Int
    $queryString: String
    $sort: [SortOptionInput!]
    $status: [String!]
  ) {
    enrollments(
      offset: $offset
      limit: $limit
      queryString: $queryString
      sort: $sort
      status: $status
    ) {
      ...EnrollmentFragment
    }
    enrollmentsCount
  }
  ${EnrollmentFragmentFragmentDoc}
`;

/**
 * __useEnrollmentsQuery__
 *
 * To run a query within a React component, call `useEnrollmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnrollmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrollmentsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      queryString: // value for 'queryString'
 *      sort: // value for 'sort'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useEnrollmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IEnrollmentsQuery,
    IEnrollmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IEnrollmentsQuery, IEnrollmentsQueryVariables>(
    EnrollmentsDocument,
    options,
  );
}
export function useEnrollmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IEnrollmentsQuery,
    IEnrollmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IEnrollmentsQuery, IEnrollmentsQueryVariables>(
    EnrollmentsDocument,
    options,
  );
}
export type EnrollmentsQueryHookResult = ReturnType<typeof useEnrollmentsQuery>;
export type EnrollmentsLazyQueryHookResult = ReturnType<
  typeof useEnrollmentsLazyQuery
>;
export type EnrollmentsQueryResult = Apollo.QueryResult<
  IEnrollmentsQuery,
  IEnrollmentsQueryVariables
>;
export const SendEnrollmentEmailDocument = gql`
  mutation sendEnrollmentEmail($email: String!) {
    sendEnrollmentEmail(email: $email) {
      success
    }
  }
`;
export type ISendEnrollmentEmailMutationFn = Apollo.MutationFunction<
  ISendEnrollmentEmailMutation,
  ISendEnrollmentEmailMutationVariables
>;

/**
 * __useSendEnrollmentEmailMutation__
 *
 * To run a mutation, you first call `useSendEnrollmentEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendEnrollmentEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendEnrollmentEmailMutation, { data, loading, error }] = useSendEnrollmentEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendEnrollmentEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ISendEnrollmentEmailMutation,
    ISendEnrollmentEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ISendEnrollmentEmailMutation,
    ISendEnrollmentEmailMutationVariables
  >(SendEnrollmentEmailDocument, options);
}
export type SendEnrollmentEmailMutationHookResult = ReturnType<
  typeof useSendEnrollmentEmailMutation
>;
export type SendEnrollmentEmailMutationResult =
  Apollo.MutationResult<ISendEnrollmentEmailMutation>;
export type SendEnrollmentEmailMutationOptions = Apollo.BaseMutationOptions<
  ISendEnrollmentEmailMutation,
  ISendEnrollmentEmailMutationVariables
>;
export const TerminateEnrollmentDocument = gql`
  mutation TerminateEnrollment($enrollmentId: ID!) {
    terminateEnrollment(enrollmentId: $enrollmentId) {
      _id
    }
  }
`;
export type ITerminateEnrollmentMutationFn = Apollo.MutationFunction<
  ITerminateEnrollmentMutation,
  ITerminateEnrollmentMutationVariables
>;

/**
 * __useTerminateEnrollmentMutation__
 *
 * To run a mutation, you first call `useTerminateEnrollmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTerminateEnrollmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [terminateEnrollmentMutation, { data, loading, error }] = useTerminateEnrollmentMutation({
 *   variables: {
 *      enrollmentId: // value for 'enrollmentId'
 *   },
 * });
 */
export function useTerminateEnrollmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ITerminateEnrollmentMutation,
    ITerminateEnrollmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ITerminateEnrollmentMutation,
    ITerminateEnrollmentMutationVariables
  >(TerminateEnrollmentDocument, options);
}
export type TerminateEnrollmentMutationHookResult = ReturnType<
  typeof useTerminateEnrollmentMutation
>;
export type TerminateEnrollmentMutationResult =
  Apollo.MutationResult<ITerminateEnrollmentMutation>;
export type TerminateEnrollmentMutationOptions = Apollo.BaseMutationOptions<
  ITerminateEnrollmentMutation,
  ITerminateEnrollmentMutationVariables
>;
export const UserEnrollmentsDocument = gql`
  query UserEnrollments($userId: ID!, $queryString: String) {
    user(userId: $userId) {
      _id
      enrollments(queryString: $queryString) {
        ...EnrollmentFragment
      }
    }
  }
  ${EnrollmentFragmentFragmentDoc}
`;

/**
 * __useUserEnrollmentsQuery__
 *
 * To run a query within a React component, call `useUserEnrollmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserEnrollmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserEnrollmentsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      queryString: // value for 'queryString'
 *   },
 * });
 */
export function useUserEnrollmentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    IUserEnrollmentsQuery,
    IUserEnrollmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IUserEnrollmentsQuery, IUserEnrollmentsQueryVariables>(
    UserEnrollmentsDocument,
    options,
  );
}
export function useUserEnrollmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IUserEnrollmentsQuery,
    IUserEnrollmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IUserEnrollmentsQuery,
    IUserEnrollmentsQueryVariables
  >(UserEnrollmentsDocument, options);
}
export type UserEnrollmentsQueryHookResult = ReturnType<
  typeof useUserEnrollmentsQuery
>;
export type UserEnrollmentsLazyQueryHookResult = ReturnType<
  typeof useUserEnrollmentsLazyQuery
>;
export type UserEnrollmentsQueryResult = Apollo.QueryResult<
  IUserEnrollmentsQuery,
  IUserEnrollmentsQueryVariables
>;
export const EventDocument = gql`
  query Event($eventId: ID!) {
    event(eventId: $eventId) {
      ...EventFragment
    }
  }
  ${EventFragmentFragmentDoc}
`;

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEventQuery(
  baseOptions: Apollo.QueryHookOptions<IEventQuery, IEventQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IEventQuery, IEventQueryVariables>(
    EventDocument,
    options,
  );
}
export function useEventLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IEventQuery, IEventQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IEventQuery, IEventQueryVariables>(
    EventDocument,
    options,
  );
}
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventQueryResult = Apollo.QueryResult<
  IEventQuery,
  IEventQueryVariables
>;
export const EventsTypeDocument = gql`
  query EventsType {
    eventTypes: __type(name: "EventType") {
      options: enumValues {
        value: name
        label: name
      }
    }
  }
`;

/**
 * __useEventsTypeQuery__
 *
 * To run a query within a React component, call `useEventsTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsTypeQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventsTypeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IEventsTypeQuery,
    IEventsTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IEventsTypeQuery, IEventsTypeQueryVariables>(
    EventsTypeDocument,
    options,
  );
}
export function useEventsTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IEventsTypeQuery,
    IEventsTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IEventsTypeQuery, IEventsTypeQueryVariables>(
    EventsTypeDocument,
    options,
  );
}
export type EventsTypeQueryHookResult = ReturnType<typeof useEventsTypeQuery>;
export type EventsTypeLazyQueryHookResult = ReturnType<
  typeof useEventsTypeLazyQuery
>;
export type EventsTypeQueryResult = Apollo.QueryResult<
  IEventsTypeQuery,
  IEventsTypeQueryVariables
>;
export const EventsDocument = gql`
  query Events(
    $types: [String!]
    $limit: Int
    $offset: Int
    $sort: [SortOptionInput!]
    $queryString: String
  ) {
    events(
      types: $types
      limit: $limit
      offset: $offset
      sort: $sort
      queryString: $queryString
    ) {
      ...EventFragment
    }
    eventsCount
  }
  ${EventFragmentFragmentDoc}
`;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *      types: // value for 'types'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sort: // value for 'sort'
 *      queryString: // value for 'queryString'
 *   },
 * });
 */
export function useEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<IEventsQuery, IEventsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IEventsQuery, IEventsQueryVariables>(
    EventsDocument,
    options,
  );
}
export function useEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IEventsQuery,
    IEventsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IEventsQuery, IEventsQueryVariables>(
    EventsDocument,
    options,
  );
}
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<
  IEventsQuery,
  IEventsQueryVariables
>;
export const RegisteredEventTypeDocument = gql`
  query RegisteredEventType {
    registeredEvents: __type(name: "EventType") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

/**
 * __useRegisteredEventTypeQuery__
 *
 * To run a query within a React component, call `useRegisteredEventTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useRegisteredEventTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRegisteredEventTypeQuery({
 *   variables: {
 *   },
 * });
 */
export function useRegisteredEventTypeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IRegisteredEventTypeQuery,
    IRegisteredEventTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IRegisteredEventTypeQuery,
    IRegisteredEventTypeQueryVariables
  >(RegisteredEventTypeDocument, options);
}
export function useRegisteredEventTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IRegisteredEventTypeQuery,
    IRegisteredEventTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IRegisteredEventTypeQuery,
    IRegisteredEventTypeQueryVariables
  >(RegisteredEventTypeDocument, options);
}
export type RegisteredEventTypeQueryHookResult = ReturnType<
  typeof useRegisteredEventTypeQuery
>;
export type RegisteredEventTypeLazyQueryHookResult = ReturnType<
  typeof useRegisteredEventTypeLazyQuery
>;
export type RegisteredEventTypeQueryResult = Apollo.QueryResult<
  IRegisteredEventTypeQuery,
  IRegisteredEventTypeQueryVariables
>;
export const CreateFilterDocument = gql`
  mutation CreateFilter($filter: CreateFilterInput!) {
    createFilter(filter: $filter) {
      ...FilterFragment
    }
  }
  ${FilterFragmentFragmentDoc}
`;
export type ICreateFilterMutationFn = Apollo.MutationFunction<
  ICreateFilterMutation,
  ICreateFilterMutationVariables
>;

/**
 * __useCreateFilterMutation__
 *
 * To run a mutation, you first call `useCreateFilterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFilterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFilterMutation, { data, loading, error }] = useCreateFilterMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCreateFilterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateFilterMutation,
    ICreateFilterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateFilterMutation,
    ICreateFilterMutationVariables
  >(CreateFilterDocument, options);
}
export type CreateFilterMutationHookResult = ReturnType<
  typeof useCreateFilterMutation
>;
export type CreateFilterMutationResult =
  Apollo.MutationResult<ICreateFilterMutation>;
export type CreateFilterMutationOptions = Apollo.BaseMutationOptions<
  ICreateFilterMutation,
  ICreateFilterMutationVariables
>;
export const CreateFilterOptionDocument = gql`
  mutation CreateFilterOption(
    $filterId: ID!
    $option: CreateFilterOptionInput!
  ) {
    createFilterOption(filterId: $filterId, option: $option) {
      _id
    }
  }
`;
export type ICreateFilterOptionMutationFn = Apollo.MutationFunction<
  ICreateFilterOptionMutation,
  ICreateFilterOptionMutationVariables
>;

/**
 * __useCreateFilterOptionMutation__
 *
 * To run a mutation, you first call `useCreateFilterOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFilterOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFilterOptionMutation, { data, loading, error }] = useCreateFilterOptionMutation({
 *   variables: {
 *      filterId: // value for 'filterId'
 *      option: // value for 'option'
 *   },
 * });
 */
export function useCreateFilterOptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateFilterOptionMutation,
    ICreateFilterOptionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateFilterOptionMutation,
    ICreateFilterOptionMutationVariables
  >(CreateFilterOptionDocument, options);
}
export type CreateFilterOptionMutationHookResult = ReturnType<
  typeof useCreateFilterOptionMutation
>;
export type CreateFilterOptionMutationResult =
  Apollo.MutationResult<ICreateFilterOptionMutation>;
export type CreateFilterOptionMutationOptions = Apollo.BaseMutationOptions<
  ICreateFilterOptionMutation,
  ICreateFilterOptionMutationVariables
>;
export const FilterDocument = gql`
  query Filter($filterId: ID) {
    filter(filterId: $filterId) {
      ...FilterFragment
      texts {
        _id
        title
        subtitle
        locale
      }
    }
  }
  ${FilterFragmentFragmentDoc}
`;

/**
 * __useFilterQuery__
 *
 * To run a query within a React component, call `useFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterQuery({
 *   variables: {
 *      filterId: // value for 'filterId'
 *   },
 * });
 */
export function useFilterQuery(
  baseOptions?: Apollo.QueryHookOptions<IFilterQuery, IFilterQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IFilterQuery, IFilterQueryVariables>(
    FilterDocument,
    options,
  );
}
export function useFilterLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IFilterQuery,
    IFilterQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IFilterQuery, IFilterQueryVariables>(
    FilterDocument,
    options,
  );
}
export type FilterQueryHookResult = ReturnType<typeof useFilterQuery>;
export type FilterLazyQueryHookResult = ReturnType<typeof useFilterLazyQuery>;
export type FilterQueryResult = Apollo.QueryResult<
  IFilterQuery,
  IFilterQueryVariables
>;
export const FilterOptionsDocument = gql`
  query FilterOptions($filterId: ID) {
    filter(filterId: $filterId) {
      _id
      options {
        ...FilterOptionFragment
      }
    }
  }
  ${FilterOptionFragmentFragmentDoc}
`;

/**
 * __useFilterOptionsQuery__
 *
 * To run a query within a React component, call `useFilterOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterOptionsQuery({
 *   variables: {
 *      filterId: // value for 'filterId'
 *   },
 * });
 */
export function useFilterOptionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IFilterOptionsQuery,
    IFilterOptionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IFilterOptionsQuery, IFilterOptionsQueryVariables>(
    FilterOptionsDocument,
    options,
  );
}
export function useFilterOptionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IFilterOptionsQuery,
    IFilterOptionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IFilterOptionsQuery, IFilterOptionsQueryVariables>(
    FilterOptionsDocument,
    options,
  );
}
export type FilterOptionsQueryHookResult = ReturnType<
  typeof useFilterOptionsQuery
>;
export type FilterOptionsLazyQueryHookResult = ReturnType<
  typeof useFilterOptionsLazyQuery
>;
export type FilterOptionsQueryResult = Apollo.QueryResult<
  IFilterOptionsQuery,
  IFilterOptionsQueryVariables
>;
export const FilterTypesDocument = gql`
  query FilterTypes {
    filterTypes: __type(name: "FilterType") {
      options: enumValues {
        label: name
        value: name
      }
    }
  }
`;

/**
 * __useFilterTypesQuery__
 *
 * To run a query within a React component, call `useFilterTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilterTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilterTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFilterTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IFilterTypesQuery,
    IFilterTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IFilterTypesQuery, IFilterTypesQueryVariables>(
    FilterTypesDocument,
    options,
  );
}
export function useFilterTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IFilterTypesQuery,
    IFilterTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IFilterTypesQuery, IFilterTypesQueryVariables>(
    FilterTypesDocument,
    options,
  );
}
export type FilterTypesQueryHookResult = ReturnType<typeof useFilterTypesQuery>;
export type FilterTypesLazyQueryHookResult = ReturnType<
  typeof useFilterTypesLazyQuery
>;
export type FilterTypesQueryResult = Apollo.QueryResult<
  IFilterTypesQuery,
  IFilterTypesQueryVariables
>;
export const FiltersDocument = gql`
  query Filters(
    $queryString: String
    $limit: Int
    $offset: Int
    $includeInactive: Boolean
    $sort: [SortOptionInput!]
  ) {
    filters(
      queryString: $queryString
      limit: $limit
      offset: $offset
      includeInactive: $includeInactive
      sort: $sort
    ) {
      ...FilterFragment
      texts {
        _id
        title
        subtitle
        locale
      }
    }
    filtersCount(includeInactive: $includeInactive, queryString: $queryString)
  }
  ${FilterFragmentFragmentDoc}
`;

/**
 * __useFiltersQuery__
 *
 * To run a query within a React component, call `useFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFiltersQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      includeInactive: // value for 'includeInactive'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFiltersQuery(
  baseOptions?: Apollo.QueryHookOptions<IFiltersQuery, IFiltersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IFiltersQuery, IFiltersQueryVariables>(
    FiltersDocument,
    options,
  );
}
export function useFiltersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IFiltersQuery,
    IFiltersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IFiltersQuery, IFiltersQueryVariables>(
    FiltersDocument,
    options,
  );
}
export type FiltersQueryHookResult = ReturnType<typeof useFiltersQuery>;
export type FiltersLazyQueryHookResult = ReturnType<typeof useFiltersLazyQuery>;
export type FiltersQueryResult = Apollo.QueryResult<
  IFiltersQuery,
  IFiltersQueryVariables
>;
export const FiltersCountDocument = gql`
  query FiltersCount {
    filtersCount
  }
`;

/**
 * __useFiltersCountQuery__
 *
 * To run a query within a React component, call `useFiltersCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFiltersCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFiltersCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useFiltersCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IFiltersCountQuery,
    IFiltersCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IFiltersCountQuery, IFiltersCountQueryVariables>(
    FiltersCountDocument,
    options,
  );
}
export function useFiltersCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IFiltersCountQuery,
    IFiltersCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IFiltersCountQuery, IFiltersCountQueryVariables>(
    FiltersCountDocument,
    options,
  );
}
export type FiltersCountQueryHookResult = ReturnType<
  typeof useFiltersCountQuery
>;
export type FiltersCountLazyQueryHookResult = ReturnType<
  typeof useFiltersCountLazyQuery
>;
export type FiltersCountQueryResult = Apollo.QueryResult<
  IFiltersCountQuery,
  IFiltersCountQueryVariables
>;
export const RemoveFilterDocument = gql`
  mutation RemoveFilter($filterId: ID!) {
    removeFilter(filterId: $filterId) {
      _id
    }
  }
`;
export type IRemoveFilterMutationFn = Apollo.MutationFunction<
  IRemoveFilterMutation,
  IRemoveFilterMutationVariables
>;

/**
 * __useRemoveFilterMutation__
 *
 * To run a mutation, you first call `useRemoveFilterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFilterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFilterMutation, { data, loading, error }] = useRemoveFilterMutation({
 *   variables: {
 *      filterId: // value for 'filterId'
 *   },
 * });
 */
export function useRemoveFilterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveFilterMutation,
    IRemoveFilterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveFilterMutation,
    IRemoveFilterMutationVariables
  >(RemoveFilterDocument, options);
}
export type RemoveFilterMutationHookResult = ReturnType<
  typeof useRemoveFilterMutation
>;
export type RemoveFilterMutationResult =
  Apollo.MutationResult<IRemoveFilterMutation>;
export type RemoveFilterMutationOptions = Apollo.BaseMutationOptions<
  IRemoveFilterMutation,
  IRemoveFilterMutationVariables
>;
export const RemoveFilterOptionDocument = gql`
  mutation RemoveFilterOption($filterId: ID!, $filterOptionValue: String!) {
    removeFilterOption(
      filterId: $filterId
      filterOptionValue: $filterOptionValue
    ) {
      _id
    }
  }
`;
export type IRemoveFilterOptionMutationFn = Apollo.MutationFunction<
  IRemoveFilterOptionMutation,
  IRemoveFilterOptionMutationVariables
>;

/**
 * __useRemoveFilterOptionMutation__
 *
 * To run a mutation, you first call `useRemoveFilterOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFilterOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFilterOptionMutation, { data, loading, error }] = useRemoveFilterOptionMutation({
 *   variables: {
 *      filterId: // value for 'filterId'
 *      filterOptionValue: // value for 'filterOptionValue'
 *   },
 * });
 */
export function useRemoveFilterOptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveFilterOptionMutation,
    IRemoveFilterOptionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveFilterOptionMutation,
    IRemoveFilterOptionMutationVariables
  >(RemoveFilterOptionDocument, options);
}
export type RemoveFilterOptionMutationHookResult = ReturnType<
  typeof useRemoveFilterOptionMutation
>;
export type RemoveFilterOptionMutationResult =
  Apollo.MutationResult<IRemoveFilterOptionMutation>;
export type RemoveFilterOptionMutationOptions = Apollo.BaseMutationOptions<
  IRemoveFilterOptionMutation,
  IRemoveFilterOptionMutationVariables
>;
export const TranslatedFilterTextsDocument = gql`
  query TranslatedFilterTexts($filterId: ID!, $filterOptionValue: String) {
    translatedFilterTexts(
      filterId: $filterId
      filterOptionValue: $filterOptionValue
    ) {
      ...FilterTextsFragment
    }
  }
  ${FilterTextsFragmentFragmentDoc}
`;

/**
 * __useTranslatedFilterTextsQuery__
 *
 * To run a query within a React component, call `useTranslatedFilterTextsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTranslatedFilterTextsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranslatedFilterTextsQuery({
 *   variables: {
 *      filterId: // value for 'filterId'
 *      filterOptionValue: // value for 'filterOptionValue'
 *   },
 * });
 */
export function useTranslatedFilterTextsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ITranslatedFilterTextsQuery,
    ITranslatedFilterTextsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ITranslatedFilterTextsQuery,
    ITranslatedFilterTextsQueryVariables
  >(TranslatedFilterTextsDocument, options);
}
export function useTranslatedFilterTextsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ITranslatedFilterTextsQuery,
    ITranslatedFilterTextsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ITranslatedFilterTextsQuery,
    ITranslatedFilterTextsQueryVariables
  >(TranslatedFilterTextsDocument, options);
}
export type TranslatedFilterTextsQueryHookResult = ReturnType<
  typeof useTranslatedFilterTextsQuery
>;
export type TranslatedFilterTextsLazyQueryHookResult = ReturnType<
  typeof useTranslatedFilterTextsLazyQuery
>;
export type TranslatedFilterTextsQueryResult = Apollo.QueryResult<
  ITranslatedFilterTextsQuery,
  ITranslatedFilterTextsQueryVariables
>;
export const UpdateFilterDocument = gql`
  mutation UpdateFilter($filter: UpdateFilterInput!, $filterId: ID!) {
    updateFilter(filter: $filter, filterId: $filterId) {
      ...FilterFragment
    }
  }
  ${FilterFragmentFragmentDoc}
`;
export type IUpdateFilterMutationFn = Apollo.MutationFunction<
  IUpdateFilterMutation,
  IUpdateFilterMutationVariables
>;

/**
 * __useUpdateFilterMutation__
 *
 * To run a mutation, you first call `useUpdateFilterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFilterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFilterMutation, { data, loading, error }] = useUpdateFilterMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *      filterId: // value for 'filterId'
 *   },
 * });
 */
export function useUpdateFilterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateFilterMutation,
    IUpdateFilterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateFilterMutation,
    IUpdateFilterMutationVariables
  >(UpdateFilterDocument, options);
}
export type UpdateFilterMutationHookResult = ReturnType<
  typeof useUpdateFilterMutation
>;
export type UpdateFilterMutationResult =
  Apollo.MutationResult<IUpdateFilterMutation>;
export type UpdateFilterMutationOptions = Apollo.BaseMutationOptions<
  IUpdateFilterMutation,
  IUpdateFilterMutationVariables
>;
export const UpdateFilterTextsDocument = gql`
  mutation UpdateFilterTexts(
    $filterId: ID!
    $filterOptionValue: String
    $texts: [UpdateFilterTextInput!]!
  ) {
    updateFilterTexts(
      filterId: $filterId
      filterOptionValue: $filterOptionValue
      texts: $texts
    ) {
      ...FilterTextsFragment
    }
  }
  ${FilterTextsFragmentFragmentDoc}
`;
export type IUpdateFilterTextsMutationFn = Apollo.MutationFunction<
  IUpdateFilterTextsMutation,
  IUpdateFilterTextsMutationVariables
>;

/**
 * __useUpdateFilterTextsMutation__
 *
 * To run a mutation, you first call `useUpdateFilterTextsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFilterTextsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFilterTextsMutation, { data, loading, error }] = useUpdateFilterTextsMutation({
 *   variables: {
 *      filterId: // value for 'filterId'
 *      filterOptionValue: // value for 'filterOptionValue'
 *      texts: // value for 'texts'
 *   },
 * });
 */
export function useUpdateFilterTextsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateFilterTextsMutation,
    IUpdateFilterTextsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateFilterTextsMutation,
    IUpdateFilterTextsMutationVariables
  >(UpdateFilterTextsDocument, options);
}
export type UpdateFilterTextsMutationHookResult = ReturnType<
  typeof useUpdateFilterTextsMutation
>;
export type UpdateFilterTextsMutationResult =
  Apollo.MutationResult<IUpdateFilterTextsMutation>;
export type UpdateFilterTextsMutationOptions = Apollo.BaseMutationOptions<
  IUpdateFilterTextsMutation,
  IUpdateFilterTextsMutationVariables
>;
export const CreateLanguageDocument = gql`
  mutation CreateLanguage($language: CreateLanguageInput!) {
    createLanguage(language: $language) {
      ...LanguageFragment
    }
  }
  ${LanguageFragmentFragmentDoc}
`;
export type ICreateLanguageMutationFn = Apollo.MutationFunction<
  ICreateLanguageMutation,
  ICreateLanguageMutationVariables
>;

/**
 * __useCreateLanguageMutation__
 *
 * To run a mutation, you first call `useCreateLanguageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLanguageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLanguageMutation, { data, loading, error }] = useCreateLanguageMutation({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useCreateLanguageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateLanguageMutation,
    ICreateLanguageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateLanguageMutation,
    ICreateLanguageMutationVariables
  >(CreateLanguageDocument, options);
}
export type CreateLanguageMutationHookResult = ReturnType<
  typeof useCreateLanguageMutation
>;
export type CreateLanguageMutationResult =
  Apollo.MutationResult<ICreateLanguageMutation>;
export type CreateLanguageMutationOptions = Apollo.BaseMutationOptions<
  ICreateLanguageMutation,
  ICreateLanguageMutationVariables
>;
export const LanguageDocument = gql`
  query Language($languageId: ID!) {
    language(languageId: $languageId) {
      ...LanguageFragment
    }
  }
  ${LanguageFragmentFragmentDoc}
`;

/**
 * __useLanguageQuery__
 *
 * To run a query within a React component, call `useLanguageQuery` and pass it any options that fit your needs.
 * When your component renders, `useLanguageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLanguageQuery({
 *   variables: {
 *      languageId: // value for 'languageId'
 *   },
 * });
 */
export function useLanguageQuery(
  baseOptions: Apollo.QueryHookOptions<ILanguageQuery, ILanguageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ILanguageQuery, ILanguageQueryVariables>(
    LanguageDocument,
    options,
  );
}
export function useLanguageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ILanguageQuery,
    ILanguageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ILanguageQuery, ILanguageQueryVariables>(
    LanguageDocument,
    options,
  );
}
export type LanguageQueryHookResult = ReturnType<typeof useLanguageQuery>;
export type LanguageLazyQueryHookResult = ReturnType<
  typeof useLanguageLazyQuery
>;
export type LanguageQueryResult = Apollo.QueryResult<
  ILanguageQuery,
  ILanguageQueryVariables
>;
export const LanguagesDocument = gql`
  query Languages(
    $queryString: String
    $offset: Int
    $limit: Int
    $includeInactive: Boolean
    $sort: [SortOptionInput!]
  ) {
    languages(
      queryString: $queryString
      offset: $offset
      limit: $limit
      includeInactive: $includeInactive
      sort: $sort
    ) {
      ...LanguageFragment
    }
    languagesCount(includeInactive: $includeInactive, queryString: $queryString)
  }
  ${LanguageFragmentFragmentDoc}
`;

/**
 * __useLanguagesQuery__
 *
 * To run a query within a React component, call `useLanguagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLanguagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLanguagesQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      includeInactive: // value for 'includeInactive'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useLanguagesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ILanguagesQuery,
    ILanguagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ILanguagesQuery, ILanguagesQueryVariables>(
    LanguagesDocument,
    options,
  );
}
export function useLanguagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ILanguagesQuery,
    ILanguagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ILanguagesQuery, ILanguagesQueryVariables>(
    LanguagesDocument,
    options,
  );
}
export type LanguagesQueryHookResult = ReturnType<typeof useLanguagesQuery>;
export type LanguagesLazyQueryHookResult = ReturnType<
  typeof useLanguagesLazyQuery
>;
export type LanguagesQueryResult = Apollo.QueryResult<
  ILanguagesQuery,
  ILanguagesQueryVariables
>;
export const RemoveLanguageDocument = gql`
  mutation RemoveLanguage($languageId: ID!) {
    removeLanguage(languageId: $languageId) {
      ...LanguageFragment
    }
  }
  ${LanguageFragmentFragmentDoc}
`;
export type IRemoveLanguageMutationFn = Apollo.MutationFunction<
  IRemoveLanguageMutation,
  IRemoveLanguageMutationVariables
>;

/**
 * __useRemoveLanguageMutation__
 *
 * To run a mutation, you first call `useRemoveLanguageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLanguageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLanguageMutation, { data, loading, error }] = useRemoveLanguageMutation({
 *   variables: {
 *      languageId: // value for 'languageId'
 *   },
 * });
 */
export function useRemoveLanguageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveLanguageMutation,
    IRemoveLanguageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveLanguageMutation,
    IRemoveLanguageMutationVariables
  >(RemoveLanguageDocument, options);
}
export type RemoveLanguageMutationHookResult = ReturnType<
  typeof useRemoveLanguageMutation
>;
export type RemoveLanguageMutationResult =
  Apollo.MutationResult<IRemoveLanguageMutation>;
export type RemoveLanguageMutationOptions = Apollo.BaseMutationOptions<
  IRemoveLanguageMutation,
  IRemoveLanguageMutationVariables
>;
export const UpdateLanguageDocument = gql`
  mutation UpdateLanguage($language: UpdateLanguageInput!, $languageId: ID!) {
    updateLanguage(language: $language, languageId: $languageId) {
      ...LanguageFragment
    }
  }
  ${LanguageFragmentFragmentDoc}
`;
export type IUpdateLanguageMutationFn = Apollo.MutationFunction<
  IUpdateLanguageMutation,
  IUpdateLanguageMutationVariables
>;

/**
 * __useUpdateLanguageMutation__
 *
 * To run a mutation, you first call `useUpdateLanguageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLanguageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLanguageMutation, { data, loading, error }] = useUpdateLanguageMutation({
 *   variables: {
 *      language: // value for 'language'
 *      languageId: // value for 'languageId'
 *   },
 * });
 */
export function useUpdateLanguageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateLanguageMutation,
    IUpdateLanguageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateLanguageMutation,
    IUpdateLanguageMutationVariables
  >(UpdateLanguageDocument, options);
}
export type UpdateLanguageMutationHookResult = ReturnType<
  typeof useUpdateLanguageMutation
>;
export type UpdateLanguageMutationResult =
  Apollo.MutationResult<IUpdateLanguageMutation>;
export type UpdateLanguageMutationOptions = Apollo.BaseMutationOptions<
  IUpdateLanguageMutation,
  IUpdateLanguageMutationVariables
>;
export const ConfirmOrderDocument = gql`
  mutation ConfirmOrder($orderId: ID!) {
    confirmOrder(orderId: $orderId) {
      _id
    }
  }
`;
export type IConfirmOrderMutationFn = Apollo.MutationFunction<
  IConfirmOrderMutation,
  IConfirmOrderMutationVariables
>;

/**
 * __useConfirmOrderMutation__
 *
 * To run a mutation, you first call `useConfirmOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmOrderMutation, { data, loading, error }] = useConfirmOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useConfirmOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IConfirmOrderMutation,
    IConfirmOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IConfirmOrderMutation,
    IConfirmOrderMutationVariables
  >(ConfirmOrderDocument, options);
}
export type ConfirmOrderMutationHookResult = ReturnType<
  typeof useConfirmOrderMutation
>;
export type ConfirmOrderMutationResult =
  Apollo.MutationResult<IConfirmOrderMutation>;
export type ConfirmOrderMutationOptions = Apollo.BaseMutationOptions<
  IConfirmOrderMutation,
  IConfirmOrderMutationVariables
>;
export const DeliverOrderDocument = gql`
  mutation DeliverOrder($orderId: ID!) {
    deliverOrder(orderId: $orderId) {
      _id
    }
  }
`;
export type IDeliverOrderMutationFn = Apollo.MutationFunction<
  IDeliverOrderMutation,
  IDeliverOrderMutationVariables
>;

/**
 * __useDeliverOrderMutation__
 *
 * To run a mutation, you first call `useDeliverOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeliverOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deliverOrderMutation, { data, loading, error }] = useDeliverOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useDeliverOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IDeliverOrderMutation,
    IDeliverOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IDeliverOrderMutation,
    IDeliverOrderMutationVariables
  >(DeliverOrderDocument, options);
}
export type DeliverOrderMutationHookResult = ReturnType<
  typeof useDeliverOrderMutation
>;
export type DeliverOrderMutationResult =
  Apollo.MutationResult<IDeliverOrderMutation>;
export type DeliverOrderMutationOptions = Apollo.BaseMutationOptions<
  IDeliverOrderMutation,
  IDeliverOrderMutationVariables
>;
export const OrderDocument = gql`
  query Order($orderId: ID!) {
    order(orderId: $orderId) {
      ...OrderDetailFragment
    }
  }
  ${OrderDetailFragmentFragmentDoc}
`;

/**
 * __useOrderQuery__
 *
 * To run a query within a React component, call `useOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useOrderQuery(
  baseOptions: Apollo.QueryHookOptions<IOrderQuery, IOrderQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IOrderQuery, IOrderQueryVariables>(
    OrderDocument,
    options,
  );
}
export function useOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IOrderQuery, IOrderQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IOrderQuery, IOrderQueryVariables>(
    OrderDocument,
    options,
  );
}
export type OrderQueryHookResult = ReturnType<typeof useOrderQuery>;
export type OrderLazyQueryHookResult = ReturnType<typeof useOrderLazyQuery>;
export type OrderQueryResult = Apollo.QueryResult<
  IOrderQuery,
  IOrderQueryVariables
>;
export const OrderStatusDocument = gql`
  query OrderStatus {
    orderStatusType: __type(name: "OrderStatus") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

/**
 * __useOrderStatusQuery__
 *
 * To run a query within a React component, call `useOrderStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrderStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IOrderStatusQuery,
    IOrderStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IOrderStatusQuery, IOrderStatusQueryVariables>(
    OrderStatusDocument,
    options,
  );
}
export function useOrderStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IOrderStatusQuery,
    IOrderStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IOrderStatusQuery, IOrderStatusQueryVariables>(
    OrderStatusDocument,
    options,
  );
}
export type OrderStatusQueryHookResult = ReturnType<typeof useOrderStatusQuery>;
export type OrderStatusLazyQueryHookResult = ReturnType<
  typeof useOrderStatusLazyQuery
>;
export type OrderStatusQueryResult = Apollo.QueryResult<
  IOrderStatusQuery,
  IOrderStatusQueryVariables
>;
export const OrdersDocument = gql`
  query Orders(
    $limit: Int
    $offset: Int
    $includeCarts: Boolean
    $queryString: String
    $sort: [SortOptionInput!]
  ) {
    orders(
      limit: $limit
      offset: $offset
      includeCarts: $includeCarts
      queryString: $queryString
      sort: $sort
    ) {
      ...OrderFragment
    }
    ordersCount
  }
  ${OrderFragmentFragmentDoc}
`;

/**
 * __useOrdersQuery__
 *
 * To run a query within a React component, call `useOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      includeCarts: // value for 'includeCarts'
 *      queryString: // value for 'queryString'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useOrdersQuery(
  baseOptions?: Apollo.QueryHookOptions<IOrdersQuery, IOrdersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IOrdersQuery, IOrdersQueryVariables>(
    OrdersDocument,
    options,
  );
}
export function useOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IOrdersQuery,
    IOrdersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IOrdersQuery, IOrdersQueryVariables>(
    OrdersDocument,
    options,
  );
}
export type OrdersQueryHookResult = ReturnType<typeof useOrdersQuery>;
export type OrdersLazyQueryHookResult = ReturnType<typeof useOrdersLazyQuery>;
export type OrdersQueryResult = Apollo.QueryResult<
  IOrdersQuery,
  IOrdersQueryVariables
>;
export const PayOrderDocument = gql`
  mutation PayOrder($orderId: ID!) {
    payOrder(orderId: $orderId) {
      _id
    }
  }
`;
export type IPayOrderMutationFn = Apollo.MutationFunction<
  IPayOrderMutation,
  IPayOrderMutationVariables
>;

/**
 * __usePayOrderMutation__
 *
 * To run a mutation, you first call `usePayOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePayOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [payOrderMutation, { data, loading, error }] = usePayOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function usePayOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IPayOrderMutation,
    IPayOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IPayOrderMutation, IPayOrderMutationVariables>(
    PayOrderDocument,
    options,
  );
}
export type PayOrderMutationHookResult = ReturnType<typeof usePayOrderMutation>;
export type PayOrderMutationResult = Apollo.MutationResult<IPayOrderMutation>;
export type PayOrderMutationOptions = Apollo.BaseMutationOptions<
  IPayOrderMutation,
  IPayOrderMutationVariables
>;
export const RejectOrderDocument = gql`
  mutation RejectOrder($orderId: ID!) {
    rejectOrder(orderId: $orderId) {
      _id
    }
  }
`;
export type IRejectOrderMutationFn = Apollo.MutationFunction<
  IRejectOrderMutation,
  IRejectOrderMutationVariables
>;

/**
 * __useRejectOrderMutation__
 *
 * To run a mutation, you first call `useRejectOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectOrderMutation, { data, loading, error }] = useRejectOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useRejectOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRejectOrderMutation,
    IRejectOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRejectOrderMutation,
    IRejectOrderMutationVariables
  >(RejectOrderDocument, options);
}
export type RejectOrderMutationHookResult = ReturnType<
  typeof useRejectOrderMutation
>;
export type RejectOrderMutationResult =
  Apollo.MutationResult<IRejectOrderMutation>;
export type RejectOrderMutationOptions = Apollo.BaseMutationOptions<
  IRejectOrderMutation,
  IRejectOrderMutationVariables
>;
export const RemoveOrderDocument = gql`
  mutation RemoveOrder($orderId: ID!) {
    removeOrder(orderId: $orderId) {
      _id
    }
  }
`;
export type IRemoveOrderMutationFn = Apollo.MutationFunction<
  IRemoveOrderMutation,
  IRemoveOrderMutationVariables
>;

/**
 * __useRemoveOrderMutation__
 *
 * To run a mutation, you first call `useRemoveOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeOrderMutation, { data, loading, error }] = useRemoveOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useRemoveOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveOrderMutation,
    IRemoveOrderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveOrderMutation,
    IRemoveOrderMutationVariables
  >(RemoveOrderDocument, options);
}
export type RemoveOrderMutationHookResult = ReturnType<
  typeof useRemoveOrderMutation
>;
export type RemoveOrderMutationResult =
  Apollo.MutationResult<IRemoveOrderMutation>;
export type RemoveOrderMutationOptions = Apollo.BaseMutationOptions<
  IRemoveOrderMutation,
  IRemoveOrderMutationVariables
>;
export const UserOrderDocument = gql`
  query UserOrder(
    $userId: ID
    $queryString: String
    $sort: [SortOptionInput!]
  ) {
    user(userId: $userId) {
      orders(queryString: $queryString, sort: $sort) {
        ...OrderFragment
      }
    }
  }
  ${OrderFragmentFragmentDoc}
`;

/**
 * __useUserOrderQuery__
 *
 * To run a query within a React component, call `useUserOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserOrderQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      queryString: // value for 'queryString'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useUserOrderQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IUserOrderQuery,
    IUserOrderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IUserOrderQuery, IUserOrderQueryVariables>(
    UserOrderDocument,
    options,
  );
}
export function useUserOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IUserOrderQuery,
    IUserOrderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IUserOrderQuery, IUserOrderQueryVariables>(
    UserOrderDocument,
    options,
  );
}
export type UserOrderQueryHookResult = ReturnType<typeof useUserOrderQuery>;
export type UserOrderLazyQueryHookResult = ReturnType<
  typeof useUserOrderLazyQuery
>;
export type UserOrderQueryResult = Apollo.QueryResult<
  IUserOrderQuery,
  IUserOrderQueryVariables
>;
export const CreatePaymentProviderDocument = gql`
  mutation CreatePaymentProvider(
    $paymentProvider: CreatePaymentProviderInput!
  ) {
    createPaymentProvider(paymentProvider: $paymentProvider) {
      ...PaymentProviderFragment
    }
  }
  ${PaymentProviderFragmentFragmentDoc}
`;
export type ICreatePaymentProviderMutationFn = Apollo.MutationFunction<
  ICreatePaymentProviderMutation,
  ICreatePaymentProviderMutationVariables
>;

/**
 * __useCreatePaymentProviderMutation__
 *
 * To run a mutation, you first call `useCreatePaymentProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentProviderMutation, { data, loading, error }] = useCreatePaymentProviderMutation({
 *   variables: {
 *      paymentProvider: // value for 'paymentProvider'
 *   },
 * });
 */
export function useCreatePaymentProviderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreatePaymentProviderMutation,
    ICreatePaymentProviderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreatePaymentProviderMutation,
    ICreatePaymentProviderMutationVariables
  >(CreatePaymentProviderDocument, options);
}
export type CreatePaymentProviderMutationHookResult = ReturnType<
  typeof useCreatePaymentProviderMutation
>;
export type CreatePaymentProviderMutationResult =
  Apollo.MutationResult<ICreatePaymentProviderMutation>;
export type CreatePaymentProviderMutationOptions = Apollo.BaseMutationOptions<
  ICreatePaymentProviderMutation,
  ICreatePaymentProviderMutationVariables
>;
export const PaymentInterfacesDocument = gql`
  query PaymentInterfaces($providerType: PaymentProviderType!) {
    paymentInterfaces(type: $providerType) {
      _id
      value: _id
      label
    }
  }
`;

/**
 * __usePaymentInterfacesQuery__
 *
 * To run a query within a React component, call `usePaymentInterfacesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentInterfacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentInterfacesQuery({
 *   variables: {
 *      providerType: // value for 'providerType'
 *   },
 * });
 */
export function usePaymentInterfacesQuery(
  baseOptions: Apollo.QueryHookOptions<
    IPaymentInterfacesQuery,
    IPaymentInterfacesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IPaymentInterfacesQuery,
    IPaymentInterfacesQueryVariables
  >(PaymentInterfacesDocument, options);
}
export function usePaymentInterfacesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IPaymentInterfacesQuery,
    IPaymentInterfacesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IPaymentInterfacesQuery,
    IPaymentInterfacesQueryVariables
  >(PaymentInterfacesDocument, options);
}
export type PaymentInterfacesQueryHookResult = ReturnType<
  typeof usePaymentInterfacesQuery
>;
export type PaymentInterfacesLazyQueryHookResult = ReturnType<
  typeof usePaymentInterfacesLazyQuery
>;
export type PaymentInterfacesQueryResult = Apollo.QueryResult<
  IPaymentInterfacesQuery,
  IPaymentInterfacesQueryVariables
>;
export const PaymentProviderDocument = gql`
  query PaymentProvider($paymentProviderId: ID!) {
    paymentProvider(paymentProviderId: $paymentProviderId) {
      ...PaymentProviderFragment
    }
  }
  ${PaymentProviderFragmentFragmentDoc}
`;

/**
 * __usePaymentProviderQuery__
 *
 * To run a query within a React component, call `usePaymentProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentProviderQuery({
 *   variables: {
 *      paymentProviderId: // value for 'paymentProviderId'
 *   },
 * });
 */
export function usePaymentProviderQuery(
  baseOptions: Apollo.QueryHookOptions<
    IPaymentProviderQuery,
    IPaymentProviderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IPaymentProviderQuery, IPaymentProviderQueryVariables>(
    PaymentProviderDocument,
    options,
  );
}
export function usePaymentProviderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IPaymentProviderQuery,
    IPaymentProviderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IPaymentProviderQuery,
    IPaymentProviderQueryVariables
  >(PaymentProviderDocument, options);
}
export type PaymentProviderQueryHookResult = ReturnType<
  typeof usePaymentProviderQuery
>;
export type PaymentProviderLazyQueryHookResult = ReturnType<
  typeof usePaymentProviderLazyQuery
>;
export type PaymentProviderQueryResult = Apollo.QueryResult<
  IPaymentProviderQuery,
  IPaymentProviderQueryVariables
>;
export const PaymentProvidersTypeDocument = gql`
  query PaymentProvidersType {
    paymentProviderType: __type(name: "PaymentProviderType") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

/**
 * __usePaymentProvidersTypeQuery__
 *
 * To run a query within a React component, call `usePaymentProvidersTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentProvidersTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentProvidersTypeQuery({
 *   variables: {
 *   },
 * });
 */
export function usePaymentProvidersTypeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IPaymentProvidersTypeQuery,
    IPaymentProvidersTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IPaymentProvidersTypeQuery,
    IPaymentProvidersTypeQueryVariables
  >(PaymentProvidersTypeDocument, options);
}
export function usePaymentProvidersTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IPaymentProvidersTypeQuery,
    IPaymentProvidersTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IPaymentProvidersTypeQuery,
    IPaymentProvidersTypeQueryVariables
  >(PaymentProvidersTypeDocument, options);
}
export type PaymentProvidersTypeQueryHookResult = ReturnType<
  typeof usePaymentProvidersTypeQuery
>;
export type PaymentProvidersTypeLazyQueryHookResult = ReturnType<
  typeof usePaymentProvidersTypeLazyQuery
>;
export type PaymentProvidersTypeQueryResult = Apollo.QueryResult<
  IPaymentProvidersTypeQuery,
  IPaymentProvidersTypeQueryVariables
>;
export const PaymentProvidersDocument = gql`
  query PaymentProviders($type: PaymentProviderType) {
    paymentProviders(type: $type) {
      ...PaymentProviderFragment
    }
  }
  ${PaymentProviderFragmentFragmentDoc}
`;

/**
 * __usePaymentProvidersQuery__
 *
 * To run a query within a React component, call `usePaymentProvidersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentProvidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentProvidersQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function usePaymentProvidersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IPaymentProvidersQuery,
    IPaymentProvidersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IPaymentProvidersQuery,
    IPaymentProvidersQueryVariables
  >(PaymentProvidersDocument, options);
}
export function usePaymentProvidersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IPaymentProvidersQuery,
    IPaymentProvidersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IPaymentProvidersQuery,
    IPaymentProvidersQueryVariables
  >(PaymentProvidersDocument, options);
}
export type PaymentProvidersQueryHookResult = ReturnType<
  typeof usePaymentProvidersQuery
>;
export type PaymentProvidersLazyQueryHookResult = ReturnType<
  typeof usePaymentProvidersLazyQuery
>;
export type PaymentProvidersQueryResult = Apollo.QueryResult<
  IPaymentProvidersQuery,
  IPaymentProvidersQueryVariables
>;
export const OrderPaymentStatusDocument = gql`
  query OrderPaymentStatus {
    paymentStatusTypes: __type(name: "OrderPaymentStatus") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

/**
 * __useOrderPaymentStatusQuery__
 *
 * To run a query within a React component, call `useOrderPaymentStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderPaymentStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderPaymentStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrderPaymentStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IOrderPaymentStatusQuery,
    IOrderPaymentStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IOrderPaymentStatusQuery,
    IOrderPaymentStatusQueryVariables
  >(OrderPaymentStatusDocument, options);
}
export function useOrderPaymentStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IOrderPaymentStatusQuery,
    IOrderPaymentStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IOrderPaymentStatusQuery,
    IOrderPaymentStatusQueryVariables
  >(OrderPaymentStatusDocument, options);
}
export type OrderPaymentStatusQueryHookResult = ReturnType<
  typeof useOrderPaymentStatusQuery
>;
export type OrderPaymentStatusLazyQueryHookResult = ReturnType<
  typeof useOrderPaymentStatusLazyQuery
>;
export type OrderPaymentStatusQueryResult = Apollo.QueryResult<
  IOrderPaymentStatusQuery,
  IOrderPaymentStatusQueryVariables
>;
export const RemovePaymentProviderDocument = gql`
  mutation RemovePaymentProvider($paymentProviderId: ID!) {
    removePaymentProvider(paymentProviderId: $paymentProviderId) {
      _id
    }
  }
`;
export type IRemovePaymentProviderMutationFn = Apollo.MutationFunction<
  IRemovePaymentProviderMutation,
  IRemovePaymentProviderMutationVariables
>;

/**
 * __useRemovePaymentProviderMutation__
 *
 * To run a mutation, you first call `useRemovePaymentProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePaymentProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePaymentProviderMutation, { data, loading, error }] = useRemovePaymentProviderMutation({
 *   variables: {
 *      paymentProviderId: // value for 'paymentProviderId'
 *   },
 * });
 */
export function useRemovePaymentProviderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemovePaymentProviderMutation,
    IRemovePaymentProviderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemovePaymentProviderMutation,
    IRemovePaymentProviderMutationVariables
  >(RemovePaymentProviderDocument, options);
}
export type RemovePaymentProviderMutationHookResult = ReturnType<
  typeof useRemovePaymentProviderMutation
>;
export type RemovePaymentProviderMutationResult =
  Apollo.MutationResult<IRemovePaymentProviderMutation>;
export type RemovePaymentProviderMutationOptions = Apollo.BaseMutationOptions<
  IRemovePaymentProviderMutation,
  IRemovePaymentProviderMutationVariables
>;
export const UpdatePaymentProviderDocument = gql`
  mutation UpdatePaymentProvider(
    $paymentProvider: UpdateProviderInput!
    $paymentProviderId: ID!
  ) {
    updatePaymentProvider(
      paymentProvider: $paymentProvider
      paymentProviderId: $paymentProviderId
    ) {
      ...PaymentProviderFragment
    }
  }
  ${PaymentProviderFragmentFragmentDoc}
`;
export type IUpdatePaymentProviderMutationFn = Apollo.MutationFunction<
  IUpdatePaymentProviderMutation,
  IUpdatePaymentProviderMutationVariables
>;

/**
 * __useUpdatePaymentProviderMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentProviderMutation, { data, loading, error }] = useUpdatePaymentProviderMutation({
 *   variables: {
 *      paymentProvider: // value for 'paymentProvider'
 *      paymentProviderId: // value for 'paymentProviderId'
 *   },
 * });
 */
export function useUpdatePaymentProviderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdatePaymentProviderMutation,
    IUpdatePaymentProviderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdatePaymentProviderMutation,
    IUpdatePaymentProviderMutationVariables
  >(UpdatePaymentProviderDocument, options);
}
export type UpdatePaymentProviderMutationHookResult = ReturnType<
  typeof useUpdatePaymentProviderMutation
>;
export type UpdatePaymentProviderMutationResult =
  Apollo.MutationResult<IUpdatePaymentProviderMutation>;
export type UpdatePaymentProviderMutationOptions = Apollo.BaseMutationOptions<
  IUpdatePaymentProviderMutation,
  IUpdatePaymentProviderMutationVariables
>;
export const AddProductReviewVoteDocument = gql`
  mutation AddProductReviewVote(
    $productReviewId: ID!
    $type: ProductReviewVoteType!
    $meta: JSON
  ) {
    addProductReviewVote(
      productReviewId: $productReviewId
      type: $type
      meta: $meta
    ) {
      ...ProductReviewDetailFragment
    }
  }
  ${ProductReviewDetailFragmentFragmentDoc}
`;
export type IAddProductReviewVoteMutationFn = Apollo.MutationFunction<
  IAddProductReviewVoteMutation,
  IAddProductReviewVoteMutationVariables
>;

/**
 * __useAddProductReviewVoteMutation__
 *
 * To run a mutation, you first call `useAddProductReviewVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductReviewVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductReviewVoteMutation, { data, loading, error }] = useAddProductReviewVoteMutation({
 *   variables: {
 *      productReviewId: // value for 'productReviewId'
 *      type: // value for 'type'
 *      meta: // value for 'meta'
 *   },
 * });
 */
export function useAddProductReviewVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IAddProductReviewVoteMutation,
    IAddProductReviewVoteMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IAddProductReviewVoteMutation,
    IAddProductReviewVoteMutationVariables
  >(AddProductReviewVoteDocument, options);
}
export type AddProductReviewVoteMutationHookResult = ReturnType<
  typeof useAddProductReviewVoteMutation
>;
export type AddProductReviewVoteMutationResult =
  Apollo.MutationResult<IAddProductReviewVoteMutation>;
export type AddProductReviewVoteMutationOptions = Apollo.BaseMutationOptions<
  IAddProductReviewVoteMutation,
  IAddProductReviewVoteMutationVariables
>;
export const CreateProductReviewDocument = gql`
  mutation CreateProductReview(
    $productId: ID!
    $productReview: ProductReviewInput!
  ) {
    createProductReview(productId: $productId, productReview: $productReview) {
      ...ProductReviewDetailFragment
    }
  }
  ${ProductReviewDetailFragmentFragmentDoc}
`;
export type ICreateProductReviewMutationFn = Apollo.MutationFunction<
  ICreateProductReviewMutation,
  ICreateProductReviewMutationVariables
>;

/**
 * __useCreateProductReviewMutation__
 *
 * To run a mutation, you first call `useCreateProductReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductReviewMutation, { data, loading, error }] = useCreateProductReviewMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      productReview: // value for 'productReview'
 *   },
 * });
 */
export function useCreateProductReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateProductReviewMutation,
    ICreateProductReviewMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateProductReviewMutation,
    ICreateProductReviewMutationVariables
  >(CreateProductReviewDocument, options);
}
export type CreateProductReviewMutationHookResult = ReturnType<
  typeof useCreateProductReviewMutation
>;
export type CreateProductReviewMutationResult =
  Apollo.MutationResult<ICreateProductReviewMutation>;
export type CreateProductReviewMutationOptions = Apollo.BaseMutationOptions<
  ICreateProductReviewMutation,
  ICreateProductReviewMutationVariables
>;
export const ProductReviewDocument = gql`
  query ProductReview($productReviewId: ID!) {
    productReview(productReviewId: $productReviewId) {
      ...ProductReviewDetailFragment
    }
  }
  ${ProductReviewDetailFragmentFragmentDoc}
`;

/**
 * __useProductReviewQuery__
 *
 * To run a query within a React component, call `useProductReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductReviewQuery({
 *   variables: {
 *      productReviewId: // value for 'productReviewId'
 *   },
 * });
 */
export function useProductReviewQuery(
  baseOptions: Apollo.QueryHookOptions<
    IProductReviewQuery,
    IProductReviewQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IProductReviewQuery, IProductReviewQueryVariables>(
    ProductReviewDocument,
    options,
  );
}
export function useProductReviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductReviewQuery,
    IProductReviewQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IProductReviewQuery, IProductReviewQueryVariables>(
    ProductReviewDocument,
    options,
  );
}
export type ProductReviewQueryHookResult = ReturnType<
  typeof useProductReviewQuery
>;
export type ProductReviewLazyQueryHookResult = ReturnType<
  typeof useProductReviewLazyQuery
>;
export type ProductReviewQueryResult = Apollo.QueryResult<
  IProductReviewQuery,
  IProductReviewQueryVariables
>;
export const ProductReviewByProductDocument = gql`
  query ProductReviewByProduct(
    $productId: ID
    $slug: String
    $limit: Int
    $offset: Int
    $sort: [SortOptionInput!]
  ) {
    product(productId: $productId, slug: $slug) {
      _id
      reviews(limit: $limit, offset: $offset, sort: $sort) {
        ...ProductReviewDetailFragment
      }
      reviewsCount
    }
  }
  ${ProductReviewDetailFragmentFragmentDoc}
`;

/**
 * __useProductReviewByProductQuery__
 *
 * To run a query within a React component, call `useProductReviewByProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductReviewByProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductReviewByProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      slug: // value for 'slug'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useProductReviewByProductQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProductReviewByProductQuery,
    IProductReviewByProductQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IProductReviewByProductQuery,
    IProductReviewByProductQueryVariables
  >(ProductReviewByProductDocument, options);
}
export function useProductReviewByProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductReviewByProductQuery,
    IProductReviewByProductQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IProductReviewByProductQuery,
    IProductReviewByProductQueryVariables
  >(ProductReviewByProductDocument, options);
}
export type ProductReviewByProductQueryHookResult = ReturnType<
  typeof useProductReviewByProductQuery
>;
export type ProductReviewByProductLazyQueryHookResult = ReturnType<
  typeof useProductReviewByProductLazyQuery
>;
export type ProductReviewByProductQueryResult = Apollo.QueryResult<
  IProductReviewByProductQuery,
  IProductReviewByProductQueryVariables
>;
export const RemoveProductReviewDocument = gql`
  mutation RemoveProductReview($productReviewId: ID!) {
    removeProductReview(productReviewId: $productReviewId) {
      _id
    }
  }
`;
export type IRemoveProductReviewMutationFn = Apollo.MutationFunction<
  IRemoveProductReviewMutation,
  IRemoveProductReviewMutationVariables
>;

/**
 * __useRemoveProductReviewMutation__
 *
 * To run a mutation, you first call `useRemoveProductReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductReviewMutation, { data, loading, error }] = useRemoveProductReviewMutation({
 *   variables: {
 *      productReviewId: // value for 'productReviewId'
 *   },
 * });
 */
export function useRemoveProductReviewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveProductReviewMutation,
    IRemoveProductReviewMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveProductReviewMutation,
    IRemoveProductReviewMutationVariables
  >(RemoveProductReviewDocument, options);
}
export type RemoveProductReviewMutationHookResult = ReturnType<
  typeof useRemoveProductReviewMutation
>;
export type RemoveProductReviewMutationResult =
  Apollo.MutationResult<IRemoveProductReviewMutation>;
export type RemoveProductReviewMutationOptions = Apollo.BaseMutationOptions<
  IRemoveProductReviewMutation,
  IRemoveProductReviewMutationVariables
>;
export const RemoveProductReviewVoteDocument = gql`
  mutation removeProductReviewVote(
    $productReviewId: ID!
    $type: ProductReviewVoteType!
  ) {
    removeProductReviewVote(productReviewId: $productReviewId, type: $type) {
      ...ProductReviewDetailFragment
    }
  }
  ${ProductReviewDetailFragmentFragmentDoc}
`;
export type IRemoveProductReviewVoteMutationFn = Apollo.MutationFunction<
  IRemoveProductReviewVoteMutation,
  IRemoveProductReviewVoteMutationVariables
>;

/**
 * __useRemoveProductReviewVoteMutation__
 *
 * To run a mutation, you first call `useRemoveProductReviewVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductReviewVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductReviewVoteMutation, { data, loading, error }] = useRemoveProductReviewVoteMutation({
 *   variables: {
 *      productReviewId: // value for 'productReviewId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useRemoveProductReviewVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveProductReviewVoteMutation,
    IRemoveProductReviewVoteMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveProductReviewVoteMutation,
    IRemoveProductReviewVoteMutationVariables
  >(RemoveProductReviewVoteDocument, options);
}
export type RemoveProductReviewVoteMutationHookResult = ReturnType<
  typeof useRemoveProductReviewVoteMutation
>;
export type RemoveProductReviewVoteMutationResult =
  Apollo.MutationResult<IRemoveProductReviewVoteMutation>;
export type RemoveProductReviewVoteMutationOptions = Apollo.BaseMutationOptions<
  IRemoveProductReviewVoteMutation,
  IRemoveProductReviewVoteMutationVariables
>;
export const UserProductReviewsDocument = gql`
  query UserProductReviews(
    $userId: ID!
    $limit: Int
    $offset: Int
    $sort: [SortOptionInput!]
  ) {
    user(userId: $userId) {
      _id
      reviews(limit: $limit, offset: $offset, sort: $sort) {
        ...ProductReviewDetailFragment
        product {
          ...ProductBriefFragment
        }
      }
      reviewsCount
    }
  }
  ${ProductReviewDetailFragmentFragmentDoc}
  ${ProductBriefFragmentFragmentDoc}
`;

/**
 * __useUserProductReviewsQuery__
 *
 * To run a query within a React component, call `useUserProductReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProductReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProductReviewsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useUserProductReviewsQuery(
  baseOptions: Apollo.QueryHookOptions<
    IUserProductReviewsQuery,
    IUserProductReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IUserProductReviewsQuery,
    IUserProductReviewsQueryVariables
  >(UserProductReviewsDocument, options);
}
export function useUserProductReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IUserProductReviewsQuery,
    IUserProductReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IUserProductReviewsQuery,
    IUserProductReviewsQueryVariables
  >(UserProductReviewsDocument, options);
}
export type UserProductReviewsQueryHookResult = ReturnType<
  typeof useUserProductReviewsQuery
>;
export type UserProductReviewsLazyQueryHookResult = ReturnType<
  typeof useUserProductReviewsLazyQuery
>;
export type UserProductReviewsQueryResult = Apollo.QueryResult<
  IUserProductReviewsQuery,
  IUserProductReviewsQueryVariables
>;
export const AddProductAssignmentDocument = gql`
  mutation AddProductAssignment(
    $proxyId: ID!
    $productId: ID!
    $vectors: [ProductAssignmentVectorInput!]!
  ) {
    addProductAssignment(
      proxyId: $proxyId
      productId: $productId
      vectors: $vectors
    ) {
      _id
    }
  }
`;
export type IAddProductAssignmentMutationFn = Apollo.MutationFunction<
  IAddProductAssignmentMutation,
  IAddProductAssignmentMutationVariables
>;

/**
 * __useAddProductAssignmentMutation__
 *
 * To run a mutation, you first call `useAddProductAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductAssignmentMutation, { data, loading, error }] = useAddProductAssignmentMutation({
 *   variables: {
 *      proxyId: // value for 'proxyId'
 *      productId: // value for 'productId'
 *      vectors: // value for 'vectors'
 *   },
 * });
 */
export function useAddProductAssignmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IAddProductAssignmentMutation,
    IAddProductAssignmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IAddProductAssignmentMutation,
    IAddProductAssignmentMutationVariables
  >(AddProductAssignmentDocument, options);
}
export type AddProductAssignmentMutationHookResult = ReturnType<
  typeof useAddProductAssignmentMutation
>;
export type AddProductAssignmentMutationResult =
  Apollo.MutationResult<IAddProductAssignmentMutation>;
export type AddProductAssignmentMutationOptions = Apollo.BaseMutationOptions<
  IAddProductAssignmentMutation,
  IAddProductAssignmentMutationVariables
>;
export const AddProductMediaDocument = gql`
  mutation AddProductMedia($productId: ID!, $media: Upload!) {
    addProductMedia(productId: $productId, media: $media) {
      _id
    }
  }
`;
export type IAddProductMediaMutationFn = Apollo.MutationFunction<
  IAddProductMediaMutation,
  IAddProductMediaMutationVariables
>;

/**
 * __useAddProductMediaMutation__
 *
 * To run a mutation, you first call `useAddProductMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductMediaMutation, { data, loading, error }] = useAddProductMediaMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      media: // value for 'media'
 *   },
 * });
 */
export function useAddProductMediaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IAddProductMediaMutation,
    IAddProductMediaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IAddProductMediaMutation,
    IAddProductMediaMutationVariables
  >(AddProductMediaDocument, options);
}
export type AddProductMediaMutationHookResult = ReturnType<
  typeof useAddProductMediaMutation
>;
export type AddProductMediaMutationResult =
  Apollo.MutationResult<IAddProductMediaMutation>;
export type AddProductMediaMutationOptions = Apollo.BaseMutationOptions<
  IAddProductMediaMutation,
  IAddProductMediaMutationVariables
>;
export const CreateProductDocument = gql`
  mutation CreateProduct($product: CreateProductInput!) {
    createProduct(product: $product) {
      ...ProductDetailFragment
    }
  }
  ${ProductDetailFragmentFragmentDoc}
`;
export type ICreateProductMutationFn = Apollo.MutationFunction<
  ICreateProductMutation,
  ICreateProductMutationVariables
>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      product: // value for 'product'
 *   },
 * });
 */
export function useCreateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateProductMutation,
    ICreateProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateProductMutation,
    ICreateProductMutationVariables
  >(CreateProductDocument, options);
}
export type CreateProductMutationHookResult = ReturnType<
  typeof useCreateProductMutation
>;
export type CreateProductMutationResult =
  Apollo.MutationResult<ICreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<
  ICreateProductMutation,
  ICreateProductMutationVariables
>;
export const CreateProductBundleItemDocument = gql`
  mutation CreateProductBundleItem(
    $productId: ID!
    $item: CreateProductBundleItemInput!
  ) {
    createProductBundleItem(productId: $productId, item: $item) {
      _id
    }
  }
`;
export type ICreateProductBundleItemMutationFn = Apollo.MutationFunction<
  ICreateProductBundleItemMutation,
  ICreateProductBundleItemMutationVariables
>;

/**
 * __useCreateProductBundleItemMutation__
 *
 * To run a mutation, you first call `useCreateProductBundleItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductBundleItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductBundleItemMutation, { data, loading, error }] = useCreateProductBundleItemMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      item: // value for 'item'
 *   },
 * });
 */
export function useCreateProductBundleItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateProductBundleItemMutation,
    ICreateProductBundleItemMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateProductBundleItemMutation,
    ICreateProductBundleItemMutationVariables
  >(CreateProductBundleItemDocument, options);
}
export type CreateProductBundleItemMutationHookResult = ReturnType<
  typeof useCreateProductBundleItemMutation
>;
export type CreateProductBundleItemMutationResult =
  Apollo.MutationResult<ICreateProductBundleItemMutation>;
export type CreateProductBundleItemMutationOptions = Apollo.BaseMutationOptions<
  ICreateProductBundleItemMutation,
  ICreateProductBundleItemMutationVariables
>;
export const CreateProductVariationDocument = gql`
  mutation CreateProductVariation(
    $productId: ID!
    $variation: CreateProductVariationInput!
  ) {
    createProductVariation(productId: $productId, variation: $variation) {
      _id
    }
  }
`;
export type ICreateProductVariationMutationFn = Apollo.MutationFunction<
  ICreateProductVariationMutation,
  ICreateProductVariationMutationVariables
>;

/**
 * __useCreateProductVariationMutation__
 *
 * To run a mutation, you first call `useCreateProductVariationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductVariationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductVariationMutation, { data, loading, error }] = useCreateProductVariationMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      variation: // value for 'variation'
 *   },
 * });
 */
export function useCreateProductVariationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateProductVariationMutation,
    ICreateProductVariationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateProductVariationMutation,
    ICreateProductVariationMutationVariables
  >(CreateProductVariationDocument, options);
}
export type CreateProductVariationMutationHookResult = ReturnType<
  typeof useCreateProductVariationMutation
>;
export type CreateProductVariationMutationResult =
  Apollo.MutationResult<ICreateProductVariationMutation>;
export type CreateProductVariationMutationOptions = Apollo.BaseMutationOptions<
  ICreateProductVariationMutation,
  ICreateProductVariationMutationVariables
>;
export const CreateProductVariationOptionDocument = gql`
  mutation CreateProductVariationOption(
    $productVariationId: ID!
    $option: CreateProductVariationOptionInput!
  ) {
    createProductVariationOption(
      productVariationId: $productVariationId
      option: $option
    ) {
      _id
    }
  }
`;
export type ICreateProductVariationOptionMutationFn = Apollo.MutationFunction<
  ICreateProductVariationOptionMutation,
  ICreateProductVariationOptionMutationVariables
>;

/**
 * __useCreateProductVariationOptionMutation__
 *
 * To run a mutation, you first call `useCreateProductVariationOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductVariationOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductVariationOptionMutation, { data, loading, error }] = useCreateProductVariationOptionMutation({
 *   variables: {
 *      productVariationId: // value for 'productVariationId'
 *      option: // value for 'option'
 *   },
 * });
 */
export function useCreateProductVariationOptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateProductVariationOptionMutation,
    ICreateProductVariationOptionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateProductVariationOptionMutation,
    ICreateProductVariationOptionMutationVariables
  >(CreateProductVariationOptionDocument, options);
}
export type CreateProductVariationOptionMutationHookResult = ReturnType<
  typeof useCreateProductVariationOptionMutation
>;
export type CreateProductVariationOptionMutationResult =
  Apollo.MutationResult<ICreateProductVariationOptionMutation>;
export type CreateProductVariationOptionMutationOptions =
  Apollo.BaseMutationOptions<
    ICreateProductVariationOptionMutation,
    ICreateProductVariationOptionMutationVariables
  >;
export const ExportTokenDocument = gql`
  mutation ExportToken(
    $tokenId: ID!
    $quantity: Int! = 1
    $recipientWalletAddress: String!
  ) {
    exportToken(
      tokenId: $tokenId
      quantity: $quantity
      recipientWalletAddress: $recipientWalletAddress
    ) {
      ...TokenFragment
    }
  }
  ${TokenFragmentFragmentDoc}
`;
export type IExportTokenMutationFn = Apollo.MutationFunction<
  IExportTokenMutation,
  IExportTokenMutationVariables
>;

/**
 * __useExportTokenMutation__
 *
 * To run a mutation, you first call `useExportTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExportTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exportTokenMutation, { data, loading, error }] = useExportTokenMutation({
 *   variables: {
 *      tokenId: // value for 'tokenId'
 *      quantity: // value for 'quantity'
 *      recipientWalletAddress: // value for 'recipientWalletAddress'
 *   },
 * });
 */
export function useExportTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IExportTokenMutation,
    IExportTokenMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IExportTokenMutation,
    IExportTokenMutationVariables
  >(ExportTokenDocument, options);
}
export type ExportTokenMutationHookResult = ReturnType<
  typeof useExportTokenMutation
>;
export type ExportTokenMutationResult =
  Apollo.MutationResult<IExportTokenMutation>;
export type ExportTokenMutationOptions = Apollo.BaseMutationOptions<
  IExportTokenMutation,
  IExportTokenMutationVariables
>;
export const ProductDocument = gql`
  query Product($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      ...ProductDetailFragment
      ... on SimpleProduct {
        texts {
          _id
          title
          subtitle
          description
        }
      }
      ... on ConfigurableProduct {
        texts {
          _id
          title
          subtitle
          description
        }
      }
      ... on PlanProduct {
        texts {
          _id
          title
          subtitle
          description
        }
      }
      ... on BundleProduct {
        texts {
          _id
          title
          subtitle
          description
        }
      }
    }
  }
  ${ProductDetailFragmentFragmentDoc}
`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useProductQuery(
  baseOptions?: Apollo.QueryHookOptions<IProductQuery, IProductQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IProductQuery, IProductQueryVariables>(
    ProductDocument,
    options,
  );
}
export function useProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductQuery,
    IProductQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IProductQuery, IProductQueryVariables>(
    ProductDocument,
    options,
  );
}
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<
  IProductQuery,
  IProductQueryVariables
>;
export const ProductAssignmentsDocument = gql`
  query ProductAssignments($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      ... on ConfigurableProduct {
        texts {
          _id
          subtitle
          slug
          title
        }
        variations {
          _id
          key
          texts {
            _id
            title
          }
          options {
            _id
            value
            texts {
              _id
              title
            }
          }
        }
        assignments(includeInactive: true) {
          ...ProductAssignmentFragment
        }
      }
    }
  }
  ${ProductAssignmentFragmentFragmentDoc}
`;

/**
 * __useProductAssignmentsQuery__
 *
 * To run a query within a React component, call `useProductAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductAssignmentsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useProductAssignmentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProductAssignmentsQuery,
    IProductAssignmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IProductAssignmentsQuery,
    IProductAssignmentsQueryVariables
  >(ProductAssignmentsDocument, options);
}
export function useProductAssignmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductAssignmentsQuery,
    IProductAssignmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IProductAssignmentsQuery,
    IProductAssignmentsQueryVariables
  >(ProductAssignmentsDocument, options);
}
export type ProductAssignmentsQueryHookResult = ReturnType<
  typeof useProductAssignmentsQuery
>;
export type ProductAssignmentsLazyQueryHookResult = ReturnType<
  typeof useProductAssignmentsLazyQuery
>;
export type ProductAssignmentsQueryResult = Apollo.QueryResult<
  IProductAssignmentsQuery,
  IProductAssignmentsQueryVariables
>;
export const ProductBundleItemsDocument = gql`
  query ProductBundleItems($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      ... on BundleProduct {
        bundleItems {
          product {
            ...ProductBriefFragment
          }
          quantity
        }
      }
    }
  }
  ${ProductBriefFragmentFragmentDoc}
`;

/**
 * __useProductBundleItemsQuery__
 *
 * To run a query within a React component, call `useProductBundleItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductBundleItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductBundleItemsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useProductBundleItemsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProductBundleItemsQuery,
    IProductBundleItemsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IProductBundleItemsQuery,
    IProductBundleItemsQueryVariables
  >(ProductBundleItemsDocument, options);
}
export function useProductBundleItemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductBundleItemsQuery,
    IProductBundleItemsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IProductBundleItemsQuery,
    IProductBundleItemsQueryVariables
  >(ProductBundleItemsDocument, options);
}
export type ProductBundleItemsQueryHookResult = ReturnType<
  typeof useProductBundleItemsQuery
>;
export type ProductBundleItemsLazyQueryHookResult = ReturnType<
  typeof useProductBundleItemsLazyQuery
>;
export type ProductBundleItemsQueryResult = Apollo.QueryResult<
  IProductBundleItemsQuery,
  IProductBundleItemsQueryVariables
>;
export const ProductCatalogPricesDocument = gql`
  query ProductCatalogPrices($productId: ID!) {
    productCatalogPrices(productId: $productId) {
      ...ProductCatalogPriceFragment
    }
  }
  ${ProductCatalogPriceFragmentFragmentDoc}
`;

/**
 * __useProductCatalogPricesQuery__
 *
 * To run a query within a React component, call `useProductCatalogPricesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductCatalogPricesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductCatalogPricesQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useProductCatalogPricesQuery(
  baseOptions: Apollo.QueryHookOptions<
    IProductCatalogPricesQuery,
    IProductCatalogPricesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IProductCatalogPricesQuery,
    IProductCatalogPricesQueryVariables
  >(ProductCatalogPricesDocument, options);
}
export function useProductCatalogPricesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductCatalogPricesQuery,
    IProductCatalogPricesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IProductCatalogPricesQuery,
    IProductCatalogPricesQueryVariables
  >(ProductCatalogPricesDocument, options);
}
export type ProductCatalogPricesQueryHookResult = ReturnType<
  typeof useProductCatalogPricesQuery
>;
export type ProductCatalogPricesLazyQueryHookResult = ReturnType<
  typeof useProductCatalogPricesLazyQuery
>;
export type ProductCatalogPricesQueryResult = Apollo.QueryResult<
  IProductCatalogPricesQuery,
  IProductCatalogPricesQueryVariables
>;
export const ProductDimensionUnitsDocument = gql`
  query ProductDimensionUnits {
    massUnits: __type(name: "MassUnit") {
      options: enumValues {
        value: name
        label: description
      }
    }
    lengthUnits: __type(name: "LengthUnit") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

/**
 * __useProductDimensionUnitsQuery__
 *
 * To run a query within a React component, call `useProductDimensionUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductDimensionUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductDimensionUnitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductDimensionUnitsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProductDimensionUnitsQuery,
    IProductDimensionUnitsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IProductDimensionUnitsQuery,
    IProductDimensionUnitsQueryVariables
  >(ProductDimensionUnitsDocument, options);
}
export function useProductDimensionUnitsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductDimensionUnitsQuery,
    IProductDimensionUnitsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IProductDimensionUnitsQuery,
    IProductDimensionUnitsQueryVariables
  >(ProductDimensionUnitsDocument, options);
}
export type ProductDimensionUnitsQueryHookResult = ReturnType<
  typeof useProductDimensionUnitsQuery
>;
export type ProductDimensionUnitsLazyQueryHookResult = ReturnType<
  typeof useProductDimensionUnitsLazyQuery
>;
export type ProductDimensionUnitsQueryResult = Apollo.QueryResult<
  IProductDimensionUnitsQuery,
  IProductDimensionUnitsQueryVariables
>;
export const ProductMediaDocument = gql`
  query ProductMedia($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      media {
        ...ProductMediaFragment
      }
    }
  }
  ${ProductMediaFragmentFragmentDoc}
`;

/**
 * __useProductMediaQuery__
 *
 * To run a query within a React component, call `useProductMediaQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductMediaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductMediaQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useProductMediaQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProductMediaQuery,
    IProductMediaQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IProductMediaQuery, IProductMediaQueryVariables>(
    ProductMediaDocument,
    options,
  );
}
export function useProductMediaLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductMediaQuery,
    IProductMediaQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IProductMediaQuery, IProductMediaQueryVariables>(
    ProductMediaDocument,
    options,
  );
}
export type ProductMediaQueryHookResult = ReturnType<
  typeof useProductMediaQuery
>;
export type ProductMediaLazyQueryHookResult = ReturnType<
  typeof useProductMediaLazyQuery
>;
export type ProductMediaQueryResult = Apollo.QueryResult<
  IProductMediaQuery,
  IProductMediaQueryVariables
>;
export const ProductPlanDocument = gql`
  query ProductPlan($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      ... on PlanProduct {
        plan {
          ...ProductPlanConfigurationFragment
        }
      }
    }
  }
  ${ProductPlanConfigurationFragmentFragmentDoc}
`;

/**
 * __useProductPlanQuery__
 *
 * To run a query within a React component, call `useProductPlanQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductPlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductPlanQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useProductPlanQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProductPlanQuery,
    IProductPlanQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IProductPlanQuery, IProductPlanQueryVariables>(
    ProductPlanDocument,
    options,
  );
}
export function useProductPlanLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductPlanQuery,
    IProductPlanQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IProductPlanQuery, IProductPlanQueryVariables>(
    ProductPlanDocument,
    options,
  );
}
export type ProductPlanQueryHookResult = ReturnType<typeof useProductPlanQuery>;
export type ProductPlanLazyQueryHookResult = ReturnType<
  typeof useProductPlanLazyQuery
>;
export type ProductPlanQueryResult = Apollo.QueryResult<
  IProductPlanQuery,
  IProductPlanQueryVariables
>;
export const ProductPlanConfigurationOptionsDocument = gql`
  query ProductPlanConfigurationOptions {
    usageCalculationTypes: __type(name: "ProductPlanUsageCalculationType") {
      options: enumValues {
        value: name
        label: description
      }
    }
    configurationIntervals: __type(name: "ProductPlanConfigurationInterval") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

/**
 * __useProductPlanConfigurationOptionsQuery__
 *
 * To run a query within a React component, call `useProductPlanConfigurationOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductPlanConfigurationOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductPlanConfigurationOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductPlanConfigurationOptionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProductPlanConfigurationOptionsQuery,
    IProductPlanConfigurationOptionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IProductPlanConfigurationOptionsQuery,
    IProductPlanConfigurationOptionsQueryVariables
  >(ProductPlanConfigurationOptionsDocument, options);
}
export function useProductPlanConfigurationOptionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductPlanConfigurationOptionsQuery,
    IProductPlanConfigurationOptionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IProductPlanConfigurationOptionsQuery,
    IProductPlanConfigurationOptionsQueryVariables
  >(ProductPlanConfigurationOptionsDocument, options);
}
export type ProductPlanConfigurationOptionsQueryHookResult = ReturnType<
  typeof useProductPlanConfigurationOptionsQuery
>;
export type ProductPlanConfigurationOptionsLazyQueryHookResult = ReturnType<
  typeof useProductPlanConfigurationOptionsLazyQuery
>;
export type ProductPlanConfigurationOptionsQueryResult = Apollo.QueryResult<
  IProductPlanConfigurationOptionsQuery,
  IProductPlanConfigurationOptionsQueryVariables
>;
export const ProductReviewsDocument = gql`
  query ProductReviews(
    $queryString: String
    $limit: Int
    $offset: Int
    $sort: [SortOptionInput!]
  ) {
    productReviews(
      queryString: $queryString
      limit: $limit
      offset: $offset
      sort: $sort
    ) {
      ...ProductReviewDetailFragment
    }
  }
  ${ProductReviewDetailFragmentFragmentDoc}
`;

/**
 * __useProductReviewsQuery__
 *
 * To run a query within a React component, call `useProductReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductReviewsQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useProductReviewsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProductReviewsQuery,
    IProductReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IProductReviewsQuery, IProductReviewsQueryVariables>(
    ProductReviewsDocument,
    options,
  );
}
export function useProductReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductReviewsQuery,
    IProductReviewsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IProductReviewsQuery,
    IProductReviewsQueryVariables
  >(ProductReviewsDocument, options);
}
export type ProductReviewsQueryHookResult = ReturnType<
  typeof useProductReviewsQuery
>;
export type ProductReviewsLazyQueryHookResult = ReturnType<
  typeof useProductReviewsLazyQuery
>;
export type ProductReviewsQueryResult = Apollo.QueryResult<
  IProductReviewsQuery,
  IProductReviewsQueryVariables
>;
export const ProductSupplyDocument = gql`
  query ProductSupply($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      ... on SimpleProduct {
        dimensions {
          ...ProductDimensionFragment
        }
      }
    }
  }
  ${ProductDimensionFragmentFragmentDoc}
`;

/**
 * __useProductSupplyQuery__
 *
 * To run a query within a React component, call `useProductSupplyQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductSupplyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductSupplyQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useProductSupplyQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProductSupplyQuery,
    IProductSupplyQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IProductSupplyQuery, IProductSupplyQueryVariables>(
    ProductSupplyDocument,
    options,
  );
}
export function useProductSupplyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductSupplyQuery,
    IProductSupplyQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IProductSupplyQuery, IProductSupplyQueryVariables>(
    ProductSupplyDocument,
    options,
  );
}
export type ProductSupplyQueryHookResult = ReturnType<
  typeof useProductSupplyQuery
>;
export type ProductSupplyLazyQueryHookResult = ReturnType<
  typeof useProductSupplyLazyQuery
>;
export type ProductSupplyQueryResult = Apollo.QueryResult<
  IProductSupplyQuery,
  IProductSupplyQueryVariables
>;
export const ProductTokenizationDocument = gql`
  query ProductTokenization($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      ... on TokenizedProduct {
        contractConfiguration {
          tokenId
          supply
        }
        contractStandard
        contractAddress
      }
    }
  }
`;

/**
 * __useProductTokenizationQuery__
 *
 * To run a query within a React component, call `useProductTokenizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductTokenizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductTokenizationQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useProductTokenizationQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProductTokenizationQuery,
    IProductTokenizationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IProductTokenizationQuery,
    IProductTokenizationQueryVariables
  >(ProductTokenizationDocument, options);
}
export function useProductTokenizationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductTokenizationQuery,
    IProductTokenizationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IProductTokenizationQuery,
    IProductTokenizationQueryVariables
  >(ProductTokenizationDocument, options);
}
export type ProductTokenizationQueryHookResult = ReturnType<
  typeof useProductTokenizationQuery
>;
export type ProductTokenizationLazyQueryHookResult = ReturnType<
  typeof useProductTokenizationLazyQuery
>;
export type ProductTokenizationQueryResult = Apollo.QueryResult<
  IProductTokenizationQuery,
  IProductTokenizationQueryVariables
>;
export const ProductVariationTypeDocument = gql`
  query ProductVariationType {
    variationTypes: __type(name: "ProductVariationType") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

/**
 * __useProductVariationTypeQuery__
 *
 * To run a query within a React component, call `useProductVariationTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductVariationTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductVariationTypeQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductVariationTypeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProductVariationTypeQuery,
    IProductVariationTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IProductVariationTypeQuery,
    IProductVariationTypeQueryVariables
  >(ProductVariationTypeDocument, options);
}
export function useProductVariationTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductVariationTypeQuery,
    IProductVariationTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IProductVariationTypeQuery,
    IProductVariationTypeQueryVariables
  >(ProductVariationTypeDocument, options);
}
export type ProductVariationTypeQueryHookResult = ReturnType<
  typeof useProductVariationTypeQuery
>;
export type ProductVariationTypeLazyQueryHookResult = ReturnType<
  typeof useProductVariationTypeLazyQuery
>;
export type ProductVariationTypeQueryResult = Apollo.QueryResult<
  IProductVariationTypeQuery,
  IProductVariationTypeQueryVariables
>;
export const ProductVariationsDocument = gql`
  query ProductVariations($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      ... on ConfigurableProduct {
        variations {
          ...ProductVariationFragment
        }
      }
    }
  }
  ${ProductVariationFragmentFragmentDoc}
`;

/**
 * __useProductVariationsQuery__
 *
 * To run a query within a React component, call `useProductVariationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductVariationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductVariationsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useProductVariationsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProductVariationsQuery,
    IProductVariationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IProductVariationsQuery,
    IProductVariationsQueryVariables
  >(ProductVariationsDocument, options);
}
export function useProductVariationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductVariationsQuery,
    IProductVariationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IProductVariationsQuery,
    IProductVariationsQueryVariables
  >(ProductVariationsDocument, options);
}
export type ProductVariationsQueryHookResult = ReturnType<
  typeof useProductVariationsQuery
>;
export type ProductVariationsLazyQueryHookResult = ReturnType<
  typeof useProductVariationsLazyQuery
>;
export type ProductVariationsQueryResult = Apollo.QueryResult<
  IProductVariationsQuery,
  IProductVariationsQueryVariables
>;
export const ProductWarehousingDocument = gql`
  query ProductWarehousing($productId: ID, $slug: String) {
    product(productId: $productId, slug: $slug) {
      _id
      ... on SimpleProduct {
        sku
        baseUnit
      }
    }
  }
`;

/**
 * __useProductWarehousingQuery__
 *
 * To run a query within a React component, call `useProductWarehousingQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductWarehousingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductWarehousingQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useProductWarehousingQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProductWarehousingQuery,
    IProductWarehousingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IProductWarehousingQuery,
    IProductWarehousingQueryVariables
  >(ProductWarehousingDocument, options);
}
export function useProductWarehousingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductWarehousingQuery,
    IProductWarehousingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IProductWarehousingQuery,
    IProductWarehousingQueryVariables
  >(ProductWarehousingDocument, options);
}
export type ProductWarehousingQueryHookResult = ReturnType<
  typeof useProductWarehousingQuery
>;
export type ProductWarehousingLazyQueryHookResult = ReturnType<
  typeof useProductWarehousingLazyQuery
>;
export type ProductWarehousingQueryResult = Apollo.QueryResult<
  IProductWarehousingQuery,
  IProductWarehousingQueryVariables
>;
export const ProductsDocument = gql`
  query Products(
    $queryString: String
    $tags: [LowerCaseString!]
    $slugs: [String!]
    $limit: Int
    $offset: Int
    $includeDrafts: Boolean
    $sort: [SortOptionInput!]
  ) {
    products(
      queryString: $queryString
      tags: $tags
      slugs: $slugs
      limit: $limit
      offset: $offset
      includeDrafts: $includeDrafts
      sort: $sort
    ) {
      ...ProductBriefFragment
    }
    productsCount(
      tags: $tags
      slugs: $slugs
      includeDrafts: $includeDrafts
      queryString: $queryString
    )
  }
  ${ProductBriefFragmentFragmentDoc}
`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *      tags: // value for 'tags'
 *      slugs: // value for 'slugs'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      includeDrafts: // value for 'includeDrafts'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProductsQuery,
    IProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IProductsQuery, IProductsQueryVariables>(
    ProductsDocument,
    options,
  );
}
export function useProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductsQuery,
    IProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IProductsQuery, IProductsQueryVariables>(
    ProductsDocument,
    options,
  );
}
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<
  typeof useProductsLazyQuery
>;
export type ProductsQueryResult = Apollo.QueryResult<
  IProductsQuery,
  IProductsQueryVariables
>;
export const ProductsCountDocument = gql`
  query ProductsCount {
    productsCount
  }
`;

/**
 * __useProductsCountQuery__
 *
 * To run a query within a React component, call `useProductsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IProductsCountQuery,
    IProductsCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IProductsCountQuery, IProductsCountQueryVariables>(
    ProductsCountDocument,
    options,
  );
}
export function useProductsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IProductsCountQuery,
    IProductsCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IProductsCountQuery, IProductsCountQueryVariables>(
    ProductsCountDocument,
    options,
  );
}
export type ProductsCountQueryHookResult = ReturnType<
  typeof useProductsCountQuery
>;
export type ProductsCountLazyQueryHookResult = ReturnType<
  typeof useProductsCountLazyQuery
>;
export type ProductsCountQueryResult = Apollo.QueryResult<
  IProductsCountQuery,
  IProductsCountQueryVariables
>;
export const PublishProductDocument = gql`
  mutation PublishProduct($productId: ID!) {
    publishProduct(productId: $productId) {
      ...ProductDetailFragment
    }
  }
  ${ProductDetailFragmentFragmentDoc}
`;
export type IPublishProductMutationFn = Apollo.MutationFunction<
  IPublishProductMutation,
  IPublishProductMutationVariables
>;

/**
 * __usePublishProductMutation__
 *
 * To run a mutation, you first call `usePublishProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishProductMutation, { data, loading, error }] = usePublishProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function usePublishProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IPublishProductMutation,
    IPublishProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IPublishProductMutation,
    IPublishProductMutationVariables
  >(PublishProductDocument, options);
}
export type PublishProductMutationHookResult = ReturnType<
  typeof usePublishProductMutation
>;
export type PublishProductMutationResult =
  Apollo.MutationResult<IPublishProductMutation>;
export type PublishProductMutationOptions = Apollo.BaseMutationOptions<
  IPublishProductMutation,
  IPublishProductMutationVariables
>;
export const ReOrderProductMediaDocument = gql`
  mutation ReOrderProductMedia($sortKeys: [ReorderProductMediaInput!]!) {
    reorderProductMedia(sortKeys: $sortKeys) {
      _id
    }
  }
`;
export type IReOrderProductMediaMutationFn = Apollo.MutationFunction<
  IReOrderProductMediaMutation,
  IReOrderProductMediaMutationVariables
>;

/**
 * __useReOrderProductMediaMutation__
 *
 * To run a mutation, you first call `useReOrderProductMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReOrderProductMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reOrderProductMediaMutation, { data, loading, error }] = useReOrderProductMediaMutation({
 *   variables: {
 *      sortKeys: // value for 'sortKeys'
 *   },
 * });
 */
export function useReOrderProductMediaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IReOrderProductMediaMutation,
    IReOrderProductMediaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IReOrderProductMediaMutation,
    IReOrderProductMediaMutationVariables
  >(ReOrderProductMediaDocument, options);
}
export type ReOrderProductMediaMutationHookResult = ReturnType<
  typeof useReOrderProductMediaMutation
>;
export type ReOrderProductMediaMutationResult =
  Apollo.MutationResult<IReOrderProductMediaMutation>;
export type ReOrderProductMediaMutationOptions = Apollo.BaseMutationOptions<
  IReOrderProductMediaMutation,
  IReOrderProductMediaMutationVariables
>;
export const RemoveBundleItemDocument = gql`
  mutation RemoveBundleItem($productId: ID!, $index: Int!) {
    removeBundleItem(productId: $productId, index: $index) {
      _id
    }
  }
`;
export type IRemoveBundleItemMutationFn = Apollo.MutationFunction<
  IRemoveBundleItemMutation,
  IRemoveBundleItemMutationVariables
>;

/**
 * __useRemoveBundleItemMutation__
 *
 * To run a mutation, you first call `useRemoveBundleItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBundleItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBundleItemMutation, { data, loading, error }] = useRemoveBundleItemMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      index: // value for 'index'
 *   },
 * });
 */
export function useRemoveBundleItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveBundleItemMutation,
    IRemoveBundleItemMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveBundleItemMutation,
    IRemoveBundleItemMutationVariables
  >(RemoveBundleItemDocument, options);
}
export type RemoveBundleItemMutationHookResult = ReturnType<
  typeof useRemoveBundleItemMutation
>;
export type RemoveBundleItemMutationResult =
  Apollo.MutationResult<IRemoveBundleItemMutation>;
export type RemoveBundleItemMutationOptions = Apollo.BaseMutationOptions<
  IRemoveBundleItemMutation,
  IRemoveBundleItemMutationVariables
>;
export const RemoveProductDocument = gql`
  mutation RemoveProduct($productId: ID!) {
    removeProduct(productId: $productId) {
      _id
    }
  }
`;
export type IRemoveProductMutationFn = Apollo.MutationFunction<
  IRemoveProductMutation,
  IRemoveProductMutationVariables
>;

/**
 * __useRemoveProductMutation__
 *
 * To run a mutation, you first call `useRemoveProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductMutation, { data, loading, error }] = useRemoveProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useRemoveProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveProductMutation,
    IRemoveProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveProductMutation,
    IRemoveProductMutationVariables
  >(RemoveProductDocument, options);
}
export type RemoveProductMutationHookResult = ReturnType<
  typeof useRemoveProductMutation
>;
export type RemoveProductMutationResult =
  Apollo.MutationResult<IRemoveProductMutation>;
export type RemoveProductMutationOptions = Apollo.BaseMutationOptions<
  IRemoveProductMutation,
  IRemoveProductMutationVariables
>;
export const RemoveProductAssignmentDocument = gql`
  mutation RemoveProductAssignment(
    $proxyId: ID!
    $vectors: [ProductAssignmentVectorInput!]!
  ) {
    removeProductAssignment(proxyId: $proxyId, vectors: $vectors) {
      _id
    }
  }
`;
export type IRemoveProductAssignmentMutationFn = Apollo.MutationFunction<
  IRemoveProductAssignmentMutation,
  IRemoveProductAssignmentMutationVariables
>;

/**
 * __useRemoveProductAssignmentMutation__
 *
 * To run a mutation, you first call `useRemoveProductAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductAssignmentMutation, { data, loading, error }] = useRemoveProductAssignmentMutation({
 *   variables: {
 *      proxyId: // value for 'proxyId'
 *      vectors: // value for 'vectors'
 *   },
 * });
 */
export function useRemoveProductAssignmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveProductAssignmentMutation,
    IRemoveProductAssignmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveProductAssignmentMutation,
    IRemoveProductAssignmentMutationVariables
  >(RemoveProductAssignmentDocument, options);
}
export type RemoveProductAssignmentMutationHookResult = ReturnType<
  typeof useRemoveProductAssignmentMutation
>;
export type RemoveProductAssignmentMutationResult =
  Apollo.MutationResult<IRemoveProductAssignmentMutation>;
export type RemoveProductAssignmentMutationOptions = Apollo.BaseMutationOptions<
  IRemoveProductAssignmentMutation,
  IRemoveProductAssignmentMutationVariables
>;
export const RemoveProductMediaDocument = gql`
  mutation RemoveProductMedia($productMediaId: ID!) {
    removeProductMedia(productMediaId: $productMediaId) {
      _id
    }
  }
`;
export type IRemoveProductMediaMutationFn = Apollo.MutationFunction<
  IRemoveProductMediaMutation,
  IRemoveProductMediaMutationVariables
>;

/**
 * __useRemoveProductMediaMutation__
 *
 * To run a mutation, you first call `useRemoveProductMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductMediaMutation, { data, loading, error }] = useRemoveProductMediaMutation({
 *   variables: {
 *      productMediaId: // value for 'productMediaId'
 *   },
 * });
 */
export function useRemoveProductMediaMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveProductMediaMutation,
    IRemoveProductMediaMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveProductMediaMutation,
    IRemoveProductMediaMutationVariables
  >(RemoveProductMediaDocument, options);
}
export type RemoveProductMediaMutationHookResult = ReturnType<
  typeof useRemoveProductMediaMutation
>;
export type RemoveProductMediaMutationResult =
  Apollo.MutationResult<IRemoveProductMediaMutation>;
export type RemoveProductMediaMutationOptions = Apollo.BaseMutationOptions<
  IRemoveProductMediaMutation,
  IRemoveProductMediaMutationVariables
>;
export const RemoveProductVariationDocument = gql`
  mutation RemoveProductVariation($productVariationId: ID!) {
    removeProductVariation(productVariationId: $productVariationId) {
      _id
    }
  }
`;
export type IRemoveProductVariationMutationFn = Apollo.MutationFunction<
  IRemoveProductVariationMutation,
  IRemoveProductVariationMutationVariables
>;

/**
 * __useRemoveProductVariationMutation__
 *
 * To run a mutation, you first call `useRemoveProductVariationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductVariationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductVariationMutation, { data, loading, error }] = useRemoveProductVariationMutation({
 *   variables: {
 *      productVariationId: // value for 'productVariationId'
 *   },
 * });
 */
export function useRemoveProductVariationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveProductVariationMutation,
    IRemoveProductVariationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveProductVariationMutation,
    IRemoveProductVariationMutationVariables
  >(RemoveProductVariationDocument, options);
}
export type RemoveProductVariationMutationHookResult = ReturnType<
  typeof useRemoveProductVariationMutation
>;
export type RemoveProductVariationMutationResult =
  Apollo.MutationResult<IRemoveProductVariationMutation>;
export type RemoveProductVariationMutationOptions = Apollo.BaseMutationOptions<
  IRemoveProductVariationMutation,
  IRemoveProductVariationMutationVariables
>;
export const RemoveProductVariationOptionDocument = gql`
  mutation RemoveProductVariationOption(
    $productVariationId: ID!
    $productVariationOptionValue: String!
  ) {
    removeProductVariationOption(
      productVariationId: $productVariationId
      productVariationOptionValue: $productVariationOptionValue
    ) {
      _id
    }
  }
`;
export type IRemoveProductVariationOptionMutationFn = Apollo.MutationFunction<
  IRemoveProductVariationOptionMutation,
  IRemoveProductVariationOptionMutationVariables
>;

/**
 * __useRemoveProductVariationOptionMutation__
 *
 * To run a mutation, you first call `useRemoveProductVariationOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductVariationOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductVariationOptionMutation, { data, loading, error }] = useRemoveProductVariationOptionMutation({
 *   variables: {
 *      productVariationId: // value for 'productVariationId'
 *      productVariationOptionValue: // value for 'productVariationOptionValue'
 *   },
 * });
 */
export function useRemoveProductVariationOptionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveProductVariationOptionMutation,
    IRemoveProductVariationOptionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveProductVariationOptionMutation,
    IRemoveProductVariationOptionMutationVariables
  >(RemoveProductVariationOptionDocument, options);
}
export type RemoveProductVariationOptionMutationHookResult = ReturnType<
  typeof useRemoveProductVariationOptionMutation
>;
export type RemoveProductVariationOptionMutationResult =
  Apollo.MutationResult<IRemoveProductVariationOptionMutation>;
export type RemoveProductVariationOptionMutationOptions =
  Apollo.BaseMutationOptions<
    IRemoveProductVariationOptionMutation,
    IRemoveProductVariationOptionMutationVariables
  >;
export const SearchProductsDocument = gql`
  query SearchProducts(
    $queryString: String
    $filterQuery: [FilterQueryInput!]
    $assortmentId: ID
    $orderBy: SearchOrderBy
    $includeInactive: Boolean
    $ignoreChildAssortments: Boolean
    $limit: Int
    $offset: Int
  ) {
    searchProducts(
      queryString: $queryString
      filterQuery: $filterQuery
      assortmentId: $assortmentId
      orderBy: $orderBy
      includeInactive: $includeInactive
      ignoreChildAssortments: $ignoreChildAssortments
    ) {
      productsCount
      filteredProductsCount
      products(limit: $limit, offset: $offset) {
        ...ProductBriefFragment
      }
    }
  }
  ${ProductBriefFragmentFragmentDoc}
`;

/**
 * __useSearchProductsQuery__
 *
 * To run a query within a React component, call `useSearchProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProductsQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *      filterQuery: // value for 'filterQuery'
 *      assortmentId: // value for 'assortmentId'
 *      orderBy: // value for 'orderBy'
 *      includeInactive: // value for 'includeInactive'
 *      ignoreChildAssortments: // value for 'ignoreChildAssortments'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSearchProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ISearchProductsQuery,
    ISearchProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ISearchProductsQuery, ISearchProductsQueryVariables>(
    SearchProductsDocument,
    options,
  );
}
export function useSearchProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ISearchProductsQuery,
    ISearchProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ISearchProductsQuery,
    ISearchProductsQueryVariables
  >(SearchProductsDocument, options);
}
export type SearchProductsQueryHookResult = ReturnType<
  typeof useSearchProductsQuery
>;
export type SearchProductsLazyQueryHookResult = ReturnType<
  typeof useSearchProductsLazyQuery
>;
export type SearchProductsQueryResult = Apollo.QueryResult<
  ISearchProductsQuery,
  ISearchProductsQueryVariables
>;
export const SmartContractStandardsDocument = gql`
  query SmartContractStandards {
    smartContractStandards: __type(name: "SmartContractStandard") {
      options: enumValues {
        value: name
        label: name
      }
    }
  }
`;

/**
 * __useSmartContractStandardsQuery__
 *
 * To run a query within a React component, call `useSmartContractStandardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSmartContractStandardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSmartContractStandardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSmartContractStandardsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ISmartContractStandardsQuery,
    ISmartContractStandardsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ISmartContractStandardsQuery,
    ISmartContractStandardsQueryVariables
  >(SmartContractStandardsDocument, options);
}
export function useSmartContractStandardsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ISmartContractStandardsQuery,
    ISmartContractStandardsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ISmartContractStandardsQuery,
    ISmartContractStandardsQueryVariables
  >(SmartContractStandardsDocument, options);
}
export type SmartContractStandardsQueryHookResult = ReturnType<
  typeof useSmartContractStandardsQuery
>;
export type SmartContractStandardsLazyQueryHookResult = ReturnType<
  typeof useSmartContractStandardsLazyQuery
>;
export type SmartContractStandardsQueryResult = Apollo.QueryResult<
  ISmartContractStandardsQuery,
  ISmartContractStandardsQueryVariables
>;
export const TranslatedProductMediaTextsDocument = gql`
  query TranslatedProductMediaTexts($productMediaId: ID!) {
    translatedProductMediaTexts(productMediaId: $productMediaId) {
      ...ProductMediaTextsFragment
    }
  }
  ${ProductMediaTextsFragmentFragmentDoc}
`;

/**
 * __useTranslatedProductMediaTextsQuery__
 *
 * To run a query within a React component, call `useTranslatedProductMediaTextsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTranslatedProductMediaTextsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranslatedProductMediaTextsQuery({
 *   variables: {
 *      productMediaId: // value for 'productMediaId'
 *   },
 * });
 */
export function useTranslatedProductMediaTextsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ITranslatedProductMediaTextsQuery,
    ITranslatedProductMediaTextsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ITranslatedProductMediaTextsQuery,
    ITranslatedProductMediaTextsQueryVariables
  >(TranslatedProductMediaTextsDocument, options);
}
export function useTranslatedProductMediaTextsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ITranslatedProductMediaTextsQuery,
    ITranslatedProductMediaTextsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ITranslatedProductMediaTextsQuery,
    ITranslatedProductMediaTextsQueryVariables
  >(TranslatedProductMediaTextsDocument, options);
}
export type TranslatedProductMediaTextsQueryHookResult = ReturnType<
  typeof useTranslatedProductMediaTextsQuery
>;
export type TranslatedProductMediaTextsLazyQueryHookResult = ReturnType<
  typeof useTranslatedProductMediaTextsLazyQuery
>;
export type TranslatedProductMediaTextsQueryResult = Apollo.QueryResult<
  ITranslatedProductMediaTextsQuery,
  ITranslatedProductMediaTextsQueryVariables
>;
export const TranslatedProductTextsDocument = gql`
  query TranslatedProductTexts($productId: ID!) {
    translatedProductTexts(productId: $productId) {
      ...ProductTextsFragment
    }
  }
  ${ProductTextsFragmentFragmentDoc}
`;

/**
 * __useTranslatedProductTextsQuery__
 *
 * To run a query within a React component, call `useTranslatedProductTextsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTranslatedProductTextsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranslatedProductTextsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useTranslatedProductTextsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ITranslatedProductTextsQuery,
    ITranslatedProductTextsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ITranslatedProductTextsQuery,
    ITranslatedProductTextsQueryVariables
  >(TranslatedProductTextsDocument, options);
}
export function useTranslatedProductTextsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ITranslatedProductTextsQuery,
    ITranslatedProductTextsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ITranslatedProductTextsQuery,
    ITranslatedProductTextsQueryVariables
  >(TranslatedProductTextsDocument, options);
}
export type TranslatedProductTextsQueryHookResult = ReturnType<
  typeof useTranslatedProductTextsQuery
>;
export type TranslatedProductTextsLazyQueryHookResult = ReturnType<
  typeof useTranslatedProductTextsLazyQuery
>;
export type TranslatedProductTextsQueryResult = Apollo.QueryResult<
  ITranslatedProductTextsQuery,
  ITranslatedProductTextsQueryVariables
>;
export const TranslatedProductVariationTextsDocument = gql`
  query translatedProductVariationTexts(
    $productVariationId: ID!
    $productVariationOptionValue: String
  ) {
    translatedProductVariationTexts(
      productVariationId: $productVariationId
      productVariationOptionValue: $productVariationOptionValue
    ) {
      _id
      locale
      title
      subtitle
    }
  }
`;

/**
 * __useTranslatedProductVariationTextsQuery__
 *
 * To run a query within a React component, call `useTranslatedProductVariationTextsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTranslatedProductVariationTextsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTranslatedProductVariationTextsQuery({
 *   variables: {
 *      productVariationId: // value for 'productVariationId'
 *      productVariationOptionValue: // value for 'productVariationOptionValue'
 *   },
 * });
 */
export function useTranslatedProductVariationTextsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ITranslatedProductVariationTextsQuery,
    ITranslatedProductVariationTextsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ITranslatedProductVariationTextsQuery,
    ITranslatedProductVariationTextsQueryVariables
  >(TranslatedProductVariationTextsDocument, options);
}
export function useTranslatedProductVariationTextsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ITranslatedProductVariationTextsQuery,
    ITranslatedProductVariationTextsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ITranslatedProductVariationTextsQuery,
    ITranslatedProductVariationTextsQueryVariables
  >(TranslatedProductVariationTextsDocument, options);
}
export type TranslatedProductVariationTextsQueryHookResult = ReturnType<
  typeof useTranslatedProductVariationTextsQuery
>;
export type TranslatedProductVariationTextsLazyQueryHookResult = ReturnType<
  typeof useTranslatedProductVariationTextsLazyQuery
>;
export type TranslatedProductVariationTextsQueryResult = Apollo.QueryResult<
  ITranslatedProductVariationTextsQuery,
  ITranslatedProductVariationTextsQueryVariables
>;
export const UnpublishProductDocument = gql`
  mutation UnpublishProduct($productId: ID!) {
    unpublishProduct(productId: $productId) {
      ...ProductDetailFragment
    }
  }
  ${ProductDetailFragmentFragmentDoc}
`;
export type IUnpublishProductMutationFn = Apollo.MutationFunction<
  IUnpublishProductMutation,
  IUnpublishProductMutationVariables
>;

/**
 * __useUnpublishProductMutation__
 *
 * To run a mutation, you first call `useUnpublishProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnpublishProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unpublishProductMutation, { data, loading, error }] = useUnpublishProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useUnpublishProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUnpublishProductMutation,
    IUnpublishProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUnpublishProductMutation,
    IUnpublishProductMutationVariables
  >(UnpublishProductDocument, options);
}
export type UnpublishProductMutationHookResult = ReturnType<
  typeof useUnpublishProductMutation
>;
export type UnpublishProductMutationResult =
  Apollo.MutationResult<IUnpublishProductMutation>;
export type UnpublishProductMutationOptions = Apollo.BaseMutationOptions<
  IUnpublishProductMutation,
  IUnpublishProductMutationVariables
>;
export const UpdateProductDocument = gql`
  mutation UpdateProduct($productId: ID!, $product: UpdateProductInput!) {
    updateProduct(productId: $productId, product: $product) {
      ...ProductDetailFragment
    }
  }
  ${ProductDetailFragmentFragmentDoc}
`;
export type IUpdateProductMutationFn = Apollo.MutationFunction<
  IUpdateProductMutation,
  IUpdateProductMutationVariables
>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      product: // value for 'product'
 *   },
 * });
 */
export function useUpdateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateProductMutation,
    IUpdateProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateProductMutation,
    IUpdateProductMutationVariables
  >(UpdateProductDocument, options);
}
export type UpdateProductMutationHookResult = ReturnType<
  typeof useUpdateProductMutation
>;
export type UpdateProductMutationResult =
  Apollo.MutationResult<IUpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<
  IUpdateProductMutation,
  IUpdateProductMutationVariables
>;
export const UpdateProductCommerceDocument = gql`
  mutation UpdateProductCommerce(
    $productId: ID!
    $commerce: UpdateProductCommerceInput!
  ) {
    updateProductCommerce(productId: $productId, commerce: $commerce) {
      ...ProductDetailFragment
    }
  }
  ${ProductDetailFragmentFragmentDoc}
`;
export type IUpdateProductCommerceMutationFn = Apollo.MutationFunction<
  IUpdateProductCommerceMutation,
  IUpdateProductCommerceMutationVariables
>;

/**
 * __useUpdateProductCommerceMutation__
 *
 * To run a mutation, you first call `useUpdateProductCommerceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductCommerceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductCommerceMutation, { data, loading, error }] = useUpdateProductCommerceMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      commerce: // value for 'commerce'
 *   },
 * });
 */
export function useUpdateProductCommerceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateProductCommerceMutation,
    IUpdateProductCommerceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateProductCommerceMutation,
    IUpdateProductCommerceMutationVariables
  >(UpdateProductCommerceDocument, options);
}
export type UpdateProductCommerceMutationHookResult = ReturnType<
  typeof useUpdateProductCommerceMutation
>;
export type UpdateProductCommerceMutationResult =
  Apollo.MutationResult<IUpdateProductCommerceMutation>;
export type UpdateProductCommerceMutationOptions = Apollo.BaseMutationOptions<
  IUpdateProductCommerceMutation,
  IUpdateProductCommerceMutationVariables
>;
export const UpdateProductMediaTextsDocument = gql`
  mutation UpdateProductMediaTexts(
    $productMediaId: ID!
    $texts: [UpdateProductMediaTextInput!]!
  ) {
    updateProductMediaTexts(productMediaId: $productMediaId, texts: $texts) {
      ...ProductMediaTextsFragment
    }
  }
  ${ProductMediaTextsFragmentFragmentDoc}
`;
export type IUpdateProductMediaTextsMutationFn = Apollo.MutationFunction<
  IUpdateProductMediaTextsMutation,
  IUpdateProductMediaTextsMutationVariables
>;

/**
 * __useUpdateProductMediaTextsMutation__
 *
 * To run a mutation, you first call `useUpdateProductMediaTextsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMediaTextsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMediaTextsMutation, { data, loading, error }] = useUpdateProductMediaTextsMutation({
 *   variables: {
 *      productMediaId: // value for 'productMediaId'
 *      texts: // value for 'texts'
 *   },
 * });
 */
export function useUpdateProductMediaTextsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateProductMediaTextsMutation,
    IUpdateProductMediaTextsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateProductMediaTextsMutation,
    IUpdateProductMediaTextsMutationVariables
  >(UpdateProductMediaTextsDocument, options);
}
export type UpdateProductMediaTextsMutationHookResult = ReturnType<
  typeof useUpdateProductMediaTextsMutation
>;
export type UpdateProductMediaTextsMutationResult =
  Apollo.MutationResult<IUpdateProductMediaTextsMutation>;
export type UpdateProductMediaTextsMutationOptions = Apollo.BaseMutationOptions<
  IUpdateProductMediaTextsMutation,
  IUpdateProductMediaTextsMutationVariables
>;
export const UpdateProductPlanDocument = gql`
  mutation UpdateProductPlan($productId: ID!, $plan: UpdateProductPlanInput!) {
    updateProductPlan(productId: $productId, plan: $plan) {
      _id
    }
  }
`;
export type IUpdateProductPlanMutationFn = Apollo.MutationFunction<
  IUpdateProductPlanMutation,
  IUpdateProductPlanMutationVariables
>;

/**
 * __useUpdateProductPlanMutation__
 *
 * To run a mutation, you first call `useUpdateProductPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductPlanMutation, { data, loading, error }] = useUpdateProductPlanMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      plan: // value for 'plan'
 *   },
 * });
 */
export function useUpdateProductPlanMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateProductPlanMutation,
    IUpdateProductPlanMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateProductPlanMutation,
    IUpdateProductPlanMutationVariables
  >(UpdateProductPlanDocument, options);
}
export type UpdateProductPlanMutationHookResult = ReturnType<
  typeof useUpdateProductPlanMutation
>;
export type UpdateProductPlanMutationResult =
  Apollo.MutationResult<IUpdateProductPlanMutation>;
export type UpdateProductPlanMutationOptions = Apollo.BaseMutationOptions<
  IUpdateProductPlanMutation,
  IUpdateProductPlanMutationVariables
>;
export const UpdateProductSupplyDocument = gql`
  mutation UpdateProductSupply(
    $productId: ID!
    $supply: UpdateProductSupplyInput!
  ) {
    updateProductSupply(productId: $productId, supply: $supply) {
      _id
      ... on SimpleProduct {
        dimensions {
          ...ProductDimensionFragment
        }
      }
    }
  }
  ${ProductDimensionFragmentFragmentDoc}
`;
export type IUpdateProductSupplyMutationFn = Apollo.MutationFunction<
  IUpdateProductSupplyMutation,
  IUpdateProductSupplyMutationVariables
>;

/**
 * __useUpdateProductSupplyMutation__
 *
 * To run a mutation, you first call `useUpdateProductSupplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductSupplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductSupplyMutation, { data, loading, error }] = useUpdateProductSupplyMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      supply: // value for 'supply'
 *   },
 * });
 */
export function useUpdateProductSupplyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateProductSupplyMutation,
    IUpdateProductSupplyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateProductSupplyMutation,
    IUpdateProductSupplyMutationVariables
  >(UpdateProductSupplyDocument, options);
}
export type UpdateProductSupplyMutationHookResult = ReturnType<
  typeof useUpdateProductSupplyMutation
>;
export type UpdateProductSupplyMutationResult =
  Apollo.MutationResult<IUpdateProductSupplyMutation>;
export type UpdateProductSupplyMutationOptions = Apollo.BaseMutationOptions<
  IUpdateProductSupplyMutation,
  IUpdateProductSupplyMutationVariables
>;
export const UpdateProductTextsDocument = gql`
  mutation UpdateProductTexts(
    $productId: ID!
    $texts: [UpdateProductTextInput!]!
  ) {
    updateProductTexts(productId: $productId, texts: $texts) {
      ...ProductTextsFragment
    }
  }
  ${ProductTextsFragmentFragmentDoc}
`;
export type IUpdateProductTextsMutationFn = Apollo.MutationFunction<
  IUpdateProductTextsMutation,
  IUpdateProductTextsMutationVariables
>;

/**
 * __useUpdateProductTextsMutation__
 *
 * To run a mutation, you first call `useUpdateProductTextsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductTextsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductTextsMutation, { data, loading, error }] = useUpdateProductTextsMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      texts: // value for 'texts'
 *   },
 * });
 */
export function useUpdateProductTextsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateProductTextsMutation,
    IUpdateProductTextsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateProductTextsMutation,
    IUpdateProductTextsMutationVariables
  >(UpdateProductTextsDocument, options);
}
export type UpdateProductTextsMutationHookResult = ReturnType<
  typeof useUpdateProductTextsMutation
>;
export type UpdateProductTextsMutationResult =
  Apollo.MutationResult<IUpdateProductTextsMutation>;
export type UpdateProductTextsMutationOptions = Apollo.BaseMutationOptions<
  IUpdateProductTextsMutation,
  IUpdateProductTextsMutationVariables
>;
export const UpdateProductTokenizationDocument = gql`
  mutation UpdateProductTokenization(
    $productId: ID!
    $tokenization: UpdateProductTokenizationInput!
  ) {
    updateProductTokenization(
      productId: $productId
      tokenization: $tokenization
    ) {
      _id
    }
  }
`;
export type IUpdateProductTokenizationMutationFn = Apollo.MutationFunction<
  IUpdateProductTokenizationMutation,
  IUpdateProductTokenizationMutationVariables
>;

/**
 * __useUpdateProductTokenizationMutation__
 *
 * To run a mutation, you first call `useUpdateProductTokenizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductTokenizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductTokenizationMutation, { data, loading, error }] = useUpdateProductTokenizationMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      tokenization: // value for 'tokenization'
 *   },
 * });
 */
export function useUpdateProductTokenizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateProductTokenizationMutation,
    IUpdateProductTokenizationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateProductTokenizationMutation,
    IUpdateProductTokenizationMutationVariables
  >(UpdateProductTokenizationDocument, options);
}
export type UpdateProductTokenizationMutationHookResult = ReturnType<
  typeof useUpdateProductTokenizationMutation
>;
export type UpdateProductTokenizationMutationResult =
  Apollo.MutationResult<IUpdateProductTokenizationMutation>;
export type UpdateProductTokenizationMutationOptions =
  Apollo.BaseMutationOptions<
    IUpdateProductTokenizationMutation,
    IUpdateProductTokenizationMutationVariables
  >;
export const UpdateProductVariationTextsDocument = gql`
  mutation UpdateProductVariationTexts(
    $productVariationId: ID!
    $productVariationOptionValue: String
    $texts: [UpdateProductVariationTextInput!]!
  ) {
    updateProductVariationTexts(
      productVariationId: $productVariationId
      productVariationOptionValue: $productVariationOptionValue
      texts: $texts
    ) {
      _id
    }
  }
`;
export type IUpdateProductVariationTextsMutationFn = Apollo.MutationFunction<
  IUpdateProductVariationTextsMutation,
  IUpdateProductVariationTextsMutationVariables
>;

/**
 * __useUpdateProductVariationTextsMutation__
 *
 * To run a mutation, you first call `useUpdateProductVariationTextsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductVariationTextsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductVariationTextsMutation, { data, loading, error }] = useUpdateProductVariationTextsMutation({
 *   variables: {
 *      productVariationId: // value for 'productVariationId'
 *      productVariationOptionValue: // value for 'productVariationOptionValue'
 *      texts: // value for 'texts'
 *   },
 * });
 */
export function useUpdateProductVariationTextsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateProductVariationTextsMutation,
    IUpdateProductVariationTextsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateProductVariationTextsMutation,
    IUpdateProductVariationTextsMutationVariables
  >(UpdateProductVariationTextsDocument, options);
}
export type UpdateProductVariationTextsMutationHookResult = ReturnType<
  typeof useUpdateProductVariationTextsMutation
>;
export type UpdateProductVariationTextsMutationResult =
  Apollo.MutationResult<IUpdateProductVariationTextsMutation>;
export type UpdateProductVariationTextsMutationOptions =
  Apollo.BaseMutationOptions<
    IUpdateProductVariationTextsMutation,
    IUpdateProductVariationTextsMutationVariables
  >;
export const UpdateProductWarehousingDocument = gql`
  mutation UpdateProductWarehousing(
    $productId: ID!
    $warehousing: UpdateProductWarehousingInput!
  ) {
    updateProductWarehousing(productId: $productId, warehousing: $warehousing) {
      _id
      ... on SimpleProduct {
        sku
        baseUnit
      }
    }
  }
`;
export type IUpdateProductWarehousingMutationFn = Apollo.MutationFunction<
  IUpdateProductWarehousingMutation,
  IUpdateProductWarehousingMutationVariables
>;

/**
 * __useUpdateProductWarehousingMutation__
 *
 * To run a mutation, you first call `useUpdateProductWarehousingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductWarehousingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductWarehousingMutation, { data, loading, error }] = useUpdateProductWarehousingMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      warehousing: // value for 'warehousing'
 *   },
 * });
 */
export function useUpdateProductWarehousingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateProductWarehousingMutation,
    IUpdateProductWarehousingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateProductWarehousingMutation,
    IUpdateProductWarehousingMutationVariables
  >(UpdateProductWarehousingDocument, options);
}
export type UpdateProductWarehousingMutationHookResult = ReturnType<
  typeof useUpdateProductWarehousingMutation
>;
export type UpdateProductWarehousingMutationResult =
  Apollo.MutationResult<IUpdateProductWarehousingMutation>;
export type UpdateProductWarehousingMutationOptions =
  Apollo.BaseMutationOptions<
    IUpdateProductWarehousingMutation,
    IUpdateProductWarehousingMutationVariables
  >;
export const UserTokensDocument = gql`
  query UserTokens($userId: ID!) {
    user(userId: $userId) {
      _id
      web3Addresses {
        address
        nonce
        verified
      }
      tokens {
        ...TokenFragment
        product {
          ...ProductBriefFragment
          simulatedPrice {
            _id
            amount
            currency
          }
        }
      }
    }
  }
  ${TokenFragmentFragmentDoc}
  ${ProductBriefFragmentFragmentDoc}
`;

/**
 * __useUserTokensQuery__
 *
 * To run a query within a React component, call `useUserTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTokensQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserTokensQuery(
  baseOptions: Apollo.QueryHookOptions<
    IUserTokensQuery,
    IUserTokensQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IUserTokensQuery, IUserTokensQueryVariables>(
    UserTokensDocument,
    options,
  );
}
export function useUserTokensLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IUserTokensQuery,
    IUserTokensQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IUserTokensQuery, IUserTokensQueryVariables>(
    UserTokensDocument,
    options,
  );
}
export type UserTokensQueryHookResult = ReturnType<typeof useUserTokensQuery>;
export type UserTokensLazyQueryHookResult = ReturnType<
  typeof useUserTokensLazyQuery
>;
export type UserTokensQueryResult = Apollo.QueryResult<
  IUserTokensQuery,
  IUserTokensQueryVariables
>;
export const MakeQuotationProposalDocument = gql`
  mutation MakeQuotationProposal($quotationId: ID!, $quotationContext: JSON) {
    makeQuotationProposal(
      quotationId: $quotationId
      quotationContext: $quotationContext
    ) {
      ...QuotationDetailFragment
    }
  }
  ${QuotationDetailFragmentFragmentDoc}
`;
export type IMakeQuotationProposalMutationFn = Apollo.MutationFunction<
  IMakeQuotationProposalMutation,
  IMakeQuotationProposalMutationVariables
>;

/**
 * __useMakeQuotationProposalMutation__
 *
 * To run a mutation, you first call `useMakeQuotationProposalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeQuotationProposalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeQuotationProposalMutation, { data, loading, error }] = useMakeQuotationProposalMutation({
 *   variables: {
 *      quotationId: // value for 'quotationId'
 *      quotationContext: // value for 'quotationContext'
 *   },
 * });
 */
export function useMakeQuotationProposalMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IMakeQuotationProposalMutation,
    IMakeQuotationProposalMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IMakeQuotationProposalMutation,
    IMakeQuotationProposalMutationVariables
  >(MakeQuotationProposalDocument, options);
}
export type MakeQuotationProposalMutationHookResult = ReturnType<
  typeof useMakeQuotationProposalMutation
>;
export type MakeQuotationProposalMutationResult =
  Apollo.MutationResult<IMakeQuotationProposalMutation>;
export type MakeQuotationProposalMutationOptions = Apollo.BaseMutationOptions<
  IMakeQuotationProposalMutation,
  IMakeQuotationProposalMutationVariables
>;
export const QuotationDocument = gql`
  query Quotation($quotationId: ID!) {
    quotation(quotationId: $quotationId) {
      _id
      ...QuotationDetailFragment
    }
    quotationsCount
  }
  ${QuotationDetailFragmentFragmentDoc}
`;

/**
 * __useQuotationQuery__
 *
 * To run a query within a React component, call `useQuotationQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuotationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuotationQuery({
 *   variables: {
 *      quotationId: // value for 'quotationId'
 *   },
 * });
 */
export function useQuotationQuery(
  baseOptions: Apollo.QueryHookOptions<
    IQuotationQuery,
    IQuotationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IQuotationQuery, IQuotationQueryVariables>(
    QuotationDocument,
    options,
  );
}
export function useQuotationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IQuotationQuery,
    IQuotationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IQuotationQuery, IQuotationQueryVariables>(
    QuotationDocument,
    options,
  );
}
export type QuotationQueryHookResult = ReturnType<typeof useQuotationQuery>;
export type QuotationLazyQueryHookResult = ReturnType<
  typeof useQuotationLazyQuery
>;
export type QuotationQueryResult = Apollo.QueryResult<
  IQuotationQuery,
  IQuotationQueryVariables
>;
export const QuotationStatusDocument = gql`
  query QuotationStatus {
    quotationStatusType: __type(name: "QuotationStatus") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

/**
 * __useQuotationStatusQuery__
 *
 * To run a query within a React component, call `useQuotationStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuotationStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuotationStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuotationStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IQuotationStatusQuery,
    IQuotationStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IQuotationStatusQuery, IQuotationStatusQueryVariables>(
    QuotationStatusDocument,
    options,
  );
}
export function useQuotationStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IQuotationStatusQuery,
    IQuotationStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IQuotationStatusQuery,
    IQuotationStatusQueryVariables
  >(QuotationStatusDocument, options);
}
export type QuotationStatusQueryHookResult = ReturnType<
  typeof useQuotationStatusQuery
>;
export type QuotationStatusLazyQueryHookResult = ReturnType<
  typeof useQuotationStatusLazyQuery
>;
export type QuotationStatusQueryResult = Apollo.QueryResult<
  IQuotationStatusQuery,
  IQuotationStatusQueryVariables
>;
export const QuotationsDocument = gql`
  query Quotations(
    $limit: Int
    $offset: Int
    $queryString: String
    $sort: [SortOptionInput!]
  ) {
    quotations(
      limit: $limit
      offset: $offset
      queryString: $queryString
      sort: $sort
    ) {
      ...QuotationFragment
    }
    quotationsCount
  }
  ${QuotationFragmentFragmentDoc}
`;

/**
 * __useQuotationsQuery__
 *
 * To run a query within a React component, call `useQuotationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuotationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuotationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      queryString: // value for 'queryString'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useQuotationsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IQuotationsQuery,
    IQuotationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IQuotationsQuery, IQuotationsQueryVariables>(
    QuotationsDocument,
    options,
  );
}
export function useQuotationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IQuotationsQuery,
    IQuotationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IQuotationsQuery, IQuotationsQueryVariables>(
    QuotationsDocument,
    options,
  );
}
export type QuotationsQueryHookResult = ReturnType<typeof useQuotationsQuery>;
export type QuotationsLazyQueryHookResult = ReturnType<
  typeof useQuotationsLazyQuery
>;
export type QuotationsQueryResult = Apollo.QueryResult<
  IQuotationsQuery,
  IQuotationsQueryVariables
>;
export const RejectQuotationDocument = gql`
  mutation RejectQuotation($quotationId: ID!, $quotationContext: JSON) {
    rejectQuotation(
      quotationId: $quotationId
      quotationContext: $quotationContext
    ) {
      ...QuotationDetailFragment
    }
  }
  ${QuotationDetailFragmentFragmentDoc}
`;
export type IRejectQuotationMutationFn = Apollo.MutationFunction<
  IRejectQuotationMutation,
  IRejectQuotationMutationVariables
>;

/**
 * __useRejectQuotationMutation__
 *
 * To run a mutation, you first call `useRejectQuotationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectQuotationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectQuotationMutation, { data, loading, error }] = useRejectQuotationMutation({
 *   variables: {
 *      quotationId: // value for 'quotationId'
 *      quotationContext: // value for 'quotationContext'
 *   },
 * });
 */
export function useRejectQuotationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRejectQuotationMutation,
    IRejectQuotationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRejectQuotationMutation,
    IRejectQuotationMutationVariables
  >(RejectQuotationDocument, options);
}
export type RejectQuotationMutationHookResult = ReturnType<
  typeof useRejectQuotationMutation
>;
export type RejectQuotationMutationResult =
  Apollo.MutationResult<IRejectQuotationMutation>;
export type RejectQuotationMutationOptions = Apollo.BaseMutationOptions<
  IRejectQuotationMutation,
  IRejectQuotationMutationVariables
>;
export const UserQuotationsDocument = gql`
  query UserQuotations($userId: ID!, $queryString: String) {
    user(userId: $userId) {
      _id
      quotations(queryString: $queryString) {
        ...QuotationFragment
      }
    }
  }
  ${QuotationFragmentFragmentDoc}
`;

/**
 * __useUserQuotationsQuery__
 *
 * To run a query within a React component, call `useUserQuotationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuotationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuotationsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      queryString: // value for 'queryString'
 *   },
 * });
 */
export function useUserQuotationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    IUserQuotationsQuery,
    IUserQuotationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IUserQuotationsQuery, IUserQuotationsQueryVariables>(
    UserQuotationsDocument,
    options,
  );
}
export function useUserQuotationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IUserQuotationsQuery,
    IUserQuotationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IUserQuotationsQuery,
    IUserQuotationsQueryVariables
  >(UserQuotationsDocument, options);
}
export type UserQuotationsQueryHookResult = ReturnType<
  typeof useUserQuotationsQuery
>;
export type UserQuotationsLazyQueryHookResult = ReturnType<
  typeof useUserQuotationsLazyQuery
>;
export type UserQuotationsQueryResult = Apollo.QueryResult<
  IUserQuotationsQuery,
  IUserQuotationsQueryVariables
>;
export const VerifyQuotationDocument = gql`
  mutation VerifyQuotation($quotationId: ID!, $quotationContext: JSON) {
    verifyQuotation(
      quotationId: $quotationId
      quotationContext: $quotationContext
    ) {
      ...QuotationDetailFragment
    }
  }
  ${QuotationDetailFragmentFragmentDoc}
`;
export type IVerifyQuotationMutationFn = Apollo.MutationFunction<
  IVerifyQuotationMutation,
  IVerifyQuotationMutationVariables
>;

/**
 * __useVerifyQuotationMutation__
 *
 * To run a mutation, you first call `useVerifyQuotationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyQuotationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyQuotationMutation, { data, loading, error }] = useVerifyQuotationMutation({
 *   variables: {
 *      quotationId: // value for 'quotationId'
 *      quotationContext: // value for 'quotationContext'
 *   },
 * });
 */
export function useVerifyQuotationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IVerifyQuotationMutation,
    IVerifyQuotationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IVerifyQuotationMutation,
    IVerifyQuotationMutationVariables
  >(VerifyQuotationDocument, options);
}
export type VerifyQuotationMutationHookResult = ReturnType<
  typeof useVerifyQuotationMutation
>;
export type VerifyQuotationMutationResult =
  Apollo.MutationResult<IVerifyQuotationMutation>;
export type VerifyQuotationMutationOptions = Apollo.BaseMutationOptions<
  IVerifyQuotationMutation,
  IVerifyQuotationMutationVariables
>;
export const SyncReportsDocument = gql`
  query SyncReports(
    $queryString: String
    $offset: Int
    $limit: Int
    $status: [WorkStatus!]
    $types: [WorkType!]
    $created: DateFilterInput
    $sort: [SortOptionInput!]
  ) {
    workQueue(
      queryString: $queryString
      offset: $offset
      limit: $limit
      status: $status
      types: $types
      created: $created
      sort: $sort
    ) {
      _id
      type
      scheduled
      status
      started
      success
      finished
      created
      deleted
      priority
      worker
      retries
      original {
        _id
      }
      timeout
      input
      result
      error
    }
  }
`;

/**
 * __useSyncReportsQuery__
 *
 * To run a query within a React component, call `useSyncReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSyncReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSyncReportsQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      status: // value for 'status'
 *      types: // value for 'types'
 *      created: // value for 'created'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useSyncReportsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ISyncReportsQuery,
    ISyncReportsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ISyncReportsQuery, ISyncReportsQueryVariables>(
    SyncReportsDocument,
    options,
  );
}
export function useSyncReportsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ISyncReportsQuery,
    ISyncReportsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ISyncReportsQuery, ISyncReportsQueryVariables>(
    SyncReportsDocument,
    options,
  );
}
export type SyncReportsQueryHookResult = ReturnType<typeof useSyncReportsQuery>;
export type SyncReportsLazyQueryHookResult = ReturnType<
  typeof useSyncReportsLazyQuery
>;
export type SyncReportsQueryResult = Apollo.QueryResult<
  ISyncReportsQuery,
  ISyncReportsQueryVariables
>;
export const CreateWarehousingProviderDocument = gql`
  mutation CreateWarehousingProvider(
    $warehousingProvider: CreateWarehousingProviderInput!
  ) {
    createWarehousingProvider(warehousingProvider: $warehousingProvider) {
      ...WarehousingProviderFragment
    }
  }
  ${WarehousingProviderFragmentFragmentDoc}
`;
export type ICreateWarehousingProviderMutationFn = Apollo.MutationFunction<
  ICreateWarehousingProviderMutation,
  ICreateWarehousingProviderMutationVariables
>;

/**
 * __useCreateWarehousingProviderMutation__
 *
 * To run a mutation, you first call `useCreateWarehousingProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWarehousingProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWarehousingProviderMutation, { data, loading, error }] = useCreateWarehousingProviderMutation({
 *   variables: {
 *      warehousingProvider: // value for 'warehousingProvider'
 *   },
 * });
 */
export function useCreateWarehousingProviderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ICreateWarehousingProviderMutation,
    ICreateWarehousingProviderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ICreateWarehousingProviderMutation,
    ICreateWarehousingProviderMutationVariables
  >(CreateWarehousingProviderDocument, options);
}
export type CreateWarehousingProviderMutationHookResult = ReturnType<
  typeof useCreateWarehousingProviderMutation
>;
export type CreateWarehousingProviderMutationResult =
  Apollo.MutationResult<ICreateWarehousingProviderMutation>;
export type CreateWarehousingProviderMutationOptions =
  Apollo.BaseMutationOptions<
    ICreateWarehousingProviderMutation,
    ICreateWarehousingProviderMutationVariables
  >;
export const RemoveWarehousingProviderDocument = gql`
  mutation RemoveWarehousingProvider($warehousingProviderId: ID!) {
    removeWarehousingProvider(warehousingProviderId: $warehousingProviderId) {
      _id
    }
  }
`;
export type IRemoveWarehousingProviderMutationFn = Apollo.MutationFunction<
  IRemoveWarehousingProviderMutation,
  IRemoveWarehousingProviderMutationVariables
>;

/**
 * __useRemoveWarehousingProviderMutation__
 *
 * To run a mutation, you first call `useRemoveWarehousingProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveWarehousingProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeWarehousingProviderMutation, { data, loading, error }] = useRemoveWarehousingProviderMutation({
 *   variables: {
 *      warehousingProviderId: // value for 'warehousingProviderId'
 *   },
 * });
 */
export function useRemoveWarehousingProviderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveWarehousingProviderMutation,
    IRemoveWarehousingProviderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IRemoveWarehousingProviderMutation,
    IRemoveWarehousingProviderMutationVariables
  >(RemoveWarehousingProviderDocument, options);
}
export type RemoveWarehousingProviderMutationHookResult = ReturnType<
  typeof useRemoveWarehousingProviderMutation
>;
export type RemoveWarehousingProviderMutationResult =
  Apollo.MutationResult<IRemoveWarehousingProviderMutation>;
export type RemoveWarehousingProviderMutationOptions =
  Apollo.BaseMutationOptions<
    IRemoveWarehousingProviderMutation,
    IRemoveWarehousingProviderMutationVariables
  >;
export const UpdateWarehousingProviderDocument = gql`
  mutation UpdateWarehousingProvider(
    $warehousingProvider: UpdateProviderInput!
    $warehousingProviderId: ID!
  ) {
    updateWarehousingProvider(
      warehousingProvider: $warehousingProvider
      warehousingProviderId: $warehousingProviderId
    ) {
      ...WarehousingProviderFragment
    }
  }
  ${WarehousingProviderFragmentFragmentDoc}
`;
export type IUpdateWarehousingProviderMutationFn = Apollo.MutationFunction<
  IUpdateWarehousingProviderMutation,
  IUpdateWarehousingProviderMutationVariables
>;

/**
 * __useUpdateWarehousingProviderMutation__
 *
 * To run a mutation, you first call `useUpdateWarehousingProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWarehousingProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWarehousingProviderMutation, { data, loading, error }] = useUpdateWarehousingProviderMutation({
 *   variables: {
 *      warehousingProvider: // value for 'warehousingProvider'
 *      warehousingProviderId: // value for 'warehousingProviderId'
 *   },
 * });
 */
export function useUpdateWarehousingProviderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpdateWarehousingProviderMutation,
    IUpdateWarehousingProviderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IUpdateWarehousingProviderMutation,
    IUpdateWarehousingProviderMutationVariables
  >(UpdateWarehousingProviderDocument, options);
}
export type UpdateWarehousingProviderMutationHookResult = ReturnType<
  typeof useUpdateWarehousingProviderMutation
>;
export type UpdateWarehousingProviderMutationResult =
  Apollo.MutationResult<IUpdateWarehousingProviderMutation>;
export type UpdateWarehousingProviderMutationOptions =
  Apollo.BaseMutationOptions<
    IUpdateWarehousingProviderMutation,
    IUpdateWarehousingProviderMutationVariables
  >;
export const WarehousingInterfacesDocument = gql`
  query WarehousingInterfaces($providerType: WarehousingProviderType!) {
    warehousingInterfaces(type: $providerType) {
      _id
      value: _id
      label
    }
  }
`;

/**
 * __useWarehousingInterfacesQuery__
 *
 * To run a query within a React component, call `useWarehousingInterfacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWarehousingInterfacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWarehousingInterfacesQuery({
 *   variables: {
 *      providerType: // value for 'providerType'
 *   },
 * });
 */
export function useWarehousingInterfacesQuery(
  baseOptions: Apollo.QueryHookOptions<
    IWarehousingInterfacesQuery,
    IWarehousingInterfacesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IWarehousingInterfacesQuery,
    IWarehousingInterfacesQueryVariables
  >(WarehousingInterfacesDocument, options);
}
export function useWarehousingInterfacesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IWarehousingInterfacesQuery,
    IWarehousingInterfacesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IWarehousingInterfacesQuery,
    IWarehousingInterfacesQueryVariables
  >(WarehousingInterfacesDocument, options);
}
export type WarehousingInterfacesQueryHookResult = ReturnType<
  typeof useWarehousingInterfacesQuery
>;
export type WarehousingInterfacesLazyQueryHookResult = ReturnType<
  typeof useWarehousingInterfacesLazyQuery
>;
export type WarehousingInterfacesQueryResult = Apollo.QueryResult<
  IWarehousingInterfacesQuery,
  IWarehousingInterfacesQueryVariables
>;
export const WarehousingProviderDocument = gql`
  query WarehousingProvider($warehousingProviderId: ID!) {
    warehousingProvider(warehousingProviderId: $warehousingProviderId) {
      ...WarehousingProviderFragment
    }
  }
  ${WarehousingProviderFragmentFragmentDoc}
`;

/**
 * __useWarehousingProviderQuery__
 *
 * To run a query within a React component, call `useWarehousingProviderQuery` and pass it any options that fit your needs.
 * When your component renders, `useWarehousingProviderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWarehousingProviderQuery({
 *   variables: {
 *      warehousingProviderId: // value for 'warehousingProviderId'
 *   },
 * });
 */
export function useWarehousingProviderQuery(
  baseOptions: Apollo.QueryHookOptions<
    IWarehousingProviderQuery,
    IWarehousingProviderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IWarehousingProviderQuery,
    IWarehousingProviderQueryVariables
  >(WarehousingProviderDocument, options);
}
export function useWarehousingProviderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IWarehousingProviderQuery,
    IWarehousingProviderQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IWarehousingProviderQuery,
    IWarehousingProviderQueryVariables
  >(WarehousingProviderDocument, options);
}
export type WarehousingProviderQueryHookResult = ReturnType<
  typeof useWarehousingProviderQuery
>;
export type WarehousingProviderLazyQueryHookResult = ReturnType<
  typeof useWarehousingProviderLazyQuery
>;
export type WarehousingProviderQueryResult = Apollo.QueryResult<
  IWarehousingProviderQuery,
  IWarehousingProviderQueryVariables
>;
export const WarehousingProvidersTypeDocument = gql`
  query WarehousingProvidersType {
    warehousingProviderType: __type(name: "WarehousingProviderType") {
      options: enumValues {
        value: name
        label: description
      }
    }
  }
`;

/**
 * __useWarehousingProvidersTypeQuery__
 *
 * To run a query within a React component, call `useWarehousingProvidersTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useWarehousingProvidersTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWarehousingProvidersTypeQuery({
 *   variables: {
 *   },
 * });
 */
export function useWarehousingProvidersTypeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IWarehousingProvidersTypeQuery,
    IWarehousingProvidersTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IWarehousingProvidersTypeQuery,
    IWarehousingProvidersTypeQueryVariables
  >(WarehousingProvidersTypeDocument, options);
}
export function useWarehousingProvidersTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IWarehousingProvidersTypeQuery,
    IWarehousingProvidersTypeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IWarehousingProvidersTypeQuery,
    IWarehousingProvidersTypeQueryVariables
  >(WarehousingProvidersTypeDocument, options);
}
export type WarehousingProvidersTypeQueryHookResult = ReturnType<
  typeof useWarehousingProvidersTypeQuery
>;
export type WarehousingProvidersTypeLazyQueryHookResult = ReturnType<
  typeof useWarehousingProvidersTypeLazyQuery
>;
export type WarehousingProvidersTypeQueryResult = Apollo.QueryResult<
  IWarehousingProvidersTypeQuery,
  IWarehousingProvidersTypeQueryVariables
>;
export const WarehousingProvidersDocument = gql`
  query WarehousingProviders($type: WarehousingProviderType) {
    warehousingProviders(type: $type) {
      ...WarehousingProviderFragment
    }
  }
  ${WarehousingProviderFragmentFragmentDoc}
`;

/**
 * __useWarehousingProvidersQuery__
 *
 * To run a query within a React component, call `useWarehousingProvidersQuery` and pass it any options that fit your needs.
 * When your component renders, `useWarehousingProvidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWarehousingProvidersQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useWarehousingProvidersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IWarehousingProvidersQuery,
    IWarehousingProvidersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IWarehousingProvidersQuery,
    IWarehousingProvidersQueryVariables
  >(WarehousingProvidersDocument, options);
}
export function useWarehousingProvidersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IWarehousingProvidersQuery,
    IWarehousingProvidersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IWarehousingProvidersQuery,
    IWarehousingProvidersQueryVariables
  >(WarehousingProvidersDocument, options);
}
export type WarehousingProvidersQueryHookResult = ReturnType<
  typeof useWarehousingProvidersQuery
>;
export type WarehousingProvidersLazyQueryHookResult = ReturnType<
  typeof useWarehousingProvidersLazyQuery
>;
export type WarehousingProvidersQueryResult = Apollo.QueryResult<
  IWarehousingProvidersQuery,
  IWarehousingProvidersQueryVariables
>;
export const ActiveWorkTypesDocument = gql`
  query ActiveWorkTypes {
    activeWorkTypes
  }
`;

/**
 * __useActiveWorkTypesQuery__
 *
 * To run a query within a React component, call `useActiveWorkTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useActiveWorkTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActiveWorkTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useActiveWorkTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IActiveWorkTypesQuery,
    IActiveWorkTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IActiveWorkTypesQuery, IActiveWorkTypesQueryVariables>(
    ActiveWorkTypesDocument,
    options,
  );
}
export function useActiveWorkTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IActiveWorkTypesQuery,
    IActiveWorkTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IActiveWorkTypesQuery,
    IActiveWorkTypesQueryVariables
  >(ActiveWorkTypesDocument, options);
}
export type ActiveWorkTypesQueryHookResult = ReturnType<
  typeof useActiveWorkTypesQuery
>;
export type ActiveWorkTypesLazyQueryHookResult = ReturnType<
  typeof useActiveWorkTypesLazyQuery
>;
export type ActiveWorkTypesQueryResult = Apollo.QueryResult<
  IActiveWorkTypesQuery,
  IActiveWorkTypesQueryVariables
>;
export const AddWorkDocument = gql`
  mutation AddWork(
    $type: WorkType!
    $priority: Int! = 0
    $input: JSON
    $originalWorkId: ID
    $scheduled: Timestamp
    $retries: Int! = 20
  ) {
    addWork(
      type: $type
      priority: $priority
      input: $input
      originalWorkId: $originalWorkId
      scheduled: $scheduled
      retries: $retries
    ) {
      _id
    }
  }
`;
export type IAddWorkMutationFn = Apollo.MutationFunction<
  IAddWorkMutation,
  IAddWorkMutationVariables
>;

/**
 * __useAddWorkMutation__
 *
 * To run a mutation, you first call `useAddWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWorkMutation, { data, loading, error }] = useAddWorkMutation({
 *   variables: {
 *      type: // value for 'type'
 *      priority: // value for 'priority'
 *      input: // value for 'input'
 *      originalWorkId: // value for 'originalWorkId'
 *      scheduled: // value for 'scheduled'
 *      retries: // value for 'retries'
 *   },
 * });
 */
export function useAddWorkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IAddWorkMutation,
    IAddWorkMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IAddWorkMutation, IAddWorkMutationVariables>(
    AddWorkDocument,
    options,
  );
}
export type AddWorkMutationHookResult = ReturnType<typeof useAddWorkMutation>;
export type AddWorkMutationResult = Apollo.MutationResult<IAddWorkMutation>;
export type AddWorkMutationOptions = Apollo.BaseMutationOptions<
  IAddWorkMutation,
  IAddWorkMutationVariables
>;
export const AllocateWorkDocument = gql`
  mutation AllocateWork($types: [WorkType], $worker: String) {
    allocateWork(types: $types, worker: $worker) {
      _id
    }
  }
`;
export type IAllocateWorkMutationFn = Apollo.MutationFunction<
  IAllocateWorkMutation,
  IAllocateWorkMutationVariables
>;

/**
 * __useAllocateWorkMutation__
 *
 * To run a mutation, you first call `useAllocateWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAllocateWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [allocateWorkMutation, { data, loading, error }] = useAllocateWorkMutation({
 *   variables: {
 *      types: // value for 'types'
 *      worker: // value for 'worker'
 *   },
 * });
 */
export function useAllocateWorkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IAllocateWorkMutation,
    IAllocateWorkMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IAllocateWorkMutation,
    IAllocateWorkMutationVariables
  >(AllocateWorkDocument, options);
}
export type AllocateWorkMutationHookResult = ReturnType<
  typeof useAllocateWorkMutation
>;
export type AllocateWorkMutationResult =
  Apollo.MutationResult<IAllocateWorkMutation>;
export type AllocateWorkMutationOptions = Apollo.BaseMutationOptions<
  IAllocateWorkMutation,
  IAllocateWorkMutationVariables
>;
export const WorkTypesDocument = gql`
  query WorkTypes {
    registeredWorkTypes: __type(name: "WorkType") {
      options: enumValues {
        value: name
        label: name
      }
    }
  }
`;

/**
 * __useWorkTypesQuery__
 *
 * To run a query within a React component, call `useWorkTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useWorkTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IWorkTypesQuery,
    IWorkTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IWorkTypesQuery, IWorkTypesQueryVariables>(
    WorkTypesDocument,
    options,
  );
}
export function useWorkTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IWorkTypesQuery,
    IWorkTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IWorkTypesQuery, IWorkTypesQueryVariables>(
    WorkTypesDocument,
    options,
  );
}
export type WorkTypesQueryHookResult = ReturnType<typeof useWorkTypesQuery>;
export type WorkTypesLazyQueryHookResult = ReturnType<
  typeof useWorkTypesLazyQuery
>;
export type WorkTypesQueryResult = Apollo.QueryResult<
  IWorkTypesQuery,
  IWorkTypesQueryVariables
>;
export const RemoveWorkDocument = gql`
  mutation RemoveWork($workId: ID!) {
    removeWork(workId: $workId) {
      _id
    }
  }
`;
export type IRemoveWorkMutationFn = Apollo.MutationFunction<
  IRemoveWorkMutation,
  IRemoveWorkMutationVariables
>;

/**
 * __useRemoveWorkMutation__
 *
 * To run a mutation, you first call `useRemoveWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeWorkMutation, { data, loading, error }] = useRemoveWorkMutation({
 *   variables: {
 *      workId: // value for 'workId'
 *   },
 * });
 */
export function useRemoveWorkMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IRemoveWorkMutation,
    IRemoveWorkMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IRemoveWorkMutation, IRemoveWorkMutationVariables>(
    RemoveWorkDocument,
    options,
  );
}
export type RemoveWorkMutationHookResult = ReturnType<
  typeof useRemoveWorkMutation
>;
export type RemoveWorkMutationResult =
  Apollo.MutationResult<IRemoveWorkMutation>;
export type RemoveWorkMutationOptions = Apollo.BaseMutationOptions<
  IRemoveWorkMutation,
  IRemoveWorkMutationVariables
>;
export const WorkDocument = gql`
  query Work($workId: ID!) {
    work(workId: $workId) {
      ...WorkFragment
      input
      result
      error
      priority
      worker
      retries
      original {
        _id
      }
      timeout
    }
  }
  ${WorkFragmentFragmentDoc}
`;

/**
 * __useWorkQuery__
 *
 * To run a query within a React component, call `useWorkQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkQuery({
 *   variables: {
 *      workId: // value for 'workId'
 *   },
 * });
 */
export function useWorkQuery(
  baseOptions: Apollo.QueryHookOptions<IWorkQuery, IWorkQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IWorkQuery, IWorkQueryVariables>(
    WorkDocument,
    options,
  );
}
export function useWorkLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IWorkQuery, IWorkQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IWorkQuery, IWorkQueryVariables>(
    WorkDocument,
    options,
  );
}
export type WorkQueryHookResult = ReturnType<typeof useWorkQuery>;
export type WorkLazyQueryHookResult = ReturnType<typeof useWorkLazyQuery>;
export type WorkQueryResult = Apollo.QueryResult<
  IWorkQuery,
  IWorkQueryVariables
>;
export const WorkQueueDocument = gql`
  query WorkQueue(
    $queryString: String
    $offset: Int
    $limit: Int
    $status: [WorkStatus!]
    $types: [WorkType!]
    $created: DateFilterInput
    $sort: [SortOptionInput!]
  ) {
    workQueue(
      queryString: $queryString
      offset: $offset
      limit: $limit
      status: $status
      types: $types
      created: $created
      sort: $sort
    ) {
      ...WorkFragment
    }
    activeWorkTypes
    workQueueCount(
      status: $status
      types: $types
      created: $created
      queryString: $queryString
    )
  }
  ${WorkFragmentFragmentDoc}
`;

/**
 * __useWorkQueueQuery__
 *
 * To run a query within a React component, call `useWorkQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkQueueQuery({
 *   variables: {
 *      queryString: // value for 'queryString'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      status: // value for 'status'
 *      types: // value for 'types'
 *      created: // value for 'created'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useWorkQueueQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IWorkQueueQuery,
    IWorkQueueQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IWorkQueueQuery, IWorkQueueQueryVariables>(
    WorkQueueDocument,
    options,
  );
}
export function useWorkQueueLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IWorkQueueQuery,
    IWorkQueueQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IWorkQueueQuery, IWorkQueueQueryVariables>(
    WorkQueueDocument,
    options,
  );
}
export type WorkQueueQueryHookResult = ReturnType<typeof useWorkQueueQuery>;
export type WorkQueueLazyQueryHookResult = ReturnType<
  typeof useWorkQueueLazyQuery
>;
export type WorkQueueQueryResult = Apollo.QueryResult<
  IWorkQueueQuery,
  IWorkQueueQueryVariables
>;
