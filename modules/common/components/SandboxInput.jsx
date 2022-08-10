import { useIntl } from 'react-intl';

const SandboxInput = ({ endpoint, handleOnBlur }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="mx-4 md:pl-64">
      <div className="my-2 flex items-center rounded-md border border-slate-300 dark:border-slate-600">
        <label
          htmlFor="sandbox"
          className="inline-flex items-center rounded-l-md px-3 py-2 border-r border-slate-300 bg-slate-50 uppercase dark:bg-slate-900 font-bold text-slate-500 dark:text-white  dark:border-slate-600"
        >
          {formatMessage({ id: 'sandbox', defaultMessage: 'sandbox' })}
        </label>
        <div className="w-full">
          <input
            type="text"
            name="sandbox"
            id="sandbox"
            className="block w-full px-3 py-2 border-none rounded-r-md dark:bg-slate-800"
            placeholder="http://localhost:3000/graphql"
            defaultValue={endpoint}
            onBlur={handleOnBlur}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default SandboxInput;
