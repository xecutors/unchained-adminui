import { useIntl } from 'react-intl';
import { DocumentTextIcon, ClipboardListIcon } from '@heroicons/react/solid';

import { toast } from 'react-toastify';
import LocaleWrapper from '../../common/components/LocaleWrapper';
import SelectOptions from '../../common/components/SelectOptions';
import Tab from '../../common/components/Tab';
import FilterTextForm from './FilterTextForm';
import FilterOptions from './FilterOptions';
import FilterSummary from './FilterSummary';
import useUpdateFilter from '../hooks/useUpdateFilter';

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
        <FilterOptions filterId={id} />
      </LocaleWrapper>
    );
  return (
    <LocaleWrapper>
      <FilterTextForm filterId={id} />
    </LocaleWrapper>
  );
};

const FilterDetail = ({ filter }) => {
  const { _id: filterId, isActive, key, type, created, updated } = filter;
  const { formatMessage, formatDate } = useIntl();
  const { updateFilter } = useUpdateFilter();

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
        id: 'activate',
        defaultMessage: 'Activate',
      }),
      selectedTitle: formatMessage({
        id: 'active',
        defaultMessage: 'Active',
      }),
      onClick: async () => {
        await updateFilter({
          filterId,
          isActive: true,
        });
        toast.success(
          formatMessage({
            id: 'filter_activated',
            defaultMessage: 'Filter activated!',
            description: 'shown on successful toggle of filter status',
          }),
        );
      },
      description: 'some description',
      current: isActive,
      bgColor: 'green',
    },
    {
      id: 'deactivate',
      title: formatMessage({
        id: 'deactivate',
        defaultMessage: 'Deactivate',
      }),
      onClick: async () => {
        await updateFilter({
          filterId,
          isActive: false,
        });
        toast.success(
          formatMessage({
            id: 'filter_deactivated',
            defaultMessage: 'Filter deactivated!',
            description: 'shown on successful toggle of filter status',
          }),
        );
      },
      selectedTitle: formatMessage({
        id: 'deactivated',
        defaultMessage: 'Deactivated',
      }),
      description: 'some description',
      current: !isActive,
      bgColor: 'gray',
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <FilterSummary
            filterKey={key}
            filterType={type}
            createdAt={formatDate(created)}
            updatedAt={formatDate(updated)}
          />
        </div>
        <div className="self-end">
          <SelectOptions
            options={activeOptions}
            type={formatMessage({ id: 'filter', defaultMessage: 'Filter' })}
          />
        </div>
      </div>
      <Tab tabItems={filterOptions} defaultTab="text">
        <GetCurrentTab id={filter?._id} />
      </Tab>
    </>
  );
};

export default FilterDetail;
