import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';

import SubmitButton from '../../forms/components/SubmitButton';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useUpdateFilterTexts from '../hooks/useUpdateFilterTexts';
import useTranslatedFilterTexts from '../hooks/useTranslatedFilterTexts';

const FilterTextForm = ({ filterId, selectedLocale }) => {
  const { formatMessage } = useIntl();
  const { translatedFilterTexts, loading } = useTranslatedFilterTexts({
    filterId,
  });
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
    if (translatedFilterTexts?.length)
      form.formik.setValues(
        translatedFilterTexts?.find((text) => text.locale === selectedLocale),
      );
  }, [translatedFilterTexts, selectedLocale]);

  return (
    <div className="mt-4 sm:max-w-full">
      <div className="sm:pl-15">
        <Form form={form}>
          <div className="relative max-w-full rounded-md sm:pl-6 lg:grid lg:grid-cols-3">
            <div className="col-span-1 mb-7 border-slate-200 pb-2 sm:flex">
              <h3 className="text-lg font-medium leading-6 text-slate-900">
                {formatMessage({
                  id: 'text',
                  defaultMessage: 'Text',
                })}
              </h3>
            </div>
            <div className="col-span-2 ml-auto w-full rounded border-slate-200 bg-white pt-2 lg:shadow">
              <div>
                <TextField
                  name="title"
                  id="title"
                  label={formatMessage({
                    id: 'title',
                    defaultMessage: 'Title',
                  })}
                  autoComplete="on"
                  className="mt-2 px-4 text-sm font-medium text-slate-500"
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
                  className="mt-2 px-4 text-sm font-medium text-slate-500"
                />
              </div>
              <div className="flex">
                <SubmitButton
                  label={formatMessage({
                    id: 'update_filter',
                    defaultMessage: 'Update filter',
                  })}
                  className="my-4 ml-auto mr-4"
                />
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FilterTextForm;
