function FilterSummary({ filterKey, filterType }) {
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
    </div>
  );
}

export default FilterSummary;
