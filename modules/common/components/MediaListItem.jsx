import classNames from 'classnames';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { Draggable } from 'react-beautiful-dnd';
import Form from '../../forms/components/Form';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import { stopPropagation } from '../data/miscellaneous';
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
  index,
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
    <Draggable draggableId={media._id} index={index}>
      {(provided, snapshot) => (
        <li
          key={media._id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          draggable="true"
          className={classNames(
            'flex flex-wrap gap-4 rounded bg-white hover:cursor-move',
            {
              'bg-slate-100 border-2 rounded': snapshot.isDragging,
            },
          )}
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
                {media?.tags.map((tag, i) => (
                  <span
                    key={`${tag}${i + 1}`}
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
      )}
    </Draggable>
  );
};

export default MediaListItem;
