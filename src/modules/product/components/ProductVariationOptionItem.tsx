import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import EditIcon from '../../common/components/EditIcon';

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
  const [isEdit, setIsEdit] = useState(false);
  const successMessage = formatMessage({
    id: 'variation_option_updated',
    defaultMessage: 'Variation option updated successfully!',
  });
  const { updateProductVariationTexts } = useUpdateProductVariationTexts();

  const onUpdate = async ({ title, subtitle }: any) => {
    const data = await updateProductVariationTexts({
      productVariationId: variationId,
      productVariationOptionValue: option.value,
      texts: [{ title, subtitle, locale: selectedLocale || 'de' }],
    });
    setIsEdit(false);
    return { data, success: true };
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
    <Form form={form} className="last:pb-2 variation-option-update-form">
      <div className="my-2 flow-root rounded-sm border sm:mx-4 ">
        <li className="list-none py-2 dark:bg-slate-500 dark:text-slate-200 pl-2 pr-2">
          <div className="grid grid-cols-6 items-center gap-2">
            <span className="col-span-1">
              <Badge text={option?.value} color="slate" />
            </span>

            <div className="col-span-4 min-w-0">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-200">
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
              <p className="truncate text-sm text-slate-500">
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
                    aria-label={formatMessage({
                      id: 'cancel',
                      defaultMessage: 'Cancel',
                    })}
                    type="button"
                    className="rounded-md bg-white font-medium text-rose-500 hover:text-rose-600 focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    {formatMessage({
                      id: 'cancel',
                      defaultMessage: 'Cancel',
                    })}
                  </button>

                  <button
                    type="submit"
                    aria-label={formatMessage({
                      id: 'save',
                      defaultMessage: 'Save',
                    })}
                    className="rounded-md bg-white font-medium text-slate-950 hover:text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    {formatMessage({
                      id: 'save',
                      defaultMessage: 'Save',
                    })}
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div
                    onClick={() => setIsEdit(!isEdit)}
                    data-optionvalue={option?.value}
                    id="edit_variation_option"
                  >
                    <EditIcon />
                  </div>

                  <DeleteButton
                    onClick={() => onDelete(option.value)}
                    className="ml-1 mr-1"
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
