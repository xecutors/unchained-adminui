import TextField from './TextField';
import { validatePostalCode } from '../lib/validators';

const PostalCodeField = ({ validators = [], ...props }) => {
  return (
    <TextField
      {...{
        autoComplete: 'on',
        type: 'text',
        name: 'postalCode',
        validators: [...validators, validatePostalCode],
        maxLength: 4,
        ...props,
      }}
    />
  );
};

export default PostalCodeField;
