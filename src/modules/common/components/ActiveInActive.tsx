import { CheckBadgeIcon, XCircleIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

const ActiveInActive = ({
  isActive,
  activeIcon = null,
  inActiveIcon = null,
  activeClassName = '',
  inActiveClassName = '',
  containerClassName = '',
  iconClassName = '',
}) => {
  return (
    <span className={classNames('', containerClassName)}>
      {isActive
        ? activeIcon || (
            <CheckBadgeIcon
              className={classNames(
                'text-emerald-500 w-6 h-6',
                iconClassName,
                activeClassName,
              )}
            />
          )
        : inActiveIcon || (
            <XCircleIcon
              className={classNames(
                'text-red-300 w-6 h-6',
                iconClassName,
                inActiveClassName,
              )}
            />
          )}
    </span>
  );
};

export default ActiveInActive;
