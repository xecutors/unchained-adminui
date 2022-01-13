import DateField from './DateField';
import { validateDateBefore, validateDateAfter } from '../lib/validators';

const BirthdayField = ({ validators = [], name, ...props }) => {
  return (
    <DateField
      {...{
        name: name || 'birthday',
        validators: [
          ...validators,
          validateDateBefore(new Date()),
          validateDateAfter(new Date(1900, 0, 1)),
        ],
        ...props,
      }}
    />
  );
};

export default BirthdayField;
