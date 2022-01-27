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
  onClose: close,
  children,
  visible,
  closeOnOutsideClick = false,
}) => {
  const { formatMessage } = useIntl();
  const onOverlayClick = () => {
    if (closeOnOutsideClick && visible) close();
  };

  const stopEventPropagation = (e) => {
    e.stopPropagation();
  };

  return visible ? (
    <ModalInner>
      <div className="fixed z-10 inset-0 overflow-y-auto" role="button">
        <div
          className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
          tabIndex={-1}
          role="button"
        >
          <div
            onClick={onOverlayClick}
            onKeyUp={onOverlayClick}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          />
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block  bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            onClick={stopEventPropagation}
            onKeyUp={stopEventPropagation}
          >
            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                onClick={close}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">
                  {formatMessage({ id: 'close', defaultMessage: 'Close' })}
                </span>

                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {React.cloneElement(children, { close })}
          </div>
        </div>
      </div>
    </ModalInner>
  ) : null;
};

export default injectIntl(Modal);
