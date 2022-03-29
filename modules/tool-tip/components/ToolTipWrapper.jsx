import React, { useMemo, useState } from 'react';
import ToolTipContext from '../util/ToolTipContext';
import ToolTip from './ToolTip';

const ToolTipWrapper = ({ children }) => {
  const [newtooltipchildern, setChildren] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const setToolTip = (newchildern) => {
    return function setTT(event) {
      const { pageX, pageY } = event;
      setChildren(newchildern);
      setPosition({ top: pageY, left: pageX });
    };
  };
  const ctx = useMemo(() => ({ setToolTip }), []);

  return (
    <>
      <ToolTip visible={!!newtooltipchildern} position={position}>
        {newtooltipchildern}
      </ToolTip>
      <ToolTipContext.Provider value={ctx}>
        {React.cloneElement(children)}
      </ToolTipContext.Provider>
    </>
  );
};

export default ToolTipWrapper;
