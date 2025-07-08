import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Form from '../../forms/components/Form';

import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm, { OnSubmitType } from '../../forms/hooks/useForm';

import useTranslatedAssortmentTexts from '../hooks/useTranslatedAssortmentTexts';
import useUpdateAssortmentTexts from '../hooks/useUpdateAssortmentTexts';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';
import useAuth from '../../Auth/useAuth';
import FormWrapper from '../../common/components/FormWrapper';
import MarkdownTextAreaField from '../../forms/components/MarkdownTextAreaField';

const AssortmentTextForm = ({ assortmentId, selectedLocale = null }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();

  const { translatedAssortmentTexts, loading } = useTranslatedAssortmentTexts({
    assortmentId,
  });

  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const { updateAssortmentTexts } = useUpdateAssortmentTexts();

  const onSubmit: OnSubmitType = async ({
    slug,
    title,
    subtitle,
    description,
  }) => {
    await updateAssortmentTexts({
      assortmentId,
      texts: [
        {
          locale: selectedLocale || 'de',
          slug,
          title,
          subtitle,
          description,
        },
      ],
    });
    return { success: true };
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
    const value = translatedAssortmentTexts?.find(
      (text) => text.locale === selectedLocale,
    );
    if (value || !loading) {
      form.formik.setValues({
        slug: value?.slug || '',
        title: value?.title || '',
        subtitle: value?.subtitle || '',
        description: value?.description || '',
      });
    }
  }, [translatedAssortmentTexts, selectedLocale, loading]);

  return (
    <SelfDocumentingView
      documentationLabel={formatMessage({
        id: 'texts',
        defaultMessage: 'Texts',
      })}
      className="mt-2 lg:mt-5"
      documentation={
        <FormattedMessage
          id="assortment_text_form_description"
          defaultMessage="<ul> <li>A Slug is the unique identifying part of a web address, typically at the end of the URL. </li>
         <li> You can change the language of text by using the localization dropdown found at top left corner </li> 
         <li> Description area accepts text that are compatible with markdown or HTML format. Tip: in order to add a line break use \ </li></ul>"
          values={{
            ul: (chunk) => <ul className="space-y-1">{chunk} </ul>,
            li: (chunk) => <li>{chunk} </li>,
          }}
        />
      }
    >
      <FormWrapper>
        <Form form={form}>
          <div className="shadow sm:rounded-md">
            <div className="grid gap-6 px-4 py-5 sm:p-6">
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
                  className="mt-1 w-full text-sm"
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
                  className="mt-1 w-full text-sm"
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
                  className="mt-1 w-full text-sm"
                />
              </div>
              <div className="col-span-12">
                <MarkdownTextAreaField
                  name="description"
                  id="description"
                  label={formatMessage({
                    id: 'description',
                    defaultMessage: 'Description',
                  })}
                />
              </div>
            </div>

            <div className="border-t-slate-100 border-t dark:border-t-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-5 text-right sm:px-6">
              {hasRole('editAssortmentText') && (
                <SubmitButton
                  label={formatMessage({
                    id: 'save',
                    defaultMessage: 'Save',
                  })}
                />
              )}
            </div>
          </div>
        </Form>
      </FormWrapper>
    </SelfDocumentingView>
  );
};

export default AssortmentTextForm;
