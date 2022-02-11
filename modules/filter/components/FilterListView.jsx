import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import FiltersOptionsList from './FiltersOptionsList';
import useRemoveFilterOption from '../hooks/useRemoveFilterOption';
import useModal from '../../modal/hooks/useModal';
import DangerMessage from '../../modal/components/DangerMessage';

function FilterListView({ filtersId, options, selectedLocale }) {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { removeFilter } = useRemoveFilterOption();

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
          await removeFilter({ filtersId });
          toast.success(
            formatMessage(
              {
                id: 'filter_deleted',
                defaultMessage: 'filter {id} deleted successfully',
              },
              {
                id: filtersId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_product',
          defaultMessage: 'Delete Product',
        })}
      />,
    );
  };

  return (
    <div>
      <div className="col-span-2 w-full py-2 ml-auto shadow5-md px-6">
        <FiltersOptionsList
          options={options}
          selectedLocale={selectedLocale}
          onRemoveFilter={onRemoveFilter}
        />
      </div>
    </div>
  );
}

export default FilterListView;
