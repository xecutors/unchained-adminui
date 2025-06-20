import { useState } from 'react';

const StatusFilter = ({ selectedStatuses, onStatusChange, statuses }) => {
  const [selectedStatus, setSelectedStatus] = useState(selectedStatuses || []);

  const statusChangeHandler = (event) => {
    const { value, checked } = event.target;
    let newSelectedStatus;
    if (checked) {
      newSelectedStatus = [...selectedStatus, value];
    } else {
      newSelectedStatus = selectedStatus.filter((status) => status !== value);
    }
    setSelectedStatus(newSelectedStatus);
    onStatusChange(newSelectedStatus);
  };

  return statuses?.map((status) => (
    <div
      className="inline-flex items-center rounded-md bg-white dark:bg-slate-800 py-2 px-4 text-sm font-medium text-slate-950 shadow-xs dark:shadow-none"
      key={status}
    >
      <input
        className="h-4 w-4 rounded-sm border-slate-300 text-slate-950 focus:ring-slate-800"
        type="checkbox"
        id={status}
        name={status}
        value={status}
        checked={selectedStatus.includes(status)}
        onChange={statusChangeHandler}
      />
      <div className="ml-2">
        <label
          className="text-sm text-slate-600 dark:text-slate-200"
          htmlFor={status}
        >
          {status}
        </label>
      </div>
    </div>
  ));
};

export default StatusFilter;
