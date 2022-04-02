import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useAssortmentFilters from '../hooks/useAssortmentFilters';
import useRemoveAssortmentFilter from '../hooks/useRemoveAssortmentFilter';
import AssortmentFiltersList from './AssortmentFiltersList';
import AssortmentFiltersForm from './AssortmentFiltersForm';
import Loading from '../../common/components/Loading';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';

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
            formatMessage({
              id: 'assortment_filter_deleted',
              defaultMessage: 'Assortment filter deleted successfully',
            }),
          );
        }}
        okText={formatMessage({
          id: 'delete_filter',
          defaultMessage: 'Delete filter',
        })}
      />,
    );
  };

  return (
    <>
      <SelfDocumentingView
        documentationLabel={formatMessage({
          id: 'add_assortment_filter',
          defaultMessage: 'Add Filters',
        })}
        documentation="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco"
        mainContent={<AssortmentFiltersForm assortmentId={assortmentId} />}
      />

      <SelfDocumentingView
        documentationLabel={formatMessage({
          id: 'assigned_assortment_filters',
          defaultMessage: 'Assigned filters',
        })}
        className="mt-5"
        documentation="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco"
        mainContent={
          loading ? (
            <Loading />
          ) : (
            <div className=" bg-white py-2 px-6 shadow">
              <AssortmentFiltersList
                filters={assortmentFilters}
                onRemoveFilter={onRemoveFilter}
              />
            </div>
          )
        }
      />
    </>
  );
};

export default AssortmentFilters;
