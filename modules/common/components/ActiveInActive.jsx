import { BadgeCheckIcon, XCircleIcon } from '@heroicons/react/solid';
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
    <span className={classNames('inline-flex self-end', containerClassName)}>
      {isActive
        ? activeIcon || (
            <BadgeCheckIcon
              className={classNames(
                'text-green-500 w-5 h-5',
                iconClassName,
                activeClassName,
              )}
            />
          )
        : inActiveIcon || (
            <XCircleIcon
              className={classNames(
                'text-red-500 w-5 h-5',
                iconClassName,
                inActiveClassName,
              )}
            />
          )}
    </span>
  );
};

export default ActiveInActive;
