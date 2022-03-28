import { createContext } from 'react';

// const position = {
//   top: 0,
//   left: 0,
// };

const setToolTip = {
  children: '' || {},
  option: {},
};

const ToolTipContext = createContext({ setToolTip });

export default ToolTipContext;
