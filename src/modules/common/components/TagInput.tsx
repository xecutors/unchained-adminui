import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import Badge from './Badge';
import Button from './Button';

const normalizeTagValue = (tags) => {
  if (tags) {
    if (Array.isArray(tags)) return tags;
    return tags
      .toString()
      ?.split(',')
      ?.map((str) => str.trim());
  }
  return [];
};
const TagInput = ({
  tagList: tags,
  onChange,
  buttonText = '',
  disabled = false,
  name = 'tag-input',
  id = 'tag-input',
  className: classes = '',
  placeholder = '',
}) => {
  const { formatMessage } = useIntl();
  const [tagList, setTagList] = useState(normalizeTagValue(tags));

  const [newTag, setNewTag] = useState('');

  const onRemoveTag = (tag) => {
    const index = tagList.indexOf(tag);
    if (index !== -1) {
      const newTags = [...tagList];
      newTags.splice(index, 1);
      onChange(newTags);
      setTagList(newTags);
    }
  };

  const addTag = () => {
    if (!tagList.includes(newTag) && newTag) {
      const newTags = [...tagList, newTag];
      setTagList(newTags);
      onChange(newTags);
      setNewTag('');
    }
  };

  useMemo(() => {
    setTagList(normalizeTagValue(tags));
  }, [tags]);

  return (
    <div className="flow-root">
      {tagList?.map((tag) => (
        <Badge
          key={tag}
          text={tag}
          color="slate"
          onClick={() => onRemoveTag(tag)}
          className="mr-2 mb-2 mt-1"
        />
      ))}
      <div>
        <div className="flex items-center h-11 max-w-full gap-2">
          <div className="relative flex grow items-stretch focus-within:z-10">
            <input
              type="text"
              id={id || name}
              name={name}
              onKeyUp={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (e.key === 'Enter') {
                  addTag();
                }
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
              onChange={(e) => setNewTag(e.target.value)}
              className={classNames(
                'block w-full rounded-md border-1 border-slate-300 dark:border-slate-700 text-slate-900 dark:bg-slate-900 dark:text-slate-200 py-2 px-4 shadow-xs placeholder:text-slate-400 dark:placeholder:text-white focus:ring-2 focus:ring-slate-800 focus:outline-hidden sm:text-sm',
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
            id="add-tag"
            onClick={addTag}
            variant="secondary"
            text={
              buttonText ||
              formatMessage({
                id: 'add_tag',
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
