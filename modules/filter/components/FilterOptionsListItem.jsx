import { useIntl } from 'react-intl';
import { useState } from 'react';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import TextField from '../../forms/components/TextField';
import Form from '../../forms/components/Form';
import useForm from '../../forms/hooks/useForm';
import useUpdateFilterTexts from '../hooks/useUpdateFilterTexts';

const FilterOptionsListItem = ({ filter, onDelete, selectedLocale }) => {
  const { formatMessage } = useIntl();
  const [isEdit, setIsEdit] = useState(false);
  const { filterId } = filter;

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
      title: filter.texts.title,
      value: filter.value,
      subtitle: filter.texts.subtitle,
    },
  });

  return (
    <div
      key={filter.id}
      className="flex justify-between items-center border-gray-200 border-b last:border-none"
    >
      <Form form={form}>
        <div className="flex1 items-center1 flex-col1">
          <div className="lg:flex items-center lg:space-x-2">
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
                    Title: {filter.texts.title}
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
              <dd className="mt-1 py-1 flex text-sm text-gray-900 sm:mt-0">
                {isEdit ? (
                  <TextField
                    className="w-fit mt-0"
                    name="subtitle"
                    required
                    label={formatMessage({
                      id: 'subtitle',
                      defaultMessage: 'Subtitle',
                    })}
                    hideLabel
                  />
                ) : (
                  filter.texts.subtitle && (
                    <span className="flex-grow">
                      Subtitle: {filter.texts.subtitle}
                    </span>
                  )
                )}
              </dd>
            </div>
          </div>
          <div className="py-0 sm:py-1 flex space-x-2 items-center">
            {isEdit && (
              <dt className="text-sm font-medium text-gray-500">
                {formatMessage({
                  id: 'value',
                  defaultMessage: 'Value',
                })}
              </dt>
            )}
            <dd className="mt-1 py-1 flex text-sm text-gray-900 sm:mt-0">
              {isEdit ? (
                <TextField
                  className="w-full mt-0"
                  name="value"
                  required
                  label={formatMessage({
                    id: 'value',
                    defaultMessage: 'Value',
                  })}
                  hideLabel
                />
              ) : (
                <span className="flex-grow">Value: {filter.value}</span>
              )}
            </dd>
          </div>
        </div>
      </Form>
      <div className="pt-4 flex-shrink2-0 flex items-start space-x-4 relative">
        {isEdit ? (
          <div className="absolute right-2 top-5 flex space-x-2">
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
              <PencilAltIcon className="h-5 w-5 cursor-pointer text-red-400" />
            </div>
            <div onClick={onDelete}>
              <TrashIcon className="h-5 w-5 cursor-pointer text-red-400" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterOptionsListItem;
