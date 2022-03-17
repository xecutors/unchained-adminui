import useModal from '../../modal/hooks/useModal';

const useDisplayImageInModal = () => {
  const { setModal } = useModal();
  const displayImageInModal = ({ url, closeOnOutsideClick = true }) => {
    setModal(
      <div className="flex h-96 w-96">
        <img
          src={url}
          alt=""
          className="absolute top-0 left-0 -z-10 h-full w-full grow object-contain object-center"
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
