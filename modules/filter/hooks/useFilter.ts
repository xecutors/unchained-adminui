import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';
import FilterFragment from '../fragments/FilterFragment';

export const FilterQuery = gql`
  query Filter($filterId: ID, $forceLocale: String) {
    filter(filterId: $filterId) {
      ...FilterFragment
    }
  }
  ${FilterFragment}
`;

const useFilter = ({ filterId = null } = {}) => {
  const { locale } = useIntl();

  const { data, loading, error } = useQuery(FilterQuery, {
    skip: !filterId,
    variables: { filterId, forceLocale: locale },
  });

  return {
    filter: data?.filter,
    loading,
    error,
  };
};

export const preFetchFilter = async (apolloClient, { filterId = null }) => {
  const { data } = await apolloClient.query({
    query: FilterQuery,
    skip: !filterId,
    variables: { filterId },
  });
  return data?.filter;
};

export default useFilter;
