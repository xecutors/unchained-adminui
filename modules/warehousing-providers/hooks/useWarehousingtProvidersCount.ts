import { useQuery, gql } from '@apollo/client';

export const WarehousingProvidersCountQuery = gql`
  query WarehousingProvidersCount($type: WarehousingProviderType) {
    warehousingProvidersCount(type: $type)
  }
`;

const useWarehousingProvidersCount = ({ type = '' } = {}) => {
  const { data, loading, error }: any = useQuery(
    WarehousingProvidersCountQuery,
    {
      variables: { type },
    },
  );

  return {
    warehousingProvidersCount: data?.warehousingProvidersCount,
    loading,
    error,
  };
};

export default useWarehousingProvidersCount;
