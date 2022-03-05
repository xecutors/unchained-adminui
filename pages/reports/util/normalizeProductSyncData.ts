const normalize = (products = [], productStatus) =>
  products.map(
    ({
      productId: _id,
      created,
      slug,
      title,
      updated,
      authorId,
      locale,
      description,
    }) => ({
      _id,
      authorId,
      status: !productStatus ? 'DRAFT' : productStatus,
      texts: {
        title,
        slug,
        locale,
        description,
      },
      created,
      updated,
    }),
  );

const normalizeProductSyncData = ({
  published = [],
  removed = [],
  draft = [],
} = {}) => {
  return {
    published: normalize(published, 'ACTIVE'),
    removed: normalize(removed, 'DELETED'),
    draft: normalize(draft, null),
  };
};

export default normalizeProductSyncData;
