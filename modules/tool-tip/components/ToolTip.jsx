const ToolTip = ({ text: message }) => {
  return (
    <div className="absolute top-0 left-0">
      <div className="bg-black text-white">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ToolTip;
