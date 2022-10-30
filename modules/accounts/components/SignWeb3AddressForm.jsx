import { useIntl } from 'react-intl';
import CopyableText from '../../common/components/CopyableText';
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
      <div className="border-b border-gray-200 bg-white mb">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {formatMessage({
                id: 'sign_address_header',
                defaultMessage: 'Sign address',
              })}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              <p>
                {formatMessage(
                  {
                    id: 'web3_address_signature_instruction',
                    defaultMessage:
                      'Copy the following nonce ({nonce}) and past the signature on the space        provided below',
                  },
                  { nonce },
                )}
              </p>
            </p>
          </div>
          <div className="ml-4 mt-4 flex-shrink-0">
            <CopyableText text={nonce} />
          </div>
        </div>
      </div>
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
