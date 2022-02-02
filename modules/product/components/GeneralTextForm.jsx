import { useIntl } from 'react-intl';
import FormHeader from '../../common/components/FormHeader';

import Form from '../../forms/components/Form';

import SubmitButton from '../../forms/components/SubmitButton';
import TextAreaField from '../../forms/components/TextAreaField';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useUpdateProductTexts from '../hooks/useUpdateProductTexts';

const GeneralTextForm = ({ _id: productId, selectedLocale, texts }) => {
  const { formatMessage } = useIntl();

  const successMessage = formatMessage({
    id: 'saved_with_dot_suffix',
    defaultMessage: 'Saved...',
  });

  const { updateProductTexts } = useUpdateProductTexts();

  const onSubmit = async ({
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
      texts: {
        locale: selectedLocale?.isoCode,
        slug,
        title,
        subtitle,
        vendor,
        description,
        brand,
        labels,
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
      vendor: '',
      description: '',
      brand: '',
      labels: '',
      ...(texts || {}),
    },
  });

  return (
    <FormHeader>
      <Form form={form}>
        <div className="pl-3 grid grid-col-2 ">
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:p-6 rounded-md relative max-w-full">
          <div className="sm:flex w-full  justify-between align-baseline">
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

          <div className="sm:flex max-w-full  justify-between align-baseline">
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

            <TextField
              name="vendor"
              id="vendor"
              label={formatMessage({
                id: 'vendor',
                defaultMessage: 'Vendor',
              })}
              autoComplete="on"
              className="text-sm  font-medium text-gray-500 py-2 ml-1  mt-1 w-full"
            />
          </div>

          <div className="sm:flex max-w-full  justify-between align-baseline">
            <TextField
              name="brand"
              id="brand"
              label={formatMessage({
                id: 'brand',
                defaultMessage: 'Brand',
              })}
              autoComplete="on"
              className="text-sm  font-medium text-gray-500 py-2 ml-1  mt-1 w-full"
            />

            <TextField
              name="labels"
              id="labels"
              label={formatMessage({
                id: 'labels',
                defaultMessage: 'Labels',
              })}
              autoComplete="on"
              className="text-sm  font-medium text-gray-500 py-2 ml-1   mt-1 w-full"
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
          <div className="mx-auto sm:w-1/2 ">
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
      </Form>
    </FormHeader>
  );
};

export default GeneralTextForm;
