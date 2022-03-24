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
  disabled,
  required,
  name,
  label,
  hideLabel,
  labelClassName,
}: FieldWrapperProps) => {
  return (
    <div
      className={classnames(
        'container',
        {
          'is-invalid': !!error,
          disabled,
          required,
        },
        className,
      )}
    >
      <label
        aria-label={label}
        htmlFor={name}
        className={classnames(
          'block text-left text-sm font-medium text-gray-700',
          {
            'text-red-500': !!error,
            'sr-only': hideLabel,
          },
          labelClassName,
        )}
      >
        {error || label}
      </label>
      {children}
    </div>
  );
};

export default FieldWrapper;
