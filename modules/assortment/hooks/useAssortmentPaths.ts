import { useQuery, gql } from '@apollo/client';

const AssortmentPathsQuery = gql`
  query AssortmentPaths($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      _id
      childrenCount
      children {
        _id
        isActive
      }
      linkedAssortments {
        _id
        parent {
          _id
          texts {
            _id
            slug
            title
            subtitle
          }
        }
        child {
          _id
          linkedAssortments {
            _id
            parent {
              _id
            }
            child {
              _id
            }
          }
          texts {
            _id
            slug
            title
            subtitle
          }
        }
      }
      assortmentPaths {
        links {
          assortmentId
          assortmentTexts {
            _id
            title
            subtitle
          }
          link {
            _id
            parent {
              _id
            }
            child {
              _id
            }
          }
        }
      }
    }
  }
`;

const useAssortmentPaths = ({ assortmentId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(AssortmentPathsQuery, {
    skip: !assortmentId && !slug,
    variables: {
      assortmentId,
      slug,
    },
  });

  const assortment = data?.assortment || {};
  const linkedAssortments = assortment?.linkedAssortments || [];

  return { linkedAssortments, loading, error };
};

export default useAssortmentPaths;
