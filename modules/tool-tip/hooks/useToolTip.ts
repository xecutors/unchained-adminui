import { useContext } from 'react';
import ToolTipContext from '../util/ToolTipContext';

const useToolTip = () => {
  return useContext(ToolTipContext);
};

export default useToolTip;
