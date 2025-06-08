import { useIntl } from 'react-intl';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import NoData from '../../common/components/NoData';
import AssortmentMediaListItem from './AssortmentMediaListItem';
import { IAssortmentMedia } from '../../../gql/types';

const AssortmentMediaList = ({
  medias,
  selectedLocale,
  onDeleteMedia,
  items,
}) => {
  const { formatMessage } = useIntl();

  return (
    <div className="rounded-md shadow-sm dark:shadow-none lg:col-span-6">
      <div className="mx-auto max-w-7xl overflow-hidden">
        <h2 className="sr-only">
          {formatMessage({
            id: 'assortment_media',
            defaultMessage: 'Assortment Media',
          })}
        </h2>

        <div className="flow-root">
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <ul className="space-y-4 p-5 transition-[background-color] ease-in-out delay-200">
              {medias.length ? (
                items.map((id) => {
                  const media = Object.values(
                    medias as IAssortmentMedia[],
                  ).find((md) => md._id === id);

                  return (
                    <AssortmentMediaListItem
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

export default AssortmentMediaList;
