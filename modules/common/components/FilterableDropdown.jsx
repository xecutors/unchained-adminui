import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { useState } from 'react';
import FilteredListItem from './FilteredListItem';

const FilterableDropdown = ({ data, onFilter }) => {
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:w-1/2 flex flex-col items-center h-64">
        <div className="w-full px-4">
          <div className="flex flex-col items-center relative">
            <div className="w-full">
              <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
                <div className="flex flex-auto flex-wrap" />
                <input
                  placeholder="Search by position"
                  className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                  onChange={onFilter}
                />
                <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                  >
                    {showDropdown ? (
                      <ChevronDownIcon
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      />
                    ) : (
                      <ChevronUpIcon
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div
              className={classNames(
                'absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto ',
                {
                  hidden: !showDropdown,
                },
              )}
            >
              <div className="flex flex-col w-full">
                {data?.map((item) => (
                  <FilteredListItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterableDropdown;
