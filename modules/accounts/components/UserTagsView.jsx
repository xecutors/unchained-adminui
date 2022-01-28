import { useState } from 'react';
import { useIntl } from 'react-intl';
import userSetUserTags from '../hooks/useSetUserTags';
import Button from '../../common/components/Button';
import TagInput from '../../common/components/TagInput';

const UserTagsView = ({ tags = [], userId }) => {
  const { formatMessage } = useIntl();
  const { setUserTags } = userSetUserTags();
  const [tagList, setTagList] = useState([...(tags || [])]);

  // const tagsUpdatedMessage = formatMessage({
  //   id: 'tags_updated',
  //   defaultMessage: 'Tags updated successfully!',
  // });
  const updateUserTags = async () => {
    await setUserTags({ tags: tagList, userId });
  };

  return (
    <div>
      <div className="pb-3 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {formatMessage({ id: 'tags', defaultMessage: 'Tags' })}
        </h3>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Button
            onClick={updateUserTags}
            text={formatMessage({
              id: 'update_tags',
              defaultMessage: 'Update tags',
            })}
          />
        </div>
      </div>
      <div className="max-w-md">
        <TagInput onChange={(values) => setTagList(values)} />
      </div>
    </div>
  );
};

export default UserTagsView;
