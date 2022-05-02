import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import Badge from './Badge';

const MultipleSelect = ({ tagList: tags, onChange, options, label }) => {
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
    <div className="mt-2 flex-col sm:mt-0">
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
        <div className="mt-1 flex max-w-full rounded-md shadow-sm dark:text-white">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <select
              id="tag-input"
              placeholder={label}
              className="mt-1 block w-full rounded-md dark:bg-slate-600 border-slate-300 py-2 pl-3 text-base focus:border-indigo-400 focus:outline-none focus:ring-indigo-400 sm:text-sm"
              onChange={(e) => addTag(e.target.value)}
            >
              <option value="">
                {formatMessage({
                  id: 'work_type',
                  defaultMessage: 'Work type',
                })}
              </option>
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="dark:text-white"
                >
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
