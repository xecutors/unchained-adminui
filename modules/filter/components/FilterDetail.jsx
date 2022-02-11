import { useIntl } from 'react-intl';
import { DocumentTextIcon, ClipboardListIcon } from '@heroicons/react/solid';

import LocaleWrapper from '../../common/components/LocaleWrapper';
import SelectOptions from '../../common/components/SelectOptions';
import { stopPropagation } from '../../common/data/miscellaneous';
import TabComponent from '../../common/components/TabComponent';
import FilterTextForm from './FilterTextForm';
import FilterFormView from './FilterFormView';
import FilterSummary from './FilterSummary';

const FilterDetail = ({ filter }) => {
  const { isActive, options, key, type, created, updated } = filter;
  const { formatMessage } = useIntl();

  const GetCurrentTab = ({ selectedView, id }) => {
    if (selectedView === 'text')
      return (
        <LocaleWrapper>
          <FilterTextForm filterId={id} />
        </LocaleWrapper>
      );

    if (selectedView === 'options')
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
      <TabComponent tabItems={filterOptions} defaultTab="text">
        <GetCurrentTab id={filter?._id} />
      </TabComponent>
    </>
  );
};

export default FilterDetail;
