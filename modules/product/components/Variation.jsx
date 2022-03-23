import { PencilAltIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import { stopPropagationAndPreventDefault } from '../../common/data/miscellaneous';

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
    return true;
  };

  const form = useForm({
    submit: onSubmit,
    initialValues: {
      title: variation?.texts?.title,
      subtitle: variation?.texts?.subtitle,
    },
  });

  return (
    <Form form={form}>
      <div className="flow-root ">
        <li className="list-none">
          <div
            className="grid grid-cols-8 items-center justify-items-start "
            tabIndex={-1}
          >
            <div className="col-span-2 flex  flex-col text-left ">
              <div>
                <Badge
                  text={type}
                  square
                  color="cyan"
                  className="justify-start"
                />
              </div>
              <div className="mt-1 font-bold">{variation?.key}</div>
            </div>

            <div
              className={classNames(
                'col-span-6 flex w-full items-center justify-between',
                {
                  'flex-col': isEdit,
                },
              )}
            >
              <div
                className="space-y-1"
                onClick={stopPropagationAndPreventDefault}
                onKeyUp={stopPropagationAndPreventDefault}
              >
                <p className="truncate text-sm font-medium text-gray-900">
                  {isEdit ? (
                    <TextField
                      className="mt-0 py-1"
                      name="title"
                      required
                      label={formatMessage({
                        id: 'title',
                        defaultMessage: 'Title',
                      })}
                    />
                  ) : (
                    variation?.texts?.title
                  )}
                </p>
                <p className="truncate text-sm font-normal text-gray-500">
                  {isEdit ? (
                    <TextField
                      className="mt-0 py-1"
                      name="subtitle"
                      label={formatMessage({
                        id: 'subtitle',
                        defaultMessage: 'Subtitle',
                      })}
                    />
                  ) : (
                    variation?.texts?.subtitle
                  )}
                </p>
              </div>

              <div
                className={classNames('ml-auto', { 'mx-auto': isEdit })}
                onClick={stopPropagationAndPreventDefault}
                onKeyUp={stopPropagationAndPreventDefault}
              >
                {isEdit ? (
                  <div className="flex space-x-2 py-2">
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
                    <span className="text-gray-300" aria-hidden="true">
                      |
                    </span>
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
                      onClick={() => onDelete(variation._id)}
                      className="ml-1 mr-1 cursor-pointer border-white text-red-600 hover:text-red-900"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </li>
      </div>
    </Form>
  );
};

export default Variation;
