import Link from 'next/link';
import { format } from 'date-fns';

const UserLogListItem = ({ log }) => {
  return (
    <tr key={log._id}>
      <td>
        <div className="flex items-center text-sm text-gray-900">
          {log.created ? format(new Date(log.created), 'Pp') : 'n/a'}
        </div>
      </td>

      <td>
        <div className="flex items-center text-sm text-gray-900">
          {log.level}
        </div>
      </td>

      <td>
        <div className="flex items-center text-sm text-gray-900">
          {log.message}
        </div>
      </td>

      <td className="text-green flex">
        <div className="items-center text-sm text-gray-900 ">
          {log.order && (
            <Link href={`/order/${log.order._id}`}>
              <a className="flex text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className=" h-7 w-7 p-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>{' '}
                {log.order.orderNumber}
              </a>
            </Link>
          )}
        </div>
      </td>
    </tr>
  );
};

export default UserLogListItem;
