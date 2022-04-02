import { useIntl } from 'react-intl';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';

import useModal from '../../modal/hooks/useModal';
import useCreateFilterOption from '../hooks/useCreateFilterOption';
import useFilterOptions from '../hooks/useFilterOptions';
import FilterOptionForm from './FilterOptionForm';

import FilterOptionsList from './FilterOptionsList';

const FilterFormView = ({ filterId, selectedLocale }) => {
  const { formatMessage } = useIntl();
  const { filterOptions } = useFilterOptions({ filterId });
  const { setModal } = useModal();

  const { createFilterOption } = useCreateFilterOption();

  const onSubmit = async ({ value, title }) => {
    await createFilterOption({ filterId, value, title });
    setModal('');
    return true;
  };

  return (
    <SelfDocumentingView
      documentationLabel={formatMessage({
        id: 'filer_options',
        defaultMessage: 'Filter options',
      })}
      documentation="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco"
      sideComponents={
        <button
          type="button"
          onClick={() =>
            setModal(
              <FilterOptionForm
                filterId={filterId}
                onSubmit={onSubmit}
                onCancel={() => setModal('')}
              />,
            )
          }
          className="fixed top-0 right-0 z-50 mb-5  mt-5 mr-2 h-9 rounded-md border  border-transparent bg-indigo-500 px-3 py-1 text-sm font-medium  leading-5 text-white shadow-sm sm:fixed sm:top-auto sm:right-auto"
        >
          {formatMessage({
            id: 'add_filter_option',
            defaultMessage: 'Add option',
          })}
        </button>
      }
      mainContent={
        <div className="mt-8 w-full border-slate-200 bg-white p-3  sm:mt-0 lg:shadow-md">
          <FilterOptionsList
            filterId={filterId}
            options={filterOptions}
            selectedLocale={selectedLocale}
          />
        </div>
      }
    />
  );
};

export default FilterFormView;
