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
            <div
              className={`inline-flex divide-x rounded-md shadow-sm divide-${select?.bgColor}-600`}
            >
              <div
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className={`relative z-0 inline-flex divide-x rounded-md shadow-sm divide-${select?.bgColor}-600`}
              >
                <div
                  className={classNames(
                    `inline-flex items-center bg-${select?.bgColor}-500 hover:cursor-pointer rounded-l-md border border-transparent py-[0.3rem] pl-2 pr-2 text-white shadow-sm lg:py-2 lg:pl-3 lg:pr-4`,
                    isHover && `bg-${select?.bgColor}-600`,
                  )}
                >
                  <CheckIcon
                    className="h-4 w-4 lg:h-5 lg:w-5"
                    aria-hidden="true"
                  />
                  <p className="ml-2.5 text-xs font-medium lg:text-sm">
                    {select?.selectedTitle || select.title}
                  </p>
                </div>
                <Listbox.Button
                  className={classNames(
                    `inline-flex items-center bg-${select?.bgColor}-500 hover:cursor-pointer rounded-l-none rounded-r-md border-none  text-sm font-medium text-white outline-none focus:z-10 focus:outline-none `,
                    isHover && `bg-${select?.bgColor}-600`,
                  )}
                >
                  {/* the button effect on whole rather than only on icon */}
                  <span className="absolute inset-0" />
                  <span className="sr-only">
                    {formatMessage(
                      {
                        id: 'select_options_toggle',
                        defaultMessage: 'Change {type} status',
                      },
                      {
                        type,
                      },
                    )}
                  </span>
                  <ChevronDownIcon
                    className="h-4 w-4 text-white lg:h-5 lg:w-5"
                    aria-hidden="true"
                  />
                </Listbox.Button>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="mt-1 absolute right-0 z-10 w-full origin-top-right divide-y divide-slate-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={() =>
                      classNames(
                        'group hover:bg-indigo-500 hover:text-white',
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
                                : 'text-indigo-500'
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
