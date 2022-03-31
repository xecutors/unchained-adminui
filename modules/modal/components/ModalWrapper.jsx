import React, { useState, useMemo } from 'react';

import Modal from './Modal';
import ModalContext from '../utils/ModalContext';

const ModalWrapper = ({ children }) => {
  const [modalChildren, setChildren] = useState(null);
  const [closeOnOutsideClick, setCloseOnOutsideClick] = useState(false);
  const hideModal = () => setChildren(null);
  const [className, setClassName] = useState('');
  const [onClose, setOnClose] = useState(() => hideModal);

  const setModal = (
    newModalChildren,
    {
      closeOnOutsideClick: newCloseOnOutsideClick = false,
      containerClassName,
    } = {},
  ) => {
    return new Promise((resolve) => {
      if (!newModalChildren) {
        resolve(true);
      }
      setClassName(containerClassName);
      setCloseOnOutsideClick(newCloseOnOutsideClick);
      setChildren(() => newModalChildren);
      setOnClose(() => () => {
        hideModal();
        resolve(true);
      });
    });
  };

  const ctx = useMemo(() => ({ setModal }), []);

  return (
    <>
      <Modal
        visible={!!modalChildren}
        onClose={onClose}
        closeOnOutsideClick={closeOnOutsideClick}
        containerClassName={className}
      >
        {modalChildren}
      </Modal>
      <ModalContext.Provider value={ctx}>{children}</ModalContext.Provider>
    </>
  );
};

export default ModalWrapper;
