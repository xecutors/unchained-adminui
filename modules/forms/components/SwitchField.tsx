import classnames from 'classnames';
import { useIntl } from 'react-intl';

import useField from '../hooks/useField';

const SwitchField = (props) => {
  const intl = useIntl();
  const field = useField(props);

  return (
    <div
      className={classnames('field-container field-container--half', {
        'is-invalid': !!field.error,
        'field-container--half': field.half,
        'field-container--third': field.third,
        'form-check': true,
        disabled: field.disabled,
        required: field.required,
      })}
    >
      <div
        className={classnames(
        props.inputClassName, // eslint-disable-line
          'can-toggle',
          {
          'text-danger': field.error, // eslint-disable-line
          },
        )}
      >
        <input
          checked={!!field.value}
          disabled={field.disabled}
          id={field.name}
          name={field.name}
          onChange={field.onChange}
          type="checkbox"
        />
        <label htmlFor={field.name}>
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
