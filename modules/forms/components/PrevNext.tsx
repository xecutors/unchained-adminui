import React from 'react';

import SubmitButton from './SubmitButton';

const PrevNext = ({
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
        aria-label={intl.formatMessage({ id: backIntlId })}
        className="button button--secondary"
        type="button"
        onClick={onBack}
      >
        {intl.formatMessage({ id: backIntlId })}
      </button>
      {typeof onSubmit === 'function' ? (
        <button
          type="button"
          aria-label={intl.formatMessage({ id: nextIntlId })}
          className="next-button button button--primary"
          disabled={disabled}
          onClick={onSubmit}
        >
          {intl.formatMessage({ id: nextIntlId })}
        </button>
      ) : (
        <SubmitButton
          disabled={disabled}
          className="next-button"
          label={`before ${intl.formatMessage({ id: nextIntlId })}`}
        />
      )}
    </div>
  );
};

export default PrevNext;
