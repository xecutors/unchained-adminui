/* eslint-disable no-undef */
import classnames from 'classnames';

import useField, { FieldHookProps } from '../hooks/useField';
import FieldWrapper from './FieldWrapper';

export interface SelectFieldOptions {
  [key: string]: string | JSX.Element;
}

interface SelectFieldProps extends FieldHookProps {
  options: SelectFieldOptions;
}

const SelectField = (props: SelectFieldProps) => {
  const { options, ...field } = useField(props);
  const { className } = props || { className: '' };

  return (
    <FieldWrapper {...field}>
      <div className="select-wrap">
        <select
          className={classnames(
            'mt-1 block w-full pl-1 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md form-field',
            className,
            {
              'text-red-600 border-red-300': !!field.error,
            },
          )}
          disabled={field.disabled}
          id={field.name}
          name={field.name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
        >
          {(!!field.placeholder || !field.required) && (
            <option value="" disabled={field.required} hidden={field.required}>
              {field.placeholder || field.label}
            </option>
          )}
          {Object.entries(options).map(([value, display]) => (
            <option key={value} value={value}>
              {display}
            </option>
          ))}
        </select>
      </div>
    </FieldWrapper>
  );
};

export default SelectField;
