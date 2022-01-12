import { useState } from 'react';

import TextField from './TextField';

const PasswordField = ({ autoComplete = 'on', ...props }: any) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePassword = (event) => {
    event.preventDefault();
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="position-relative">
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
    </div>
  );
};

export default PasswordField;
