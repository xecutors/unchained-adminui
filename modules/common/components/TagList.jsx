import { PencilAltIcon, TagIcon } from '@heroicons/react/outline';
import { useRef } from 'react';

import { useIntl } from 'react-intl';
import useModal from '../../modal/hooks/useModal';
import useToolTip from '../../tool-tip/hooks/useToolTip';

import Badge from './Badge';
import Button from './Button';
import TagListForm from './TagListForm';

const TagList = ({ defaultValue, onSubmit, enableEdit }) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { setToolTip } = useToolTip();
  const container = useRef(null);

  const tooltip = () => {
    const { x, y, height } = container.current.getBoundingClientRect();
    console.log(x, y - height, height);
    setToolTip(<span>assortment</span>, { top: y, left: x });
  };

  return (
    <div className="mr-auto ml-4 flex w-1/2 gap-2">
      <span className="flex items-center">
        <button
          type="button"
          className="relative hover:cursor-pointer"
          ref={container}
          onClick={tooltip}
        >
          <TagIcon className="mr-auto h-5 w-5 text-indigo-600"> </TagIcon>
        </button>
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
        <Button
          className="h-12 w-12 rounded-full"
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
      )}
    </div>
  );
};

export default TagList;
