import { CheckIcon } from '@heroicons/react/outline';

const AlertMessage = ({ onOkClick, buttonText, headerText, message, icon }) => {
  return (
    <>
      <div>
        {icon || (
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckIcon
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            />
          </div>
        )}

        <div className="mt-3 text-center sm:mt-5">
          <h3
            className="text-lg font-medium leading-6 text-slate-900 dark:text-slate-200"
            id="modal-title"
          >
            {headerText}
          </h3>
          <div className="mt-2">
            <p className="text-sm text-slate-500 dark:text-slate-200">
              {message}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          onClick={onOkClick}
          id="alert_modal"
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 sm:text-sm"
        >
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default AlertMessage;
