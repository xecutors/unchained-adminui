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
      <div className="px-5 shadow sm:rounded-t sm:px-15">
        <Form form={form}>
          <div className="sm:px-6 rounded-md relative max-w-full lg:grid lg:grid-cols-3">
            <div className="pb-2 mb-7 border-gray-200 sm:flex  col-span-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {formatMessage({
                  id: 'text',
                  defaultMessage: 'Text',
                })}
              </h3>
            </div>
            <div className="col-span-2 w-full ml-auto lg:shadow-md border-gray-200  bg-white px-8">
              <div>
                <TextField
                  name="title"
                  id="title"
                  label={formatMessage({
                    id: 'title',
                    defaultMessage: 'Title',
                  })}
                  autoComplete="on"
                  className="text-sm font-medium text-gray-500 py-2 sm:ml-1   mt-1 w-full"
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
                  className="text-sm  font-medium text-gray-500 py-2 sm:ml-1  mt-1 w-full"
                />
              </div>

              <SubmitButton
                label={formatMessage({
                  id: 'update_filter',
                  defaultMessage: 'Update filter',
                })}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FilterTextForm;
