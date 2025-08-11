import React from 'react';
import { useIntl } from 'react-intl';
import ImageWithFallback from '../../../common/components/ImageWithFallback';
import useFormatDateTime from '../../../common/utils/useFormatDateTime';

interface CopilotMediaListProps {
  media: {
    _id: string;
    name: string;
    size: number;
    type: string;
    url?: string;
    file?: { url?: string; size?: number; type?: string; };
    created: string;
    updated: string;
  }[];
}

const CopilotMediaList: React.FC<CopilotMediaListProps> = ({ media }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  if (!media?.length) return null;

  return (
    <div className="flex flex-col gap-3 w-full">
      {media.map((m) => {
        const imageUrl = m.file?.url || m.url;
        return (
          <div
            key={m._id}
            className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-200 w-full overflow-hidden"
          >
            <div className="w-16 h-16 flex-shrink-0 bg-slate-50 dark:bg-slate-700 rounded-md overflow-hidden">
              {imageUrl ? (
                <ImageWithFallback
                  src={imageUrl}
                  alt={m.name}
                  className="w-full h-full object-cover"
                  width={64}
                  height={64}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  <span className="text-2xl">🖼️</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                {m.name}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                <span>
                  {formatMessage({ id: 'media.size', defaultMessage: 'Size' })}:{' '}
                  {(m?.file?.size / 1024).toFixed(1)} KB
                </span>
                <span>
                  {formatMessage({ id: 'media.type', defaultMessage: 'Type' })}:{' '}
                  {m?.file?.type}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
              <span>
                {formatMessage({
                  id: 'media.created',
                  defaultMessage: 'Created',
                })}
                : {formatDateTime(m.created)}
              </span>
              <span>
                {formatMessage({
                  id: 'media.updated',
                  defaultMessage: 'Updated',
                })}
                : {formatDateTime(m.updated)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CopilotMediaList;
