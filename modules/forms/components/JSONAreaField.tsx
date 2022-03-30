import classnames from 'classnames';
import useField, { FieldHookProps } from '../hooks/useField';
import FieldWrapper from './FieldWrapper';

interface JSONAreaProps extends FieldHookProps {
  rows?: number;
}

const JSONAreaField = ({
  validators = [],
  rows = 10,
  ...props
}: JSONAreaProps) => {
  const field = useField({
    ...props,
    validators: [
      ...validators,
      {
        isValid: (v) => {
          try {
            JSON.parse(v);
            return true;
          } catch (err) {
            return false;
          }
        },
        intlMessageDescriptor: {
          id: 'invalid_json_input',
          defaultMessage: 'Invalid JSON input',
        },
      },
    ],
  });

  const handleOnChange = (e) => {
    try {
      JSON.parse(e.target.value || '{}');
      field.setError('');
    } catch (err) {
      field.setError(err.message);
    } finally {
      field.setValue(e.target.value, true);
      field.setTouched(true);
    }
  };

  const handleOnBlur = (e) => {
    try {
      field.setValue(
        JSON.stringify(JSON.parse(e.target.value), undefined, 2),
        true,
      );
      field.setError('');
    } catch (err) {
      field.setError(err.message);
    }
  };

  return (
    <FieldWrapper {...field}>
      <>
        <textarea
          className={classnames(
            'mt-1 block w-full max-w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm',
            {
              'border-red-300 text-red-600 focus:border-red-600 focus:ring-red-600':
                !!field.error,
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
          rows={Math.max(field.value?.split(' ')?.length / 2, rows)}
        />
      </>
    </FieldWrapper>
  );
};

export default JSONAreaField;
