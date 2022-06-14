import { gql } from '@apollo/client';

const UserFragment = gql`
  fragment UserFragment on User {
    _id
    email
    isTwoFactorEnabled
    avatar {
      _id
      name
      size
      type
      url
    }
    allowedActions
    paymentCredentials {
      _id
      isValid
      isPreferred
      paymentProvider {
        _id
        type
        interface {
          _id
          label
          version
        }
      }
    }
    primaryEmail {
      address
      verified
    }
    emails {
      verified
      address
    }
    profile {
      displayName
      phoneMobile
      gender
      address {
        firstName
        lastName
        company
        addressLine
        addressLine2
        postalCode
        countryCode
        regionCode
        city
      }
      birthday
    }
    username
    primaryEmail {
      verified
      address
    }
    isGuest
    isInitialPassword
    name
    roles
    tags
  }
`;

export default UserFragment;
