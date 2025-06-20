import { useIntl } from 'react-intl';
import defaultNextImageLoader from '../utils/defaultNextImageLoader';
import ImageWithFallback from './ImageWithFallback';

const MiniUserAvatar = ({ name = '', url = '', showName = true } = {}) => {
  const { formatMessage } = useIntl();
  return (
    <div className="flex-col ">
      {name && showName && (
        <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
          {name}
        </p>
      )}
    </div>
  );
};

export default MiniUserAvatar;
