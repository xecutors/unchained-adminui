import { useMutation, gql } from '@apollo/client';

const CreateEnrollmentMutation = gql`
  mutation CreateEnrollment(
    $plan: EnrollmentPlanInput!
    $delivery: EnrollmentDeliveryInput
    $payment: EnrollmentPaymentInput
    $contact: ContactInput
  ) {
    createEnrollment(
      plan: $plan
      delivery: $delivery
      payment: $payment
      contact: $contact
    ) {
      _id
      contact {
        telNumber
        emailAddress
      }
      country {
        _id
        isoCode
      }
      enrollmentNumber
      status
      payment {
        provider {
          _id
        }
      }
      user {
        _id
        username
      }

      isExpired
      expires
      periods {
        start
        end
        isTrial
        order {
          _id
        }
      }
      plan {
        product {
          _id
          texts {
            _id
            title
          }
        }
        quantity
        configuration {
          key
          value
        }
      }
    }
  }
`;

const useCreateEnrollment = () => {
  const [createEnrollmentMutation, { data, error }] = useMutation(
    CreateEnrollmentMutation,
  );

  const createEnrollment = async ({
    plan = null,
    paymentProviderId = null,
    deliveryProviderId = null,
    contact = null,
  } = {}) => {
    const variables = {
      plan,
      payment: {
        paymentProviderId,
      },
      delivery: {
        deliveryProviderId,
      },
      contact,
    };

    return createEnrollmentMutation({
      variables,
    });
  };

  return {
    createEnrollment,
    data,
    error,
  };
};

export default useCreateEnrollment;
