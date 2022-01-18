import { useState } from 'react';
import { useIntl } from 'react-intl';
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
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {formatMessage({ id: 'tags', defaultMessage: 'Tags' })}
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <button
            type="button"
            onClick={updateUserTags}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
          <span
            className="inline-flex rounded-full h-8  items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700"
            key={tag}
          >
            {tag}
            <button
              onClick={() => onRemoveTag(tag)}
              type="button"
              className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
            >
              <svg
                className="h-2 w-2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 8 8"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="M1 1l6 6m0-6L1 7"
                />
              </svg>
            </button>
          </span>
        ))}
        <div>
          <div className="mt-1 flex rounded-md shadow-sm">
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
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-2 sm:text-sm border-gray-300"
                placeholder="New tag"
                value={newTag}
              />
            </div>
            <button
              type="button"
              onClick={addTag}
              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
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
