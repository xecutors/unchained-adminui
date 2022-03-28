import { PencilAltIcon, TagIcon } from '@heroicons/react/outline';

import { useIntl } from 'react-intl';
import useModal from '../../modal/hooks/useModal';

import Badge from './Badge';
import Button from './Button';
import TagListForm from './TagListForm';

const TagList = ({ defaultValue, onSubmit }) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();

  return (
    <div className="mr-auto ml-4 flex w-1/2 gap-2">
      <span className="flex items-center">
        <TagIcon className="mr-auto h-5 w-5 text-indigo-600" />
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {defaultValue?.length ? (
          defaultValue.map((tag, key) => (
            <span key={`${tag}${key + 1}`}>
              <Badge text={tag} color="indigo" />
            </span>
          ))
        ) : (
          <span>
            <Badge
              text={formatMessage({ id: 'no_tag', defaultMessage: 'No Tag' })}
              color="indigo"
            />
          </span>
        )}
      </div>
      <span className="flex items-center">
        <Button
          className="py-0 px-0"
          text={<PencilAltIcon className="h-5 w-5" />}
          onClick={() =>
            setModal(
              <TagListForm
                tags={defaultValue || []}
                onCancel={() => setModal('')}
                onSubmit={onSubmit}
              />,
            )
          }
        />
      </span>
    </div>
  );
};

export default TagList;
