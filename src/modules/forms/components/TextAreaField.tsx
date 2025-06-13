import classnames from 'classnames';

import { validateMaxLength } from '../lib/validators';
import useField, { FieldHookProps } from '../hooks/useField';
import FieldWrapper from './FieldWrapper';

interface TextAreaFieldProps extends FieldHookProps {
  autoComplete?: 'on' | 'off';
  rows?: number;
}

const TextAreaField = ({
  maxLength,
  validators = [],

  ...props
}: TextAreaFieldProps) => {
  const field = useField({
    validators: [...validators, maxLength && validateMaxLength(maxLength)],
    ...props,
  });

  return (
    <FieldWrapper {...field}>
      <textarea
        className={classnames(
          'relative mt-1 block w-full dark:focus:autofill dark:hover:autofill dark:autofill dark:placeholder:text-white dark:bg-slate-900 dark:text-slate-200 appearance-none rounded-md border-2 border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-xs placeholder:text-slate-400 focus:border-indigo-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-400',
          field.className,
          {
            'border-2 border-red-300 placeholder:text-red-300': !!field.error,
          },
        )}
        disabled={field.disabled}
        id={field.name}
        name={field.name}
        rows={field.rows || 10}
        onChange={field.onChange}
        onBlur={field.onBlur}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete || 'off'}
        value={field.value}
      />
    </FieldWrapper>
  );
};

export default TextAreaField;
