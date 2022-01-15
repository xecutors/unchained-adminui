import { useState } from 'react';
import Icon from '../../common/components/Icon';

import TextField from './TextField';

const PasswordField = ({ autoComplete = 'on', ...props }: any) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePassword = (event) => {
    event.preventDefault();
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative">
      <TextField
        {...{
          autoComplete: autoComplete || 'on',
          name: 'password',
          type: isPasswordVisible ? 'text' : 'password',
          ...props,
        }}
      />
      <span
        role="button"
        tabIndex={-1}
        aria-label="toggle password visibility"
        className="hide-show"
        onClick={togglePassword}
        onKeyUp={togglePassword}
      />
      {isPasswordVisible ? (
        <Icon icon="view-off" className="password-eye" />
      ) : (
        <Icon icon="view-1" className="password-eye" />
      )}
    </div>
  );
};

export default PasswordField;
