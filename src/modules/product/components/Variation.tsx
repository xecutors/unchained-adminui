import classNames from 'classnames';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import EditIcon from '../../common/components/EditIcon';
import Form from '../../forms/components/Form';
import TextField from '../../forms/components/TextField';
import useForm, { OnSubmitType } from '../../forms/hooks/useForm';
import useUpdateProductVariationTexts from '../hooks/useUpdateProductVariationTexts';

const Variation = ({ type, variation, selectedLocale, onDelete }) => {
  const { updateProductVariationTexts } = useUpdateProductVariationTexts();
  const [isEdit, setIsEdit] = useState(false);
  const { formatMessage } = useIntl();

  const onSubmit: OnSubmitType = async ({ title, subtitle }) => {
    await updateProductVariationTexts({
      productVariationId: variation._id,
      texts: [{ title, subtitle, locale: selectedLocale || 'de' }],
    });
    return { success: true };
  };

  const form = useForm({
    submit: onSubmit,
    initialValues: {
      title: variation?.texts?.title,
      subtitle: variation?.texts?.subtitle,
    },
  });

  return (
    <Form
      form={form}
      className="variation-update-form"
      data-variationid={variation._id}
    >
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
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                onKeyUp={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
              >
                <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-200">
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
                <p className="truncate text-sm font-normal text-slate-500 dark:text-slate-200 pink:text-pink-500">
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
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                onKeyUp={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
              >
                {isEdit ? (
                  <div className="flex space-x-2 py-2">
                    <button
                      onClick={() => setIsEdit(!isEdit)}
                      type="button"
                      className="rounded-md pl-2 pr-2 bg-white font-medium text-rose-500 hover:text-rose-600 focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      {formatMessage({
                        id: 'cancel',
                        defaultMessage: 'Cancel',
                      })}
                    </button>
                    <span className="text-slate-300" aria-hidden="true">
                      |
                    </span>
                    <button
                      onClick={() => {
                        form.formik.submitForm();
                        setIsEdit(false);
                      }}
                      type="submit"
                      className="rounded-md pl-2 pr-2 bg-white font-medium text-slate-950 hover:text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
                      <EditIcon />
                    </div>

                    <DeleteButton
                      onClick={() => onDelete(variation._id)}
                      className="ml-1 mr-1 "
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
