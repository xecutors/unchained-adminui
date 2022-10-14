import { FormattedMessage, useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import FormWrapper from '../../common/components/FormWrapper';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import ACTION_ROLES from '../../common/data/roles';
import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useSmartContractStandards from '../hooks/useSmartContractStandards';
import useUpdateProductTokenization from '../hooks/useUpdateProductTokenization';

const ProductTokenizationForm = ({ productId }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const { smartContractStandards } = useSmartContractStandards();
  const { updateProductTokenization } = useUpdateProductTokenization();

  const onSubmit = async ({
    contractAddress,
    contractStandard,
    tokenId,
    supply,
  }) => {
    await updateProductTokenization({
      productId,
      contractAddress,
      contractStandard,
      tokenId,
      supply,
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
      contractAddress: '',
      contractStandard: '',
      tokenId: '',
      supply: '',
    },
  });

  return (
    <SelfDocumentingView
      documentationLabel={formatMessage({
        id: 'texts',
        defaultMessage: 'Texts',
      })}
      className="mt-2 sm:mt-0"
      documentation={
        <FormattedMessage
          id="product_text_form_description"
          defaultMessage="<ul> <li>A Slug is the unique identifying part of a web address, typically at the end of the URL. </li>
           <li> You can change the language of text by using the localization dropdown found at top right corner </li> </ul>"
          values={{
            ul: (chunk) => <ul className="list-disc list-inside">{chunk} </ul>,
            li: (chunk) => <li>{chunk} </li>,
          }}
        />
      }
    >
      <FormWrapper>
        <Form form={form}>
          <div className="p-5 pb-7 sm:max-w-full">
            <div className="my-5 flex items-center">
              <SelectField
                className="mt-1 w-full"
                label={formatMessage({
                  id: 'contract-standard',
                  defaultMessage: 'Contract standard',
                })}
                placeholder={formatMessage({
                  id: 'contract-standard',
                  defaultMessage: 'Contract standard',
                })}
                required
                name="contractStandard"
                options={convertArrayOfObjectToObject(
                  smartContractStandards,
                  'label',
                  'value',
                )}
              />
            </div>
            <TextField
              name="contractAddress"
              id="contractAddress"
              label={formatMessage({
                id: 'contract-address',
                defaultMessage: 'Contract Address',
              })}
              placeholder={formatMessage({
                id: 'contract-address',
                defaultMessage: 'Contract Address',
              })}
              required
              className="block w-full max-w-full rounded-md border-slate-200 dark:border-slate-800 text-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
            />
            <TextField
              name="supply"
              id="supply"
              label={formatMessage({
                id: 'token-supply',
                defaultMessage: 'Supply',
              })}
              placeholder={formatMessage({
                id: 'token-supply',
                defaultMessage: 'Supply',
              })}
              required
              className="block w-full max-w-full rounded-md border-slate-200 dark:border-slate-800 text-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
            />
            <TextField
              name="tokenId"
              id="tokenId"
              label={formatMessage({
                id: 'token-id',
                defaultMessage: 'Token ID',
              })}
              placeholder={formatMessage({
                id: 'token-id',
                defaultMessage: 'Token ID',
              })}
              required
              className="block w-full max-w-full rounded-md border-slate-200 dark:border-slate-800 text-sm focus:border-indigo-400 focus:ring-indigo-400 sm:text-sm"
            />
          </div>

          <div className="sm:px-15 space-y-6 border-t border-t-indigo-50 dark:border-t-slate-700 bg-slate-50 dark:bg-slate-800 p-5 text-right">
            <SubmitButton
              hidden={!hasRole(ACTION_ROLES.products.update)}
              label={formatMessage({
                id: 'update_token',
                defaultMessage: 'Update token',
              })}
              third
            />
          </div>
        </Form>
      </FormWrapper>
    </SelfDocumentingView>
  );
};

export default ProductTokenizationForm;
