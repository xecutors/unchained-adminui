import React, { useMemo, useState } from 'react';
import ToolTipContext from '../util/ToolTipContext';
import ToolTip from './ToolTip';

const ToolTipWrapper = ({ children }) => {
  const [currentToolTip, setCurrentToolTip] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const setToolTip = (value) => {
    return (event) => {
      console.log(event.currentTarget.getBoundingClientRect());
      const { x, y, bottom, right, height } =
        event.currentTarget.getBoundingClientRect();
      setCurrentToolTip(value);

      // switch (direction) {
      //   case 'right':
      //     setPosition({ top: y, left: right });
      //     break;
      //   case 'bottom':
      //     setPosition({ top: bottom, left: x });
      //     break;
      //   case 'left':
      //     setPosition({ top: bottom, left: x });
      //     break;
      //   default:
      //     setPosition({ top: y - height - 10, left: x, height });
      //     break;
      // }
      setPosition({ top: y - height - 10, left: x, height });
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
