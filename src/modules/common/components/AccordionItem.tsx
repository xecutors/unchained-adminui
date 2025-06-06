import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { useState } from 'react';

const AccordionItem = ({
  header,
  body,
  headerCSS = '',
  bodyCSS = '',
  itemContainerCSS = '',
  itemindex = 1,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className={classNames('mt-3', itemContainerCSS)}
      data-itemindex={itemindex}
    >
      <button
        type="button"
        onClick={() => setShow(!show)}
        className={classNames(
          'relative cursor-pointer border dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 w-full',
          headerCSS,
        )}
      >
        <div className="w-full">{header}</div>
        <span className="px-2">
          {show ? (
            <ChevronUpIcon
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
            />
          ) : (
            <ChevronDownIcon
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
            />
          )}
        </span>
      </button>

      {show ? (
        <div
          className={classNames(
            'rounded-lg p-0 text-slate-400 dark:text-slate-200 ',
            bodyCSS,
          )}
        >
          {body}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default AccordionItem;
