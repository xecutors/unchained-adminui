import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';

import SubmitButton from '../../forms/components/SubmitButton';
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
    <div className=" mt-5 sm:max-w-full">
      <div className="py-2 bg-white px-5 shadow sm:rounded-t sm:px-15">
        <Form form={form}>
          <div className="space-y-6 sm:p-6 rounded-md relative max-w-full">
            <div className="sm:flex w-full  justify-between align-baseline">
              <TextField
                name="slug"
                id="slug"
                label={formatMessage({
                  id: 'slug',
                  defaultMessage: 'Slug',
                })}
                autoComplete="on"
                className="text-sm font-medium text-gray-500 py-2 sm:ml-1   mt-1 w-full"
              />

              <TextField
                name="title"
                id="title"
                label={formatMessage({
                  id: 'title',
                  defaultMessage: 'Title',
                })}
                autoComplete="on"
                className="text-sm font-medium text-gray-500 py-2 ml-1   mt-1 w-full"
              />
            </div>

            <div className="sm:flex max-w-full  justify-between align-baseline">
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
                className="text-sm  font-medium text-gray-500 py-2 ml-1  mt-1 w-full"
              />

              <TextField
                name="labels"
                id="labels"
                label={formatMessage({
                  id: 'labels',
                  defaultMessage: 'Labels',
                })}
                autoComplete="on"
                className="text-sm  font-medium text-gray-500 py-2 ml-1   mt-1 w-full"
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
                className="text-sm font-medium text-gray-500 py-2 ml-1   mt-1 w-full"
              />
            </div>
            <div className="mx-auto sm:w-1/2 ">
              <SubmitButton
                label={formatMessage({
                  id: 'save',
                  defaultMessage: 'Save',
                })}
                className="py-6 h-9 "
                full
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default GeneralTextForm;
