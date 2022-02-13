import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import useRemoveFilterOption from '../hooks/useRemoveFilterOption';
import useModal from '../../modal/hooks/useModal';
import DangerMessage from '../../modal/components/DangerMessage';
import FilterOptionsListItem from './FilterOptionsListItem';

function FilterListView({ filterId, options, selectedLocale }) {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { removeFilterOption } = useRemoveFilterOption();

  const onRemoveFilterOption = async (filterOptionValue) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_filter_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this language? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeFilterOption({ filterId, filterOptionValue });
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
        }}
        okText={formatMessage({
          id: 'delete_filter_option',
          defaultMessage: 'Delete option',
        })}
      />,
    );
  };

  return (
    <div>
      <ul className="-my-5 divide-y divide-gray-200 pb-3">
        {options.map((option) => (
          <FilterOptionsListItem
            filterId={filterId}
            key={option._id}
            option={option}
            onDelete={onRemoveFilterOption}
            selectedLocale={selectedLocale}
          />
        ))}
      </ul>
    </div>
  );
}

export default FilterListView;
