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
    onChange(e) {
      try {
        field.setValue(JSON.stringify(JSON.parse(e.target.value || '{}')));
      } catch (err) {
        console.error(err);
        field.error = err.message;
      } finally {
        field.setValue(e.target.value);
      }
    },

    onBlur(e) {
      console.log('asdasdasdasdasdasdasd');
      // try {
      //   field.setValue(JSON.stringify(JSON.parse(e.target.value || '{}')));
      // } catch (err) {
      //   console.error('onblur', err);
      // }
    },
    ...props,
  });

  const handleChange = (e) => {
    try {
      // JSON.parse(event.target.value);
      // setError('');
      console.log(e.target.value);
    } catch (err) {
      // setError(err);
      console.log(err);
    } finally {
      // field.setValue(event.target.value);
    }
  };

  const handleOnBlur = (e) => {
    try {
      field.setValue(JSON.stringify(JSON.parse(e.target.value), undefined, 2));
      console.log('try, onblur');
      // setError('');
    } catch (err) {
      // field.setValuesetError(err);
      console.log('catch, onblur', err);
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
        onChange={field.onChange}
        onBlur={handleOnBlur}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        value={field.value}
        rows={rows}
      />
      {console.log('field', field)}
    </FieldWrapper>
  );
};

export default TextAreaField;
