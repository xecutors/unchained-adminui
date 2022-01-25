import { useIntl } from 'react-intl';
import { format } from 'date-fns';
import Link from 'next/link';
import Badge from '../../common/components/Badge';
import Table from '../../common/components/Table';

const WORK_STATUSES = {
  NEW: 'purple',
  ALLOCATED: 'blue',
  SUCCESS: 'green',
  FAILED: 'red',
  DELETED: 'orange',
};

const WorkListItem = ({ work }) => {
  const { formatMessage } = useIntl();

  return (
    <Table.Row>
      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          <Link href={`/works/${work._id}`}>
            <a className="text-blue-600">
              {work?.type || (
                <>
                  {work._id}{' '}
                  <Badge
                    color="blue"
                    text={formatMessage({ id: 'type', defaultMessage: 'Type' })}
                  />
                </>
              )}
            </a>
          </Link>
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap ">
        <Badge text={work?.status} color={WORK_STATUSES[work.status]} square />
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {work.created ? format(new Date(work.created), 'Pp') : 'n/a'}
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {work.scheduled ? format(new Date(work.scheduled), 'Pp') : 'n/a'}
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {work.started ? format(new Date(work.started), 'Pp') : 'n/a'}
        </div>
      </Table.Cell>

      <Table.Cell className="px-6  whitespace-nowrap ">
        <div className="pl-2 flex items-center text-sm text-gray-900">
          {work.finished ? format(new Date(work.finished), 'Pp') : 'n/a'}
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default WorkListItem;
