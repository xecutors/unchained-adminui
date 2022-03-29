import React from 'react';

const ToolTip = ({ children, visible, position }) => {
  return visible ? (
    <div
      style={{ top: position.top, left: position.left }}
      className={`text-align fixed z-50 min-h-fit min-w-fit rounded bg-black  px-2 text-white shadow after:absolute after:top-full after:left-1/2 after:h-0 after:w-0 after:border-[5px] after:border-b-0 after:border-t-[5px] after:border-solid after:border-transparent after:border-t-black `}
    >
      {children}
    </div>
  ) : null;
};

export default ToolTip;
