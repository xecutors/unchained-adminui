import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useAssortmentFilters from '../hooks/useAssortmentFilters';
import useRemoveAssortmentFilter from '../hooks/useRemoveAssortmentFilter';
import AssortmentFiltersList from './AssortmentFiltersList';
import AssortmentFiltersForm from './AssortmentFiltersForm';
import Loading from '../../common/components/Loading';

const AssortmentFilters = ({ assortmentId }) => {
  const { formatMessage } = useIntl();
  const { assortmentFilters, loading } = useAssortmentFilters({ assortmentId });
  const { setModal } = useModal();
  const { removeAssortmentFilter } = useRemoveAssortmentFilter();

  const onRemoveFilter = async (assortmentFilterId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_assortment_filter_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this language? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeAssortmentFilter({ assortmentFilterId });
          toast.success(
            formatMessage(
              {
                id: 'filter_deleted',
                defaultMessage: 'filter {id} deleted successfully',
              },
              {
                id: assortmentId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_filter',
          defaultMessage: 'Delete Filter',
        })}
      />,
    );
  };

  return (
    <div className="mt-5 md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {formatMessage({
              id: 'add_assortment_filter',
              defaultMessage: 'Add Filters',
            })}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </p>
        </div>
      </div>
      <div className="md:col-span-2">
        <AssortmentFiltersForm assortmentId={assortmentId} />
      </div>
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {formatMessage({
              id: 'assigned_assortment_filters',
              defaultMessage: 'Assigned filters',
            })}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </p>
        </div>
      </div>
      <div className="md:col-span-2 w-full py-2 ml-auto shadow-md px-6">
        {loading ? (
          <Loading />
        ) : (
          <AssortmentFiltersList
            filters={assortmentFilters}
            onRemoveFilter={onRemoveFilter}
          />
        )}
      </div>
    </div>
  );
};

export default AssortmentFilters;
