import Link from 'next/link';

import Badge from './Badge';
import Table from './Table';
import { PROVIDER_TYPE_CLASSES } from '../data/miscellaneous';
import DeleteButton from './DeleteButton';
import EditIcon from './EditIcon';
import { getInterfaceLabel } from '../utils/utils';
import ActiveInActive from './ActiveInActive';
import ProviderNameConfiguration from './ProviderNameConfiguration';

const ProviderListItem = ({ provider, onRemove, providerPath }) => {
  return (
    <Table.Row>
      <Table.Cell>
        <div className="text-gray-900">
          <span className="flex items-center">
            <span className="mr-2">
              {getInterfaceLabel(provider?.interface)}
            </span>
            <ActiveInActive isActive={provider?.isActive} />
          </span>

          <ProviderNameConfiguration
            configuration={provider?.configuration}
            color={PROVIDER_TYPE_CLASSES[provider?.type]}
          />
        </div>
      </Table.Cell>

      <Table.Cell>
        <span className="font-semibold">
          <Badge
            text={provider?.type}
            color={PROVIDER_TYPE_CLASSES[provider?.type]}
            square
          />
        </span>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center">
          <Link href={`${providerPath}/${provider?._id}`}>
            <a>
              <EditIcon />
            </a>
          </Link>
          <DeleteButton
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
