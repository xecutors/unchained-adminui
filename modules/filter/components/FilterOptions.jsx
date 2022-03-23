import { useIntl } from 'react-intl';

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
    <div className="mt-4 sm:max-w-full ">
      <div className=" sm:px-15 shadow sm:rounded-t">
        <div className="bottom-1 mt-3 border-t border-gray-200 pt-4">
          <div className=" relative max-w-full rounded-md lg:grid lg:grid-cols-3">
            <div className="p-3 md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {formatMessage({
                    id: 'filer_options',
                    defaultMessage: 'Filter options',
                  })}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setModal(
                    <FilterOptionForm
                      filterId={filterId}
                      onSubmit={onSubmit}
                    />,
                  )
                }
                className="fixed top-0 right-0 z-50 mb-5  mt-5 mr-2 h-9 rounded-md border  border-transparent bg-indigo-600 px-3 py-1 text-sm font-medium  leading-5 text-white shadow-sm sm:fixed sm:top-auto sm:right-auto"
              >
                {formatMessage({
                  id: 'add_filter_option',
                  defaultMessage: 'Add option',
                })}
              </button>
            </div>
            <div className="col-span-2 ml-auto mt-8 w-full border-gray-200 bg-white p-3  sm:mt-0 lg:shadow-md">
              <FilterOptionsList
                filterId={filterId}
                options={filterOptions}
                selectedLocale={selectedLocale}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterFormView;
