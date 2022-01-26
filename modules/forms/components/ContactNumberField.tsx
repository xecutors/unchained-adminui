import TextField from './TextField';
import { validatePhoneNumber } from '../lib/validators';

const ContactNumberField = ({ validators = [], ...props }) => {
  return (
    <TextField
      {...{
        autoComplete: 'off',
        name: 'contactNumber',
        validators: [...validators, validatePhoneNumber],
        ...props,
      }}
    />
  );
};

export default ContactNumberField;
