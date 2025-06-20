import { Fragment, MouseEventHandler, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { useIntl } from 'react-intl';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

type SelectOptionsProp = {
  id: string;
  title: string;
  selectedTitle?: string;
  onClick: MouseEventHandler<any>;
  description?: string;
  disable?: boolean;
  current: boolean;
  bgColor: string;
};

const SelectOptions = ({
  options,
  type,
}: {
  options: SelectOptionsProp[];
  type?: string;
}) => {
  const [isHover, setIsHover] = useState(false);
  const [select, setSelected] = useState(
    options?.filter(({ current }) => current)[0],
  );
  const { formatMessage } = useIntl();
  if (!select?.id) return null;
  return (
    <Listbox value={select} onChange={setSelected}>
      {({ open }) => (
        <div id={select.id}>
          <Listbox.Label className="sr-only">
            {formatMessage(
              {
                id: 'select_options_toggle',
                defaultMessage: 'Change {type} status',
              },
              {
                type,
              },
            )}
          </Listbox.Label>
          <div className="relative">
            <Listbox.Button
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              className={classNames(
                `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2`,
                select?.bgColor === 'green' && 'bg-green-500 hover:bg-green-600 focus:ring-green-500',
                select?.bgColor === 'slate' && 'bg-slate-500 hover:bg-slate-600 focus:ring-slate-500',
                isHover && select?.bgColor === 'green' && 'bg-green-600',
                isHover && select?.bgColor === 'slate' && 'bg-slate-600',
              )}
            >
              <CheckIcon
                className="h-4 w-4"
                aria-hidden="true"
              />
              <span>
                {select?.selectedTitle || select.title}
              </span>
              <ChevronDownIcon
                className={classNames(
                  "h-4 w-4 -mr-1 transition-transform duration-200",
                  open && "rotate-180"
                )}
                aria-hidden="true"
              />
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="mt-1 absolute right-0 z-10 w-full origin-top-right divide-y divide-slate-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={() =>
                      classNames(
                        'group hover:bg-slate-900 hover:text-white',
                        option?.disable && 'cursor-not-allowed',
                        option.id === select.id
                          ? `text-white bg-${option.bgColor}-500`
                          : 'text-slate-900',
                        `relative cursor-default select-none px-4 py-2 text-sm`,
                      )
                    }
                    value={option}
                    disabled={option.disable}
                  >
                    <div
                      className={`flex flex-col ${
                        option?.disable && 'pointer-events-none'
                      } `}
                      onClick={option?.onClick}
                    >
                      <div className="flex cursor-pointer justify-between">
                        <p
                          className={
                            option.id === select.id
                              ? `font-semibold`
                              : 'font-normal'
                          }
                        >
                          {option.title}
                        </p>
                        {option.id === select.id ? (
                          <span
                            className={
                              option.id === select.id
                                ? 'text-white'
                                : 'text-slate-900'
                            }
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                      <div
                        className={classNames(
                          'mt-2',
                          option.id === select.id
                            ? 'text-green-100'
                            : 'text-slate-500 group-hover:text-white',

                          '',
                        )}
                      >
                        {option?.description}
                      </div>
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

export default SelectOptions;
