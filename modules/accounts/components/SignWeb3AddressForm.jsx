import { useIntl } from 'react-intl';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextAreaField from '../../forms/components/TextAreaField';
import useForm from '../../forms/hooks/useForm';
import useVerifyWeb3Address from '../hooks/useVerifyWeb3Address';

const SignWeb3AddressForm = ({ nonce, address }) => {
  const { formatMessage } = useIntl();
  const { verifyWeb3Address } = useVerifyWeb3Address();
  const successMessage = formatMessage({
    id: 'web3_verified_success',
    defaultMessage: 'Address verified successfully!',
  });

  const onVerifyAddress = async ({ hash }) => {
    await verifyWeb3Address({ hash, address });
  };
  const form = useForm({
    submit: onVerifyAddress,
    successMessage,
    enableReinitialize: true,
    initialValues: {
      hash: '',
    },
  });

  return (
    <div>
      <p>
        {formatMessage(
          {
            id: 'web3_address_signature_instruction',
            defaultMessage:
              'Sign the following nonce ({nonce}) and past the signature on the space        provided below',
          },
          { nonce },
        )}
      </p>
      <Form form={form}>
        <TextAreaField
          required
          name="hash"
          label={formatMessage({
            id: 'signature_hash',
            defaultMessage: 'Signature hash',
          })}
          placeholder={formatMessage({
            id: 'signature_hash',
            defaultMessage: 'Signature hash',
          })}
        />
        <SubmitButton />
      </Form>
    </div>
  );
};

export default SignWeb3AddressForm;
