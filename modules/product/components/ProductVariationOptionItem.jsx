import { PencilAltIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';

import Form from '../../forms/components/Form';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useUpdateProductVariationTexts from '../hooks/useUpdateProductVariationTexts';

const ProductVariationOptionItem = ({
  option,
  onDelete,
  variationId,
  selectedLocale,
}) => {
  const { formatMessage } = useIntl();
  const [isEdit, setIsEdit] = useState();
  const successMessage = formatMessage({
    id: 'variation_option_updated',
    defaultMessage: 'Variation option updated successfully!',
  });
  const { updateProductVariationTexts } = useUpdateProductVariationTexts();

  const onUpdate = async ({ title, subtitle }) => {
    await updateProductVariationTexts({
      productVariationId: variationId,
      productVariationOptionValue: option.value,
      texts: { title, subtitle, locale: selectedLocale },
    });
    setIsEdit(false);
  };
  const form = useForm({
    submit: onUpdate,
    successMessage,
    initialValues: {
      title: option?.texts.title,
      subtitle: option?.texts.subtitle,
    },
  });
  return (
    <Form form={form} className="last:pb-2">
      <div className="my-2 flow-root rounded border sm:mx-4">
        <li className="list-none py-2">
          <div className="grid grid-cols-6 items-center gap-2">
            <span className="col-span-1">
              <Badge text={option?.value} color="gray" />
            </span>

            <div className="col-span-4 min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">
                {isEdit ? (
                  <TextField
                    className="mt-0"
                    name="title"
                    required
                    label={formatMessage({
                      id: 'title',
                      defaultMessage: 'Title',
                    })}
                  />
                ) : (
                  option?.texts?.title
                )}
              </p>
              <p className="truncate text-sm text-gray-500">
                {isEdit ? (
                  <TextField
                    className="mt-0"
                    name="subtitle"
                    label={formatMessage({
                      id: 'subtitle',
                      defaultMessage: 'Subtitle',
                    })}
                  />
                ) : (
                  option?.texts?.subtitle
                )}
              </p>
            </div>

            <div className="col-span-1">
              {isEdit ? (
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setIsEdit(!isEdit)}
                    type="button"
                    className="rounded-md bg-white font-medium text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    {formatMessage({
                      id: 'cancel',
                      defaultMessage: 'Cancel',
                    })}
                  </button>
                  {/* <span className="text-gray-300" aria-hidden="true">
                    |
                  </span> */}
                  <button
                    type="submit"
                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    {formatMessage({
                      id: 'save',
                      defaultMessage: 'Save',
                    })}
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div onClick={() => setIsEdit(!isEdit)}>
                    <PencilAltIcon className="h-5 w-5 cursor-pointer text-indigo-400" />
                  </div>

                  <DeleteButton
                    onClick={() => onDelete(option?.texts?.value)}
                    className="ml-1 mr-1 cursor-pointer border-white text-red-600 hover:text-red-900"
                  />
                </div>
              )}
            </div>
          </div>
        </li>
      </div>
    </Form>
  );
};

export default ProductVariationOptionItem;
