import { useQuery, gql } from '@apollo/client';

export const OrderQuery = gql`
  query Order($orderId: ID!) {
    order(orderId: $orderId) {
      _id
      reference
      comment
      user {
        _id
        username
        isGuest
        avatar {
          _id
          url
        }
      }
          discounts {
      _id
      trigger
      code
      interface {
        _id
        label
        version
        isManualRemovalAllowed
        isManualRemovalAllowed
      }
      total {
        _id
        amount
        currency
        isTaxable
        isNetPrice
      }
      discounted {
        _id
        orderDiscount {
          _id
          total {
                    _id
        amount
        currency
        isTaxable
        isNetPrice
          }
        }
        total {
        _id
        amount
        currency
        isTaxable
        isNetPrice
        }
        
      }
    }
      payment {
        _id
        provider {
          _id
          type
          interface {
            _id
            label
            version
          }
        }
        status
        fee {
          _id
          currency
          amount
        }
        paid
      }
      delivery {
        _id
        status
        provider {
          _id
          type
          interface {
            _id
            label
            version
          }
        }
        wrapping
        deliveryType
        deliveryDate
      }

      orderNumber
      status
      created
      updated
      ordered

      confirmed
      fullfilled
      contact {
        telNumber
        emailAddress
      }
      country {
        _id
        isoCode
        flagEmoji
        name
      }
      currency {
        _id
        isoCode
        isActive
      }
      billingAddress {
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
      delivery {
        _id
        provider {
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
        }
        status
        delivered
        fee {
          _id
          isTaxable
          isNetPrice
          amount
          currency
        }
        discounts {
          _id
          orderDiscount {
            _id
            trigger
            code
            order {
              _id
              orderNumber
            }
            interface {
              _id
              label
              version
            }
            total {
              _id
              isTaxable
              isNetPrice
              amount
              currency
            }
            discounted {
              _id
              orderDiscount {
                _id
                trigger
                code
                order {
                  _id
                  orderNumber
                }
                interface {
                  _id
                  label
                  version
                }
                total {
                  _id
                  isTaxable
                  isNetPrice
                  amount
                  currency
                }
              }
            }
          }
        }
        deliveryAddressId
        wrapping
        deliveryType
        deliveryDate
        deliveryOption
        billingAddressId
      }
      total {
        _id
        isTaxable
        isTaxable
        amount
        currency
      }
      documents {
        _id
        name
        type
        size
        url
      }
      supportedDeliveryProviders {
        _id
        type
        interface {
          _id
          label
          version
        }
      }
      supportedPaymentProviders {
        _id
        type
        interface {
          _id
          label
          version
        }
      }
      items {
        _id
        product {
          _id
          texts {
            _id
            slug
            brand
            vendor
            subtitle
          }
          media {
            _id
            file {
              _id
              url
            }
          }
        }
        quantity
        originalProduct {
          _id
          texts {
            _id
            slug
            brand
            vendor
            subtitle
          }
          media {
            _id
            file {
              _id
              url
            }
          }
        }
        unitPrice {
          _id
          amount
          isTaxable
          isNetPrice
          currency
        }
        total {
          _id
          amount
          isTaxable
          isNetPrice
          currency
        }
      }

      logs {
        _id
        created
        level
        message
        user {
          _id
          username
          isGuest
          avatar {
            _id
            url
          }
        }
      }
    }
  }
`;

const useOrder = ({ orderId = null } = {}) => {
  const { data, loading, error } = useQuery(OrderQuery, {
    variables: { orderId },
  });
  const order = data?.order || {};

  return {
    order,
    loading,
    error,
  };
};

export default useOrder;
