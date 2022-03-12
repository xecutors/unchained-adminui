import { gql } from '@apollo/client';

const QuotationFragment = gql`
  fragment QuotationFragment on Quotation {
    _id
    user {
      _id
      username
      avatar {
        _id
        url
      }
      name
    }
    product {
      _id
      texts {
        _id
        slug
        subtitle
        title
      }
    }
    status
    created
    expires
    updated
    isExpired
    quotationNumber
    fullfilled
    rejected
  }
`;

export default QuotationFragment;
