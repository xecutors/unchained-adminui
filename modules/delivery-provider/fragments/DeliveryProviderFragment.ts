import { gql } from '@apollo/client';

const DeliveryProviderFragment = gql`
  fragment DeliveryProviderFragment on DeliveryProvider {
    _id
    created
    updated
    deleted
    type
    configuration
    interface {
      _id
      label
      version
    }
    configurationError
  }
`;

export default DeliveryProviderFragment;
