import classNames from 'classnames';

import useField from '../hooks/useField';

const CheckboxField = (props) => {
  const { disabled, labelClassNames, containerClassNames, inputClassNames } =
    props;
  const field = useField(props);

  return (
    <div
      className={classNames(
        'container',
        {
          'text-red-600': !!field.error,
          '': field.half,
          container: field.third,
          'form-check': true,
          checkbox: true,
          disabled: field.disabled,
          required: field.required,
        },
        containerClassNames,
      )}
    >
      <input
        checked={!!field.value}
        disabled={disabled}
        id={field.name}
        name={field.name}
        onChange={field.onChange}
        type="checkbox"
        className={
          (classNames(
            'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500',
          ),
          inputClassNames)
        }
      />
      <label
        htmlFor={field.name}
        className={classNames(
          'form-check-label ml-2 text-sm text-gray-900',
          labelClassNames,
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
