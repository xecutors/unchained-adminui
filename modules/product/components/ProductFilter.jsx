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
      className="bg-white shadow my-2 p-6 "
      onApplyFilter={onApplyFilter}
    >
      <div className="lg:flex">
        <div className="flex-1 ml-2 mt-2">
          <SearchField onInputChange={(v) => setQueryString(v)} />
        </div>

        <div className="flex-1 ml-2">
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
