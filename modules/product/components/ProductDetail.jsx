import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../common/components/BreadCrumbs';
import PageHeader from '../../common/components/PageHeader';
import GeneralTextForm from './GeneralTextForm';

const getCurrentTab = (current) => {
  if (current === 'general_text') return <GeneralTextForm />;
  if (current === 'media') return <GeneralTextForm />;
  if (current === 'commerce') return <GeneralTextForm />;
  if (current === 'supply') return <GeneralTextForm />;
  if (current === 'warehousing') return <GeneralTextForm />;
  if (current === 'variations') return <GeneralTextForm />;
  if (current === 'bundled_products') return <GeneralTextForm />;
  if (current === 'subscription') return <GeneralTextForm />;
  return <></>;
};
const ProductDetail = () => {
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
    <div className="mt-6 max-w-4xl">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'prodcut_detail',
          defaultMessage: 'Product Detail',
        })}
      />
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
            <div className="border-b border-gray-200 al">
              <nav className="-mb-px flex space-x-8">
                {Object.entries(productOptions).map(([key, value]) => (
                  <a
                    onClick={() => setActiveTab(key)}
                    key={key}
                    className={` ${
                      activeTab === key && 'border-purple-500 text-purple-600'
                    }  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    {value}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="mt-5">{getCurrentTab(activeTab)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
