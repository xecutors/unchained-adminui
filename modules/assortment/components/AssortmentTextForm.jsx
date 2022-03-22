import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';

import SubmitButton from '../../forms/components/SubmitButton';
import TextAreaField from '../../forms/components/TextAreaField';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';

import useTranslatedAssortmentTexts from '../hooks/useTranslatedAssortmentTexts';
import useUpdateAssortmentTexts from '../hooks/useUpdateAssortmentTexts';

const AssortmentTextForm = ({ assortmentId, selectedLocale }) => {
  const { formatMessage } = useIntl();

  const { translatedAssortmentTexts, loading } = useTranslatedAssortmentTexts({
    assortmentId,
  });

  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const { updateAssortmentTexts } = useUpdateAssortmentTexts({ assortmentId });

  const onSubmit = async ({ slug, title, subtitle, description }) => {
    await updateAssortmentTexts({
      assortmentId,
      texts: {
        locale: selectedLocale,
        slug,
        title,
        subtitle,
        description,
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
        translatedAssortmentTexts?.find(
          (text) => text.locale === selectedLocale,
        )) ||
        {}),
    },
  });

  useEffect(() => {
    if (translatedAssortmentTexts?.length)
      form.formik.setValues(
        translatedAssortmentTexts?.find(
          (text) => text.locale === selectedLocale,
        ),
      );
  }, [translatedAssortmentTexts, selectedLocale]);

  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {formatMessage({
              id: 'texts',
              defaultMessage: 'Texts',
            })}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </p>
        </div>
      </div>
      <div className="mt-5 md:col-span-2 md:mt-0">
        <Form form={form}>
          <div className="shadow sm:rounded-md">
            <div className="grid gap-6 bg-white px-4 py-5 sm:p-6">
              <div className="col-span-12">
                <TextField
                  name="slug"
                  required
                  id="slug"
                  label={formatMessage({
                    id: 'slug',
                    defaultMessage: 'Slug',
                  })}
                  autoComplete="on"
                  className="mt-1 w-full text-sm font-medium text-gray-500"
                />
              </div>
              <div className="col-span-12">
                <TextField
                  name="title"
                  id="title"
                  label={formatMessage({
                    id: 'title',
                    defaultMessage: 'Title',
                  })}
                  required
                  autoComplete="on"
                  className="mt-1 w-full text-sm font-medium text-gray-500"
                />
              </div>
              <div className="col-span-12">
                <TextField
                  name="subtitle"
                  id="subtitle"
                  label={formatMessage({
                    id: 'subtitle',
                    defaultMessage: 'Subtitle',
                  })}
                  autoComplete="on"
                  className="mt-1 w-full text-sm font-medium text-gray-500"
                />
              </div>
              <div className="col-span-12">
                <TextAreaField
                  name="description"
                  id="description"
                  label={formatMessage({
                    id: 'description',
                    defaultMessage: 'Description',
                  })}
                  autoComplete="on"
                  className="mt-1 w-full text-sm font-medium text-gray-500"
                />
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <FormErrors />
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

export default AssortmentTextForm;
