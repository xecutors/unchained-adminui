import * as Operations from '';
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
  readonly addressLine?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly addressLine2?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly city?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly company?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly countryCode?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly firstName?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly lastName?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly postalCode?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly regionCode?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IAddressInput = {
  readonly addressLine?: InputMaybe<Scalars['String']['input']>;
  readonly addressLine2?: InputMaybe<Scalars['String']['input']>;
  readonly city?: InputMaybe<Scalars['String']['input']>;
  readonly company?: InputMaybe<Scalars['String']['input']>;
  readonly countryCode?: InputMaybe<Scalars['String']['input']>;
  readonly firstName?: InputMaybe<Scalars['String']['input']>;
  readonly lastName?: InputMaybe<Scalars['String']['input']>;
  readonly postalCode?: InputMaybe<Scalars['String']['input']>;
  readonly regionCode?: InputMaybe<Scalars['String']['input']>;
};

export type IAdminUiConfig = {
  readonly customProperties: ReadonlyArray<
    FieldWrapper<IAdminUiConfigCustomEntityInterface>
  >;
};

export type IAdminUiConfigCustomEntityInterface = {
  readonly entityName: FieldWrapper<Scalars['String']['output']>;
  readonly inlineFragment: FieldWrapper<Scalars['String']['output']>;
};

/** Assortment */
export type IAssortment = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly assortmentPaths: ReadonlyArray<FieldWrapper<IAssortmentPath>>;
  readonly children?: Maybe<ReadonlyArray<FieldWrapper<IAssortment>>>;
  readonly childrenCount: FieldWrapper<Scalars['Int']['output']>;
  readonly created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly deleted?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly filterAssignments?: Maybe<
    ReadonlyArray<FieldWrapper<IAssortmentFilter>>
  >;
  readonly isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  readonly isBase?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  readonly isRoot?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  readonly linkedAssortments?: Maybe<
    ReadonlyArray<FieldWrapper<IAssortmentLink>>
  >;
  readonly media: ReadonlyArray<FieldWrapper<IAssortmentMedia>>;
  readonly productAssignments?: Maybe<
    ReadonlyArray<FieldWrapper<IAssortmentProduct>>
  >;
  readonly searchProducts: FieldWrapper<IProductSearchResult>;
  readonly sequence: FieldWrapper<Scalars['Int']['output']>;
  readonly tags?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['LowerCaseString']['output']>>
  >;
  readonly texts?: Maybe<FieldWrapper<IAssortmentTexts>>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
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
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
};

/** Assortment */
export type IAssortmentSearchProductsArgs = {
  filterQuery?: InputMaybe<ReadonlyArray<IFilterQueryInput>>;
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
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly assortment: FieldWrapper<IAssortment>;
  readonly filter: FieldWrapper<IFilter>;
  readonly sortKey: FieldWrapper<Scalars['Int']['output']>;
  readonly tags?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['LowerCaseString']['output']>>
  >;
};

export type IAssortmentLink = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly child: FieldWrapper<IAssortment>;
  readonly parent: FieldWrapper<IAssortment>;
  readonly sortKey: FieldWrapper<Scalars['Int']['output']>;
  readonly tags?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['LowerCaseString']['output']>>
  >;
};

export type IAssortmentMedia = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly file: FieldWrapper<IMedia>;
  readonly sortKey: FieldWrapper<Scalars['Int']['output']>;
  readonly tags?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['LowerCaseString']['output']>>
  >;
  readonly texts?: Maybe<FieldWrapper<IAssortmentMediaTexts>>;
};

export type IAssortmentMediaTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IAssortmentMediaTexts = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly locale?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly subtitle?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

/** Directed assortment to product paths (breadcrumbs) */
export type IAssortmentPath = {
  readonly links: ReadonlyArray<FieldWrapper<IAssortmentPathLink>>;
};

/**
 * A connection that represents an uplink from assortment to assortment,
 * assortmentId and assortmentTexts are there for convenience
 * to short-circuit breadcrumb lookups
 */
export type IAssortmentPathLink = {
  readonly assortmentId: FieldWrapper<Scalars['ID']['output']>;
  readonly assortmentTexts: FieldWrapper<IAssortmentTexts>;
  readonly link?: Maybe<FieldWrapper<IAssortmentLink>>;
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
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly assortment: FieldWrapper<IAssortment>;
  readonly product: FieldWrapper<IProduct>;
  readonly sortKey: FieldWrapper<Scalars['Int']['output']>;
  readonly tags?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['LowerCaseString']['output']>>
  >;
};

export type IAssortmentSearchResult = {
  readonly assortments: ReadonlyArray<FieldWrapper<IAssortment>>;
  readonly assortmentsCount: FieldWrapper<Scalars['Int']['output']>;
};

export type IAssortmentSearchResultAssortmentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type IAssortmentTexts = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly description?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly locale?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly slug?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly subtitle?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IBookmark = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly product: FieldWrapper<IProduct>;
  readonly user: FieldWrapper<IUser>;
};

/** A Bundle product consists of multiple configured products */
export type IBundleProduct = IProduct & {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly assortmentPaths: ReadonlyArray<FieldWrapper<IProductAssortmentPath>>;
  readonly bundleItems?: Maybe<ReadonlyArray<FieldWrapper<IProductBundleItem>>>;
  readonly created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly media: ReadonlyArray<FieldWrapper<IProductMedia>>;
  readonly published?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly reviews: ReadonlyArray<FieldWrapper<IProductReview>>;
  readonly reviewsCount: FieldWrapper<Scalars['Int']['output']>;
  readonly sequence: FieldWrapper<Scalars['Int']['output']>;
  readonly siblings: ReadonlyArray<FieldWrapper<IProduct>>;
  readonly status: FieldWrapper<IProductStatus>;
  readonly tags?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['LowerCaseString']['output']>>
  >;
  readonly texts?: Maybe<FieldWrapper<IProductTexts>>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

/** A Bundle product consists of multiple configured products */
export type IBundleProductMediaArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
};

/** A Bundle product consists of multiple configured products */
export type IBundleProductReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
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
  readonly blue?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  readonly green?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  readonly hex?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly name?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly red?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
};

/** Configurable Product (Proxy) */
export type IConfigurableProduct = IProduct & {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  /** Complete assignment matrix */
  readonly assignments: ReadonlyArray<
    FieldWrapper<IProductVariationAssignment>
  >;
  readonly assortmentPaths: ReadonlyArray<FieldWrapper<IProductAssortmentPath>>;
  readonly catalogPriceRange?: Maybe<FieldWrapper<IPriceRange>>;
  readonly created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly media: ReadonlyArray<FieldWrapper<IProductMedia>>;
  /** Reduced list of possible products by key/value combinations */
  readonly products?: Maybe<ReadonlyArray<FieldWrapper<IProduct>>>;
  readonly published?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly reviews: ReadonlyArray<FieldWrapper<IProductReview>>;
  readonly reviewsCount: FieldWrapper<Scalars['Int']['output']>;
  readonly sequence: FieldWrapper<Scalars['Int']['output']>;
  readonly siblings: ReadonlyArray<FieldWrapper<IProduct>>;
  readonly simulatedPriceRange?: Maybe<FieldWrapper<IPriceRange>>;
  readonly status: FieldWrapper<IProductStatus>;
  readonly tags?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['LowerCaseString']['output']>>
  >;
  readonly texts?: Maybe<FieldWrapper<IProductTexts>>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  /** Product's variations (keys) and their options (values) */
  readonly variations?: Maybe<ReadonlyArray<FieldWrapper<IProductVariation>>>;
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
  vectors?: InputMaybe<ReadonlyArray<IProductAssignmentVectorInput>>;
};

/** Configurable Product (Proxy) */
export type IConfigurableProductMediaArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
};

/** Configurable Product (Proxy) */
export type IConfigurableProductProductsArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  vectors?: InputMaybe<ReadonlyArray<IProductAssignmentVectorInput>>;
};

/** Configurable Product (Proxy) */
export type IConfigurableProductReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
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
  vectors?: InputMaybe<ReadonlyArray<IProductAssignmentVectorInput>>;
};

/** Configurable Product (Proxy) */
export type IConfigurableProductTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IContact = {
  readonly emailAddress?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly telNumber?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IContactInput = {
  readonly emailAddress?: InputMaybe<Scalars['String']['input']>;
  readonly telNumber?: InputMaybe<Scalars['String']['input']>;
};

export type IContractConfiguration = {
  readonly ercMetadataProperties?: Maybe<
    FieldWrapper<Scalars['JSON']['output']>
  >;
  readonly supply: FieldWrapper<Scalars['Int']['output']>;
  readonly tokenId: FieldWrapper<Scalars['String']['output']>;
};

export type ICountry = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly defaultCurrency?: Maybe<FieldWrapper<ICurrency>>;
  readonly flagEmoji?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  readonly isBase?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  /** ISO 3166-1 alpha-2 https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements */
  readonly isoCode?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly name?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type ICountryNameArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type ICreateAssortmentInput = {
  readonly isRoot?: InputMaybe<Scalars['Boolean']['input']>;
  readonly tags?: InputMaybe<
    ReadonlyArray<Scalars['LowerCaseString']['input']>
  >;
  readonly title: Scalars['String']['input'];
};

export type ICreateCountryInput = {
  readonly isoCode: Scalars['String']['input'];
};

export type ICreateCurrencyInput = {
  readonly contractAddress?: InputMaybe<Scalars['String']['input']>;
  readonly decimals?: InputMaybe<Scalars['Int']['input']>;
  readonly isoCode: Scalars['String']['input'];
};

export type ICreateDeliveryProviderInput = {
  readonly adapterKey: Scalars['String']['input'];
  readonly type: IDeliveryProviderType;
};

export type ICreateFilterInput = {
  readonly key: Scalars['String']['input'];
  readonly options?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly title: Scalars['String']['input'];
  readonly type: IFilterType;
};

export type ICreateFilterOptionInput = {
  readonly title: Scalars['String']['input'];
  readonly value: Scalars['String']['input'];
};

export type ICreateLanguageInput = {
  readonly isoCode: Scalars['String']['input'];
};

export type ICreatePaymentProviderInput = {
  readonly adapterKey: Scalars['String']['input'];
  readonly type: IPaymentProviderType;
};

export type ICreateProductBundleItemInput = {
  readonly productId: Scalars['ID']['input'];
  readonly quantity: Scalars['Int']['input'];
};

export type ICreateProductInput = {
  readonly tags?: InputMaybe<
    ReadonlyArray<Scalars['LowerCaseString']['input']>
  >;
  readonly title: Scalars['String']['input'];
  readonly type: Scalars['String']['input'];
};

export type ICreateProductVariationInput = {
  readonly key: Scalars['String']['input'];
  readonly title: Scalars['String']['input'];
  readonly type: IProductVariationType;
};

export type ICreateProductVariationOptionInput = {
  readonly title: Scalars['String']['input'];
  readonly value: Scalars['String']['input'];
};

export type ICreateWarehousingProviderInput = {
  readonly adapterKey: Scalars['String']['input'];
  readonly type: IWarehousingProviderType;
};

export type ICurrency = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly contractAddress?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly decimals?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  readonly isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  readonly isoCode: FieldWrapper<Scalars['String']['output']>;
};

export type IDateFilterInput = {
  readonly end?: InputMaybe<Scalars['DateTime']['input']>;
  readonly start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type IDeliveryInterface = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly label?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly version?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IDeliveryProvider = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly configuration?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  readonly configurationError?: Maybe<FieldWrapper<IDeliveryProviderError>>;
  readonly created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly deleted?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly interface?: Maybe<FieldWrapper<IDeliveryInterface>>;
  readonly isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  readonly simulatedPrice?: Maybe<FieldWrapper<IPrice>>;
  readonly type?: Maybe<FieldWrapper<IDeliveryProviderType>>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
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
  readonly height?: Maybe<FieldWrapper<Scalars['Float']['output']>>;
  readonly length?: Maybe<FieldWrapper<Scalars['Float']['output']>>;
  readonly weight?: Maybe<FieldWrapper<Scalars['Float']['output']>>;
  readonly width?: Maybe<FieldWrapper<Scalars['Float']['output']>>;
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
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly isManualAdditionAllowed?: Maybe<
    FieldWrapper<Scalars['Boolean']['output']>
  >;
  readonly isManualRemovalAllowed?: Maybe<
    FieldWrapper<Scalars['Boolean']['output']>
  >;
  readonly label?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly version?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IDispatch = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly deliveryProvider?: Maybe<FieldWrapper<IDeliveryProvider>>;
  readonly earliestDelivery?: Maybe<
    FieldWrapper<Scalars['DateTime']['output']>
  >;
  readonly shipping?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly warehousingProvider?: Maybe<FieldWrapper<IWarehousingProvider>>;
};

/** Enrollment */
export type IEnrollment = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly billingAddress?: Maybe<FieldWrapper<IAddress>>;
  readonly contact?: Maybe<FieldWrapper<IContact>>;
  readonly country?: Maybe<FieldWrapper<ICountry>>;
  readonly created: FieldWrapper<Scalars['DateTime']['output']>;
  readonly currency?: Maybe<FieldWrapper<ICurrency>>;
  readonly delivery?: Maybe<FieldWrapper<IEnrollmentDelivery>>;
  readonly enrollmentNumber?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly expires?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly isExpired?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  readonly payment?: Maybe<FieldWrapper<IEnrollmentPayment>>;
  readonly periods: ReadonlyArray<FieldWrapper<IEnrollmentPeriod>>;
  readonly plan: FieldWrapper<IEnrollmentPlan>;
  readonly status: FieldWrapper<IEnrollmentStatus>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly user: FieldWrapper<IUser>;
};

/** Enrollment */
export type IEnrollmentIsExpiredArgs = {
  referenceDate?: InputMaybe<Scalars['Timestamp']['input']>;
};

export type IEnrollmentDelivery = {
  readonly provider?: Maybe<FieldWrapper<IDeliveryProvider>>;
};

export type IEnrollmentDeliveryInput = {
  readonly deliveryProviderId: Scalars['ID']['input'];
  readonly meta?: InputMaybe<Scalars['JSON']['input']>;
};

export type IEnrollmentPayment = {
  readonly provider?: Maybe<FieldWrapper<IPaymentProvider>>;
};

export type IEnrollmentPaymentInput = {
  readonly meta?: InputMaybe<Scalars['JSON']['input']>;
  readonly paymentProviderId: Scalars['ID']['input'];
};

export type IEnrollmentPeriod = {
  readonly end: FieldWrapper<Scalars['DateTime']['output']>;
  readonly isTrial: FieldWrapper<Scalars['Boolean']['output']>;
  readonly order?: Maybe<FieldWrapper<IOrder>>;
  readonly start: FieldWrapper<Scalars['DateTime']['output']>;
};

export type IEnrollmentPlan = {
  readonly configuration?: Maybe<
    ReadonlyArray<FieldWrapper<IProductConfigurationParameter>>
  >;
  readonly product: FieldWrapper<IPlanProduct>;
  readonly quantity: FieldWrapper<Scalars['Int']['output']>;
};

export type IEnrollmentPlanInput = {
  readonly configuration?: InputMaybe<
    ReadonlyArray<IProductConfigurationParameterInput>
  >;
  readonly productId: Scalars['ID']['input'];
  readonly quantity?: InputMaybe<Scalars['Int']['input']>;
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
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly created: FieldWrapper<Scalars['Timestamp']['output']>;
  readonly payload?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  readonly type: FieldWrapper<Scalars['String']['output']>;
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
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  readonly key?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly options?: Maybe<ReadonlyArray<FieldWrapper<IFilterOption>>>;
  readonly texts?: Maybe<FieldWrapper<IFilterTexts>>;
  readonly type?: Maybe<FieldWrapper<IFilterType>>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

export type IFilterTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IFilterOption = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly texts?: Maybe<FieldWrapper<IFilterTexts>>;
  readonly value?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IFilterOptionTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IFilterQueryInput = {
  readonly key: Scalars['String']['input'];
  readonly value?: InputMaybe<Scalars['String']['input']>;
};

export type IFilterTexts = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly locale?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly subtitle?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
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
  readonly altitute?: Maybe<FieldWrapper<Scalars['Float']['output']>>;
  readonly latitude: FieldWrapper<Scalars['Float']['output']>;
  readonly longitude: FieldWrapper<Scalars['Float']['output']>;
};

export type ILanguage = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  readonly isBase?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  /** ISO 639-1 alpha-2 https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes */
  readonly isoCode?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly name?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export enum ILengthUnit {
  Feet = 'FEET',
  Meters = 'METERS',
  Millimeters = 'MILLIMETERS',
}

export type ILink = {
  readonly href?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type ILoadedFilter = {
  readonly definition: FieldWrapper<IFilter>;
  readonly filteredProductsCount: FieldWrapper<Scalars['Int']['output']>;
  readonly isSelected?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  readonly options?: Maybe<ReadonlyArray<FieldWrapper<ILoadedFilterOption>>>;
  readonly productsCount: FieldWrapper<Scalars['Int']['output']>;
};

export type ILoadedFilterOption = {
  readonly definition: FieldWrapper<IFilterOption>;
  readonly filteredProductsCount: FieldWrapper<Scalars['Int']['output']>;
  readonly isSelected?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
};

/** Type returned when the user logs in */
export type ILoginMethodResponse = {
  /** Id of the user logged in user */
  readonly id: FieldWrapper<Scalars['String']['output']>;
  /** Token of the connection */
  readonly token: FieldWrapper<Scalars['String']['output']>;
  /** Expiration date for the token */
  readonly tokenExpires: FieldWrapper<Scalars['DateTime']['output']>;
  /** The logged in user */
  readonly user?: Maybe<FieldWrapper<IUser>>;
};

export enum IMassUnit {
  Gram = 'GRAM',
  Kilogram = 'KILOGRAM',
  Pounds = 'POUNDS',
}

export type IMedia = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly name: FieldWrapper<Scalars['String']['output']>;
  readonly size: FieldWrapper<Scalars['Int']['output']>;
  readonly type: FieldWrapper<Scalars['String']['output']>;
  readonly url: FieldWrapper<Scalars['String']['output']>;
};

export type IMediaUrlArgs = {
  baseUrl?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

export type IMediaUploadTicket = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly expires: FieldWrapper<Scalars['DateTime']['output']>;
  readonly putURL: FieldWrapper<Scalars['String']['output']>;
};

export type IMutation = {
  /** Activate a enrollment by changing the status to ACTIVE */
  readonly activateEnrollment: FieldWrapper<IEnrollment>;
  /** Add a new filter to an assortment */
  readonly addAssortmentFilter: FieldWrapper<IAssortmentFilter>;
  /** Add a new child assortment to an assortment */
  readonly addAssortmentLink: FieldWrapper<IAssortmentLink>;
  /** Add a new media to a assortment */
  readonly addAssortmentMedia: FieldWrapper<IAssortmentMedia>;
  /** Add a new product to an assortment */
  readonly addAssortmentProduct: FieldWrapper<IAssortmentProduct>;
  /** Add a new discount to the cart, a new order gets generated with status = open (= order before checkout / cart) if necessary */
  readonly addCartDiscount: FieldWrapper<IOrderDiscount>;
  /** Add a new item to the cart. Order gets generated with status = open (= order before checkout / cart) if necessary. */
  readonly addCartProduct: FieldWrapper<IOrderItem>;
  /** Add a new quotation to the cart. */
  readonly addCartQuotation: FieldWrapper<IOrderItem>;
  /** Update E-Mail address of any user or logged in user if userId is not provided */
  readonly addEmail: FieldWrapper<IUser>;
  /** Add multiple new item to the cart. Order gets generated with status = open (= order before checkout / cart) if necessary. */
  readonly addMultipleCartProducts: ReadonlyArray<
    Maybe<FieldWrapper<IOrderItem>>
  >;
  /**
   * Link a new product to a ConfigurableProduct by providing a configuration
   * combination that uniquely identifies a row in the assignment matrix
   */
  readonly addProductAssignment: FieldWrapper<IProduct>;
  /** Add a new media to a product's visualization */
  readonly addProductMedia: FieldWrapper<IProductMedia>;
  /**
   * Add a vote to a ProductReview.
   * If there there is a previous vote from the user invoking this it will be removed and updated with the new vote
   */
  readonly addProductReviewVote: FieldWrapper<IProductReview>;
  /** Store user W3C Push subscription object */
  readonly addPushSubscription: FieldWrapper<IUser>;
  /** Web3 */
  readonly addWeb3Address: FieldWrapper<IUser>;
  /** Register WebAuthn Credentials for current user */
  readonly addWebAuthnCredentials: FieldWrapper<IUser>;
  /**
   * Add work to the work queue. Each type has its own input shape. If you pinpoint the worker by setting it
   * during creation, the work will be only run by the worker who identifies as that worker.
   */
  readonly addWork?: Maybe<FieldWrapper<IWork>>;
  /**
   * Get the next task from the worker queue. This will also mark the task as "started".
   * Optional worker to identify the worker.
   */
  readonly allocateWork?: Maybe<FieldWrapper<IWork>>;
  /**
   * Toggle Bookmark state on a product as currently logged in user,
   * Does not work when multiple bookmarks with different explicit meta configurations exist.
   * In those cases please use createBookmark and removeBookmark
   */
  readonly bookmark: FieldWrapper<IBookmark>;
  /** In order to activate TOTP, generate a secret and return */
  readonly buildSecretTOTPAuthURL: FieldWrapper<Scalars['String']['output']>;
  /** Change the current user's password. Must be logged in. */
  readonly changePassword?: Maybe<FieldWrapper<ISuccessResponse>>;
  /**
   * Process the checkout (automatically charge & deliver if possible), the cart will get
   * transformed to an ordinary order if everything goes well.
   */
  readonly checkoutCart: FieldWrapper<IOrder>;
  readonly confirmMediaUpload: FieldWrapper<IMedia>;
  /** Manually confirm an order which is in progress */
  readonly confirmOrder: FieldWrapper<IOrder>;
  /** Creates new assortment. */
  readonly createAssortment: FieldWrapper<IAssortment>;
  /** Create a bookmark for a specific user */
  readonly createBookmark: FieldWrapper<IBookmark>;
  /**
   * Creates an alternative cart. If you use this feature, you should use explicit orderId's when using the
   * cart mutations. Else it will work like a stack and the checkout will use the very first cart of the user.
   */
  readonly createCart: FieldWrapper<IOrder>;
  readonly createCountry: FieldWrapper<ICountry>;
  readonly createCurrency: FieldWrapper<ICurrency>;
  /** Creates new delivery provider */
  readonly createDeliveryProvider: FieldWrapper<IDeliveryProvider>;
  /** Create a enrollment. */
  readonly createEnrollment: FieldWrapper<IEnrollment>;
  /** Creates new Filter along with the user who created it. */
  readonly createFilter: FieldWrapper<IFilter>;
  /** Adds new option to filters */
  readonly createFilterOption: FieldWrapper<IFilter>;
  /** Adds new language along with the user who created it */
  readonly createLanguage: FieldWrapper<ILanguage>;
  /** Adds new payment provider */
  readonly createPaymentProvider: FieldWrapper<IPaymentProvider>;
  /** Create a new product */
  readonly createProduct: FieldWrapper<IProduct>;
  /** Adds one product as bundle for another products */
  readonly createProductBundleItem: FieldWrapper<IProduct>;
  /** Add a new ProductReview */
  readonly createProductReview: FieldWrapper<IProductReview>;
  /** Creates new product variation for a product. */
  readonly createProductVariation: FieldWrapper<IProductVariation>;
  /** Adds variation option to an existing product variations */
  readonly createProductVariationOption: FieldWrapper<IProductVariation>;
  /** Create a new user. */
  readonly createUser?: Maybe<FieldWrapper<ILoginMethodResponse>>;
  /** Creates new warehouse provider. */
  readonly createWarehousingProvider: FieldWrapper<IWarehousingProvider>;
  /** Create WebAuthn PublicKeyCredentialCreationOptions to use for Registering a new WebAuthn Device */
  readonly createWebAuthnCredentialCreationOptions: FieldWrapper<
    Scalars['JSON']['output']
  >;
  /** Create WebAuthn PublicKeyCredentialRequestrOptions to use for WebAuthn Login Flow */
  readonly createWebAuthnCredentialRequestOptions: FieldWrapper<
    Scalars['JSON']['output']
  >;
  /** Manually mark a undelivered order as delivered */
  readonly deliverOrder: FieldWrapper<IOrder>;
  /** Disable the 2nd factor (TOTP) */
  readonly disableTOTP: FieldWrapper<IUser>;
  /**
   * Remove all items of an open order (cart) if possible.
   * if you want to remove single cart item use removeCartItem instead
   */
  readonly emptyCart?: Maybe<FieldWrapper<IOrder>>;
  /** In order to activate 2nd factor (TOTP), generate a secret and return */
  readonly enableTOTP: FieldWrapper<IUser>;
  /** Enroll a new user, setting enroll to true will let the user choose his password (e-mail gets sent) */
  readonly enrollUser: FieldWrapper<IUser>;
  /** Tokenize */
  readonly exportToken: FieldWrapper<IToken>;
  /**
   * Register a work attempt manually.
   * Note: Usually, work attempts are handled internally by the inbuilt cron
   * worker. This mutation is part of the interface for "outside" workers.
   */
  readonly finishWork: FieldWrapper<IWork>;
  /** Request a forgot password email. */
  readonly forgotPassword?: Maybe<FieldWrapper<ISuccessResponse>>;
  /**
   * Update hearbeat (updates user activity information such as last
   * login and logged in user IP address, locale and country where they
   * accessed the system)
   */
  readonly heartbeat: FieldWrapper<IUser>;
  /** Impersonate a user */
  readonly impersonate: FieldWrapper<ILoginMethodResponse>;
  /** OAuth2 */
  readonly linkOAuthAccount: FieldWrapper<IUser>;
  /** Login as Guest User (creates an anonymous user and returns logged in token) */
  readonly loginAsGuest?: Maybe<FieldWrapper<ILoginMethodResponse>>;
  /** Log the user with OAuth2 service provider */
  readonly loginWithOAuth?: Maybe<FieldWrapper<ILoginMethodResponse>>;
  /** Log the user in with a password. */
  readonly loginWithPassword?: Maybe<FieldWrapper<ILoginMethodResponse>>;
  /** Log the user in with a WebAuthn device */
  readonly loginWithWebAuthn?: Maybe<FieldWrapper<ILoginMethodResponse>>;
  /** Log the user out. */
  readonly logout?: Maybe<FieldWrapper<ISuccessResponse>>;
  /** Log out all sessions related with user. */
  readonly logoutAllSessions?: Maybe<FieldWrapper<ISuccessResponse>>;
  /** Make a proposal as answer to the RFP by changing its status to PROCESSED */
  readonly makeQuotationProposal: FieldWrapper<IQuotation>;
  /** Make's the provided payment credential as the users preferred method of payment. */
  readonly markPaymentCredentialsPreferred?: Maybe<
    FieldWrapper<IPaymentCredentials>
  >;
  readonly pageView: FieldWrapper<Scalars['String']['output']>;
  /** Manually mark an unpaid/partially paid order as fully paid */
  readonly payOrder: FieldWrapper<IOrder>;
  readonly prepareAssortmentMediaUpload: FieldWrapper<IMediaUploadTicket>;
  readonly prepareProductMediaUpload: FieldWrapper<IMediaUploadTicket>;
  readonly prepareUserAvatarUpload: FieldWrapper<IMediaUploadTicket>;
  /**
   * This will pick up non-external work, execute, await result and finish
   * it up on the target system. This function allows you to do work queue "ticks"
   * from outside instead of waiting for default Cron and Event Listener to trigger
   * and can be helpful in serverless environments.
   */
  readonly processNextWork?: Maybe<FieldWrapper<IWork>>;
  /** Make the product visible on any shop listings (product queries) */
  readonly publishProduct: FieldWrapper<IProduct>;
  /**
   * Register credentials for an existing payment provider allowing to store and use them
   * for later payments (1-click checkout or enrollments)
   */
  readonly registerPaymentCredentials?: Maybe<
    FieldWrapper<IPaymentCredentials>
  >;
  /** Manually reject an order which is in progress */
  readonly rejectOrder: FieldWrapper<IOrder>;
  /** Reject an RFP, this is possible as long as a quotation is not fullfilled */
  readonly rejectQuotation: FieldWrapper<IQuotation>;
  /** Removes assortment with the provided ID */
  readonly removeAssortment: FieldWrapper<IAssortment>;
  /** Remove a product from an assortment */
  readonly removeAssortmentFilter: FieldWrapper<IAssortmentFilter>;
  /** Remove a child/parent assortment link from it's parent */
  readonly removeAssortmentLink: FieldWrapper<IAssortmentLink>;
  /** Remove a media asset from a assortment */
  readonly removeAssortmentMedia: FieldWrapper<IAssortmentMedia>;
  /** Remove a product from an assortment */
  readonly removeAssortmentProduct: FieldWrapper<IAssortmentProduct>;
  /** Remove an existing bookmark by ID */
  readonly removeBookmark: FieldWrapper<IBookmark>;
  /** Removes products bundle item found at the given 0 based index. */
  readonly removeBundleItem: FieldWrapper<IProduct>;
  /** Remove a discount from the cart */
  readonly removeCartDiscount: FieldWrapper<IOrderDiscount>;
  /** Remove an item from an open order */
  readonly removeCartItem: FieldWrapper<IOrderItem>;
  /** Deletes the specified country */
  readonly removeCountry: FieldWrapper<ICountry>;
  /** Deletes the specified currency */
  readonly removeCurrency: FieldWrapper<ICurrency>;
  /**
   * Deletes a delivery provider by setting the deleted field to current timestamp.
   * Note the delivery provider still exists.
   */
  readonly removeDeliveryProvider: FieldWrapper<IDeliveryProvider>;
  /** Update E-Mail address of any user or logged in user if userId is not provided */
  readonly removeEmail: FieldWrapper<IUser>;
  /** Deletes the specified filter */
  readonly removeFilter: FieldWrapper<IFilter>;
  /** Removes the filter option from the specified filter. */
  readonly removeFilterOption: FieldWrapper<IFilter>;
  /** Deletes the specified languages */
  readonly removeLanguage: FieldWrapper<ILanguage>;
  /** Remove an order while it's still open */
  readonly removeOrder: FieldWrapper<IOrder>;
  /** Deletes the specified payment credential. */
  readonly removePaymentCredentials?: Maybe<FieldWrapper<IPaymentCredentials>>;
  /**
   * Deletes the specified payment provider by setting the deleted filed to current timestamp.
   * Note the payment provider is still available only it’s status is deleted
   */
  readonly removePaymentProvider: FieldWrapper<IPaymentProvider>;
  /** Remove the product completely! */
  readonly removeProduct: FieldWrapper<IProduct>;
  /**
   * Unlinks a product from a ConfigurableProduct by providing a configuration
   * combination that uniquely identifies a row in the assignment matrix
   */
  readonly removeProductAssignment: FieldWrapper<IProduct>;
  /** Remove a media asset from a product's visualization */
  readonly removeProductMedia: FieldWrapper<IProductMedia>;
  /** Remove an existing ProductReview. The logic to allow/dissallow removal is controlled by product plugin logic */
  readonly removeProductReview: FieldWrapper<IProductReview>;
  /** Remove a vote from a ProductReview */
  readonly removeProductReviewVote: FieldWrapper<IProductReview>;
  /** Removes product variation with the provided ID */
  readonly removeProductVariation: FieldWrapper<IProductVariation>;
  /** Removes product option value for product variation with the provided variation option value */
  readonly removeProductVariationOption: FieldWrapper<IProductVariation>;
  /** Remove user W3C push subscription object */
  readonly removePushSubscription: FieldWrapper<IUser>;
  /** Remove any user or logged in user if userId is not provided */
  readonly removeUser: FieldWrapper<IUser>;
  /**
   * Deletes the specified warehousing provider by setting the deleted filed to current timestamp.
   * Note warehousing provider still exists in the system after successful
   * completing of this operation with status deleted.
   */
  readonly removeWarehousingProvider: FieldWrapper<IWarehousingProvider>;
  readonly removeWeb3Address: FieldWrapper<IUser>;
  /** Remove WebAuthn Credentials for current user */
  readonly removeWebAuthnCredentials: FieldWrapper<IUser>;
  /** Manually remove a work */
  readonly removeWork: FieldWrapper<IWork>;
  /** Reorder the products in an assortment */
  readonly reorderAssortmentFilters: ReadonlyArray<
    FieldWrapper<IAssortmentFilter>
  >;
  /** Reorder the child assortment links in it's parent */
  readonly reorderAssortmentLinks: ReadonlyArray<FieldWrapper<IAssortmentLink>>;
  /** Reorder a media asset (first is primary) */
  readonly reorderAssortmentMedia: ReadonlyArray<
    FieldWrapper<IAssortmentMedia>
  >;
  /** Reorder the products in an assortment */
  readonly reorderAssortmentProducts: ReadonlyArray<
    FieldWrapper<IAssortmentProduct>
  >;
  /** Reorder a media asset (first is primary) */
  readonly reorderProductMedia: ReadonlyArray<FieldWrapper<IProductMedia>>;
  /** Request for Proposal (RFP) for the specified product */
  readonly requestQuotation: FieldWrapper<IQuotation>;
  /** Reset the password for a user using a token received in email. Logs the user in afterwards. */
  readonly resetPassword?: Maybe<FieldWrapper<ILoginMethodResponse>>;
  /** Forcefully trigger an enrollment email for already added users by e-mail */
  readonly sendEnrollmentEmail?: Maybe<FieldWrapper<ISuccessResponse>>;
  /** Send an email with a link the user can use verify their email address. */
  readonly sendVerificationEmail?: Maybe<FieldWrapper<ISuccessResponse>>;
  /**
   * Makes the assortment provided as the base assortment and make
   * any other existing base assortment regular assortments.
   */
  readonly setBaseAssortment: FieldWrapper<IAssortment>;
  /**
   * Change the delivery method/provider to an order. If the delivery provider
   * doesn’t exists new delivery provider will be created with the provided ID.
   */
  readonly setOrderDeliveryProvider: FieldWrapper<IOrder>;
  /**
   * Change the payment method/provider to an order. If the payment provider
   * doesn’t exists new payment provider will be created with the provided ID.
   */
  readonly setOrderPaymentProvider: FieldWrapper<IOrder>;
  /** Set a new password for a specific user */
  readonly setPassword: FieldWrapper<IUser>;
  /** Set roles of a user */
  readonly setRoles: FieldWrapper<IUser>;
  /** Set tags of user */
  readonly setUserTags: FieldWrapper<IUser>;
  /** Set username for a specific user */
  readonly setUsername: FieldWrapper<IUser>;
  /** Sign a generic order payment */
  readonly signPaymentProviderForCheckout: FieldWrapper<
    Scalars['String']['output']
  >;
  /** Sign a generic payment provider for registration */
  readonly signPaymentProviderForCredentialRegistration?: Maybe<
    FieldWrapper<Scalars['String']['output']>
  >;
  /** End customer impersonated user session and resume the impersonator session */
  readonly stopImpersonation: FieldWrapper<ILoginMethodResponse>;
  /** Terminate an actively running enrollment by changing it's status to TERMINATED */
  readonly terminateEnrollment: FieldWrapper<IEnrollment>;
  readonly unlinkOAuthAccount: FieldWrapper<IUser>;
  /** Hide the product visible from any shop listings (product queries) */
  readonly unpublishProduct: FieldWrapper<IProduct>;
  /** Updates the provided assortment */
  readonly updateAssortment: FieldWrapper<IAssortment>;
  /** Modify localized texts part of a assortment media asset */
  readonly updateAssortmentMediaTexts: ReadonlyArray<
    FieldWrapper<IAssortmentMediaTexts>
  >;
  /** Modify localized texts part of an assortment */
  readonly updateAssortmentTexts: ReadonlyArray<FieldWrapper<IAssortmentTexts>>;
  /**
   * Change billing address and order contact of an open order (cart). All of the parameters
   * except order ID are optional and the update will ocure for parameters provided.
   * If the delivery provider or payment provider ID provided doesn’t already exist new order payment
   * will be created with the provided ID.
   */
  readonly updateCart: FieldWrapper<IOrder>;
  /**
   * Change the quantity or configuration of an item in an open order.align-baselineAll
   * of the parameters are optional except item ID and for the parameters provided the
   * update will be performed accordingly.
   */
  readonly updateCartItem: FieldWrapper<IOrderItem>;
  /** Updates provided country information */
  readonly updateCountry: FieldWrapper<ICountry>;
  /** Updates the specified currency */
  readonly updateCurrency: FieldWrapper<ICurrency>;
  /** Updates the delivery provider specified */
  readonly updateDeliveryProvider: FieldWrapper<IDeliveryProvider>;
  /** Update a enrollment */
  readonly updateEnrollment: FieldWrapper<IEnrollment>;
  /** Updates the specified filter with the information passed. */
  readonly updateFilter: FieldWrapper<IFilter>;
  /** Updates or created specified filter texts for filter with ID provided and locale and optionally filterOptionValue */
  readonly updateFilterTexts: ReadonlyArray<FieldWrapper<IFilterTexts>>;
  /** Updates the specified language. */
  readonly updateLanguage: FieldWrapper<ILanguage>;
  /** Update a Pick Up Delivery Provider's specific configuration */
  readonly updateOrderDeliveryPickUp: FieldWrapper<IOrderDeliveryPickUp>;
  /** Update a Shipping Delivery Provider's specific configuration */
  readonly updateOrderDeliveryShipping: FieldWrapper<IOrderDeliveryShipping>;
  /** Update a Card Payment Provider's specific configuration */
  readonly updateOrderPaymentCard: FieldWrapper<IOrderPaymentCard>;
  /** Update a Generic Payment Provider's specific configuration */
  readonly updateOrderPaymentGeneric: FieldWrapper<IOrderPaymentGeneric>;
  /** Update an Invoice Payment Provider's specific configuration */
  readonly updateOrderPaymentInvoice: FieldWrapper<IOrderPaymentInvoice>;
  /** Updates payment provider information with the provided ID */
  readonly updatePaymentProvider: FieldWrapper<IPaymentProvider>;
  /** Modify generic infos of a product (tags for ex.) */
  readonly updateProduct?: Maybe<FieldWrapper<IProduct>>;
  /** Modify commerce part of a product */
  readonly updateProductCommerce?: Maybe<FieldWrapper<IProduct>>;
  /** Modify localized texts part of a product's media asset */
  readonly updateProductMediaTexts: ReadonlyArray<
    FieldWrapper<IProductMediaTexts>
  >;
  /** Modify plan part of a product */
  readonly updateProductPlan?: Maybe<FieldWrapper<IProduct>>;
  /** Update an existing ProductReview. The logic to allow/dissallow editing is controlled by product plugin logic */
  readonly updateProductReview: FieldWrapper<IProductReview>;
  /** Modify delivery part of a product */
  readonly updateProductSupply?: Maybe<FieldWrapper<IProduct>>;
  /** Modify localized texts part of a product */
  readonly updateProductTexts: ReadonlyArray<FieldWrapper<IProductTexts>>;
  /** Modify tokenization part of a product */
  readonly updateProductTokenization?: Maybe<FieldWrapper<ITokenizedProduct>>;
  /**
   * Update product variation texts with the specified locales for product variations
   * that match the provided variation ID and production option value
   */
  readonly updateProductVariationTexts: ReadonlyArray<
    FieldWrapper<IProductVariationTexts>
  >;
  /** Modify warehousing part of a product */
  readonly updateProductWarehousing?: Maybe<FieldWrapper<IProduct>>;
  /** Update Avatar of any user or logged in user if userId is not provided */
  readonly updateUserAvatar: FieldWrapper<IUser>;
  /** Update Profile of any user or logged in user if userId is not provided */
  readonly updateUserProfile: FieldWrapper<IUser>;
  /** Updates warehousing provider information with the provided ID */
  readonly updateWarehousingProvider: FieldWrapper<IWarehousingProvider>;
  /** Marks the user's email address as verified. Logs the user in afterwards. */
  readonly verifyEmail?: Maybe<FieldWrapper<ILoginMethodResponse>>;
  /** Verify quotation request elligibility. and marks requested quotations as verified if it is */
  readonly verifyQuotation: FieldWrapper<IQuotation>;
  readonly verifyWeb3Address: FieldWrapper<IUser>;
};

export type IMutationActivateEnrollmentArgs = {
  enrollmentId: Scalars['ID']['input'];
};

export type IMutationAddAssortmentFilterArgs = {
  assortmentId: Scalars['ID']['input'];
  filterId: Scalars['ID']['input'];
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
};

export type IMutationAddAssortmentLinkArgs = {
  childAssortmentId: Scalars['ID']['input'];
  parentAssortmentId: Scalars['ID']['input'];
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
};

export type IMutationAddAssortmentMediaArgs = {
  assortmentId: Scalars['ID']['input'];
  media: Scalars['Upload']['input'];
};

export type IMutationAddAssortmentProductArgs = {
  assortmentId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
};

export type IMutationAddCartDiscountArgs = {
  code: Scalars['String']['input'];
  orderId?: InputMaybe<Scalars['ID']['input']>;
};

export type IMutationAddCartProductArgs = {
  configuration?: InputMaybe<
    ReadonlyArray<IProductConfigurationParameterInput>
  >;
  orderId?: InputMaybe<Scalars['ID']['input']>;
  productId: Scalars['ID']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type IMutationAddCartQuotationArgs = {
  configuration?: InputMaybe<
    ReadonlyArray<IProductConfigurationParameterInput>
  >;
  orderId?: InputMaybe<Scalars['ID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  quotationId: Scalars['ID']['input'];
};

export type IMutationAddEmailArgs = {
  email: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type IMutationAddMultipleCartProductsArgs = {
  items: ReadonlyArray<IOrderItemInput>;
  orderId?: InputMaybe<Scalars['ID']['input']>;
};

export type IMutationAddProductAssignmentArgs = {
  productId: Scalars['ID']['input'];
  proxyId: Scalars['ID']['input'];
  vectors: ReadonlyArray<IProductAssignmentVectorInput>;
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
  types?: InputMaybe<ReadonlyArray<InputMaybe<IWorkType>>>;
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
  vectors: ReadonlyArray<IProductAssignmentVectorInput>;
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
  sortKeys: ReadonlyArray<IReorderAssortmentFilterInput>;
};

export type IMutationReorderAssortmentLinksArgs = {
  sortKeys: ReadonlyArray<IReorderAssortmentLinkInput>;
};

export type IMutationReorderAssortmentMediaArgs = {
  sortKeys: ReadonlyArray<IReorderAssortmentMediaInput>;
};

export type IMutationReorderAssortmentProductsArgs = {
  sortKeys: ReadonlyArray<IReorderAssortmentProductInput>;
};

export type IMutationReorderProductMediaArgs = {
  sortKeys: ReadonlyArray<IReorderProductMediaInput>;
};

export type IMutationRequestQuotationArgs = {
  configuration?: InputMaybe<
    ReadonlyArray<IProductConfigurationParameterInput>
  >;
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
  roles: ReadonlyArray<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type IMutationSetUserTagsArgs = {
  tags: ReadonlyArray<InputMaybe<Scalars['LowerCaseString']['input']>>;
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
  texts: ReadonlyArray<IUpdateAssortmentMediaTextInput>;
};

export type IMutationUpdateAssortmentTextsArgs = {
  assortmentId: Scalars['ID']['input'];
  texts: ReadonlyArray<IUpdateAssortmentTextInput>;
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
  configuration?: InputMaybe<
    ReadonlyArray<IProductConfigurationParameterInput>
  >;
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
  texts: ReadonlyArray<IUpdateFilterTextInput>;
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
  texts: ReadonlyArray<IUpdateProductMediaTextInput>;
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
  texts: ReadonlyArray<IUpdateProductTextInput>;
};

export type IMutationUpdateProductTokenizationArgs = {
  productId: Scalars['ID']['input'];
  tokenization: IUpdateProductTokenizationInput;
};

export type IMutationUpdateProductVariationTextsArgs = {
  productVariationId: Scalars['ID']['input'];
  productVariationOptionValue?: InputMaybe<Scalars['String']['input']>;
  texts: ReadonlyArray<IUpdateProductVariationTextInput>;
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
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly authorizationCode: FieldWrapper<Scalars['String']['output']>;
  readonly provider: FieldWrapper<IOAuthProvider>;
};

export type IOAuthProvider = {
  readonly _id: FieldWrapper<Scalars['String']['output']>;
  readonly clientId: FieldWrapper<Scalars['String']['output']>;
  readonly scopes: ReadonlyArray<FieldWrapper<Scalars['String']['output']>>;
};

/** Just an order */
export type IOrder = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly billingAddress?: Maybe<FieldWrapper<IAddress>>;
  readonly confirmed?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly contact?: Maybe<FieldWrapper<IContact>>;
  readonly country?: Maybe<FieldWrapper<ICountry>>;
  readonly created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly currency?: Maybe<FieldWrapper<ICurrency>>;
  readonly delivery?: Maybe<FieldWrapper<IOrderDelivery>>;
  readonly discounts?: Maybe<ReadonlyArray<FieldWrapper<IOrderDiscount>>>;
  readonly enrollment?: Maybe<FieldWrapper<IEnrollment>>;
  readonly fullfilled?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly items?: Maybe<ReadonlyArray<FieldWrapper<IOrderItem>>>;
  readonly orderNumber?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly ordered?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly payment?: Maybe<FieldWrapper<IOrderPayment>>;
  readonly rejected?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly status?: Maybe<FieldWrapper<IOrderStatus>>;
  readonly supportedDeliveryProviders: ReadonlyArray<
    FieldWrapper<IDeliveryProvider>
  >;
  readonly supportedPaymentProviders: ReadonlyArray<
    FieldWrapper<IPaymentProvider>
  >;
  readonly total?: Maybe<FieldWrapper<IPrice>>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly user?: Maybe<FieldWrapper<IUser>>;
};

/** Just an order */
export type IOrderTotalArgs = {
  category?: InputMaybe<IOrderPriceCategory>;
};

export type IOrderDelivery = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly delivered?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly discounts?: Maybe<
    ReadonlyArray<FieldWrapper<IOrderDeliveryDiscount>>
  >;
  readonly fee?: Maybe<FieldWrapper<IPrice>>;
  readonly provider?: Maybe<FieldWrapper<IDeliveryProvider>>;
  readonly status?: Maybe<FieldWrapper<IOrderDeliveryStatus>>;
};

export type IOrderDeliveryDiscount = IOrderDiscountable & {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly delivery: FieldWrapper<IOrderDelivery>;
  readonly orderDiscount: FieldWrapper<IOrderDiscount>;
  readonly total: FieldWrapper<IPrice>;
};

export type IOrderDeliveryPickUp = IOrderDelivery & {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly activePickUpLocation?: Maybe<FieldWrapper<IOrderPickUpLocation>>;
  readonly delivered?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly discounts?: Maybe<
    ReadonlyArray<FieldWrapper<IOrderDeliveryDiscount>>
  >;
  readonly fee?: Maybe<FieldWrapper<IPrice>>;
  readonly pickUpLocations: ReadonlyArray<FieldWrapper<IOrderPickUpLocation>>;
  readonly provider?: Maybe<FieldWrapper<IDeliveryProvider>>;
  readonly status?: Maybe<FieldWrapper<IOrderDeliveryStatus>>;
};

export type IOrderDeliveryShipping = IOrderDelivery & {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly address?: Maybe<FieldWrapper<IAddress>>;
  readonly delivered?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly discounts?: Maybe<
    ReadonlyArray<FieldWrapper<IOrderDeliveryDiscount>>
  >;
  readonly fee?: Maybe<FieldWrapper<IPrice>>;
  readonly provider?: Maybe<FieldWrapper<IDeliveryProvider>>;
  readonly status?: Maybe<FieldWrapper<IOrderDeliveryStatus>>;
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
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly code?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly discounted?: Maybe<ReadonlyArray<FieldWrapper<IOrderDiscountable>>>;
  readonly interface?: Maybe<FieldWrapper<IDiscountInterface>>;
  readonly order: FieldWrapper<IOrder>;
  readonly total: FieldWrapper<IPrice>;
  readonly trigger: FieldWrapper<IOrderDiscountTrigger>;
};

export enum IOrderDiscountTrigger {
  /** System triggered */
  System = 'SYSTEM',
  /** User triggered */
  User = 'USER',
}

export type IOrderDiscountable = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly orderDiscount: FieldWrapper<IOrderDiscount>;
  readonly total: FieldWrapper<IPrice>;
};

export type IOrderGlobalDiscount = IOrderDiscountable & {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly order: FieldWrapper<IOrder>;
  readonly orderDiscount: FieldWrapper<IOrderDiscount>;
  readonly total: FieldWrapper<IPrice>;
};

export type IOrderItem = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly configuration?: Maybe<
    ReadonlyArray<FieldWrapper<IProductConfigurationParameter>>
  >;
  readonly discounts?: Maybe<ReadonlyArray<FieldWrapper<IOrderItemDiscount>>>;
  readonly dispatches?: Maybe<ReadonlyArray<FieldWrapper<IDispatch>>>;
  readonly order: FieldWrapper<IOrder>;
  readonly originalProduct: FieldWrapper<IProduct>;
  readonly product: FieldWrapper<IProduct>;
  readonly quantity: FieldWrapper<Scalars['Int']['output']>;
  readonly quotation?: Maybe<FieldWrapper<IQuotation>>;
  readonly total?: Maybe<FieldWrapper<IPrice>>;
  readonly unitPrice?: Maybe<FieldWrapper<IPrice>>;
};

export type IOrderItemTotalArgs = {
  category?: InputMaybe<IOrderItemPriceCategory>;
};

export type IOrderItemDiscount = IOrderDiscountable & {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly item: FieldWrapper<IOrderItem>;
  readonly orderDiscount: FieldWrapper<IOrderDiscount>;
  readonly total: FieldWrapper<IPrice>;
};

export type IOrderItemInput = {
  readonly configuration?: InputMaybe<
    ReadonlyArray<IProductConfigurationParameterInput>
  >;
  readonly productId: Scalars['ID']['input'];
  readonly quantity?: InputMaybe<Scalars['Int']['input']>;
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
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly discounts?: Maybe<
    ReadonlyArray<FieldWrapper<IOrderPaymentDiscount>>
  >;
  readonly fee?: Maybe<FieldWrapper<IPrice>>;
  readonly paid?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly provider?: Maybe<FieldWrapper<IPaymentProvider>>;
  readonly status?: Maybe<FieldWrapper<IOrderPaymentStatus>>;
};

export type IOrderPaymentCard = IOrderPayment & {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly discounts?: Maybe<
    ReadonlyArray<FieldWrapper<IOrderPaymentDiscount>>
  >;
  readonly fee?: Maybe<FieldWrapper<IPrice>>;
  readonly paid?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly provider?: Maybe<FieldWrapper<IPaymentProvider>>;
  readonly status?: Maybe<FieldWrapper<IOrderPaymentStatus>>;
};

export type IOrderPaymentDiscount = IOrderDiscountable & {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly orderDiscount: FieldWrapper<IOrderDiscount>;
  readonly payment: FieldWrapper<IOrderPayment>;
  readonly total: FieldWrapper<IPrice>;
};

export type IOrderPaymentGeneric = IOrderPayment & {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly discounts?: Maybe<
    ReadonlyArray<FieldWrapper<IOrderPaymentDiscount>>
  >;
  readonly fee?: Maybe<FieldWrapper<IPrice>>;
  readonly paid?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly provider?: Maybe<FieldWrapper<IPaymentProvider>>;
  readonly status?: Maybe<FieldWrapper<IOrderPaymentStatus>>;
};

export type IOrderPaymentInvoice = IOrderPayment & {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly discounts?: Maybe<
    ReadonlyArray<FieldWrapper<IOrderPaymentDiscount>>
  >;
  readonly fee?: Maybe<FieldWrapper<IPrice>>;
  readonly paid?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly provider?: Maybe<FieldWrapper<IPaymentProvider>>;
  readonly status?: Maybe<FieldWrapper<IOrderPaymentStatus>>;
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
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly address?: Maybe<FieldWrapper<IAddress>>;
  readonly geoPoint?: Maybe<FieldWrapper<IGeoPosition>>;
  readonly name: FieldWrapper<Scalars['String']['output']>;
  readonly order: FieldWrapper<IOrder>;
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
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly isPreferred: FieldWrapper<Scalars['Boolean']['output']>;
  readonly isValid: FieldWrapper<Scalars['Boolean']['output']>;
  readonly meta?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  readonly paymentProvider: FieldWrapper<IPaymentProvider>;
  readonly token?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  readonly user: FieldWrapper<IUser>;
};

export type IPaymentInterface = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly label?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly version?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IPaymentProvider = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly configuration?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  readonly configurationError?: Maybe<FieldWrapper<IPaymentProviderError>>;
  readonly created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly deleted?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly interface?: Maybe<FieldWrapper<IPaymentInterface>>;
  readonly isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  readonly simulatedPrice?: Maybe<FieldWrapper<IPrice>>;
  readonly type?: Maybe<FieldWrapper<IPaymentProviderType>>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
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
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly assortmentPaths: ReadonlyArray<FieldWrapper<IProductAssortmentPath>>;
  readonly catalogPrice?: Maybe<FieldWrapper<IPrice>>;
  readonly created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly defaultOrderQuantity?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  readonly leveledCatalogPrices: ReadonlyArray<FieldWrapper<IPriceLevel>>;
  readonly media: ReadonlyArray<FieldWrapper<IProductMedia>>;
  readonly plan?: Maybe<FieldWrapper<IProductPlanConfiguration>>;
  readonly published?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly reviews: ReadonlyArray<FieldWrapper<IProductReview>>;
  readonly reviewsCount: FieldWrapper<Scalars['Int']['output']>;
  readonly salesQuantityPerUnit?: Maybe<
    FieldWrapper<Scalars['String']['output']>
  >;
  readonly salesUnit?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly sequence: FieldWrapper<Scalars['Int']['output']>;
  readonly siblings: ReadonlyArray<FieldWrapper<IProduct>>;
  readonly simulatedPrice?: Maybe<FieldWrapper<IPrice>>;
  readonly status: FieldWrapper<IProductStatus>;
  readonly tags?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['LowerCaseString']['output']>>
  >;
  readonly texts?: Maybe<FieldWrapper<IProductTexts>>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
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
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
};

/** Plan (Virtual Product that somebody can enroll to) */
export type IPlanProductReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
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
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly amount: FieldWrapper<Scalars['Int']['output']>;
  readonly currency: FieldWrapper<Scalars['String']['output']>;
  readonly isNetPrice: FieldWrapper<Scalars['Boolean']['output']>;
  readonly isTaxable: FieldWrapper<Scalars['Boolean']['output']>;
};

export type IPriceLevel = {
  readonly maxQuantity?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  readonly minQuantity: FieldWrapper<Scalars['Int']['output']>;
  readonly price: FieldWrapper<IPrice>;
};

export type IPriceRange = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly maxPrice: FieldWrapper<IPrice>;
  readonly minPrice: FieldWrapper<IPrice>;
};

/** Abstract Product */
export type IProduct = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly assortmentPaths: ReadonlyArray<FieldWrapper<IProductAssortmentPath>>;
  readonly created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly media: ReadonlyArray<FieldWrapper<IProductMedia>>;
  readonly published?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly reviews: ReadonlyArray<FieldWrapper<IProductReview>>;
  readonly reviewsCount: FieldWrapper<Scalars['Int']['output']>;
  readonly sequence: FieldWrapper<Scalars['Int']['output']>;
  readonly siblings: ReadonlyArray<FieldWrapper<IProduct>>;
  readonly status: FieldWrapper<IProductStatus>;
  readonly tags?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['LowerCaseString']['output']>>
  >;
  readonly texts?: Maybe<FieldWrapper<IProductTexts>>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

/** Abstract Product */
export type IProductMediaArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
};

/** Abstract Product */
export type IProductReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
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
  readonly key: Scalars['String']['input'];
  readonly value: Scalars['String']['input'];
};

/** Directed assortment to product paths (breadcrumbs) */
export type IProductAssortmentPath = {
  readonly assortmentProduct: FieldWrapper<IAssortmentProduct>;
  readonly links: ReadonlyArray<FieldWrapper<IAssortmentPathLink>>;
};

export type IProductBundleItem = {
  readonly configuration?: Maybe<
    ReadonlyArray<FieldWrapper<IProductConfigurationParameter>>
  >;
  readonly product: FieldWrapper<IProduct>;
  readonly quantity: FieldWrapper<Scalars['Int']['output']>;
};

export type IProductCatalogPrice = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly amount: FieldWrapper<Scalars['Int']['output']>;
  readonly country: FieldWrapper<ICountry>;
  readonly currency: FieldWrapper<ICurrency>;
  readonly isNetPrice: FieldWrapper<Scalars['Boolean']['output']>;
  readonly isTaxable: FieldWrapper<Scalars['Boolean']['output']>;
  readonly maxQuantity?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
};

export type IProductConfigurationParameter = {
  readonly key: FieldWrapper<Scalars['String']['output']>;
  readonly value: FieldWrapper<Scalars['String']['output']>;
};

export type IProductConfigurationParameterInput = {
  readonly key: Scalars['String']['input'];
  readonly value: Scalars['String']['input'];
};

export type IProductDiscount = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly interface?: Maybe<FieldWrapper<IDiscountInterface>>;
  readonly total: FieldWrapper<IPrice>;
};

export type IProductMedia = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly file: FieldWrapper<IMedia>;
  readonly sortKey: FieldWrapper<Scalars['Int']['output']>;
  readonly tags?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['LowerCaseString']['output']>>
  >;
  readonly texts?: Maybe<FieldWrapper<IProductMediaTexts>>;
};

export type IProductMediaTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IProductMediaTexts = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly locale?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly subtitle?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IProductPlanConfiguration = {
  readonly billingInterval: FieldWrapper<IProductPlanConfigurationInterval>;
  readonly billingIntervalCount?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  readonly trialInterval?: Maybe<
    FieldWrapper<IProductPlanConfigurationInterval>
  >;
  readonly trialIntervalCount?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  readonly usageCalculationType: FieldWrapper<IProductPlanUsageCalculationType>;
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
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly author: FieldWrapper<IUser>;
  readonly created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly deleted?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly ownVotes: ReadonlyArray<FieldWrapper<IProductReviewVote>>;
  readonly product: FieldWrapper<IProduct>;
  readonly rating?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  readonly review?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly voteCount?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
};

export type IProductReviewVoteCountArgs = {
  type?: InputMaybe<IProductReviewVoteType>;
};

export type IProductReviewInput = {
  readonly rating?: InputMaybe<Scalars['Int']['input']>;
  readonly review?: InputMaybe<Scalars['String']['input']>;
  readonly title?: InputMaybe<Scalars['String']['input']>;
};

export type IProductReviewVote = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly timestamp: FieldWrapper<Scalars['Timestamp']['output']>;
  readonly type: FieldWrapper<IProductReviewVoteType>;
};

export enum IProductReviewVoteType {
  Downvote = 'DOWNVOTE',
  Report = 'REPORT',
  Upvote = 'UPVOTE',
}

/** Search result */
export type IProductSearchResult = {
  readonly filteredProductsCount: FieldWrapper<Scalars['Int']['output']>;
  readonly filters: ReadonlyArray<FieldWrapper<ILoadedFilter>>;
  readonly products: ReadonlyArray<FieldWrapper<IProduct>>;
  readonly productsCount: FieldWrapper<Scalars['Int']['output']>;
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
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly brand?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly description?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly labels?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['String']['output']>>
  >;
  readonly locale?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly slug?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly subtitle?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly vendor?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IProductVariation = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly key?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly options?: Maybe<
    ReadonlyArray<FieldWrapper<IProductVariationOption>>
  >;
  readonly texts?: Maybe<FieldWrapper<IProductVariationTexts>>;
  readonly type?: Maybe<FieldWrapper<IProductVariationType>>;
};

export type IProductVariationTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

/** Key Value Combination to Product Assignment */
export type IProductVariationAssignment = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  /** Assigned Product */
  readonly product?: Maybe<FieldWrapper<IProduct>>;
  /** Query string key=val&key=val ... */
  readonly vectors?: Maybe<
    ReadonlyArray<FieldWrapper<IProductVariationAssignmentVector>>
  >;
};

/** Key Value Combination */
export type IProductVariationAssignmentVector = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly option?: Maybe<FieldWrapper<IProductVariationOption>>;
  readonly variation?: Maybe<FieldWrapper<IProductVariation>>;
};

export type IProductVariationOption = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly texts?: Maybe<FieldWrapper<IProductVariationTexts>>;
  readonly value?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IProductVariationOptionTextsArgs = {
  forceLocale?: InputMaybe<Scalars['String']['input']>;
};

export type IProductVariationTexts = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly locale?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly subtitle?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly title?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export enum IProductVariationType {
  /** Color Picker */
  Color = 'COLOR',
  /** Text Answers */
  Text = 'TEXT',
}

export type IPushSubscription = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly endpoint: FieldWrapper<Scalars['String']['output']>;
  readonly expirationTime?: Maybe<FieldWrapper<Scalars['Timestamp']['output']>>;
  readonly userAgent?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IQuery = {
  /** Get List of currently registered worker plugins */
  readonly activeWorkTypes: ReadonlyArray<FieldWrapper<IWorkType>>;
  /** Get a specific assortment by ID */
  readonly assortment?: Maybe<FieldWrapper<IAssortment>>;
  /** Get all root assortments, by default sorted by sequence (ascending) */
  readonly assortments: ReadonlyArray<FieldWrapper<IAssortment>>;
  /** Returns total number of assortments that match a given criteria or all if no criteria is given */
  readonly assortmentsCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get all countries, by default sorted by creation date (ascending) */
  readonly countries: ReadonlyArray<FieldWrapper<ICountry>>;
  /** Returns total number of countries */
  readonly countriesCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific country by ID */
  readonly country?: Maybe<FieldWrapper<ICountry>>;
  /** Get all currencies, by default sorted by creation date (ascending) */
  readonly currencies: ReadonlyArray<FieldWrapper<ICurrency>>;
  /** Returns total number of currencies */
  readonly currenciesCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific currency by ID */
  readonly currency?: Maybe<FieldWrapper<ICurrency>>;
  /** Get all delivery interfaces filtered by type */
  readonly deliveryInterfaces: ReadonlyArray<FieldWrapper<IDeliveryInterface>>;
  /** Get a specific delivery provider by ID */
  readonly deliveryProvider?: Maybe<FieldWrapper<IDeliveryProvider>>;
  /** Get all delivery providers, optionally filtered by type */
  readonly deliveryProviders: ReadonlyArray<FieldWrapper<IDeliveryProvider>>;
  /** Returns total number of delivery providers, optionally filtered by type */
  readonly deliveryProvidersCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific quotation by ID */
  readonly enrollment?: Maybe<FieldWrapper<IEnrollment>>;
  /** Get all enrollments, by default sorted by creation date (ascending) */
  readonly enrollments: ReadonlyArray<FieldWrapper<IEnrollment>>;
  /** Returns total number of enrollments */
  readonly enrollmentsCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific work unit by ID */
  readonly event?: Maybe<FieldWrapper<IEvent>>;
  /** Get all emitted events, by default sorted by creation date (desc) */
  readonly events: ReadonlyArray<FieldWrapper<IEvent>>;
  /** Get total count of all emitted events */
  readonly eventsCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific filter by ID */
  readonly filter?: Maybe<FieldWrapper<IFilter>>;
  /** Get all filters, by default sorted by creation date (ascending) */
  readonly filters: ReadonlyArray<FieldWrapper<IFilter>>;
  /** Returns total number of filters */
  readonly filtersCount: FieldWrapper<Scalars['Int']['output']>;
  /** User impersonating current user session using the  impersonate API */
  readonly impersonator?: Maybe<FieldWrapper<IUser>>;
  /** Get a specific language */
  readonly language?: Maybe<FieldWrapper<ILanguage>>;
  /** Get all languages, by default sorted by creation date (ascending) */
  readonly languages: ReadonlyArray<Maybe<FieldWrapper<ILanguage>>>;
  /** Returns total number languages */
  readonly languagesCount: FieldWrapper<Scalars['Int']['output']>;
  /** Currently logged in user */
  readonly me?: Maybe<FieldWrapper<IUser>>;
  /** Get a specific single order */
  readonly order?: Maybe<FieldWrapper<IOrder>>;
  /** Get all orders, by default sorted by creation date (descending) */
  readonly orders: ReadonlyArray<FieldWrapper<IOrder>>;
  /** Returns total number of orders */
  readonly ordersCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get all payment interfaces filtered by type */
  readonly paymentInterfaces: ReadonlyArray<FieldWrapper<IPaymentInterface>>;
  /** Get a specific payment provider by ID */
  readonly paymentProvider?: Maybe<FieldWrapper<IPaymentProvider>>;
  /** Get all payment providers, optionally filtered by type */
  readonly paymentProviders: ReadonlyArray<FieldWrapper<IPaymentProvider>>;
  /** Returns total number of payment providers, optionally filtered by type */
  readonly paymentProvidersCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific product by id or slug */
  readonly product?: Maybe<FieldWrapper<IProduct>>;
  /** List products specified prices */
  readonly productCatalogPrices: ReadonlyArray<
    FieldWrapper<IProductCatalogPrice>
  >;
  /** Get a specific product review by ID */
  readonly productReview: FieldWrapper<IProductReview>;
  /** Get all product reviews, by default sorted by creation date (descending) */
  readonly productReviews: ReadonlyArray<FieldWrapper<IProductReview>>;
  /** Returns total number of product reviews */
  readonly productReviewsCount: FieldWrapper<Scalars['Int']['output']>;
  /**
   * Simple list of published products filtered either by tags or explicit slugs
   * If a slug is provided, limit and offset don't have any effect on the result
   * By default sorted by sequence (ascending) and published (ascending) unless a queryString is set
   */
  readonly products: ReadonlyArray<FieldWrapper<IProduct>>;
  /**
   * Return total number of published products filtered either by tags or explicit slugs
   * If a slug is provided
   */
  readonly productsCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific quotation by ID */
  readonly quotation?: Maybe<FieldWrapper<IQuotation>>;
  /** Get all quotations, by default sorted by creation date (ascending) */
  readonly quotations: ReadonlyArray<FieldWrapper<IQuotation>>;
  /** Returns total number of quotations */
  readonly quotationsCount: FieldWrapper<Scalars['Int']['output']>;
  /** Search assortments */
  readonly searchAssortments: FieldWrapper<IAssortmentSearchResult>;
  /** Search products */
  readonly searchProducts: FieldWrapper<IProductSearchResult>;
  /** Get shop-global data and the resolved country/language pair */
  readonly shopInfo: FieldWrapper<IShop>;
  /** Get token */
  readonly token?: Maybe<FieldWrapper<IToken>>;
  /** Localization: Media title/subtitle of a media that is attached to a assortment */
  readonly translatedAssortmentMediaTexts: ReadonlyArray<
    FieldWrapper<IAssortmentMediaTexts>
  >;
  /** Localization: Meta data for assortments */
  readonly translatedAssortmentTexts: ReadonlyArray<
    FieldWrapper<IAssortmentTexts>
  >;
  /** Localization: Filters and Filter Options */
  readonly translatedFilterTexts: ReadonlyArray<FieldWrapper<IFilterTexts>>;
  /** Localization: Media title/subtitle of a media that is attached to a product */
  readonly translatedProductMediaTexts: ReadonlyArray<
    FieldWrapper<IProductMediaTexts>
  >;
  /** Localization: Meta data for product */
  readonly translatedProductTexts: ReadonlyArray<FieldWrapper<IProductTexts>>;
  /** Localization: Variations and Variation Options */
  readonly translatedProductVariationTexts: ReadonlyArray<
    FieldWrapper<IProductVariationTexts>
  >;
  /** Specific user data if userId provided, else returns currently logged in */
  readonly user?: Maybe<FieldWrapper<IUser>>;
  /** Get list of users, by default sorted by creation date (ascending) unless a queryString is set */
  readonly users: ReadonlyArray<FieldWrapper<IUser>>;
  /** Get total number of users in the system that match query */
  readonly usersCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get all warehousing interfaces filtered by type */
  readonly warehousingInterfaces: ReadonlyArray<
    FieldWrapper<IWarehousingInterface>
  >;
  /** Get a specific warehousing provider by ID */
  readonly warehousingProvider?: Maybe<FieldWrapper<IWarehousingProvider>>;
  /** Get all warehousing providers, optionally filtered by type */
  readonly warehousingProviders: ReadonlyArray<
    FieldWrapper<IWarehousingProvider>
  >;
  /** Returns total number of delivery providers, optionally filtered by type */
  readonly warehousingProvidersCount: FieldWrapper<Scalars['Int']['output']>;
  /** Get a specific work unit by ID */
  readonly work?: Maybe<FieldWrapper<IWork>>;
  /** Get all work from the queue, by default sorted by start date (desc), priority (desc), originalWorkId (asc) and created (asc) */
  readonly workQueue: ReadonlyArray<FieldWrapper<IWork>>;
  /** Return total number of workers filtered the provided arguments */
  readonly workQueueCount: FieldWrapper<Scalars['Int']['output']>;
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
  slugs?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
};

export type IQueryAssortmentsCountArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  includeLeaves?: InputMaybe<Scalars['Boolean']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  slugs?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
};

export type IQueryCountriesArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
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
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
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
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
  status?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
};

export type IQueryEnrollmentsCountArgs = {
  queryString?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
};

export type IQueryEventArgs = {
  eventId: Scalars['ID']['input'];
};

export type IQueryEventsArgs = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
  types?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
};

export type IQueryEventsCountArgs = {
  created?: InputMaybe<Scalars['DateTime']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  types?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
};

export type IQueryFilterArgs = {
  filterId?: InputMaybe<Scalars['ID']['input']>;
};

export type IQueryFiltersArgs = {
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
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
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
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
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
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
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
};

export type IQueryProductReviewsCountArgs = {
  queryString?: InputMaybe<Scalars['String']['input']>;
};

export type IQueryProductsArgs = {
  includeDrafts?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  slugs?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
};

export type IQueryProductsCountArgs = {
  includeDrafts?: InputMaybe<Scalars['Boolean']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  slugs?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
};

export type IQueryQuotationArgs = {
  quotationId: Scalars['ID']['input'];
};

export type IQueryQuotationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
};

export type IQueryQuotationsCountArgs = {
  queryString?: InputMaybe<Scalars['String']['input']>;
};

export type IQuerySearchAssortmentsArgs = {
  assortmentIds?: InputMaybe<ReadonlyArray<Scalars['ID']['input']>>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<ISearchOrderBy>;
  queryString?: InputMaybe<Scalars['String']['input']>;
};

export type IQuerySearchProductsArgs = {
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  filterQuery?: InputMaybe<ReadonlyArray<IFilterQueryInput>>;
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
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
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
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
  status?: InputMaybe<ReadonlyArray<IWorkStatus>>;
  types?: InputMaybe<ReadonlyArray<IWorkType>>;
};

export type IQueryWorkQueueCountArgs = {
  created?: InputMaybe<IDateFilterInput>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ReadonlyArray<IWorkStatus>>;
  types?: InputMaybe<ReadonlyArray<IWorkType>>;
};

/** Quotation */
export type IQuotation = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly configuration?: Maybe<
    ReadonlyArray<FieldWrapper<IProductConfigurationParameter>>
  >;
  readonly country?: Maybe<FieldWrapper<ICountry>>;
  readonly created: FieldWrapper<Scalars['DateTime']['output']>;
  readonly currency?: Maybe<FieldWrapper<ICurrency>>;
  readonly expires?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly fullfilled?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly isExpired?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  readonly product: FieldWrapper<IProduct>;
  readonly quotationNumber?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly rejected?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly status: FieldWrapper<IQuotationStatus>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly user: FieldWrapper<IUser>;
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
  readonly assortmentFilterId: Scalars['ID']['input'];
  readonly sortKey: Scalars['Int']['input'];
};

export type IReorderAssortmentLinkInput = {
  readonly assortmentLinkId: Scalars['ID']['input'];
  readonly sortKey: Scalars['Int']['input'];
};

export type IReorderAssortmentMediaInput = {
  readonly assortmentMediaId: Scalars['ID']['input'];
  readonly sortKey: Scalars['Int']['input'];
};

export type IReorderAssortmentProductInput = {
  readonly assortmentProductId: Scalars['ID']['input'];
  readonly sortKey: Scalars['Int']['input'];
};

export type IReorderProductMediaInput = {
  readonly productMediaId: Scalars['ID']['input'];
  readonly sortKey: Scalars['Int']['input'];
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
  readonly filteredProductsCount: FieldWrapper<Scalars['Int']['output']>;
  readonly filters: ReadonlyArray<FieldWrapper<ILoadedFilter>>;
  readonly products: ReadonlyArray<FieldWrapper<IProduct>>;
  readonly productsCount: FieldWrapper<Scalars['Int']['output']>;
};

/** Search result */
export type ISearchResultProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type IShop = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly adminUiConfig: FieldWrapper<IAdminUiConfig>;
  readonly country?: Maybe<FieldWrapper<ICountry>>;
  readonly externalLinks: ReadonlyArray<Maybe<FieldWrapper<ILink>>>;
  readonly language?: Maybe<FieldWrapper<ILanguage>>;
  readonly oAuthProviders: ReadonlyArray<FieldWrapper<IOAuthProvider>>;
  readonly userRoles: ReadonlyArray<FieldWrapper<Scalars['String']['output']>>;
  readonly vapidPublicKey?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly version?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

/** Simple Product */
export type ISimpleProduct = IProduct & {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly assortmentPaths: ReadonlyArray<FieldWrapper<IProductAssortmentPath>>;
  readonly baseUnit?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly catalogPrice?: Maybe<FieldWrapper<IPrice>>;
  readonly created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly defaultOrderQuantity?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  readonly dimensions?: Maybe<FieldWrapper<IDimensions>>;
  readonly leveledCatalogPrices: ReadonlyArray<FieldWrapper<IPriceLevel>>;
  readonly media: ReadonlyArray<FieldWrapper<IProductMedia>>;
  readonly published?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly reviews: ReadonlyArray<FieldWrapper<IProductReview>>;
  readonly reviewsCount: FieldWrapper<Scalars['Int']['output']>;
  readonly salesQuantityPerUnit?: Maybe<
    FieldWrapper<Scalars['String']['output']>
  >;
  readonly salesUnit?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly sequence: FieldWrapper<Scalars['Int']['output']>;
  readonly siblings: ReadonlyArray<FieldWrapper<IProduct>>;
  readonly simulatedDispatches?: Maybe<ReadonlyArray<FieldWrapper<IDispatch>>>;
  readonly simulatedPrice?: Maybe<FieldWrapper<IPrice>>;
  readonly simulatedStocks?: Maybe<ReadonlyArray<FieldWrapper<IStock>>>;
  readonly sku?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly status: FieldWrapper<IProductStatus>;
  readonly tags?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['LowerCaseString']['output']>>
  >;
  readonly texts?: Maybe<FieldWrapper<IProductTexts>>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
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
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
};

/** Simple Product */
export type ISimpleProductReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
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
  readonly key: Scalars['String']['input'];
  readonly value: ISortDirection;
};

export type IStock = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly deliveryProvider?: Maybe<FieldWrapper<IDeliveryProvider>>;
  readonly quantity?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  readonly warehousingProvider?: Maybe<FieldWrapper<IWarehousingProvider>>;
};

export type ISuccessResponse = {
  readonly success?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
};

export type IToken = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly chainId?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly chainTokenId?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly contractAddress?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly ercMetadata?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  readonly product: FieldWrapper<ITokenizedProduct>;
  readonly quantity: FieldWrapper<Scalars['Int']['output']>;
  readonly status: FieldWrapper<ITokenExportStatus>;
  readonly user?: Maybe<FieldWrapper<IUser>>;
  readonly walletAddress?: Maybe<FieldWrapper<Scalars['String']['output']>>;
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
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly assortmentPaths: ReadonlyArray<FieldWrapper<IProductAssortmentPath>>;
  readonly catalogPrice?: Maybe<FieldWrapper<IPrice>>;
  readonly contractAddress?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly contractConfiguration?: Maybe<FieldWrapper<IContractConfiguration>>;
  readonly contractStandard?: Maybe<FieldWrapper<ISmartContractStandard>>;
  readonly created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly leveledCatalogPrices: ReadonlyArray<FieldWrapper<IPriceLevel>>;
  readonly media: ReadonlyArray<FieldWrapper<IProductMedia>>;
  readonly published?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly reviews: ReadonlyArray<FieldWrapper<IProductReview>>;
  readonly reviewsCount: FieldWrapper<Scalars['Int']['output']>;
  readonly sequence: FieldWrapper<Scalars['Int']['output']>;
  readonly siblings: ReadonlyArray<FieldWrapper<IProduct>>;
  readonly simulatedPrice?: Maybe<FieldWrapper<IPrice>>;
  readonly simulatedStocks?: Maybe<ReadonlyArray<FieldWrapper<IStock>>>;
  readonly status: FieldWrapper<IProductStatus>;
  readonly tags?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['LowerCaseString']['output']>>
  >;
  readonly texts?: Maybe<FieldWrapper<IProductTexts>>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
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
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
};

/** Tokenized Product (Blockchain materialized Product) */
export type ITokenizedProductReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
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
  readonly isActive?: InputMaybe<Scalars['Boolean']['input']>;
  readonly isRoot?: InputMaybe<Scalars['Boolean']['input']>;
  readonly sequence?: InputMaybe<Scalars['Int']['input']>;
  readonly tags?: InputMaybe<
    ReadonlyArray<Scalars['LowerCaseString']['input']>
  >;
};

export type IUpdateAssortmentMediaTextInput = {
  readonly locale: Scalars['String']['input'];
  readonly subtitle?: InputMaybe<Scalars['String']['input']>;
  readonly title?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateAssortmentTextInput = {
  readonly description?: InputMaybe<Scalars['String']['input']>;
  readonly locale: Scalars['String']['input'];
  readonly slug?: InputMaybe<Scalars['String']['input']>;
  readonly subtitle?: InputMaybe<Scalars['String']['input']>;
  readonly title?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateCountryInput = {
  readonly defaultCurrencyId?: InputMaybe<Scalars['String']['input']>;
  readonly isActive?: InputMaybe<Scalars['Boolean']['input']>;
  readonly isoCode: Scalars['String']['input'];
};

export type IUpdateCurrencyInput = {
  readonly contractAddress?: InputMaybe<Scalars['String']['input']>;
  readonly decimals?: InputMaybe<Scalars['Int']['input']>;
  readonly isActive?: InputMaybe<Scalars['Boolean']['input']>;
  readonly isoCode: Scalars['String']['input'];
};

export type IUpdateFilterInput = {
  readonly isActive?: InputMaybe<Scalars['Boolean']['input']>;
  readonly key?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateFilterTextInput = {
  readonly locale: Scalars['String']['input'];
  readonly subtitle?: InputMaybe<Scalars['String']['input']>;
  readonly title?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateLanguageInput = {
  readonly isActive?: InputMaybe<Scalars['Boolean']['input']>;
  readonly isoCode: Scalars['String']['input'];
};

export type IUpdateProductCommerceInput = {
  readonly pricing: ReadonlyArray<IUpdateProductCommercePricingInput>;
};

export type IUpdateProductCommercePricingInput = {
  readonly amount: Scalars['Int']['input'];
  readonly countryCode: Scalars['String']['input'];
  readonly currencyCode: Scalars['String']['input'];
  readonly isNetPrice?: InputMaybe<Scalars['Boolean']['input']>;
  readonly isTaxable?: InputMaybe<Scalars['Boolean']['input']>;
  readonly maxQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type IUpdateProductInput = {
  readonly meta?: InputMaybe<Scalars['JSON']['input']>;
  readonly sequence?: InputMaybe<Scalars['Int']['input']>;
  readonly tags?: InputMaybe<
    ReadonlyArray<Scalars['LowerCaseString']['input']>
  >;
};

export type IUpdateProductMediaTextInput = {
  readonly locale: Scalars['String']['input'];
  readonly subtitle?: InputMaybe<Scalars['String']['input']>;
  readonly title?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateProductPlanInput = {
  readonly billingInterval: IProductPlanConfigurationInterval;
  readonly billingIntervalCount?: InputMaybe<Scalars['Int']['input']>;
  readonly trialInterval?: InputMaybe<IProductPlanConfigurationInterval>;
  readonly trialIntervalCount?: InputMaybe<Scalars['Int']['input']>;
  readonly usageCalculationType: IProductPlanUsageCalculationType;
};

export type IUpdateProductSupplyInput = {
  readonly heightInMillimeters?: InputMaybe<Scalars['Int']['input']>;
  readonly lengthInMillimeters?: InputMaybe<Scalars['Int']['input']>;
  readonly weightInGram?: InputMaybe<Scalars['Int']['input']>;
  readonly widthInMillimeters?: InputMaybe<Scalars['Int']['input']>;
};

export type IUpdateProductTextInput = {
  readonly brand?: InputMaybe<Scalars['String']['input']>;
  readonly description?: InputMaybe<Scalars['String']['input']>;
  readonly labels?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly locale: Scalars['String']['input'];
  readonly slug?: InputMaybe<Scalars['String']['input']>;
  readonly subtitle?: InputMaybe<Scalars['String']['input']>;
  readonly title?: InputMaybe<Scalars['String']['input']>;
  readonly vendor?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateProductTokenizationInput = {
  readonly contractAddress: Scalars['String']['input'];
  readonly contractStandard: ISmartContractStandard;
  readonly ercMetadataProperties?: InputMaybe<Scalars['JSON']['input']>;
  readonly supply: Scalars['Int']['input'];
  readonly tokenId: Scalars['String']['input'];
};

export type IUpdateProductVariationTextInput = {
  readonly locale: Scalars['String']['input'];
  readonly subtitle?: InputMaybe<Scalars['String']['input']>;
  readonly title?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateProductWarehousingInput = {
  readonly baseUnit?: InputMaybe<Scalars['String']['input']>;
  readonly sku?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateProviderInput = {
  readonly configuration?: InputMaybe<ReadonlyArray<Scalars['JSON']['input']>>;
};

export type IUser = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly allowedActions: ReadonlyArray<FieldWrapper<IRoleAction>>;
  readonly avatar?: Maybe<FieldWrapper<IMedia>>;
  readonly bookmarks: ReadonlyArray<FieldWrapper<IBookmark>>;
  readonly cart?: Maybe<FieldWrapper<IOrder>>;
  readonly country?: Maybe<FieldWrapper<ICountry>>;
  readonly created: FieldWrapper<Scalars['DateTime']['output']>;
  readonly deleted?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly emails?: Maybe<ReadonlyArray<FieldWrapper<IUserEmail>>>;
  readonly enrollments: ReadonlyArray<FieldWrapper<IEnrollment>>;
  readonly isGuest: FieldWrapper<Scalars['Boolean']['output']>;
  readonly isInitialPassword: FieldWrapper<Scalars['Boolean']['output']>;
  readonly isTwoFactorEnabled: FieldWrapper<Scalars['Boolean']['output']>;
  readonly language?: Maybe<FieldWrapper<ILanguage>>;
  readonly lastBillingAddress?: Maybe<FieldWrapper<IAddress>>;
  readonly lastContact?: Maybe<FieldWrapper<IContact>>;
  readonly lastLogin?: Maybe<FieldWrapper<IUserLoginTracker>>;
  readonly name: FieldWrapper<Scalars['String']['output']>;
  readonly oAuthAccounts: ReadonlyArray<FieldWrapper<IOAuthAccount>>;
  readonly orders: ReadonlyArray<FieldWrapper<IOrder>>;
  readonly paymentCredentials: ReadonlyArray<FieldWrapper<IPaymentCredentials>>;
  readonly primaryEmail?: Maybe<FieldWrapper<IUserEmail>>;
  readonly profile?: Maybe<FieldWrapper<IUserProfile>>;
  readonly pushSubscriptions: ReadonlyArray<FieldWrapper<IPushSubscription>>;
  readonly quotations: ReadonlyArray<FieldWrapper<IQuotation>>;
  readonly reviews: ReadonlyArray<FieldWrapper<IProductReview>>;
  readonly reviewsCount: FieldWrapper<Scalars['Int']['output']>;
  readonly roles?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['String']['output']>>
  >;
  readonly tags?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['LowerCaseString']['output']>>
  >;
  readonly tokens: ReadonlyArray<FieldWrapper<IToken>>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly username?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly web3Addresses: ReadonlyArray<FieldWrapper<IWeb3Address>>;
  readonly webAuthnCredentials: ReadonlyArray<
    FieldWrapper<IWebAuthnCredentials>
  >;
};

export type IUserCartArgs = {
  orderNumber?: InputMaybe<Scalars['String']['input']>;
};

export type IUserEnrollmentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
  status?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
};

export type IUserOrdersArgs = {
  includeCarts?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
};

export type IUserQuotationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
};

export type IUserReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
};

export type IUserEmail = {
  readonly address: FieldWrapper<Scalars['String']['output']>;
  readonly verified: FieldWrapper<Scalars['Boolean']['output']>;
};

export type IUserLoginTracker = {
  readonly countryCode?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly locale?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly remoteAddress?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly remotePort?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly timestamp: FieldWrapper<Scalars['Timestamp']['output']>;
  readonly userAgent?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IUserProfile = {
  readonly address?: Maybe<FieldWrapper<IAddress>>;
  readonly birthday?: Maybe<FieldWrapper<Scalars['Date']['output']>>;
  readonly displayName?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly gender?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly phoneMobile?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IUserProfileInput = {
  readonly address?: InputMaybe<IAddressInput>;
  readonly birthday?: InputMaybe<Scalars['Timestamp']['input']>;
  readonly displayName?: InputMaybe<Scalars['String']['input']>;
  readonly gender?: InputMaybe<Scalars['String']['input']>;
  readonly phoneMobile?: InputMaybe<Scalars['String']['input']>;
};

export type IWarehousingInterface = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly label?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly version?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IWarehousingProvider = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly configuration?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  readonly configurationError?: Maybe<FieldWrapper<IWarehousingProviderError>>;
  readonly created?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly deleted?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly interface?: Maybe<FieldWrapper<IWarehousingInterface>>;
  readonly isActive?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  readonly type?: Maybe<FieldWrapper<IWarehousingProviderType>>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
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
  readonly address: FieldWrapper<Scalars['String']['output']>;
  readonly nonce?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  readonly verified: FieldWrapper<Scalars['Boolean']['output']>;
};

export type IWebAuthnCredentials = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly aaguid: FieldWrapper<Scalars['String']['output']>;
  readonly counter: FieldWrapper<Scalars['Int']['output']>;
  readonly created: FieldWrapper<Scalars['DateTime']['output']>;
  readonly mdsMetadata?: Maybe<FieldWrapper<IWebAuthnMdSv3Metadata>>;
};

export type IWebAuthnMdSv3Metadata = {
  readonly attachmentHint?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['String']['output']>>
  >;
  readonly attestationRootCertificates?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['String']['output']>>
  >;
  readonly attestationTypes?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['String']['output']>>
  >;
  readonly authenticationAlgorithms?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['String']['output']>>
  >;
  readonly authenticatorGetInfo?: Maybe<
    FieldWrapper<Scalars['JSON']['output']>
  >;
  readonly authenticatorVersion?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  readonly cryptoStrength?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  readonly description?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly icon?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly keyProtection?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['String']['output']>>
  >;
  readonly legalHeader?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly matcherProtection?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['String']['output']>>
  >;
  readonly protocolFamily?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly publicKeyAlgAndEncodings?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['String']['output']>>
  >;
  readonly schema?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  readonly tcDisplay?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['JSON']['output']>>
  >;
  readonly upv?: Maybe<ReadonlyArray<FieldWrapper<Scalars['JSON']['output']>>>;
  readonly userVerificationDetails?: Maybe<
    ReadonlyArray<FieldWrapper<Scalars['JSON']['output']>>
  >;
};

export type IWork = {
  readonly _id: FieldWrapper<Scalars['ID']['output']>;
  readonly created: FieldWrapper<Scalars['DateTime']['output']>;
  readonly deleted?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly error?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  readonly finished?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly input?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  readonly original?: Maybe<FieldWrapper<IWork>>;
  readonly priority: FieldWrapper<Scalars['Int']['output']>;
  readonly result?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  readonly retries: FieldWrapper<Scalars['Int']['output']>;
  readonly scheduled?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly started?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly status: FieldWrapper<IWorkStatus>;
  readonly success?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  readonly timeout?: Maybe<FieldWrapper<Scalars['Int']['output']>>;
  readonly type: FieldWrapper<IWorkType>;
  readonly updated?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  readonly worker?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

export type IWorkOutput = {
  readonly error?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  readonly result?: Maybe<FieldWrapper<Scalars['JSON']['output']>>;
  readonly success: FieldWrapper<Scalars['Boolean']['output']>;
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
  readonly name: FieldWrapper<Scalars['String']['output']>;
  readonly description?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly isDeprecated: FieldWrapper<Scalars['Boolean']['output']>;
  readonly deprecationReason?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type I__Field = {
  readonly name: FieldWrapper<Scalars['String']['output']>;
  readonly description?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly args: ReadonlyArray<FieldWrapper<I__InputValue>>;
  readonly type: FieldWrapper<I__Type>;
  readonly isDeprecated: FieldWrapper<Scalars['Boolean']['output']>;
  readonly deprecationReason?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type I__FieldArgsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value. */
export type I__InputValue = {
  readonly name: FieldWrapper<Scalars['String']['output']>;
  readonly description?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly type: FieldWrapper<I__Type>;
  /** A GraphQL-formatted string representing the default value for this input value. */
  readonly defaultValue?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly isDeprecated: FieldWrapper<Scalars['Boolean']['output']>;
  readonly deprecationReason?: Maybe<FieldWrapper<Scalars['String']['output']>>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type I__Type = {
  readonly kind: FieldWrapper<I__TypeKind>;
  readonly name?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly description?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly specifiedByURL?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  readonly fields?: Maybe<ReadonlyArray<FieldWrapper<I__Field>>>;
  readonly interfaces?: Maybe<ReadonlyArray<FieldWrapper<I__Type>>>;
  readonly possibleTypes?: Maybe<ReadonlyArray<FieldWrapper<I__Type>>>;
  readonly enumValues?: Maybe<ReadonlyArray<FieldWrapper<I__EnumValue>>>;
  readonly inputFields?: Maybe<ReadonlyArray<FieldWrapper<I__InputValue>>>;
  readonly ofType?: Maybe<FieldWrapper<I__Type>>;
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

export type IMd5MetaDataFragment = {
  readonly legalHeader?: string | null;
  readonly description?: string | null;
  readonly authenticatorVersion?: number | null;
  readonly protocolFamily?: string | null;
  readonly schema?: number | null;
  readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
  readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
  readonly attestationTypes?: ReadonlyArray<string> | null;
  readonly keyProtection?: ReadonlyArray<string> | null;
  readonly upv?: ReadonlyArray<any> | null;
  readonly tcDisplay?: ReadonlyArray<any> | null;
  readonly icon?: string | null;
  readonly authenticatorGetInfo?: any | null;
};

export type IUserFragment = {
  readonly _id: string;
  readonly isTwoFactorEnabled: boolean;
  readonly allowedActions: ReadonlyArray<IRoleAction>;
  readonly username?: string | null;
  readonly isGuest: boolean;
  readonly isInitialPassword: boolean;
  readonly name: string;
  readonly roles?: ReadonlyArray<string> | null;
  readonly tags?: ReadonlyArray<any> | null;
  readonly lastBillingAddress?: {
    readonly firstName?: string | null;
    readonly lastName?: string | null;
    readonly company?: string | null;
    readonly addressLine?: string | null;
    readonly addressLine2?: string | null;
    readonly postalCode?: string | null;
    readonly countryCode?: string | null;
    readonly regionCode?: string | null;
    readonly city?: string | null;
  } | null;
  readonly lastContact?: {
    readonly emailAddress?: string | null;
    readonly telNumber?: string | null;
  } | null;
  readonly lastLogin?: {
    readonly countryCode?: string | null;
    readonly locale?: string | null;
    readonly remoteAddress?: string | null;
    readonly remotePort?: string | null;
    readonly timestamp: any;
    readonly userAgent?: string | null;
  } | null;
  readonly avatar?: {
    readonly _id: string;
    readonly name: string;
    readonly size: number;
    readonly type: string;
    readonly url: string;
  } | null;
  readonly paymentCredentials: ReadonlyArray<{
    readonly _id: string;
    readonly isValid: boolean;
    readonly isPreferred: boolean;
    readonly paymentProvider: {
      readonly _id: string;
      readonly type?: IPaymentProviderType | null;
      readonly interface?: {
        readonly _id: string;
        readonly label?: string | null;
        readonly version?: string | null;
      } | null;
    };
  }>;
  readonly emails?: ReadonlyArray<{
    readonly verified: boolean;
    readonly address: string;
  }> | null;
  readonly web3Addresses: ReadonlyArray<{
    readonly address: string;
    readonly nonce?: number | null;
    readonly verified: boolean;
  }>;
  readonly webAuthnCredentials: ReadonlyArray<{
    readonly _id: string;
    readonly created: any;
    readonly aaguid: string;
    readonly counter: number;
    readonly mdsMetadata?: {
      readonly legalHeader?: string | null;
      readonly description?: string | null;
      readonly authenticatorVersion?: number | null;
      readonly protocolFamily?: string | null;
      readonly schema?: number | null;
      readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
      readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
      readonly attestationTypes?: ReadonlyArray<string> | null;
      readonly keyProtection?: ReadonlyArray<string> | null;
      readonly upv?: ReadonlyArray<any> | null;
      readonly tcDisplay?: ReadonlyArray<any> | null;
      readonly icon?: string | null;
      readonly authenticatorGetInfo?: any | null;
    } | null;
  }>;
  readonly profile?: {
    readonly displayName?: string | null;
    readonly phoneMobile?: string | null;
    readonly gender?: string | null;
    readonly birthday?: any | null;
    readonly address?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
  } | null;
  readonly primaryEmail?: {
    readonly verified: boolean;
    readonly address: string;
  } | null;
};

export type ILogoutMutationVariables = Exact<{
  token?: InputMaybe<Scalars['String']['input']>;
}>;

export type ILogoutMutation = {
  readonly logout?: { readonly success?: boolean | null } | null;
};

export type IAddEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IAddEmailMutation = {
  readonly addEmail: {
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  };
};

export type IAddWeb3AddressMutationVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type IAddWeb3AddressMutation = {
  readonly addWeb3Address: {
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  };
};

export type IAddWebAuthnCredentialsMutationVariables = Exact<{
  credentials: Scalars['JSON']['input'];
}>;

export type IAddWebAuthnCredentialsMutation = {
  readonly addWebAuthnCredentials: {
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  };
};

export type IBuildSecretTotpAuthUrlMutationVariables = Exact<{
  [key: string]: never;
}>;

export type IBuildSecretTotpAuthUrlMutation = {
  readonly buildSecretTOTPAuthURL: string;
};

export type IChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;

export type IChangePasswordMutation = {
  readonly changePassword?: { readonly success?: boolean | null } | null;
};

export type ICreateUserMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  plainPassword?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<IUserProfileInput>;
  webAuthnPublicKeyCredentials?: InputMaybe<Scalars['JSON']['input']>;
}>;

export type ICreateUserMutation = {
  readonly createUser?: {
    readonly id: string;
    readonly token: string;
    readonly tokenExpires: any;
  } | null;
};

export type ICreateUserWithWebAuthMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  webAuthnPublicKeyCredentials?: InputMaybe<Scalars['JSON']['input']>;
}>;

export type ICreateUserWithWebAuthMutation = {
  readonly createUser?: {
    readonly id: string;
    readonly token: string;
    readonly tokenExpires: any;
  } | null;
};

export type ICreateWebAuthnCredentialCreationOptionsMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;

export type ICreateWebAuthnCredentialCreationOptionsMutation = {
  readonly createWebAuthnCredentialCreationOptions: any;
};

export type ICreateWebAuthnCredentialRequestOptionsMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;

export type ICreateWebAuthnCredentialRequestOptionsMutation = {
  readonly createWebAuthnCredentialRequestOptions: any;
};

export type ICurrentUserRoleQueryVariables = Exact<{ [key: string]: never }>;

export type ICurrentUserRoleQuery = {
  readonly me?: {
    readonly _id: string;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
  } | null;
};

export type ICurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type ICurrentUserQuery = {
  readonly me?: {
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  } | null;
  readonly impersonator?: { readonly _id: string } | null;
};

export type IDisableTotpMutationVariables = Exact<{
  code: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IDisableTotpMutation = {
  readonly disableTOTP: {
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  };
};

export type IEnableTotpMutationVariables = Exact<{
  secretBase32: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;

export type IEnableTotpMutation = {
  readonly enableTOTP: {
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  };
};

export type IEnrollUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  plainPassword?: InputMaybe<Scalars['String']['input']>;
  profile: IUserProfileInput;
}>;

export type IEnrollUserMutation = {
  readonly enrollUser: {
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  };
};

export type IForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type IForgotPasswordMutation = {
  readonly forgotPassword?: { readonly success?: boolean | null } | null;
};

export type IImpersonateMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;

export type IImpersonateMutation = {
  readonly impersonate: {
    readonly id: string;
    readonly tokenExpires: any;
    readonly token: string;
    readonly user?: { readonly _id: string } | null;
  };
};

export type ILogInWithOAuthMutationVariables = Exact<{
  authorizationCode: Scalars['String']['input'];
  provider: Scalars['String']['input'];
  redirectUrl: Scalars['String']['input'];
}>;

export type ILogInWithOAuthMutation = {
  readonly loginWithOAuth?: {
    readonly id: string;
    readonly token: string;
    readonly tokenExpires: any;
  } | null;
};

export type ILoginWithPasswordMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  plainPassword?: InputMaybe<Scalars['String']['input']>;
  totpCode?: InputMaybe<Scalars['String']['input']>;
}>;

export type ILoginWithPasswordMutation = {
  readonly loginWithPassword?: {
    readonly id: string;
    readonly token: string;
    readonly tokenExpires: any;
    readonly user?: {
      readonly _id: string;
      readonly allowedActions: ReadonlyArray<IRoleAction>;
      readonly roles?: ReadonlyArray<string> | null;
      readonly isTwoFactorEnabled: boolean;
    } | null;
  } | null;
};

export type ILoginWithWebAuthnMutationVariables = Exact<{
  webAuthnPublicKeyCredentials: Scalars['JSON']['input'];
}>;

export type ILoginWithWebAuthnMutation = {
  readonly loginWithWebAuthn?: {
    readonly id: string;
    readonly token: string;
    readonly tokenExpires: any;
  } | null;
};

export type IRemoveEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IRemoveEmailMutation = {
  readonly removeEmail: {
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  };
};

export type IRemoveWeb3AddressMutationVariables = Exact<{
  address: Scalars['String']['input'];
}>;

export type IRemoveWeb3AddressMutation = {
  readonly removeWeb3Address: {
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  };
};

export type IRemoveWebAuthCredentialsMutationVariables = Exact<{
  credentialsId: Scalars['ID']['input'];
}>;

export type IRemoveWebAuthCredentialsMutation = {
  readonly removeWebAuthnCredentials: {
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  };
};

export type IResetPasswordMutationVariables = Exact<{
  newPlainPassword?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
}>;

export type IResetPasswordMutation = {
  readonly resetPassword?: {
    readonly id: string;
    readonly token: string;
    readonly tokenExpires: any;
  } | null;
};

export type ISendVerificationEmailMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
}>;

export type ISendVerificationEmailMutation = {
  readonly sendVerificationEmail?: { readonly success?: boolean | null } | null;
};

export type ISetPasswordMutationVariables = Exact<{
  newPlainPassword?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
}>;

export type ISetPasswordMutation = {
  readonly setPassword: {
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  };
};

export type ISetRolesMutationVariables = Exact<{
  roles: ReadonlyArray<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
}>;

export type ISetRolesMutation = {
  readonly setRoles: {
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  };
};

export type ISetUserTagsMutationVariables = Exact<{
  tags: ReadonlyArray<InputMaybe<Scalars['LowerCaseString']['input']>>;
  userId: Scalars['ID']['input'];
}>;

export type ISetUserTagsMutation = {
  readonly setUserTags: {
    readonly _id: string;
    readonly tags?: ReadonlyArray<any> | null;
  };
};

export type ISetUsernameMutationVariables = Exact<{
  username: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
}>;

export type ISetUsernameMutation = {
  readonly setUsername: {
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  };
};

export type IStopImpersonateMutationVariables = Exact<{ [key: string]: never }>;

export type IStopImpersonateMutation = {
  readonly stopImpersonation: {
    readonly id: string;
    readonly token: string;
    readonly tokenExpires: any;
  };
};

export type IUserQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IUserQuery = {
  readonly user?: {
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  } | null;
};

export type IUserWebAuthnCredentialsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;

export type IUserWebAuthnCredentialsQuery = {
  readonly user?: {
    readonly _id: string;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
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
  readonly usersCount: number;
  readonly users: ReadonlyArray<{
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  }>;
};

export type IVerifyEmailMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;

export type IVerifyEmailMutation = {
  readonly verifyEmail?: {
    readonly id: string;
    readonly token: string;
    readonly tokenExpires: any;
    readonly user?: {
      readonly _id: string;
      readonly isTwoFactorEnabled: boolean;
      readonly allowedActions: ReadonlyArray<IRoleAction>;
      readonly username?: string | null;
      readonly isGuest: boolean;
      readonly isInitialPassword: boolean;
      readonly name: string;
      readonly roles?: ReadonlyArray<string> | null;
      readonly tags?: ReadonlyArray<any> | null;
      readonly lastBillingAddress?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
      readonly lastContact?: {
        readonly emailAddress?: string | null;
        readonly telNumber?: string | null;
      } | null;
      readonly lastLogin?: {
        readonly countryCode?: string | null;
        readonly locale?: string | null;
        readonly remoteAddress?: string | null;
        readonly remotePort?: string | null;
        readonly timestamp: any;
        readonly userAgent?: string | null;
      } | null;
      readonly avatar?: {
        readonly _id: string;
        readonly name: string;
        readonly size: number;
        readonly type: string;
        readonly url: string;
      } | null;
      readonly paymentCredentials: ReadonlyArray<{
        readonly _id: string;
        readonly isValid: boolean;
        readonly isPreferred: boolean;
        readonly paymentProvider: {
          readonly _id: string;
          readonly type?: IPaymentProviderType | null;
          readonly interface?: {
            readonly _id: string;
            readonly label?: string | null;
            readonly version?: string | null;
          } | null;
        };
      }>;
      readonly emails?: ReadonlyArray<{
        readonly verified: boolean;
        readonly address: string;
      }> | null;
      readonly web3Addresses: ReadonlyArray<{
        readonly address: string;
        readonly nonce?: number | null;
        readonly verified: boolean;
      }>;
      readonly webAuthnCredentials: ReadonlyArray<{
        readonly _id: string;
        readonly created: any;
        readonly aaguid: string;
        readonly counter: number;
        readonly mdsMetadata?: {
          readonly legalHeader?: string | null;
          readonly description?: string | null;
          readonly authenticatorVersion?: number | null;
          readonly protocolFamily?: string | null;
          readonly schema?: number | null;
          readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
          readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
          readonly attestationTypes?: ReadonlyArray<string> | null;
          readonly keyProtection?: ReadonlyArray<string> | null;
          readonly upv?: ReadonlyArray<any> | null;
          readonly tcDisplay?: ReadonlyArray<any> | null;
          readonly icon?: string | null;
          readonly authenticatorGetInfo?: any | null;
        } | null;
      }>;
      readonly profile?: {
        readonly displayName?: string | null;
        readonly phoneMobile?: string | null;
        readonly gender?: string | null;
        readonly birthday?: any | null;
        readonly address?: {
          readonly firstName?: string | null;
          readonly lastName?: string | null;
          readonly company?: string | null;
          readonly addressLine?: string | null;
          readonly addressLine2?: string | null;
          readonly postalCode?: string | null;
          readonly countryCode?: string | null;
          readonly regionCode?: string | null;
          readonly city?: string | null;
        } | null;
      } | null;
      readonly primaryEmail?: {
        readonly verified: boolean;
        readonly address: string;
      } | null;
    } | null;
  } | null;
};

export type IVerifyWeb3AddressMutationVariables = Exact<{
  address: Scalars['String']['input'];
  hash: Scalars['String']['input'];
}>;

export type IVerifyWeb3AddressMutation = {
  readonly verifyWeb3Address: {
    readonly _id: string;
    readonly isTwoFactorEnabled: boolean;
    readonly allowedActions: ReadonlyArray<IRoleAction>;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly isInitialPassword: boolean;
    readonly name: string;
    readonly roles?: ReadonlyArray<string> | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly lastBillingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly lastContact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly lastLogin?: {
      readonly countryCode?: string | null;
      readonly locale?: string | null;
      readonly remoteAddress?: string | null;
      readonly remotePort?: string | null;
      readonly timestamp: any;
      readonly userAgent?: string | null;
    } | null;
    readonly avatar?: {
      readonly _id: string;
      readonly name: string;
      readonly size: number;
      readonly type: string;
      readonly url: string;
    } | null;
    readonly paymentCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly isValid: boolean;
      readonly isPreferred: boolean;
      readonly paymentProvider: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      };
    }>;
    readonly emails?: ReadonlyArray<{
      readonly verified: boolean;
      readonly address: string;
    }> | null;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly webAuthnCredentials: ReadonlyArray<{
      readonly _id: string;
      readonly created: any;
      readonly aaguid: string;
      readonly counter: number;
      readonly mdsMetadata?: {
        readonly legalHeader?: string | null;
        readonly description?: string | null;
        readonly authenticatorVersion?: number | null;
        readonly protocolFamily?: string | null;
        readonly schema?: number | null;
        readonly authenticationAlgorithms?: ReadonlyArray<string> | null;
        readonly publicKeyAlgAndEncodings?: ReadonlyArray<string> | null;
        readonly attestationTypes?: ReadonlyArray<string> | null;
        readonly keyProtection?: ReadonlyArray<string> | null;
        readonly upv?: ReadonlyArray<any> | null;
        readonly tcDisplay?: ReadonlyArray<any> | null;
        readonly icon?: string | null;
        readonly authenticatorGetInfo?: any | null;
      } | null;
    }>;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly phoneMobile?: string | null;
      readonly gender?: string | null;
      readonly birthday?: any | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
        readonly company?: string | null;
        readonly addressLine?: string | null;
        readonly addressLine2?: string | null;
        readonly postalCode?: string | null;
        readonly countryCode?: string | null;
        readonly regionCode?: string | null;
        readonly city?: string | null;
      } | null;
    } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  };
};

export type IAssortmentChildrenFragment = {
  readonly _id: string;
  readonly childrenCount: number;
  readonly texts?: {
    readonly _id: string;
    readonly slug?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
  } | null;
};

export type IAssortmentFragment = {
  readonly _id: string;
  readonly isActive?: boolean | null;
  readonly created?: any | null;
  readonly updated?: any | null;
  readonly sequence: number;
  readonly isBase?: boolean | null;
  readonly isRoot?: boolean | null;
  readonly tags?: ReadonlyArray<any> | null;
  readonly childrenCount: number;
  readonly texts?: {
    readonly _id: string;
    readonly slug?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
    readonly description?: string | null;
  } | null;
  readonly media: ReadonlyArray<{
    readonly _id: string;
    readonly tags?: ReadonlyArray<any> | null;
    readonly file: { readonly _id: string; readonly url: string };
  }>;
};

export type IAssortmentLinkFragment = {
  readonly _id: string;
  readonly sortKey: number;
  readonly parent: {
    readonly _id: string;
    readonly isActive?: boolean | null;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly sequence: number;
    readonly isBase?: boolean | null;
    readonly isRoot?: boolean | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly childrenCount: number;
    readonly texts?: {
      readonly _id: string;
      readonly slug?: string | null;
      readonly title?: string | null;
      readonly subtitle?: string | null;
      readonly description?: string | null;
    } | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly tags?: ReadonlyArray<any> | null;
      readonly file: { readonly _id: string; readonly url: string };
    }>;
  };
  readonly child: {
    readonly _id: string;
    readonly isActive?: boolean | null;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly sequence: number;
    readonly isBase?: boolean | null;
    readonly isRoot?: boolean | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly childrenCount: number;
    readonly texts?: {
      readonly _id: string;
      readonly slug?: string | null;
      readonly title?: string | null;
      readonly subtitle?: string | null;
      readonly description?: string | null;
    } | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly tags?: ReadonlyArray<any> | null;
      readonly file: { readonly _id: string; readonly url: string };
    }>;
  };
};

export type IAssortmentMediaFragment = {
  readonly _id: string;
  readonly tags?: ReadonlyArray<any> | null;
  readonly file: { readonly _id: string; readonly url: string };
  readonly texts?: {
    readonly _id: string;
    readonly locale?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
  } | null;
};

export type IAssortmentMediaTextsFragment = {
  readonly _id: string;
  readonly locale?: string | null;
  readonly title?: string | null;
  readonly subtitle?: string | null;
};

export type IAssortmentTextsFragment = {
  readonly _id: string;
  readonly locale?: string | null;
  readonly slug?: string | null;
  readonly title?: string | null;
  readonly subtitle?: string | null;
  readonly description?: string | null;
};

export type IAddAssortmentFilterMutationVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
  filterId: Scalars['ID']['input'];
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
}>;

export type IAddAssortmentFilterMutation = {
  readonly addAssortmentFilter: { readonly _id: string };
};

export type IAddAssortmentLinkMutationVariables = Exact<{
  parentAssortmentId: Scalars['ID']['input'];
  childAssortmentId: Scalars['ID']['input'];
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
}>;

export type IAddAssortmentLinkMutation = {
  readonly addAssortmentLink: {
    readonly _id: string;
    readonly sortKey: number;
    readonly parent: {
      readonly _id: string;
      readonly isActive?: boolean | null;
      readonly created?: any | null;
      readonly updated?: any | null;
      readonly sequence: number;
      readonly isBase?: boolean | null;
      readonly isRoot?: boolean | null;
      readonly tags?: ReadonlyArray<any> | null;
      readonly childrenCount: number;
      readonly texts?: {
        readonly _id: string;
        readonly slug?: string | null;
        readonly title?: string | null;
        readonly subtitle?: string | null;
        readonly description?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly tags?: ReadonlyArray<any> | null;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    };
    readonly child: {
      readonly _id: string;
      readonly isActive?: boolean | null;
      readonly created?: any | null;
      readonly updated?: any | null;
      readonly sequence: number;
      readonly isBase?: boolean | null;
      readonly isRoot?: boolean | null;
      readonly tags?: ReadonlyArray<any> | null;
      readonly childrenCount: number;
      readonly texts?: {
        readonly _id: string;
        readonly slug?: string | null;
        readonly title?: string | null;
        readonly subtitle?: string | null;
        readonly description?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly tags?: ReadonlyArray<any> | null;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    };
  };
};

export type IAddAssortmentMediaMutationVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
  media: Scalars['Upload']['input'];
}>;

export type IAddAssortmentMediaMutation = {
  readonly addAssortmentMedia: {
    readonly _id: string;
    readonly tags?: ReadonlyArray<any> | null;
    readonly file: { readonly _id: string; readonly url: string };
    readonly texts?: {
      readonly _id: string;
      readonly locale?: string | null;
      readonly title?: string | null;
      readonly subtitle?: string | null;
    } | null;
  };
};

export type IAddAssortmentProductMutationVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
}>;

export type IAddAssortmentProductMutation = {
  readonly addAssortmentProduct: { readonly _id: string };
};

export type IAssortmentQueryVariables = Exact<{
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IAssortmentQuery = {
  readonly assortment?: {
    readonly _id: string;
    readonly isActive?: boolean | null;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly sequence: number;
    readonly isBase?: boolean | null;
    readonly isRoot?: boolean | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly childrenCount: number;
    readonly texts?: {
      readonly _id: string;
      readonly slug?: string | null;
      readonly title?: string | null;
      readonly subtitle?: string | null;
      readonly description?: string | null;
    } | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly tags?: ReadonlyArray<any> | null;
      readonly file: { readonly _id: string; readonly url: string };
    }>;
  } | null;
};

export type IAssortmentChildrenQueryVariables = Exact<{
  slugs?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  includeLeaves?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type IAssortmentChildrenQuery = {
  readonly assortments: ReadonlyArray<{
    readonly _id: string;
    readonly childrenCount: number;
    readonly children?: ReadonlyArray<{
      readonly _id: string;
      readonly childrenCount: number;
      readonly texts?: {
        readonly _id: string;
        readonly slug?: string | null;
        readonly title?: string | null;
        readonly subtitle?: string | null;
      } | null;
    }> | null;
    readonly texts?: {
      readonly _id: string;
      readonly slug?: string | null;
      readonly title?: string | null;
      readonly subtitle?: string | null;
    } | null;
  }>;
};

export type IAssortmentFiltersQueryVariables = Exact<{
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IAssortmentFiltersQuery = {
  readonly assortment?: {
    readonly _id: string;
    readonly filterAssignments?: ReadonlyArray<{
      readonly _id: string;
      readonly sortKey: number;
      readonly tags?: ReadonlyArray<any> | null;
      readonly filter: {
        readonly _id: string;
        readonly updated?: any | null;
        readonly created?: any | null;
        readonly key?: string | null;
        readonly isActive?: boolean | null;
        readonly type?: IFilterType | null;
        readonly options?: ReadonlyArray<{
          readonly _id: string;
          readonly value?: string | null;
          readonly texts?: {
            readonly _id: string;
            readonly title?: string | null;
            readonly subtitle?: string | null;
            readonly locale?: string | null;
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
  readonly assortment?: {
    readonly _id: string;
    readonly linkedAssortments?: ReadonlyArray<{
      readonly _id: string;
      readonly sortKey: number;
      readonly parent: {
        readonly _id: string;
        readonly isActive?: boolean | null;
        readonly created?: any | null;
        readonly updated?: any | null;
        readonly sequence: number;
        readonly isBase?: boolean | null;
        readonly isRoot?: boolean | null;
        readonly tags?: ReadonlyArray<any> | null;
        readonly childrenCount: number;
        readonly texts?: {
          readonly _id: string;
          readonly slug?: string | null;
          readonly title?: string | null;
          readonly subtitle?: string | null;
          readonly description?: string | null;
        } | null;
        readonly media: ReadonlyArray<{
          readonly _id: string;
          readonly tags?: ReadonlyArray<any> | null;
          readonly file: { readonly _id: string; readonly url: string };
        }>;
      };
      readonly child: {
        readonly _id: string;
        readonly isActive?: boolean | null;
        readonly created?: any | null;
        readonly updated?: any | null;
        readonly sequence: number;
        readonly isBase?: boolean | null;
        readonly isRoot?: boolean | null;
        readonly tags?: ReadonlyArray<any> | null;
        readonly childrenCount: number;
        readonly texts?: {
          readonly _id: string;
          readonly slug?: string | null;
          readonly title?: string | null;
          readonly subtitle?: string | null;
          readonly description?: string | null;
        } | null;
        readonly media: ReadonlyArray<{
          readonly _id: string;
          readonly tags?: ReadonlyArray<any> | null;
          readonly file: { readonly _id: string; readonly url: string };
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
  readonly assortment?: {
    readonly _id: string;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly tags?: ReadonlyArray<any> | null;
      readonly sortKey: number;
      readonly texts?: {
        readonly _id: string;
        readonly locale?: string | null;
        readonly title?: string | null;
        readonly subtitle?: string | null;
      } | null;
      readonly file: {
        readonly _id: string;
        readonly url: string;
        readonly name: string;
        readonly size: number;
        readonly type: string;
      };
    }>;
  } | null;
};

export type IAssortmentPathsQueryVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
}>;

export type IAssortmentPathsQuery = {
  readonly assortment?: {
    readonly assortmentPaths: ReadonlyArray<{
      readonly links: ReadonlyArray<{ readonly assortmentId: string }>;
    }>;
  } | null;
};

export type IAssortmentProductsQueryVariables = Exact<{
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IAssortmentProductsQuery = {
  readonly assortment?: {
    readonly _id: string;
    readonly productAssignments?: ReadonlyArray<{
      readonly _id: string;
      readonly sortKey: number;
      readonly tags?: ReadonlyArray<any> | null;
      readonly product: {
        readonly _id: string;
        readonly sequence: number;
        readonly status: IProductStatus;
        readonly tags?: ReadonlyArray<any> | null;
        readonly updated?: any | null;
        readonly published?: any | null;
        readonly texts?: {
          readonly _id: string;
          readonly slug?: string | null;
          readonly title?: string | null;
          readonly subtitle?: string | null;
          readonly description?: string | null;
          readonly vendor?: string | null;
          readonly brand?: string | null;
          readonly labels?: ReadonlyArray<string> | null;
        } | null;
        readonly media: ReadonlyArray<{
          readonly _id: string;
          readonly tags?: ReadonlyArray<any> | null;
          readonly file: { readonly _id: string; readonly url: string };
        }>;
      };
    }> | null;
  } | null;
};

export type IAssortmentsQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
  slugs?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  includeLeaves?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
}>;

export type IAssortmentsQuery = {
  readonly assortmentsCount: number;
  readonly assortments: ReadonlyArray<{
    readonly _id: string;
    readonly isActive?: boolean | null;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly sequence: number;
    readonly isBase?: boolean | null;
    readonly isRoot?: boolean | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly childrenCount: number;
    readonly linkedAssortments?: ReadonlyArray<{
      readonly child: { readonly _id: string };
    }> | null;
    readonly texts?: {
      readonly _id: string;
      readonly slug?: string | null;
      readonly title?: string | null;
      readonly subtitle?: string | null;
      readonly description?: string | null;
    } | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly tags?: ReadonlyArray<any> | null;
      readonly file: { readonly _id: string; readonly url: string };
    }>;
  }>;
};

export type ICreateAssortmentMutationVariables = Exact<{
  assortment: ICreateAssortmentInput;
}>;

export type ICreateAssortmentMutation = {
  readonly createAssortment: {
    readonly _id: string;
    readonly isActive?: boolean | null;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly sequence: number;
    readonly isBase?: boolean | null;
    readonly isRoot?: boolean | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly childrenCount: number;
    readonly texts?: {
      readonly _id: string;
      readonly slug?: string | null;
      readonly title?: string | null;
      readonly subtitle?: string | null;
      readonly description?: string | null;
    } | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly tags?: ReadonlyArray<any> | null;
      readonly file: { readonly _id: string; readonly url: string };
    }>;
  };
};

export type IRemoveAssortmentMutationVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
}>;

export type IRemoveAssortmentMutation = {
  readonly removeAssortment: { readonly _id: string };
};

export type IRemoveAssortmentFilterMutationVariables = Exact<{
  assortmentFilterId: Scalars['ID']['input'];
}>;

export type IRemoveAssortmentFilterMutation = {
  readonly removeAssortmentFilter: { readonly _id: string };
};

export type IRemoveAssortmentLinkMutationVariables = Exact<{
  assortmentLinkId: Scalars['ID']['input'];
}>;

export type IRemoveAssortmentLinkMutation = {
  readonly removeAssortmentLink: {
    readonly _id: string;
    readonly sortKey: number;
    readonly parent: {
      readonly _id: string;
      readonly isActive?: boolean | null;
      readonly created?: any | null;
      readonly updated?: any | null;
      readonly sequence: number;
      readonly isBase?: boolean | null;
      readonly isRoot?: boolean | null;
      readonly tags?: ReadonlyArray<any> | null;
      readonly childrenCount: number;
      readonly texts?: {
        readonly _id: string;
        readonly slug?: string | null;
        readonly title?: string | null;
        readonly subtitle?: string | null;
        readonly description?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly tags?: ReadonlyArray<any> | null;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    };
    readonly child: {
      readonly _id: string;
      readonly isActive?: boolean | null;
      readonly created?: any | null;
      readonly updated?: any | null;
      readonly sequence: number;
      readonly isBase?: boolean | null;
      readonly isRoot?: boolean | null;
      readonly tags?: ReadonlyArray<any> | null;
      readonly childrenCount: number;
      readonly texts?: {
        readonly _id: string;
        readonly slug?: string | null;
        readonly title?: string | null;
        readonly subtitle?: string | null;
        readonly description?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly tags?: ReadonlyArray<any> | null;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    };
  };
};

export type IRemoveAssortmentMediaMutationVariables = Exact<{
  assortmentMediaId: Scalars['ID']['input'];
}>;

export type IRemoveAssortmentMediaMutation = {
  readonly removeAssortmentMedia: { readonly _id: string };
};

export type IRemoveAssortmentProductMutationVariables = Exact<{
  assortmentProductId: Scalars['ID']['input'];
}>;

export type IRemoveAssortmentProductMutation = {
  readonly removeAssortmentProduct: { readonly _id: string };
};

export type IReorderAssortmentFiltersMutationVariables = Exact<{
  sortKeys: ReadonlyArray<IReorderAssortmentFilterInput>;
}>;

export type IReorderAssortmentFiltersMutation = {
  readonly reorderAssortmentFilters: ReadonlyArray<{ readonly _id: string }>;
};

export type IReorderAssortmentLinksMutationVariables = Exact<{
  sortKeys: ReadonlyArray<IReorderAssortmentLinkInput>;
}>;

export type IReorderAssortmentLinksMutation = {
  readonly reorderAssortmentLinks: ReadonlyArray<{ readonly _id: string }>;
};

export type IReorderAssortmentMediaMutationVariables = Exact<{
  sortKeys: ReadonlyArray<IReorderAssortmentMediaInput>;
}>;

export type IReorderAssortmentMediaMutation = {
  readonly reorderAssortmentMedia: ReadonlyArray<{ readonly _id: string }>;
};

export type IReorderAssortmentProductsMutationVariables = Exact<{
  sortKeys: ReadonlyArray<IReorderAssortmentProductInput>;
}>;

export type IReorderAssortmentProductsMutation = {
  readonly reorderAssortmentProducts: ReadonlyArray<{ readonly _id: string }>;
};

export type ISearchAssortmentsQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type ISearchAssortmentsQuery = {
  readonly searchAssortments: {
    readonly assortments: ReadonlyArray<{
      readonly _id: string;
      readonly isActive?: boolean | null;
      readonly created?: any | null;
      readonly updated?: any | null;
      readonly sequence: number;
      readonly isBase?: boolean | null;
      readonly isRoot?: boolean | null;
      readonly tags?: ReadonlyArray<any> | null;
      readonly childrenCount: number;
      readonly texts?: {
        readonly _id: string;
        readonly slug?: string | null;
        readonly title?: string | null;
        readonly subtitle?: string | null;
        readonly description?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly tags?: ReadonlyArray<any> | null;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    }>;
  };
};

export type ISetBaseAssortmentMutationVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
}>;

export type ISetBaseAssortmentMutation = {
  readonly setBaseAssortment: {
    readonly _id: string;
    readonly isBase?: boolean | null;
  };
};

export type ITranslatedAssortmentMediaTextsQueryVariables = Exact<{
  assortmentMediaId: Scalars['ID']['input'];
}>;

export type ITranslatedAssortmentMediaTextsQuery = {
  readonly translatedAssortmentMediaTexts: ReadonlyArray<{
    readonly _id: string;
    readonly locale?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
  }>;
};

export type ITranslatedAssortmentTextsQueryVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
}>;

export type ITranslatedAssortmentTextsQuery = {
  readonly translatedAssortmentTexts: ReadonlyArray<{
    readonly _id: string;
    readonly locale?: string | null;
    readonly slug?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
    readonly description?: string | null;
  }>;
};

export type IUpdateAssortmentMutationVariables = Exact<{
  assortment: IUpdateAssortmentInput;
  assortmentId: Scalars['ID']['input'];
}>;

export type IUpdateAssortmentMutation = {
  readonly updateAssortment: {
    readonly _id: string;
    readonly isActive?: boolean | null;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly sequence: number;
    readonly isBase?: boolean | null;
    readonly isRoot?: boolean | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly childrenCount: number;
    readonly texts?: {
      readonly _id: string;
      readonly slug?: string | null;
      readonly title?: string | null;
      readonly subtitle?: string | null;
      readonly description?: string | null;
    } | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly tags?: ReadonlyArray<any> | null;
      readonly file: { readonly _id: string; readonly url: string };
    }>;
  };
};

export type IUpdateAssortmentMediaTextsMutationVariables = Exact<{
  assortmentMediaId: Scalars['ID']['input'];
  texts: ReadonlyArray<IUpdateAssortmentMediaTextInput>;
}>;

export type IUpdateAssortmentMediaTextsMutation = {
  readonly updateAssortmentMediaTexts: ReadonlyArray<{
    readonly _id: string;
    readonly locale?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
  }>;
};

export type IUpdateAssortmentTextsMutationVariables = Exact<{
  assortmentId: Scalars['ID']['input'];
  texts: ReadonlyArray<IUpdateAssortmentTextInput>;
}>;

export type IUpdateAssortmentTextsMutation = {
  readonly updateAssortmentTexts: ReadonlyArray<{
    readonly _id: string;
    readonly locale?: string | null;
    readonly slug?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
    readonly description?: string | null;
  }>;
};

export type IShopInfoQueryVariables = Exact<{ [key: string]: never }>;

export type IShopInfoQuery = {
  readonly shopInfo: {
    readonly _id: string;
    readonly version?: string | null;
    readonly language?: {
      readonly _id: string;
      readonly isoCode?: string | null;
      readonly name?: string | null;
    } | null;
    readonly country?: {
      readonly _id: string;
      readonly isoCode?: string | null;
      readonly flagEmoji?: string | null;
      readonly name?: string | null;
      readonly defaultCurrency?: {
        readonly _id: string;
        readonly isoCode: string;
      } | null;
    } | null;
    readonly externalLinks: ReadonlyArray<{
      readonly href?: string | null;
      readonly title?: string | null;
    } | null>;
    readonly adminUiConfig: {
      readonly customProperties: ReadonlyArray<{
        readonly entityName: string;
        readonly inlineFragment: string;
      }>;
    };
  };
};

export type ISystemRolesQueryVariables = Exact<{ [key: string]: never }>;

export type ISystemRolesQuery = {
  readonly shopInfo: {
    readonly _id: string;
    readonly userRoles: ReadonlyArray<string>;
  };
};

export type ICountryFragment = {
  readonly _id: string;
  readonly isoCode?: string | null;
  readonly isActive?: boolean | null;
  readonly isBase?: boolean | null;
  readonly defaultCurrency?: {
    readonly _id: string;
    readonly isoCode: string;
  } | null;
};

export type ICountriesQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
}>;

export type ICountriesQuery = {
  readonly countriesCount: number;
  readonly countries: ReadonlyArray<{
    readonly _id: string;
    readonly isoCode?: string | null;
    readonly isActive?: boolean | null;
    readonly isBase?: boolean | null;
    readonly defaultCurrency?: {
      readonly _id: string;
      readonly isoCode: string;
    } | null;
  }>;
};

export type ICountryQueryVariables = Exact<{
  countryId: Scalars['ID']['input'];
}>;

export type ICountryQuery = {
  readonly country?: {
    readonly _id: string;
    readonly isoCode?: string | null;
    readonly isActive?: boolean | null;
    readonly isBase?: boolean | null;
    readonly defaultCurrency?: {
      readonly _id: string;
      readonly isoCode: string;
    } | null;
  } | null;
};

export type ICreateCountryMutationVariables = Exact<{
  country: ICreateCountryInput;
}>;

export type ICreateCountryMutation = {
  readonly createCountry: {
    readonly _id: string;
    readonly isoCode?: string | null;
    readonly isActive?: boolean | null;
    readonly isBase?: boolean | null;
    readonly defaultCurrency?: {
      readonly _id: string;
      readonly isoCode: string;
    } | null;
  };
};

export type IRemoveCountryMutationVariables = Exact<{
  countryId: Scalars['ID']['input'];
}>;

export type IRemoveCountryMutation = {
  readonly removeCountry: {
    readonly _id: string;
    readonly isoCode?: string | null;
    readonly isActive?: boolean | null;
    readonly isBase?: boolean | null;
    readonly defaultCurrency?: {
      readonly _id: string;
      readonly isoCode: string;
    } | null;
  };
};

export type IUpdateCountryMutationVariables = Exact<{
  country: IUpdateCountryInput;
  countryId: Scalars['ID']['input'];
}>;

export type IUpdateCountryMutation = {
  readonly updateCountry: {
    readonly _id: string;
    readonly isoCode?: string | null;
    readonly isActive?: boolean | null;
    readonly isBase?: boolean | null;
    readonly defaultCurrency?: {
      readonly _id: string;
      readonly isoCode: string;
    } | null;
  };
};

export type ICurrencyFragment = {
  readonly _id: string;
  readonly isoCode: string;
  readonly isActive?: boolean | null;
  readonly contractAddress?: string | null;
  readonly decimals?: number | null;
};

export type ICreateCurrencyMutationVariables = Exact<{
  currency: ICreateCurrencyInput;
}>;

export type ICreateCurrencyMutation = {
  readonly createCurrency: {
    readonly _id: string;
    readonly isoCode: string;
    readonly isActive?: boolean | null;
    readonly contractAddress?: string | null;
    readonly decimals?: number | null;
  };
};

export type ICurrenciesQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
}>;

export type ICurrenciesQuery = {
  readonly currenciesCount: number;
  readonly currencies: ReadonlyArray<{
    readonly _id: string;
    readonly isoCode: string;
    readonly isActive?: boolean | null;
    readonly contractAddress?: string | null;
    readonly decimals?: number | null;
  }>;
};

export type ICurrencyQueryVariables = Exact<{
  currencyId: Scalars['ID']['input'];
}>;

export type ICurrencyQuery = {
  readonly currency?: {
    readonly _id: string;
    readonly isoCode: string;
    readonly isActive?: boolean | null;
    readonly contractAddress?: string | null;
    readonly decimals?: number | null;
  } | null;
};

export type IRemoveCurrencyMutationVariables = Exact<{
  currencyId: Scalars['ID']['input'];
}>;

export type IRemoveCurrencyMutation = {
  readonly removeCurrency: {
    readonly _id: string;
    readonly isoCode: string;
    readonly isActive?: boolean | null;
    readonly contractAddress?: string | null;
    readonly decimals?: number | null;
  };
};

export type IUpdateCurrencyMutationVariables = Exact<{
  currency: IUpdateCurrencyInput;
  currencyId: Scalars['ID']['input'];
}>;

export type IUpdateCurrencyMutation = {
  readonly updateCurrency: {
    readonly _id: string;
    readonly isoCode: string;
    readonly isActive?: boolean | null;
    readonly contractAddress?: string | null;
    readonly decimals?: number | null;
  };
};

export type IDeliveryProviderFragment = {
  readonly _id: string;
  readonly created?: any | null;
  readonly updated?: any | null;
  readonly deleted?: any | null;
  readonly type?: IDeliveryProviderType | null;
  readonly isActive?: boolean | null;
  readonly configuration?: any | null;
  readonly configurationError?: IDeliveryProviderError | null;
  readonly interface?: {
    readonly _id: string;
    readonly label?: string | null;
    readonly version?: string | null;
  } | null;
};

export type ICreateDeliveryProviderMutationVariables = Exact<{
  deliveryProvider: ICreateDeliveryProviderInput;
}>;

export type ICreateDeliveryProviderMutation = {
  readonly createDeliveryProvider: {
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly type?: IDeliveryProviderType | null;
    readonly isActive?: boolean | null;
    readonly configuration?: any | null;
    readonly configurationError?: IDeliveryProviderError | null;
    readonly interface?: {
      readonly _id: string;
      readonly label?: string | null;
      readonly version?: string | null;
    } | null;
  };
};

export type IDeliveryInterfacesQueryVariables = Exact<{
  providerType: IDeliveryProviderType;
}>;

export type IDeliveryInterfacesQuery = {
  readonly deliveryInterfaces: ReadonlyArray<{
    readonly _id: string;
    readonly label?: string | null;
    readonly value: string;
  }>;
};

export type IDeliveryProviderQueryVariables = Exact<{
  deliveryProviderId: Scalars['ID']['input'];
}>;

export type IDeliveryProviderQuery = {
  readonly deliveryProvider?: {
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly type?: IDeliveryProviderType | null;
    readonly isActive?: boolean | null;
    readonly configuration?: any | null;
    readonly configurationError?: IDeliveryProviderError | null;
    readonly interface?: {
      readonly _id: string;
      readonly label?: string | null;
      readonly version?: string | null;
    } | null;
  } | null;
};

export type IDeliveryProvidersTypeQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IDeliveryProvidersTypeQuery = {
  readonly deliveryProviderType?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label?: string | null;
    }> | null;
  } | null;
};

export type IDeliveryProvidersQueryVariables = Exact<{
  type?: InputMaybe<IDeliveryProviderType>;
}>;

export type IDeliveryProvidersQuery = {
  readonly deliveryProviders: ReadonlyArray<{
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly type?: IDeliveryProviderType | null;
    readonly isActive?: boolean | null;
    readonly configuration?: any | null;
    readonly configurationError?: IDeliveryProviderError | null;
    readonly interface?: {
      readonly _id: string;
      readonly label?: string | null;
      readonly version?: string | null;
    } | null;
  }>;
};

export type IOrderDeliveryStatusQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IOrderDeliveryStatusQuery = {
  readonly deliveryStatusType?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label?: string | null;
    }> | null;
  } | null;
};

export type IRemoveDeliveryProviderMutationVariables = Exact<{
  deliveryProviderId: Scalars['ID']['input'];
}>;

export type IRemoveDeliveryProviderMutation = {
  readonly removeDeliveryProvider: { readonly _id: string };
};

export type IUpdateDeliveryProviderMutationVariables = Exact<{
  deliveryProvider: IUpdateProviderInput;
  deliveryProviderId: Scalars['ID']['input'];
}>;

export type IUpdateDeliveryProviderMutation = {
  readonly updateDeliveryProvider: {
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly type?: IDeliveryProviderType | null;
    readonly isActive?: boolean | null;
    readonly configuration?: any | null;
    readonly configurationError?: IDeliveryProviderError | null;
    readonly interface?: {
      readonly _id: string;
      readonly label?: string | null;
      readonly version?: string | null;
    } | null;
  };
};

export type IEnrollmentDetailFragment = {
  readonly _id: string;
  readonly enrollmentNumber?: string | null;
  readonly updated?: any | null;
  readonly status: IEnrollmentStatus;
  readonly created: any;
  readonly expires?: any | null;
  readonly isExpired?: boolean | null;
  readonly country?: {
    readonly _id: string;
    readonly isoCode?: string | null;
  } | null;
  readonly billingAddress?: {
    readonly addressLine?: string | null;
    readonly addressLine2?: string | null;
    readonly city?: string | null;
    readonly company?: string | null;
    readonly countryCode?: string | null;
    readonly firstName?: string | null;
    readonly lastName?: string | null;
    readonly postalCode?: string | null;
    readonly regionCode?: string | null;
  } | null;
  readonly contact?: {
    readonly emailAddress?: string | null;
    readonly telNumber?: string | null;
  } | null;
  readonly currency?: {
    readonly _id: string;
    readonly contractAddress?: string | null;
    readonly decimals?: number | null;
    readonly isActive?: boolean | null;
    readonly isoCode: string;
  } | null;
  readonly delivery?: {
    readonly provider?: {
      readonly _id: string;
      readonly configuration?: any | null;
      readonly configurationError?: IDeliveryProviderError | null;
      readonly isActive?: boolean | null;
      readonly type?: IDeliveryProviderType | null;
      readonly interface?: {
        readonly _id: string;
        readonly label?: string | null;
        readonly version?: string | null;
      } | null;
      readonly simulatedPrice?: {
        readonly _id: string;
        readonly amount: number;
        readonly currency: string;
        readonly isNetPrice: boolean;
        readonly isTaxable: boolean;
      } | null;
    } | null;
  } | null;
  readonly payment?: {
    readonly provider?: {
      readonly _id: string;
      readonly configuration?: any | null;
      readonly configurationError?: IPaymentProviderError | null;
      readonly isActive?: boolean | null;
      readonly type?: IPaymentProviderType | null;
      readonly interface?: {
        readonly _id: string;
        readonly label?: string | null;
        readonly version?: string | null;
      } | null;
    } | null;
  } | null;
  readonly periods: ReadonlyArray<{
    readonly end: any;
    readonly isTrial: boolean;
    readonly start: any;
    readonly order?: { readonly _id: string } | null;
  }>;
  readonly plan: {
    readonly quantity: number;
    readonly configuration?: ReadonlyArray<{
      readonly key: string;
      readonly value: string;
    }> | null;
    readonly product: {
      readonly _id: string;
      readonly texts?: {
        readonly _id: string;
        readonly title?: string | null;
      } | null;
    };
  };
  readonly user: {
    readonly _id: string;
    readonly username?: string | null;
    readonly name: string;
    readonly avatar?: { readonly _id: string; readonly url: string } | null;
  };
};

export type IEnrollmentFragment = {
  readonly _id: string;
  readonly enrollmentNumber?: string | null;
  readonly updated?: any | null;
  readonly status: IEnrollmentStatus;
  readonly created: any;
  readonly expires?: any | null;
  readonly isExpired?: boolean | null;
  readonly country?: {
    readonly _id: string;
    readonly isoCode?: string | null;
  } | null;
  readonly currency?: { readonly _id: string; readonly isoCode: string } | null;
  readonly periods: ReadonlyArray<{
    readonly start: any;
    readonly end: any;
    readonly isTrial: boolean;
  }>;
  readonly payment?: {
    readonly provider?: { readonly _id: string } | null;
  } | null;
  readonly delivery?: {
    readonly provider?: { readonly _id: string } | null;
  } | null;
  readonly plan: {
    readonly quantity: number;
    readonly product: {
      readonly _id: string;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
      readonly texts?: {
        readonly _id: string;
        readonly title?: string | null;
      } | null;
    };
  };
  readonly user: {
    readonly _id: string;
    readonly username?: string | null;
    readonly name: string;
    readonly avatar?: { readonly _id: string; readonly url: string } | null;
  };
};

export type IActivateEnrollmentMutationVariables = Exact<{
  enrollmentId: Scalars['ID']['input'];
}>;

export type IActivateEnrollmentMutation = {
  readonly activateEnrollment: { readonly _id: string };
};

export type IEnrollmentQueryVariables = Exact<{
  enrollmentId: Scalars['ID']['input'];
}>;

export type IEnrollmentQuery = {
  readonly enrollment?: {
    readonly _id: string;
    readonly enrollmentNumber?: string | null;
    readonly updated?: any | null;
    readonly status: IEnrollmentStatus;
    readonly created: any;
    readonly expires?: any | null;
    readonly isExpired?: boolean | null;
    readonly country?: {
      readonly _id: string;
      readonly isoCode?: string | null;
    } | null;
    readonly billingAddress?: {
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly city?: string | null;
      readonly company?: string | null;
      readonly countryCode?: string | null;
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly postalCode?: string | null;
      readonly regionCode?: string | null;
    } | null;
    readonly contact?: {
      readonly emailAddress?: string | null;
      readonly telNumber?: string | null;
    } | null;
    readonly currency?: {
      readonly _id: string;
      readonly contractAddress?: string | null;
      readonly decimals?: number | null;
      readonly isActive?: boolean | null;
      readonly isoCode: string;
    } | null;
    readonly delivery?: {
      readonly provider?: {
        readonly _id: string;
        readonly configuration?: any | null;
        readonly configurationError?: IDeliveryProviderError | null;
        readonly isActive?: boolean | null;
        readonly type?: IDeliveryProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
        readonly simulatedPrice?: {
          readonly _id: string;
          readonly amount: number;
          readonly currency: string;
          readonly isNetPrice: boolean;
          readonly isTaxable: boolean;
        } | null;
      } | null;
    } | null;
    readonly payment?: {
      readonly provider?: {
        readonly _id: string;
        readonly configuration?: any | null;
        readonly configurationError?: IPaymentProviderError | null;
        readonly isActive?: boolean | null;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      } | null;
    } | null;
    readonly periods: ReadonlyArray<{
      readonly end: any;
      readonly isTrial: boolean;
      readonly start: any;
      readonly order?: { readonly _id: string } | null;
    }>;
    readonly plan: {
      readonly quantity: number;
      readonly configuration?: ReadonlyArray<{
        readonly key: string;
        readonly value: string;
      }> | null;
      readonly product: {
        readonly _id: string;
        readonly texts?: {
          readonly _id: string;
          readonly title?: string | null;
        } | null;
      };
    };
    readonly user: {
      readonly _id: string;
      readonly username?: string | null;
      readonly name: string;
      readonly avatar?: { readonly _id: string; readonly url: string } | null;
    };
  } | null;
};

export type IEnrollmentStatusQueryVariables = Exact<{ [key: string]: never }>;

export type IEnrollmentStatusQuery = {
  readonly enrollmentStatusTypes?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label?: string | null;
    }> | null;
  } | null;
};

export type IEnrollmentsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
  status?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
}>;

export type IEnrollmentsQuery = {
  readonly enrollmentsCount: number;
  readonly enrollments: ReadonlyArray<{
    readonly _id: string;
    readonly enrollmentNumber?: string | null;
    readonly updated?: any | null;
    readonly status: IEnrollmentStatus;
    readonly created: any;
    readonly expires?: any | null;
    readonly isExpired?: boolean | null;
    readonly country?: {
      readonly _id: string;
      readonly isoCode?: string | null;
    } | null;
    readonly currency?: {
      readonly _id: string;
      readonly isoCode: string;
    } | null;
    readonly periods: ReadonlyArray<{
      readonly start: any;
      readonly end: any;
      readonly isTrial: boolean;
    }>;
    readonly payment?: {
      readonly provider?: { readonly _id: string } | null;
    } | null;
    readonly delivery?: {
      readonly provider?: { readonly _id: string } | null;
    } | null;
    readonly plan: {
      readonly quantity: number;
      readonly product: {
        readonly _id: string;
        readonly media: ReadonlyArray<{
          readonly _id: string;
          readonly file: { readonly _id: string; readonly url: string };
        }>;
        readonly texts?: {
          readonly _id: string;
          readonly title?: string | null;
        } | null;
      };
    };
    readonly user: {
      readonly _id: string;
      readonly username?: string | null;
      readonly name: string;
      readonly avatar?: { readonly _id: string; readonly url: string } | null;
    };
  }>;
};

export type ISendEnrollmentEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type ISendEnrollmentEmailMutation = {
  readonly sendEnrollmentEmail?: { readonly success?: boolean | null } | null;
};

export type ITerminateEnrollmentMutationVariables = Exact<{
  enrollmentId: Scalars['ID']['input'];
}>;

export type ITerminateEnrollmentMutation = {
  readonly terminateEnrollment: { readonly _id: string };
};

export type IUserEnrollmentsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  queryString?: InputMaybe<Scalars['String']['input']>;
}>;

export type IUserEnrollmentsQuery = {
  readonly user?: {
    readonly _id: string;
    readonly enrollments: ReadonlyArray<{
      readonly _id: string;
      readonly enrollmentNumber?: string | null;
      readonly updated?: any | null;
      readonly status: IEnrollmentStatus;
      readonly created: any;
      readonly expires?: any | null;
      readonly isExpired?: boolean | null;
      readonly country?: {
        readonly _id: string;
        readonly isoCode?: string | null;
      } | null;
      readonly currency?: {
        readonly _id: string;
        readonly isoCode: string;
      } | null;
      readonly periods: ReadonlyArray<{
        readonly start: any;
        readonly end: any;
        readonly isTrial: boolean;
      }>;
      readonly payment?: {
        readonly provider?: { readonly _id: string } | null;
      } | null;
      readonly delivery?: {
        readonly provider?: { readonly _id: string } | null;
      } | null;
      readonly plan: {
        readonly quantity: number;
        readonly product: {
          readonly _id: string;
          readonly media: ReadonlyArray<{
            readonly _id: string;
            readonly file: { readonly _id: string; readonly url: string };
          }>;
          readonly texts?: {
            readonly _id: string;
            readonly title?: string | null;
          } | null;
        };
      };
      readonly user: {
        readonly _id: string;
        readonly username?: string | null;
        readonly name: string;
        readonly avatar?: { readonly _id: string; readonly url: string } | null;
      };
    }>;
  } | null;
};

export type IEventFragment = {
  readonly _id: string;
  readonly type: string;
  readonly payload?: any | null;
  readonly created: any;
};

export type IEventQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;

export type IEventQuery = {
  readonly event?: {
    readonly _id: string;
    readonly type: string;
    readonly payload?: any | null;
    readonly created: any;
  } | null;
};

export type IEventsTypeQueryVariables = Exact<{ [key: string]: never }>;

export type IEventsTypeQuery = {
  readonly eventTypes?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label: string;
    }> | null;
  } | null;
};

export type IEventsQueryVariables = Exact<{
  types?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
  queryString?: InputMaybe<Scalars['String']['input']>;
}>;

export type IEventsQuery = {
  readonly eventsCount: number;
  readonly events: ReadonlyArray<{
    readonly _id: string;
    readonly type: string;
    readonly payload?: any | null;
    readonly created: any;
  }>;
};

export type IRegisteredEventTypeQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IRegisteredEventTypeQuery = {
  readonly registeredEvents?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label?: string | null;
    }> | null;
  } | null;
};

export type IFilterFragment = {
  readonly _id: string;
  readonly updated?: any | null;
  readonly created?: any | null;
  readonly key?: string | null;
  readonly isActive?: boolean | null;
  readonly type?: IFilterType | null;
  readonly options?: ReadonlyArray<{
    readonly _id: string;
    readonly value?: string | null;
    readonly texts?: {
      readonly _id: string;
      readonly title?: string | null;
      readonly subtitle?: string | null;
      readonly locale?: string | null;
    } | null;
  }> | null;
};

export type IFilterOptionFragment = {
  readonly _id: string;
  readonly value?: string | null;
  readonly texts?: {
    readonly _id: string;
    readonly title?: string | null;
    readonly subtitle?: string | null;
    readonly locale?: string | null;
  } | null;
};

export type IFilterTextsFragment = {
  readonly _id: string;
  readonly locale?: string | null;
  readonly title?: string | null;
  readonly subtitle?: string | null;
};

export type ICreateFilterMutationVariables = Exact<{
  filter: ICreateFilterInput;
}>;

export type ICreateFilterMutation = {
  readonly createFilter: {
    readonly _id: string;
    readonly updated?: any | null;
    readonly created?: any | null;
    readonly key?: string | null;
    readonly isActive?: boolean | null;
    readonly type?: IFilterType | null;
    readonly options?: ReadonlyArray<{
      readonly _id: string;
      readonly value?: string | null;
      readonly texts?: {
        readonly _id: string;
        readonly title?: string | null;
        readonly subtitle?: string | null;
        readonly locale?: string | null;
      } | null;
    }> | null;
  };
};

export type ICreateFilterOptionMutationVariables = Exact<{
  filterId: Scalars['ID']['input'];
  option: ICreateFilterOptionInput;
}>;

export type ICreateFilterOptionMutation = {
  readonly createFilterOption: { readonly _id: string };
};

export type IFilterQueryVariables = Exact<{
  filterId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IFilterQuery = {
  readonly filter?: {
    readonly _id: string;
    readonly updated?: any | null;
    readonly created?: any | null;
    readonly key?: string | null;
    readonly isActive?: boolean | null;
    readonly type?: IFilterType | null;
    readonly texts?: {
      readonly _id: string;
      readonly title?: string | null;
      readonly subtitle?: string | null;
      readonly locale?: string | null;
    } | null;
    readonly options?: ReadonlyArray<{
      readonly _id: string;
      readonly value?: string | null;
      readonly texts?: {
        readonly _id: string;
        readonly title?: string | null;
        readonly subtitle?: string | null;
        readonly locale?: string | null;
      } | null;
    }> | null;
  } | null;
};

export type IFilterOptionsQueryVariables = Exact<{
  filterId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type IFilterOptionsQuery = {
  readonly filter?: {
    readonly _id: string;
    readonly options?: ReadonlyArray<{
      readonly _id: string;
      readonly value?: string | null;
      readonly texts?: {
        readonly _id: string;
        readonly title?: string | null;
        readonly subtitle?: string | null;
        readonly locale?: string | null;
      } | null;
    }> | null;
  } | null;
};

export type IFilterTypesQueryVariables = Exact<{ [key: string]: never }>;

export type IFilterTypesQuery = {
  readonly filterTypes?: {
    readonly options?: ReadonlyArray<{
      readonly label: string;
      readonly value: string;
    }> | null;
  } | null;
};

export type IFiltersQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
}>;

export type IFiltersQuery = {
  readonly filtersCount: number;
  readonly filters: ReadonlyArray<{
    readonly _id: string;
    readonly updated?: any | null;
    readonly created?: any | null;
    readonly key?: string | null;
    readonly isActive?: boolean | null;
    readonly type?: IFilterType | null;
    readonly texts?: {
      readonly _id: string;
      readonly title?: string | null;
      readonly subtitle?: string | null;
      readonly locale?: string | null;
    } | null;
    readonly options?: ReadonlyArray<{
      readonly _id: string;
      readonly value?: string | null;
      readonly texts?: {
        readonly _id: string;
        readonly title?: string | null;
        readonly subtitle?: string | null;
        readonly locale?: string | null;
      } | null;
    }> | null;
  }>;
};

export type IRemoveFilterMutationVariables = Exact<{
  filterId: Scalars['ID']['input'];
}>;

export type IRemoveFilterMutation = {
  readonly removeFilter: { readonly _id: string };
};

export type IRemoveFilterOptionMutationVariables = Exact<{
  filterId: Scalars['ID']['input'];
  filterOptionValue: Scalars['String']['input'];
}>;

export type IRemoveFilterOptionMutation = {
  readonly removeFilterOption: { readonly _id: string };
};

export type ITranslatedFilterTextsQueryVariables = Exact<{
  filterId: Scalars['ID']['input'];
  filterOptionValue?: InputMaybe<Scalars['String']['input']>;
}>;

export type ITranslatedFilterTextsQuery = {
  readonly translatedFilterTexts: ReadonlyArray<{
    readonly _id: string;
    readonly locale?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
  }>;
};

export type IUpdateFilterMutationVariables = Exact<{
  filter: IUpdateFilterInput;
  filterId: Scalars['ID']['input'];
}>;

export type IUpdateFilterMutation = {
  readonly updateFilter: {
    readonly _id: string;
    readonly updated?: any | null;
    readonly created?: any | null;
    readonly key?: string | null;
    readonly isActive?: boolean | null;
    readonly type?: IFilterType | null;
    readonly options?: ReadonlyArray<{
      readonly _id: string;
      readonly value?: string | null;
      readonly texts?: {
        readonly _id: string;
        readonly title?: string | null;
        readonly subtitle?: string | null;
        readonly locale?: string | null;
      } | null;
    }> | null;
  };
};

export type IUpdateFilterTextsMutationVariables = Exact<{
  filterId: Scalars['ID']['input'];
  filterOptionValue?: InputMaybe<Scalars['String']['input']>;
  texts: ReadonlyArray<IUpdateFilterTextInput>;
}>;

export type IUpdateFilterTextsMutation = {
  readonly updateFilterTexts: ReadonlyArray<{
    readonly _id: string;
    readonly locale?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
  }>;
};

export type ILanguageFragment = {
  readonly _id: string;
  readonly isoCode?: string | null;
  readonly isActive?: boolean | null;
  readonly isBase?: boolean | null;
  readonly name?: string | null;
};

export type ICreateLanguageMutationVariables = Exact<{
  language: ICreateLanguageInput;
}>;

export type ICreateLanguageMutation = {
  readonly createLanguage: {
    readonly _id: string;
    readonly isoCode?: string | null;
    readonly isActive?: boolean | null;
    readonly isBase?: boolean | null;
    readonly name?: string | null;
  };
};

export type ILanguageQueryVariables = Exact<{
  languageId: Scalars['ID']['input'];
}>;

export type ILanguageQuery = {
  readonly language?: {
    readonly _id: string;
    readonly isoCode?: string | null;
    readonly isActive?: boolean | null;
    readonly isBase?: boolean | null;
    readonly name?: string | null;
  } | null;
};

export type ILanguagesQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
}>;

export type ILanguagesQuery = {
  readonly languagesCount: number;
  readonly languages: ReadonlyArray<{
    readonly _id: string;
    readonly isoCode?: string | null;
    readonly isActive?: boolean | null;
    readonly isBase?: boolean | null;
    readonly name?: string | null;
  } | null>;
};

export type IRemoveLanguageMutationVariables = Exact<{
  languageId: Scalars['ID']['input'];
}>;

export type IRemoveLanguageMutation = {
  readonly removeLanguage: {
    readonly _id: string;
    readonly isoCode?: string | null;
    readonly isActive?: boolean | null;
    readonly isBase?: boolean | null;
    readonly name?: string | null;
  };
};

export type IUpdateLanguageMutationVariables = Exact<{
  language: IUpdateLanguageInput;
  languageId: Scalars['ID']['input'];
}>;

export type IUpdateLanguageMutation = {
  readonly updateLanguage: {
    readonly _id: string;
    readonly isoCode?: string | null;
    readonly isActive?: boolean | null;
    readonly isBase?: boolean | null;
    readonly name?: string | null;
  };
};

export type IOrderDetailFragment = {
  readonly _id: string;
  readonly orderNumber?: string | null;
  readonly status?: IOrderStatus | null;
  readonly created?: any | null;
  readonly updated?: any | null;
  readonly ordered?: any | null;
  readonly confirmed?: any | null;
  readonly fullfilled?: any | null;
  readonly totalTax?: {
    readonly amount: number;
    readonly currency: string;
  } | null;
  readonly itemsTotal?: {
    readonly amount: number;
    readonly currency: string;
  } | null;
  readonly totalDiscount?: {
    readonly amount: number;
    readonly currency: string;
  } | null;
  readonly totalPayment?: {
    readonly amount: number;
    readonly currency: string;
  } | null;
  readonly totalDelivery?: {
    readonly amount: number;
    readonly currency: string;
  } | null;
  readonly user?: {
    readonly _id: string;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly avatar?: { readonly _id: string; readonly url: string } | null;
  } | null;
  readonly discounts?: ReadonlyArray<{
    readonly _id: string;
    readonly trigger: IOrderDiscountTrigger;
    readonly code?: string | null;
    readonly interface?: {
      readonly _id: string;
      readonly label?: string | null;
      readonly version?: string | null;
    } | null;
    readonly total: {
      readonly amount: number;
      readonly currency: string;
      readonly isTaxable: boolean;
      readonly isNetPrice: boolean;
    };
    readonly discounted?: ReadonlyArray<{
      readonly _id: string;
      readonly orderDiscount: {
        readonly _id: string;
        readonly total: {
          readonly amount: number;
          readonly currency: string;
          readonly isTaxable: boolean;
          readonly isNetPrice: boolean;
        };
      };
      readonly total: {
        readonly amount: number;
        readonly currency: string;
        readonly isTaxable: boolean;
        readonly isNetPrice: boolean;
      };
    }> | null;
  }> | null;
  readonly payment?: {
    readonly _id: string;
    readonly status?: IOrderPaymentStatus | null;
    readonly paid?: any | null;
    readonly provider?: {
      readonly _id: string;
      readonly type?: IPaymentProviderType | null;
      readonly interface?: {
        readonly _id: string;
        readonly label?: string | null;
        readonly version?: string | null;
      } | null;
    } | null;
    readonly fee?: {
      readonly currency: string;
      readonly amount: number;
    } | null;
  } | null;
  readonly delivery?: {
    readonly _id: string;
    readonly status?: IOrderDeliveryStatus | null;
    readonly delivered?: any | null;
    readonly provider?: {
      readonly _id: string;
      readonly type?: IDeliveryProviderType | null;
      readonly created?: any | null;
      readonly updated?: any | null;
      readonly deleted?: any | null;
      readonly configuration?: any | null;
      readonly interface?: {
        readonly _id: string;
        readonly label?: string | null;
        readonly version?: string | null;
      } | null;
    } | null;
    readonly fee?: {
      readonly isTaxable: boolean;
      readonly isNetPrice: boolean;
      readonly amount: number;
      readonly currency: string;
    } | null;
    readonly discounts?: ReadonlyArray<{
      readonly _id: string;
      readonly orderDiscount: {
        readonly _id: string;
        readonly trigger: IOrderDiscountTrigger;
        readonly code?: string | null;
        readonly order: {
          readonly _id: string;
          readonly orderNumber?: string | null;
        };
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
        readonly total: {
          readonly isTaxable: boolean;
          readonly isNetPrice: boolean;
          readonly amount: number;
          readonly currency: string;
        };
        readonly discounted?: ReadonlyArray<{
          readonly _id: string;
          readonly orderDiscount: {
            readonly _id: string;
            readonly trigger: IOrderDiscountTrigger;
            readonly code?: string | null;
            readonly order: {
              readonly _id: string;
              readonly orderNumber?: string | null;
            };
            readonly interface?: {
              readonly _id: string;
              readonly label?: string | null;
              readonly version?: string | null;
            } | null;
            readonly total: {
              readonly isTaxable: boolean;
              readonly isNetPrice: boolean;
              readonly amount: number;
              readonly currency: string;
            };
          };
        }> | null;
      };
    }> | null;
  } | null;
  readonly contact?: {
    readonly telNumber?: string | null;
    readonly emailAddress?: string | null;
  } | null;
  readonly country?: {
    readonly _id: string;
    readonly isoCode?: string | null;
    readonly flagEmoji?: string | null;
    readonly name?: string | null;
  } | null;
  readonly currency?: {
    readonly _id: string;
    readonly isoCode: string;
    readonly isActive?: boolean | null;
  } | null;
  readonly billingAddress?: {
    readonly firstName?: string | null;
    readonly lastName?: string | null;
    readonly company?: string | null;
    readonly addressLine?: string | null;
    readonly addressLine2?: string | null;
    readonly postalCode?: string | null;
    readonly countryCode?: string | null;
    readonly regionCode?: string | null;
    readonly city?: string | null;
  } | null;
  readonly total?: {
    readonly isTaxable: boolean;
    readonly amount: number;
    readonly currency: string;
  } | null;
  readonly items?: ReadonlyArray<{
    readonly _id: string;
    readonly quantity: number;
    readonly product: {
      readonly _id: string;
      readonly texts?: {
        readonly _id: string;
        readonly slug?: string | null;
        readonly brand?: string | null;
        readonly vendor?: string | null;
        readonly title?: string | null;
        readonly subtitle?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    };
    readonly unitPrice?: {
      readonly amount: number;
      readonly isTaxable: boolean;
      readonly isNetPrice: boolean;
      readonly currency: string;
    } | null;
    readonly total?: {
      readonly amount: number;
      readonly isTaxable: boolean;
      readonly isNetPrice: boolean;
      readonly currency: string;
    } | null;
  }> | null;
};

export type IOrderFragment = {
  readonly _id: string;
  readonly status?: IOrderStatus | null;
  readonly created?: any | null;
  readonly updated?: any | null;
  readonly ordered?: any | null;
  readonly orderNumber?: string | null;
  readonly confirmed?: any | null;
  readonly fullfilled?: any | null;
  readonly contact?: {
    readonly telNumber?: string | null;
    readonly emailAddress?: string | null;
  } | null;
  readonly total?: {
    readonly _id: string;
    readonly isTaxable: boolean;
    readonly isNetPrice: boolean;
    readonly amount: number;
    readonly currency: string;
  } | null;
  readonly user?: {
    readonly _id: string;
    readonly username?: string | null;
    readonly isGuest: boolean;
    readonly avatar?: { readonly _id: string; readonly url: string } | null;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
      } | null;
    } | null;
  } | null;
};

export type IConfirmOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type IConfirmOrderMutation = {
  readonly confirmOrder: { readonly _id: string };
};

export type IDeliverOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type IDeliverOrderMutation = {
  readonly deliverOrder: { readonly _id: string };
};

export type IOrderQueryVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type IOrderQuery = {
  readonly order?: {
    readonly _id: string;
    readonly orderNumber?: string | null;
    readonly status?: IOrderStatus | null;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly ordered?: any | null;
    readonly confirmed?: any | null;
    readonly fullfilled?: any | null;
    readonly totalTax?: {
      readonly amount: number;
      readonly currency: string;
    } | null;
    readonly itemsTotal?: {
      readonly amount: number;
      readonly currency: string;
    } | null;
    readonly totalDiscount?: {
      readonly amount: number;
      readonly currency: string;
    } | null;
    readonly totalPayment?: {
      readonly amount: number;
      readonly currency: string;
    } | null;
    readonly totalDelivery?: {
      readonly amount: number;
      readonly currency: string;
    } | null;
    readonly user?: {
      readonly _id: string;
      readonly username?: string | null;
      readonly isGuest: boolean;
      readonly avatar?: { readonly _id: string; readonly url: string } | null;
    } | null;
    readonly discounts?: ReadonlyArray<{
      readonly _id: string;
      readonly trigger: IOrderDiscountTrigger;
      readonly code?: string | null;
      readonly interface?: {
        readonly _id: string;
        readonly label?: string | null;
        readonly version?: string | null;
      } | null;
      readonly total: {
        readonly amount: number;
        readonly currency: string;
        readonly isTaxable: boolean;
        readonly isNetPrice: boolean;
      };
      readonly discounted?: ReadonlyArray<{
        readonly _id: string;
        readonly orderDiscount: {
          readonly _id: string;
          readonly total: {
            readonly amount: number;
            readonly currency: string;
            readonly isTaxable: boolean;
            readonly isNetPrice: boolean;
          };
        };
        readonly total: {
          readonly amount: number;
          readonly currency: string;
          readonly isTaxable: boolean;
          readonly isNetPrice: boolean;
        };
      }> | null;
    }> | null;
    readonly payment?: {
      readonly _id: string;
      readonly status?: IOrderPaymentStatus | null;
      readonly paid?: any | null;
      readonly provider?: {
        readonly _id: string;
        readonly type?: IPaymentProviderType | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      } | null;
      readonly fee?: {
        readonly currency: string;
        readonly amount: number;
      } | null;
    } | null;
    readonly delivery?: {
      readonly _id: string;
      readonly status?: IOrderDeliveryStatus | null;
      readonly delivered?: any | null;
      readonly provider?: {
        readonly _id: string;
        readonly type?: IDeliveryProviderType | null;
        readonly created?: any | null;
        readonly updated?: any | null;
        readonly deleted?: any | null;
        readonly configuration?: any | null;
        readonly interface?: {
          readonly _id: string;
          readonly label?: string | null;
          readonly version?: string | null;
        } | null;
      } | null;
      readonly fee?: {
        readonly isTaxable: boolean;
        readonly isNetPrice: boolean;
        readonly amount: number;
        readonly currency: string;
      } | null;
      readonly discounts?: ReadonlyArray<{
        readonly _id: string;
        readonly orderDiscount: {
          readonly _id: string;
          readonly trigger: IOrderDiscountTrigger;
          readonly code?: string | null;
          readonly order: {
            readonly _id: string;
            readonly orderNumber?: string | null;
          };
          readonly interface?: {
            readonly _id: string;
            readonly label?: string | null;
            readonly version?: string | null;
          } | null;
          readonly total: {
            readonly isTaxable: boolean;
            readonly isNetPrice: boolean;
            readonly amount: number;
            readonly currency: string;
          };
          readonly discounted?: ReadonlyArray<{
            readonly _id: string;
            readonly orderDiscount: {
              readonly _id: string;
              readonly trigger: IOrderDiscountTrigger;
              readonly code?: string | null;
              readonly order: {
                readonly _id: string;
                readonly orderNumber?: string | null;
              };
              readonly interface?: {
                readonly _id: string;
                readonly label?: string | null;
                readonly version?: string | null;
              } | null;
              readonly total: {
                readonly isTaxable: boolean;
                readonly isNetPrice: boolean;
                readonly amount: number;
                readonly currency: string;
              };
            };
          }> | null;
        };
      }> | null;
    } | null;
    readonly contact?: {
      readonly telNumber?: string | null;
      readonly emailAddress?: string | null;
    } | null;
    readonly country?: {
      readonly _id: string;
      readonly isoCode?: string | null;
      readonly flagEmoji?: string | null;
      readonly name?: string | null;
    } | null;
    readonly currency?: {
      readonly _id: string;
      readonly isoCode: string;
      readonly isActive?: boolean | null;
    } | null;
    readonly billingAddress?: {
      readonly firstName?: string | null;
      readonly lastName?: string | null;
      readonly company?: string | null;
      readonly addressLine?: string | null;
      readonly addressLine2?: string | null;
      readonly postalCode?: string | null;
      readonly countryCode?: string | null;
      readonly regionCode?: string | null;
      readonly city?: string | null;
    } | null;
    readonly total?: {
      readonly isTaxable: boolean;
      readonly amount: number;
      readonly currency: string;
    } | null;
    readonly items?: ReadonlyArray<{
      readonly _id: string;
      readonly quantity: number;
      readonly product: {
        readonly _id: string;
        readonly texts?: {
          readonly _id: string;
          readonly slug?: string | null;
          readonly brand?: string | null;
          readonly vendor?: string | null;
          readonly title?: string | null;
          readonly subtitle?: string | null;
        } | null;
        readonly media: ReadonlyArray<{
          readonly _id: string;
          readonly file: { readonly _id: string; readonly url: string };
        }>;
      };
      readonly unitPrice?: {
        readonly amount: number;
        readonly isTaxable: boolean;
        readonly isNetPrice: boolean;
        readonly currency: string;
      } | null;
      readonly total?: {
        readonly amount: number;
        readonly isTaxable: boolean;
        readonly isNetPrice: boolean;
        readonly currency: string;
      } | null;
    }> | null;
  } | null;
};

export type IOrderStatusQueryVariables = Exact<{ [key: string]: never }>;

export type IOrderStatusQuery = {
  readonly orderStatusType?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label?: string | null;
    }> | null;
  } | null;
};

export type IOrdersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  includeCarts?: InputMaybe<Scalars['Boolean']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
}>;

export type IOrdersQuery = {
  readonly ordersCount: number;
  readonly orders: ReadonlyArray<{
    readonly _id: string;
    readonly status?: IOrderStatus | null;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly ordered?: any | null;
    readonly orderNumber?: string | null;
    readonly confirmed?: any | null;
    readonly fullfilled?: any | null;
    readonly contact?: {
      readonly telNumber?: string | null;
      readonly emailAddress?: string | null;
    } | null;
    readonly total?: {
      readonly _id: string;
      readonly isTaxable: boolean;
      readonly isNetPrice: boolean;
      readonly amount: number;
      readonly currency: string;
    } | null;
    readonly user?: {
      readonly _id: string;
      readonly username?: string | null;
      readonly isGuest: boolean;
      readonly avatar?: { readonly _id: string; readonly url: string } | null;
      readonly profile?: {
        readonly displayName?: string | null;
        readonly address?: {
          readonly firstName?: string | null;
          readonly lastName?: string | null;
        } | null;
      } | null;
    } | null;
  }>;
};

export type IPayOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type IPayOrderMutation = { readonly payOrder: { readonly _id: string } };

export type IRejectOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type IRejectOrderMutation = {
  readonly rejectOrder: { readonly _id: string };
};

export type IRemoveOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type IRemoveOrderMutation = {
  readonly removeOrder: { readonly _id: string };
};

export type IUserOrderQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
}>;

export type IUserOrderQuery = {
  readonly user?: {
    readonly orders: ReadonlyArray<{
      readonly _id: string;
      readonly status?: IOrderStatus | null;
      readonly created?: any | null;
      readonly updated?: any | null;
      readonly ordered?: any | null;
      readonly orderNumber?: string | null;
      readonly confirmed?: any | null;
      readonly fullfilled?: any | null;
      readonly contact?: {
        readonly telNumber?: string | null;
        readonly emailAddress?: string | null;
      } | null;
      readonly total?: {
        readonly _id: string;
        readonly isTaxable: boolean;
        readonly isNetPrice: boolean;
        readonly amount: number;
        readonly currency: string;
      } | null;
      readonly user?: {
        readonly _id: string;
        readonly username?: string | null;
        readonly isGuest: boolean;
        readonly avatar?: { readonly _id: string; readonly url: string } | null;
        readonly profile?: {
          readonly displayName?: string | null;
          readonly address?: {
            readonly firstName?: string | null;
            readonly lastName?: string | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type IPaymentProviderFragment = {
  readonly _id: string;
  readonly created?: any | null;
  readonly updated?: any | null;
  readonly deleted?: any | null;
  readonly isActive?: boolean | null;
  readonly type?: IPaymentProviderType | null;
  readonly configuration?: any | null;
  readonly configurationError?: IPaymentProviderError | null;
  readonly interface?: {
    readonly _id: string;
    readonly label?: string | null;
    readonly version?: string | null;
  } | null;
};

export type ICreatePaymentProviderMutationVariables = Exact<{
  paymentProvider: ICreatePaymentProviderInput;
}>;

export type ICreatePaymentProviderMutation = {
  readonly createPaymentProvider: {
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly isActive?: boolean | null;
    readonly type?: IPaymentProviderType | null;
    readonly configuration?: any | null;
    readonly configurationError?: IPaymentProviderError | null;
    readonly interface?: {
      readonly _id: string;
      readonly label?: string | null;
      readonly version?: string | null;
    } | null;
  };
};

export type IPaymentInterfacesQueryVariables = Exact<{
  providerType: IPaymentProviderType;
}>;

export type IPaymentInterfacesQuery = {
  readonly paymentInterfaces: ReadonlyArray<{
    readonly _id: string;
    readonly label?: string | null;
    readonly value: string;
  }>;
};

export type IPaymentProviderQueryVariables = Exact<{
  paymentProviderId: Scalars['ID']['input'];
}>;

export type IPaymentProviderQuery = {
  readonly paymentProvider?: {
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly isActive?: boolean | null;
    readonly type?: IPaymentProviderType | null;
    readonly configuration?: any | null;
    readonly configurationError?: IPaymentProviderError | null;
    readonly interface?: {
      readonly _id: string;
      readonly label?: string | null;
      readonly version?: string | null;
    } | null;
  } | null;
};

export type IPaymentProvidersTypeQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IPaymentProvidersTypeQuery = {
  readonly paymentProviderType?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label?: string | null;
    }> | null;
  } | null;
};

export type IPaymentProvidersQueryVariables = Exact<{
  type?: InputMaybe<IPaymentProviderType>;
}>;

export type IPaymentProvidersQuery = {
  readonly paymentProviders: ReadonlyArray<{
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly isActive?: boolean | null;
    readonly type?: IPaymentProviderType | null;
    readonly configuration?: any | null;
    readonly configurationError?: IPaymentProviderError | null;
    readonly interface?: {
      readonly _id: string;
      readonly label?: string | null;
      readonly version?: string | null;
    } | null;
  }>;
};

export type IOrderPaymentStatusQueryVariables = Exact<{ [key: string]: never }>;

export type IOrderPaymentStatusQuery = {
  readonly paymentStatusTypes?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label?: string | null;
    }> | null;
  } | null;
};

export type IRemovePaymentProviderMutationVariables = Exact<{
  paymentProviderId: Scalars['ID']['input'];
}>;

export type IRemovePaymentProviderMutation = {
  readonly removePaymentProvider: { readonly _id: string };
};

export type IUpdatePaymentProviderMutationVariables = Exact<{
  paymentProvider: IUpdateProviderInput;
  paymentProviderId: Scalars['ID']['input'];
}>;

export type IUpdatePaymentProviderMutation = {
  readonly updatePaymentProvider: {
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly isActive?: boolean | null;
    readonly type?: IPaymentProviderType | null;
    readonly configuration?: any | null;
    readonly configurationError?: IPaymentProviderError | null;
    readonly interface?: {
      readonly _id: string;
      readonly label?: string | null;
      readonly version?: string | null;
    } | null;
  };
};

export type IProductReviewDetailFragment = {
  readonly _id: string;
  readonly created?: any | null;
  readonly updated?: any | null;
  readonly deleted?: any | null;
  readonly rating?: number | null;
  readonly title?: string | null;
  readonly review?: string | null;
  readonly upVote?: number | null;
  readonly downVote?: number | null;
  readonly voteReport?: number | null;
  readonly author: {
    readonly _id: string;
    readonly username?: string | null;
    readonly name: string;
    readonly isGuest: boolean;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
      } | null;
    } | null;
    readonly avatar?: { readonly _id: string; readonly url: string } | null;
  };
  readonly product: {
    readonly _id: string;
    readonly texts?: {
      readonly _id: string;
      readonly title?: string | null;
      readonly subtitle?: string | null;
    } | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly file: { readonly _id: string; readonly url: string };
    }>;
  };
  readonly ownVotes: ReadonlyArray<{
    readonly timestamp: any;
    readonly type: IProductReviewVoteType;
  }>;
};

export type IProductReviewFragment = {
  readonly _id: string;
  readonly created?: any | null;
  readonly updated?: any | null;
  readonly deleted?: any | null;
  readonly rating?: number | null;
  readonly title?: string | null;
  readonly upVote?: number | null;
  readonly downVote?: number | null;
  readonly voteReport?: number | null;
  readonly author: {
    readonly _id: string;
    readonly username?: string | null;
    readonly name: string;
    readonly isGuest: boolean;
    readonly profile?: {
      readonly displayName?: string | null;
      readonly address?: {
        readonly firstName?: string | null;
        readonly lastName?: string | null;
      } | null;
    } | null;
    readonly avatar?: { readonly _id: string; readonly url: string } | null;
  };
  readonly product: {
    readonly _id: string;
    readonly texts?: {
      readonly _id: string;
      readonly title?: string | null;
      readonly subtitle?: string | null;
    } | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly file: { readonly _id: string; readonly url: string };
    }>;
  };
};

export type IAddProductReviewVoteMutationVariables = Exact<{
  productReviewId: Scalars['ID']['input'];
  type: IProductReviewVoteType;
  meta?: InputMaybe<Scalars['JSON']['input']>;
}>;

export type IAddProductReviewVoteMutation = {
  readonly addProductReviewVote: {
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly rating?: number | null;
    readonly title?: string | null;
    readonly review?: string | null;
    readonly upVote?: number | null;
    readonly downVote?: number | null;
    readonly voteReport?: number | null;
    readonly author: {
      readonly _id: string;
      readonly username?: string | null;
      readonly name: string;
      readonly isGuest: boolean;
      readonly profile?: {
        readonly displayName?: string | null;
        readonly address?: {
          readonly firstName?: string | null;
          readonly lastName?: string | null;
        } | null;
      } | null;
      readonly avatar?: { readonly _id: string; readonly url: string } | null;
    };
    readonly product: {
      readonly _id: string;
      readonly texts?: {
        readonly _id: string;
        readonly title?: string | null;
        readonly subtitle?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    };
    readonly ownVotes: ReadonlyArray<{
      readonly timestamp: any;
      readonly type: IProductReviewVoteType;
    }>;
  };
};

export type ICreateProductReviewMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  productReview: IProductReviewInput;
}>;

export type ICreateProductReviewMutation = {
  readonly createProductReview: {
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly rating?: number | null;
    readonly title?: string | null;
    readonly review?: string | null;
    readonly upVote?: number | null;
    readonly downVote?: number | null;
    readonly voteReport?: number | null;
    readonly author: {
      readonly _id: string;
      readonly username?: string | null;
      readonly name: string;
      readonly isGuest: boolean;
      readonly profile?: {
        readonly displayName?: string | null;
        readonly address?: {
          readonly firstName?: string | null;
          readonly lastName?: string | null;
        } | null;
      } | null;
      readonly avatar?: { readonly _id: string; readonly url: string } | null;
    };
    readonly product: {
      readonly _id: string;
      readonly texts?: {
        readonly _id: string;
        readonly title?: string | null;
        readonly subtitle?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    };
    readonly ownVotes: ReadonlyArray<{
      readonly timestamp: any;
      readonly type: IProductReviewVoteType;
    }>;
  };
};

export type IProductReviewQueryVariables = Exact<{
  productReviewId: Scalars['ID']['input'];
}>;

export type IProductReviewQuery = {
  readonly productReview: {
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly rating?: number | null;
    readonly title?: string | null;
    readonly review?: string | null;
    readonly upVote?: number | null;
    readonly downVote?: number | null;
    readonly voteReport?: number | null;
    readonly author: {
      readonly _id: string;
      readonly username?: string | null;
      readonly name: string;
      readonly isGuest: boolean;
      readonly profile?: {
        readonly displayName?: string | null;
        readonly address?: {
          readonly firstName?: string | null;
          readonly lastName?: string | null;
        } | null;
      } | null;
      readonly avatar?: { readonly _id: string; readonly url: string } | null;
    };
    readonly product: {
      readonly _id: string;
      readonly texts?: {
        readonly _id: string;
        readonly title?: string | null;
        readonly subtitle?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    };
    readonly ownVotes: ReadonlyArray<{
      readonly timestamp: any;
      readonly type: IProductReviewVoteType;
    }>;
  };
};

export type IProductReviewByProductQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
}>;

export type IProductReviewByProductQuery = {
  readonly product?: {
    readonly _id: string;
    readonly reviewsCount: number;
    readonly reviews: ReadonlyArray<{
      readonly _id: string;
      readonly created?: any | null;
      readonly updated?: any | null;
      readonly deleted?: any | null;
      readonly rating?: number | null;
      readonly title?: string | null;
      readonly review?: string | null;
      readonly upVote?: number | null;
      readonly downVote?: number | null;
      readonly voteReport?: number | null;
      readonly author: {
        readonly _id: string;
        readonly username?: string | null;
        readonly name: string;
        readonly isGuest: boolean;
        readonly profile?: {
          readonly displayName?: string | null;
          readonly address?: {
            readonly firstName?: string | null;
            readonly lastName?: string | null;
          } | null;
        } | null;
        readonly avatar?: { readonly _id: string; readonly url: string } | null;
      };
      readonly product: {
        readonly _id: string;
        readonly texts?: {
          readonly _id: string;
          readonly title?: string | null;
          readonly subtitle?: string | null;
        } | null;
        readonly media: ReadonlyArray<{
          readonly _id: string;
          readonly file: { readonly _id: string; readonly url: string };
        }>;
      };
      readonly ownVotes: ReadonlyArray<{
        readonly timestamp: any;
        readonly type: IProductReviewVoteType;
      }>;
    }>;
  } | null;
};

export type IRemoveProductReviewMutationVariables = Exact<{
  productReviewId: Scalars['ID']['input'];
}>;

export type IRemoveProductReviewMutation = {
  readonly removeProductReview: { readonly _id: string };
};

export type IRemoveProductReviewVoteMutationVariables = Exact<{
  productReviewId: Scalars['ID']['input'];
  type: IProductReviewVoteType;
}>;

export type IRemoveProductReviewVoteMutation = {
  readonly removeProductReviewVote: {
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly rating?: number | null;
    readonly title?: string | null;
    readonly review?: string | null;
    readonly upVote?: number | null;
    readonly downVote?: number | null;
    readonly voteReport?: number | null;
    readonly author: {
      readonly _id: string;
      readonly username?: string | null;
      readonly name: string;
      readonly isGuest: boolean;
      readonly profile?: {
        readonly displayName?: string | null;
        readonly address?: {
          readonly firstName?: string | null;
          readonly lastName?: string | null;
        } | null;
      } | null;
      readonly avatar?: { readonly _id: string; readonly url: string } | null;
    };
    readonly product: {
      readonly _id: string;
      readonly texts?: {
        readonly _id: string;
        readonly title?: string | null;
        readonly subtitle?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    };
    readonly ownVotes: ReadonlyArray<{
      readonly timestamp: any;
      readonly type: IProductReviewVoteType;
    }>;
  };
};

export type IUserProductReviewsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
}>;

export type IUserProductReviewsQuery = {
  readonly user?: {
    readonly _id: string;
    readonly reviewsCount: number;
    readonly reviews: ReadonlyArray<{
      readonly _id: string;
      readonly created?: any | null;
      readonly updated?: any | null;
      readonly deleted?: any | null;
      readonly rating?: number | null;
      readonly title?: string | null;
      readonly review?: string | null;
      readonly upVote?: number | null;
      readonly downVote?: number | null;
      readonly voteReport?: number | null;
      readonly product: {
        readonly _id: string;
        readonly sequence: number;
        readonly status: IProductStatus;
        readonly tags?: ReadonlyArray<any> | null;
        readonly updated?: any | null;
        readonly published?: any | null;
        readonly texts?: {
          readonly _id: string;
          readonly title?: string | null;
          readonly subtitle?: string | null;
          readonly slug?: string | null;
          readonly description?: string | null;
          readonly vendor?: string | null;
          readonly brand?: string | null;
          readonly labels?: ReadonlyArray<string> | null;
        } | null;
        readonly media: ReadonlyArray<{
          readonly _id: string;
          readonly tags?: ReadonlyArray<any> | null;
          readonly file: { readonly _id: string; readonly url: string };
        }>;
      };
      readonly author: {
        readonly _id: string;
        readonly username?: string | null;
        readonly name: string;
        readonly isGuest: boolean;
        readonly profile?: {
          readonly displayName?: string | null;
          readonly address?: {
            readonly firstName?: string | null;
            readonly lastName?: string | null;
          } | null;
        } | null;
        readonly avatar?: { readonly _id: string; readonly url: string } | null;
      };
      readonly ownVotes: ReadonlyArray<{
        readonly timestamp: any;
        readonly type: IProductReviewVoteType;
      }>;
    }>;
  } | null;
};

export type IProductAssignmentFragment = {
  readonly _id: string;
  readonly vectors?: ReadonlyArray<{
    readonly _id: string;
    readonly option?: {
      readonly _id: string;
      readonly value?: string | null;
      readonly texts?: {
        readonly _id: string;
        readonly title?: string | null;
        readonly subtitle?: string | null;
      } | null;
    } | null;
    readonly variation?: {
      readonly _id: string;
      readonly key?: string | null;
      readonly texts?: {
        readonly _id: string;
        readonly locale?: string | null;
        readonly title?: string | null;
      } | null;
    } | null;
  }> | null;
  readonly product?: {
    readonly _id: string;
    readonly texts?: {
      readonly _id: string;
      readonly title?: string | null;
      readonly slug?: string | null;
      readonly subtitle?: string | null;
    } | null;
  } | null;
};

export type IProductBriefFragment = {
  readonly _id: string;
  readonly sequence: number;
  readonly status: IProductStatus;
  readonly tags?: ReadonlyArray<any> | null;
  readonly updated?: any | null;
  readonly published?: any | null;
  readonly texts?: {
    readonly _id: string;
    readonly slug?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
    readonly description?: string | null;
    readonly vendor?: string | null;
    readonly brand?: string | null;
    readonly labels?: ReadonlyArray<string> | null;
  } | null;
  readonly media: ReadonlyArray<{
    readonly _id: string;
    readonly tags?: ReadonlyArray<any> | null;
    readonly file: { readonly _id: string; readonly url: string };
  }>;
};

export type IProductCatalogPriceFragment = {
  readonly _id: string;
  readonly isTaxable: boolean;
  readonly isNetPrice: boolean;
  readonly amount: number;
  readonly maxQuantity?: number | null;
  readonly country: {
    readonly _id: string;
    readonly isoCode?: string | null;
    readonly name?: string | null;
    readonly flagEmoji?: string | null;
  };
  readonly currency: {
    readonly _id: string;
    readonly isoCode: string;
    readonly isActive?: boolean | null;
  };
};

export type IProductDetailFragment = {
  readonly _id: string;
  readonly sequence: number;
  readonly status: IProductStatus;
  readonly created?: any | null;
  readonly tags?: ReadonlyArray<any> | null;
  readonly updated?: any | null;
  readonly published?: any | null;
  readonly media: ReadonlyArray<{
    readonly _id: string;
    readonly tags?: ReadonlyArray<any> | null;
    readonly file: { readonly _id: string; readonly url: string };
  }>;
  readonly reviews: ReadonlyArray<{
    readonly _id: string;
    readonly created?: any | null;
    readonly rating?: number | null;
    readonly title?: string | null;
    readonly review?: string | null;
    readonly voteCount?: number | null;
    readonly author: {
      readonly _id: string;
      readonly username?: string | null;
      readonly isGuest: boolean;
    };
    readonly ownVotes: ReadonlyArray<{
      readonly type: IProductReviewVoteType;
      readonly timestamp: any;
    }>;
  }>;
  readonly siblings: ReadonlyArray<{
    readonly _id: string;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly file: { readonly _id: string; readonly url: string };
    }>;
  }>;
};

export type IProductDimensionFragment = {
  readonly weight?: number | null;
  readonly length?: number | null;
  readonly width?: number | null;
  readonly height?: number | null;
};

export type IProductMediaFragment = {
  readonly _id: string;
  readonly tags?: ReadonlyArray<any> | null;
  readonly sortKey: number;
  readonly file: {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly size: number;
    readonly url: string;
  };
  readonly texts?: {
    readonly _id: string;
    readonly locale?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
  } | null;
};

export type IProductMediaTextsFragment = {
  readonly _id: string;
  readonly locale?: string | null;
  readonly title?: string | null;
  readonly subtitle?: string | null;
};

export type IProductPlanConfigurationFragment = {
  readonly usageCalculationType: IProductPlanUsageCalculationType;
  readonly billingInterval: IProductPlanConfigurationInterval;
  readonly trialInterval?: IProductPlanConfigurationInterval | null;
  readonly trialIntervalCount?: number | null;
  readonly billingIntervalCount?: number | null;
};

export type IProductTextsFragment = {
  readonly _id: string;
  readonly locale?: string | null;
  readonly slug?: string | null;
  readonly title?: string | null;
  readonly subtitle?: string | null;
  readonly description?: string | null;
  readonly vendor?: string | null;
  readonly brand?: string | null;
  readonly labels?: ReadonlyArray<string> | null;
};

export type IProductVariationFragment = {
  readonly _id: string;
  readonly type?: IProductVariationType | null;
  readonly key?: string | null;
  readonly texts?: {
    readonly _id: string;
    readonly locale?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
  } | null;
  readonly options?: ReadonlyArray<{
    readonly _id: string;
    readonly value?: string | null;
    readonly texts?: {
      readonly _id: string;
      readonly locale?: string | null;
      readonly title?: string | null;
      readonly subtitle?: string | null;
    } | null;
  }> | null;
};

export type ITokenFragment = {
  readonly _id: string;
  readonly walletAddress?: string | null;
  readonly status: ITokenExportStatus;
  readonly quantity: number;
  readonly contractAddress?: string | null;
  readonly chainId?: string | null;
  readonly chainTokenId?: string | null;
};

export type IAddProductAssignmentMutationVariables = Exact<{
  proxyId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  vectors: ReadonlyArray<IProductAssignmentVectorInput>;
}>;

export type IAddProductAssignmentMutation = {
  readonly addProductAssignment: { readonly _id: string };
};

export type IAddProductMediaMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  media: Scalars['Upload']['input'];
}>;

export type IAddProductMediaMutation = {
  readonly addProductMedia: { readonly _id: string };
};

export type ICreateProductMutationVariables = Exact<{
  product: ICreateProductInput;
}>;

export type ICreateProductMutation = {
  readonly createProduct: {
    readonly _id: string;
    readonly sequence: number;
    readonly status: IProductStatus;
    readonly created?: any | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly updated?: any | null;
    readonly published?: any | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly tags?: ReadonlyArray<any> | null;
      readonly file: { readonly _id: string; readonly url: string };
    }>;
    readonly reviews: ReadonlyArray<{
      readonly _id: string;
      readonly created?: any | null;
      readonly rating?: number | null;
      readonly title?: string | null;
      readonly review?: string | null;
      readonly voteCount?: number | null;
      readonly author: {
        readonly _id: string;
        readonly username?: string | null;
        readonly isGuest: boolean;
      };
      readonly ownVotes: ReadonlyArray<{
        readonly type: IProductReviewVoteType;
        readonly timestamp: any;
      }>;
    }>;
    readonly siblings: ReadonlyArray<{
      readonly _id: string;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    }>;
  };
};

export type ICreateProductBundleItemMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  item: ICreateProductBundleItemInput;
}>;

export type ICreateProductBundleItemMutation = {
  readonly createProductBundleItem: { readonly _id: string };
};

export type ICreateProductVariationMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  variation: ICreateProductVariationInput;
}>;

export type ICreateProductVariationMutation = {
  readonly createProductVariation: { readonly _id: string };
};

export type ICreateProductVariationOptionMutationVariables = Exact<{
  productVariationId: Scalars['ID']['input'];
  option: ICreateProductVariationOptionInput;
}>;

export type ICreateProductVariationOptionMutation = {
  readonly createProductVariationOption: { readonly _id: string };
};

export type IExportTokenMutationVariables = Exact<{
  tokenId: Scalars['ID']['input'];
  quantity?: Scalars['Int']['input'];
  recipientWalletAddress: Scalars['String']['input'];
}>;

export type IExportTokenMutation = {
  readonly exportToken: {
    readonly _id: string;
    readonly walletAddress?: string | null;
    readonly status: ITokenExportStatus;
    readonly quantity: number;
    readonly contractAddress?: string | null;
    readonly chainId?: string | null;
    readonly chainTokenId?: string | null;
  };
};

export type IProductQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductQuery = {
  readonly product?:
    | {
        readonly _id: string;
        readonly sequence: number;
        readonly status: IProductStatus;
        readonly created?: any | null;
        readonly tags?: ReadonlyArray<any> | null;
        readonly updated?: any | null;
        readonly published?: any | null;
        readonly texts?: {
          readonly _id: string;
          readonly title?: string | null;
          readonly subtitle?: string | null;
          readonly description?: string | null;
        } | null;
        readonly media: ReadonlyArray<{
          readonly _id: string;
          readonly tags?: ReadonlyArray<any> | null;
          readonly file: { readonly _id: string; readonly url: string };
        }>;
        readonly reviews: ReadonlyArray<{
          readonly _id: string;
          readonly created?: any | null;
          readonly rating?: number | null;
          readonly title?: string | null;
          readonly review?: string | null;
          readonly voteCount?: number | null;
          readonly author: {
            readonly _id: string;
            readonly username?: string | null;
            readonly isGuest: boolean;
          };
          readonly ownVotes: ReadonlyArray<{
            readonly type: IProductReviewVoteType;
            readonly timestamp: any;
          }>;
        }>;
        readonly siblings: ReadonlyArray<{
          readonly _id: string;
          readonly media: ReadonlyArray<{
            readonly _id: string;
            readonly file: { readonly _id: string; readonly url: string };
          }>;
        }>;
      }
    | {
        readonly _id: string;
        readonly sequence: number;
        readonly status: IProductStatus;
        readonly created?: any | null;
        readonly tags?: ReadonlyArray<any> | null;
        readonly updated?: any | null;
        readonly published?: any | null;
        readonly media: ReadonlyArray<{
          readonly _id: string;
          readonly tags?: ReadonlyArray<any> | null;
          readonly file: { readonly _id: string; readonly url: string };
        }>;
        readonly reviews: ReadonlyArray<{
          readonly _id: string;
          readonly created?: any | null;
          readonly rating?: number | null;
          readonly title?: string | null;
          readonly review?: string | null;
          readonly voteCount?: number | null;
          readonly author: {
            readonly _id: string;
            readonly username?: string | null;
            readonly isGuest: boolean;
          };
          readonly ownVotes: ReadonlyArray<{
            readonly type: IProductReviewVoteType;
            readonly timestamp: any;
          }>;
        }>;
        readonly siblings: ReadonlyArray<{
          readonly _id: string;
          readonly media: ReadonlyArray<{
            readonly _id: string;
            readonly file: { readonly _id: string; readonly url: string };
          }>;
        }>;
      }
    | null;
};

export type IProductAssignmentsQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductAssignmentsQuery = {
  readonly product?:
    | { readonly _id: string }
    | {
        readonly _id: string;
        readonly texts?: {
          readonly _id: string;
          readonly subtitle?: string | null;
          readonly slug?: string | null;
          readonly title?: string | null;
        } | null;
        readonly variations?: ReadonlyArray<{
          readonly _id: string;
          readonly key?: string | null;
          readonly texts?: {
            readonly _id: string;
            readonly title?: string | null;
          } | null;
          readonly options?: ReadonlyArray<{
            readonly _id: string;
            readonly value?: string | null;
            readonly texts?: {
              readonly _id: string;
              readonly title?: string | null;
            } | null;
          }> | null;
        }> | null;
        readonly assignments: ReadonlyArray<{
          readonly _id: string;
          readonly vectors?: ReadonlyArray<{
            readonly _id: string;
            readonly option?: {
              readonly _id: string;
              readonly value?: string | null;
              readonly texts?: {
                readonly _id: string;
                readonly title?: string | null;
                readonly subtitle?: string | null;
              } | null;
            } | null;
            readonly variation?: {
              readonly _id: string;
              readonly key?: string | null;
              readonly texts?: {
                readonly _id: string;
                readonly locale?: string | null;
                readonly title?: string | null;
              } | null;
            } | null;
          }> | null;
          readonly product?: {
            readonly _id: string;
            readonly texts?: {
              readonly _id: string;
              readonly title?: string | null;
              readonly slug?: string | null;
              readonly subtitle?: string | null;
            } | null;
          } | null;
        }>;
      }
    | null;
};

export type IProductBundleItemsQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductBundleItemsQuery = {
  readonly product?:
    | {
        readonly _id: string;
        readonly bundleItems?: ReadonlyArray<{
          readonly quantity: number;
          readonly product: {
            readonly _id: string;
            readonly sequence: number;
            readonly status: IProductStatus;
            readonly tags?: ReadonlyArray<any> | null;
            readonly updated?: any | null;
            readonly published?: any | null;
            readonly texts?: {
              readonly _id: string;
              readonly slug?: string | null;
              readonly title?: string | null;
              readonly subtitle?: string | null;
              readonly description?: string | null;
              readonly vendor?: string | null;
              readonly brand?: string | null;
              readonly labels?: ReadonlyArray<string> | null;
            } | null;
            readonly media: ReadonlyArray<{
              readonly _id: string;
              readonly tags?: ReadonlyArray<any> | null;
              readonly file: { readonly _id: string; readonly url: string };
            }>;
          };
        }> | null;
      }
    | { readonly _id: string }
    | null;
};

export type IProductCatalogPricesQueryVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type IProductCatalogPricesQuery = {
  readonly productCatalogPrices: ReadonlyArray<{
    readonly _id: string;
    readonly isTaxable: boolean;
    readonly isNetPrice: boolean;
    readonly amount: number;
    readonly maxQuantity?: number | null;
    readonly country: {
      readonly _id: string;
      readonly isoCode?: string | null;
      readonly name?: string | null;
      readonly flagEmoji?: string | null;
    };
    readonly currency: {
      readonly _id: string;
      readonly isoCode: string;
      readonly isActive?: boolean | null;
    };
  }>;
};

export type IProductDimensionUnitsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IProductDimensionUnitsQuery = {
  readonly massUnits?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label?: string | null;
    }> | null;
  } | null;
  readonly lengthUnits?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label?: string | null;
    }> | null;
  } | null;
};

export type IProductMediaQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductMediaQuery = {
  readonly product?: {
    readonly _id: string;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly tags?: ReadonlyArray<any> | null;
      readonly sortKey: number;
      readonly file: {
        readonly _id: string;
        readonly name: string;
        readonly type: string;
        readonly size: number;
        readonly url: string;
      };
      readonly texts?: {
        readonly _id: string;
        readonly locale?: string | null;
        readonly title?: string | null;
        readonly subtitle?: string | null;
      } | null;
    }>;
  } | null;
};

export type IProductPlanQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductPlanQuery = {
  readonly product?:
    | { readonly _id: string }
    | {
        readonly _id: string;
        readonly plan?: {
          readonly usageCalculationType: IProductPlanUsageCalculationType;
          readonly billingInterval: IProductPlanConfigurationInterval;
          readonly trialInterval?: IProductPlanConfigurationInterval | null;
          readonly trialIntervalCount?: number | null;
          readonly billingIntervalCount?: number | null;
        } | null;
      }
    | null;
};

export type IProductPlanConfigurationOptionsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IProductPlanConfigurationOptionsQuery = {
  readonly usageCalculationTypes?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label?: string | null;
    }> | null;
  } | null;
  readonly configurationIntervals?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label?: string | null;
    }> | null;
  } | null;
};

export type IProductReviewsQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
}>;

export type IProductReviewsQuery = {
  readonly productReviews: ReadonlyArray<{
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly rating?: number | null;
    readonly title?: string | null;
    readonly review?: string | null;
    readonly upVote?: number | null;
    readonly downVote?: number | null;
    readonly voteReport?: number | null;
    readonly author: {
      readonly _id: string;
      readonly username?: string | null;
      readonly name: string;
      readonly isGuest: boolean;
      readonly profile?: {
        readonly displayName?: string | null;
        readonly address?: {
          readonly firstName?: string | null;
          readonly lastName?: string | null;
        } | null;
      } | null;
      readonly avatar?: { readonly _id: string; readonly url: string } | null;
    };
    readonly product: {
      readonly _id: string;
      readonly texts?: {
        readonly _id: string;
        readonly title?: string | null;
        readonly subtitle?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    };
    readonly ownVotes: ReadonlyArray<{
      readonly timestamp: any;
      readonly type: IProductReviewVoteType;
    }>;
  }>;
};

export type IProductSupplyQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductSupplyQuery = {
  readonly product?:
    | { readonly _id: string }
    | {
        readonly _id: string;
        readonly dimensions?: {
          readonly weight?: number | null;
          readonly length?: number | null;
          readonly width?: number | null;
          readonly height?: number | null;
        } | null;
      }
    | null;
};

export type IProductTokenizationQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductTokenizationQuery = {
  readonly product?:
    | { readonly _id: string }
    | {
        readonly contractStandard?: ISmartContractStandard | null;
        readonly contractAddress?: string | null;
        readonly _id: string;
        readonly contractConfiguration?: {
          readonly tokenId: string;
          readonly supply: number;
        } | null;
      }
    | null;
};

export type IProductVariationTypeQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IProductVariationTypeQuery = {
  readonly variationTypes?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label?: string | null;
    }> | null;
  } | null;
};

export type IProductVariationsQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductVariationsQuery = {
  readonly product?:
    | { readonly _id: string }
    | {
        readonly _id: string;
        readonly variations?: ReadonlyArray<{
          readonly _id: string;
          readonly type?: IProductVariationType | null;
          readonly key?: string | null;
          readonly texts?: {
            readonly _id: string;
            readonly locale?: string | null;
            readonly title?: string | null;
            readonly subtitle?: string | null;
          } | null;
          readonly options?: ReadonlyArray<{
            readonly _id: string;
            readonly value?: string | null;
            readonly texts?: {
              readonly _id: string;
              readonly locale?: string | null;
              readonly title?: string | null;
              readonly subtitle?: string | null;
            } | null;
          }> | null;
        }> | null;
      }
    | null;
};

export type IProductWarehousingQueryVariables = Exact<{
  productId?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
}>;

export type IProductWarehousingQuery = {
  readonly product?:
    | { readonly _id: string }
    | {
        readonly sku?: string | null;
        readonly baseUnit?: string | null;
        readonly _id: string;
      }
    | null;
};

export type IProductsQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<ReadonlyArray<Scalars['LowerCaseString']['input']>>;
  slugs?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  includeDrafts?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
}>;

export type IProductsQuery = {
  readonly productsCount: number;
  readonly products: ReadonlyArray<{
    readonly _id: string;
    readonly sequence: number;
    readonly status: IProductStatus;
    readonly tags?: ReadonlyArray<any> | null;
    readonly updated?: any | null;
    readonly published?: any | null;
    readonly texts?: {
      readonly _id: string;
      readonly slug?: string | null;
      readonly title?: string | null;
      readonly subtitle?: string | null;
      readonly description?: string | null;
      readonly vendor?: string | null;
      readonly brand?: string | null;
      readonly labels?: ReadonlyArray<string> | null;
    } | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly tags?: ReadonlyArray<any> | null;
      readonly file: { readonly _id: string; readonly url: string };
    }>;
  }>;
};

export type IProductsCountQueryVariables = Exact<{ [key: string]: never }>;

export type IProductsCountQuery = { readonly productsCount: number };

export type IPublishProductMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type IPublishProductMutation = {
  readonly publishProduct: {
    readonly _id: string;
    readonly sequence: number;
    readonly status: IProductStatus;
    readonly created?: any | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly updated?: any | null;
    readonly published?: any | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly tags?: ReadonlyArray<any> | null;
      readonly file: { readonly _id: string; readonly url: string };
    }>;
    readonly reviews: ReadonlyArray<{
      readonly _id: string;
      readonly created?: any | null;
      readonly rating?: number | null;
      readonly title?: string | null;
      readonly review?: string | null;
      readonly voteCount?: number | null;
      readonly author: {
        readonly _id: string;
        readonly username?: string | null;
        readonly isGuest: boolean;
      };
      readonly ownVotes: ReadonlyArray<{
        readonly type: IProductReviewVoteType;
        readonly timestamp: any;
      }>;
    }>;
    readonly siblings: ReadonlyArray<{
      readonly _id: string;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    }>;
  };
};

export type IReOrderProductMediaMutationVariables = Exact<{
  sortKeys: ReadonlyArray<IReorderProductMediaInput>;
}>;

export type IReOrderProductMediaMutation = {
  readonly reorderProductMedia: ReadonlyArray<{ readonly _id: string }>;
};

export type IRemoveBundleItemMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  index: Scalars['Int']['input'];
}>;

export type IRemoveBundleItemMutation = {
  readonly removeBundleItem: { readonly _id: string };
};

export type IRemoveProductMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type IRemoveProductMutation = {
  readonly removeProduct: { readonly _id: string };
};

export type IRemoveProductAssignmentMutationVariables = Exact<{
  proxyId: Scalars['ID']['input'];
  vectors: ReadonlyArray<IProductAssignmentVectorInput>;
}>;

export type IRemoveProductAssignmentMutation = {
  readonly removeProductAssignment: { readonly _id: string };
};

export type IRemoveProductMediaMutationVariables = Exact<{
  productMediaId: Scalars['ID']['input'];
}>;

export type IRemoveProductMediaMutation = {
  readonly removeProductMedia: { readonly _id: string };
};

export type IRemoveProductVariationMutationVariables = Exact<{
  productVariationId: Scalars['ID']['input'];
}>;

export type IRemoveProductVariationMutation = {
  readonly removeProductVariation: { readonly _id: string };
};

export type IRemoveProductVariationOptionMutationVariables = Exact<{
  productVariationId: Scalars['ID']['input'];
  productVariationOptionValue: Scalars['String']['input'];
}>;

export type IRemoveProductVariationOptionMutation = {
  readonly removeProductVariationOption: { readonly _id: string };
};

export type ISearchProductsQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  filterQuery?: InputMaybe<ReadonlyArray<IFilterQueryInput>>;
  assortmentId?: InputMaybe<Scalars['ID']['input']>;
  orderBy?: InputMaybe<ISearchOrderBy>;
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>;
  ignoreChildAssortments?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;

export type ISearchProductsQuery = {
  readonly searchProducts: {
    readonly productsCount: number;
    readonly filteredProductsCount: number;
    readonly products: ReadonlyArray<{
      readonly _id: string;
      readonly sequence: number;
      readonly status: IProductStatus;
      readonly tags?: ReadonlyArray<any> | null;
      readonly updated?: any | null;
      readonly published?: any | null;
      readonly texts?: {
        readonly _id: string;
        readonly slug?: string | null;
        readonly title?: string | null;
        readonly subtitle?: string | null;
        readonly description?: string | null;
        readonly vendor?: string | null;
        readonly brand?: string | null;
        readonly labels?: ReadonlyArray<string> | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly tags?: ReadonlyArray<any> | null;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    }>;
  };
};

export type ISmartContractStandardsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type ISmartContractStandardsQuery = {
  readonly smartContractStandards?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label: string;
    }> | null;
  } | null;
};

export type ITranslatedProductMediaTextsQueryVariables = Exact<{
  productMediaId: Scalars['ID']['input'];
}>;

export type ITranslatedProductMediaTextsQuery = {
  readonly translatedProductMediaTexts: ReadonlyArray<{
    readonly _id: string;
    readonly locale?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
  }>;
};

export type ITranslatedProductTextsQueryVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type ITranslatedProductTextsQuery = {
  readonly translatedProductTexts: ReadonlyArray<{
    readonly _id: string;
    readonly locale?: string | null;
    readonly slug?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
    readonly description?: string | null;
    readonly vendor?: string | null;
    readonly brand?: string | null;
    readonly labels?: ReadonlyArray<string> | null;
  }>;
};

export type ITranslatedProductVariationTextsQueryVariables = Exact<{
  productVariationId: Scalars['ID']['input'];
  productVariationOptionValue?: InputMaybe<Scalars['String']['input']>;
}>;

export type ITranslatedProductVariationTextsQuery = {
  readonly translatedProductVariationTexts: ReadonlyArray<{
    readonly _id: string;
    readonly locale?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
  }>;
};

export type IUnpublishProductMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
}>;

export type IUnpublishProductMutation = {
  readonly unpublishProduct: {
    readonly _id: string;
    readonly sequence: number;
    readonly status: IProductStatus;
    readonly created?: any | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly updated?: any | null;
    readonly published?: any | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly tags?: ReadonlyArray<any> | null;
      readonly file: { readonly _id: string; readonly url: string };
    }>;
    readonly reviews: ReadonlyArray<{
      readonly _id: string;
      readonly created?: any | null;
      readonly rating?: number | null;
      readonly title?: string | null;
      readonly review?: string | null;
      readonly voteCount?: number | null;
      readonly author: {
        readonly _id: string;
        readonly username?: string | null;
        readonly isGuest: boolean;
      };
      readonly ownVotes: ReadonlyArray<{
        readonly type: IProductReviewVoteType;
        readonly timestamp: any;
      }>;
    }>;
    readonly siblings: ReadonlyArray<{
      readonly _id: string;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    }>;
  };
};

export type IUpdateProductMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  product: IUpdateProductInput;
}>;

export type IUpdateProductMutation = {
  readonly updateProduct?: {
    readonly _id: string;
    readonly sequence: number;
    readonly status: IProductStatus;
    readonly created?: any | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly updated?: any | null;
    readonly published?: any | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly tags?: ReadonlyArray<any> | null;
      readonly file: { readonly _id: string; readonly url: string };
    }>;
    readonly reviews: ReadonlyArray<{
      readonly _id: string;
      readonly created?: any | null;
      readonly rating?: number | null;
      readonly title?: string | null;
      readonly review?: string | null;
      readonly voteCount?: number | null;
      readonly author: {
        readonly _id: string;
        readonly username?: string | null;
        readonly isGuest: boolean;
      };
      readonly ownVotes: ReadonlyArray<{
        readonly type: IProductReviewVoteType;
        readonly timestamp: any;
      }>;
    }>;
    readonly siblings: ReadonlyArray<{
      readonly _id: string;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    }>;
  } | null;
};

export type IUpdateProductCommerceMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  commerce: IUpdateProductCommerceInput;
}>;

export type IUpdateProductCommerceMutation = {
  readonly updateProductCommerce?: {
    readonly _id: string;
    readonly sequence: number;
    readonly status: IProductStatus;
    readonly created?: any | null;
    readonly tags?: ReadonlyArray<any> | null;
    readonly updated?: any | null;
    readonly published?: any | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly tags?: ReadonlyArray<any> | null;
      readonly file: { readonly _id: string; readonly url: string };
    }>;
    readonly reviews: ReadonlyArray<{
      readonly _id: string;
      readonly created?: any | null;
      readonly rating?: number | null;
      readonly title?: string | null;
      readonly review?: string | null;
      readonly voteCount?: number | null;
      readonly author: {
        readonly _id: string;
        readonly username?: string | null;
        readonly isGuest: boolean;
      };
      readonly ownVotes: ReadonlyArray<{
        readonly type: IProductReviewVoteType;
        readonly timestamp: any;
      }>;
    }>;
    readonly siblings: ReadonlyArray<{
      readonly _id: string;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: { readonly _id: string; readonly url: string };
      }>;
    }>;
  } | null;
};

export type IUpdateProductMediaTextsMutationVariables = Exact<{
  productMediaId: Scalars['ID']['input'];
  texts: ReadonlyArray<IUpdateProductMediaTextInput>;
}>;

export type IUpdateProductMediaTextsMutation = {
  readonly updateProductMediaTexts: ReadonlyArray<{
    readonly _id: string;
    readonly locale?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
  }>;
};

export type IUpdateProductPlanMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  plan: IUpdateProductPlanInput;
}>;

export type IUpdateProductPlanMutation = {
  readonly updateProductPlan?: { readonly _id: string } | null;
};

export type IUpdateProductSupplyMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  supply: IUpdateProductSupplyInput;
}>;

export type IUpdateProductSupplyMutation = {
  readonly updateProductSupply?:
    | { readonly _id: string }
    | {
        readonly _id: string;
        readonly dimensions?: {
          readonly weight?: number | null;
          readonly length?: number | null;
          readonly width?: number | null;
          readonly height?: number | null;
        } | null;
      }
    | null;
};

export type IUpdateProductTextsMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  texts: ReadonlyArray<IUpdateProductTextInput>;
}>;

export type IUpdateProductTextsMutation = {
  readonly updateProductTexts: ReadonlyArray<{
    readonly _id: string;
    readonly locale?: string | null;
    readonly slug?: string | null;
    readonly title?: string | null;
    readonly subtitle?: string | null;
    readonly description?: string | null;
    readonly vendor?: string | null;
    readonly brand?: string | null;
    readonly labels?: ReadonlyArray<string> | null;
  }>;
};

export type IUpdateProductTokenizationMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  tokenization: IUpdateProductTokenizationInput;
}>;

export type IUpdateProductTokenizationMutation = {
  readonly updateProductTokenization?: { readonly _id: string } | null;
};

export type IUpdateProductVariationTextsMutationVariables = Exact<{
  productVariationId: Scalars['ID']['input'];
  productVariationOptionValue?: InputMaybe<Scalars['String']['input']>;
  texts: ReadonlyArray<IUpdateProductVariationTextInput>;
}>;

export type IUpdateProductVariationTextsMutation = {
  readonly updateProductVariationTexts: ReadonlyArray<{ readonly _id: string }>;
};

export type IUpdateProductWarehousingMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  warehousing: IUpdateProductWarehousingInput;
}>;

export type IUpdateProductWarehousingMutation = {
  readonly updateProductWarehousing?:
    | { readonly _id: string }
    | {
        readonly sku?: string | null;
        readonly baseUnit?: string | null;
        readonly _id: string;
      }
    | null;
};

export type IUserTokensQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;

export type IUserTokensQuery = {
  readonly user?: {
    readonly _id: string;
    readonly web3Addresses: ReadonlyArray<{
      readonly address: string;
      readonly nonce?: number | null;
      readonly verified: boolean;
    }>;
    readonly tokens: ReadonlyArray<{
      readonly _id: string;
      readonly walletAddress?: string | null;
      readonly status: ITokenExportStatus;
      readonly quantity: number;
      readonly contractAddress?: string | null;
      readonly chainId?: string | null;
      readonly chainTokenId?: string | null;
      readonly product: {
        readonly _id: string;
        readonly sequence: number;
        readonly status: IProductStatus;
        readonly tags?: ReadonlyArray<any> | null;
        readonly updated?: any | null;
        readonly published?: any | null;
        readonly simulatedPrice?: {
          readonly _id: string;
          readonly amount: number;
          readonly currency: string;
        } | null;
        readonly texts?: {
          readonly _id: string;
          readonly slug?: string | null;
          readonly title?: string | null;
          readonly subtitle?: string | null;
          readonly description?: string | null;
          readonly vendor?: string | null;
          readonly brand?: string | null;
          readonly labels?: ReadonlyArray<string> | null;
        } | null;
        readonly media: ReadonlyArray<{
          readonly _id: string;
          readonly tags?: ReadonlyArray<any> | null;
          readonly file: { readonly _id: string; readonly url: string };
        }>;
      };
    }>;
  } | null;
};

export type IQuotationDetailFragment = {
  readonly _id: string;
  readonly status: IQuotationStatus;
  readonly created: any;
  readonly expires?: any | null;
  readonly updated?: any | null;
  readonly isExpired?: boolean | null;
  readonly quotationNumber?: string | null;
  readonly fullfilled?: any | null;
  readonly rejected?: any | null;
  readonly user: {
    readonly _id: string;
    readonly username?: string | null;
    readonly name: string;
    readonly avatar?: { readonly _id: string; readonly url: string } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  };
  readonly configuration?: ReadonlyArray<{
    readonly key: string;
    readonly value: string;
  }> | null;
  readonly country?: {
    readonly _id: string;
    readonly isoCode?: string | null;
    readonly flagEmoji?: string | null;
    readonly name?: string | null;
  } | null;
  readonly currency?: {
    readonly _id: string;
    readonly isoCode: string;
    readonly isActive?: boolean | null;
  } | null;
  readonly product: {
    readonly _id: string;
    readonly texts?: {
      readonly _id: string;
      readonly slug?: string | null;
      readonly subtitle?: string | null;
      readonly title?: string | null;
      readonly description?: string | null;
    } | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly file: {
        readonly _id: string;
        readonly type: string;
        readonly url: string;
      };
    }>;
  };
};

export type IQuotationFragment = {
  readonly _id: string;
  readonly status: IQuotationStatus;
  readonly created: any;
  readonly expires?: any | null;
  readonly updated?: any | null;
  readonly isExpired?: boolean | null;
  readonly quotationNumber?: string | null;
  readonly fullfilled?: any | null;
  readonly rejected?: any | null;
  readonly user: {
    readonly _id: string;
    readonly username?: string | null;
    readonly name: string;
    readonly avatar?: { readonly _id: string; readonly url: string } | null;
    readonly primaryEmail?: {
      readonly verified: boolean;
      readonly address: string;
    } | null;
  };
  readonly product: {
    readonly _id: string;
    readonly texts?: {
      readonly _id: string;
      readonly slug?: string | null;
      readonly subtitle?: string | null;
      readonly title?: string | null;
      readonly description?: string | null;
    } | null;
    readonly media: ReadonlyArray<{
      readonly _id: string;
      readonly file: {
        readonly _id: string;
        readonly type: string;
        readonly url: string;
      };
    }>;
  };
  readonly currency?: {
    readonly _id: string;
    readonly contractAddress?: string | null;
    readonly decimals?: number | null;
    readonly isoCode: string;
  } | null;
};

export type IMakeQuotationProposalMutationVariables = Exact<{
  quotationId: Scalars['ID']['input'];
  quotationContext?: InputMaybe<Scalars['JSON']['input']>;
}>;

export type IMakeQuotationProposalMutation = {
  readonly makeQuotationProposal: {
    readonly _id: string;
    readonly status: IQuotationStatus;
    readonly created: any;
    readonly expires?: any | null;
    readonly updated?: any | null;
    readonly isExpired?: boolean | null;
    readonly quotationNumber?: string | null;
    readonly fullfilled?: any | null;
    readonly rejected?: any | null;
    readonly user: {
      readonly _id: string;
      readonly username?: string | null;
      readonly name: string;
      readonly avatar?: { readonly _id: string; readonly url: string } | null;
      readonly primaryEmail?: {
        readonly verified: boolean;
        readonly address: string;
      } | null;
    };
    readonly configuration?: ReadonlyArray<{
      readonly key: string;
      readonly value: string;
    }> | null;
    readonly country?: {
      readonly _id: string;
      readonly isoCode?: string | null;
      readonly flagEmoji?: string | null;
      readonly name?: string | null;
    } | null;
    readonly currency?: {
      readonly _id: string;
      readonly isoCode: string;
      readonly isActive?: boolean | null;
    } | null;
    readonly product: {
      readonly _id: string;
      readonly texts?: {
        readonly _id: string;
        readonly slug?: string | null;
        readonly subtitle?: string | null;
        readonly title?: string | null;
        readonly description?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: {
          readonly _id: string;
          readonly type: string;
          readonly url: string;
        };
      }>;
    };
  };
};

export type IQuotationQueryVariables = Exact<{
  quotationId: Scalars['ID']['input'];
}>;

export type IQuotationQuery = {
  readonly quotationsCount: number;
  readonly quotation?: {
    readonly _id: string;
    readonly status: IQuotationStatus;
    readonly created: any;
    readonly expires?: any | null;
    readonly updated?: any | null;
    readonly isExpired?: boolean | null;
    readonly quotationNumber?: string | null;
    readonly fullfilled?: any | null;
    readonly rejected?: any | null;
    readonly user: {
      readonly _id: string;
      readonly username?: string | null;
      readonly name: string;
      readonly avatar?: { readonly _id: string; readonly url: string } | null;
      readonly primaryEmail?: {
        readonly verified: boolean;
        readonly address: string;
      } | null;
    };
    readonly configuration?: ReadonlyArray<{
      readonly key: string;
      readonly value: string;
    }> | null;
    readonly country?: {
      readonly _id: string;
      readonly isoCode?: string | null;
      readonly flagEmoji?: string | null;
      readonly name?: string | null;
    } | null;
    readonly currency?: {
      readonly _id: string;
      readonly isoCode: string;
      readonly isActive?: boolean | null;
    } | null;
    readonly product: {
      readonly _id: string;
      readonly texts?: {
        readonly _id: string;
        readonly slug?: string | null;
        readonly subtitle?: string | null;
        readonly title?: string | null;
        readonly description?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: {
          readonly _id: string;
          readonly type: string;
          readonly url: string;
        };
      }>;
    };
  } | null;
};

export type IQuotationStatusQueryVariables = Exact<{ [key: string]: never }>;

export type IQuotationStatusQuery = {
  readonly quotationStatusType?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label?: string | null;
    }> | null;
  } | null;
};

export type IQuotationsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  queryString?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
}>;

export type IQuotationsQuery = {
  readonly quotationsCount: number;
  readonly quotations: ReadonlyArray<{
    readonly _id: string;
    readonly status: IQuotationStatus;
    readonly created: any;
    readonly expires?: any | null;
    readonly updated?: any | null;
    readonly isExpired?: boolean | null;
    readonly quotationNumber?: string | null;
    readonly fullfilled?: any | null;
    readonly rejected?: any | null;
    readonly user: {
      readonly _id: string;
      readonly username?: string | null;
      readonly name: string;
      readonly avatar?: { readonly _id: string; readonly url: string } | null;
      readonly primaryEmail?: {
        readonly verified: boolean;
        readonly address: string;
      } | null;
    };
    readonly product: {
      readonly _id: string;
      readonly texts?: {
        readonly _id: string;
        readonly slug?: string | null;
        readonly subtitle?: string | null;
        readonly title?: string | null;
        readonly description?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: {
          readonly _id: string;
          readonly type: string;
          readonly url: string;
        };
      }>;
    };
    readonly currency?: {
      readonly _id: string;
      readonly contractAddress?: string | null;
      readonly decimals?: number | null;
      readonly isoCode: string;
    } | null;
  }>;
};

export type IRejectQuotationMutationVariables = Exact<{
  quotationId: Scalars['ID']['input'];
  quotationContext?: InputMaybe<Scalars['JSON']['input']>;
}>;

export type IRejectQuotationMutation = {
  readonly rejectQuotation: {
    readonly _id: string;
    readonly status: IQuotationStatus;
    readonly created: any;
    readonly expires?: any | null;
    readonly updated?: any | null;
    readonly isExpired?: boolean | null;
    readonly quotationNumber?: string | null;
    readonly fullfilled?: any | null;
    readonly rejected?: any | null;
    readonly user: {
      readonly _id: string;
      readonly username?: string | null;
      readonly name: string;
      readonly avatar?: { readonly _id: string; readonly url: string } | null;
      readonly primaryEmail?: {
        readonly verified: boolean;
        readonly address: string;
      } | null;
    };
    readonly configuration?: ReadonlyArray<{
      readonly key: string;
      readonly value: string;
    }> | null;
    readonly country?: {
      readonly _id: string;
      readonly isoCode?: string | null;
      readonly flagEmoji?: string | null;
      readonly name?: string | null;
    } | null;
    readonly currency?: {
      readonly _id: string;
      readonly isoCode: string;
      readonly isActive?: boolean | null;
    } | null;
    readonly product: {
      readonly _id: string;
      readonly texts?: {
        readonly _id: string;
        readonly slug?: string | null;
        readonly subtitle?: string | null;
        readonly title?: string | null;
        readonly description?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: {
          readonly _id: string;
          readonly type: string;
          readonly url: string;
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
  readonly user?: {
    readonly _id: string;
    readonly quotations: ReadonlyArray<{
      readonly _id: string;
      readonly status: IQuotationStatus;
      readonly created: any;
      readonly expires?: any | null;
      readonly updated?: any | null;
      readonly isExpired?: boolean | null;
      readonly quotationNumber?: string | null;
      readonly fullfilled?: any | null;
      readonly rejected?: any | null;
      readonly user: {
        readonly _id: string;
        readonly username?: string | null;
        readonly name: string;
        readonly avatar?: { readonly _id: string; readonly url: string } | null;
        readonly primaryEmail?: {
          readonly verified: boolean;
          readonly address: string;
        } | null;
      };
      readonly product: {
        readonly _id: string;
        readonly texts?: {
          readonly _id: string;
          readonly slug?: string | null;
          readonly subtitle?: string | null;
          readonly title?: string | null;
          readonly description?: string | null;
        } | null;
        readonly media: ReadonlyArray<{
          readonly _id: string;
          readonly file: {
            readonly _id: string;
            readonly type: string;
            readonly url: string;
          };
        }>;
      };
      readonly currency?: {
        readonly _id: string;
        readonly contractAddress?: string | null;
        readonly decimals?: number | null;
        readonly isoCode: string;
      } | null;
    }>;
  } | null;
};

export type IVerifyQuotationMutationVariables = Exact<{
  quotationId: Scalars['ID']['input'];
  quotationContext?: InputMaybe<Scalars['JSON']['input']>;
}>;

export type IVerifyQuotationMutation = {
  readonly verifyQuotation: {
    readonly _id: string;
    readonly status: IQuotationStatus;
    readonly created: any;
    readonly expires?: any | null;
    readonly updated?: any | null;
    readonly isExpired?: boolean | null;
    readonly quotationNumber?: string | null;
    readonly fullfilled?: any | null;
    readonly rejected?: any | null;
    readonly user: {
      readonly _id: string;
      readonly username?: string | null;
      readonly name: string;
      readonly avatar?: { readonly _id: string; readonly url: string } | null;
      readonly primaryEmail?: {
        readonly verified: boolean;
        readonly address: string;
      } | null;
    };
    readonly configuration?: ReadonlyArray<{
      readonly key: string;
      readonly value: string;
    }> | null;
    readonly country?: {
      readonly _id: string;
      readonly isoCode?: string | null;
      readonly flagEmoji?: string | null;
      readonly name?: string | null;
    } | null;
    readonly currency?: {
      readonly _id: string;
      readonly isoCode: string;
      readonly isActive?: boolean | null;
    } | null;
    readonly product: {
      readonly _id: string;
      readonly texts?: {
        readonly _id: string;
        readonly slug?: string | null;
        readonly subtitle?: string | null;
        readonly title?: string | null;
        readonly description?: string | null;
      } | null;
      readonly media: ReadonlyArray<{
        readonly _id: string;
        readonly file: {
          readonly _id: string;
          readonly type: string;
          readonly url: string;
        };
      }>;
    };
  };
};

export type ISyncReportsQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<ReadonlyArray<IWorkStatus>>;
  types?: InputMaybe<ReadonlyArray<IWorkType>>;
  created?: InputMaybe<IDateFilterInput>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
}>;

export type ISyncReportsQuery = {
  readonly workQueue: ReadonlyArray<{
    readonly _id: string;
    readonly type: IWorkType;
    readonly scheduled?: any | null;
    readonly status: IWorkStatus;
    readonly started?: any | null;
    readonly success?: boolean | null;
    readonly finished?: any | null;
    readonly created: any;
    readonly deleted?: any | null;
    readonly priority: number;
    readonly worker?: string | null;
    readonly retries: number;
    readonly timeout?: number | null;
    readonly input?: any | null;
    readonly result?: any | null;
    readonly error?: any | null;
    readonly original?: { readonly _id: string } | null;
  }>;
};

export type IWarehousingProviderFragment = {
  readonly _id: string;
  readonly created?: any | null;
  readonly updated?: any | null;
  readonly deleted?: any | null;
  readonly isActive?: boolean | null;
  readonly type?: IWarehousingProviderType | null;
  readonly configuration?: any | null;
  readonly configurationError?: IWarehousingProviderError | null;
  readonly interface?: {
    readonly _id: string;
    readonly label?: string | null;
    readonly version?: string | null;
  } | null;
};

export type ICreateWarehousingProviderMutationVariables = Exact<{
  warehousingProvider: ICreateWarehousingProviderInput;
}>;

export type ICreateWarehousingProviderMutation = {
  readonly createWarehousingProvider: {
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly isActive?: boolean | null;
    readonly type?: IWarehousingProviderType | null;
    readonly configuration?: any | null;
    readonly configurationError?: IWarehousingProviderError | null;
    readonly interface?: {
      readonly _id: string;
      readonly label?: string | null;
      readonly version?: string | null;
    } | null;
  };
};

export type IRemoveWarehousingProviderMutationVariables = Exact<{
  warehousingProviderId: Scalars['ID']['input'];
}>;

export type IRemoveWarehousingProviderMutation = {
  readonly removeWarehousingProvider: { readonly _id: string };
};

export type IUpdateWarehousingProviderMutationVariables = Exact<{
  warehousingProvider: IUpdateProviderInput;
  warehousingProviderId: Scalars['ID']['input'];
}>;

export type IUpdateWarehousingProviderMutation = {
  readonly updateWarehousingProvider: {
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly isActive?: boolean | null;
    readonly type?: IWarehousingProviderType | null;
    readonly configuration?: any | null;
    readonly configurationError?: IWarehousingProviderError | null;
    readonly interface?: {
      readonly _id: string;
      readonly label?: string | null;
      readonly version?: string | null;
    } | null;
  };
};

export type IWarehousingInterfacesQueryVariables = Exact<{
  providerType: IWarehousingProviderType;
}>;

export type IWarehousingInterfacesQuery = {
  readonly warehousingInterfaces: ReadonlyArray<{
    readonly _id: string;
    readonly label?: string | null;
    readonly value: string;
  }>;
};

export type IWarehousingProviderQueryVariables = Exact<{
  warehousingProviderId: Scalars['ID']['input'];
}>;

export type IWarehousingProviderQuery = {
  readonly warehousingProvider?: {
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly isActive?: boolean | null;
    readonly type?: IWarehousingProviderType | null;
    readonly configuration?: any | null;
    readonly configurationError?: IWarehousingProviderError | null;
    readonly interface?: {
      readonly _id: string;
      readonly label?: string | null;
      readonly version?: string | null;
    } | null;
  } | null;
};

export type IWarehousingProvidersTypeQueryVariables = Exact<{
  [key: string]: never;
}>;

export type IWarehousingProvidersTypeQuery = {
  readonly warehousingProviderType?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label?: string | null;
    }> | null;
  } | null;
};

export type IWarehousingProvidersQueryVariables = Exact<{
  type?: InputMaybe<IWarehousingProviderType>;
}>;

export type IWarehousingProvidersQuery = {
  readonly warehousingProviders: ReadonlyArray<{
    readonly _id: string;
    readonly created?: any | null;
    readonly updated?: any | null;
    readonly deleted?: any | null;
    readonly isActive?: boolean | null;
    readonly type?: IWarehousingProviderType | null;
    readonly configuration?: any | null;
    readonly configurationError?: IWarehousingProviderError | null;
    readonly interface?: {
      readonly _id: string;
      readonly label?: string | null;
      readonly version?: string | null;
    } | null;
  }>;
};

export type IWorkFragment = {
  readonly _id: string;
  readonly type: IWorkType;
  readonly scheduled?: any | null;
  readonly status: IWorkStatus;
  readonly started?: any | null;
  readonly success?: boolean | null;
  readonly finished?: any | null;
  readonly created: any;
  readonly deleted?: any | null;
};

export type IActiveWorkTypesQueryVariables = Exact<{ [key: string]: never }>;

export type IActiveWorkTypesQuery = {
  readonly activeWorkTypes: ReadonlyArray<IWorkType>;
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
  readonly addWork?: { readonly _id: string } | null;
};

export type IAllocateWorkMutationVariables = Exact<{
  types?: InputMaybe<ReadonlyArray<InputMaybe<IWorkType>>>;
  worker?: InputMaybe<Scalars['String']['input']>;
}>;

export type IAllocateWorkMutation = {
  readonly allocateWork?: { readonly _id: string } | null;
};

export type IWorkTypesQueryVariables = Exact<{ [key: string]: never }>;

export type IWorkTypesQuery = {
  readonly registeredWorkTypes?: {
    readonly options?: ReadonlyArray<{
      readonly value: string;
      readonly label: string;
    }> | null;
  } | null;
};

export type IRemoveWorkMutationVariables = Exact<{
  workId: Scalars['ID']['input'];
}>;

export type IRemoveWorkMutation = {
  readonly removeWork: { readonly _id: string };
};

export type IWorkQueryVariables = Exact<{
  workId: Scalars['ID']['input'];
}>;

export type IWorkQuery = {
  readonly work?: {
    readonly input?: any | null;
    readonly result?: any | null;
    readonly error?: any | null;
    readonly priority: number;
    readonly worker?: string | null;
    readonly retries: number;
    readonly timeout?: number | null;
    readonly _id: string;
    readonly type: IWorkType;
    readonly scheduled?: any | null;
    readonly status: IWorkStatus;
    readonly started?: any | null;
    readonly success?: boolean | null;
    readonly finished?: any | null;
    readonly created: any;
    readonly deleted?: any | null;
    readonly original?: { readonly _id: string } | null;
  } | null;
};

export type IWorkQueueQueryVariables = Exact<{
  queryString?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<ReadonlyArray<IWorkStatus>>;
  types?: InputMaybe<ReadonlyArray<IWorkType>>;
  created?: InputMaybe<IDateFilterInput>;
  sort?: InputMaybe<ReadonlyArray<ISortOptionInput>>;
}>;

export type IWorkQueueQuery = {
  readonly activeWorkTypes: ReadonlyArray<IWorkType>;
  readonly workQueueCount: number;
  readonly workQueue: ReadonlyArray<{
    readonly _id: string;
    readonly type: IWorkType;
    readonly scheduled?: any | null;
    readonly status: IWorkStatus;
    readonly started?: any | null;
    readonly success?: boolean | null;
    readonly finished?: any | null;
    readonly created: any;
    readonly deleted?: any | null;
  }>;
};
