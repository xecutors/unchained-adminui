import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';
import useFormatDateTime from '../../common/utils/useFormatDateTime';

const RegisteredWebAuthItem = ({
  _id,
  aaguid,
  counter,
  created,
  md5Metadata,
  onRemoveCredential,
}) => {
  const { formatDateTime } = useFormatDateTime();
  return (
    <li className="col-span-1 flex shadow-sm rounded-md ">
      {md5Metadata?.icon && (
        <div className="flex-shrink-0 flex items-center justify-center w-16  text-sm font-medium rounded-l-md">
          <img
            className="inline-block h-10 w-10 rounded-full border-2"
            src="https://unchained.shop/_next/static/media/logo.41b5589a.svg"
          />
        </div>
      )}
      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-slate-200 dark:bg-slate-800 bg-white rounded-r-md truncate dark:text-slate-200">
        <div className="flex-1 px-4 py-2 text-sm truncate">
          <span className="text-slate-900 dark:text-slate-200 font-medium ">
            {aaguid}
          </span>
          <div className="mt-1 mb-1">{md5Metadata?.description}</div>
          <div>
            <Badge text={counter} />
          </div>
        </div>
        <div className="flex-shrink-0 pr-2 justify-between h-100  text-right">
          <div>{formatDateTime(created)}</div>
          <div className="align-bottom">
            <DeleteButton onClick={() => onRemoveCredential(_id)} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default RegisteredWebAuthItem;
