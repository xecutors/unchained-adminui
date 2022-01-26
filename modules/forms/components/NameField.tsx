import TextField, { TextFieldProps } from './TextField';

const NameField = ({ validators = [], ...props }: TextFieldProps) => {
  return (
    <TextField
      {...{
        autoComplete: 'on',
        type: 'text',
        validators: [...validators],
        maxLength: 30,
        ...props,
      }}
    />
  );
};

export default NameField;
