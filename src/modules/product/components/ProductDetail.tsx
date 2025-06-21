import { useIntl } from 'react-intl';
import {
  DocumentTextIcon,
  FilmIcon,
  ShoppingBagIcon,
  ChartPieIcon,
  ArchiveBoxIcon,
  SwatchIcon,
  PresentationChartLineIcon,
  UsersIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { LinkIcon } from '@heroicons/react/24/outline';
import LocaleWrapper from '../../common/components/LocaleWrapper';

import SelectOptions from '../../common/components/SelectOptions';
import CommerceForm from './CommerceForm';
import ProductTextsForm from './ProductTextsForm';
import ProductMediaForm from './ProductMediaForm';
import SubscriptionForm from './SubscriptionForm';
import SupplyForm from './SupplyForm';
import ProductVariation from './ProductVariation';
import WarehousingForm from './WarehousingForm';
import usePublishProduct from '../hooks/usePublishProduct';
import useUnPublishProduct from '../hooks/useUnPublishProduct';
import Tab from '../../common/components/Tab';
import ProductReviews from '../../product-review/components/ProductReviews';
import BundleProducts from './BundleProducts';
import TagList from '../../common/components/TagList';
import useUpdateProduct from '../hooks/useUpdateProduct';
import { PRODUCT_TYPES } from '../ProductTypes';
import useAuth from '../../Auth/useAuth';
import ProductAssignmentForm from './ProductAssignmentForm';
import ProductTokenizationForm from './ProductTokenizationForm';
import DisplayExtendedFields from '../../common/components/DisplayExtendedFields';

const GetCurrentTab = ({ id, selectedView = '', ...extendedData }) => {
  if (selectedView === 'texts')
    return (
      <LocaleWrapper>
        <ProductTextsForm productId={id} />
      </LocaleWrapper>
    );
  if (selectedView === 'media')
    return (
      <LocaleWrapper>
        <ProductMediaForm productId={id} />
      </LocaleWrapper>
    );
  if (selectedView === 'commerce') return <CommerceForm productId={id} />;
  if (selectedView === 'supply') return <SupplyForm productId={id} />;
  if (selectedView === 'warehousing') return <WarehousingForm productId={id} />;
  if (selectedView === 'variations')
    return (
      <LocaleWrapper>
        <ProductVariation productId={id} />
      </LocaleWrapper>
    );
  if (selectedView === 'bundled_products')
    return <BundleProducts productId={id} />;
  if (selectedView === 'subscriptions')
    return <SubscriptionForm productId={id} />;
  if (selectedView === 'reviews') return <ProductReviews productId={id} />;
  if (selectedView === 'assignments')
    return <ProductAssignmentForm proxyId={id} />;

  if (selectedView === 'token') {
    return <ProductTokenizationForm productId={id} />;
  }
  if (selectedView === 'extended') {
    return <DisplayExtendedFields data={extendedData} />;
  }
  return (
    <LocaleWrapper>
      <ProductTextsForm productId={id} />
    </LocaleWrapper>
  );
};
const ProductDetail = ({ product, extendedData = {} }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const { publishProduct } = usePublishProduct();
  const { unPublishProduct } = useUnPublishProduct();

  const { updateProduct } = useUpdateProduct();

  const updateProductSequence = async (e) => {
    if (e.target.value)
      await updateProduct({
        productId: product?._id,
        product: {
          sequence: parseInt(e.target.value, 10),
        },
      });
  };
  const { status, __typename } = product || {};

  const productOptions = [
    {
      id: 'texts',
      title: formatMessage({
        id: 'general_text',
        defaultMessage: 'Text',
      }),
      Icon: <DocumentTextIcon className="h-4 w-5" />,
    },
    {
      id: 'media',
      title: formatMessage({ id: 'media', defaultMessage: 'Media' }),
      Icon: <FilmIcon className="h-4 w-5" />,
    },
    __typename !== PRODUCT_TYPES.ConfigurableProduct && {
      id: 'commerce',
      title: formatMessage({ id: 'commerce', defaultMessage: 'Commerce' }),
      Icon: <ShoppingBagIcon className="h-4 w-5" />,
    },
    __typename === PRODUCT_TYPES.SimpleProduct && {
      id: 'supply',
      title: formatMessage({
        id: 'supply',
        defaultMessage: 'Supply',
      }),
      Icon: <ChartPieIcon className="h-4 w-5" />,
    },
    __typename === PRODUCT_TYPES.SimpleProduct && {
      id: 'warehousing',
      title: formatMessage({
        id: 'warehousing',
        defaultMessage: 'Warehousing',
      }),
      Icon: <ArchiveBoxIcon className="h-4 w-5" />,
    },
    __typename === PRODUCT_TYPES.ConfigurableProduct && {
      id: 'variations',
      title: formatMessage({
        id: 'variations',
        defaultMessage: 'Variations',
      }),
      Icon: <SwatchIcon className="h-4 w-5" />,
    },
    __typename === PRODUCT_TYPES.BundleProduct && {
      id: 'bundled_products',
      title: formatMessage({
        id: 'bundles',
        defaultMessage: 'Bundles',
      }),
      Icon: <PresentationChartLineIcon className="h-4 w-5" />,
    },
    __typename === PRODUCT_TYPES.PlanProduct && {
      id: 'subscriptions',
      title: formatMessage({
        id: 'subscriptions',
        defaultMessage: 'Subscriptions',
      }),
      Icon: <UsersIcon className="h-4 w-5" />,
    },
    __typename === PRODUCT_TYPES.ConfigurableProduct && {
      id: 'assignments',
      title: formatMessage({
        id: 'assignments',
        defaultMessage: 'Assignments',
      }),
      Icon: <LinkIcon className="h-4 w-5" />,
    },
    __typename === PRODUCT_TYPES.TokenizedProduct && {
      id: 'token',
      title: formatMessage({
        id: 'token',
        defaultMessage: 'Token',
      }),
      Icon: <LinkIcon className="h-4 w-5" />,
    },
    {
      id: 'reviews',
      title: formatMessage({
        id: 'reviews',
        defaultMessage: 'Reviews',
      }),
      Icon: <PresentationChartLineIcon className="h-4 w-5" />,
    },
    extendedData !== null && {
      id: 'extended',
      title: formatMessage({
        id: 'extended-fields',
        defaultMessage: 'Extended',
      }),
      Icon: <PuzzlePieceIcon className="h-4 w-5" />,
    },
  ].filter((item) => item);

  const activeOptions = [
    {
      id: 'active',
      title: formatMessage({
        id: 'publish',
        defaultMessage: 'Publish',
      }),
      selectedTitle: formatMessage({
        id: 'published',
        defaultMessage: 'Published',
      }),
      description: formatMessage({
        id: 'publish_product_description',
        defaultMessage: 'Product will be discoverable and can be ordered',
      }),
      current: status === 'ACTIVE',
      onClick: async () => {
        await publishProduct({ productId: product?._id });
        toast.success(
          formatMessage({
            id: 'product_published',
            defaultMessage: 'Published successfully ',
          }),
        );
      },
      bgColor: 'green',
    },
    {
      id: 'draft',
      title: formatMessage({
        id: 'draft',
        defaultMessage: 'Draft',
      }),
      description: formatMessage({
        id: 'draft_product_description',
        defaultMessage:
          'Product will not be discoverable and can not be ordered',
      }),
      current: status === 'DRAFT',
      selectedTitle: formatMessage({
        id: 'not_published',
        defaultMessage: 'Not published',
      }),
      bgColor: 'slate',
      onClick: async () => {
        await unPublishProduct({ productId: product?._id });
        toast.success(
          formatMessage({
            id: 'product_drafted',
            defaultMessage: 'Drafted successfully ',
          }),
        );
      },
    },
  ];

  const onUpdateTags = async ({ tags }) => {
    await updateProduct({ productId: product?._id, product: { tags } });
    return true;
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-y-1">
        <h1 className="">{product?.__typename}</h1>
        <TagList
          defaultValue={product?.tags}
          onSubmit={onUpdateTags}
          enableEdit={hasRole('editProduct')}
        />
      </div>
      <div className="mt-5 flex">
        <input
          type="number"
          id="sequence-input"
          className="w-24 shadow-xs focus:ring-slate-900 dark:bg-slate-800 dark:border-slate-700 focus:border-slate-900 block text-sm  border-gray-300 rounded-full mr-2 font-bold text-slate-900"
          defaultValue={product?.sequence}
          onBlur={updateProductSequence}
        />
        <SelectOptions
          options={activeOptions}
          type={formatMessage({ id: 'product', defaultMessage: 'Product' })}
        />
      </div>
      <Tab tabItems={productOptions} defaultTab="texts">
        <GetCurrentTab id={product?._id} {...extendedData} />
      </Tab>
    </>
  );
};

export default ProductDetail;
