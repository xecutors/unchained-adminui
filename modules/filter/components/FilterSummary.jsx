function FilterSummary({ filterKey, filterType }) {
  return (
    <div className="space-y-2 lg:flex lg:space-y-0 lg:space-x-3">
      <div className="flex items-center space-x-1">
        <div className="text-sm">Key :</div>
        <div className="rounded-md bg-indigo-100 py-1 px-2 text-sm">
          {filterKey}
        </div>
      </div>
      <div className="flex items-center space-x-1">
        <div className="text-sm">Filter Type :</div>
        <div className="rounded-md bg-indigo-100 py-1 px-2 text-sm">
          {filterType}
        </div>
      </div>
    </div>
  );
}

export default FilterSummary;
