import { useIntl } from 'react-intl';
import defaultNextImageLoader from '../utils/defaultNextImageLoader';
import ImageWithFallback from './ImageWithFallback';

const MiniUserAvatar = ({ name = '', url = '', showName = true } = {}) => {
  const { formatMessage } = useIntl();
  return (
    <div className="flex-col ">
      <div>
        {!url ? (
          <span className="m-auto flex h-8 w-8 items-center justify-center self-center rounded-full bg-slate-500">
            <span className="text-center text-sm font-medium leading-none text-white">
              {name
                ?.split(' ')
                ?.map((n) => n[0]?.toUpperCase())
                ?.join('')}
            </span>
          </span>
        ) : (
          <ImageWithFallback
            className="inline-block h-9 w-9 rounded-full"
            src={url}
            loader={defaultNextImageLoader}
            width={36}
            height={36}
            alt={formatMessage({
              id: 'user_avatar',
              defaultMessage: 'User avatar',
            })}
          />
        )}
      </div>
      {name && showName && (
        <div className="ml-3">
          <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
            {name}
          </p>
        </div>
      )}
    </div>
  );
};

export default MiniUserAvatar;
