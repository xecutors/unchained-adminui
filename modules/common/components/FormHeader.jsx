const FormHeader = ({ headerText, onDelete, children }) => {
  return (
    <div className="mt-5 sm:max-w-lg">
      <div className="bg-white   px-5 shadow sm:rounded-t sm:px-15">
        <div className=" bg-white border-b border-gray-50">
          <div className=" -mt-2 mb-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className=" ">
              <h3 className="text-md mt-3 leading-6 font-medium text-gray-900">
                {headerText}
              </h3>
            </div>
            {onDelete && (
              <div className=" mt-2 mb-1 flex-shrink-0">
                <button
                  onClick={onDelete}
                  type="button"
                  className="mb-3 items-center px-2 py-2 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg
                    className="h-4 w-4 text-white-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {' '}
                    <polyline points="3 6 5 6 21 6" />{' '}
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{' '}
                    <line x1="10" y1="11" x2="10" y2="17" />{' '}
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FormHeader;
