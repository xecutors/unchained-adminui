import classNames from 'classnames';

import useField, { CommonFieldProps } from '../hooks/useField';

const CheckboxField = (props: CommonFieldProps) => {
  const {
    disabled,
    labelClassName,
    containerClassName,
    inputClassName,
    hideLabel,
    errorMessage,
    ...checkboxProps
  } = props;
  const field = useField({ ...props, type: 'checkbox' });
  return (
    <div
      className={classNames(
        'container',
        {
          'text-red-600': !!field.error,
          'form-check': true,
          checkbox: true,
          disabled: field.disabled,
          required: field.required,
        },
        containerClassName,
      )}
    >
      <input
        checked={!!field.value}
        disabled={disabled}
        id={field.name}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        type="checkbox"
        className={
          (classNames(
            'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
          ),
          inputClassName)
        }
        {...checkboxProps}
      />
      <label
        htmlFor={field.name}
        className={classNames(
          'form-check-label ml-2 text-sm text-gray-900',
          labelClassName,
          {
            'text-danger': !!field.error,
          },
        )}
      >
        {field.label}
      </label>
    </div>
  );
};

export default CheckboxField;
