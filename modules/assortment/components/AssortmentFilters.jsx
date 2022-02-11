import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useAssortmentFilters from '../hooks/useAssortmentFilters';
import useRemoveAssortmentFilter from '../hooks/useRemoveAssortmentFilter';
import AssortmentFiltersList from './AssortmentFiltersList';
import AssortmentFiltersForm from './AssotmentFiltersForm';

const AssortmentFilters = ({ assortmentId }) => {
  const { formatMessage } = useIntl();
  const { assortmentFilters } = useAssortmentFilters({ assortmentId });
  const { setModal } = useModal();
  const { removeProduct } = useRemoveAssortmentFilter();

  const onRemoveFilter = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_assortment_filter_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this language? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeProduct({ assortmentId });
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
    <div className=" mt-5 sm:max-w-full">
      <div className="px-2 lg:px-6 shadow sm:rounded-t sm:px-15">
        <div className=" sm:p-6 rounded-md relative max-w-full lg:grid lg:grid-cols-3 px-8">
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
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco
              </p>
            </div>
          </div>
          <div className="col-span-2 py-2 w-full ml-auto lg:shadow-md border-gray-200  bg-white sm:px-8">
            <AssortmentFiltersForm />
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-3 px-6 border-gray-200 border-b pb-8">
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
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco
              </p>
            </div>
          </div>
          <div className="space-y-4 col-span-2 w-full ml-auto shadow-md border-gray-200  bg-white py-6 px-6">
            <AssortmentFiltersList
              filters={assortmentFilters}
              onRemoveFilter={onRemoveFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssortmentFilters;
