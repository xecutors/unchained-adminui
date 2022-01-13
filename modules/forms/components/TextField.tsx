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
          'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
          {
            'text-red-400': !!field.error,
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
