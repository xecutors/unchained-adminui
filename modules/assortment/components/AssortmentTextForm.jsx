import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';

import SubmitButton from '../../forms/components/SubmitButton';
import TextAreaField from '../../forms/components/TextAreaField';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useTranslatedProductTexts from '../../product/hooks/useTranslatedProductTexts';
import useUpdateAssortmentTexts from '../hooks/useUpdateAssortmentTexts';

const AssortmentTextForm = ({ assortmentId, selectedLocale }) => {
  const { formatMessage } = useIntl();
  const { translatedTexts, loading } = useTranslatedProductTexts({
    assortmentId,
  });
  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const { updateProductTexts } = useUpdateAssortmentTexts();

  const onSubmit = async ({ slug, title, subtitle }) => {
    await updateProductTexts({
      assortmentId,
      texts: {
        locale: selectedLocale,
        slug,
        title,
        subtitle,
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
    <div className="mt-4 sm:max-w-full">
      <div className="px-5 shadow sm:rounded-t sm:px-15">
        <Form form={form}>
          <div className="sm:px-6 rounded-md relative max-w-full lg:grid lg:grid-cols-3">
            <div className="pb-2 mb-7 border-gray-200 sm:flex  col-span-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {formatMessage({
                  id: 'texts',
                  defaultMessage: 'Texts',
                })}
              </h3>
            </div>
            <div className="col-span-2 w-full ml-auto shadow-md border-gray-200  bg-white px-8">
              <div className="w-full  justify-between1 1align-baseline">
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

              <div className="max-w-full  justify-between align-baseline">
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
              <div className="w-fit">
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
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AssortmentTextForm;
