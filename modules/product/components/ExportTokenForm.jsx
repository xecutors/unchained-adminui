import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import ACTION_ROLES from '../../common/data/roles';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useExportToken from '../hooks/useExportToken';

const ExportTokenForm = ({ tokenId, max }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const { exportToken } = useExportToken();

  const onSubmit = async ({ recipientWalletAddress, quantity }) => {
    await exportToken({
      tokenId,
      recipientWalletAddress,
      quantity,
    });
  };

  const successMessage = formatMessage({
    id: 'token_updated',
    defaultMessage: 'Token update successfully!',
  });

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      recipientWalletAddress: '',
      quantity: '',
    },
  });

  return (
    <Form form={form}>
      <div className="grid grid-cols-3 gap-y-6 gap-x-4 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-3">
          <TextField
            hideLabel
            name="recipientWalletAddress"
            labelClassName="block text-sm font-medium text-gray-700"
            label={formatMessage({
              id: 'recipient-wallet-address',
              defaultMessage: 'Wallet address',
            })}
            placeholder={formatMessage({
              id: 'recipient-wallet-address',
              defaultMessage: 'Wallet address',
            })}
            required
            containerClassName="mt-1"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <TextField
            hideLabel
            type="number"
            max={max}
            placeholder={formatMessage({
              id: 'quantity',
              defaultMessage: 'Quantity',
            })}
            label={formatMessage({
              id: 'quantity',
              defaultMessage: 'Quantity',
            })}
            name="quantity"
            labelClassName="block text-sm font-medium text-gray-700"
            containerClassName="mt-1"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="col-span-4">
          <SubmitButton
            hidden={!hasRole(ACTION_ROLES.products.update)}
            label={formatMessage({
              id: 'export-token',
              defaultMessage: 'Export token',
            })}
            className=" w-full inline-flex rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          />
        </div>
      </div>
    </Form>
  );
};

export default ExportTokenForm;
