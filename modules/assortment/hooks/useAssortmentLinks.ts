import { useQuery, gql } from '@apollo/client';

export const AssortmentLinksQuery = gql`
  query AssortmentLinks($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      _id
      linkedAssortments {
        _id
        parent {
          _id
          texts {
            _id
            title
            subtitle
          }
        }
        child {
          _id
          texts {
            _id
            title
            subtitle
          }
        }
      }
    }
  }
`;

const useAssortmentLinks = ({ assortmentId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(AssortmentLinksQuery, {
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

export default useAssortmentLinks;
