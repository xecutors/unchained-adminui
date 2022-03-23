import classNames from 'classnames';
import { useRouter } from 'next/router';

const Toggle = ({ toggleText = '', toggleKey }) => {
  const router = useRouter();

  const toggleState = router?.query?.[toggleKey] === 'true';

  const onToggle = () => {
    router.push({
      query: {
        ...router.query,
        [toggleKey]: !toggleState,
      },
    });
  };
  return (
    <div className="ml-1">
      <button
        type="button"
        className={classNames(
          ' relative inline-flex h-4 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
          {
            'bg-gray-200': !toggleState,
            'bg-indigo-600': toggleState,
          },
        )}
        role="switch"
        onClick={onToggle}
        aria-checked={toggleState ? 'true' : 'false'}
      >
        <span className="sr-only">{toggleText}</span>

        <span
          className={classNames(
            ' pointer-events-none relative inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            {
              'translate-x-5': toggleState,
              'translate-x-0': !toggleState,
            },
          )}
        >
          <span
            className={classNames(
              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
              {
                'opacity-100 duration-200 ease-in': toggleState,
                'opacity-0 duration-100 ease-out': toggleState,
              },
            )}
            aria-hidden="true"
          >
            <svg
              className="h-3 w-3 text-gray-400"
              fill="none"
              viewBox="0 0 12 12"
            >
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span
            className={classNames(
              'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
              {
                'opacity-100 duration-200 ease-in': toggleState,
                'opacity-0 duration-100 ease-out': !toggleState,
              },
            )}
            aria-hidden="true"
          >
            <svg
              className="h-3 w-3 text-indigo-600"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          </span>
        </span>
      </button>
      <span className="ml-3" id="annual-billing-label">
        <span className="text-sm font-medium text-gray-900">{toggleText}</span>
      </span>
    </div>
  );
};

export default Toggle;
