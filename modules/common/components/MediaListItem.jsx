import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import { stopPropagation } from '../data/miscellaneous';
import useDisplayImageInModal from '../utils/useDisplayImageInModal';

const MediaListItem = ({
  media,
  mediaText,
  onEdit,
  isEdit,
  onDelete,
  onUpdate,
}) => {
  const { formatMessage } = useIntl();
  const { displayImageInModal } = useDisplayImageInModal();

  const successMessage = formatMessage({
    id: 'media_updated',
    defaultMessage: 'Media updated',
  });

  const form = useForm({
    submit: onUpdate,
    successMessage,
    initialValues: {
      title: mediaText.title || '',
      subtitle: mediaText.subTitle || '',
    },
  });

  useEffect(() => {
    if (mediaText) form.formik.setValues(mediaText);
  }, [mediaText]);

  return (
    <li className="py-6 flex space-x-6" key={media._id}>
      <a onClick={() => displayImageInModal(media?.file?.url)}>
        <img
          src={media?.file?.url}
          alt={mediaText?.title || mediaText?.subtitle}
          className="flex-none w-36 h-36 object-center object-cover bg-gray-100 rounded-md"
        />
      </a>

      <div className="flex-auto">
        <Form form={form}>
          <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
            <div className="flex-auto text-sm font-medium space-y-1">
              <h3 className="text-gray-900">
                {isEdit ? (
                  <TextField
                    name="title"
                    label={formatMessage({
                      id: 'title',
                      defaultMessage: 'Title',
                    })}
                  />
                ) : (
                  mediaText?.title
                )}
              </h3>
              <p className="text-gray-900 sm:block">
                {isEdit ? (
                  <TextField
                    name="subtitle"
                    label={formatMessage({
                      id: 'subtitle',
                      defaultMessage: 'Subtitle',
                    })}
                  />
                ) : (
                  mediaText?.subtitle
                )}
              </p>
              <p className="hidden text-gray-500 sm:block" />

              {media?.tags &&
                media?.tags.map((tag, index) => (
                  <span
                    key={`${tag}${index + 1}`}
                    className="rounded border border-sky-400 bg-white px-1 text-xs font-light capitalize text-gray-900"
                  >
                    {tag}
                  </span>
                ))}
            </div>
            <div className="flex-none flex space-x-4">
              <button
                type={isEdit ? 'button' : 'submit'}
                onClick={(e) => {
                  stopPropagation(e);
                  onEdit(!isEdit);
                }}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {!isEdit
                  ? formatMessage({ id: 'edit', defaultMessage: 'Edit' })
                  : formatMessage({ id: 'save', defaultMessage: 'Save' })}
              </button>
              <div className="flex border-l border-gray-300 pl-4">
                <button
                  onClick={async (e) => {
                    stopPropagation(e);
                    onDelete(media._id);
                  }}
                  type="button"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {formatMessage({
                    id: 'delete',
                    defaultMessage: 'Delete',
                  })}
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </li>
  );
};

export default MediaListItem;
