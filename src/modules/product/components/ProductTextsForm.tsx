import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import SubmitButton from '../../forms/components/SubmitButton';

import TextField from '../../forms/components/TextField';
import useForm, { OnSubmitType } from '../../forms/hooks/useForm';
import useTranslatedProductTexts from '../hooks/useTranslatedProductTexts';
import useUpdateProductTexts from '../hooks/useUpdateProductTexts';
import useAuth from '../../Auth/useAuth';
import FormWrapper from '../../common/components/FormWrapper';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';

import MarkdownTextAreaField from '../../forms/components/MarkdownTextAreaField';
import TagInputField from '../../forms/components/TagInputField';

const ProductTextsForm = ({ productId, selectedLocale = null }) => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();

  const { translatedTexts } = useTranslatedProductTexts({ productId });
  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const { updateProductTexts } = useUpdateProductTexts();

  const onSubmit: OnSubmitType = async ({
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
      texts: [
        {
          locale: selectedLocale || 'de',
          slug,
          title,
          subtitle,
          vendor,
          description,
          brand,
          labels,
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
      vendor: '',
      description: '',
      brand: '',
      labels: [],
    },
  });

  useEffect(() => {
    let value = translatedTexts?.find((text) => text.locale === selectedLocale);

    // If no value found for selectedLocale, use the first available text
    if (!value && translatedTexts?.length > 0) {
      value = translatedTexts[0];
    }

    if (value) form.formik.setValues(value);
  }, [translatedTexts, selectedLocale]);

  return (
    <SelfDocumentingView
      documentationLabel={formatMessage({
        id: 'texts',
        defaultMessage: 'Texts',
      })}
      className="mt-2 lg:mt-5"
      documentation={
        <FormattedMessage
          id="product_text_form_description"
          defaultMessage="<ul> <li>A Slug is the unique identifying part of a web address, typically at the end of the URL. </li>
           <li> You can change the language of text by using the localization dropdown found at top right corner </li>
           <li> Description area accepts text that are compatible with markdown or HTML. Tip: in order to add a line break use \ </li>
           </ul>"
          values={{
            ul: (chunk) => <ul className="space-y-1">{chunk} </ul>,
            li: (chunk) => <li key={Math.random()}>{chunk} </li>,
          }}
        />
      }
    >
      <FormWrapper>
        <Form form={form}>
          <div className="relative text-slate-500 dark:text-slate-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <TextField
                  name="slug"
                  required
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
                  required
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
                <TagInputField
                  name="labels"
                  id="labels"
                  label={formatMessage({
                    id: 'labels',
                    defaultMessage: 'Labels',
                  })}
                  buttonText={formatMessage({
                    id: 'add',
                    defaultMessage: 'Add',
                  })}
                  autoComplete="on"
                  className="text-sm font-medium"
                />
              </div>
            </div>
            <div className="col-span-6 mt-6 sm:col-span-3">
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
          <div className="sticky bottom-0">
            <div className="absolute -top-5 left-0 right-0 h-5 bg-gradient-to-t from-slate-50 dark:from-slate-800 to-transparent pointer-events-none border-b border-slate-100 dark:border-slate-700" />
            <div className="border-t-slate-100 border-t dark:border-t-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-5 text-right sm:px-6">
              <SubmitButton
                hidden={!hasRole('editProductTexts')}
                label={formatMessage({
                  id: 'save',
                  defaultMessage: 'Save',
                })}
              />
            </div>
          </div>
        </Form>
      </FormWrapper>
    </SelfDocumentingView>
  );
};

export default ProductTextsForm;
