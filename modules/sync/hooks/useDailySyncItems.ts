import { useQuery } from '@apollo/client';

const useDailySyncItems = ({ workId, itemKey }) => {
  const { data, loading, error, fetchMore } = useQuery(
    gql`
      query PublicareSyncReportItems($workId: ID!) {
        publicareSyncReportItems(workId: $workId) {
          updatedProducts {
            _id
            texts {
              title
              slug
            }
          }
          removedProducts {
            _id
            texts {
              title
              slug
            }
          }
          newProducts {
            _id
            texts {
              title
              slug
            }
          }
          updatedAssortments {
            _id
            texts {
              title
              slug
            }
          }
          removedAssortments {
            _id
            texts {
              title
              slug
            }
          }
          newAssortments {
            _id
            texts {
              title
              slug
            }
          }
          updatedFilters {
            _id
            texts {
              title
            }
          }
          removedFilters {
            _id
            texts {
              title
            }
          }
          newFilters {
            _id
            texts {
              title
            }
          }
        }
      }
    `,
    {
      variables: {
        workId,
      },
    },
  );

  const items = data?.publicareSyncReportItems?.[itemKey] || [];

  return {
    loading,
    error,
    items,
  };
};

export default useDailySyncItems;
