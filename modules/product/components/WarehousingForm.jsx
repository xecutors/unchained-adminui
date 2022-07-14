import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import FormWrapper from '../../common/components/FormWrapper';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';
import ACTION_ROLES from '../../common/data/roles';

import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useProductWarehousing from '../hooks/useProductWarehousing';
import useUpdateProductWarehousing from '../hooks/useUpdateProductWarehousing';

const WarehousingForm = ({ productId }) => {
  const { formatMessage } = useIntl();
  const { product, loading } = useProductWarehousing({ productId });
  const { hasRole } = useAuth();
  const { updateProductWarehousing } = useUpdateProductWarehousing();

  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const onSubmit = async ({ sku, baseUnit }) => {
    await updateProductWarehousing({ productId, baseUnit, sku });
    return true;
  };

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      sku: '',
      baseUnit: '',
    },
  });

  useEffect(() => {
    if (Object.keys(product).length && !loading)
      form.formik.setValues({ ...product });
  }, [product]);

  return (
    <SelfDocumentingView
      documentationLabel={formatMessage({
        id: 'warehousing',
        defaultMessage: 'Warehousing',
      })}
      className="mt-2 sm:mt-0"
      documentation={
        <FormattedMessage
          id="product_warehousing_form_description"
          defaultMessage="<ul><li> Information regarding product storage </li> </ul>"
          values={{
            ul: (chunk) => <ul className="list-disc">{chunk} </ul>,
            li: (chunk) => <li>{chunk} </li>,
          }}
        />
      }
    >
      <FormWrapper>
        <Form className="rounded" form={form}>
          <div className="relative px-4 pb-5 sm:p-6">
            <div className="w-full justify-between align-baseline">
              <TextField
                name="sku"
                id="sku"
                label={formatMessage({
                  id: 'sku',
                  defaultMessage: 'SKU',
                })}
                className="mb-4 text-sm font-medium"
              />

              <TextField
                name="baseUnit"
                id="baseUnit"
                label={formatMessage({
                  id: 'baseUnit',
                  defaultMessage: 'Base Unit',
                })}
                className="text-sm font-medium "
              />
            </div>
          </div>
          <div className="border-t-indigo-50 border-t dark:border-t-slate-700 space-y-6 bg-slate-50 dark:bg-slate-800 text-right sm:p-6">
            <SubmitButton
              hidden={!hasRole(ACTION_ROLES.products.updateWarehousing)}
              label={formatMessage({
                id: 'save',
                defaultMessage: 'Save',
              })}
              full
            />
          </div>
        </Form>
      </FormWrapper>
    </SelfDocumentingView>
  );
};

export default WarehousingForm;
