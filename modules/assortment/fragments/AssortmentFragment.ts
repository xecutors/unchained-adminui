import { gql } from '@apollo/client';

const AssortmentFragment = gql`
  fragment AssortmentFragment on Assortment {
    _id
    isActive
    created
    updated
    sequence
    isBase
    isRoot
    tags
    childrenCount
    media {
      _id
      tags
      file {
        _id
        url
      }
    }
  }
`;

export default AssortmentFragment;
