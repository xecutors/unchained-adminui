import classnames from 'classnames';

import { ComputedProps } from '../hooks/useField';

import type { JSX } from 'react';

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
          'mb-2 block text-left text-sm font-light text-slate-500 dark:text-slate-400',
          {
            'mt-1 mb-5 rounded-sm border border-red-100 dark:border-none bg-red-50 dark:bg-red-300 p-2 pl-4 text-red-400 dark:text-red-800':
              !!error,
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
