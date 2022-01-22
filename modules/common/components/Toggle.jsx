const Toggle = ({ toggleText = '', toggleState, onToggle }) => {
  return (
    <div className="flex items-center h-5">
      <input
        id="include-inactive"
        aria-describedby="include-inactive"
        name="include-inactive"
        type="checkbox"
        checked={toggleState}
        onChange={() => onToggle(!toggleState)}
        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
      />
      <label htmlFor="show-guests" className="ml-3 font-medium text-gray-700">
        {toggleText}
      </label>
    </div>
  );
};

export default Toggle;
