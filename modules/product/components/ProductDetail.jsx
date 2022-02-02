import { useState } from 'react';
import { useIntl } from 'react-intl';

import ProductDetailHeader from '../../common/components/ProductDetailHeader';
import CommerceForm from './CommerceForm';
import GeneralTextForm from './GeneralTextForm';
import MediaForm from './MediaForm';
import SubscriptionForm from './SubscriptionForm';
import SupplyForm from './SupplyForm';
import VariationForm from './VariationForm';
import WarehousingForm from './WarehousingForm';

const getCurrentTab = (currentTag, product) => {
  if (currentTag === 'general_text')
    return (
      <LocaleWrapper>
        <GeneralTextForm {...product} />
      </LocaleWrapper>
    );
  if (currentTag === 'media')
    return (
      <LocaleWrapper>
        <MediaForm />
      </LocaleWrapper>
    );
  if (currentTag === 'commerce') return <CommerceForm {...product} />;
  if (currentTag === 'supply') return <SupplyForm {...product} />;
  if (currentTag === 'warehousing') return <WarehousingForm />;
  if (currentTag === 'variations') return <GeneralTextForm />;
  if (currentTag === 'bundled_products') return <GeneralTextForm />;
  if (currentTag === 'subscription') return <GeneralTextForm />;
  return <></>;
};
const ProductDetail = ({ product }) => {
  const { formatMessage } = useIntl();
  const [activeTab, setActiveTab] = useState('general_text');

  const productOptions = {
    general_text: formatMessage({
      id: 'general_text',
      defaultMessage: 'General Text',
    }),
    media: formatMessage({ id: 'media', defaultMessage: 'media' }),
    commerce: formatMessage({ id: 'commerce', defaultMessage: 'Commerce' }),
    supply: formatMessage({
      id: 'supply',
      defaultMessage: 'Supply',
    }),
    warehousing: formatMessage({
      id: 'warehousing',
      defaultMessage: 'Warehousing',
    }),
    variations: formatMessage({
      id: 'variations',
      defaultMessage: 'Variations',
    }),

    bundled_products: formatMessage({
      id: 'bundled_products',
      defaultMessage: 'Bundled Products',
    }),

    subscription: formatMessage({
      id: 'subscriptions',
      defaultMessage: 'Subscriptions',
    }),
  };
  return (
    <>
      <ProductDetailHeader />
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
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            value={activeTab}
          >
            {Object.entries(productOptions).map(([key, value]) => (
              <option key={`mobile-${key}`} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden lg:block">
          <nav className="relative z-0 rounded-md shadow flex divide-x divide-gray-200">
            {Object.entries(productOptions).map(([key, value]) => (
              <a
                href={`#${key}`}
                key={key}
                className={` ${
                  activeTab === key &&
                  ' bg-transparent rounded-md text-gray-500 hover:text-indigo-700'
                }  group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10`}
              >
                {value}
              </a>
            ))}
          </nav>
        </div>
        <div className="text-indigo-500">
          <div>
            <div className="md:grid md:grid-cols-4 " id="general_text">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {formatMessage({
                      id: 'product_texts',
                      defaultMessage: 'Product texts',
                    })}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-3">
                <GeneralTextForm {...product} />
              </div>
            </div>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>

          <div className="mt-10 sm:mt-0" id="media">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {formatMessage({ id: 'media', defaultMessage: 'Media' })}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <MediaForm {...product} />
              </div>
            </div>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>

          <div className="mt-10 sm:mt-0" id="commerce">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {formatMessage({
                      id: 'product_pricing',
                      defaultMessage: 'Product pricing',
                    })}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Decide which communications you like to receive and how.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <CommerceForm {...product} />
              </div>
            </div>
          </div>
          <div className="mt-10 sm:mt-0" id="supply">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {formatMessage({
                      id: 'supply',
                      defaultMessage: 'Supply',
                    })}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Decide which communications you like to receive and how.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <SupplyForm {...product} />
              </div>
            </div>
          </div>
          <div className="mt-10 sm:mt-0" id="warehousing">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {formatMessage({
                      id: 'warehousing',
                      defaultMessage: 'Warehousing',
                    })}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Decide which communications you like to receive and how.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <WarehousingForm {...product} />
              </div>
            </div>
          </div>
          <div className="mt-10 sm:mt-0" id="bundled_products">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {formatMessage({
                      id: 'bundle_product',
                      defaultMessage: 'Bundle product',
                    })}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Decide which communications you like to receive and how.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <h3>Comming soon</h3>
              </div>
            </div>
          </div>
          <div className="mt-10 sm:mt-0" id="variations">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {formatMessage({
                      id: 'variations',
                      defaultMessage: 'Variations',
                    })}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Decide which communications you like to receive and how.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <VariationForm {...product} />
              </div>
            </div>
          </div>
          <div className="mt-10 sm:mt-0" id="subscriptions">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {formatMessage({
                      id: 'subscriptions',
                      defaultMessage: 'Subscriptions',
                    })}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Decide which communications you like to receive and how.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <SubscriptionForm {...product} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
