import React, { useMemo, useState } from 'react';
import ToolTipContext from '../util/ToolTipContext';
import ToolTip from './ToolTip';

const ToolTipWrapper = ({ children }) => {
  const [currentToolTip, setCurrentToolTip] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const setToolTip = (value) => {
    return (event) => {
      console.log(event.currentTarget.getBoundingClientRect());
      const { x, y, height } = event.currentTarget.getBoundingClientRect();
      setCurrentToolTip(value);
      setPosition({ top: y - height - 10, left: x });
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
                // background: 'red',
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
