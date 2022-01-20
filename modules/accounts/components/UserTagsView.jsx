import { useState } from 'react';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import userSetUserTags from '../hooks/useSetUserTags';

const UserTagsView = ({ tags = [], userId }) => {
  const { formatMessage } = useIntl();
  const { setUserTags } = userSetUserTags();
  const [tagList, setTagList] = useState([...(tags || [])]);
  const [newTag, setNewTag] = useState('');

  const updateUserTags = async () => {
    await setUserTags({ tags: tagList, userId });
  };

  const onRemoveTag = (tag) => {
    const index = tagList.indexOf(tag);
    if (index !== -1) {
      const newTags = [...tagList];
      newTags.splice(index, 1);
      setTagList(newTags);
    }
  };

  const addTag = () => {
    if (!tagList.includes(newTag)) {
      setTagList([...tagList, newTag]);
      setNewTag('');
    }
  };

  return (
    <div>
      <div className="pb-3 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {formatMessage({ id: 'tags', defaultMessage: 'Tags' })}
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={updateUserTags}
            className=" inline-flex items-center px-4 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {formatMessage({
              id: 'update_tags',
              defaultMessage: 'Update tags',
            })}
          </button>
        </div>
      </div>

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
            <button
              type="button"
              onClick={addTag}
              className=" -ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-indigo-500 text-sm font-medium rounded-r-md bg-indigo-500 text-white bg-white-300 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <span>{formatMessage({ id: 'add', defaultMessage: 'Add' })}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTagsView;
