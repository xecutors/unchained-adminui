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
      <div>
        <select
          className={classnames(
            'mt-1 block w-full rounded-md border-2 border-slate-200 py-2.5 pl-3 pr-10 text-base text-slate-400 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-indigo-400 sm:text-sm',
            className,
            {
              'border-red-300 text-red-600': !!field.error,
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
