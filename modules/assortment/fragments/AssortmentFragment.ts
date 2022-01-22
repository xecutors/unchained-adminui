import { gql } from '@apollo/client';

const AssortmentFragment = gql`
  fragment AssortmentFragment on Assortment {
    _id
    texts(forceLocale: $forceLocale) {
      _id
      slug
      title
      subtitle
      description
    }
    isBase
    isRoot
    childrenCount
    media {
      _id
      tags
      file
    }
  }
`;

export default AssortmentFragment;
