import { gql } from '@apollo/client';
import AssortmentFragment from './AssortmentFragment';

const AssortmentChildrenFragment = gql`
  fragment AssortmentChildrenFragment on Assortment {
    ...AssortmentFragment
    linkedAssortments {
      _id
      parent {
        _id
      }
    }
  }
  ${AssortmentFragment}
`;

export default AssortmentChildrenFragment;
