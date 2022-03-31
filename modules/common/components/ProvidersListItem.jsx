import Link from 'next/link';

import Badge from './Badge';
import Table from './Table';
import { PROVIDER_TYPE_CLASSES } from '../data/miscellaneous';
import DeleteButton from './DeleteButton';
import EditIcon from './EditIcon';
import ProviderName from './ProviderName';
import ActiveInActive from './ActiveInActive';

const ProviderListItem = ({ provider, onRemove, providerPath }) => {
  return (
    <Table.Row>
      <Table.Cell>
        <div className="text-gray-900 flex items-center">
          <ProviderName provider={provider} />
          <ActiveInActive isActive={provider?.isActive} />
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
