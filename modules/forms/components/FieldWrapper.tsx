/* eslint-disable no-undef */
import classnames from 'classnames';

import { ComputedProps } from '../hooks/useField';

interface FieldWrapperProps extends ComputedProps {
  children: JSX.Element;
}

const FieldWrapper = function ({
  children,
  className,
  error,
  half,
  third,
  disabled,
  required,
  name,
  label,
}: FieldWrapperProps) {
  return (
    <div
      className={classnames(className, 'field-container', {
        'is-invalid': !!error,
        'field-container--half': half,
        'field-container--third': third,
        disabled,
        required,
      })}
    >
      <label
        aria-label={label}
        htmlFor={name}
        className={classnames('form-label', {
          'text-danger': !!error,
        })}
      >
        {error || label}
      </label>
      {children}
    </div>
  );
};

export default FieldWrapper;
