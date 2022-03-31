import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  preventDefault,
  stopPropagation,
  stopPropagationAndPreventDefault,
} from '../data/miscellaneous';
import Badge from './Badge';
import Button from './Button';

const TagInput = ({
  tagList: tags,
  onChange,
  buttonText = '',
  disabled = false,
  name = 'tag-input',
  id = 'tag-input',
  className: classes,
  placeholder,
}) => {
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
    <div className="mt-1 flow-root">
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
        <div className="flex h-10 max-w-full gap-2 rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <input
              type="text"
              id={id || name}
              name={name}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  addTag();
                }
                stopPropagationAndPreventDefault(e);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  preventDefault(e);
                }
                stopPropagation(e);
              }}
              onChange={(e) => setNewTag(e.target.value)}
              className={classNames(
                'block w-full rounded-md border-2 border-gray-200 py-5 px-4 shadow-sm placeholder:text-slate-400 focus:border-indigo-400 focus:ring-1 focus:ring-0 focus:ring-indigo-400 sm:text-sm',
                classes,
              )}
              placeholder={
                placeholder ||
                formatMessage({
                  id: 'search_tag',
                  defaultMessage: 'Search tag',
                })
              }
              value={newTag}
              disabled={disabled}
              autoComplete="off"
            />
          </div>

          <Button
            onClick={addTag}
            text={
              buttonText ||
              formatMessage({
                id: 'add',
                defaultMessage: 'Add tag',
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TagInput;
