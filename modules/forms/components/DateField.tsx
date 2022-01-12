import classnames from 'classnames';
import { useRef } from 'react';

import useField, { FieldHookProps } from '../hooks/useField';
import { validateDateInput } from '../lib/validators';
import FieldWrapper from './FieldWrapper';

const clean = (val) =>
  val.replace(/\.\.|:|_|`|,|-/g, '.').replace(/[^\d.]/g, '');

const DateField = function ({ validators = [], ...props }: FieldHookProps) {
  const ref: any = useRef();

  const field = useField({
    validators: [validateDateInput, ...validators],
    ...props,
  });

  const handleChange = (event) => {
    const { selectionStart, selectionEnd } = ref.current;
    const cleaned = clean(event.target.value);
    field.setValue(cleaned);

    setTimeout(() => {
      ref.current.setSelectionRange(selectionStart, selectionEnd);
    }, 1);
  };

  return (
    <FieldWrapper {...field}>
      <input
        className={classnames('form-field', {
          'form-field--error': !!field.error,
        })}
        disabled={field.disabled}
        id={field.name}
        name={field.name}
        onChange={handleChange}
        onBlur={field.onBlur}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        type={field.type}
        value={field.value}
        ref={ref}
      />
    </FieldWrapper>
  );
};

export default DateField;
