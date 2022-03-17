import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';

import TextAreaField from '../../forms/components/TextAreaField';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useTranslatedProductTexts from '../hooks/useTranslatedProductTexts';
import useUpdateProductTexts from '../hooks/useUpdateProductTexts';

const GeneralTextForm = ({ productId, selectedLocale }) => {
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
          <div className="px-4 py-5 bg-white sm:p-6 relative">
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
                  className="text-sm font-medium text-gray-500 py-2 mt-1 w-full"
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
                  className="text-sm font-medium text-gray-500 py-2 mt-1 w-full"
                />
              </div>
            </div>

            <div className="sm:flex max-w-full justify-between align-baseline">
              <TextField
                name="subtitle"
                id="subtitle"
                label={formatMessage({
                  id: 'subtitle',
                  defaultMessage: 'Subtitle',
                })}
                autoComplete="on"
                className="text-sm  font-medium text-gray-500 py-2 ml-1  mt-1 w-full"
              />

              <TextField
                name="vendor"
                id="vendor"
                label={formatMessage({
                  id: 'vendor',
                  defaultMessage: 'Vendor',
                })}
                autoComplete="on"
                className="text-sm  font-medium text-gray-500 py-2 ml-1  mt-1 w-full"
              />
            </div>

            <div className="sm:flex max-w-full  justify-between align-baseline">
              <TextField
                name="brand"
                id="brand"
                label={formatMessage({
                  id: 'brand',
                  defaultMessage: 'Brand',
                })}
                autoComplete="on"
                className="text-sm  font-medium text-gray-500 py-2 ml-1 mt-1 w-full"
              />

              <TextField
                name="labels"
                id="labels"
                label={formatMessage({
                  id: 'labels',
                  defaultMessage: 'Labels',
                })}
                autoComplete="on"
                className="text-sm  font-medium text-gray-500 py-2 ml-1 mt-1 w-full"
              />
            </div>

            <div className="w-full">
              <TextAreaField
                name="description"
                id="description"
                label={formatMessage({
                  id: 'description',
                  defaultMessage: 'Description',
                })}
                autoComplete="on"
                className="text-sm font-medium text-gray-500 py-2 ml-1 mt-1 w-full"
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default GeneralTextForm;
