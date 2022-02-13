import { useIntl } from 'react-intl';
import {
  DocumentTextIcon,
  ClipboardListIcon,
  TrashIcon,
} from '@heroicons/react/solid';

import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import LocaleWrapper from '../../common/components/LocaleWrapper';
import SelectOptions from '../../common/components/SelectOptions';
import TabComponent from '../../common/components/TabComponent';
import FilterTextForm from './FilterTextForm';
import FilterOptions from './FilterOptions';
import FilterSummary from './FilterSummary';
import useUpdateFilter from '../hooks/useUpdateFilter';
import useRemoveFilter from '../hooks/useRemoveFilter';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';

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
  const { removeFilter } = useRemoveFilter();
  const router = useRouter();
  const { setModal } = useModal();

  const onRemoveFilter = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_filter_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this language? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeFilter({ filterId });
          toast.success(
            formatMessage(
              {
                id: 'filter_deleted',
                defaultMessage: 'filter {id} deleted successfully',
              },
              {
                id: filterId,
              },
            ),
          );
          router.push('/filters');
        }}
        okText={formatMessage({
          id: 'delete_filter',
          defaultMessage: 'Delete filter',
        })}
      />,
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
          <div className="flex">
            <button
              onClick={onRemoveFilter}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mr-5"
            >
              <TrashIcon className="h-5 w-5 cursor-pointer text-white-400" />
              {formatMessage({ id: 'delete_filter', defaultMessage: 'Delete' })}
            </button>
            <SelectOptions
              options={activeOptions}
              type={formatMessage({ id: 'filter', defaultMessage: 'Filter' })}
            />
          </div>
        </div>
      </div>
      <TabComponent tabItems={filterOptions} defaultTab="text">
        <GetCurrentTab id={filter?._id} />
      </TabComponent>
    </>
  );
};

export default FilterDetail;
