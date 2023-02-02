import { PhotoIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

const NoImage = ({ className, containerClassName, Icon }) => {
  return (
    <span className={classNames('text-indigo-300', containerClassName)}>
      {Icon || <PhotoIcon className={classNames(className)} />}
    </span>
  );
};

export default NoImage;
