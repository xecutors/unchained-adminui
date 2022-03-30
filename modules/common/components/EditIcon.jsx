import { PencilAltIcon } from '@heroicons/react/outline';

const EditIcon = () => {
  return (
    <div className="rounded-full bg-white px-1 py-1 text-sm text-indigo-500 hover:bg-indigo-50 focus:outline-none focus:ring-0 focus:ring-red-500 focus:ring-offset-2">
      <PencilAltIcon className="h-5 w-5" />
    </div>
  );
};

export default EditIcon;
