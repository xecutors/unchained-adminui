import { gql } from '@apollo/client';

const CurrencyFragment = gql`
  fragment CurrencyFragment on Currency {
    _id
    isoCode
    isActive
    contractAddress
  }
`;

export default CurrencyFragment;
