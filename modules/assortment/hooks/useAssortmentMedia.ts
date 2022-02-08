import { useQuery, gql } from '@apollo/client';

export const AssortmentMediasQuery = gql`
  query AssortmentMedias($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      _id
      media {
        _id
        tags
        texts {
          _id
          title
          subtitle
        }
        file {
          url
          name
          size
          type
        }
      }
    }
  }
`;

const useAssortmentMedias = ({ assortmentId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(AssortmentMediasQuery, {
    variables: {
      slug,
      assortmentId,
    },
  });

  return {
    loading,
    error,
    assortments: data?.assortment,
  };
};

export default useAssortmentMedias;
