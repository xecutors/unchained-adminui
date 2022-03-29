import React, { useMemo, useState } from 'react';
import ToolTipContext from '../util/ToolTipContext';
import ToolTip from './ToolTip';

const ToolTipWrapper = ({ children }) => {
  const [currentToolTip, setCurrentToolTip] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const setToolTip = (value) => {
    return (event) => {
      const { clientX, clientY } = event;
      setCurrentToolTip(value);
      setPosition({ top: clientY, left: clientX });
    };
  };
  const ctx = useMemo(() => ({ setToolTip }), []);

  return (
    <>
      <div
        style={
          currentToolTip
            ? {
                top: position.top - 100,
                left: position.left - 100,
                width: 200,
                height: 200,
                position: 'absolute',
                borderRadius: '50%',
              }
            : {}
        }
        onMouseLeave={() => setCurrentToolTip(null)}
      >
        <ToolTip visible={!!currentToolTip} position={position}>
          {currentToolTip}
        </ToolTip>
      </div>
      <ToolTipContext.Provider value={ctx}>{children}</ToolTipContext.Provider>
    </>
  );
};

export default ToolTipWrapper;
