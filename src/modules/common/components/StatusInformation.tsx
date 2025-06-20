const StatusInformation = ({
  enumType,
  currentType,
  label,
  component = null,
}) => {
  return (
    component || (
      <span
        title={label}
        className={`${
          currentType === enumType
            ? 'border-slate-300 bg-slate-200 text-slate-950'
            : 'opacity-10 dark:bg-slate-900 '
        } mr-2 mb-2 inline-flex items-center rounded-md border border-slate-300 bg-white px-2 py-1 text-sm`}
      >
        {enumType}
      </span>
    )
  );
};

export default StatusInformation;
