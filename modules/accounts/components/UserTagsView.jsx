import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import useSetUserTags from '../hooks/useSetUserTags';
import TagList from '../../common/components/TagList';

const UserTagsView = ({ tags: defaultTags = [], userId }) => {
  const { formatMessage } = useIntl();
  const { setUserTags } = useSetUserTags();

  const tagsUpdatedMessage = formatMessage({
    id: 'tags_updated',
    defaultMessage: 'Tags updated successfully!',
  });
  const updateUserTags = async ({ tags }) => {
    await setUserTags({ tags, userId });
    toast.success(tagsUpdatedMessage);
  };

  return <TagList defaultValue={defaultTags} onSubmit={updateUserTags} />;
};

export default UserTagsView;
