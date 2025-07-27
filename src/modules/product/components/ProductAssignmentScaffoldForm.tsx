import { useIntl } from 'react-intl';
import useForm, { OnSubmitType } from '../../forms/hooks/useForm';
import Form from '../../forms/components/Form';
import TextField from '../../forms/components/TextField';
import SubmitButton from '../../forms/components/SubmitButton';
import useAuth from '../../Auth/useAuth';
import { useMemo } from 'react';
import useScaffoldVariationProduct from '../hooks/useScaffoldVariationProduct';

const ProductAssignmentScaffoldForm = ({
  proxyProduct,
  vectors,
  onSuccess,
}) => {
  const { formatMessage } = useIntl();
  const scaffoldProduct = useScaffoldVariationProduct({
    onSuccess,
    proxyProduct,
    vectors,
  });
  const { hasRole } = useAuth();

  const variations = useMemo(
    () => vectors.map(({ value }) => value),
    [vectors],
  );

  const defaultTitle = useMemo(() => {
    const baseTitle = proxyProduct?.texts?.title ?? '';
    return `${variations.join('-')} ${baseTitle}`.trim();
  }, [variations, proxyProduct]);

  const onSubmit: OnSubmitType = async ({ title }) => {
    try {
      await scaffoldProduct({ title });
      return { success: true };
    } catch (e) {
      return { success: false, errors: [{ message: e?.message }] };
    }
  };
  const successMessage = formatMessage({
    id: 'product-scaffolded-success',
    defaultMessage: 'Product scaffolded successfully',
  });
  const form = useForm({
    submit: onSubmit,
    successMessage,
    enableReinitialize: true,
    initialValues: {
      title: defaultTitle,
    },
  });

  return (
    <Form className="mt-3 rounded-md" form={form}>
      <div className="p-5 pb-7 sm:max-w-full flex flex-col gap-3">
        <TextField
          name="title"
          id="title"
          label={formatMessage({
            id: 'name',
            defaultMessage: 'Name',
          })}
          required
          className="block w-full max-w-full rounded-md border-slate-300 dark:border-slate-800 text-sm focus:ring-slate-800 sm:text-sm"
        />
      </div>

      <div className="border-t border-t-slate-100 dark:border-t-slate-700 bg-slate-50 dark:bg-slate-900 p-5 text-right">
        <SubmitButton
          hidden={!hasRole('addProduct')}
          label={formatMessage({
            id: 'scaffold_product',
            defaultMessage: 'Scaffold',
          })}
        />
      </div>
    </Form>
  );
};

export default ProductAssignmentScaffoldForm;
