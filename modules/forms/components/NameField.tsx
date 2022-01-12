import TextField, { TextFieldProps } from './TextField';
import { validateName } from '../lib/validators';

const NameField = ({ validators = [], ...props }: TextFieldProps) => {
  return (
    <TextField
      {...{
        autoComplete: 'on',
        type: 'text',
        validators: [...validators, validateName],
        maxLength: 30,
        ...props,
      }}
    />
  );
};

export default NameField;
