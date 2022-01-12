import TextField from './TextField';
import { validateContactNumber } from '../lib/validators';

const ContactNumberField = function ({ validators = [], ...props }) {
  return (
    <TextField
      {...{
        autoComplete: 'off',
        name: 'contactNumber',
        validators: [...validators, validateContactNumber],
        ...props,
      }}
    />
  );
};

export default ContactNumberField;
