import { useState } from 'react';
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
import { stopPropagation } from '../../common/data/miscellaneous';
import SelectOptions from '../../common/components/SelectOptions';
import CommerceForm from './CommerceForm';
import GeneralTextForm from './GeneralTextForm';
import MediaForm from './MediaForm';
import SubscriptionForm from './SubscriptionForm';
import SupplyForm from './SupplyForm';
import VariationForm from './VariationForm';
import WarehousingForm from './WarehousingForm';

const getCurrentTab = (currentTag, id) => {
  if (currentTag === 'text')
    return (
      <LocaleWrapper>
        <GeneralTextForm productId={id} />
      </LocaleWrapper>
    );
  if (currentTag === 'media')
    return (
      <LocaleWrapper>
        <MediaForm />
      </LocaleWrapper>
    );
  if (currentTag === 'commerce') return <CommerceForm productId={id} />;
  if (currentTag === 'supply') return <SupplyForm productId={id} />;
  if (currentTag === 'warehousing') return <WarehousingForm productId={id} />;
  if (currentTag === 'variations') return <VariationForm productId={id} />;
  if (currentTag === 'bundled_products')
    return <GeneralTextForm productId={id} />;
  if (currentTag === 'subscription') return <SubscriptionForm productId={id} />;
  return <GeneralTextForm productId={id} />;
};
const ProductDetail = ({ product }) => {
  const { formatMessage } = useIntl();
  const { status } = product;

  const [activeTab, setActiveTab] = useState('text');
  const [statusButtonOptions, setStatusButtonOptions] = useState('');

  const productOptions = [
    {
      id: 'text',
      general_text: formatMessage({
        id: 'general_text',
        defaultMessage: 'Text',
      }),
      Icon: <DocumentTextIcon className="h-4 w-5" />,
    },
    {
      id: 'media',
      media: formatMessage({ id: 'media', defaultMessage: 'media' }),
      Icon: <FilmIcon className="h-4 w-5" />,
    },
    {
      id: 'commerce',
      commerce: formatMessage({ id: 'commerce', defaultMessage: 'Commerce' }),
      Icon: <ShoppingBagIcon className="h-4 w-5" />,
    },
    {
      id: 'supply',
      supply: formatMessage({
        id: 'supply',
        defaultMessage: 'Supply',
      }),
      Icon: <ChartPieIcon className="h-4 w-5" />,
    },
    {
      id: 'warehousing',
      warehousing: formatMessage({
        id: 'warehousing',
        defaultMessage: 'Warehousing',
      }),
      Icon: <ArchiveIcon className="h-4 w-5" />,
    },
    {
      id: 'variations',
      variations: formatMessage({
        id: 'variations',
        defaultMessage: 'Variations',
      }),
      Icon: <ColorSwatchIcon className="h-4 w-5" />,
    },
    {
      id: 'bundles',
      bundled_products: formatMessage({
        id: 'bundled_products',
        defaultMessage: 'Bundles',
      }),
      Icon: <PresentationChartLineIcon className="h-4 w-5" />,
    },
    {
      id: 'subscriptions',
      subscription: formatMessage({
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
        id: 'active',
        defaultMessage: 'Active',
      }),
      description: '',
      current: status === 'ACTIVE',
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
      bgColor: 'gray',
    },
    {
      id: 'deleted',
      title: formatMessage({
        id: 'deleted',
        defaultMessage: 'Deleted',
      }),
      description: '',
      current: status === 'DELETED',
      bgColor: 'red',
    },
  ];

  const handlePublishOptions = (event) => {
    stopPropagation(event);
    setStatusButtonOptions(event.target.value);
  };

  return (
    <>
      <div className="flex justify-end">
        <SelectOptions
          publishingOptions={activeOptions}
          onChange={handlePublishOptions}
        />
      </div>
      <div className=" sm:px-6 md:px-0">
        <div className="py-6">
          <div className="lg:hidden">
            <label htmlFor="selected-tab" className="sr-only">
              {formatMessage({
                id: 'select_tab',
                defaultMessage: 'Select a tab',
              })}
            </label>

            <select
              onChange={(e) => setActiveTab(e.target.value)}
              id="selected-tab"
              name="selected-tab"
              className="mt-1 capitalize block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
              value={activeTab}
            >
              {productOptions.map((value) => (
                <option key={value.id} value={value.id}>
                  {value.id}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden lg:block">
            <div className="border-b border-gray-200 al">
              <nav className="-mb-px flex space-x-6">
                {productOptions.map((option) => (
                  <a
                    onClick={() => setActiveTab(option.id)}
                    key={option.id}
                    className={` ${
                      activeTab === option.id &&
                      'border-purple-500 text-purple-600 cursor-pointer'
                    }  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
                  >
                    <div className="flex space-x-1 items-center">
                      <div>{option.Icon}</div>
                      <div className="capitalize"> {option.id}</div>
                    </div>
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="text-indigo-500">
            {getCurrentTab(activeTab, product?._id)}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
