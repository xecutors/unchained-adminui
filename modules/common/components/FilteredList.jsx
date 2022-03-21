import React from 'react';
import FilteredListItem from './FilteredListItem';
import NoData from './NoData';

const FilteredList = ({ data, onSelected }) => {
  return (
    <>
      {data.length ? (
        data?.map((item) => (
          <FilteredListItem key={item.id} item={item} onSelected={onSelected} />
        ))
      ) : (
        <NoData message="Filtered data" />
      )}
    </>
  );
};

export default FilteredList;
