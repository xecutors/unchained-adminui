import { CheckBadgeIcon, XCircleIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

const ActiveInActive = ({
  isActive,
  activeIcon,
  inActiveIcon,
  activeClassName,
  inActiveClassName,
  containerClassName,
  iconClassName,
}) => {
  return (
    <span className={classNames('', containerClassName)}>
      {isActive
        ? activeIcon || (
            <CheckBadgeIcon
              className={classNames(
                'text-green-400 w-5 h-5 mr-2',
                iconClassName,
                activeClassName,
              )}
            />
          )
        : inActiveIcon || (
            <XCircleIcon
              className={classNames(
                'text-red-400 w-5 h-5 mr-2',
                iconClassName,
                inActiveClassName,
              )}
            />
          )}
    </span>
  );
};

export default ActiveInActive;
