import classnames from 'classnames';

import { validateMaxLength } from '../lib/validators';
import useField, { FieldHookProps } from '../hooks/useField';
import FieldWrapper from './FieldWrapper';

export interface TextFieldProps extends FieldHookProps {
  autoComplete?: 'on' | 'off';
  type?: 'text' | 'email' | 'password';
  maxLength?: number;
}

const TextField = ({
  maxLength,
  validators = [],
  ...props
}: TextFieldProps) => {
  const field = useField({
    validators: [...validators, maxLength && validateMaxLength(maxLength)],
    ...props,
  });

  return (
    <FieldWrapper {...field}>
      <input
        className={classnames(
          'relative mt-1 block w-full appearance-none rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500',
          props.className,
          {
            'border-red-300': !!field.error,
          },
        )}
        disabled={field.disabled}
        id={field.name}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        type={field.type}
        value={field.value}
      />
    </FieldWrapper>
  );
};

export default TextField;
