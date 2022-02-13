import { useQuery, gql } from '@apollo/client';

import FilterTextsFragment from '../fragments/FilterTextsFragment';

export const TranslatedFilterTextsQuery = gql`
  query TranslatedFilterTexts($filterId: ID!, $filterOptionValue: String) {
    translatedFilterTexts(
      filterId: $filterId
      filterOptionValue: $filterOptionValue
    ) {
      ...FilterTextsFragment
    }
  }
  ${FilterTextsFragment}
`;

const useTranslatedFilterTexts = ({
  filterId = null,
  filterOptionValue = null,
} = {}) => {
  const { data, loading, error } = useQuery(TranslatedFilterTextsQuery, {
    variables: { filterId, filterOptionValue },
  });

  return {
    translatedFilterTexts: data?.translatedFilterTexts || [],
    loading,
    error,
  };
};

export default useTranslatedFilterTexts;
