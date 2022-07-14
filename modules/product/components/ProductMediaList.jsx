import { useIntl } from 'react-intl';
import { Droppable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import NoData from '../../common/components/NoData';

import ProductMediaListItem from './ProductMediaListItem';

const ProductMediaList = ({ medias, selectedLocale, onDeleteMedia }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="rounded-md shadow dark:shadow-none lg:col-span-6 px-6 lg:px-0">
      <div className="mx-auto max-w-7xl overflow-hidden">
        <h2 className="sr-only">
          {formatMessage({
            id: 'product_media',
            defaultMessage: 'Product Media',
          })}
        </h2>

        <div className="flow-root">
          <Droppable droppableId="product-media" mode="standard">
            {(provided, snapshot) => (
              <ul
                className={classNames(
                  'space-y-4 p-5 rounded-md transition-[background-color] ease-in-out delay-200',
                  { 'bg-slate-100 dark:bg-slate-500': snapshot.isDraggingOver },
                )}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
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
                      id: 'media',
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
