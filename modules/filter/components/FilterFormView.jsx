import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import useForm from '../../forms/hooks/useForm';
import useUpdateFilterTexts from '../hooks/useUpdateFilterTexts';
import useTranslatedProductTexts from '../../product/hooks/useTranslatedProductTexts';
import FilterListView from './FilterListView';

const FilterFormView = ({ filterId, selectedLocale, options }) => {
  const { formatMessage } = useIntl();

  const { translatedTexts, loading } = useTranslatedProductTexts({
    filterId,
  });
  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const { updateProductTexts } = useUpdateFilterTexts();

  const onSubmit = async ({ title, value, subtitle }) => {
    await updateProductTexts({
      filterId,
      texts: {
        locale: selectedLocale,
        title,
        value,
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
      value: '',
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
        {/* <Form form={form}>
          <div className="sm:px-6 rounded-md relative max-w-full lg:grid lg:grid-cols-3">
            <div className="pb-2 mb-7 border-gray-200 sm:flex  col-span-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {formatMessage({
                  id: 'add_options',
                  defaultMessage: 'Add Options',
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
                  name="value"
                  id="value"
                  label={formatMessage({
                    id: 'value',
                    defaultMessage: 'Value',
                  })}
                  autoComplete="on"
                  className="text-sm  font-medium text-gray-500 py-2 sm:ml-1  mt-1 w-full"
                />
              </div>

              <div className="w-fit">
                <SubmitButton
                  label={formatMessage({
                    id: 'add_option',
                    defaultMessage: 'Add Option',
                  })}
                  className="py-6 h-9 "
                  full
                />
              </div>
            </div>
          </div>
        </Form> */}
        <div className="mt-3 bottom-1 border-t border-gray-200 pt-4">
          <div className="sm:px-6 rounded-md relative max-w-full lg:grid lg:grid-cols-3">
            <div className="pb-2 mb-7 border-gray-200 sm:flex  col-span-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {formatMessage({
                  id: 'options_list_view',
                  defaultMessage: 'Options List View',
                })}
              </h3>
            </div>
            <div className="col-span-2 w-full ml-auto lg:shadow-md border-gray-200  bg-white px-8">
              <FilterListView
                filterId={filterId}
                options={options}
                selectedLocale={selectedLocale}
                // form={form }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterFormView;
