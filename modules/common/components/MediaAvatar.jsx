import classNames from 'classnames';
import Image from 'next/image';
import { useIntl } from 'react-intl';
import defaultNextImageLoader from '../utils/defaultNextImageLoader';
import NoImage from './NoImage';

const MediaAvatar = ({ file, className }) => {
  const { url } = file;
  const { formatMessage } = useIntl();
  return (
    <div className={classNames('h-10 w-10 flex-shrink-0', className)}>
      {file ? (
        <Image
          className="relative h-10 w-10 rounded-full"
          loader={defaultNextImageLoader}
          src={url}
          width={100}
          height={100}
          alt={formatMessage({
            id: 'image_not_available',
            defaultMessage: 'Image not available',
          })}
        />
      ) : (
        <NoImage />
      )}
    </div>
  );
};

export default MediaAvatar;
