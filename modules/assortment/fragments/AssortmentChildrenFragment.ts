import { gql } from '@apollo/client';
import AssortmentFragment from './AssortmentFragment';

const AssortmentChildrenFragment = gql`
  fragment AssortmentChildrenFragment on Assortment {
    ...AssortmentFragment
  }
  ${AssortmentFragment}
`;

export default AssortmentChildrenFragment;
