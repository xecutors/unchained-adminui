const formatUsername = (user) => {
  if (!user) return null;
  if (user?.username) return user.username;
  if (user?.profile?.displayName) return user?.profile?.displayName;
  if (user?.profile?.firstName || user?.profile?.lastName)
    return `${user?.profile?.firstName} ${user?.profile?.lastName}`;
  if (user?.name) return user.name;

  return null;
};

export default formatUsername;
