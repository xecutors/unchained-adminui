import classnames from 'classnames';
import DatePicker from 'react-datepicker';

import useField, { FieldHookProps } from '../hooks/useField';
import { validateDate } from '../lib/validators';
import FieldWrapper from './FieldWrapper';

const defaultParseDate = (date) => {
  if (date && validateDate.isValid(date)) {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );

    return utcDate.getTime();
  }
  return '';
};

const DatePickerField = ({
  validators = [],
  parseDate = defaultParseDate,
  datePickerOptions = {},
  ...props
}: FieldHookProps) => {
  const field = useField({
    validators: [...validators, validateDate],
    ...props,
  });

  return (
    <FieldWrapper {...field}>
      <DatePicker
        disabled={field.disabled}
        id={field.id}
        name={field.name}
        className={classnames(
          'appearance-none mt-3 rounded-md relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-xs',
          props.className,
          {
            'border-red-300': !!field.error,
          },
        )}
        onChange={(date) => field.setValue(parseDate(date))}
        onMonthChange={(date) => field.setValue(parseDate(date))}
        onYearChange={(date) => field.setValue(parseDate(date))}
        dateFormat="dd.MM.yyyy"
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText={field.placeholder}
        selected={field.value ? new Date(field.value) : null}
        autoComplete="off"
        {...datePickerOptions}
      />
    </FieldWrapper>
  );
};

export default DatePickerField;
