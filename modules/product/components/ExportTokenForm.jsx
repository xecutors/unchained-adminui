import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import ACTION_ROLES from '../../common/data/roles';
import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useExportToken from '../hooks/useExportToken';

const ExportTokenForm = ({ tokenId }) => {
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
      <div className="p-5 pb-7 max-w-full">
        <div className="flex justify-between align-middle">
          <TextField
            name="quantity"
            id="quantity"
            type="number"
            label={formatMessage({
              id: 'quantity',
              defaultMessage: 'Quantity',
            })}
            placeholder={formatMessage({
              id: 'quantity',
              defaultMessage: 'Quantity',
            })}
            required
            className="block w-full max-w-full rounded-md border-slate-200 dark:border-slate-800 text-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
          />

          <TextField
            name="recipientWalletAddress"
            id="recipientWalletAddress"
            label={formatMessage({
              id: 'recipient-wallet-address',
              defaultMessage: 'Recipient wallet address',
            })}
            placeholder={formatMessage({
              id: 'recipient-wallet-address',
              defaultMessage: 'Recipient wallet address',
            })}
            required
            className=" w-full max-w-full rounded-md border-slate-200 dark:border-slate-800 text-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
          />

          <SubmitButton
            hidden={!hasRole(ACTION_ROLES.products.update)}
            label={formatMessage({
              id: 'export-token',
              defaultMessage: 'Export token',
            })}
            className="self-end"
          />
        </div>
      </div>

      <div className="sm:px-15 space-y-6 border-t border-t-indigo-50 dark:border-t-slate-700 bg-slate-50 dark:bg-slate-800 p-5 text-right" />
    </Form>
  );
};

export default ExportTokenForm;
