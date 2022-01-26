import React from 'react';
import { injectIntl, useIntl } from 'react-intl';
import ReactDOM from 'react-dom';

class ModalInner extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    const { el, props } = this;
    return ReactDOM.createPortal(props.children, el);
  }
}

const Modal = ({
  onClose,
  children,
  visible,
  disableOkButton = false,
  closeOnOutsideClick = false,
}) => {
  const { formatMessage } = useIntl();
  const onOverlayClick = () => {
    if (closeOnOutsideClick && visible) onClose();
  };

  const stopEventPropagation = (e) => {
    e.stopPropagation();
  };

  return visible ? (
    <ModalInner>
      <div
        className="popup-overlay"
        onClick={onOverlayClick}
        onKeyUp={onOverlayClick}
        tabIndex={-1}
        role="button"
      >
        <div
          className="popup box-shadow"
          onClick={stopEventPropagation}
          onKeyUp={stopEventPropagation}
          tabIndex={-1}
          role="button"
        >
          <button
            className="no-button popup-close"
            type="button"
            aria-label={formatMessage({
              id: 'close',
              defaultMessage: 'Close',
            })}
            onClick={onClose}
          >
            <span className="ml-3 hide-on-not-mobile">
              {formatMessage({ id: 'close', defaultMessage: 'Close' })}
            </span>
          </button>
          <div>{children}</div>
          {!disableOkButton && (
            <button
              className="button button--primary mt-4"
              aria-label="Ok"
              type="button"
              onClick={onClose}
            >
              Ok
            </button>
          )}
        </div>
      </div>
    </ModalInner>
  ) : null;
};

export default injectIntl(Modal);
