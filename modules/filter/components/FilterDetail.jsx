import { useState } from 'react';
import { useIntl } from 'react-intl';
import { DocumentTextIcon, ClipboardListIcon } from '@heroicons/react/solid';

import LocaleWrapper from '../../common/components/LocaleWrapper';
import SelectOptions from '../../common/components/SelectOptions';
import { stopPropagation } from '../../common/data/miscellaneous';

import FilterTextForm from './FilterTextForm';
import FilterFormView from './FilterFormView';
import FilterSummary from './FilterSummary';

const FilterDetail = ({ filter }) => {
  const { isActive, options, key, type, created, updated } = filter;
  const { formatMessage } = useIntl();
  const [activeTab, setActiveTab] = useState('text');
  const getCurrentTab = (currentTag, id) => {
    if (currentTag === 'text')
      return (
        <LocaleWrapper>
          <FilterTextForm filterId={id} />
        </LocaleWrapper>
      );

    if (currentTag === 'options')
      return (
        <LocaleWrapper>
          <FilterFormView filterId={id} options={options} />
        </LocaleWrapper>
      );
    return (
      <LocaleWrapper>
        <FilterTextForm filterId={id} />
      </LocaleWrapper>
    );
  };

  const filterOptions = [
    {
      id: 'text',
      texts: formatMessage({
        id: 'text',
        defaultMessage: 'Text',
      }),
      Icon: <DocumentTextIcon className="h-4 w-5" />,
    },

    {
      id: 'options',
      options: formatMessage({
        id: 'options',
        defaultMessage: 'Options',
      }),
      Icon: <ClipboardListIcon className="h-4 w-5" />,
    },
  ];

  const activeOptions = [
    {
      id: 'activate',
      title: formatMessage({
        id: 'active',
        defaultMessage: 'Activate',
      }),
      description: '',
      current: isActive,
      bgColor: 'green',
    },
    {
      id: 'deactive',
      title: formatMessage({
        id: 'deactive',
        defaultMessage: 'Deactivate',
      }),
      description: '',
      current: !isActive,
      bgColor: 'gray',
    },
  ];

  const handlePublishOptions = (event) => {
    stopPropagation(event);
  };
  const formatTimeStamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <FilterSummary
            filterKey={key}
            filterType={type}
            createdAt={formatTimeStamp(created)}
            updatedAt={formatTimeStamp(updated)}
          />
        </div>
        <div className="self-end1">
          <SelectOptions
            publishingOptions={activeOptions}
            onChange={handlePublishOptions}
          />
        </div>
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
              {filterOptions.map((value) => (
                <option key={value.id} value={value.id}>
                  {value.id}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden lg:block">
            <div className="border-b border-gray-200 al">
              <nav className="-mb-px flex space-x-8">
                {filterOptions.map((option) => (
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
            {getCurrentTab(activeTab, filter?._id)}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterDetail;
