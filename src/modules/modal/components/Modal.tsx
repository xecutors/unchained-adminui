import React, { useEffect, useRef, useState } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import ReactDOM from 'react-dom';

interface ModalInnerProps extends WrappedComponentProps<'intl'> {
  onClose?: () => void;
  children?: React.ReactNode;
  visible?: boolean;
  closeOnOutsideClick?: boolean;
}

const ModalInner: React.FC<ModalInnerProps> = ({ children = null }) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [, setIsVisible] = useState(false);
  useEffect(() => {
    const el = document.createElement('div');
    elRef.current = el;
    document.body.appendChild(el);
    setIsVisible(true);
    return () => {
      if (elRef.current) {
        document.body.removeChild(elRef.current);
      }
    };
  }, []);

  return elRef.current ? ReactDOM.createPortal(children, elRef.current) : null;
};

const Modal = ({
  onClose: close,
  children,
  visible,
  closeOnOutsideClick = false,
  intl,
}) => {
  const onOverlayClick = () => {
    if (closeOnOutsideClick && visible) close();
  };

  return visible ? (
    <ModalInner intl={intl}>
      <div className="fixed inset-0 z-10 overflow-y-auto" aria-modal="true">
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
            onClick={(e) => {
              e.stopPropagation();
            }}
            onKeyUp={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="absolute top-0 right-0 pt-4 pr-4 sm:block">
              <button
                id="modal_close"
                type="button"
                onClick={close}
                className="rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                <span className="sr-only">
                  {intl.formatMessage({ id: 'close', defaultMessage: 'Close' })}
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

export default injectIntl(Modal as unknown as (props: ModalInnerProps) => any);
