import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Badge from './Badge';
import Button from './Button';

const TagInput = ({ tagList: tags, onChange }) => {
  const { formatMessage } = useIntl();
  const [tagList, setTagList] = useState([...(tags || [])]);

  const [newTag, setNewTag] = useState('');

  const onRemoveTag = (tag) => {
    const index = tagList.indexOf(tag);
    if (index !== -1) {
      const newTags = [...tagList];
      newTags.splice(index, 1);
      setTagList(newTags);
    }
  };

  const addTag = () => {
    if (!tagList.includes(newTag) && newTag) {
      setTagList([...tagList, newTag]);
      setNewTag('');
    }
  };

  useEffect(() => {
    onChange(tagList);
  }, [tagList]);

  return (
    <div className="flow-root mt-6">
      {tagList.map((tag) => (
        <Badge
          key={tag}
          text={tag}
          color="indigo"
          onClick={() => onRemoveTag(tag)}
          className="ml-2 mb-2"
        />
      ))}
      <div>
        <div className="mt-1 h-9 max-w-md flex rounded-md shadow-sm">
          <div className="relative flex items-stretch flex-grow focus-within:z-10">
            <input
              type="text"
              id="tag-input"
              onKeyUp={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter') {
                  addTag();
                }
              }}
              onChange={(e) => setNewTag(e.target.value)}
              className="focus:ring-0 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-2 sm:text-sm border-gray-l-white border-gray-300"
              placeholder="New tag"
              value={newTag}
            />
          </div>

          <Button
            onClick={addTag}
            text={formatMessage({
              id: 'add',
              defaultMessage: 'Add',
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default TagInput;
