import { useQuery, gql } from '@apollo/client';

export const ShopInfoQuery = gql`
  query ShopInfo {
    shopInfo {
      _id
      version
      language {
        _id
        isoCode
        name
      }
      country {
        _id
        isoCode
        flagEmoji
        name
        defaultCurrency {
          _id
          isoCode
        }
      }
      externalLinks {
        href
        title
      }
    }
  }
`;

const useShopInfo = () => {
  const { data, loading, error } = useQuery(ShopInfoQuery);
  return {
    shopInfo: data?.shopInfo,
    loading,
    error,
  };
};

export default useShopInfo;
