import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

import { useState } from 'react';
import { useIntl } from 'react-intl';
import FieldWrapper from '../../forms/components/FieldWrapper';

import { TextFieldProps } from '../../forms/components/TextField';
import useField from '../../forms/hooks/useField';
import FilteredList from './FilteredList';
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentSelection, setCurrentSelection] = useState('');
  const field = useField({ ...props });

  const onSelected = (value) => {
    setShowDropdown(false);
    setCurrentSelection(value.title);
    field.setValue(value.id, true);
  };

  const handleOnBlur = () => {
    if (!data.length) {
      setShowDropdown(false);
      field.setError('');
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-full">
        <div
          className={classNames(
            'my-2 flex rounded border-gray-200 bg-white p-1',
            props.className,
          )}
        >
          <div className="w-full">
            <FieldWrapper {...field}>
              {currentSelection ? (
                <div className="h-10 w-full">
                  <input
                    type="search"
                    className="w-full px-4 py-1 text-gray-800  focus:outline-none"
                    placeholder={formatMessage({
                      id: 'search',
                      defaultMessage: 'Search',
                    })}
                    defaultValue={currentSelection}
                    value={currentSelection}
                    x-model="search"
                    onClick={() => {
                      setCurrentSelection('');
                      field.setValue('');
                    }}
                  />
                </div>
              ) : (
                <>
                  <div className="h-10 w-full">
                    <input
                      className={classNames(
                        'relative mt-1 block w-full appearance-none rounded-l-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500',
                        'w-full appearance-none p-1 px-2 text-gray-800 outline-none',
                        {
                          'border-red-300': !!field.error,
                        },
                      )}
                      onChange={(e) => {
                        if (!showDropdown) setShowDropdown(!showDropdown);

                        field.setTouched(true);

                        onFilter(e.target.value);
                      }}
                      onBlur={handleOnBlur}
                    />
                  </div>
                  <div className="hidden w-full">
                    <input
                      readOnly
                      disabled={field.disabled}
                      id={field.name}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      value={field.value}
                      {...field}
                    />
                  </div>
                </>
              )}
            </FieldWrapper>
          </div>

          <div
            className={classNames(
              'mb-2 flex h-10 w-10 items-center self-end rounded-r-md border-gray-200 bg-indigo-500 py-1 pl-2 pr-1 text-white',
              { 'bg-red-500': !!field.error },
              props.buttonClassName,
            )}
          >
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="h-6 w-6 cursor-pointer text-gray-600 outline-none focus:outline-none"
            >
              {showDropdown ? (
                <ChevronDownIcon
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                />
              ) : (
                <ChevronUpIcon
                  className="h-6 w-6 text-white"
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
          'top-100 lef-0 max-h-select absolute z-40 w-full overflow-y-auto rounded bg-white shadow ',
          {
            hidden: !showDropdown,
          },
        )}
      >
        <div className="flex w-full flex-col">
          {isLoading ? (
            <Loading />
          ) : (
            <FilteredList data={data} onSelected={onSelected} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterableDropdown;
