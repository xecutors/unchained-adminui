import classnames from 'classnames';

import useField, { FieldHookProps } from '../hooks/useField';
import { validateDate } from '../lib/validators';
import FieldWrapper from './FieldWrapper';

const defaultParseDate = (value: string) => {
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date.toISOString().split('T')[0];
};

const DatePickerField = ({
  validators = [],
  className,
  parseDate = defaultParseDate,
  ...props
}: FieldHookProps) => {
  const field = useField({
    validators: [...validators, validateDate],
    ...props,
  });

  const formattedValue = field.value
    ? new Date(field.value).toISOString().split('T')[0]
    : '';

  return (
    <FieldWrapper {...field} className={props.containerClassName}>
      <input
        type="date"
        id={field.id}
        name={field.name}
        disabled={field.disabled}
        className={classnames(
          'relative mt-0 block w-full appearance-none rounded-md rounded-b-md border-2 border-slate-200 dark:border-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-200 dark:bg-slate-900 placeholder-slate-400 shadow-xs focus:z-10 focus:border-indigo-400 focus:outline-hidden focus:ring-indigo-400',
          className,
          {
            'border-red-300': !!field.error,
          },
        )}
        onChange={(e) => field.setValue(e.target.value)}
        value={formattedValue}
        placeholder={field.placeholder}
        autoComplete="off"
        {...props}
      />
    </FieldWrapper>
  );
};

export default DatePickerField;
