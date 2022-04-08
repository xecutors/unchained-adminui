import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';

import RichTextEditorField from '../../forms/components/RichTextEditorField';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useTranslatedProductTexts from '../hooks/useTranslatedProductTexts';
import useUpdateProductTexts from '../hooks/useUpdateProductTexts';
import ACTION_ROLES from '../../common/data/roles';
import useAuth from '../../Auth/useAuth';
import FormWrapper from '../../common/components/FormWrapper';

const ProductTextsForm = ({ productId, selectedLocale }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const { translatedTexts, loading } = useTranslatedProductTexts({ productId });
  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const { updateProductTexts } = useUpdateProductTexts();

  const onSubmit = async ({
    slug,
    title,
    subtitle,
    vendor,
    description,
    brand,
    labels,
  }) => {
    await updateProductTexts({
      productId,
      texts: {
        locale: selectedLocale,
        slug,
        title,
        subtitle,
        vendor,
        description,
        brand,
        labels,
      },
    });
    return true;
  };

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      slug: '',
      title: '',
      subtitle: '',
      vendor: '',
      description: '',
      brand: '',
      labels: '',
    },
  });

  useEffect(() => {
    const value = translatedTexts?.find(
      (text) => text.locale === selectedLocale,
    );

    if (value) form.formik.setValues(value);
  }, [translatedTexts, selectedLocale]);

  return (
    <div className="mt-5 sm:max-w-full">
      <div className="sm:rounded-t">
        <FormWrapper>
          <Form form={form}>
            <div className="relative text-slate-500 dark:text-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <TextField
                    name="slug"
                    id="slug"
                    label={formatMessage({
                      id: 'slug',
                      defaultMessage: 'Slug',
                    })}
                    autoComplete="on"
                    className="text-sm font-medium"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <TextField
                    name="title"
                    id="title"
                    label={formatMessage({
                      id: 'title',
                      defaultMessage: 'Title',
                    })}
                    autoComplete="on"
                    className="text-sm font-medium"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <TextField
                    name="subtitle"
                    id="subtitle"
                    label={formatMessage({
                      id: 'subtitle',
                      defaultMessage: 'Subtitle',
                    })}
                    autoComplete="on"
                    className="text-sm font-medium"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <TextField
                    name="vendor"
                    id="vendor"
                    label={formatMessage({
                      id: 'vendor',
                      defaultMessage: 'Vendor',
                    })}
                    autoComplete="on"
                    className="text-sm font-medium"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <TextField
                    name="brand"
                    id="brand"
                    label={formatMessage({
                      id: 'brand',
                      defaultMessage: 'Brand',
                    })}
                    autoComplete="on"
                    className="text-sm font-medium"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <TextField
                    name="labels"
                    id="labels"
                    label={formatMessage({
                      id: 'labels',
                      defaultMessage: 'Labels',
                    })}
                    autoComplete="on"
                    className="text-sm font-medium text-slate-500"
                  />
                </div>
              </div>
              <div className="col-span-6 mt-6 sm:col-span-3">
                <RichTextEditorField
                  name="description"
                  id="description"
                  label={formatMessage({
                    id: 'description',
                    defaultMessage: 'Description',
                  })}
                />
              </div>
            </div>
            <div className="border-t-indigo-50 border-t bg-slate-50 dark:bg-slate-500 px-4 py-5 text-right sm:px-6">
              <SubmitButton
                hidden={!hasRole(ACTION_ROLES.products.updateTexts)}
                label={formatMessage({
                  id: 'save',
                  defaultMessage: 'Save',
                })}
              />
            </div>
          </Form>
        </FormWrapper>
      </div>
    </div>
  );
};

export default ProductTextsForm;
