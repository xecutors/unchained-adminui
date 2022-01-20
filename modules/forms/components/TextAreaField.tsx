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
  rows = 5,
  ...props
}: TextAreaFieldProps) => {
  const field = useField({
    validators: [...validators, maxLength && validateMaxLength(maxLength)],
    ...props,
  });

  return (
    <FieldWrapper {...field}>
      <textarea
        className={classnames('form-field p-1', {
          'text-red-600 border-red-600': !!field.error,
        })}
        disabled={field.disabled}
        id={field.name}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        value={field.value}
        rows={rows}
      />
    </FieldWrapper>
  );
};

export default TextAreaField;
