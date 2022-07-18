import { PencilAltIcon, TagIcon } from '@heroicons/react/outline';
import { useIntl } from 'react-intl';

import useModal from '../../modal/hooks/useModal';
import Badge from './Badge';
import TagListForm from './TagListForm';

const TagList = ({ defaultValue, onSubmit, enableEdit }) => {
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
      {enableEdit && (
        <button
          type="button"
          id="add_tag"
          className="h-12 w-12 rounded-full inline-flex items-center border border-transparent bg-indigo-500 px-3 py-5 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          onClick={() =>
            setModal(
              <TagListForm
                tags={defaultValue || []}
                onCancel={() => setModal('')}
                onSubmit={onSubmit}
              />,
            )
          }
        >
          <PencilAltIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default TagList;
