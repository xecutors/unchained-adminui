import { useQuery, gql } from '@apollo/client';
import AssortmentFragment from '../fragments/AssortmentFragment';

const AssortmentPathsQuery = gql`
  query AssortmentPaths($assortmentId: ID, $slug: String) {
    assortment(assortmentId: $assortmentId, slug: $slug) {
      _id
      childrenCount
      linkedAssortments {
        _id
        parent {
          _id
        }
      }
      children {
        ...AssortmentFragment
        linkedAssortments {
          _id
          parent {
            _id
          }
        }
        children {
          ...AssortmentFragment
          linkedAssortments {
            _id
            parent {
              _id
            }
          }
          children {
            ...AssortmentFragment
            linkedAssortments {
              _id
              parent {
                _id
              }
            }
            children {
              ...AssortmentFragment
              linkedAssortments {
                _id
                parent {
                  _id
                }
              }
              children {
                ...AssortmentFragment
                linkedAssortments {
                  _id
                  parent {
                    _id
                  }
                }
                children {
                  ...AssortmentFragment
                  linkedAssortments {
                    _id
                    parent {
                      _id
                    }
                  }
                  children {
                    ...AssortmentFragment
                    linkedAssortments {
                      _id
                      parent {
                        _id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${AssortmentFragment}
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

  return { assortment, loading, error };
};

export default useAssortmentPaths;
