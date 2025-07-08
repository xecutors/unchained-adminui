import classNames from 'classnames';
import { useEffect, useState } from 'react';

import Select from 'react-select';
import FieldWrapper from '../../forms/components/FieldWrapper';
import { TextFieldProps } from '../../forms/components/TextField';
import useField from '../../forms/hooks/useField';
import deBounce from '../utils/deBounce';

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
}

const FilterableDropdown = ({
  data,
  onFilter,
  ...props
}: FilterableDropdownProps) => {
  const field = useField({ ...props });
  const debouncedFilter = deBounce(200)(onFilter);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => observer.disconnect();
  }, []);

  // Custom styles for dark theme support
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: '#ffffff',
      borderColor: state.isFocused ? '#1e293b' : '#cbd5e1', // slate-800 : slate-300
      borderWidth: '1px',
      borderRadius: '0.375rem', // rounded-md
      boxShadow: state.isFocused ? '0 0 0 2px #1e293b' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      minHeight: '42px', // py-2.5 equivalent
      paddingLeft: '16px', // px-4
      paddingRight: '16px',
      '&:hover': {
        borderColor: state.isFocused ? '#1e293b' : '#94a3b8', // slate-800 : slate-400
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0',
    }),
    input: (provided: any) => ({
      ...provided,
      margin: '0',
      padding: '0',
      color: '#0f172a', // slate-900
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0', // slate-200
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      zIndex: 9999,
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: '300px',
      overflowY: 'auto',
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-track': {
        background: '#f1f1f1',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#c1c1c1',
        borderRadius: '4px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#a8a8a8',
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#f1f5f9' : 'transparent', // slate-100
      color: '#0f172a', // slate-900
      padding: '10px 16px',
      '&:hover': {
        backgroundColor: '#f1f5f9', // slate-100
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#0f172a', // slate-900
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#9ca3af', // slate-400
    }),
  };

  // Dark theme styles
  const darkCustomStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: '#0f172a', // slate-900
      borderColor: state.isFocused ? '#1e293b' : '#374151', // slate-800 : slate-700
      borderWidth: '1px',
      borderRadius: '0.375rem', // rounded-md
      boxShadow: state.isFocused ? '0 0 0 2px #1e293b' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      minHeight: '42px', // py-2.5 equivalent
      paddingLeft: '16px', // px-4
      paddingRight: '16px',
      '&:hover': {
        borderColor: state.isFocused ? '#1e293b' : '#475569', // slate-800 : slate-600
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0',
    }),
    input: (provided: any) => ({
      ...provided,
      margin: '0',
      padding: '0',
      color: '#f1f5f9', // slate-100
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#0f172a', // slate-900
      border: '1px solid #1e293b', // slate-800
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      zIndex: 9999,
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: '300px',
      overflowY: 'auto',
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-track': {
        background: '#1e293b',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#475569',
        borderRadius: '4px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#64748b',
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#1e293b' : 'transparent', // slate-800
      color: '#f1f5f9', // slate-100
      padding: '10px 16px',
      '&:hover': {
        backgroundColor: '#1e293b', // slate-800
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#f1f5f9', // slate-100
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#64748b', // slate-500
    }),
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-full">
        <div
          className={classNames(
            'my-2 flex items-center rounded-sm',
            props.className,
          )}
        >
          <div className="w-full">
            <FieldWrapper {...field}>
              <Select
                isDisabled={!!field.disabled}
                id={field.id}
                isLoading={props.isLoading}
                name={field.name}
                onBlur={field.onBlur}
                onInputChange={debouncedFilter}
                onChange={({ value }) => {
                  field.setValue(value, true);
                }}
                placeholder={field.placeholder}
                options={data?.map((item) => ({
                  label: item.title,
                  value: item.id,
                }))}
                styles={isDark ? darkCustomStyles : customStyles}
                className="dark:text-slate-100"
                classNamePrefix="react-select"
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
            </FieldWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterableDropdown;
