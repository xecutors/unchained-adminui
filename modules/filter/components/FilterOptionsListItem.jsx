import { useIntl } from 'react-intl';
import { useState } from 'react';
import { PencilAltIcon } from '@heroicons/react/solid';
import TextField from '../../forms/components/TextField';
import Form from '../../forms/components/Form';
import useForm from '../../forms/hooks/useForm';
import useUpdateFilterTexts from '../hooks/useUpdateFilterTexts';
import DeleteButton from '../../common/components/DeleteButton';
import Badge from '../../common/components/Badge';

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
      <div>
        <div className="flow-root mt-2">
          <li className="py-2 px-2">
            <div className="flex items-center space-x-4">
              <Badge text={option?.value} color="gray" />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Title:
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
                    option?.texts.title
                  )}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  Subtitle:
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
                    option?.texts.subtitle && option?.texts.subtitle
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
                      onClick={onDelete}
                      className="ml-1 mr-1 border-white text-red-600 hover:text-red-900 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          </li>
        </div>
      </div>
    </Form>
  );
};

export default FilterOptionsListItem;

/* 
<div className="flex justify-between items-center border-gray-200 border-b last:border-none">
<div className="py-0 sm:py-1 flex space-x-2 items-center">
  <dd className="mt-1 py-1 text-sm text-gray-900 sm:mt-0">
    <span>Value: {option?.value}</span>
  </dd>
</div>
<div className="items-center">
  <div className="py-0 sm:py0-5 flex space-x-2 items-center">
    {isEdit && (
      <dt className="text-sm font-medium text-gray-500">
        {formatMessage({
          id: 'title',
          defaultMessage: 'Title',
        })}
      </dt>
    )}
    <dd className="mt-1 py-0 flex text-sm text-gray-900 sm:mt-0">
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
        <span className="flex-grow text-lg">
          Title: {option?.texts.title}
        </span>
      )}
    </dd>
  </div>
  <div className="py-0 sm:py-1 flex space-x-2 items-center">
    {isEdit && (
      <dt className="text-sm font-medium text-gray-500">
        {formatMessage({
          id: 'subtitle',
          defaultMessage: 'Subtitle',
        })}
      </dt>
    )}
    <dd className="mt-1 py-1  text-sm text-gray-900 sm:mt-0">
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
        option?.texts.subtitle && (
          <span className="flex-grow">
            Subtitle: {option?.texts.subtitle}
          </span>
        )
      )}
    </dd>
  </div>
</div>
<div className="pt-4  flex items-end space-x-4 relative">
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
        onClick={onDelete}
        className="ml-1 mr-1 border-white text-red-600 hover:text-red-900 cursor-pointer"
      />
    </div>
  )}
</div>
<FormErrors />
</div> */
