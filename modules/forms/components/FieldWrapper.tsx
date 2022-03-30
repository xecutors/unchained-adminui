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
  const handleToolTip = setToolTip(toolTipMessage);
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
        )}
      </span>
      {children}
    </div>
  );
};

export default FieldWrapper;
