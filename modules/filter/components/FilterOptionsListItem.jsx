import { useIntl } from 'react-intl';
import { useState } from 'react';

import TextField from '../../forms/components/TextField';
import Form from '../../forms/components/Form';
import useForm from '../../forms/hooks/useForm';
import useUpdateFilterTexts from '../hooks/useUpdateFilterTexts';
import DeleteButton from '../../common/components/DeleteButton';
import Badge from '../../common/components/Badge';
import EditIcon from '../../common/components/EditIcon';

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

  const onSubmit = async ({ title, value, subtitle }) => {
    await updateFilterTexts({
      filterId,
      filterOptionValue: value,
      texts: {
        locale: selectedLocale,
        title,
        subtitle,
      },
    });
    setIsEdit(false);
    return true;
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
      <div className="mt-2 flow-root ">
        <li className="py-2 px-2">
          <div className="flex items-center space-x-4">
            <span className="shrink grow-0 basis-1/3">
              <Badge
                text={option?.value}
                color="slate"
                square
                className="break-all"
              />
            </span>

            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-slate-900 dark:text-white">
                {isEdit ? (
                  <TextField
                    className="mt-0 rounded-sm py-0 px-2"
                    name="title"
                    required
                    label={formatMessage({
                      id: 'title',
                      defaultMessage: 'Title',
                    })}
                  />
                ) : (
                  option?.texts.title
                )}
              </div>
              <div className="truncate text-sm text-slate-500 dark:text-white">
                {isEdit ? (
                  <TextField
                    className="mt-0 rounded-sm py-0 px-2"
                    name="subtitle"
                    label={formatMessage({
                      id: 'subtitle',
                      defaultMessage: 'Subtitle',
                    })}
                  />
                ) : (
                  option?.texts.subtitle && option?.texts.subtitle
                )}
              </div>
            </div>

            <div>
              {isEdit ? (
                <div className=" right-2 top-5 flex flex-col gap-2">
                  <button
                    onClick={() => setIsEdit(!isEdit)}
                    type="button"
                    className="rounded-md font-medium text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    {formatMessage({
                      id: 'cancel',
                      defaultMessage: 'Cancel',
                    })}
                  </button>
                  <button
                    type="submit"
                    className="rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    {formatMessage({
                      id: 'save',
                      defaultMessage: 'Save',
                    })}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div onClick={() => setIsEdit(!isEdit)}>
                    <EditIcon />
                  </div>

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
