import classnames from 'classnames';
import DatePicker from 'react-datepicker';

import useField, { FieldHookProps } from '../hooks/useField';
import { validateDate } from '../lib/validators';
import FieldWrapper from './FieldWrapper';

const defaultParseDate = (date) => {
  if (date && validateDate.isValid(date)) {
    return date;
  }
  return date !== null;
};

const DatePickerField = ({
  validators = [],
  className,
  parseDate = defaultParseDate,
  datePickerOptions = {},
  ...props
}: FieldHookProps) => {
  const field = useField({
    validators: [...validators, validateDate],
    ...props,
  });

  return (
    <FieldWrapper {...field} className={props.containerClassName}>
      <DatePicker
        disabled={field.disabled}
        id={field.id}
        name={field.name}
        className={classnames(
          'relative mt-0 block w-full appearance-none rounded-md rounded-b-md border-2 border-slate-200 px-4 py-2.5 text-sm text-slate-900 dark:text-white dark:bg-slate-600 placeholder-slate-400 shadow-sm focus:z-10 focus:border-indigo-400 focus:outline-none focus:ring-indigo-400',
          className,
          {
            'border-red-300': !!field.error,
          },
        )}
        onChange={(date) => field.setValue(parseDate(date))}
        dateFormat="dd.MM.yyyy h:mm aa"
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText={field.placeholder}
        selected={field.value ? new Date(field.value) : null}
        autoComplete="off"
        {...props}
        {...datePickerOptions}
      />
    </FieldWrapper>
  );
};

export default DatePickerField;
