import { useState } from 'react';
import { useIntl } from 'react-intl';
import { stopPropagation } from '../../common/data/miscellaneous';
import useModal from '../../modal/hooks/useModal';

const MediaList = ({ medias, selectedLocale, onDeleteMedia }) => {
  const { formatMessage } = useIntl();
  const [isEditing, setIsEditing] = useState(false);
  const { setModal } = useModal();

  const openImageModal = (url) => {
    setModal(
      <div className="flex h-96 w-96">
        <img
          src={url}
          alt=""
          className="absolute top-0 left-0 -z-10 h-full w-full grow object-contain object-center"
        />
      </div>,
      { closeOnOutsideClick: true },
    );
  };
  return (
    <div className="sm:px-15 py-5 px-5">
      <div className="mx-auto max-w-7xl overflow-hidden">
        <h2 className="sr-only">
          {formatMessage({
            id: 'product_media',
            defaultMessage: 'Product Media',
          })}
        </h2>

        <div className="flow-root">
          <ul className="-my-6 divide-y divide-gray-200">
            {medias.map((media) => (
              <li className="py-6 flex space-x-6" key={media._id}>
                <a onClick={() => openImageModal(media?.file?.url)}>
                  <img
                    src={media?.file?.url}
                    alt={media?.texts?.title || media?.texts?.title}
                    className="flex-none w-36 h-36 object-center object-cover bg-gray-100 rounded-md"
                  />
                </a>
                <div className="flex-auto">
                  <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                    <div className="flex-auto text-sm font-medium space-y-1">
                      <h3 className="text-gray-900">{media?.texts?.title}</h3>
                      <p className="text-gray-900">{media?.texts?.subtitle}</p>
                      <p className="hidden text-gray-500 sm:block">
                        {media?.texts?.locale}
                      </p>
                      <p className="hidden text-gray-500 sm:block">S</p>
                      {media?.tags &&
                        media?.tags.map((tag, index) => (
                          <span
                            key={`${tag}${index + 1}`}
                            className="rounded border border-sky-400 bg-white px-1 text-xs font-light capitalize text-gray-900"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                    <div className="flex-none flex space-x-4">
                      <button
                        type="button"
                        onClick={(e) => {
                          stopPropagation(e);
                          setIsEditing(true);
                        }}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
                      </button>
                      <div className="flex border-l border-gray-300 pl-4">
                        <button
                          onClick={async (e) => {
                            stopPropagation(e);
                          }}
                          type="button"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {formatMessage({
                            id: 'delete',
                            defaultMessage: 'Delete',
                          })}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MediaList;
