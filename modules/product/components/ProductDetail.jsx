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

import LocaleWrapper from '../../common/components/LocaleWrapper';

import SelectOptions from '../../common/components/SelectOptions';
import CommerceForm from './CommerceForm';
import GeneralTextForm from './GeneralTextForm';
import MediaForm from './MediaForm';
import SubscriptionForm from './SubscriptionForm';
import SupplyForm from './SupplyForm';
import VariationForm from './VariationForm';
import WarehousingForm from './WarehousingForm';
import useRemoveProduct from '../hooks/useRemoveProduct';
import usePublishProduct from '../hooks/usePublishProduct';
import useUnPublishProduct from '../hooks/useUnPublishProduct';
import TabComponent from '../../common/components/TabComponent';

const GetCurrentTab = ({ id, selectedView }) => {
  if (selectedView === 'text')
    return (
      <LocaleWrapper>
        <GeneralTextForm productId={id} />
      </LocaleWrapper>
    );
  if (selectedView === 'media')
    return (
      <LocaleWrapper>
        <MediaForm />
      </LocaleWrapper>
    );
  if (selectedView === 'commerce') return <CommerceForm productId={id} />;
  if (selectedView === 'supply') return <SupplyForm productId={id} />;
  if (selectedView === 'warehousing') return <WarehousingForm productId={id} />;
  if (selectedView === 'variations') return <VariationForm productId={id} />;
  if (selectedView === 'bundled_products')
    return <GeneralTextForm productId={id} />;
  if (selectedView === 'subscription')
    return <SubscriptionForm productId={id} />;
  return <GeneralTextForm productId={id} />;
};
const ProductDetail = ({ product }) => {
  const { formatMessage } = useIntl();
  const { removeProduct } = useRemoveProduct();
  const { publishProduct } = usePublishProduct();
  const { unPublishProduct } = useUnPublishProduct();

  const { status, __typename } = product;

  const productOptions = [
    {
      id: 'text',
      title: formatMessage({
        id: 'general_text',
        defaultMessage: 'Text',
      }),
      Icon: <DocumentTextIcon className="h-4 w-5" />,
    },
    {
      id: 'media',
      title: formatMessage({ id: 'media', defaultMessage: 'media' }),
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
      id: 'bundles',
      title: formatMessage({
        id: 'bundled_products',
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
  ];

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
      bgColor: 'gray',
      onClick: async () => {
        await unPublishProduct({ productId: product?._id });
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
      current: status === 'DELETED',
      bgColor: 'red',
      onClick: async () => {
        await removeProduct({ productId: product?._id });
      },
    },
  ];

  return (
    <>
      <div className="flex justify-end">
        <SelectOptions
          publishingOptions={activeOptions}
          type={formatMessage({ id: 'product', defaultMessage: 'Product' })}
        />
      </div>
      <TabComponent tabItems={productOptions} defaultTab="texts">
        <GetCurrentTab id={product?._id} />
      </TabComponent>
    </>
  );
};

export default ProductDetail;
