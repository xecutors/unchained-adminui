import Image from 'next/image';
import useModal from '../../modal/hooks/useModal';
import defaultNextImageLoader from './defaultNextImageLoader';

const useDisplayImageInModal = () => {
  const { setModal } = useModal();
  const displayImageInModal = ({ url, closeOnOutsideClick = true }) => {
    setModal(
      <div className="flex h-96 w-96">
        <Image
          src={url}
          alt=""
          className="absolute top-0 left-0 -z-10 h-full w-full grow object-contain object-center"
          loader={defaultNextImageLoader}
          placeholder="blur"
          layout="fill"
          blurDataURL="/no-image.jpg"
        />
      </div>,
      { closeOnOutsideClick },
    );
  };
  return {
    displayImageInModal,
  };
};

export default useDisplayImageInModal;
