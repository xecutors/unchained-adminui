import { useIntl } from 'react-intl';
import NoData from '../../common/components/NoData';
import AssortmentMediaListItem from './AssortmentMediaListItem';

const AssortmentMediaList = ({ medias, selectedLocale, onDeleteMedia }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="rounded bg-white p-5 lg:col-span-6 sm:p-0">
      <div className="mx-auto max-w-7xl overflow-hidden">
        <h2 className="sr-only">
          {formatMessage({
            id: 'assortment_media',
            defaultMessage: 'Assortment Media',
          })}
        </h2>

        <div className="flow-root">
          <ul className="space-y-4 divide-y divide-slate-200">
            {medias.length ? (
              medias.map((media) => (
                <AssortmentMediaListItem
                  key={media._id}
                  media={media}
                  locale={selectedLocale}
                  onDelete={onDeleteMedia}
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
        </div>
      </div>
    </div>
  );
};

export default AssortmentMediaList;
