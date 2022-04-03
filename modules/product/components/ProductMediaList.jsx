import { useIntl } from 'react-intl';
import { Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import classNames from 'classnames';
import NoData from '../../common/components/NoData';

import ProductMediaListItem from './ProductMediaListItem';

const ProductMediaList = ({ medias, selectedLocale, onDeleteMedia }) => {
  const { formatMessage } = useIntl();
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  return (
    <div
      className={classNames(
        'rounded p-5 bg-white lg:col-span-6 transition-[background-color] ease-in-out delay-200',
        {
          'bg-slate-100': isDraggingOver,
        },
      )}
    >
      <div className="mx-auto max-w-7xl overflow-hidden">
        <h2 className="sr-only">
          {formatMessage({
            id: 'product_media',
            defaultMessage: 'Product Media',
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
                    <ProductMediaListItem
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
                      id: 'message_media',
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

export default ProductMediaList;
