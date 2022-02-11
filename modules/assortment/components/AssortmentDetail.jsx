import { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  DocumentTextIcon,
  LinkIcon,
  FilmIcon,
  ViewGridIcon,
  FilterIcon,
} from '@heroicons/react/solid';

import LocaleWrapper from '../../common/components/LocaleWrapper';
import SelectOptions from '../../common/components/SelectOptions';

import AssortmentTextForm from './AssortmentTextForm';
import AssortmentMediaForm from './AssortmentMediaForm';

import { stopPropagation } from '../../common/data/miscellaneous';
import AssortmentLinks from './AssortmentLinks';
import AssortmentProducts from './AssortmentProducts';
import AssortmentFilters from './AssortmentFilters';

const getCurrentTab = (currentTag, id) => {
  if (currentTag === 'texts')
    return (
      <LocaleWrapper>
        <AssortmentTextForm assortmentId={id} />
      </LocaleWrapper>
    );
  if (currentTag === 'links') return <AssortmentLinks assortmentId={id} />;

  if (currentTag === 'media')
    return (
      <LocaleWrapper>
        <AssortmentMediaForm assortmentId={id} />
      </LocaleWrapper>
    );
  if (currentTag === 'products')
    return <AssortmentProducts assortmentId={id} />;
  if (currentTag === 'filters') return <AssortmentFilters assortmentId={id} />;
  return (
    <LocaleWrapper>
      <AssortmentTextForm assortmentId={id} />
    </LocaleWrapper>
  );
};
const AssortmentDetail = ({ assortment }) => {
  const { isActive, isBase, isRoot } = assortment;
  const { formatMessage } = useIntl();
  const [activeTab, setActiveTab] = useState('texts');

  const assortmentOptions = [
    {
      id: 'texts',
      texts: formatMessage({
        id: 'texts',
        defaultMessage: 'Texts',
      }),
      Icon: <DocumentTextIcon className="h-4 w-5" />,
    },

    {
      id: 'links',
      links: formatMessage({
        id: 'links',
        defaultMessage: 'Links',
      }),
      Icon: <LinkIcon className="h-4 w-5" />,
    },
    {
      id: 'media',
      media: formatMessage({
        id: 'media',
        defaultMessage: 'Media',
      }),
      Icon: <FilmIcon className="h-4 w-5" />,
    },
    {
      id: 'products',
      products: formatMessage({
        id: 'products',
        defaultMessage: 'Products',
      }),
      Icon: <ViewGridIcon className="h-4 w-5" />,
    },
    {
      id: 'filters',
      filters: formatMessage({
        id: 'filters',
        defaultMessage: 'Filters',
      }),
      Icon: <FilterIcon className="h-4 w-5" />,
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
      current: isActive,
      bgColor: 'green',
    },
    {
      id: 'in-active',
      title: formatMessage({
        id: 'in-active',
        defaultMessage: 'In-Active',
      }),
      description: '',
      current: !isActive,
      bgColor: 'gray',
    },
  ];

  const baseOptions = [
    {
      id: 'base',
      title: formatMessage({
        id: 'base',
        defaultMessage: 'Base',
      }),
      description: '',
      current: isBase,
      bgColor: 'green',
    },
    {
      id: 'not_base',
      title: formatMessage({
        id: 'root',
        defaultMessage: 'Not Base',
      }),
      description: '',
      current: !isBase,
      bgColor: 'gray',
    },
  ];

  const rootOptions = [
    {
      id: 'root',
      title: formatMessage({
        id: 'root',
        defaultMessage: 'Root',
      }),
      description: '',
      current: isRoot,
      bgColor: 'green',
    },
    {
      id: 'leaf',
      title: formatMessage({
        id: 'leaf',
        defaultMessage: 'Leaf',
      }),
      description: '',
      current: !isRoot,
      bgColor: 'gray',
    },
  ];

  const handlePublishOptions = (event) => {
    stopPropagation(event);
  };

  return (
    <>
      <div className="flex space-x-2 justify-end">
        <SelectOptions
          publishingOptions={baseOptions}
          onChange={handlePublishOptions}
        />
        <SelectOptions
          publishingOptions={rootOptions}
          onChange={handlePublishOptions}
        />
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
              {assortmentOptions.map((value) => (
                <option key={value.id} value={value.id}>
                  {value.id}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden lg:block">
            <div className="border-b border-gray-200 al">
              <nav className="-mb-px flex space-x-8">
                {assortmentOptions.map((option) => (
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
            {getCurrentTab(activeTab, assortment?._id)}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssortmentDetail;
