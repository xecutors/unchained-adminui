import { gql } from '@apollo/client';

const CountryFragment = gql`
  fragment CountryFragment on Country {
    _id
    isoCode
    isActive
    defaultCurrency {
      _id
    }
  }
`;

export default CountryFragment;
