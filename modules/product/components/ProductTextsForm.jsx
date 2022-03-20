import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import SubmitButton from '../../forms/components/SubmitButton';

import TextAreaField from '../../forms/components/TextAreaField';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useTranslatedProductTexts from '../hooks/useTranslatedProductTexts';
import useUpdateProductTexts from '../hooks/useUpdateProductTexts';

const ProductTextsForm = ({ productId, selectedLocale }) => {
  const { formatMessage } = useIntl();
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
      ...((!loading &&
        translatedTexts?.find((text) => text.locale === selectedLocale)) ||
        {}),
    },
  });

  useEffect(() => {
    if (translatedTexts?.length)
      form.formik.setValues(
        translatedTexts?.find((text) => text.locale === selectedLocale),
      );
  }, [translatedTexts, selectedLocale]);

  return (
    <div className="mt-5 sm:max-w-full">
      <div className="bg-white shadow sm:rounded-t">
        <Form form={form}>
          <div className="relative bg-white px-4 py-5 sm:p-6">
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
                  className="text-sm font-medium text-gray-500"
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
                  className="text-sm font-medium text-gray-500"
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
                  className="text-sm font-medium text-gray-500"
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
                  className="text-sm font-medium text-gray-500"
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
                  className="text-sm  font-medium text-gray-500"
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
                  className="text-sm  font-medium text-gray-500"
                />
              </div>
            </div>
            <div className="col-span-6 mt-6 sm:col-span-3">
              {formatMessage({
                id: 'description',
                defaultMessage: 'Description',
              })}

              <ReactQuill
                theme="snow"
                name="description"
                id="description"
                autoComplete="on"
                className="w-full text-sm font-medium text-gray-500"
              />
            </div>

            <FormErrors />
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <SubmitButton
                label={formatMessage({
                  id: 'save',
                  defaultMessage: 'Save',
                })}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProductTextsForm;
