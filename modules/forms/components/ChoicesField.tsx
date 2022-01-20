/* eslint-disable react/no-unused-prop-types */
import classnames from 'classnames';

import useField, { FieldHookProps } from '../hooks/useField';
import { SelectFieldOptions } from './SelectField';

interface ChoicesFieldProps extends FieldHookProps {
  multiple?: boolean;
  options: SelectFieldOptions;
  choiceClassName?: string;
  choiceContainerClassName?: string;
}

const ChoicesField = (props: ChoicesFieldProps) => {
  const field = useField(props);
  const { choiceClassName = 'col-md-6 col-lg-4', choiceContainerClassName } =
    props;

  const mappableValue =
    typeof field.value === 'string' ? [field.value] : field.value;
  const { className } = props;
  return (
    <div
      className={classnames('field-container', className, {
        'is-invalid': !!field.error,
        'field-container--half': field.half,
        'field-container--third': field.third,
        disabled: field.disabled,
        required: field.required,
      })}
    >
      <label
        className={classnames('form-label', className, {
          'text-danger': !!field.error,
        })}
      >
        {field.label}
      </label>

      <div className={classnames(`row ${choiceContainerClassName}`, className)}>
        {Object.entries(field.options).map(([value, display]) => (
          <div
            className={classnames(`m-1 ${choiceClassName}`, className)}
            key={value}
          >
            <label
              htmlFor={`${field.name}-${value}`}
              className="form-check-label"
            >
              <div className="radio-and-checkbox-content text-center ml-3">
                {display}
              </div>
              <input
                value={value}
                checked={mappableValue.includes(value)}
                className="form-check-input after-check"
                disabled={field.disabled}
                id={`${field.name}-${value}`}
                name={field.name}
                onChange={field.onChange}
                type={field.multiple ? 'checkbox' : 'radio'}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChoicesField;
