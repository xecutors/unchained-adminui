import { useIntl } from 'react-intl';

import FilterListView from './FilterListView';

const FilterFormView = ({ filterId, selectedLocale, options }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="mt-4 sm:max-w-full">
      <div className="px-5 shadow sm:rounded-t sm:px-15">
        <div className="mt-3 bottom-1 border-t border-gray-200 pt-4">
          <div className="sm:px-6 rounded-md relative max-w-full lg:grid lg:grid-cols-3">
            <div className="pb-2 mb-7 border-gray-200 sm:flex  col-span-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {formatMessage({
                  id: 'options_list_view',
                  defaultMessage: 'Options List View',
                })}
              </h3>
            </div>
            <div className="col-span-2 w-full ml-auto lg:shadow-md border-gray-200  bg-white px-8">
              <FilterListView
                filterId={filterId}
                options={options}
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
