import { gql } from '@apollo/client';

const AssortmentFragment = gql`
  fragment AssortmentFragment on Assortment {
    _id
    isActive
    texts {
      _id
      slug
      title
      subtitle
      description
    }
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
