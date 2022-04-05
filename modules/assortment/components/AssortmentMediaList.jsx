import { useIntl } from 'react-intl';
import { Droppable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import NoData from '../../common/components/NoData';
import AssortmentMediaListItem from './AssortmentMediaListItem';

const AssortmentMediaList = ({ medias, selectedLocale, onDeleteMedia }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="rounded lg:col-span-6">
      <div className="mx-auto max-w-7xl overflow-hidden">
        <h2 className="sr-only">
          {formatMessage({
            id: 'assortment_media',
            defaultMessage: 'Assortment Media',
          })}
        </h2>

        <div className="flow-root">
          <Droppable droppableId="assortment-media">
            {(provided, snapshot) => (
              <ul
                key={Date.now()}
                className={classNames(
                  'space-y-4 bg-white p-5 transition-[background-color] ease-in-out delay-200',
                  {
                    'bg-slate-100 rounded': snapshot.isDraggingOver,
                  },
                )}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {medias.length ? (
                  medias.map((media, index) => (
                    <AssortmentMediaListItem
                      key={media._id}
                      media={media}
                      locale={selectedLocale}
                      onDelete={onDeleteMedia}
                      index={index}
                    />
                  ))
                ) : (
                  <NoData
                    message={formatMessage({
                      id: 'media_message',
                      defaultMessage: 'Media',
                    })}
                  />
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );
};

export default AssortmentMediaList;
