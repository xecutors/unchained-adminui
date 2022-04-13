import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';

import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import RichTextEditorField from '../../forms/components/RichTextEditorField';

import useTranslatedAssortmentTexts from '../hooks/useTranslatedAssortmentTexts';
import useUpdateAssortmentTexts from '../hooks/useUpdateAssortmentTexts';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';
import useAuth from '../../Auth/useAuth';
import ACTION_ROLES from '../../common/data/roles';
import FormWrapper from '../../common/components/FormWrapper';

const AssortmentTextForm = ({ assortmentId, selectedLocale }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();

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
    const value = translatedAssortmentTexts?.find(
      (text) => text.locale === selectedLocale,
    );
    if (value) form.formik.setValues(value);
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
                    className="mt-1 w-full text-sm font-medium"
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
                    className="mt-1 w-full text-sm font-medium"
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
                    className="mt-1 w-full text-sm font-medium"
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

              <div className="border-t-indigo-50 border-t bg-slate-50 dark:bg-slate-500 px-4 py-5 text-right sm:px-6">
                {hasRole(ACTION_ROLES.assortments.updateTexts) && (
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
      }
    />
  );
};

export default AssortmentTextForm;
