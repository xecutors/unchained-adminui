import { useIntl } from 'react-intl';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import NoData from '../../common/components/NoData';

import ProductMediaListItem from './ProductMediaListItem';

const ProductMediaList = ({ medias, selectedLocale, onDeleteMedia, items }) => {
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

        <div className="flow-root dark:bg-slate-800">
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <ul className="space-y-4 p-5 rounded-md transition-[background-color] ease-in-out delay-200 ">
              {medias.length ? (
                items.map((id) => {
                  const media = Object.values(medias).find(
                    (md) => md._id === id,
                  );
                  return (
                    <ProductMediaListItem
                      id={id}
                      key={media._id}
                      media={media}
                      locale={selectedLocale}
                      onDelete={onDeleteMedia}
                    />
                  );
                })
              ) : (
                <NoData
                  message={formatMessage({
                    id: 'media',
                    defaultMessage: 'Media',
                  })}
                />
              )}
            </ul>
          </SortableContext>
        </div>
      </div>
    </div>
  );
};

export default ProductMediaList;
