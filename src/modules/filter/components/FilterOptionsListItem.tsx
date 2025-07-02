import { useIntl } from 'react-intl';
import { useState } from 'react';

import TextField from '../../forms/components/TextField';
import Form from '../../forms/components/Form';
import useForm, { OnSubmitType } from '../../forms/hooks/useForm';
import useUpdateFilterTexts from '../hooks/useUpdateFilterTexts';
import DeleteButton from '../../common/components/DeleteButton';
import Badge from '../../common/components/Badge';
import EditIcon from '../../common/components/EditIcon';
import Button from '../../common/components/Button';

const FilterOptionsListItem = ({
  filterId,
  option,
  onDelete,
  selectedLocale,
}) => {
  const { formatMessage } = useIntl();
  const [isEdit, setIsEdit] = useState(false);
  const successMessage = formatMessage({
    id: 'saved',
    defaultMessage: 'Saved',
  });

  const { updateFilterTexts } = useUpdateFilterTexts();
  const onSubmit: OnSubmitType = async ({ title, value, subtitle }) => {
    await updateFilterTexts({
      filterId,
      filterOptionValue: value,
      texts: [
        {
          locale: selectedLocale,
          title,
          subtitle,
        },
      ],
    });
    setIsEdit(false);
    return { success: true };
  };

  const form = useForm({
    submit: onSubmit,
    successMessage,
    initialValues: {
      title: '',
      subtitle: '',
      ...option,
      ...option?.texts,
    },
  });

  return (
    <Form form={form}>
      <div className="mt-2">
        <li className="py-2 px-2">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center flex-wrap gap-3">
              <span className="grow-1">
                <Badge
                  text={option?.value}
                  color="slate"
                  square
                  className="break-all"
                />
              </span>

              <div className="flex flex-wrap gap-3">
                <div className="truncate text-sm text-slate-900 dark:text-slate-200">
                  {isEdit ? (
                    <TextField
                      className="mt-0 mb-1 rounded-xs py-0 px-2"
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
                </div>
                <div className="truncate text-sm text-slate-500 dark:text-slate-200">
                  {isEdit ? (
                    <TextField
                      className="mt-0 mb-1 rounded-xs py-0 px-2"
                      name="subtitle"
                      label={formatMessage({
                        id: 'subtitle',
                        defaultMessage: 'Subtitle',
                      })}
                    />
                  ) : (
                    option?.texts?.subtitle && option?.texts?.subtitle
                  )}
                </div>
              </div>
            </div>
            <div>
              {isEdit ? (
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsEdit(!isEdit)}
                    type="button"
                    className=" inline-flex w-full justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-base font-medium text-slate-700 shadow-xs hover:bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {formatMessage({
                      id: 'cancel',
                      defaultMessage: 'Cancel',
                    })}
                  </button>
                  <button
                    disabled={!form.formik.isValid}
                    type="submit"
                    className="inline-flex cursor-pointer justify-center rounded-sm border px-4 py-2 text-center text-sm font-medium leading-5 shadow-sm hover:shadow-md focus:ring-slate-800 dark:focus:ring-slate-400 bg-slate-800 dark:bg-slate-600 text-white hover:bg-slate-900 dark:hover:bg-slate-500 focus:outline-hidden focus:ring-2 focus:ring-offset-2 border-transparent"
                  >
                    {formatMessage({
                      id: 'save',
                      defaultMessage: 'Save',
                    })}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEdit(!isEdit)}
                    role="button"
                    aria-label={formatMessage({
                      id: 'edit',
                      defaultMessage: 'Edit',
                    })}
                  >
                    <EditIcon />
                  </button>
                  b
                  <DeleteButton
                    onClick={() => onDelete(option?.value)}
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

export default FilterOptionsListItem;
