import classnames from 'classnames';

import useField from '../hooks/useField';

const CheckboxField = (props) => {
  const { disabled } = props;
  const field = useField(props);

  return (
    <div
      className={classnames('field-container', {
        'is-invalid': !!field.error,
        'field-container--half': field.half,
        'field-container--third': field.third,
        'form-check': true,
        checkbox: true,
        disabled: field.disabled,
        required: field.required,
      })}
    >
      <input
        checked={!!field.value}
        disabled={disabled}
        id={field.name}
        name={field.name}
        onChange={field.onChange}
        type="checkbox"
        className="form-check-input"
      />
      <label
        htmlFor={field.name}
        className={classnames('form-check-label', {
          'text-danger': !!field.error,
        })}
      >
        {field.label}
      </label>
    </div>
  );
};

export default CheckboxField;
