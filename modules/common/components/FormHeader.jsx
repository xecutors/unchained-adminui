const FormHeader = ({ headerText, onDelete }) => {
  return (
    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
      <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {headerText}
          </h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <button
            onClick={onDelete}
            type="button"
            className="mt-3 ml-2 mr-2  items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete Language
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
