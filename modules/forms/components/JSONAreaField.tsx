import classnames from 'classnames';

import { useState } from 'react';
import { validateMaxLength } from '../lib/validators';
import useField, { FieldHookProps } from '../hooks/useField';
import FieldWrapper from './FieldWrapper';

interface TextAreaFieldProps extends FieldHookProps {
  autoComplete?: 'on' | 'off';
  rows?: number;
}

const TextAreaField = ({
  validators = [],

  rows = 5,
  ...props
}: TextAreaFieldProps) => {
  const [error, setError] = useState('');
  const field = useField({
    validators: [
      ...validators,
      {
        isValid: (v) => {
          try {
            JSON.parse(v);
            return true;
          } catch (erro) {
            return erro.message;
          }
        },
        intlMessageDescriptor: { id: 'about' },
      },
    ],
    ...props,
  });

  const handleOnChange = (e) => {
    try {
      field.setValue(JSON.stringify(JSON.parse(e.target.value || '{}')));
      // JSON.parse(event.target.value);
      setError('');
    //   console.log(e.target.value);
    } catch (err) {
      // setError(err);
    //   console.log(err);
      setError(err);
    } finally {
      field.setValue(e.target.value);
    }
  };

  const handleOnBlur = (e) => {
    try {
      field.setValue(JSON.stringify(JSON.parse(e.target.value), undefined, 2));
    //   console.log('try, onblur');
      // setError('');
    } catch (err) {
      // field.setValuesetError(err);
    //   console.log('catch, onblur', err);
    }
  };

  return (
    <FieldWrapper {...field}>
      <textarea
        className={classnames(
          'mt-1 max-w-full shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md',
          {
            'text-red-600 border-red-300': !!field.error,
          },
        )}
        disabled={field.disabled}
        id={field.name}
        name={field.name}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        value={field.value}
        rows={rows}
      />
      <p>{field.error}</p>
    </FieldWrapper>
  );
};

export default TextAreaField;
