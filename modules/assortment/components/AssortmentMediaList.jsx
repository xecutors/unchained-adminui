import { useState } from 'react';
import { useIntl } from 'react-intl';
import AssortmentMediaListItem from './AssortmentMediaListItem';

const AssortmentMediaList = ({ medias, selectedLocale, onDeleteMedia }) => {
  const { formatMessage } = useIntl();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="sm:px-15 p-5 sm:order-1 sm:col-span-6">
      <div className="mx-auto max-w-7xl overflow-hidden">
        <h2 className="sr-only">
          {formatMessage({
            id: 'assortment_media',
            defaultMessage: 'Assortment Media',
          })}
        </h2>

        <div className="flow-root">
          <ul className="-my-6 divide-y divide-gray-200">
            {medias.map((media) => (
              <AssortmentMediaListItem
                key={media._id}
                media={media}
                locale={selectedLocale}
                isEdit={isEditing}
                onEdit={setIsEditing}
                onDelete={onDeleteMedia}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AssortmentMediaList;
