const ToolTip = ({ children, visible, position }) => {
  console.log(position.height);
  return visible ? (
    <div
      style={{
        top: position?.top,
        right: position?.right,
        left: position?.left,
        bottom: position?.bottom,
        // transform: 'translate(0, -20px)',
      }}
      className={`text-align fixed z-50 h-32 w-48 break-words rounded bg-black  px-2 text-white shadow after:absolute after:top-full after:left-1 after:h-0 after:w-0 after:border-[5px] after:border-b-0 after:border-t-[5px] after:border-solid after:border-transparent after:border-t-black `}
    >
      {children}
    </div>
  ) : null;
};

export default ToolTip;
