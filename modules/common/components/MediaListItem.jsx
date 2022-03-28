import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import { stopPropagation } from '../data/miscellaneous';
import useDisplayImageInModal from '../utils/useDisplayImageInModal';
import DeleteButton from './DeleteButton';

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
    <li className="flex flex-wrap gap-4" key={media._id}>
      <div className="flex-1 basis-1/3">
        <a onClick={() => displayImageInModal({ url: media?.file?.url })}>
          <img
            src={media?.file?.url}
            alt={mediaText?.title || mediaText?.subtitle}
            className="h-36 w-36 flex-none rounded-md bg-gray-100 object-cover object-center"
          />
        </a>

        {media?.tags && (
          <div className="space-x-2">
            {media?.tags.map((tag, index) => (
              <span
                key={`${tag}${index + 1}`}
                className="rounded border bg-white px-1 text-sm font-light capitalize text-gray-900 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="my-auto flex-1 basis-1/3">
        <Form form={form}>
          <div className="space-y-2 sm:flex sm:flex-col sm:items-start sm:justify-between">
            <div className="flex flex-auto flex-col justify-center space-y-1 text-sm font-medium">
              <h3 className="text-gray-900">
                {isEdit ? (
                  <TextField
                    className="mt-0 px-2 py-0"
                    name="title"
                    label={formatMessage({
                      id: 'title',
                      defaultMessage: 'Title',
                    })}
                  />
                ) : (
                  <>
                    <span>
                      {formatMessage({
                        id: 'media_title',
                        defaultMessage: 'Title:',
                      })}
                    </span>
                    <span className="ml-2">{mediaText?.title}</span>
                  </>
                )}
              </h3>
              <p className="text-gray-900 sm:block">
                {isEdit ? (
                  <TextField
                    className="mt-0 px-2 py-0"
                    name="subtitle"
                    label={formatMessage({
                      id: 'subtitle',
                      defaultMessage: 'Subtitle',
                    })}
                  />
                ) : (
                  <>
                    <span>
                      {formatMessage({
                        id: 'media_subtitle',
                        defaultMessage: 'Subtitle:',
                      })}
                    </span>
                    <span className="ml-2">{mediaText?.subtitle}</span>
                  </>
                )}
              </p>
            </div>
            <div className="flex flex-none space-x-4 self-start">
              {isEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(!isEdit)}
                  className="pr-4 pl-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {formatMessage({ id: 'cancel', defaultMessage: 'Cancel' })}
                </button>
              )}
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
            </div>
          </div>
        </Form>
      </div>
      <span className="flex items-start ">
        <DeleteButton
          className="mt-2 mr-2"
          onClick={async (e) => {
            stopPropagation(e);
            onDelete(media._id);
          }}
        />
      </span>
    </li>
  );
};

export default MediaListItem;
