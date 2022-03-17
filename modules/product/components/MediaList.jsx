import { useIntl } from 'react-intl';
import useModal from '../../modal/hooks/useModal';

const MediaList = ({ medias }) => {
  const { formatMessage } = useIntl();
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

        <div className=" grid grid-cols-1 gap-4 border-gray-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {medias.map((media) => (
            <div
              key={media._id}
              className="group relative rounded-lg border border-gray-200"
            >
              <div
                onClick={() => openImageModal(media?.file?.url)}
                className="aspect-w-1 aspect-h-1  overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75"
              >
                <img
                  src={media?.file?.url}
                  alt={media?.texts?.title || media?.texts?.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              {media?.tags && (
                <div className="absolute bottom-0 left-0 z-10 text-center">
                  <div className="flex flex-wrap items-center gap-1 pb-1 pl-1">
                    {media?.tags.map((tag) => (
                      <span className="rounded border border-sky-400 bg-white px-1 text-xs font-light capitalize text-gray-900">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaList;
