import TextField from './TextField';
import { validateEmail } from '../lib/validators';

const EmailField = ({ validators = [], ...props }) => {
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
