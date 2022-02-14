import { Fragment, MouseEventHandler, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useIntl } from 'react-intl';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export type SelectOptionsProp = {
  id: string;
  title: string;
  selectedTitle?: string;
  onClick: MouseEventHandler<any>;
  description?: string;
  current: boolean;
  bgColor: string;
};

export default function SelectOptions({
  options,
  type,
}: {
  options: SelectOptionsProp[];
  type?: string;
}) {
  const [select, setSelected] = useState(
    options?.filter(({ current }) => current)[0],
  );
  const { formatMessage } = useIntl();

  return (
    <Listbox value={select} onChange={setSelected}>
      {({ open }) => (
        <>
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
              className={`inline-flex shadow-sm rounded-md divide-x divide-${select?.bgColor}-600`}
            >
              <div
                className={`relative z-0 inline-flex shadow-sm rounded-md divide-x divide-${select?.bgColor}-600`}
              >
                <div
                  className={`relative inline-flex items-center hover:bg-${select?.bgColor}-200 bg-${select?.bgColor}-500 py-[0.3rem] lg:py-2 pl-2 lg:pl-3 pr-2 lg:pr-4 border border-transparent rounded-l-md shadow-sm text-white`}
                >
                  <CheckIcon
                    className="h-4 w-4 lg:h-5 lg:w-5"
                    aria-hidden="true"
                  />
                  <p className="ml-2.5 text-xs lg:text-sm font-medium">
                    {select?.selectedTitle || select.title}
                  </p>
                </div>
                <Listbox.Button
                  className={`relative inline-flex items-center bg-${select?.bgColor}-500  hover:bg-${select?.bgColor}-900 p-1 lg:p-2 outline-none border-none rounded-l-none rounded-r-md text-sm font-medium text-white focus:outline-none focus:z-10`}
                >
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
                    className="h-4 w-4 lg:h-5 lg:w-5 text-white"
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
              <Listbox.Options className="w-full origin-top-right absolute z-10 right-0 mt-2 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={() =>
                      classNames(
                        'hover:bg-gray-500',
                        option.id === select.id
                          ? `text-white bg-${option.bgColor}-500`
                          : 'text-gray-900',
                        `cursor-default select-none relative px-4 py-2 text-sm `,
                      )
                    }
                    value={option}
                  >
                    <div className={`flex flex-col `} onClick={option?.onClick}>
                      <div className="flex justify-between cursor-pointer">
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
                      <p
                        className={classNames(
                          option.id === select.id
                            ? 'text-indigo-200'
                            : 'text-gray-500',
                          'mt-2',
                        )}
                      >
                        {option?.description}
                      </p>
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

SelectOptions.defaultProps = {
  type: 'toggle',
};
