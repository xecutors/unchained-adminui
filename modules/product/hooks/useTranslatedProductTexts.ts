import { useQuery, gql } from '@apollo/client';
import useUnchainedContext from '../../UnchainedContext/useUnchainedContext';
import ProductTextsFragment from '../fragments/ProductTextsFragment';

export const GetTranslatedProductTextsQuery = (inlineFragment = '') => gql`
  query TranslatedProductTexts($productId: ID!) {
    translatedProductTexts(productId: $productId) {
      ...ProductTextsFragment
      ${inlineFragment}
    }
  }
  ${ProductTextsFragment}
`;

const useTranslatedProductTexts = ({ productId }) => {
  const { customProperties } = useUnchainedContext();
  const { data, loading, error } = useQuery(
    GetTranslatedProductTextsQuery(customProperties?.ProductTexts),
    {
      skip: !productId,
      variables: {
        productId,
      },
    },
  );
  const translatedTexts = data?.translatedProductTexts || [];

  return {
    translatedTexts,
    loading,
    error,
  };
};

export default useTranslatedProductTexts;
