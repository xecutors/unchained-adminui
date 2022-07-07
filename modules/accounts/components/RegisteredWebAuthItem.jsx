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
    <li className="flex py-6">
      <div className="ml-4 flex-1 flex flex-col sm:ml-6">
        <div>
          <div className="flex justify-between">
            <h4 className="text-sm">
              <a
                href="#"
                className="font-medium text-gray-700 hover:text-gray-800"
              >
                {' '}
                {aaguid}{' '}
              </a>
            </h4>
            <p className="ml-4 text-sm font-medium text-gray-900">
              <Badge text={counter} />
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {JSON.stringify(md5Metadata)}
          </p>
          <p className="mt-1 text-sm text-gray-500" />
        </div>

        <div className="mt-4 flex-1 flex items-end justify-between">
          <p className="flex items-center text-sm text-gray-700 space-x-2">
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
