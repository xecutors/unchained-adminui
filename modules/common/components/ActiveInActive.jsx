import { BadgeCheckIcon, XCircleIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

const ActiveInActive = ({
  isActive,
  activeIcon,
  inActiveIcon,
  activeClassName,
  InActiveClassName,
  containerClassName,
}) => {
  return (
    <span className={classNames('inline-flex self-end', containerClassName)}>
      {isActive
        ? activeIcon || (
            <BadgeCheckIcon
              className={classNames('text-green-500 w-4 h-4', activeClassName)}
            />
          )
        : inActiveIcon || (
            <XCircleIcon
              className={classNames('text-red-500 w-4 h-4', InActiveClassName)}
            />
          )}
    </span>
  );
};

export default ActiveInActive;
