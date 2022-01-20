/* eslint-disable react/no-unused-prop-types */
import classNames from 'classnames';

import useField, { FieldHookProps } from '../hooks/useField';
import { SelectFieldOptions } from './SelectField';

interface ChoicesFieldProps extends FieldHookProps {
  multiple?: boolean;
  options: SelectFieldOptions;
  choiceClassName?: string;
  choiceContainerClassName?: string;
  labelClassName?: string;
}

const ChoicesField = (props: ChoicesFieldProps) => {
  const field = useField(props);
  const {
    choiceClassName = 'col-md-6 col-lg-4',
    choiceContainerClassName,
    labelClassName,
  } = props;

  const mappableValue =
    typeof field.value === 'string' ? [field.value] : field.value;
  const { className, hideLabel } = props;
  return (
    <div
      className={classNames('field-container', className, {
        'is-invalid': !!field.error,
        'field-container--half': field.half,
        'field-container--third': field.third,
        disabled: field.disabled,
        required: field.required,
      })}
    >
      <label
        className={classNames('', className, {
          'text-red-600': !!field.error,
          'sr-only': hideLabel,
        })}
      >
        {field.label}
      </label>

      <div className={classNames(`row ${choiceContainerClassName}`, className)}>
        {Object.entries(field.options).map(([value, display]) => (
          <div
            className={classNames(`m-1 ${choiceClassName}`, className)}
            key={value}
          >
            <label
              htmlFor={`${field.name}-${value}`}
              className={classNames(' ml-3', labelClassName)}
            >
              <div>{display}</div>
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
