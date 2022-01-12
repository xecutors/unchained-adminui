import TextField, { TextFieldProps } from './TextField';
import { validatePhoneNumber } from '../lib/validators';

const PhoneNumberField = ({ validators = [], ...props }: TextFieldProps) => {
  return (
    <TextField
      {...{
        autoComplete: 'on',
        type: 'text',
        validators: [...validators, validatePhoneNumber],
        maxLength: 30,
        ...props,
      }}
    />
  );
};

export default PhoneNumberField;
