import { EmojiSadIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

const NoImage = ({ className, containerClassName, Icon }) => {
  return (
    <span className={classNames(containerClassName)}>
      {Icon || <EmojiSadIcon className={classNames(className)} />}
    </span>
  );
};

export default NoImage;
