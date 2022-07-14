import React from 'react';
import { injectIntl, useIntl } from 'react-intl';
import ReactDOM from 'react-dom';
import { stopPropagation } from '../../common/data/miscellaneous';

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

  return visible ? (
    <ModalInner>
      <div className="fixed inset-0 z-10 overflow-y-auto" role="button">
        <div
          className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
          tabIndex={-1}
          role="button"
        >
          <div
            onClick={onOverlayClick}
            onKeyUp={onOverlayClick}
            className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          />
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block transform overflow-hidden rounded-lg bg-white dark:bg-slate-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
            onClick={stopPropagation}
            onKeyUp={stopPropagation}
          >
            <div className="absolute top-0 right-0 pt-4 pr-4 sm:block">
              <button
                type="button"
                onClick={close}
                className="rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
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
