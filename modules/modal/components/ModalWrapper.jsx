import React, { useState, useMemo } from 'react';

import Modal from './Modal';
import ModalContext from '../utils/ModalContext';

const ModalWrapper = ({ children }) => {
  const [modalChildren, setChildren] = useState(null);
  const [disableOkButton, setDisableOkButton] = useState(false);
  const [closeOnOutsideClick, setCloseOnOutsideClick] = useState(false);
  const hideModal = () => setChildren(null);
  const [onClose, setOnClose] = useState(() => hideModal);

  const setModal = (
    newModalChildren,
    {
      disableOkButton: newDisableOkButton = false,
      closeOnOutsideClick: newCloseOnOutsideClick = false,
    } = {},
  ) => {
    return new Promise((resolve) => {
      if (!newModalChildren) {
        resolve(true);
      }

      setDisableOkButton(newDisableOkButton);
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
        disableOkButton={disableOkButton}
        closeOnOutsideClick={closeOnOutsideClick}
      >
        {modalChildren}
      </Modal>
      <ModalContext.Provider value={ctx}>{children}</ModalContext.Provider>
    </>
  );
};

export default ModalWrapper;
