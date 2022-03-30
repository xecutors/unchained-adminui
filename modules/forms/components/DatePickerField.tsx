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
          'relative mt-3 block w-full appearance-none rounded-md rounded-b-md border-2 shadow-sm border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-400 focus:outline-none focus:ring-indigo-400',
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
