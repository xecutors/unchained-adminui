import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import Form from '../../forms/components/Form';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import { preventDefault, stopPropagation } from '../data/miscellaneous';
import useDisplayImageInModal from '../utils/useDisplayImageInModal';
import DeleteButton from './DeleteButton';
import EditIcon from './EditIcon';
import SaveAndCancelButtons from './SaveAndCancelButtons';

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
  const [isDragStart, setIsDragStart] = useState(false);
  const [isDragEnd, setIsDragEnd] = useState(false);
  const [isDragEnter, setIsDragEnter] = useState(false);
  const [isDragLeave, setIsDragLeave] = useState(false);

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

  const handleDragStart = () => {
    setIsDragStart(true);
  };

  const handleDragEnd = () => {
    setIsDragStart(false);
    setIsDragEnd(true);
    setIsDragEnter(false);
  };

  const handleDragEnter = () => {
    setIsDragEnter(true);
    // setIsDragLeave(false);
  };

  const handleDragLeave = () => {
    setIsDragEnter(false);
    // setIsDragLeave(true);
  };

  const handleDragOver = (event) => {
    preventDefault(event);
    return false;
  };

  const handleDrop = (event) => {
    stopPropagation(event);
    return false;
  };

  return (
    <li
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      draggable="true"
      className={classNames('flex flex-wrap gap-4 bg-slate-100 cursor-move', {
        'opacity-40': isDragStart,
        'opacity-100': isDragEnd,
        'border-2 rounded-md border-dashed border-red-800': isDragEnter,
      })}
      key={media._id}
    >
      <div className="flex-1 basis-1/3">
        <a onClick={() => displayImageInModal({ url: media?.file?.url })}>
          <img
            src={media?.file?.url}
            alt={mediaText?.title || mediaText?.subtitle}
            className="h-36 w-36 flex-none rounded-md bg-slate-100 object-cover object-center"
          />
        </a>

        {media?.tags && (
          <div className="space-x-2">
            {media?.tags.map((tag, index) => (
              <span
                key={`${tag}${index + 1}`}
                className="rounded border bg-white px-1 text-sm font-light capitalize text-slate-900 shadow-sm"
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
              <h3 className="text-slate-900">
                {isEdit ? (
                  <TextField
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
              <p className="text-slate-900 sm:block">
                {isEdit ? (
                  <TextField
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

            {isEdit ? (
              <SaveAndCancelButtons
                className="justify-end"
                onCancel={() => onEdit(!isEdit)}
              />
            ) : (
              <button
                type={isEdit ? 'button' : 'submit'}
                onClick={(e) => {
                  stopPropagation(e);
                  onEdit(!isEdit);
                }}
              >
                <EditIcon />
              </button>
            )}
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
