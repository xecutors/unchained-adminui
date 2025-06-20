import { PhotoIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

const NoImage = ({ className = '', containerClassName = '', Icon = null }) => {
  return (
    <span className={classNames('text-slate-400', containerClassName)}>
      {Icon || <PhotoIcon className={classNames(className)} />}
    </span>
  );
};

export default NoImage;
