function FilterSummary({ filterKey, filterType, createdAt, updatedAt }) {
  return (
    <div className="space-y-2 lg:space-y-0 lg:flex lg:space-x-3">
      <div className="flex space-x-1 items-center">
        <div className="text-sm">Key :</div>
        <div className="bg-indigo-100 text-sm py-1 px-2 rounded-md">
          {filterKey}
        </div>
      </div>
      <div className="flex space-x-1 items-center">
        <div className="text-sm">Filter Type :</div>
        <div className="bg-indigo-100 text-sm py-1 px-2 rounded-md">
          {filterType}
        </div>
      </div>
      {/* <div className="flex space-x-1 items-center">
            <div className="text-sm">Created :</div>
            <div className="bg-indigo-100 text-sm py-1 px-2 rounded-md">{createdAt}</div>
        </div>
        <div className="flex space-x-1 items-center">
            <div className="text-sm">Updated :</div>
            <div className="bg-indigo-100 text-sm py-1 px-2 rounded-md">{updatedAt}</div>
        </div> */}
    </div>
  );
}

export default FilterSummary;
