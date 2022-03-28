import Link from 'next/link';
import { useIntl } from 'react-intl';

import Badge from './Badge';
import Table from './Table';
import { PROVIDER_TYPE_CLASSES } from '../data/miscellaneous';
import { getInterfaceLabel } from '../utils/utils';
import DeleteButton from './DeleteButton';

const ProviderListItem = ({ provider, onRemove, providerPath }) => {
  const { formatMessage } = useIntl();

  return (
    <Table.Row>
      <Table.Cell className="whitespace-nowrap  px-6 ">
        <div className="text-sm text-gray-900">
          {getInterfaceLabel(provider?.interface)}
          <Badge
            text={
              provider?.isActive
                ? formatMessage({
                    id: 'active',
                    defaultMessage: 'Active',
                  })
                : formatMessage({
                    id: 'not_active',
                    defaultMessage: 'Not Active',
                  })
            }
            color={provider?.isActive ? 'green' : 'red'}
            className="ml-3"
            square
          />
        </div>
      </Table.Cell>

      <Table.Cell className="whitespace-nowrap  px-6 ">
        <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 ">
          <Badge
            text={provider?.type}
            color={PROVIDER_TYPE_CLASSES[provider?.type]}
            square
          />
        </span>
      </Table.Cell>
      <Table.Cell className="whitespace-nowrap px-6 ">
        <div className="flex">
          <Link href={`${providerPath}/${provider?._id}`}>
            <a
              type="button"
              className="flex text-indigo-500 hover:text-indigo-500"
            >
              <svg
                className=" mt-2  h-5 w-5 text-indigo-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {' '}
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{' '}
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </a>
          </Link>
          <DeleteButton
            className="ml-1 "
            onClick={async () => {
              await onRemove(provider?._id);
            }}
          />
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default ProviderListItem;
