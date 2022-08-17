const normalize = (assortment = [], isActive = false) =>
  assortment.map(
    ({ _id, created, slug, title, updated, authorId, locale }) => ({
      _id,
      authorId,
      status: isActive ? 'ACTIVE' : 'DELETED',
      isActive,
      texts: {
        title,
        slug,
        locale,
      },
      created,
      updated,
    }),
  );

const normalizeAssortmentSyncData = ({ published = [], removed = [] } = {}) => {
  return {
    published: normalize(published, true),
    removed: normalize(removed, false),
  };
};

export default normalizeAssortmentSyncData;
