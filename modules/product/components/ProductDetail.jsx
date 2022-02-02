import { useState } from 'react';
import { useIntl } from 'react-intl';
import LocaleWrapper from '../../common/components/LocaleWrapper';
import ProductDetailHeader from '../../common/components/ProductDetailHeader';
import CommerceForm from './CommerceForm';
import GeneralTextForm from './GeneralTextForm';
import MediaForm from './MediaForm';
import SupplyForm from './SupplyForm';
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
      id: 'subscription',
      defaultMessage: 'Subscription',
    }),
  };
  return (
    <>
      <ProductDetailHeader />
      <div className=" sm:px-6 md:px-0" />
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
                onClick={() => setActiveTab(key)}
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
          {getCurrentTab(activeTab, product)}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
