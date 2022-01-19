/* eslint-disable no-undef */
import classnames from 'classnames';

import { ComputedProps } from '../hooks/useField';

interface FieldWrapperProps extends ComputedProps {
  children: JSX.Element;
}

const FieldWrapper = ({
  children,
  className,
  error,
  half,
  third,
  disabled,
  required,
  name,
  label,
  hideLabel,
}: FieldWrapperProps) => {
  return (
    <div
      className={classnames(className, {
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
        className={classnames('', {
          'text-red-600': !!error,
          'sr-only': hideLabel,
        })}
      >
        {error || label}
      </label>
      {children}
    </div>
  );
};

export default FieldWrapper;
