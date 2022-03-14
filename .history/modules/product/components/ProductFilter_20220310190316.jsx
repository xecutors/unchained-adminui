import { useState } from 'react';
import FilterWrapper from '../../common/components/FilterWrapper';
import SearchField from '../../common/components/SearchField';
import TagInput from '../../common/components/TagInput';

const ProductFilter = ({ onFilter }) => {
  const [queryString, setQueryString] = useState('');
  const [tags, setTags] = useState([]);

  const onApplyFilter = () => {
    onFilter({ queryString, tags });
  };
  return (
    <FilterWrapper
      className="bg-white shadow my-2 px-6 py-3"
      onApplyFilter={onApplyFilter}
    >
      <div className="grid grid-cols-6 gap-6 mb-5">
        <div className="col-span-6 sm:col-span-3">
          <SearchField onInputChange={(v) => setQueryString(v)} />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <TagInput
            onChange={(value) => {
              setTags(value);
            }}
          />
        </div>
      </div>
    </FilterWrapper>
  );
};

export default ProductFilter;
