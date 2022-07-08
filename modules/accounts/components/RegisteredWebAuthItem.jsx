import { CheckIcon } from '@heroicons/react/solid';

import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import useFormatDateTime from '../../common/utils/useFormatDateTime';

const RegisteredWebAuthItem = ({
  _id,
  aaguid,
  counter,
  created,
  md5Metadata,
  onRemoveCredential,
}) => {
  const { formatDateTime } = useFormatDateTime();
  return (
    <li key={_id} className="flex py-6">
      <div className="mx-4 flex-1 flex flex-col sm:mx-6">
        <div>
          <div className="flex justify-between">
            <h4 className="text-sm">
              <a
                href="#"
                className="font-medium text-slate-700 hover:text-slate-800 dark:text-white"
              >
                {aaguid}
              </a>
            </h4>
            <p className="ml-4 text-sm font-medium">
              <Badge text={counter} />
            </p>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
            {JSON.stringify(md5Metadata)}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300" />
        </div>

        <div className="mt-4 flex-1 flex items-end justify-between">
          <p className="flex items-center text-sm text-slate-700 dark:text-slate-300 space-x-2">
            <CheckIcon
              className="flex-shrink-0 h-5 w-5 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            />
            <span>
              {formatDateTime(created, {
                timeStyle: 'short',
                dateStyle: 'medium',
              })}
            </span>
          </p>
          <div className="ml-4">
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              <span>
                <DeleteButton onClick={() => onRemoveCredential(_id)} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default RegisteredWebAuthItem;
