import { useIntl } from 'react-intl';
import NoData from '../../common/components/NoData';

import ProductMediaListItem from './ProductMediaListItem';

const ProductMediaList = ({ medias, selectedLocale, onDeleteMedia }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="sm:px-15 rounded bg-white p-5 sm:col-span-6">
      <div className="mx-auto max-w-7xl overflow-hidden">
        <h2 className="sr-only">
          {formatMessage({
            id: 'product_media',
            defaultMessage: 'Product Media',
          })}
        </h2>

        <div className="flow-root">
          <ul className="space-y-4 divide-y divide-gray-200">
            {medias.length ? (
              medias.map((media) => (
                <ProductMediaListItem
                  key={media._id}
                  media={media}
                  locale={selectedLocale}
                  onDelete={onDeleteMedia}
                />
              ))
            ) : (
              <NoData message="Media" />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductMediaList;
