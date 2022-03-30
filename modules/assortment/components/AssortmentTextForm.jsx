import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';

import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import RichTextEditorField from '../../forms/components/RichTextEditorField';

import useTranslatedAssortmentTexts from '../hooks/useTranslatedAssortmentTexts';
import useUpdateAssortmentTexts from '../hooks/useUpdateAssortmentTexts';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';

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
    <SelfDocumentingView
      documentationLabel={formatMessage({
        id: 'texts',
        defaultMessage: 'Texts',
      })}
      className="mt-2 sm:mt-0"
      documentation="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco"
      mainContent={
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
                  showToolTip
                  toolTipMessage={formatMessage({
                    id: 'tool-tip',
                    defaultMessage: 'Slug is needed for the product',
                  })}
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
                  className="mt-1 w-full text-sm font-medium text-slate-500"
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
                  className="mt-1 w-full text-sm font-medium text-slate-500"
                />
              </div>
              <div className="col-span-12">
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

            <div className="border-t-indigo-50 border-t bg-slate-50 px-4 py-5 text-right sm:px-6">
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
      }
    />
  );
};

export default AssortmentTextForm;
