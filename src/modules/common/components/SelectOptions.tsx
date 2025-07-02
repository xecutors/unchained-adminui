import { Fragment, MouseEventHandler, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
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

type ColorConfig = {
  button: string;
  hover: string;
  focus: string;
  dropdown: string;
  description: string;
};

const colorConfigs: Record<string, ColorConfig> = {
  green: {
    button: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    hover: 'hover:bg-emerald-100',
    focus: 'focus:ring-emerald-500',
    dropdown: 'text-emerald-700 bg-emerald-50 border border-emerald-200',
    description: 'text-emerald-600',
  },
  amber: {
    button: 'bg-amber-50 text-amber-700 border border-amber-200',
    hover: 'hover:bg-amber-100',
    focus: 'focus:ring-amber-500',
    dropdown: 'text-amber-700 bg-amber-50 border border-amber-200',
    description: 'text-amber-600',
  },
  slate: {
    button: 'bg-slate-50 text-slate-700 border border-slate-200',
    hover: 'hover:bg-slate-100',
    focus: 'focus:ring-slate-500',
    dropdown: 'text-slate-700 bg-slate-50 border border-slate-200',
    description: 'text-slate-600',
  },
  pink: {
    button: 'bg-pink-50 text-pink-700 border border-pink-200',
    hover: 'hover:bg-pink-100',
    focus: 'focus:ring-pink-500',
    dropdown: 'text-pink-700 bg-pink-50 border border-pink-200',
    description: 'text-pink-600',
  },
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
    options?.filter(({ current }) => current)[0] || options?.[0],
  );
  const { formatMessage } = useIntl();

  if (!select?.id || !options?.length) return null;

  const colorConfig = colorConfigs[select.bgColor] || colorConfigs.green;

  const getHoverColor = () => {
    if (!isHover) return '';
    switch (select.bgColor) {
      case 'green':
        return 'bg-emerald-100';
      case 'amber':
        return 'bg-amber-100';
      case 'pink':
        return 'bg-pink-100';
      default:
        return 'bg-slate-100';
    }
  };

  const getOptionClasses = (option: SelectOptionsProp) => {
    const config = colorConfigs[option.bgColor] || colorConfigs.green;
    return config.dropdown;
  };

  const getDescriptionClasses = (option: SelectOptionsProp) => {
    const config = colorConfigs[option.bgColor] || colorConfigs.green;
    return config.description;
  };

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
                'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 h-[38px]',
                colorConfig.button,
                colorConfig.hover,
                colorConfig.focus,
                getHoverColor(),
              )}
            >
              <CheckIcon className="h-4 w-4" aria-hidden="true" />
              <span>{select?.selectedTitle || select.title}</span>
              <ChevronDownIcon
                className={classNames(
                  'h-4 w-4 -mr-1 transition-transform duration-200',
                  open && 'rotate-180',
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
              <Listbox.Options className="mt-1 absolute right-0 z-10 w-64 origin-top-right divide-y divide-slate-200 pink:divide-pink-200 overflow-hidden rounded-md bg-white pink:bg-pink-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={() =>
                      classNames(
                        'group',
                        option?.disable && 'cursor-not-allowed',
                        'relative cursor-default select-none p-3 text-sm',
                      )
                    }
                    value={option}
                    disabled={option.disable}
                  >
                    <div
                      className={`${option?.disable && 'pointer-events-none'}`}
                      onClick={option?.onClick}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={classNames(
                                'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
                                getOptionClasses(option),
                              )}
                            >
                              {option.title}
                            </span>
                            {option.id === select.id && (
                              <CheckIcon
                                className="h-4 w-4 text-slate-600 pink:text-pink-600"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <div
                            className={classNames(
                              'mt-2 ms-1 text-sm text-slate-600 pink:text-pink-600',
                            )}
                          >
                            {option?.description}
                          </div>
                        </div>
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
