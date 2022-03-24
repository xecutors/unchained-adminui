import classNames from 'classnames';
import { useIntl } from 'react-intl';

import useField, { CommonFieldProps } from '../hooks/useField';

const SwitchField = (props: CommonFieldProps) => {
  const intl = useIntl();
  const field = useField(props);

  const { inputClassName, labelClassName, containerClassName } = props;

  return (
    <div
      className={classNames('container', {
        'is-invalid': !!field.error,
        'form-check': true,
        disabled: field.disabled,
        required: field.required,
      })}
    >
      <div
        className={classNames(containerClassName, 'can-toggle', {
          'text-danger': field.error, // eslint-disable-line
        })}
      >
        <input
          className={classNames(inputClassName)}
          checked={!!field.value}
          disabled={field.disabled}
          id={field.name}
          name={field.name}
          onChange={field.onChange}
          type="checkbox"
        />
        <label htmlFor={field.name} className={classNames(labelClassName)}>
          <div
            className="can-toggle__switch"
            data-unchecked={intl.formatMessage({
              id: 'switch_on',
              defaultMessage: 'on',
            })}
            data-checked={intl.formatMessage({
              id: 'switch_off',
              defaultMessage: 'off',
            })}
          />
          <div className="can-toggle__label-text">{field.label}</div>
        </label>
      </div>
    </div>
  );
};

export default SwitchField;
