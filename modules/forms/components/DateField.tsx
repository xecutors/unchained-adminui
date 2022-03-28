import classnames from 'classnames';
import { useRef } from 'react';

import useField, { FieldHookProps } from '../hooks/useField';
import { validateDateInput } from '../lib/validators';
import FieldWrapper from './FieldWrapper';

const clean = (val) =>
  val.replace(/\.\.|:|_|`|,|-/g, '.').replace(/[^\d.]/g, '');

const DateField = ({ validators = [], ...props }: FieldHookProps) => {
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
        className={classnames(
          'mt-3 block w-full appearance-none rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500',
          props.className,
          {
            'border-red-300': !!field.error,
          },
        )}
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
