import ImageWithFallback from '../../../modules/common/components/ImageWithFallback';

export const renderMedias = ({ media }: { media?: any[] }) => {
  if (!media?.length) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
      {media.map((item) => (
        <div
          key={item.id || item.file?.url}
          className="flex flex-col items-center space-y-2"
        >
          <ImageWithFallback
            src={item?.file?.url}
            alt={item.file?.name || item.file?._id}
            width={128}
            height={128}
            className="w-full h-full object-cover rounded shadow"
          />
          <span className="text-xs text-gray-500 break-all font-mono">
            {item._id}
          </span>
        </div>
      ))}
    </div>
  );
};
