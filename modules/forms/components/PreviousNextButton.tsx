import React from 'react';

import SubmitButton from './SubmitButton';

const PreviousNextButton = ({
  onBack,
  onSubmit,
  intl,
  disabled,
  backIntlId = 'back',
  nextIntlId = 'next',
}) => {
  return (
    <div className="prev-next">
      <button
        className="button button--secondary"
        type="button"
        aria-label={intl.formatMessage({ id: backIntlId })}
        onClick={onBack}
      >
        {intl.formatMessage({ id: backIntlId })}
      </button>
      {/* When onSubmit is provided, we are using a button.
         Otherwise it means this is inside an AutoForm */}
      {typeof onSubmit === 'function' ? (
        <button
          type="button"
          className="next-button button button--primary"
          aria-label={intl.formatMessage({ id: nextIntlId })}
          disabled={disabled}
          onClick={onSubmit}
        >
          {intl.formatMessage({ id: nextIntlId })}
        </button>
      ) : (
        <SubmitButton
          disabled={disabled}
          className="next-button button button--primary"
          label={intl.formatMessage({ id: nextIntlId })}
        />
      )}
    </div>
  );
};

export default PreviousNextButton;
