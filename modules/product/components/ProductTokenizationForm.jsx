import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import FormWrapper from '../../common/components/FormWrapper';
import JSONView from '../../common/components/JSONView';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import ACTION_ROLES from '../../common/data/roles';
import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useModal from '../../modal/hooks/useModal';
import useProductTokenization from '../hooks/useProductTokenization';
import useSmartContractStandards from '../hooks/useSmartContractStandards';
import useUpdateProductTokenization from '../hooks/useUpdateProductTokenization';
import ExportTokenForm from './ExportTokenForm';

const ProductTokenizationForm = ({ productId }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const { smartContractStandards } = useSmartContractStandards();
  const { updateProductTokenization } = useUpdateProductTokenization();
  const { product } = useProductTokenization({ productId });
  const { setModal } = useModal();

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

  useEffect(() => {
    if (product)
      form.formik.setValues({
        contractAddress: product?.contractAddress || '',
        contractStandard: product?.contractStandard || '',
        tokenId: product?.contractConfiguration?.tokenId || '',
        supply: product?.contractConfiguration?.supply || '',
      });
  }, [product]);

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
      sideComponents={
        product?.contractConfiguration?.tokenId && (
          <button
            type="button"
            onClick={() =>
              setModal(
                <ExportTokenForm
                  tokenId={product?.contractConfiguration?.tokenId}
                />,
              )
            }
            className="fixed top-0 right-0 z-50 mb-5  mt-5 mr-2 h-9 rounded-md border  border-transparent bg-indigo-500 px-3 py-1 text-sm font-medium  leading-5 text-white shadow-sm sm:fixed sm:top-auto sm:right-auto"
          >
            {formatMessage({
              id: 'add_filter_option',
              defaultMessage: 'Add option',
            })}
          </button>
        )
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
              type="number"
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
      <JSONView
        value={JSON.stringify(product?.ercMetadata || {}, null, 2)}
        className="bg-white dark:bg-slate-900 dark:text-slate-200 mt-1 block w-full max-w-full rounded-md border-2 resize-none border-slate-200 dark:border-slate-800 shadow-sm sm:text-sm"
      />
    </SelfDocumentingView>
  );
};

export default ProductTokenizationForm;
