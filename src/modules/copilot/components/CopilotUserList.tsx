import React from 'react';
import { useIntl } from 'react-intl';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import Link from 'next/link';
import Badge from '../../common/components/Badge';

export const CopilotUserListItem = ({ user }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  if (!user) return null;

  return (
    <div
      key={user._id}
      className="flex flex-col p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 w-full"
    >
      <div className="flex justify-between items-start w-full">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
            {user?.profile?.displayName || user?.username || 'No Name'}
          </h3>

          {user?.emails?.length > 0 && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {user.emails[0].address}{' '}
              {!user.emails[0].verified ? (
                <Badge
                  text={formatMessage({
                    id: 'unverified',
                    defaultMessage: 'Unverified',
                  })}
                  color="yellow"
                  square
                />
              ) : (
                <Badge
                  text={formatMessage({
                    id: 'verified',
                    defaultMessage: 'Verified',
                  })}
                  color="green"
                  square
                />
              )}
            </p>
          )}

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {formatMessage({ id: 'roles', defaultMessage: 'Roles' })}:{' '}
            {user.roles?.join(', ') || '-'}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {formatMessage({ id: 'registered', defaultMessage: 'Registered' })}:{' '}
            {formatDateTime(user.created)}
          </p>
        </div>
        <div className="flex flex-col items-end text-xs text-slate-500 dark:text-slate-400 ml-4 whitespace-nowrap gap-1">
          <span>
            {formatMessage({ id: 'id', defaultMessage: 'ID' })}: {user._id}
          </span>

          {!!user.guest && (
            <Badge
              text={formatMessage({ id: 'guest', defaultMessage: 'Guest' })}
              color="yellow"
              square
            />
          )}

          {user?.lastLogin?.timestamp && (
            <span>
              {formatMessage({
                id: 'last_login',
                defaultMessage: 'Last log in',
              })}
              :{' '}
              {formatDateTime(user.lastLogin.timestamp, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </span>
          )}

          <Link
            href={`/users?userId=${user._id}`}
            className="mt-2 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            {formatMessage({ id: 'view', defaultMessage: 'View' })}
          </Link>
        </div>
      </div>
      {user?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3 w-full">
          {user.tags.map((tag) => (
            <Badge key={tag} text={tag} color="blue" />
          ))}
        </div>
      )}
    </div>
  );
};

const CopilotUserList = ({ users, toolCallId }) => {
  const { formatMessage } = useIntl();

  if (!users?.length) {
    return (
      <div className="p-4 text-center text-slate-500">
        {formatMessage({
          id: 'no_users_found',
          defaultMessage: 'No users found',
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {users.map((user) => (
        <CopilotUserListItem key={`${user._id}-${toolCallId}`} user={user} />
      ))}
    </div>
  );
};

export default CopilotUserList;
