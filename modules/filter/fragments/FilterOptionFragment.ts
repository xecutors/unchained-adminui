import { gql } from '@apollo/client';

const FilterOptionFragment = gql`
  fragment FilterOptionFragment on FilterOption {
    _id
    texts {
      _id
      title
      subtitle
      locale
    }
    value
  }
`;

export default FilterOptionFragment;
