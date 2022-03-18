import { useQuery, gql } from '@apollo/client';

export const AssortmentMediaQuery = gql`
  query AssortmentMedia($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      _id
      media {
        _id
        tags
        texts {
          _id
          locale
          title
          subtitle
        }
        file {
          _id
          url
          name
          size
          type
        }
        sortKey
      }
    }
  }
`;

const useAssortmentMedia = ({ assortmentId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(AssortmentMediaQuery, {
    skip: !assortmentId && !slug,
    variables: {
      slug,
      assortmentId,
    },
  });

  return {
    loading,
    error,
    assortmentMedia: data?.assortment?.media || [],
  };
};

export default useAssortmentMedia;
