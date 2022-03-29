import React, { useMemo, useState } from 'react';
import ToolTipContext from '../util/ToolTipContext';
import ToolTip from './ToolTip';

const ToolTipWrapper = ({ children }) => {
  const [newtooltipchildern, setChildren] = useState(null);
  const [tp, setTop] = useState(0);
  const [lft, setLeft] = useState(0);
  const setToolTip = (newchildern, options) => {
    const { top, left } = options;
    setTop(top);
    setLeft(left);
    setChildren(newchildern);
  };
  const ctx = useMemo(() => ({ setToolTip }), []);

  return (
    <>
      <ToolTip visible={!!newtooltipchildern} top={tp} left={lft}>
        {newtooltipchildern}
      </ToolTip>
      <ToolTipContext.Provider value={ctx}>
        {React.cloneElement(children)}
      </ToolTipContext.Provider>
    </>
  );
};

export default ToolTipWrapper;
