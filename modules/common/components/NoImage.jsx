import { PhotographIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

const NoImage = ({ className, containerClassName, Icon }) => {
  return (
    <span className="text-indigo-300">
      {Icon || <PhotographIcon className={classNames(className)} />}
    </span>
  );
};

export default NoImage;
