import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

import { useState } from 'react';
import { useIntl } from 'react-intl';
import FieldWrapper from '../../forms/components/FieldWrapper';

import { TextFieldProps } from '../../forms/components/TextField';
import useField from '../../forms/hooks/useField';
import FilteredListItem from './FilteredListItem';
import Loading from './Loading';

interface FilterableData {
  id: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  image?: string;
}

interface FilterableDropdownProps extends TextFieldProps {
  data?: FilterableData[];
  onFilter?: any;
  isLoading: boolean;
}

const FilterableDropdown = ({
  data,
  onFilter,
  isLoading,
  ...props
}: FilterableDropdownProps) => {
  const { formatMessage } = useIntl();
  const [showDropdown, setShowDropdown] = useState(true);
  const [currentSelection, setCurrentSelection] = useState('');
  const field = useField({ ...props });

  const onSelected = (value) => {
    setShowDropdown(false);
    console.log(value.title);
    setCurrentSelection(value.title);

    field.setValue(value.id, true);
  };

  return (
    <div className="flex flex-col items-center relative">
      <div className="w-full">
        <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
          <div className="w-full">
            <FieldWrapper {...field}>
              {currentSelection ? (
                <div className="w-full">
                  <input
                    type="search"
                    className="w-full px-4 py-1 text-gray-800  focus:outline-none"
                    placeholder={formatMessage({
                      id: 'search',
                      defaultMessage: 'Search',
                    })}
                    defaultValue={currentSelection}
                    x-model="search"
                    onClick={() => {
                      setCurrentSelection('');
                      field.setValue('');
                    }}
                  />
                </div>
              ) : (
                <>
                  <div className="w-full ">
                    <input
                      type="search"
                      className="w-full px-4 py-1 text-gray-800  focus:outline-none"
                      placeholder="search"
                      value={currentSelection}
                      defaultValue={currentSelection}
                      onClick={() => {
                        setCurrentSelection('');
                        field.setValue('');
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <div className="w-full ">
                      <input
                        className={classNames(
                          'w-full shadow-sm appearance-none mt-1 rounded-md relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
                          'p-1 px-2 appearance-none outline-none w-full text-gray-800',
                          {
                            'border-red-300': !!field?.error,
                          },
                        )}
                        onChange={(e) => {
                          if (!showDropdown) setShowDropdown(true);

                          field.setTouched(true);

                          onFilter(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-full hidden">
                      <input
                        readOnly
                        required={field.required}
                        disabled={field.disabled}
                        id={field.name}
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        value={field.value}
                        className={classNames('', field.className)}
                      />
                    </div>
                  </>
                )}
              </>
            </FieldWrapper>
          </div>

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
          {isLoading ? (
            <Loading />
          ) : (
            data?.map((item) => (
              <FilteredListItem
                key={item.id}
                item={item}
                onSelected={onSelected}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterableDropdown;
