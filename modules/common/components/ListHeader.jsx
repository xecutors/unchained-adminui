import AddButton from './AddButton';

const ListHeader = ({ addPath, children, addButtonText }) => {
  return (
    <div className="px-2 py-3">
      <div className="-ml-2 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="mt-2">
          <h3 className="text-xs leading-6 text-gray-900">{children}</h3>
        </div>
        {addPath && (
          <div className="ml-4 mt-2 flex-shrink-0">
            <AddButton path={addPath} text={addButtonText} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListHeader;
