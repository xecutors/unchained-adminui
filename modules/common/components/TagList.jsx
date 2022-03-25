import { PlusIcon, TagIcon } from '@heroicons/react/outline';
import { useIntl } from 'react-intl';
import useModal from '../../modal/hooks/useModal';
import Badge from './Badge';
import Button from './Button';
import TagListForm from './TagListForm';

const TagList = ({ tags, meta }) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  return (
    <div className="flex gap-2 mr-auto ml-4 w-1/2">
      <span className="flex items-center">
        <TagIcon className="h-5 w-5 mr-auto text-indigo-600" />
      </span>
      <div className="flex flex-wrap gap-2 items-center">
        {tags ? (
          tags.map((tag) => (
            <span>
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
          text={
            <>
              <PlusIcon className="h-5 w-5" />
            </>
          }
          onClick={() =>
            setModal(
              <TagListForm
                tags={tags}
                meta={meta}
                onCancel={() => setModal('')}
              />,
            )
          }
        />
      </span>
    </div>
  );
};

export default TagList;
