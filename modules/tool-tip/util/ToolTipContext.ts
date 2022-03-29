import { createContext } from 'react';

export type setToolTip = {
  // eslint-disable-next-line no-undef
  children: JSX.Element | string;
  options: { top?: number; left?: number };
};

const ToolTipContext = createContext({
  setToolTip: () => {
    throw new Error('No ModalContext/ModalWrapper ancestor found.');
  },
});

export default ToolTipContext;
