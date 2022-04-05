import { useIntl } from 'react-intl';
import {
  DocumentTextIcon,
  FilmIcon,
  ShoppingBagIcon,
  ChartPieIcon,
  ArchiveIcon,
  ColorSwatchIcon,
  PresentationChartLineIcon,
  UsersIcon,
} from '@heroicons/react/solid';

import { toast } from 'react-toastify';
import LocaleWrapper from '../../common/components/LocaleWrapper';

import SelectOptions from '../../common/components/SelectOptions';
import CommerceForm from './CommerceForm';
import ProductTextsForm from './ProductTextsForm';
import ProductMediaForm from './ProductMediaForm';
import SubscriptionForm from './SubscriptionForm';
import SupplyForm from './SupplyForm';
import ProductVariation from './ProductVariation';
import WarehousingForm from './WarehousingForm';
import useRemoveProduct from '../hooks/useRemoveProduct';
import usePublishProduct from '../hooks/usePublishProduct';
import useUnPublishProduct from '../hooks/useUnPublishProduct';
import Tab from '../../common/components/Tab';
import ProductReviews from '../../product-review/components/ProductReviews';
import BundleProducts from './BundleProducts';
import TagList from '../../common/components/TagList';
import useUpdateProduct from '../hooks/useUpdateProduct';

const GetCurrentTab = ({ id, selectedView }) => {
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
  return <ProductTextsForm productId={id} />;
};
const ProductDetail = ({ product }) => {
  const { formatMessage } = useIntl();
  const { removeProduct } = useRemoveProduct();
  const { publishProduct } = usePublishProduct();
  const { unPublishProduct } = useUnPublishProduct();

  const { status, __typename } = product;

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
    __typename !== 'ConfigurableProduct' && {
      id: 'commerce',
      title: formatMessage({ id: 'commerce', defaultMessage: 'Commerce' }),
      Icon: <ShoppingBagIcon className="h-4 w-5" />,
    },
    __typename === 'SimpleProduct' && {
      id: 'supply',
      title: formatMessage({
        id: 'supply',
        defaultMessage: 'Supply',
      }),
      Icon: <ChartPieIcon className="h-4 w-5" />,
    },
    __typename === 'SimpleProduct' && {
      id: 'warehousing',
      title: formatMessage({
        id: 'warehousing',
        defaultMessage: 'Warehousing',
      }),
      Icon: <ArchiveIcon className="h-4 w-5" />,
    },
    __typename === 'ConfigurableProduct' && {
      id: 'variations',
      title: formatMessage({
        id: 'variations',
        defaultMessage: 'Variations',
      }),
      Icon: <ColorSwatchIcon className="h-4 w-5" />,
    },
    __typename === 'BundleProduct' && {
      id: 'bundled_products',
      title: formatMessage({
        id: 'bundles',
        defaultMessage: 'Bundles',
      }),
      Icon: <PresentationChartLineIcon className="h-4 w-5" />,
    },
    __typename === 'PlanProduct' && {
      id: 'subscriptions',
      title: formatMessage({
        id: 'subscriptions',
        defaultMessage: 'Subscriptions',
      }),
      Icon: <UsersIcon className="h-4 w-5" />,
    },
    {
      id: 'reviews',
      title: formatMessage({
        id: 'reviews',
        defaultMessage: 'Reviews',
      }),
      Icon: <PresentationChartLineIcon className="h-4 w-5" />,
    },
  ].filter((item) => item !== false);

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
      description: '',
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
      description: '',
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
    {
      id: 'deleted',
      title: formatMessage({
        id: 'delete',
        defaultMessage: 'Delete',
      }),
      selectedTitle: formatMessage({
        id: 'deleted',
        defaultMessage: 'Deleted',
      }),
      description: '',
      disable: status === 'ACTIVE',
      current: status === 'DELETED',
      bgColor: 'red',
      onClick: async () => {
        await removeProduct({ productId: product?._id });
        toast.success(
          formatMessage({
            id: 'product_deleted_success',
            defaultMessage: 'Deleted successfully ',
          }),
        );
      },
    },
  ];

  const { updateProduct } = useUpdateProduct();

  const onUpdateTags = async ({ tags }) => {
    await updateProduct({ productId: product?._id, tags, sequence: 1 });
    return true;
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-y-1">
        <h1>{product?.__typename}</h1>
        <TagList defaultValue={product?.tags} onSubmit={onUpdateTags} />
        <SelectOptions
          options={activeOptions}
          type={formatMessage({ id: 'product', defaultMessage: 'Product' })}
        />
      </div>
      <Tab tabItems={productOptions} defaultTab="texts">
        <GetCurrentTab id={product?._id} />
      </Tab>
    </>
  );
};

export default ProductDetail;
