import classNames from 'classnames';
import { useIntl } from 'react-intl';

const MediaAvatar = ({ file, className }) => {
  const { url } = file;
  const { formatMessage } = useIntl();
  return (
    <div className={classNames('flex-shrink-0 h-10 w-10', className)}>
      <img
        className="h-10 w-10 rounded-full"
        src={url || '/product_placeholder.png'}
        alt={formatMessage({
          id: 'image_not_available',
          defaultMessage: 'Image not available',
        })}
      />
    </div>
  );
};

export default MediaAvatar;
