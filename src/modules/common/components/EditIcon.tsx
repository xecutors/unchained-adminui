import { PencilSquareIcon } from '@heroicons/react/24/outline';

const EditIcon = () => {
  return (
    <div
      id="edit__icon_button"
      className="rounded-full bg-white dark:bg-slate-800 dark:hover:bg-slate-600 px-1 py-1 text-sm text-slate-900 hover:bg-slate-50 focus:outline-hidden focus:ring-0 focus:ring-red-500 focus:ring-offset-2"
    >
      <PencilSquareIcon className="h-5 w-5" />
    </div>
  );
};

export default EditIcon;
