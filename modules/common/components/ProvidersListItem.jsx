import Link from 'next/link';
import { useIntl } from 'react-intl';

import { PencilAltIcon } from '@heroicons/react/outline';
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
            <a>
              <PencilAltIcon className="mt-2 mr-2 h-5 w-5  rounded-full text-indigo-500" />
            </a>
          </Link>
          <DeleteButton
            className="mt-1 ml-1"
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
