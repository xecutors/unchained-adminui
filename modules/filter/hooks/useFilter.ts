import { useQuery, gql } from '@apollo/client';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import FilterFragment from '../fragments/FilterFragment';

export const GetFilterQuery = (inlineFragment = '') => gql`
  query Filter($filterId: ID) {
    filter(filterId: $filterId) {
      ...FilterFragment
      ${inlineFragment}
      texts {
        _id
        title
        subtitle
        locale
      }
    }
  }
  ${FilterFragment}
`;

const useFilter = ({ filterId = null } = {}) => {
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetFilterQuery(customProperties?.Filter),
    {
      skip: !filterId,
      variables: { filterId },
    },
  );

  return {
    filter: data?.filter,
    loading,
    error,
  };
};

export default useFilter;
