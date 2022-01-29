import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import Badge from './Badge';

const MultipleSelect = ({ tagList: tags, onChange, options }) => {
  const { formatMessage } = useIntl();
  const [tagList, setTagList] = useState([...(tags || [])]);

  const onRemoveTag = (tag) => {
    const index = tagList.indexOf(tag);
    if (index !== -1) {
      const newTags = [...tagList];
      newTags.splice(index, 1);
      setTagList(newTags);
    }
  };

  const addTag = (value) => {
    if (!tagList.includes(value) && value) {
      setTagList([...tagList, value]);
    }
  };

  useEffect(() => {
    onChange(tagList);
  }, [tagList]);

  return (
    <div className="flex-col">
      <div>
        {tagList.map((tag) => (
          <Badge
            key={tag}
            text={tag}
            color="indigo"
            onClick={() => onRemoveTag(tag)}
            className="ml-2 mb-2"
          />
        ))}
      </div>
      <div>
        <div className="mt-1 h-9 max-w-full flex rounded-md shadow-sm">
          <div className="relative flex items-stretch flex-grow focus-within:z-10">
            <select
              id="tag-input"
              placeholder="select type"
              onChange={(e) => addTag(e.target.value)}
            >
              <option>
                {formatMessage({
                  id: 'work_type',
                  defaultMessage: 'Work type',
                })}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleSelect;
