import { useIntl } from 'react-intl';
import { stopPropagation } from '../../common/data/miscellaneous';
import useModal from '../../modal/hooks/useModal';
import useTranslatedProductMediaTexts from '../hooks/useTranslatedProductMediaTexts';

const ProductMediaListItem = ({ media, isEdit, onEdit, onDelete, locale }) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { translatedMediaTexts } = useTranslatedProductMediaTexts({
    productMediaId: media._id,
  });
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
  const mediaText =
    translatedMediaTexts?.find((text) => text.locale === locale) || {};
  return (
    <li className="py-6 flex space-x-6" key={media._id}>
      <a onClick={() => openImageModal(media?.file?.url)}>
        <img
          src={media?.file?.url}
          alt={mediaText?.texts?.title || mediaText?.texts?.subtitle}
          className="flex-none w-36 h-36 object-center object-cover bg-gray-100 rounded-md"
        />
      </a>
      <div className="flex-auto">
        <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
          <div className="flex-auto text-sm font-medium space-y-1">
            <h3 className="text-gray-900">{mediaText?.texts?.title}</h3>
            <p className="text-gray-900">{mediaText?.texts?.subtitle}</p>
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
              type={isEdit ? 'submit' : 'button'}
              onClick={(e) => {
                stopPropagation(e);
                onEdit(!isEdit);
              }}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              {!isEdit
                ? formatMessage({ id: 'edit', defaultMessage: 'Edit' })
                : formatMessage({ id: 'save', defaultMessage: 'Save' })}
            </button>
            <div className="flex border-l border-gray-300 pl-4">
              <button
                onClick={async (e) => {
                  stopPropagation(e);
                  onDelete(media._id);
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
  );
};

export default ProductMediaListItem;
