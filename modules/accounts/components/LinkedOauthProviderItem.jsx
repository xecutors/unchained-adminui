import Badge from '../../common/components/Badge';
import DeleteButton from '../../common/components/DeleteButton';

const LinkedOauthProviderItem = ({
  provider,
  data,
  onRemoveProvider,
  removeDisabled,
}) => {
  return (
    <li className="col-span-1 flex shadow-sm rounded-md ">
      <div className="flex-1 px-4 py-2 text-sm truncate">
        <span className="text-slate-900 dark:text-slate-200 font-medium ">
          <Badge text={provider} />
        </span>
        {data.map(({ email, authorizationCode }) => {
          return (
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-slate-200 dark:bg-slate-800 bg-white rounded-r-md truncate dark:text-slate-200">
              <div className="mt-1 mb-1">{email}</div>

              <div className="flex-shrink-0 pr-2 justify-between h-100  text-right">
                {!removeDisabled && (
                  <div className="align-bottom">
                    <DeleteButton
                      onClick={() =>
                        onRemoveProvider(provider, authorizationCode)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </li>
  );
};

export default LinkedOauthProviderItem;
