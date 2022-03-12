import classNames from 'classnames';
import Image from 'next/image';
import { useIntl } from 'react-intl';
import defaultNextImageLoader from '../utils/defaultNextImageLoader';

const MediaAvatar = ({ file, className }) => {
  const { url } = file;
  const { formatMessage } = useIntl();
  return (
    <div className={classNames('flex-shrink-0 h-10 w-10', className)}>
      <Image
        className="h-10 w-10 rounded-full relative"
        loader={defaultNextImageLoader}
        src={url}
        width={100}
        height={100}
        alt={formatMessage({
          id: 'image_not_available',
          defaultMessage: 'Image not available',
        })}
      />
    </div>
  );
};

export default MediaAvatar;
