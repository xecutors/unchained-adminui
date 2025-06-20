import { PencilSquareIcon, TagIcon } from '@heroicons/react/24/outline';

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
        <TagIcon className="mr-auto h-5 w-5 text-slate-950" />
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {defaultValue?.length ? (
          defaultValue.map((tag, key) => (
            <span key={`${tag}${key + 1}`}>
              <Badge text={tag} color="slate" />
            </span>
          ))
        ) : (
          <span>
            <Badge
              text={formatMessage({ id: 'no_tag', defaultMessage: 'No Tag' })}
              color="slate"
            />
          </span>
        )}
      </div>
      {enableEdit && (
        <button
          id="add_tag"
          type="button"
          className="inline-flex items-center justify-center h-8 w-8 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
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
          <PencilSquareIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default TagList;
