import { useIntl } from 'react-intl';
import { Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import classNames from 'classnames';
import NoData from '../../common/components/NoData';
import AssortmentMediaListItem from './AssortmentMediaListItem';

const AssortmentMediaList = ({ medias, selectedLocale, onDeleteMedia }) => {
  const { formatMessage } = useIntl();
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  return (
    <div
      className={classNames(
        'rounded bg-white p-5 lg:col-span-6 transition-[background-color] ease-in-out delay-200',
        {
          'bg-slate-100': isDraggingOver,
        },
      )}
    >
      <div className="mx-auto max-w-7xl overflow-hidden">
        <h2 className="sr-only">
          {formatMessage({
            id: 'assortment_media',
            defaultMessage: 'Assortment Media',
          })}
        </h2>

        <div className="flow-root">
          <Droppable droppableId="product-media">
            {(provided, snapshot) => (
              <ul
                key={Date.now()}
                className="space-y-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {setIsDraggingOver(snapshot.isDraggingOver)}
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
              </ul>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );
};

export default AssortmentMediaList;
