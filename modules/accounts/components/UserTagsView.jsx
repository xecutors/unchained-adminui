import { useState } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import userSetUserTags from '../hooks/useSetUserTags';
import Button from '../../common/components/Button';
import TagInput from '../../common/components/TagInput';

const UserTagsView = ({ tags = [], userId }) => {
  const { formatMessage } = useIntl();
  const { setUserTags } = userSetUserTags();
  const [tagList, setTagList] = useState([...(tags || [])]);

  const tagsUpdatedMessage = formatMessage({
    id: 'tags_updated',
    defaultMessage: 'Tags updated successfully!',
  });
  const updateUserTags = async () => {
    await setUserTags({ tags: tagList, userId });
    toast.success(tagsUpdatedMessage);
  };

  return (
    <div>
      <Button
        onClick={updateUserTags}
        text={formatMessage({
          id: 'update_tags',
          defaultMessage: 'Update tags',
        })}
      />
      <div className="max-w-md">
        <TagInput onChange={(values) => setTagList(values)} />
      </div>
    </div>
  );
};

export default UserTagsView;
