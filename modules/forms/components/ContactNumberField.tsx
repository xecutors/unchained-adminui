import TextField from './TextField';
import { validatePhoneNumber } from '../lib/validators';

const ContactNumberField = ({ validators = [], value, ...props }) => {
  return (
    <TextField
      {...{
        value,
        autoComplete: 'off',
        name: 'contactNumber',
        validators: [...validators, validatePhoneNumber],
        ...props,
      }}
    />
  );
};

export default ContactNumberField;
