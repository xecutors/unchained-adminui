import { gql } from '@apollo/client';

const FilterFragment = gql`
  fragment FilterFragment on Filter {
    _id
    updated
    created
    key
    isActive
<<<<<<< HEAD
=======
    texts(forceLocale: $forceLocale) {
      _id
      title
      subtitle
      locale
    }
>>>>>>> 89c5330a (force localiziation)
    type
    options {
      _id
      texts(forceLocale: $forceLocale) {
        _id
        title
        subtitle
        locale
      }
      value
    }
  }
`;

export default FilterFragment;
