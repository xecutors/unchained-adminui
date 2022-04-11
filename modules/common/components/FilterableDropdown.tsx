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

  const handleOnBlur = (event) => {
    if (!data.length) {
      setShowDropdown(false);
      field.setError('');
    }
    if (!event.target.value) {
      setShowDropdown(false);
      onFilter('');
      field.setError('');
    }
  };

  const handleOnFocus = () => {
    if (!props.queryString) {
      onFilter('a');
      setShowDropdown(true);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-full">
        <div
          className={classNames(
            'my-2 flex items-center rounded border-slate-200 p-1',
            props.className,
          )}
        >
          <div className="w-full">
            <FieldWrapper {...field}>
              {currentSelection ? (
                <div className="w-full">
                  <input
                    type="search"
                    className="w-full h-12 text-slate-800 dark:bg-slate-600 dark:text-white  focus:outline-none mt-1 block appearance-none rounded-l-md border-2 outline-none border-gray-200 px-2 py-2.5 placeholder-gray-400 shadow-sm focus:border-indigo-400 focus:ring-indigo-400"
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
                  <div className="w-full">
                    <input
                      className={classNames(
                        'mt-1 h-12 block w-full dark:bg-slate-600 dark:text-white appearance-none rounded-l-md border-2 outline-none border-gray-200 px-2 py-2.5 text-slate-800 placeholder-gray-400 dark:placeholder:text-white shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-indigo-400',
                        {
                          'border-red-300 focus:border-red-300': !!field.error,
                        },
                      )}
                      onChange={(e) => {
                        if (!showDropdown) setShowDropdown(!showDropdown);

                        field.setTouched(true);

                        onFilter(e.target.value);
                      }}
                      onFocus={handleOnFocus}
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
                    />
                  </div>
                </>
              )}
            </FieldWrapper>
          </div>

          <div
            className={classNames(
              '-ml-px mb-2 h-12 flex items-center self-end rounded-r-md border-gray-200 bg-indigo-500 py-2 pl-2 pr-1 text-white',
              { 'bg-red-400': !!field.error },
              props.buttonClassName,
            )}
          >
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="h-6 w-6 cursor-pointer text-slate-600 outline-none focus:outline-none"
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
          'top-100 lef-0 max-h-select absolute z-50 w-full overflow-y-auto rounded shadow dark:shadow-white',
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
