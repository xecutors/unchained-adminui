import { useQuery, gql } from '@apollo/client';
import AssortmentChildrenFragment from '../fragments/AssortmentChildrenFragment';

const AssortmentPathQuery = gql`
  query AssortmentPaths($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      ...AssortmentChildrenFragment
      children {
        ...AssortmentChildrenFragment
        children {
          ...AssortmentChildrenFragment
          children {
            ...AssortmentChildrenFragment
            children {
              ...AssortmentChildrenFragment
              children {
                ...AssortmentChildrenFragment
                children {
                  ...AssortmentChildrenFragment
                  children {
                    ...AssortmentChildrenFragment
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${AssortmentChildrenFragment}
`;

const useAssortmentPath = ({ assortmentId = null, slug = null } = {}) => {
  const { data, loading, error } = useQuery(AssortmentPathQuery, {
    skip: !assortmentId && !slug,
    variables: {
      assortmentId,
      slug,
    },
  });

  const assortment = data?.assortment || {};

  return { assortment, loading, error };
};

export default useAssortmentPath;
