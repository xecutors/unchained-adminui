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
  const { customProperties, hydrateFragment } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetFilterQuery(customProperties?.Filter),
    {
      skip: !filterId,
      variables: { filterId },
    },
  );

  const filter = data?.filter;
  const extendedData = hydrateFragment(customProperties?.Filter, filter);

  return {
    filter,
    loading,
    error,
    extendedData,
  };
};

export default useFilter;
