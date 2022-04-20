import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';

import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useUpdateFilterTexts from '../hooks/useUpdateFilterTexts';
import useTranslatedFilterTexts from '../hooks/useTranslatedFilterTexts';
import SelfDocumentingView from '../../common/components/SelfDocumentingView';
import ACTION_ROLES from '../../common/data/roles';
import useAuth from '../../Auth/useAuth';
import FormWrapper from '../../common/components/FormWrapper';

const FilterTextForm = ({ filterId, selectedLocale }) => {
  const { formatMessage } = useIntl();
  const { translatedFilterTexts, loading } = useTranslatedFilterTexts({
    filterId,
  });
  const { hasRole } = useAuth();
  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const { updateFilterTexts } = useUpdateFilterTexts();

  const onSubmit = async ({ title, subtitle }) => {
    await updateFilterTexts({
      filterId,
      texts: {
        locale: selectedLocale,
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
      title: '',
      subtitle: '',
      ...((!loading &&
        translatedFilterTexts?.find(
          (text) => text.locale === selectedLocale,
        )) ||
        {}),
    },
  });

  useEffect(() => {
    const value = translatedFilterTexts?.find(
      (text) => text.locale === selectedLocale,
    );
    if (value) form.formik.setValues(value);
  }, [translatedFilterTexts, selectedLocale]);

  return (
    <SelfDocumentingView
      documentationLabel={formatMessage({
        id: 'text',
        defaultMessage: 'Text',
      })}
      mainContent={
        <FormWrapper>
          <Form form={form} className="border-slate-200 pt-2 lg:shadow">
            <div>
              <TextField
                name="title"
                id="title"
                label={formatMessage({
                  id: 'title',
                  defaultMessage: 'Title',
                })}
                autoComplete="on"
                className="mt-2 px-4 text-sm font-medium"
              />
            </div>

            <div>
              <TextField
                name="subtitle"
                id="subtitle"
                label={formatMessage({
                  id: 'subtitle',
                  defaultMessage: 'Subtitle',
                })}
                autoComplete="on"
                className="mt-2 px-4 text-sm font-medium"
              />
            </div>
            <div className="flex">
              <SubmitButton
                hidden={!hasRole(ACTION_ROLES.filters.updateTexts)}
                label={formatMessage({
                  id: 'update_filter',
                  defaultMessage: 'Update filter',
                })}
                className="my-4 ml-auto mr-4"
              />
            </div>
          </Form>
        </FormWrapper>
      }
    />
  );
};

export default FilterTextForm;
