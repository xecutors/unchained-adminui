import TextField from './TextField';
import { validateEmail } from '../lib/validators';

const EmailField = function ({ validators = [], ...props }) {
  return (
    <TextField
      {...{
        autoComplete: props?.autoComplete || 'on',
        name: 'email',
        validators: [...validators, validateEmail],
        ...props,
      }}
    />
  );
};

export default EmailField;
