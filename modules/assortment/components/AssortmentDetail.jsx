import { useState } from 'react';
import { useIntl } from 'react-intl';
import LocaleWrapper from '../../common/components/LocaleWrapper';

import ProductDetailHeader from '../../common/components/ProductDetailHeader';
import AssortmentLinkForm from './AssortmentLinkForm';
import AssortmentTextForm from './AssortmentTextForm';

import AssortmentMediaForm from './AssortmentMediaForm';
import AssortmentProductForm from './AssortmentProductForm';
import AssortmentFiltersForm from './AssotmentFiltersForm';

const getCurrentTab = (currentTag, id) => {
  if (currentTag === 'texts')
    return (
      <LocaleWrapper>
        <AssortmentTextForm assortmentId={id} />
      </LocaleWrapper>
    );
  if (currentTag === 'links') return <AssortmentLinkForm assortmentId={id} />;

  if (currentTag === 'media')
    return (
      <LocaleWrapper>
        <AssortmentMediaForm assortmentId={id} />
      </LocaleWrapper>
    );
  if (currentTag === 'products')
    return <AssortmentProductForm assortmentId={id} />;
  if (currentTag === 'filters')
    return <AssortmentFiltersForm assortmentId={id} />;
  return (
    <LocaleWrapper>
      <AssortmentTextForm assortmentId={id} />
    </LocaleWrapper>
  );
};
const AssortmentDetail = ({ assortment }) => {
  const { formatMessage } = useIntl();
  const [activeTab, setActiveTab] = useState('texts');

  const assortmentOptions = {
    texts: formatMessage({
      id: 'texts',
      defaultMessage: 'Texts',
    }),
    links: formatMessage({ id: 'links', defaultMessage: 'Links' }),
    media: formatMessage({ id: 'media', defaultMessage: 'Media' }),
    products: formatMessage({ id: 'products', defaultMessage: 'Products' }),
    filters: formatMessage({
      id: 'filters',
      defaultMessage: 'Filters',
    }),
  };
  return (
    <>
      <div className="flex justify-end">
        <ProductDetailHeader />
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
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
              value={activeTab}
            >
              {Object.entries(assortmentOptions).map(([key, value]) => (
                <option key={`mobile-${key}`} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden lg:block">
            <div className="border-b border-gray-200 al">
              <nav className="-mb-px flex space-x-8">
                {Object.entries(assortmentOptions).map(([key, value]) => (
                  <a
                    onClick={() => setActiveTab(key)}
                    key={key}
                    className={` ${
                      activeTab === key &&
                      'border-purple-500 text-purple-600 cursor-pointer'
                    }  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
                  >
                    {value}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="text-indigo-500">
            {getCurrentTab(activeTab, assortment?._id)}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssortmentDetail;
