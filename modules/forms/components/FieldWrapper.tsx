/* eslint-disable no-undef */
import classnames from 'classnames';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';

import { ComputedProps } from '../hooks/useField';
import useToolTip from '../../tool-tip/hooks/useToolTip';

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
  toolTipMessage,
  showToolTip,
}: FieldWrapperProps) => {
  const { setToolTip } = useToolTip();
  const handleToolTip = setToolTip(toolTipMessage, { direction: 'top' });
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
<<<<<<< HEAD
      <label
        aria-label={label}
        htmlFor={name}
        className={classnames(
          'mb-1 block text-left text-sm font-medium text-slate-700 dark:text-white',
          {
            'mt-1 mb-5 rounded border border-red-100 bg-red-50 dark:bg-red-300 p-2 pl-4 text-red-400 dark:text-red-900':
              !!error,
            'sr-only': hideLabel,
          },
          labelClassName,
=======
      <span className="flex items-center gap-1">
        <label
          aria-label={label}
          htmlFor={name}
          className={classnames(
            'inline-block text-left text-sm font-medium text-gray-700',
            {
              'text-red-500': !!error,
              'sr-only': hideLabel,
            },
            labelClassName,
          )}
        >
          {error || label}
        </label>
        {showToolTip && (
          <button
            type="button"
            className="inline-block"
            onClick={handleToolTip}
            onMouseEnter={handleToolTip}
          >
            <QuestionMarkCircleIcon className="w-5 h-5" />
          </button>
>>>>>>> 30170f59 (Refactor fieldWrapper to accept tool tip)
        )}
      </span>
      {children}
    </div>
  );
};

export default FieldWrapper;
