import useSetUserTags from '../hooks/useSetUserTags';
import TagList from '../../common/components/TagList';
import ACTION_ROLES from '../../common/data/roles';
import useAuth from '../../Auth/useAuth';

const UserTagsView = ({ tags: defaultTags = [], userId }) => {
  const { hasRole } = useAuth();
  const { setUserTags } = useSetUserTags();
  const updateUserTags = async ({ tags }) => {
    await setUserTags({ tags, userId });
  };

  return (
    <TagList
      defaultValue={defaultTags}
      onSubmit={updateUserTags}
      enableEdit={hasRole(ACTION_ROLES.users.updateTags)}
    />
  );
};

export default UserTagsView;
