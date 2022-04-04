import { useIntl } from 'react-intl';
import NoData from './NoData';

const JSONView = ({ name, value }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="mt-2 text-sm text-slate-900">
      {value ? (
        <textarea
          disabled
          className="mt-1 block w-full max-w-full rounded-md border-2 resize-none border-slate-200 shadow-sm  sm:text-sm"
          id={name}
          name={name}
          value={JSON.stringify(value || {}, null, 2)}
          rows={Math.max(
            JSON.stringify(value || {}, null, 2)?.split(' ')?.length / 5,
            5,
          )}
        />
      ) : (
        <NoData
          className="bg-white rounded-lg capitalize border border-slate-200 shadow-md"
          message={formatMessage({
            id: `no_${name}`,
            defaultMessage: `${name}`,
          })}
        />
      )}
    </div>
  );
};

export default JSONView;
