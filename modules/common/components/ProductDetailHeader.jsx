import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import Badge from './Badge';

const PROVIDER_TYPE_CLASSES = {
  Published: 'green',
  Draft: 'yellow',
  Delete: 'red',
};

const publishingOptions = [
  {
    title: 'Published',
    current: false,
  },
  {
    title: 'Draft',
    current: true,
  },
  {
    title: 'Delete',
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProductDetailHeader = () => {
  const [selected, setSelected] = useState(publishingOptions[0]);
  return (
    <div className=" mt-5 max-w-full">
      <div className="py-2 bg-white px-5 shadow sm:rounded-t sm:px-15">
        <div className="  border-gray-50">
          <div className="mt-3 mr-1 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <Listbox.Label className="sr-only">
                    Change published status
                  </Listbox.Label>
                  <div className="relative">
                    <div className="inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
                      <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
                        <div className="relative inline-flex items-center bg-indigo-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          <p className="ml-2.5 text-sm font-medium">
                            {selected.title}
                          </p>
                        </div>
                        <Listbox.Button className="relative inline-flex items-center bg-indigo-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:z-10  focus:ring-offset-2 focus:ring-offset-gray-50 ">
                          <span className="sr-only">
                            Change published status
                          </span>
                          <ChevronDownIcon
                            className="h-5 w-5 text-white"
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
                      <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-36 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200  ring-black ring-opacity-5 focus:outline-none">
                        {publishingOptions.map((option) => (
                          <Listbox.Option
                            key={option.title}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? 'text-white bg-indigo-500'
                                  : 'text-gray-900',
                                'cursor-default select-none relative p-4 text-sm',
                              )
                            }
                            value={option}
                          >
                            {({ selected, active }) => (
                              <div className="flex flex-col">
                                <div className="flex ">
                                  <p
                                    className={
                                      selected ? 'font-semibold' : 'font-normal'
                                    }
                                  >
                                    {option.title}
                                  </p>
                                  {selected ? (
                                    <span
                                      className={
                                        active
                                          ? 'text-white'
                                          : 'text-indigo-500'
                                      }
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </div>
                                <p
                                  className={classNames(
                                    active
                                      ? 'text-indigo-200'
                                      : 'text-gray-500',
                                    'mt-2',
                                  )}
                                />
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailHeader;
