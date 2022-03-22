import { PencilAltIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';

import Form from '../../forms/components/Form';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useUpdateProductVariationTexts from '../hooks/useUpdateProductVariationTexts';

const Variation = ({ type, variation, selectedLocale, onDelete }) => {
  const { updateProductVariationTexts } = useUpdateProductVariationTexts();
  const [isEdit, setIsEdit] = useState(false);
  const { formatMessage } = useIntl();

  const onSubmit = async ({ title, subtitle }) => {
    await updateProductVariationTexts({
      productVariationId: variation._id,
      texts: { title, subtitle, locale: selectedLocale },
    });
  };
  const form = useForm({
    submit: onSubmit,
    initialValues: {
      title: variation?.texts?.title,
      subtitle: variation?.texts?.subtitle,
    },
  });

  return (
    <div>
      <Form form={form}>
        <div className="flow-root mt-2 ">
          <li className="py-2 px-2">
            <div className="flex items-center space-x-4">
              <div className="flex-col">
                <div>
                  <Badge text={type} square />
                </div>
                <div>
                  <Badge text={variation?.key} square />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {formatMessage({
                    id: 'title_colon',
                    defaultMessage: 'Title:  ',
                  })}

                  {isEdit ? (
                    <TextField
                      className="w-fit mt-0"
                      name="title"
                      required
                      label={formatMessage({
                        id: 'title',
                        defaultMessage: 'Title',
                      })}
                      hideLabel
                    />
                  ) : (
                    variation?.texts?.title
                  )}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {formatMessage({
                    id: 'subtitle_colon',
                    defaultMessage: 'Subtitle:  ',
                  })}
                  {isEdit ? (
                    <TextField
                      className="w-fit mt-0"
                      name="subtitle"
                      label={formatMessage({
                        id: 'subtitle',
                        defaultMessage: 'Subtitle',
                      })}
                      hideLabel
                    />
                  ) : (
                    variation?.texts?.subtitle
                  )}
                </p>
              </div>
              <div>
                {isEdit ? (
                  <div className=" right-2 top-5 flex space-x-2">
                    <button
                      onClick={() => setIsEdit(!isEdit)}
                      type="button"
                      className="bg-white rounded-md font-medium text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      {formatMessage({
                        id: 'cancel',
                        defaultMessage: 'Cancel',
                      })}
                    </button>
                    <span className="text-gray-300" aria-hidden="true">
                      |
                    </span>
                    <button
                      type="submit"
                      className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      {formatMessage({
                        id: 'save',
                        defaultMessage: 'Save',
                      })}
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <div onClick={() => setIsEdit(!isEdit)}>
                      <PencilAltIcon className="h-5 w-5 cursor-pointer text-indigo-400" />
                    </div>

                    <DeleteButton
                      onClick={() => onDelete(variation._id)}
                      className="ml-1 mr-1 border-white text-red-600 hover:text-red-900 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          </li>
        </div>
      </Form>
    </div>
  );
};

export default Variation;
